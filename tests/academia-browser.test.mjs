import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';

const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const shots=resolve(root,'artifacts');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8','.pdf':'application/pdf','.png':'image/png',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
let browser,server,base;
before(async()=>{
  await mkdir(shots,{recursive:true});
  server=createServer(async(req,res)=>{
    try {
      if(req.method!=='GET'&&req.method!=='HEAD')return res.writeHead(405).end();
      const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
      const absolute=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
      if(!absolute.startsWith(root+sep))return res.writeHead(403).end();
      const bytes=await readFile(absolute);
      res.writeHead(200,{'Content-Type':mime[extname(absolute)]||'application/octet-stream',
       'Content-Length':String(bytes.length),'Cache-Control':'no-store'});
      return res.end(req.method==='HEAD'?undefined:bytes);
    } catch {return res.writeHead(404).end('Not found');}
  });
  await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
  base='http://127.0.0.1:'+server.address().port+'/';
  browser=await chromium.launch({headless:true});
});
after(async()=>{await browser?.close();if(server)await new Promise(ok=>server.close(ok));});

async function visit(path,viewport){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',acceptDownloads:true});
 await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
 const page=await context.newPage();
 const errors=[];page.on('pageerror',err=>errors.push(String(err)));
 await page.goto(base+path,{waitUntil:'load'});
 return {page,context,errors};
}
async function safeViewport(page,errors){
 const widths=await page.evaluate(()=>({width:innerWidth,content:document.documentElement.scrollWidth}));
 assert.ok(widths.content<=widths.width+2,'Desbordamiento horizontal '+JSON.stringify(widths));
 assert.deepEqual(errors,[]);
}
test('Portal -> Academia: 2 libros y 2 recursos metodológicos',async()=>{
 const {context,page,errors}=await visit('index.html',{width:1440,height:900});
 try{
  await page.locator('a[href="academia.html"]').first().click();
  await page.waitForURL('**/academia.html');
  assert.equal(await page.locator('.publication').count(),2);
  assert.equal(await page.locator('.resource-card').count(),2);
  assert.equal(await page.locator('a[href="academia-nayarit.html"]').count(),1);
  assert.equal(await page.locator('a[href="academia-internacional.html"]').count(),1);
  await safeViewport(page,errors);
  await page.screenshot({path:resolve(shots,'academia-escritorio.png')});
 } finally{await context.close();}
});
test('Buscador y filtros regional/internacional con estado vacío',async()=>{
 const {context,page,errors}=await visit('academia.html',{width:390,height:844});
 try{
  const items=page.locator('.publication:visible');
  assert.equal(await items.count(),2);
  await page.locator('[data-filter="nayarit"]').click();
  assert.equal(await items.count(),1);
  await page.locator('[data-filter="mexico"]').click();
  assert.equal(await items.count(),1);
  await page.locator('[data-filter="todos"]').click();
  await page.locator('#librarySearch').fill('Latinoamérica');
  assert.equal(await items.count(),1);
  await page.locator('#librarySearch').fill('NoExiste987234');
  assert.equal(await items.count(),0);
  assert.ok(await page.locator('#noResults').isVisible());
  await page.locator('#librarySearch').fill('');
  assert.equal(await items.count(),2);
  await safeViewport(page,errors);
  await page.screenshot({path:resolve(shots,'academia-movil.png')});
 } finally{await context.close();}
});
test('Los PDF reales permiten HEAD, GET y visor/cierre',async()=>{
 const {context,page,errors}=await visit('academia.html',{width:1024,height:768});
 try{
  const docs=['biblioteca/manual_regional_nayarit_2026.pdf','biblioteca/tratado_mexico_latinoamerica_2026.pdf'];
  for(const doc of docs){
   const head=await page.request.head(base+doc);
   assert.equal(head.status(),200);
   assert.match(head.headers()['content-type']||'',/application\/pdf/);
   const get=await page.request.get(base+doc);
   assert.equal(get.status(),200);
   assert.ok((await get.body()).length>100000);
  }
  await page.locator('.publication').first().locator('button.view-pdf').click();
  assert.ok(await page.locator('#pdfReader').evaluate(el=>el.open));
  assert.match(await page.locator('#readerFrame').getAttribute('src'),/manual_regional_nayarit/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#pdfReader').evaluate(el=>el.open),false);
  const [download]=await Promise.all([
   page.waitForEvent('download'),
   page.locator('.publication').last().locator('a.pdf-download').click()
  ]);
  assert.match(download.suggestedFilename(),/\.pdf$/i);
  await safeViewport(page,errors);
 }finally{await context.close();}
});
test('Recursos, directorio e impresiones: navegables y sin 404',async()=>{
 const urls=['academia-nayarit.html','academia-internacional.html','academia-jurisdicciones.html','academia-metodologia.html'];
 for(const width of [320,360,768,1440]){
  const {context,page,errors}=await visit('academia-jurisdicciones.html',{width,height:850});
  try{
   assert.equal(await page.locator('tr[data-grupo="nayarit"]').count(),20);
   assert.equal(await page.locator('tr[data-grupo="mexico"]').count(),32);
   await page.locator('#jurSearch').fill('Tepic');
   assert.equal(await page.locator('tr[data-buscar]:visible').count(),1);
   await page.locator('#jurSearch').fill('');
   assert.equal(await page.locator('tr[data-buscar]:visible').count(),52);
   await safeViewport(page,errors);
   if(width===360)await page.screenshot({path:resolve(shots,'academia-jurisdicciones-movil.png')});
  }finally{await context.close();}
 }
 for(const url of urls){
  const {context,page,errors}=await visit(url,{width:390,height:844});
  try{
   assert.equal(await page.locator('h1').count(),1);
   await safeViewport(page,errors);
  }finally{await context.close();}
 }
});


test('Suplementos imprimibles A4: generar tres PDF de capacitación',async()=>{
 const books=[
  ['academia-nayarit.html','academia-nayarit-suplemento.pdf'],
  ['academia-internacional.html','academia-internacional-suplemento.pdf'],
  ['academia-metodologia.html','academia-metodologia-suplemento.pdf']
 ];
 for(const [route,filename] of books){
  const {context,page,errors}=await visit(route,{width:1024,height:1440});
  try{
   await safeViewport(page,errors);
   const bytes=await page.pdf({path:resolve(shots,filename),format:'A4',printBackground:true,preferCSSPageSize:true});
   assert.ok(bytes.length>15000,'PDF imprimible vacío: '+route);
   assert.equal(bytes.subarray(0,5).toString(),'%PDF-','PDF inválido: '+route);
  }finally{await context.close();}
 }
});
