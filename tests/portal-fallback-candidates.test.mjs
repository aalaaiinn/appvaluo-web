/**
 * Alternativas históricas AppValúo. SOLO LECTURA.
 * Cada candidata recibe un GET, sin sesión, sin cookies y sin datos de usuarios.
 * HTTP 200 únicamente confirma respuesta pública, NO compatibilidad con la
 * aplicación actual, backend, credenciales, flujos o expedientes.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
const targets=[
 ['Opinión antigua','https://appvaluo-opinion-valor-aq9q1akil-alainolmos52-5287s-projects.vercel.app/'],
 ['Opinión reciente','https://appvaluo-opinion-valor-rapida-22s4mm53v.vercel.app/'],
 ['Croquis histórico v1246','https://croquis-ia-cad-online-v1246-5bb02kzgx.vercel.app/'],
 ['Croquis histórico v1245','https://croquis-ia-cad-online-v1245-9gzexm9qx.vercel.app/'],
 ['Catastro histórico v8','https://agente-tramites-catastrales-v8-40by71mlt.vercel.app/'],
 ['Catastro histórico final','https://agente-tramites-catastrales-vercel-final-lsyskhu4h.vercel.app/'],
 ['Catastro web antiguo','https://agente-avaluo-catastral-jn0wnjpia-alainolmos52-5287s-projects.vercel.app/'],
];
for(const [name,url] of targets){
 test('Candidato alternativo: '+name,{timeout:15000},async()=>{
   const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(10000),headers:{accept:'text/html','user-agent':'AppValuo-ReadOnly-HealthCheck/1.0'}});
   const textPart=(await r.text()).slice(0,1000);
   const title=(textPart.match(/<title[^>]*>([^<]*)<\/title>/i)||[])[1]||'(título no encontrado)';
   console.log(name+' HTTP '+r.status+' Title: '+title.slice(0,130)+' Header: '+(r.headers.get('x-vercel-error')||'-'));
   assert.ok(r.status>=200&&r.status<400,'HTTP no navegable '+r.status);
 });
}
