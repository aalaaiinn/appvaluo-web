(()=>{
  'use strict';
  const input=document.getElementById('jurSearch');
  const rows=Array.from(document.querySelectorAll('tr[data-buscar]'));
  const count=document.getElementById('jurCount');
  if(!input)return;
  function refresh(){
    const term=(input.value||'').trim().toLocaleLowerCase('es');
    let visible=0;
    for(const row of rows) {
      row.hidden=!row.dataset.buscar.includes(term);
      if(!row.hidden)visible++;
    }
    if(count)count.textContent=visible+' jurisdiccion'+(visible===1?'':'es')+' visible'+(visible===1?'':'s')+' de '+rows.length;
  }
  input.addEventListener('input',refresh);
  refresh();
})();