'use strict';
// Source content: Cana's Lesson 1.1 slides 4–8 and Unit 1 Assessments.
// Each dropdown is accessible by keyboard, touch, mouse, and screen readers.
const q1=[
 {id:'t-helper',branch:'lymph',hint:'T-cell branch · helper',answer:'Helper T cell'},
 {id:'t-cyto',branch:'lymph',hint:'T-cell branch · cytotoxic',answer:'Cytotoxic T cell'},
 {id:'b-cell',branch:'lymph',hint:'B-cell progenitor',answer:'B cell'},
 {id:'ilc',branch:'lymph',hint:'Innate lymphoid branch',answer:'Innate lymphoid cell (ILC)'},
 {id:'dc-l',branch:'lymph',hint:'Dendritic cell from lymphoid progenitor',answer:'Dendritic cell (lymphoid-derived)'},
 {id:'mono',branch:'myelo',hint:'Granulocyte–monocyte branch · circulating phagocyte',answer:'Monocyte'},
 {id:'macro',branch:'myelo',hint:'Monocyte branch · tissue phagocyte',answer:'Macrophage'},
 {id:'neut',branch:'myelo',hint:'Granulocyte–monocyte branch · granulocyte',answer:'Neutrophil'},
 {id:'eos',branch:'myelo',hint:'Eosinophil progenitor',answer:'Eosinophil'},
 {id:'baso',branch:'myelo',hint:'Basophil progenitor',answer:'Basophil'},
 {id:'mast',branch:'myelo',hint:'Granulocyte lineage · tissue-resident cell',answer:'Mast cell'},
 {id:'plate',branch:'myelo',hint:'Megakaryocyte',answer:'Platelets'},
 {id:'eryth',branch:'myelo',hint:'Erythroid progenitor',answer:'Erythrocyte'},
 {id:'dc-m',branch:'myelo',hint:'Dendritic cell from myeloid progenitor',answer:'Dendritic cell (myeloid-derived)'}
];
const choices=q1.map(x=>x.answer).sort((a,b)=>a.localeCompare(b));
function makeSelect(id,options,placeholder){let el=document.createElement('select');el.id=id;let blank=new Option(placeholder,'');el.add(blank);for(let option of options)el.add(new Option(option,option));return el}
function makeStatus(){let span=document.createElement('span');span.className='rowstatus';span.setAttribute('aria-live','polite');return span}
function buildQ1(){for(let q of q1){let parent=document.getElementById(q.branch+'Slots');let wrap=document.createElement('div');wrap.className='slot';let label=document.createElement('label');label.htmlFor=q.id;label.textContent=q.hint;let select=makeSelect(q.id,choices,'Choose the cell');let status=makeStatus();wrap.append(label,select,status);parent.append(wrap)} }
function check(items,prefix){let correct=0;let chosen=items.map(i=>document.getElementById(i.id).value);for(let [idx,item] of items.entries()){let el=document.getElementById(item.id);let ok=chosen[idx]===item.answer;if(ok)correct++;let status=el.nextElementSibling;status.textContent=!chosen[idx]?'No answer selected':ok?'Correct':'Not quite — try again';status.className='rowstatus '+(ok?'right':'wrong');el.setAttribute('aria-invalid',String(!ok))}let msg=document.getElementById(prefix+'feedback');let note=prefix==='q1'?' The two dendritic-cell entries represent their two possible developmental origins.':'';msg.textContent=`${correct} of ${items.length} correct. ${correct===items.length?'All placements are correct.':'Review the marked responses and try again.'}${note}`}
function reset(items,prefix){for(let item of items){let el=document.getElementById(item.id);el.value='';el.removeAttribute('aria-invalid');let status=el.nextElementSibling;status.textContent='';status.className='rowstatus'}document.getElementById(prefix+'feedback').textContent=''}
const q2=[
 ['B cells','Lymphoid'],['T cells','Lymphoid'],['Innate lymphoid cells (including NK cells)','Lymphoid'],
 ['Neutrophils','Myeloid'],['Eosinophils','Myeloid'],['Basophils','Myeloid'],['Mast cells','Myeloid'],
 ['Monocytes','Myeloid'],['Macrophages','Myeloid'],['Red blood cells','Myeloid'],['Platelets','Myeloid'],['Dendritic cells','Both']
].map((x,i)=>({id:'sort-'+i,label:x[0],answer:x[1]}));
function buildQ2(){let root=document.getElementById('sortRows');for(let q of q2){let row=document.createElement('div');row.className='sortrow';let lab=document.createElement('label');lab.htmlFor=q.id;lab.textContent=q.label;let select=makeSelect(q.id,['Myeloid','Lymphoid','Both'],'Choose a lineage');row.append(lab,select,makeStatus());root.append(row)}}
const q3=[{id:'signal-a',label:'A. Yellow shape outside the cell',answer:'Growth factor'}, {id:'signal-b',label:'B. Red structure on the cell surface',answer:'Surface receptor'}, {id:'signal-c',label:'C. “TF” inside the nucleus',answer:'Transcription factor'}];
function buildQ3(){let root=document.getElementById('signalRows');for(let q of q3){let row=document.createElement('div');row.className='signalrow';let lab=document.createElement('label');lab.htmlFor=q.id;lab.textContent=q.label;let select=makeSelect(q.id,['Growth factor','Surface receptor','Transcription factor'],'Choose a term');row.append(lab,select,makeStatus());root.append(row)}}
function wire(prefix,items){document.getElementById(prefix+'check').addEventListener('click',()=>check(items,prefix));document.getElementById(prefix+'reset').addEventListener('click',()=>reset(items,prefix));}
buildQ1();buildQ2();buildQ3();wire('q1',q1);wire('q2',q2);wire('q3',q3);
