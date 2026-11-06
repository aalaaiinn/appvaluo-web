import test from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const host="https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app/";
await mkdir("artifacts",{recursive:true});
for(const [name,viewport] of [
 ["escritorio",{width:1366,height:900}],
 ["movil",{width:390,height:844}],
]){
 test("Opinión de Valor: pantalla pública "+name,{timeout:30000},async()=>{
  const b=await chromium.launch({headless:true});
  const c=await b.newContext({viewport,deviceScaleFactor:1});
  const p=await c.newPage();
  const errors=[];
  p.on("pageerror",e=>errors.push(String(e)));
  try{
    const res=await p.goto(host,{waitUntil:"domcontentloaded",timeout:18000});
    assert.equal(res.status(),200);
    await p.locator("#authGate").waitFor({state:"visible",timeout:12000});
    await p.screenshot({path:"artifacts/opinion-"+name+".png",fullPage:true,timeout:12000});
    const view=await p.evaluate(()=>({
      title:document.title,
      visibleText:document.body.innerText.slice(0,500),
      buttons:[...document.querySelectorAll("button")].filter(x=>x.getBoundingClientRect().width>0).map(x=>x.textContent.trim()).filter(Boolean).slice(0,12),
      horizontalOverflow:document.documentElement.scrollWidth>window.innerWidth+2
    }));
    console.log(name,JSON.stringify(view));
    assert.match(view.title,/AppVal/i);
    assert.equal(view.horizontalOverflow,false);
    // No se envían datos, nunca se pulsa un botón de sesión o compra.
    assert.equal(errors.length,0,"Errores JS: "+errors.join("; ").slice(0,500));
  }finally{await c.close();await b.close()}
 });
}
