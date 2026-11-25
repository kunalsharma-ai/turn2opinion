// A small PDF writer shared by the Consumer and Professional consent pages (issue #37: the accepted terms were
// downloaded as an .html file). Same engine as the Teen page's teen/src/pdf.js: no library, no network call, standard
// Helvetica fonts (about 25 KB per file). Text outside basic Latin is dropped, as the binding text is English.

/* ── Helvetica metrics (1000-unit em) for correct line breaking ── */
const W_REG = '278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584'.split(' ').map(Number);
const W_BOLD = '278 333 474 556 556 889 722 238 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 333 333 584 584 584 611 975 722 722 722 722 667 611 778 722 278 556 722 611 833 722 778 667 778 722 667 611 722 667 944 667 667 611 333 278 333 584 556 333 556 611 556 611 556 333 611 611 278 278 556 278 889 611 611 611 611 389 556 333 611 556 778 556 556 500 389 280 389 584'.split(' ').map(Number);

/** Typographic characters → the PDF's WinAnsi basics (the text is English, so nothing meaningful is lost). */
const ASCII = {
  '‘': "'", '’': "'", '‚': ',', '“': '"', '”': '"', '–': '-', '—': '-',
  '…': '...', '•': '-', '·': '-', ' ': ' ', '−': '-', '×': 'x', '™': '(TM)',
  '®': '(R)', '©': '(c)', '₹': 'INR ', '€': 'EUR ', '£': 'GBP ',
};
const plain = (s) => String(s == null ? '' : s)
  .replace(/[‘’‚“”–—…•· −×™®©₹€£]/g, (c) => ASCII[c])
  .replace(/[^\x20-\x7e]/g, '') // anything else (other scripts) is dropped: this file is the English version
  .replace(/[ \t]+/g, ' ')
  .trim();
const esc = (s) => s.replace(/[\\()]/g, (c) => `\\${c}`);
const widthOf = (s, size, bold) => {
  const tbl = bold ? W_BOLD : W_REG;
  let w = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 32;
    w += tbl[c] != null ? tbl[c] : 556;
  }
  return (w * size) / 1000;
};

const PAGE = { w: 595.28, h: 841.89, m: 54 };
const INK = '0.055 0.082 0.188';
const BLUE = '0.184 0.419 1';
const NAVY = '0.043 0.118 0.357';
const MUTED = '0.365 0.408 0.565';
const LINE = '0.886 0.906 0.957';
const WASH = '0.965 0.973 0.992';

class Doc {
  constructor(title) {
    this.title = title;
    this.pages = [];
    this.page = null;
    this.y = 0;
    this.add();
  }

  add() {
    this.page = [];
    this.pages.push(this.page);
    this.y = PAGE.m + (this.pages.length === 1 ? 0 : 14);
    return this.page;
  }

  out(s) { this.page.push(s); }

  /** absolute PDF y (origin bottom-left) for a distance from the top */
  at(yTop) { return (PAGE.h - yTop).toFixed(2); }

  room(h) { if (this.y + h > PAGE.h - PAGE.m - 26) this.add(); }

  rect(x, yTop, w, h, color, { stroke = false } = {}) {
    this.out(`${stroke ? `${color} RG 0.8 w` : `${color} rg`} ${x.toFixed(2)} ${this.at(yTop + h)} ${w.toFixed(2)} ${h.toFixed(2)} re ${stroke ? 'S' : 'f'}`);
  }

