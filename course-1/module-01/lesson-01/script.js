'use strict';
// Source content: Cana's Lesson 1.1 slides 4–8 and Unit 1 Assessments.
// Each dropdown is accessible by keyboard, touch, mouse, and screen readers.
const placements=[
{id:'dc_lymph',title:'Lymphoid-derived dendritic cell',answer:'Dendritic cell',x:338,y:92},
{id:'helper',title:'T helper branch',answer:'Helper T cell',x:592,y:112},
{id:'cytotoxic',title:'T cytotoxic branch',answer:'Cytotoxic T cell',x:748,y:111},
{id:'bcell',title:'B-cell progenitor branch',answer:'B cell',x:980,y:93},
{id:'ilc',title:'Innate lymphoid-cell branch',answer:'Innate lymphoid cell',x:1209,y:115},
{id:'dc_myelo',title:'Myeloid-derived dendritic cell',answer:'Dendritic cell',x:329,y:614},
{id:'monocyte',title:'Granulocyte–monocyte progenitor: monocyte branch',answer:'Monocyte',x:476,y:607},
{id:'neutrophil',title:'Granulocyte–monocyte progenitor: granulocyte branch',answer:'Neutrophil',x:586,y:611},
{id:'eosinophil',title:'Eosinophil progenitor branch',answer:'Eosinophil',x:754,y:611},
{id:'basophil',title:'Basophil progenitor branch',answer:'Basophil',x:902,y:610},
{id:'macrophage',title:'Monocyte descendant in tissues',answer:'Macrophage',x:475,y:726},
{id:'mast',title:'Myeloid mast-cell branch',answer:'Mast cell',x:991,y:699},
{id:'platelets',title:'Megakaryocyte descendant',answer:'Platelets',x:1075,y:612},
{id:'erythrocyte',title:'Erythroid progenitor branch',answer:'Erythrocyte',x:1209,y:608}];
const bank=[
{key:'helper',name:'Helper T cell'}, {key:'cytotoxic',name:'Cytotoxic T cell'},
{key:'bcell',name:'B cell'}, {key:'ilc',name:'Innate lymphoid cell'},
{key:'dc_lymph',name:'Dendritic cell'}, {key:'dc_myelo',name:'Dendritic cell'},
{key:'monocyte',name:'Monocyte'}, {key:'neutrophil',name:'Neutrophil'},
{key:'eosinophil',name:'Eosinophil'}, {key:'basophil',name:'Basophil'},
{key:'macrophage',name:'Macrophage'}, {key:'mast',name:'Mast cell'},
{key:'platelets',name:'Platelets'}, {key:'erythrocyte',name:'Erythrocyte'}];
const placed=Object.fromEntries(placements.map(p=>[p.id,'']));
let active='';let attempt=false;
const q1Bank=document.getElementById('q1bank');
function inventory(){let taken={};Object.values(placed).forEach(name=>{if(name)taken[name]=(taken[name]||0)+1});return taken}
function updateQ1(){let used=inventory();bank.forEach((item,i)=>{let el=document.getElementById('tile-'+i);let available=(used[item.name]||0)<(item.name==='Dendritic cell'?2:1);let selected=active===item.name;el.disabled=!available&&!selected;el.setAttribute('aria-pressed',String(selected));el.classList.toggle('selected',selected);el.classList.toggle('used',!available);});placements.forEach((p,i)=>{let b=document.getElementById('spot-'+p.id);let sel=document.getElementById('pick-'+p.id);let value=placed[p.id];b.querySelector('.spotval').textContent=value||'Place cell';b.classList.toggle('filled',!!value);b.classList.toggle('right',attempt&&value===p.answer);b.classList.toggle('wrong',attempt&&value!==p.answer);sel.value=value;});}
function placeCell(id,name){if(!name){placed[id]='';attempt=false;updateQ1();return}let count=Object.values(placed).filter(x=>x===name).length-(placed[id]===name?1:0);if(count>=(name==='Dendritic cell'?2:1)){document.getElementById('q1feedback').textContent='That cell is already placed. Clear its earlier location to move it.';return}placed[id]=name;active='';attempt=false;document.getElementById('q1feedback').textContent='';updateQ1()}
function buildQ1(){let options=[...new Set(bank.map(c=>c.name))].sort((a,b)=>a.localeCompare(b));bank.forEach((card,i)=>{let b=document.createElement('button');b.type='button';b.className='cell-tile';b.id='tile-'+i;b.draggable=true;b.setAttribute('aria-pressed','false');b.innerHTML='<img src="assets/cell-'+card.key+'.png" alt=""><span>'+card.name+'</span>';b.addEventListener('click',()=>{active=active===card.name?'':card.name;updateQ1()});b.addEventListener('dragstart',e=>{active=card.name;e.dataTransfer.setData('text/plain',card.name);e.dataTransfer.effectAllowed='move'});q1Bank.append(b)});
placements.forEach((p,i)=>{let button=document.createElement('button');button.type='button';button.id='spot-'+p.id;button.className='diagram-spot';button.style.left=(p.x/1400*100)+'%';button.style.top=(p.y/788*100)+'%';button.setAttribute('aria-label','Location '+(i+1)+': '+p.title+'. Select a cell card, then activate this location.');button.innerHTML='<span class="spotnum">'+(i+1)+'</span><span class="spotval">Place cell</span>';button.addEventListener('click',()=>{if(active)placeCell(p.id,active);else if(placed[p.id])placeCell(p.id,'');else document.getElementById('q1feedback').textContent='Select a cell card above, then choose a blank location.'});button.addEventListener('dragover',e=>{e.preventDefault()});button.addEventListener('drop',e=>{e.preventDefault();placeCell(p.id,e.dataTransfer.getData('text/plain'))});document.getElementById('q1spots').append(button);
let row=document.createElement('div');row.className='location-row';let label=document.createElement('label');label.htmlFor='pick-'+p.id;label.textContent='Location '+(i+1)+': '+p.title;let select=makeSelect('pick-'+p.id,options,'Choose cell');select.addEventListener('change',()=>placeCell(p.id,select.value));row.append(label,select);document.getElementById('q1accessible').append(row)});updateQ1()}
function checkQ1(){attempt=true;let count=placements.filter(p=>placed[p.id]===p.answer).length;let missing=placements.filter(p=>!placed[p.id]).length;document.getElementById('q1feedback').textContent=count+' of '+placements.length+' correct. '+(count===placements.length?'All cells are in the correct locations.':(missing?missing+' locations are still blank. ':'')+'Locations needing review are marked. Select a used location to clear it, then try again.');updateQ1()}
function resetQ1(){placements.forEach(p=>placed[p.id]='');active='';attempt=false;document.getElementById('q1feedback').textContent='';updateQ1()}
function makeSelect(id,options,placeholder){let el=document.createElement('select');el.id=id;let blank=new Option(placeholder,'');el.add(blank);for(let option of options)el.add(new Option(option,option));return el}
function makeStatus(){let span=document.createElement('span');span.className='rowstatus';span.setAttribute('aria-live','polite');return span}

