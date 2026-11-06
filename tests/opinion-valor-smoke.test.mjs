/**
 * Comprobar únicamente la versión accesible de Opinión de Valor.
 * No usa credenciales, no carga expedientes, no solicita PDFs, no escribe datos.
 */
import test from "node:test";
import assert from "node:assert/strict";
const host="https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app";

test("Página de Opinión de Valor accesible", async()=>{
 const response=await fetch(host+"/",{signal:AbortSignal.timeout(12000)});
 const page=await response.text();
 console.log("inicio HTTP",response.status,"título",page.match(/<title>([^<]*)/i)?.[1]);
 assert.equal(response.status,200);
 assert.match(page,/AppVal/i);
 assert.ok(page.includes("app.js")&&page.includes("styles.css"),"Se esperan archivos de interfaz");
 assert.ok(page.includes("authGate")||page.includes("login"),"La interfaz identifica el control de acceso");
});
for(const path of ["/styles.css","/app.js","/manifest.webmanifest","/api/health"]){
 test("Recurso de Opinión: "+path, async()=>{
  const response=await fetch(host+path,{method:"GET",redirect:"manual",signal:AbortSignal.timeout(12000),headers:{"user-agent":"AppValuo-ReadOnly-HealthCheck/1.0"}});
  console.log(path,"HTTP",response.status,"content-type",response.headers.get("content-type"));
  if(path==="/api/health"){
   assert.ok(response.status>=200&&response.status<400,"La API de salud no respondió");
  }else assert.equal(response.status,200);
  // Evitar transferencias adicionales y NO examinar contenido de cuentas privadas.
  await response.body?.cancel();
 });
}
