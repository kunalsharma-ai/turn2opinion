/**
 * Build the self-contained preview studio.
 *
 *   node scripts/preview.mjs   (after npm run build)
 *   -> dist/turn2opinion-email-studio.html
 *
 * Templates are re-rendered with the asset base set to a sentinel; each distinct
 * image is base64'd ONCE into a lookup and resolved in the browser, so the 22 emails
 * share one copy of every icon. The Liquid and plain-text tabs read dist/liquid and
 * dist/text — the real production artefacts.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIST, ROOT, renderAll } from './render.mjs';

const ASSET_DIR = path.resolve(ROOT, '..', 'assets');
const OUT = path.join(DIST, 'turn2opinion-email-studio.html');
const S = '__T2OASSET__';

const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
  .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

const rendered = await renderAll({ mode: 'html', assetBase: S });
const used = new Set();
for (const { body } of rendered) for (const m of body.matchAll(new RegExp(`${S}/([A-Za-z0-9._\\-/]+)`, 'g'))) used.add(m[1]);
const assets = {};
let bytes = 0;
for (const rel of [...used].sort()) {
  const buf = await fs.readFile(path.join(ASSET_DIR, rel));
  assets[rel] = `data:image/png;base64,${buf.toString('base64')}`;
  bytes += buf.length;
}
const mark = assets['ui/mark.png'];

const items = [];
for (const { meta, body } of rendered) {
  const read = (d, e) => fs.readFile(path.join(DIST, d, `${meta.id}${e}`), 'utf8').catch(() => '');
  items.push({
    id: meta.id, code: meta.code, name: meta.name, kind: meta.kind, group: meta.group, tone: meta.tone,
    trigger: meta.trigger, source: meta.source, transactional: meta.transactional, internal: !!meta.internal,
    subjects: meta.subjectsSample || meta.subjects, subjectsLiquid: meta.subjects, preheader: meta.preheader,
    cta: meta.cta, secondary: meta.secondary || null, reason: meta.reason,
    html: body, liquid: await read('liquid', '.liquid'), text: await read('text', '.txt'),
    kb: (Buffer.byteLength(body) / 1024).toFixed(1),
  });
}

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Turn2Opinion Email Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
<style>
:root{--ink:#0E1B4D;--ink2:#24356F;--blue:#1F5BFF;--sky:#49B6FF;--violet:#7B5CFF;--gold:#FFB020;--coral:#FF5C7A;--mint:#12C29B;--mist:#F3F6FF;--mist2:#E8EEFF;--line:#E1E6F5;--muted:#56618C;--d:'Manrope',system-ui,sans-serif;--b:'Inter',system-ui,sans-serif}
*{box-sizing:border-box}html,body{margin:0;background:#fff;color:var(--ink);font-family:var(--b)}
a{color:var(--blue)}
.hero{position:relative;overflow:hidden;padding:56px 24px 40px;background:radial-gradient(1200px 400px at 85% -10%,rgba(73,182,255,.25),transparent 60%),radial-gradient(900px 380px at 0% 0%,rgba(123,92,255,.14),transparent 60%),#fff;border-bottom:1px solid var(--line)}
.wrap{max-width:1280px;margin:0 auto}
.pill{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 14px 6px 6px;font:600 12.5px var(--b);color:var(--ink2);box-shadow:0 8px 24px -16px rgba(14,27,77,.4)}
.pill img{width:26px;height:26px}
h1{font:800 clamp(34px,5vw,58px)/1.02 var(--d);letter-spacing:-.03em;margin:18px 0 14px}
h1 .g{background:linear-gradient(100deg,#1F5BFF,#7B5CFF 60%,#FF5C7A);-webkit-background-clip:text;background-clip:text;color:transparent}
.lede{max-width:760px;font-size:17px;line-height:1.65;color:var(--muted);margin:0}
.flow{display:flex;flex-wrap:wrap;gap:10px;margin:26px 0 0}
.flow span{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font:600 13px var(--b);background:var(--mist);border:1px solid var(--mist2)}
.flow b{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:8px;background:linear-gradient(135deg,var(--sky),var(--blue));color:#fff;font:800 11px var(--d)}
.stats{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:30px}
.stat{background:#fff;border:1px solid var(--line);border-radius:20px;padding:16px 18px}
.stat strong{display:block;font:800 26px var(--d);color:var(--ink)}.stat span{font:600 12px var(--b);color:var(--muted)}
.bar{position:sticky;top:0;z-index:5;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.bar .wrap{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;padding:12px 24px}
.seg{display:inline-flex;background:var(--mist);border:1px solid var(--mist2);border-radius:999px;padding:4px}
.seg button{border:0;background:transparent;border-radius:999px;padding:8px 16px;font:600 13px var(--b);color:var(--ink2);cursor:pointer;transition:background .2s,color .2s}
.seg button[aria-pressed=true]{background:var(--ink);color:#fff;box-shadow:0 6px 16px -8px rgba(14,27,77,.6)}
.seg button:hover:not([aria-pressed=true]){background:#fff}
.lbl{font:700 11px var(--b);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.main{display:grid;grid-template-columns:330px 1fr;gap:24px;padding:24px}
nav h3{font:700 11px var(--b);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:18px 4px 8px;display:flex;align-items:center;gap:8px}
nav h3 i{width:8px;height:8px;border-radius:50%}
nav button{display:block;width:100%;text-align:left;border:1px solid var(--line);background:#fff;border-radius:18px;padding:12px 14px;margin:0 0 8px;cursor:pointer;font-family:var(--b);transition:border-color .2s,transform .2s,box-shadow .2s}
nav button:hover{transform:translateY(-1px);box-shadow:0 10px 24px -18px rgba(14,27,77,.5)}
nav button[aria-current=true]{border-color:var(--blue);box-shadow:0 0 0 3px rgba(31,91,255,.14)}
nav .top{display:flex;justify-content:space-between;gap:8px;align-items:center}
nav .code{font:800 12px var(--d);color:var(--blue)}nav .src{font:600 10px var(--b);color:var(--muted);background:var(--mist);border-radius:999px;padding:2px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
nav .nm{display:block;font:800 15px var(--d);color:var(--ink);margin:4px 0 2px}nav .tr{display:block;font-size:12.5px;color:var(--muted);line-height:1.45}
.panel{background:#fff;border:1px solid var(--line);border-radius:28px;overflow:hidden;min-width:0}
.ph{padding:20px 24px;border-bottom:1px solid var(--line);display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;align-items:flex-start}
.ph h2{font:800 22px var(--d);margin:0 0 4px}.ph p{margin:0;color:var(--muted);font-size:14px}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.tags span{font:700 10.5px var(--b);letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:4px 10px;background:var(--mist);color:var(--ink2)}
.tags .t-tone{color:#fff}
.acts{display:flex;flex-wrap:wrap;gap:8px}
.btn{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 15px;font:600 13px var(--b);color:var(--ink);cursor:pointer}
.btn.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.inbox{display:flex;gap:12px;align-items:center;padding:14px 24px;background:var(--mist);border-bottom:1px solid var(--line)}
.inbox img{width:40px;height:40px}.inbox .from{font-size:12.5px;color:var(--muted)}.inbox .sj{font:700 15px var(--b);color:var(--ink)}.inbox .pre{font-size:13px;color:var(--muted)}
.subs{display:flex;gap:6px;margin-left:auto}.subs button{border:1px solid var(--line);background:#fff;border-radius:10px;width:30px;height:30px;font:800 12px var(--d);cursor:pointer}.subs button[aria-pressed=true]{background:var(--blue);color:#fff;border-color:var(--blue)}
.stage{background:repeating-linear-gradient(45deg,#F7F9FF 0 14px,#F1F4FE 14px 28px);padding:28px 16px;display:flex;justify-content:center}
.frame{background:#fff;border-radius:22px;box-shadow:0 30px 60px -30px rgba(14,27,77,.45);overflow:hidden;transition:width .35s cubic-bezier(.22,1,.36,1)}
iframe{display:block;border:0;width:100%;height:900px}
pre{margin:0;padding:22px 24px;max-height:900px;overflow:auto;background:#0A1238;color:#DCE4FF;font:12.5px/1.6 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word}
.spec{padding:22px 24px;display:grid;gap:14px}
.spec .card{border:1px solid var(--line);border-radius:18px;padding:16px 18px}.spec h4{margin:0 0 8px;font:800 15px var(--d)}.spec ol,.spec ul{margin:0;padding-left:20px;line-height:1.7}
code{background:var(--mist);border-radius:6px;padding:1px 6px;font-size:12.5px}
footer{padding:30px 24px 50px;text-align:center;color:var(--muted);font-size:13px}
footer .wm{font:800 34px var(--d);letter-spacing:.2em;color:var(--ink)}footer .wm b{color:var(--blue)}
@media(max-width:980px){.main{grid-template-columns:1fr}.stats{grid-template-columns:repeat(3,1fr)}nav{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}nav h3{grid-column:1/-1}nav button{margin:0}}
@media(max-width:560px){.stats{grid-template-columns:repeat(2,1fr)}.hero{padding:40px 16px 30px}.main{padding:16px 12px}}
</style></head><body>
<header class="hero"><div class="wrap">
  <span class="pill"><img src="${mark}" alt="">Turn2Opinion · Email system v1</span>
  <h1>Twenty-two mailers.<br><span class="g">One conversation.</span></h1>
  <p class="lede">Every scenario of the MyFrequentRewards set, rebuilt for Turn2Opinion with its own design: a royal-blue stage that states the purpose first, a “portal” hero lifted from the website, a journey track of done / now / next, Q&amp;A sections headed by the member’s own questions, and a chat-bubble sign-off. Merge fields are identical to the MFR call sites.</p>
  <div class="flow"><span><b>1</b>Stage — why this email</span><span><b>2</b>Fact pills</span><span><b>3</b>Journey</span><span><b>4</b>The ask</span><span><b>5</b>Q&amp;A sections</span><span><b>6</b>Chat sign-off</span></div>
  <div class="stats">
    <div class="stat"><strong>22</strong><span>Templates (4 + 18)</span></div>
    <div class="stat"><strong>22</strong><span>Unique hero scenes</span></div>
    <div class="stat"><strong>5</strong><span>Stage tones by purpose</span></div>
    <div class="stat"><strong>${Math.round(bytes / 1024)} KB</strong><span>All images, shared</span></div>
    <div class="stat"><strong>3</strong><span>Subject lines each</span></div>
    <div class="stat"><strong>0</strong><span>New merge fields</span></div>
  </div>
</div></header>
<div class="bar"><div class="wrap">
  <span class="lbl">Width</span><div class="seg" id="w"><button aria-pressed="true" data-v="640">Desktop</button><button aria-pressed="false" data-v="375">Mobile</button></div>
  <span class="lbl">Images</span><div class="seg" id="im"><button aria-pressed="true" data-v="on">On</button><button aria-pressed="false" data-v="off">Blocked</button></div>
  <span class="lbl">Client</span><div class="seg" id="cl"><button aria-pressed="true" data-v="modern">Apple / Gmail app</button><button aria-pressed="false" data-v="outlook">Outlook-like</button></div>
</div></div>
<div class="wrap main">
  <nav id="nav" aria-label="Templates"></nav>
  <section class="panel">
    <div class="ph"><div><h2 id="t"></h2><p id="tr"></p><div class="tags" id="tags"></div></div>
      <div class="acts"><button class="btn on" data-tab="render">Render</button><button class="btn" data-tab="liquid">Liquid</button><button class="btn" data-tab="text">Plain text</button><button class="btn" data-tab="spec">Spec</button><button class="btn" id="copy">Copy Liquid</button></div></div>
    <div class="inbox"><img src="${mark}" alt=""><div style="min-width:0"><div class="from">Turn2Opinion &lt;no-reply@turn2opinion.com&gt;</div><div class="sj" id="sj"></div><div class="pre" id="pre"></div></div><div class="subs" id="subs"></div></div>
    <div id="body"></div>
  </section>
</div>
<footer><div class="wm">TURN<b>2</b>OPINION</div><p>Generated from <code>react/src/emails/*.jsx</code> — edit the source and run <code>npm run preview</code>.</p></footer>
<script>
const ITEMS=${json(items)};const A=${json(assets)};
const TONE={blue:'#1F4FE0',night:'#0E1B4D',violet:'#5A36D6',mint:'#0B7D63',coral:'#D63262'};
const GROUPDOT={'Lifecycle reminders':'#FF5C7A','Account & security':'#1F5BFF','Teen consent (13–17)':'#7B5CFF','Engagement':'#FFB020','Support':'#12C29B','Admin':'#0E1B4D'};
let cur=0,tab='render',width=640,images=true,client='modern',subj=0;
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function resolve(h){h=h.replace(/__T2OASSET__\\/([A-Za-z0-9._\\-\\/]+)/g,(m,p)=>images?(A[p]||m):'about:blank');
  if(client==='outlook'){h=h.replace('</head>','<style>*{border-radius:0!important;background-image:none!important;box-shadow:none!important;font-family:"Segoe UI",Arial,sans-serif!important;animation:none!important}</style></head>')}
  if(!images){h=h.replace('</head>','<style>img{background:#E8EEFF;color:#56618C;font:12px Arial;outline:1px dashed #C5CEEA}</style></head>')}
  return h}
function nav(){const n=$('#nav');let g='';n.innerHTML='';ITEMS.forEach((it,i)=>{if(it.group!==g){g=it.group;const h=document.createElement('h3');h.innerHTML='<i style="background:'+(GROUPDOT[g]||'#1F5BFF')+'"></i>'+g;n.appendChild(h)}
  const b=document.createElement('button');b.setAttribute('aria-current',i===cur);b.innerHTML='<span class="top"><span class="code">'+it.code+'</span><span class="src">'+esc(it.source||'')+'</span></span><span class="nm">'+esc(it.name)+'</span><span class="tr">'+esc(it.trigger)+'</span>';
  b.onclick=()=>{cur=i;subj=0;show();window.scrollTo({top:$('.main').offsetTop-70,behavior:'smooth'})};n.appendChild(b)})}
function show(){const it=ITEMS[cur];nav();$('#t').textContent=it.code+'. '+it.name;$('#tr').textContent=it.trigger;
  $('#tags').innerHTML='<span class="t-tone" style="background:'+TONE[it.tone]+'">'+it.tone+' stage</span><span>'+esc(it.kind)+'</span><span>'+it.kb+' KB</span><span>'+(it.internal?'internal':it.transactional?'transactional · no unsubscribe':'marketing · unsubscribe')+'</span>';
  $('#sj').textContent=it.subjects[subj];$('#pre').textContent=it.preheader;
  $('#subs').innerHTML=it.subjects.map((s,i)=>'<button title="'+esc(s)+'" aria-pressed="'+(i===subj)+'">'+'ABC'[i]+'</button>').join('');
  [...$('#subs').children].forEach((b,i)=>b.onclick=()=>{subj=i;show()});
  document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
  const body=$('#body');
  if(tab==='render'){body.innerHTML='<div class="stage"><div class="frame" style="width:'+width+'px;max-width:100%"><iframe title="Email preview"></iframe></div></div>';const f=body.querySelector('iframe');f.srcdoc=resolve(it.html);f.onload=()=>{try{f.style.height=f.contentDocument.documentElement.scrollHeight+'px'}catch(e){}}}
  else if(tab==='liquid')body.innerHTML='<pre>'+esc(it.liquid)+'</pre>';
  else if(tab==='text')body.innerHTML='<pre>'+esc(it.text)+'</pre>';
  else body.innerHTML='<div class="spec"><div class="card"><h4>Subject lines (Liquid)</h4><ol>'+it.subjectsLiquid.map(s=>'<li><code>'+esc(s)+'</code></li>').join('')+'</ol></div><div class="card"><h4>Preheader</h4>'+esc(it.preheader)+'</div><div class="card"><h4>Call to action</h4>'+(it.cta?esc(it.cta.label)+' → <code>'+esc(it.cta.dest)+'</code>':'None — this template asks for nothing.')+(it.secondary?'<br>Secondary: '+esc(it.secondary.label)+' → <code>'+esc(it.secondary.dest)+'</code>':'')+'</div><div class="card"><h4>Why this was sent (footer)</h4>'+esc(it.reason)+'</div><div class="card"><h4>Files</h4><ul><li><code>react/dist/liquid/'+it.id+'.liquid</code></li><li><code>react/dist/text/'+it.id+'.txt</code></li><li><code>react/dist/html/'+it.id+'.html</code></li><li>Replaces / mirrors: <code>'+esc(it.source||'—')+'</code></li></ul></div></div>'}
function seg(id,fn){document.querySelectorAll('#'+id+' button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#'+id+' button').forEach(x=>x.setAttribute('aria-pressed',x===b));fn(b.dataset.v);show()})}
seg('w',v=>width=+v);seg('im',v=>images=v==='on');seg('cl',v=>client=v);
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;show()});
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(ITEMS[cur].liquid);$('#copy').textContent='Copied ✓';setTimeout(()=>$('#copy').textContent='Copy Liquid',1400)}catch(e){tab='liquid';show()}};
show();
</script></body></html>`;

await fs.writeFile(OUT, page, 'utf8');
console.log(`\nStudio written: ${OUT}  (${(Buffer.byteLength(page) / 1024).toFixed(0)} KB, ${used.size} images inlined once)\n`);