function check(items,prefix){let correct=0;let chosen=items.map(i=>document.getElementById(i.id).value);for(let [idx,item] of items.entries()){let el=document.getElementById(item.id);let ok=chosen[idx]===item.answer;if(ok)correct++;let status=el.nextElementSibling;status.textContent=!chosen[idx]?'No answer selected':ok?'Correct':'Not quite — try again';status.className='rowstatus '+(ok?'right':'wrong');el.setAttribute('aria-invalid',String(!ok))}let msg=document.getElementById(prefix+'feedback');let note=prefix==='q1'?' The two dendritic-cell entries represent their two possible developmental origins.':'';msg.textContent=`${correct} of ${items.length} correct. ${correct===items.length?'All responses are correct.':'Review the marked responses and try again.'}${prefix==='q3'?' A = growth factor; B = surface receptor; C = transcription factor.':''}${note}`}
function reset(items,prefix){for(let item of items){let el=document.getElementById(item.id);el.value='';el.removeAttribute('aria-invalid');let status=el.nextElementSibling;status.textContent='';status.className='rowstatus'}document.getElementById(prefix+'feedback').textContent=''}
const q2=[
 ['B cells','Lymphoid'],['T cells','Lymphoid'],['Innate lymphoid cells (including NK cells)','Lymphoid'],
 ['Neutrophils','Myeloid'],['Eosinophils','Myeloid'],['Basophils','Myeloid'],['Mast cells','Myeloid'],
 ['Monocytes','Myeloid'],['Macrophages','Myeloid'],['Red blood cells','Myeloid'],['Platelets','Myeloid'],['Dendritic cells','Both']
].map((x,i)=>({id:'sort-'+i,label:x[0],answer:x[1]}));
function buildQ2(){let root=document.getElementById('sortRows');for(let q of q2){let row=document.createElement('div');row.className='sortrow';let lab=document.createElement('label');lab.htmlFor=q.id;lab.textContent=q.label;let select=makeSelect(q.id,['Myeloid','Lymphoid','Both'],'Choose a lineage');row.append(lab,select,makeStatus());root.append(row)}}
const q3=[{id:'signal-a',label:'Which part represents a molecule found in bone marrow that directs cell development during hematopoiesis?',answer:'A'}, {id:'signal-b',label:'Which part would bind to growth factors in the bone marrow?',answer:'B'}, {id:'signal-c',label:'Which part directs changes in gene expression inside the cell?',answer:'C'}];
function buildQ3(){let root=document.getElementById('signalRows');for(let q of q3){let row=document.createElement('div');row.className='signalrow';let lab=document.createElement('label');lab.htmlFor=q.id;lab.textContent=q.label;let select=makeSelect(q.id,['A','B','C'],'Choose a letter');row.append(lab,select,makeStatus());root.append(row)}}
function wire(prefix,items){document.getElementById(prefix+'check').addEventListener('click',()=>check(items,prefix));document.getElementById(prefix+'reset').addEventListener('click',()=>reset(items,prefix));}
buildQ1();buildQ2();buildQ3();document.getElementById('q1check').addEventListener('click',checkQ1);document.getElementById('q1reset').addEventListener('click',resetQ1);wire('q2',q2);wire('q3',q3);
