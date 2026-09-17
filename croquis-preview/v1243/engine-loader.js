(async()=>{
  const base='https://raw.githubusercontent.com/aalaaiinn/appvaluo-web/croquis-v1243-preview/croquis-preview/v1243/engine-parts/';
  const parts=['part-00.txt','part-01.txt','part-02.txt','part-03.txt','part-04.txt','part-05.txt'];
  const src=(await Promise.all(parts.map(async n=>{
    const r=await fetch(base+n+'?v=1243',{cache:'no-store'});
    if(!r.ok)throw new Error(`Motor 3D ${n}: ${r.status}`);
    return r.text();
  }))).join('');
  const url=URL.createObjectURL(new Blob([src],{type:'text/javascript'}));
  try{await import(url)}finally{setTimeout(()=>URL.revokeObjectURL(url),10000)}
})().catch(e=>console.error('[AppValúo V12.24.3] no cargó motor 3D',e));
