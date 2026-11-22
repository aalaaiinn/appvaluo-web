(()=>{
  'use strict';
  const search = document.getElementById('librarySearch');
  const cards = [...document.querySelectorAll('.publication')];
  const filters = [...document.querySelectorAll('.filter')];
  const empty = document.getElementById('noResults');
  const modal = document.getElementById('pdfReader');
  const frame = document.getElementById('readerFrame');
  const external = document.getElementById('readerExternal');
  const title = document.getElementById('readerTitle');
  let activeFilter = 'todos';

  function refresh() {
    const text = (search?.value || '').trim().toLocaleLowerCase('es');
    let count = 0;
    cards.forEach(card=>{
      const matchCategory = activeFilter === 'todos' || card.dataset.category === activeFilter;
      const matchTerm = !text || (card.textContent + ' ' + card.dataset.keywords).toLocaleLowerCase('es').includes(text);
      card.hidden = !(matchCategory && matchTerm);
      if (!card.hidden) count++;
    });
    if (empty) empty.hidden = count > 0;
  }
  search?.addEventListener('input',refresh);
  filters.forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter;
    filters.forEach(b=>{const selected=b===button;b.classList.toggle('is-selected',selected);b.setAttribute('aria-pressed',String(selected));});
    refresh();
  }));

  document.querySelectorAll('.view-pdf').forEach(button=>button.addEventListener('click',()=>{
    if(button.disabled || !modal || !frame) return;
    const path=button.dataset.pdf;
    if (!path) return;
    title.textContent=button.dataset.title||'Documento PDF';
    external.href=path;
    frame.src=path+'#toolbar=1&navpanes=0';
    if(typeof modal.showModal === 'function') modal.showModal();
    else window.open(path,'_blank','noopener');
  }));
  function closeReader(){modal?.close();if(frame) frame.removeAttribute('src');}
  document.getElementById('closeReader')?.addEventListener('click',closeReader);
  modal?.addEventListener('close',()=>frame?.removeAttribute('src'));
  modal?.addEventListener('click',ev=>{if(ev.target===modal)closeReader();});

  // Evita botones rotos en vistas de una rama sin los binarios; en el paquete completo sí existen.
  if(location.protocol==='https:' || location.protocol==='http:') {
    cards.forEach(async card=>{
      const link=card.querySelector('a.pdf-download');
      const button=card.querySelector('button.view-pdf');
      const status=card.querySelector('.file-status');
      if(!link) return;
      try {
        const r=await fetch(link.getAttribute('href'),{method:'HEAD',cache:'no-store'});
        if(!r.ok) throw new Error('PDF not found');
        if(status) status.textContent='PDF disponible para lectura y descarga';
      } catch(err) {
        if(button) button.disabled=true;
        link.removeAttribute('href');
        link.setAttribute('aria-disabled','true');
        link.style.opacity='.44';
        link.style.pointerEvents='none';
        if(status)status.textContent='PDF pendiente de publicación en este servidor.';
      }
    });
  }
  const progress=document.getElementById('scrollProgress');
  let ticking=false;
  addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const max=document.documentElement.scrollHeight-innerHeight;
      if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';
      ticking=false;
    });
  },{passive:true});
})();
