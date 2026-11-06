/**
 * Inspección de frontend público: no toca expedientes, usuarios ni credenciales.
 * Lee una vez el CSS y JS públicos para localizar selectores del panel de usuario.
 */
const host="https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app";
for(const asset of ["styles.css","app.js"]){
  const res=await fetch(host+"/"+asset,{signal:AbortSignal.timeout(13000)});
  if(!res.ok)throw Error(asset+" HTTP "+res.status);
  const txt=await res.text();
  const lines=txt.split(/\r?\n/);
  const selectors=[];
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(/admin|user[-_]|project[-_]|modal|account|tarif|billing|panel|grid/i.test(line)&&
       (line.includes("{")||line.includes("className")||line.includes("class="))){
       if(asset==="styles.css" && line.includes("{"))selectors.push({line:i+1,text:line.trim().slice(0,250)});
       if(asset==="app.js" && /admin|user[-_]|project[-_]|modal|account|tarif|billing/i.test(line))
         selectors.push({line:i+1,text:line.replace(/(['"])[^'"]+@[^'"]+\1/g,"'REDACTED'").trim().slice(0,200)});
    }
    if(selectors.length>=100)break;
  }
  console.log(JSON.stringify({asset,characters:txt.length,lines:lines.length,selectors:selectors.slice(0,100)},null,2));
}

{
const css=await (await fetch(host+"/styles.css")).text();
const candidates=[...css.matchAll(/([.#][a-z][a-z0-9_.:#>\s,-]*(?:admin|account|user|tariff|modal|project)[a-z0-9_.:#>\s,-]*)\{([^}]{0,1000})\}/gi)]
 .slice(0,100).map(([whole,selector,body])=>({selector:selector.trim().slice(0,120),rule:body.slice(0,420)}));
console.log("ADMIN_STYLE_RULES_START"+JSON.stringify(candidates)+"ADMIN_STYLE_RULES_END");
const js=await (await fetch(host+"/app.js")).text();
for(const term of ["tariffPanel.innerHTML","admin-item-actions","id=\"adminPanel\"","adminDrawer"]){
 const at=js.indexOf(term);
 if(at>=0)console.log("ADMIN_MARKUP",term,js.slice(Math.max(0,at-220),at+900).slice(0,1100));
}
}

{
 const js=await (await fetch(host+"/app.js")).text();
 const p=js.indexOf("tariffPanel.innerHTML");
 console.log("TARIFF_MARKUP_START"+js.slice(p,p+2600)+"TARIFF_MARKUP_END");
 const css=await(await fetch(host+"/styles.css")).text();
 const match=css.match(/\.admin-item[^}]{0,1200}\}/gi)||[];
 console.log("ADMIN_CSS_START"+JSON.stringify(match.slice(0,15))+"ADMIN_CSS_END");
 const login=css.match(/#admin[^}]{0,400}\}/gi)||[];
 console.log("ADMIN_MODAL_CSS_START"+JSON.stringify(login.slice(0,30))+"ADMIN_MODAL_CSS_END");
}

for(const url of [
 "https://appvaluo-opinion-valor-rapida.vercel.app/verificar.html",
 "https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app/verificar.html"
]){
 try{
  const r=await fetch(url,{redirect:"manual",signal:AbortSignal.timeout(10000)});
  console.log("QR_VERIFICACION_PUBLICA",new URL(url).hostname,r.status,r.headers.get("x-vercel-error")||"-");
  await r.body?.cancel();
 }catch(err){console.log("QR_VERIFICACION_PUBLICA",new URL(url).hostname,"NETWORK_ERROR",String(err).slice(0,160))}
}
