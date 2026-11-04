// Official 2026 prix pharmacie (expected P.U.HT)
const P={};"AMD01/030:405.42;AMD02/030:550.41;AMP01/030:1701.47;AMP02/030:2899.91;APC01/020:117.68;APC01/098:216.41;APT01/020:265.18;ARO01/030:4689.66;ARO02/030:4689.66;ARP01/030:4689.66;ARP02/030:4689.66;ARP03/030:5422.91;ASP04/028:83.33;ATB01/030:1072.91;ATB02/030:1072.91;ATO01/030:695.92;ATO02/030:1037.41;ATO03/030:1647.91;ATO04/030:1697.92;AZT01/003:418;APX01/060:3497.91;APX02/060:3497.91;APX01/030:1831.25;APX02/030:1831.25;BEK01/030:1072.91;BEK02/030:1072.91;BIS01/030:239.67;BIS02/030:485.41;BKD01/030:1072.91;BKD02/030:1072.91;CBD01/030:911.16;CBD02/030:911.16;CBD03/030:911.16;CBE01/030:1822.91;CBE02/030:1822.91;CIR01/030:1430.91;CIR02/030:1430;CIR03/030:1097.91;CLP01/030:1272.91;CLX01/020:397.9;CLX02/030:1136.66;COA01/030:1320;COA02/030:1430;COS01/030:745.91;CPX01/010:660;CPX02/010:872.9;CVA01/030:1822.91;CVA02/030:1822.91;CVA03/030:1822.91;DOM01/040:215.74;DOP01/030:3035.42;DOP02/028:3381.25;DOP02/030:3622.92;DRX01/030:1247.91;DRX02/030:1247.91;DRX03/030:1247.91;DXZ01/030:539.34;DXZ02/030:1181.4;ESC01/028:301.95;EPG01/030:2018.75;EPG02/030:2018.75;FRG01/024:166.66;FXD01/015:111.65;FXD02/020:215.41;GLB01/030:397.91;GLB02/030:597.92;GLB03/030:622.91;GLB05/030:206.91;GLK01/030:339.58;GLK02/030:442.92;HYQ01/030:432.08;IFN01/030:142.8;IFN02/020:124.4;IFN03/020:124.4;INP01/030:498.74;IRB01/030:1072.91;IRB02/030:1072.91;KNB01/030:2018.92;KNB02/030:3052.08;LCD01/030:688.97;LMB01/056:2644.29;LMB02/056:1150.7;LMB03/030:397.41;LRD01/030:142.8;LRC01/030:155.67;LVR01/060:1410.01;LVR02/060:2747.91;LXS01/014:249.04;LXS02/014:287.78;MBL01/030:255.19;MEM01/030:932.91;MEM02/030:1214.16;MGX01/006:1046.17;MLN01/030:219.99;MLN02/030:372.91;MTK01/030:1915.13;MTK02/030:1922.91;MTK03/030:1922.91;MUS01/020:415.42;MXN01/030:457.85;MXN02/030:786.26;MYC01/003:180.41;MYC03/001:198;MZL01/030:126.4;MZL02/020:126;NAF01/030:332.08;OLA01/007:529.45;OLA01/028:2117.98;OLA02/028:1647.91;OLR01/028:2117.75;OLR02/030:1765.61;OPX01/004:1464.57;OSN01/004:1464.57;PNT02/028:239.58;PNT02/030:253.25;PRB01/060:1543.75;PRB02/060:3582.92;PRB03/060:4884.58;PRB03/090:7097.91;PRB04/060:1664.41;PRN01/030:497.92;PRN02/030:497.92;PRS01/030:209.9;PRS02/020:322.7;PRV01/030:2747.91;PXN01/030:1347.91;PLX01/060:3951.63;QUL01/060:5099.41;QUL02/060:972.92;RIS01/060:3447.91;RIS02/030:2622.91;RPG01/030:294.42;RPG02/030:306.94;RPG03/030:323.1;RSO01/030:2622.91;RSO02/060:3447.91;RSP03/030:772.92;SET01/007:414.58;SET01/028:1664.74;SET02/007:664.59;SET02/028:2664.57;SOC01/030:1647.91;SOC02/030:1037.41;STG01/030:1039.58;STG02/030:1372.91;TAD01/002:448.87;TAD01/008:1739.19;TAD02/030:1247.92;TER01/020:1248.74;TLP01/030:1247.91;TRD01/030:238.92;TRL01/030:500.82;TRX01/030:2456.24;TRX02/030:2456.24;TRX02/042:3497.92;TRX03/030:2456.24;VAL01/030:1147.92;VAL02/030:1147.92;VBK01/002:247.91;VBK01/008:997.91;VBK02/004:1036.63;XTR03/003:2564.57".split(";").forEach(s=>{const[a,b]=s.split(":");P[a]=+b});
const $=id=>document.getElementById(id),CODE=/[A-Z]{3}\d{2}\/\d{3}/;
const num=s=>{s=String(s).replace(/[\s\u00a0\u202f]/g,"");if(!/^-?[\d.,]+$/.test(s))return NaN;if(s.includes(",")&&s.includes("."))s=s.replace(/\./g,"");return parseFloat(s.replace(",","."))};
const fm=n=>(n==null||!isFinite(n))?"–":n.toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2});
const pu=o=>o.q?o.a/o.q:NaN,esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const WORKER="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
let inv=null,crm=null,warn=[],exp=[],busy=false,byName=false;
const st=t=>$("st").textContent=t;