  /** One run of wrapped text. Returns the height used. */
  text(str, { size = 9.6, bold = false, color = INK, x = PAGE.m, width = PAGE.w - PAGE.m * 2, lead = 1.42, after = 0, indent = 0 } = {}) {
    const words = plain(str).split(' ').filter(Boolean);
    if (!words.length) return 0;
    const lines = [];
    let cur = '';
    const max = width - indent;
    for (const word of words) {
      const test = cur ? `${cur} ${word}` : word;
      if (widthOf(test, size, bold) <= max || !cur) cur = test;
      else { lines.push(cur); cur = word; }
    }
    if (cur) lines.push(cur);
    const lh = size * lead;
    for (const line of lines) {
      this.room(lh);
      this.out(`BT ${color} rg /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${(x + indent).toFixed(2)} ${this.at(this.y + size)} Tm (${esc(line)}) Tj ET`);
      this.y += lh;
    }
    this.y += after;
    return lines.length * lh + after;
  }

  gap(h) { this.y += h; }

  h1(str) {
    this.room(46);
    this.text(str, { size: 19, bold: true, lead: 1.22, after: 6 });
  }

  h2(str, tint = BLUE) {
    this.room(42);
    this.gap(10);
    const top = this.y;
    this.text(str, { size: 13.5, bold: true, color: NAVY, lead: 1.3, x: PAGE.m + 12, width: PAGE.w - PAGE.m * 2 - 12, after: 4 });
    this.rect(PAGE.m, top - 1, 4, Math.max(14, this.y - top - 4), tint);
  }

  h3(str) {
    this.room(30);
    this.gap(6);
    this.text(str, { size: 10.8, bold: true, after: 2 });
  }

  rule() {
    this.room(10);
    this.gap(4);
    this.rect(PAGE.m, this.y, PAGE.w - PAGE.m * 2, 0.7, LINE);
    this.gap(8);
  }

  // the marker is drawn before the text so that a clause breaking across pages keeps its number with its first line
  bullet(str, { size = 9.6 } = {}) {
    this.room(size * 1.5);
    this.out(`BT ${BLUE} rg /F2 ${size} Tf 1 0 0 1 ${(PAGE.m + 3).toFixed(2)} ${this.at(this.y + size)} Tm (-) Tj ET`);
    this.text(str, { size, indent: 14, after: 1.5 });
  }

  clause(no, str) {
    this.room(15);
    this.out(`BT ${MUTED} rg /F2 8.6 Tf 1 0 0 1 ${PAGE.m.toFixed(2)} ${this.at(this.y + 9.2)} Tm (${esc(no)}) Tj ET`);
    this.text(str, { indent: 34, after: 2.5 });
  }

  /** key → value row block with a soft background */
  panel(rows, { title = '' } = {}) {
    const labelW = 118;
    const innerW = PAGE.w - PAGE.m * 2 - 24;
    // measure first so the panel never splits across pages
    let h = title ? 20 : 0;
    for (const [, v] of rows) h += Math.max(13.6, Math.ceil(widthOf(plain(v), 9.6, false) / (innerW - labelW)) * 13.6) + 2;
    this.room(h + 26);
    const startPage = this.page;
    const top = this.y;
    this.gap(12);
    if (title) this.text(title, { size: 11, bold: true, color: NAVY, x: PAGE.m + 12, after: 4 });
    for (const [k, v] of rows) {
      const rowTop = this.y;
      this.text(v, { x: PAGE.m + 12 + labelW, width: innerW - labelW, after: 2 });
      this.out(`BT ${MUTED} rg /F2 9.2 Tf 1 0 0 1 ${(PAGE.m + 12).toFixed(2)} ${this.at(rowTop + 9.2)} Tm (${esc(plain(k))}) Tj ET`);
      this.y = Math.max(this.y, rowTop + 13.6);
    }
    this.gap(12);
    // the background is drawn behind the rows (unshifted); if a row still spilled onto a new page, skip it
    if (this.page === startPage) {
      const box = `${PAGE.m} ${this.at(this.y)} ${(PAGE.w - PAGE.m * 2).toFixed(2)} ${(this.y - top).toFixed(2)} re`;
      this.page.unshift(`${LINE} RG 0.8 w ${box} S`);
      this.page.unshift(`${WASH} rg ${box} f`);
    }
  }

