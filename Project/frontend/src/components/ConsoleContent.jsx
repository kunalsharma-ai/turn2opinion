"use client";
// Shows a page's text as published from the MADP console (GET /api/v1/content/:key), or the built-in text passed as
// children while loading and whenever nothing is published. The console sends blocks, not HTML, and they are drawn
// here as plain elements, so console text can never run script on the site. Web addresses and e-mail addresses in
// the text become links.
import React, { useEffect, useState } from "react";

const LINK = /(https:\/\/[^\s<>"')]+[^\s<>"').,;:!?]|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
function Text({ value }) {
  const parts = String(value).split(LINK);
  return parts.map((p, i) => {
    if (i % 2 === 0) return <React.Fragment key={i}>{p}</React.Fragment>;
    const href = p.startsWith("https://") ? p : `mailto:${p}`;
    return <a key={i} href={href} {...(p.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{p}</a>;
  });
}

export function Blocks({ body, headings = ["h2", "h3"] }) {
  const [H2, H3] = headings;
  return (body || []).map((b, i) => {
    if (typeof b === "string") return <p key={i}><Text value={b} /></p>;
    if (b?.h2) return <H2 key={i}><Text value={b.h2} /></H2>;
    if (b?.h3) return <H3 key={i}><Text value={b.h3} /></H3>;
    if (b?.ul) return <ul key={i}>{b.ul.map((x, j) => <li key={j}><Text value={x} /></li>)}</ul>;
    if (b?.ol) return <ol key={i}>{b.ol.map((x, j) => <li key={j}><Text value={x} /></li>)}</ol>;
    if (b?.note) return <blockquote key={i}><Text value={b.note} /></blockquote>;
    if (b?.table) return (
      <div key={i} style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", margin: "16px 0" }}>
          <thead><tr>{b.table.head.map((h, j) => <th key={j} style={{ textAlign: "left", borderBottom: "2px solid #ccc", padding: 8 }}><Text value={h} /></th>)}</tr></thead>
          <tbody>{b.table.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k} style={{ borderBottom: "1px solid #eee", padding: 8, verticalAlign: "top" }}><Text value={c} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    return null;
  });
}

export default function ConsoleContent({ pageKey, headings, children }) {
  const [page, setPage] = useState(null);
  useEffect(() => {
    let gone = false;
    const lang = typeof navigator !== "undefined" ? (navigator.language || "en").split("-")[0] : "en";
    fetch(`/api/v1/content/${encodeURIComponent(pageKey)}?lang=${encodeURIComponent(lang)}`, { credentials: "omit" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (!gone && Array.isArray(j?.data?.body)) setPage(j.data); })
      .catch(() => {});
    return () => { gone = true; };
  }, [pageKey]);
  if (!page) return children;
  return (
    <div data-content-version={page.version} style={{ width: "100%" }}>
      <Blocks body={page.body} headings={headings} />
      {page.publishedAt ? <p style={{ fontSize: 13, opacity: 0.7, marginTop: 24 }}>Last updated {new Date(page.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p> : null}
    </div>
  );
}
