import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "playwright";

/* Datos ficticios. Obtiene solo CSS público, no toca datos de usuarios reales. */
const res=await fetch("https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app/styles.css",{signal:AbortSignal.timeout(12000)});
assert.equal(res.status,200);
const original=await res.text();
const fix=await readFile(new URL("./estilos-admin-predeploy.css",import.meta.url),"utf8");
await mkdir("artifacts",{recursive:true});
const items=Array.from({length:5},(_,i)=>'<div class="admin-item tariff-item">'
 +'<div><strong>Persona demo '+(i+1)+'</strong><small>demo'+(i+1)+'@ejemplo.invalid · User · Activa</small></div>'
 +'<div class="admin-item-actions"><label class="tariff-control">Tarifa MXN<input type="number" value="245"></label>'
 +'<label class="tariff-check"><input type="checkbox"> Exento</label>'
 +'<button class="secondary compact">Guardar</button><button class="secondary compact">Desactivar</button>'
 +'<button class="secondary compact">Confirmar acceso</button><button class="secondary compact danger-action">Eliminar cuenta</button>'
 +'</div></div>').join("");
for (const width of [320,390,768,1060]) {
 test("Tarifas sin desbordamientos a "+width+"px",{timeout:20000},async()=>{
   const browser=await chromium.launch({headless:true});
   const page=await browser.newPage({viewport:{width,height:820},deviceScaleFactor:1});
   try{
    await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>'
      +original+'\n'+fix+'</style></head><body style="margin:0;padding:10px;background:#edf7f3">'
      +'<main style="width:min(100%,1080px);margin:auto;padding:14px;box-sizing:border-box;background:#fff">'
      +'<h1>Usuarios y registro · datos de ejemplo</h1><div id="adminTariffs">'
      +items+'</div></main></body></html>');
    const result=await page.evaluate(()=>{
      const container=document.querySelector("#adminTariffs");
      return {overflow:document.documentElement.scrollWidth>innerWidth+2,
        rows:[...container.querySelectorAll(".tariff-item")].map(row=>{
         const b=row.getBoundingClientRect();
         return {buttonOverflow:[...row.querySelectorAll("button")].some(el=>{
           const r=el.getBoundingClientRect();return r.right>b.right+2||r.left<b.left-2;
         }),textOverflow:row.querySelector("small").scrollWidth>row.querySelector("small").clientWidth+2}
        })};
    });
    console.log(width,JSON.stringify(result));
    assert.equal(result.overflow,false,"La página presenta desplazamiento horizontal");
    assert.equal(result.rows.length,5);
    assert.ok(result.rows.every(x=>!x.buttonOverflow&&!x.textOverflow),"Algún control sale del recuadro");
    await page.screenshot({path:"artifacts/opinion-admin-"+width+".png",fullPage:true});
   }finally{await browser.close();}
 });
}