  /** brand band at the top of page 1 */
  masthead(sub, version) {
    this.rect(0, 0, PAGE.w, 74, NAVY);
    this.rect(0, 70, PAGE.w, 4, BLUE);
    this.out(`BT 1 1 1 rg /F2 17 Tf 1 0 0 1 ${PAGE.m} ${this.at(32)} Tm (Turn2Opinion) Tj ET`);
    this.out(`BT 0.78 0.84 1 rg /F1 9.4 Tf 1 0 0 1 ${PAGE.m} ${this.at(50)} Tm (${esc(plain(sub))}) Tj ET`);
    const v = plain(version);
    this.out(`BT 0.78 0.84 1 rg /F2 9.4 Tf 1 0 0 1 ${(PAGE.w - PAGE.m - widthOf(v, 9.4, true)).toFixed(2)} ${this.at(50)} Tm (${esc(v)}) Tj ET`);
    this.y = 102;
  }

  /** page footers, then the PDF bytes */
  bytes(footer) {
    const n = this.pages.length;
    this.pages.forEach((p, i) => {
      const right = plain(`Page ${i + 1} of ${n}`);
      let left = plain(footer);
      const room = PAGE.w - PAGE.m * 2 - widthOf(right, 8, false) - 18;
      while (left && widthOf(left, 8, false) > room) left = left.slice(0, -2);
      p.push(`${LINE} rg ${PAGE.m} 46 ${(PAGE.w - PAGE.m * 2).toFixed(2)} 0.7 re f`);
      p.push(`BT ${MUTED} rg /F1 8 Tf 1 0 0 1 ${PAGE.m} 32 Tm (${esc(left)}) Tj ET`);
      p.push(`BT ${MUTED} rg /F1 8 Tf 1 0 0 1 ${(PAGE.w - PAGE.m - widthOf(right, 8, false)).toFixed(2)} 32 Tm (${esc(right)}) Tj ET`);
    });
    return assemble(this.pages, this.title);
  }
}

/* ── PDF file assembly (objects, xref, trailer) ── */
function assemble(pages, title) {
  const objs = [];
  const put = (s) => objs.push(s) && objs.length; // 1-based object number
  const kidsId = 2;
  const fontR = 3;
  const fontB = 4;
  const infoId = 5;
  put('<< /Type /Catalog /Pages 2 0 R >>'); // 1
  put('PAGES'); // 2 (filled below)
  put('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'); // 3
  put('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'); // 4
  put(`<< /Title (${esc(plain(title))}) /Producer (Turn2Opinion consent page) /Creator (Turn2Opinion) >>`); // 5
  const pageIds = [];
  for (const content of pages) {
    const stream = content.join('\n');
    const sid = put(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pid = put(`<< /Type /Page /Parent ${kidsId} 0 R /MediaBox [0 0 ${PAGE.w.toFixed(2)} ${PAGE.h.toFixed(2)}] /Resources << /Font << /F1 ${fontR} 0 R /F2 ${fontB} 0 R >> >> /Contents ${sid} 0 R >>`);
    pageIds.push(pid);
  }
  objs[kidsId - 1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((i) => `${i} 0 R`).join(' ')}] >>`;

  let body = '%PDF-1.4\n%\xc2\xb5\xc2\xb6\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(body.length);
    body += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = body.length;
  body += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) body += `${String(off).padStart(10, '0')} 00000 n \n`;
  body += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const bytes = new Uint8Array(body.length);
  for (let i = 0; i < body.length; i++) bytes[i] = body.charCodeAt(i) & 0xff;
  return bytes;
}


export { Doc, INK, BLUE, NAVY, MUTED, plain };

/** Saves PDF bytes as a file. */
export function savePdf(bytes, filename) {
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** The UTC time of an ISO date, for the receipt. */
export const when = (iso) => { try { return new Date(iso).toUTCString().replace('GMT', 'UTC'); } catch { return String(iso); } };