async function readPdf(file){
  pdfjsLib.GlobalWorkerOptions.workerSrc=WORKER;
  const doc=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise,rows=[];
  for(let p=1;p<=doc.numPages;p++){
    const t=await (await doc.getPage(p)).getTextContent(),L=[];
    t.items.forEach(i=>{if(!i.str.trim())return;const y=Math.round(i.transform[5]);let l=L.find(l=>Math.abs(l.y-y)<3);if(!l)L.push(l={y,c:[]});l.c.push({x:i.transform[4],s:i.str.trim()})});
    L.sort((a,b)=>b.y-a.y).forEach(l=>rows.push(l.c.sort((a,b)=>a.x-b.x).map(c=>c.s)));
  }
  const lines=new Map();warn=[];let total=NaN;
  rows.forEach((r,ix)=>{
    const txt=r.join(" ");
    if(/total\s*h\.?t\.?\s*brut/i.test(txt)&&isNaN(total)){
      const own=r.map(num).filter(x=>!isNaN(x)),nxt=(rows[ix+1]||[]).map(num).filter(x=>!isNaN(x));
      total=own.length?own[own.length-1]:(nxt.length?nxt[0]:NaN);
    }
    const m=txt.match(CODE);if(!m)return;
    const n=r.filter(c=>!CODE.test(c)).map(num).filter(x=>!isNaN(x));let hit=null;
    for(let k=n.length-1;k>=2&&!hit;k--)for(let j=k-1;j>=1&&!hit;j--)for(let i=j-1;i>=0&&!hit;i--)
      if(Number.isInteger(n[i])&&n[i]>0&&Math.abs(n[i]*n[j]-n[k])<=n[i]*0.006+0.02)hit=[n[i],n[j],n[k]];
    if(!hit){warn.push("Line not read: "+txt);return}
    const o=lines.get(m[0])||{q:0,a:0,code:m[0],name:r.filter(c=>!CODE.test(c)&&isNaN(num(c))).join(" ")};o.q+=hit[0];o.a+=hit[2];lines.set(m[0],o);
  });
  if(!lines.size)throw new Error("No invoice line could be read from this PDF (scanned?)");
  return{lines,total};
}
function pasteRows(t){
  const L=t.split(/\r?\n/).filter(l=>l.trim());
  const sep=L.some(l=>l.includes("\t"))?/\t/:L.some(l=>l.includes(";"))?/;/:/\s{2,}/;
  return L.map(l=>l.split(sep).map(c=>c.trim()));
}
function sheetRows(wb){return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true,defval:""})}
function normKey(n){
  const s=String(n).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[®™]/g,"");
  const pk=s.match(/B\s*\/\s*0*(\d+)/),i=s.search(/\d/);
  const head=s.slice(0,i<0?s.length:i).replace(/[^A-Z]/g,"");
  const mid=(pk?s.slice(0,pk.index):s).slice(i<0?0:i).match(/\d+(?:[.,]\d+)?/g)||[];
  return head+"|"+mid.join("/").replace(/,/g,".")+"|"+(pk?pk[1]:"");
}
// CRM copied from the web page: one value per line, product names (no codes), amounts like "5,169.84 DA"
function parseNameCrm(t){
  const L=t.split(/\r?\n/).map(l=>l.trim()).filter(Boolean),out=new Map();let cur=null;
  const flush=()=>{if(cur&&cur.v.length>=3){const k=normKey(cur.n),o=out.get(k)||{q:0,a:0,name:cur.n};o.q+=cur.v[1];o.a+=cur.v[cur.v.length-1];out.set(k,o)}cur=null};
  L.forEach(l=>{
    if(/B\s*\/\s*\d+/i.test(l)){flush();cur={n:l,v:[]};return}
    if(!cur||/^A$/i.test(l)||!/^[\d.,\s]+(DA)?$/i.test(l))return;
    const x=parseFloat(l.replace(/DA/i,"").replace(/[\s,]/g,""));
    if(!isNaN(x))cur.v.push(x);
  });
  flush();
  if(!out.size)throw new Error("No CRM line could be read");
  return out;
}
function parseCrm(R){
  const h=R.findIndex(r=>r.some(c=>/code|réf|ref/i.test(c)&&!CODE.test(String(c))));
  let ci,qi,pi,ai;
  if(h>=0){
    const H=R[h].map(String),ix=re=>H.findIndex(c=>re.test(c));
    ci=ix(/code|réf|ref/i);qi=ix(/qt/i);pi=ix(/p\.?\s?u|prix/i);ai=ix(/montant|total/i);
    if(qi<0)throw new Error("No quantity column found in the CRM état");
  }else{
    const r=R.find(r=>r.some(c=>CODE.test(String(c))));
    if(!r)throw new Error("No product code found in the CRM état");
    ci=r.findIndex(c=>CODE.test(String(c)));
    const ns=r.map((c,i)=>i>ci&&!isNaN(num(c))?i:-1).filter(i=>i>=0);
    if(!ns.length)throw new Error("No quantity column found in the CRM état (add the header line)");
    qi=ns[0];pi=ns.length>1?ns[1]:-1;ai=ns.length>2?ns[ns.length-1]:-1;
  }
  const lines=new Map();
  R.slice(h+1).forEach(r=>{
    const c=String(r[ci]).match(CODE);if(!c)return;
    const q=num(r[qi]);let p=pi>=0?num(r[pi]):NaN,a=ai>=0?num(r[ai]):NaN;
    if(isNaN(a))a=q*p;if(isNaN(q)||isNaN(a))return;
    const o=lines.get(c[0])||{q:0,a:0};o.q+=q;o.a+=a;lines.set(c[0],o);
  });
  if(!lines.size)throw new Error("No CRM line could be read");
  return lines;
}
function tbl(title,head,rows){
  exp.push([title],head,...rows.map(r=>r.map(c=>String(c).replace(/<[^>]+>/g,""))),[]);
  return `<h2>${title} <span class="mut">(${rows.length})</span></h2>`+(rows.length?`<div class="w"><table><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`:`<div class="ok">None ✓</div>`);
}
function run(){
  const tot=num($("tot").value),sum=[...crm.values()].reduce((s,o)=>s+o.a,0);
  const price=[],qty=[],miss=[],extra=[],off=[];exp=[];
  [...new Set([...inv.lines.keys(),...crm.keys()])].sort().forEach(k=>{
    const a=inv.lines.get(k),b=crm.get(k),L=esc(byName?((b&&b.name)||(a&&a.name)):k);
    if(a&&!b)extra.push([L,fm(a.q),fm(pu(a)),fm(a.a)]);
    else if(!a&&b)miss.push([L,fm(b.q),fm(pu(b)),fm(b.a)]);
    else{
      const pa=pu(a),pb=pu(b);
      if(isFinite(pa)&&isFinite(pb)&&Math.abs(pa-pb)>0.005)price.push([L,fm(a.q),fm(pb),fm(pa),`<span class="bad">${fm(pa-pb)}</span>`,fm(a.a-b.a)]);
      if(a.q!==b.q)qty.push([L,fm(b.q),fm(a.q),fm(a.q-b.q)]);
    }
    const c=(a&&a.code)||k;
    if(a&&P[c]!=null&&isFinite(pu(a))&&Math.abs(pu(a)-P[c])>0.005)off.push([c,fm(P[c]),fm(pu(a)),`<span class="bad">${fm(pu(a)-P[c])}</span>`]);
  });
  const d=sum-tot,ok=Math.abs(d)<0.01;
  $("out").innerHTML=`<div class="box">
  <div class="card"><div class="mut">Sum of the CRM état</div><div class="kpi">${fm(sum)}</div></div>
  <div class="card"><div class="mut">Invoice Total HT Brut</div><div class="kpi">${fm(tot)}</div></div>
  <div class="card"><div class="mut">Difference (list − invoice)</div><div class="kpi ${isNaN(d)?"":ok?"ok":"bad"}">${isNaN(d)?"–":fm(d)}</div></div></div>`
  +tbl("Unit price differences (P.U.HT)",["Code","Qty","P.U. list","P.U. invoice","Δ P.U.","Δ amount"],price)
  +tbl("Quantity differences",["Code","Qty list","Qty invoice","Δ"],qty)
  +tbl("On the list but missing from the invoice",["Code","Qty","P.U.","Amount"],miss)
  +tbl("On the invoice but not on the list",["Code","Qty","P.U.","Amount"],extra)
  +tbl("Invoice P.U. vs official 2026 price (prix pharmacie)",["Code","Official","Invoice","Δ"],off)
  +(warn.length?`<h2>Invoice lines that could not be read</h2><div class="mut">${warn.map(esc).join("<br>")}</div>`:"");
  $("ex").hidden=false;
  st(`${inv.lines.size} invoice products · ${crm.size} list products`);
}
/* ---------- classic reading (no AI) ---------- */
async function classic(){
  st("Reading invoice…");
  inv=await readPdf($("fi").files[0]);
  if(!isNaN(inv.total))$("tot").value=String(inv.total).replace(".",",");
  st("Reading CRM état…");
  const t=$("pt").value.trim();
  byName=!!t&&!CODE.test(t);
  if(byName){
    crm=parseNameCrm(t);
    const M=new Map();
    inv.lines.forEach(o=>{const k=normKey(o.name),e=M.get(k)||{q:0,a:0,code:o.code,name:o.name};e.q+=o.q;e.a+=o.a;M.set(k,e)});
    inv={...inv,lines:M};
  }else crm=parseCrm(t?pasteRows(t):sheetRows(XLSX.read(await $("fc").files[0].arrayBuffer(),{type:"array"})));
  run();
}
/* ---------- AI reading (published page only) ---------- */
async function pdfImages(file){
  pdfjsLib.GlobalWorkerOptions.workerSrc=WORKER;
  const doc=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise,out=[];
  for(let p=1;p<=doc.numPages;p++){
    const pg=await doc.getPage(p),vp=pg.getViewport({scale:1.8}),cv=document.createElement("canvas");
    cv.width=vp.width;cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext("2d"),viewport:vp}).promise;
    out.push(await new Promise(r=>cv.toBlob(r,"image/jpeg",0.85)));
  }
  return out;
}
const RULE="Return ONLY JSON. Use a dot as decimal separator and no thousands separators.";
async function crmText(){
  const t=$("pt").value.trim();if(t)return t;
  const f=$("fc").files[0];if(!f)return "";
  const wb=XLSX.read(await f.arrayBuffer(),{type:"array"});
  return XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]],{FS:" | "});
}
async function runAI(){
  const sample=window.claude?await claude.use("sample"):null;
  if(!sample)throw new Error("AI reading is not available outside the published page");
  const txt=await crmText();
  if(!txt)throw new Error("Add the CRM état (paste it or upload a file)");
  if(!(await sample.limits()).images)throw new Error("Images are not allowed in this view");
  st("Reading the invoice pages…");
  const imgs=await pdfImages($("fi").files[0]);
  const askInv=im=>sample.json(`These images are some pages of a supplier invoice. Extract every product line (ignore the DCI lines). Return {"total_ht_brut":number|null,"lines":[{"code":string|null,"name":string,"qty":number,"pu":number,"amount":number}]} where code is the product code like "TAD01/008" if printed, pu is PU HT, amount is PT HT, and total_ht_brut is the TOTAL HT BRUT if visible on these pages, else null. ${RULE}`,{images:im,modelTier:"complex",cache:false});
  const chunks=Array.from({length:Math.ceil(imgs.length/3)},(_,i)=>imgs.slice(i*3,i*3+3));
  const parts=await Promise.all(chunks.map(askInv));
  const a={total:parts.map(p=>+p.total_ht_brut).filter(x=>x>0).pop(),lines:parts.flatMap(p=>p.lines||[])};
  st("Reading the CRM état…");
  const b=await sample.json(`This text was copied from a CRM état and may have one value per line. Each product has: name, unit price (P.U. HT), quantity, optional flags such as A, a free-units or discount number, then the line amount. Extract every product, never skip or merge lines. Return {"lines":[{"name":string,"qty":number,"pu":number,"amount":number}]}. ${RULE}\n\n${txt}`,{modelTier:"complex",cache:false});
  st("Matching products…");
  const m=await sample.json(`Give each product line a canonical key, identical for the same product in both lists. If an invoice line has a code, use that code as its key and as the key of the matching ETAT line. Otherwise use brand + strength + pack size (e.g. "TADALIS 20MG B/2"). Different strengths or pack sizes are different products. Return {"inv":[key,...],"etat":[key,...]} aligned with the input order. ${RULE}\nINVOICE:\n${a.lines.map((l,i)=>i+": "+(l.code?l.code+" ":"")+l.name).join("\n")}\nETAT:\n${b.lines.map((l,i)=>i+": "+l.name).join("\n")}`,{modelTier:"default",cache:false});
  const agg=(L,K)=>{const M=new Map();L.forEach((l,i)=>{const k=K[i]||l.code||l.name,o=M.get(k)||{q:0,a:0};o.q+=+l.qty||0;o.a+=+l.amount||0;M.set(k,o)});return M};
  byName=false;inv={lines:agg(a.lines,m.inv),total:a.total};crm=agg(b.lines,m.etat);warn=[];
  if(a.total)$("tot").value=String(a.total).replace(".",",");
  run();
}
/* ---------- wiring ---------- */
$("go").onclick=async()=>{
  if(busy)return;
  if(!$("fi").files[0]){st("Add the invoice PDF first.");return}
  if(!$("pt").value.trim()&&!$("fc").files[0]){st("Paste the CRM état or upload a file.");return}
  busy=true;$("go").disabled=true;$("out").innerHTML="";$("ex").hidden=true;
  try{
    if(!$("ai").checked){
      try{await classic();return}
      catch(e){st("Standard reading failed ("+e.message+") — trying AI…")}
    }
    await runAI();
  }catch(e){
    st("Error: "+(e&&(e.message||e.code)||e));
  }finally{busy=false;$("go").disabled=false}
};
$("ex").onclick=async()=>{
  const csv="\ufeff"+exp.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(";")).join("\r\n");
  try{
    const dl=window.claude?await claude.use("downloads"):null;
    if(dl)return await dl.save({filename:"invoice-check.csv",data:csv});
  }catch(e){return}
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="invoice-check.csv";a.click();
};
(async()=>{try{if(!(window.claude&&await claude.use("sample")))$("aiw").hidden=true}catch(e){$("aiw").hidden=true}})();