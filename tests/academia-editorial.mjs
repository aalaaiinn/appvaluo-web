import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const read = name => readFileSync(name, 'utf8');
const home=read('academia.html');
const nay=read('academia-nayarit.html');
const lat=read('academia-internacional.html');
const sitemap=read('sitemap.xml');
const js=read('academia.js');
const css=read('academia-contenido.css');

for (const [file,html] of [['academia-nayarit.html',nay],['academia-internacional.html',lat]]) {
  assert.match(html, /<html lang="es-MX">/, `${file}: lengua`);
  assert.match(html, /<h1>/, `${file}: título principal`);
  assert.match(html, /href="academia.html"/, `${file}: regreso a biblioteca`);
  assert.match(html, /academia-contenido.css/, `${file}: estilos comunes`);
  assert.match(sitemap,new RegExp(file.replace('.', '\\.') ), `${file}: sitemap`);
}
const [regional,international]=home.split('data-category="mexico"');
assert.ok(international,'Dos tarjetas editoriales');
assert.match(regional,/href="academia-nayarit.html"/);
assert.doesNotMatch(regional,/href="academia-internacional.html"/);
assert.match(international,/href="academia-internacional.html"/);
assert.doesNotMatch(international,/href="academia-nayarit.html"/);
assert.match(nay,/Catastral y Registral aparece como abrogada/,'Nayarit: distinguir norma abrogada');
assert.match(lat,/Resolución 941 de 2026/,'Colombia: nueva resolución');
assert.match(lat,/derogó la Resolución 620 de 2008/,'Colombia: registrar derogación');
assert.match(lat,/ficticias/,'Ejercicio explícitamente ficticio');
assert.match(js,/r.status===404 \|\| r.status===410/,'No bloquear por HEAD 403/405');
assert.ok((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'CSS equilibrado');

for (const [name] of [['biblioteca/manual_regional_nayarit_2026.pdf'],['biblioteca/tratado_mexico_latinoamerica_2026.pdf']]) {
  assert.ok(statSync(name).size > 100_000,`${name}: archivo no vacío`);
  assert.equal(readFileSync(name).subarray(0,5).toString(),'%PDF-',`${name}: PDF real`);
}

const refs=[[3250,.98],[3400,.95],[3100,1.03],[3300,.97],[3150,1.02],[3500,.91]].map(([price,factor])=>price*factor).sort((a,b)=>a-b);
assert.deepEqual(refs,[3185,3185,3193,3201,3213,3230]);
assert.equal((refs[2]+refs[3])/2,3197);
assert.equal(3197*150,479550);
console.log('Academia: comprobaciones estáticas de estructura, PDFs, vigencia y aritmética aprobadas.');
