// Minimal, safe Markdown renderer for blog bodies (no dangerouslySetInnerHTML).
// Supports: ## / ### headings, paragraphs, - and 1. lists, > callouts, | tables |,
// **bold**, *italic*, [links](url). Internal links ("/path/") use the router; external open in a new tab.
import { Fragment } from 'react';
import { Link } from '../router/Router.jsx';

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[’'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

function inline(text, keyBase = 'i') {
  const out = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) out.push(<strong key={`${keyBase}${k++}`}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={`${keyBase}${k++}`}>{m[3]}</em>);
    else if (m[4]) {
      const href = m[5];
      if (/^https?:/i.test(href)) {
        out.push(
          <a key={`${keyBase}${k++}`} href={href} target="_blank" rel="noopener noreferrer" className="ext-link">
            {m[4]}
          </a>
        );
      } else if (/^(mailto:|tel:)/i.test(href)) {
        out.push(
          <a key={`${keyBase}${k++}`} href={href}>
            {m[4]}
          </a>
        );
      } else {
        out.push(
          <Link key={`${keyBase}${k++}`} to={href} className="int-link">
            {m[4]}
          </Link>
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function parseBlocks(md) {
  const lines = md.replace(/\r/g, '').split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({ t: 'h3', text: line.slice(4).trim() });
      i++;
    } else if (line.startsWith('## ')) {
      blocks.push({ t: 'h2', text: line.slice(3).trim() });
      i++;
    } else if (/^\s*[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*] /, ''));
      blocks.push({ t: 'ul', items });
    } else if (/^\s*\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\. /, ''));
      blocks.push({ t: 'ol', items });
    } else if (line.startsWith('> ')) {
      const parts = [];
      while (i < lines.length && lines[i].startsWith('> ')) parts.push(lines[i++].slice(2));
      blocks.push({ t: 'quote', text: parts.join(' ') });
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = rows
        .filter((r) => !/^\|\s*:?-{2,}/.test(r))
        .map((r) =>
          r
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((c) => c.trim())
        );
      blocks.push({ t: 'table', head: cells[0], rows: cells.slice(1) });
    } else {
      const parts = [];
      while (i < lines.length && lines[i].trim() && !/^(#{2,3} |\s*[-*] |\s*\d+\. |> |\|)/.test(lines[i])) parts.push(lines[i++].trim());
      blocks.push({ t: 'p', text: parts.join(' ') });
    }
  }
  return blocks;
}

export function headingsOf(md) {
  return parseBlocks(md)
    .filter((b) => b.t === 'h2')
    .map((b) => ({ id: slugify(b.text), text: b.text }));
}

export default function Markdown({ source }) {
  const blocks = parseBlocks(source || '');
  return (
    <div className="prose">
      {blocks.map((b, n) => {
        const key = `b${n}`;
        switch (b.t) {
          case 'h2':
            return (
              <h2 key={key} id={slugify(b.text)}>
                {b.text}
              </h2>
            );
          case 'h3':
            return <h3 key={key}>{inline(b.text, key)}</h3>;
          case 'ul':
            return (
              <ul key={key}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${key}-${j}-`)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it, `${key}-${j}-`)}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <aside key={key} className="callout">
                <p>{inline(b.text, key)}</p>
              </aside>
            );
          case 'table':
            return (
              <div key={key} className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          {inline(h, `${key}h${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, x) => (
                          <td key={x}>{inline(c, `${key}r${j}${x}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return <p key={key}>{inline(b.text, key)}</p>;
        }
      })}
    </div>
  );
}

export const wordCount = (md) => (md || '').replace(/[#>*|[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
export { Fragment };
