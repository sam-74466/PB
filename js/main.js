// Page content, navigation dots, contact links
const $=s=>document.querySelector(s);
$('#biz').innerHTML=CFG.biz.map((b,i)=>`<section class="bz ${i%2?'r':''}" style="--c:${b.c}"><article class="panel"><h2>${b.n}</h2><p>${b.t}</p><div class="tags">${b.tags.map(t=>`<i>${t}</i>`).join('')}</div><a class="btn mag" href="${b.u}" ${b.u!='#'?'target="_blank" rel="noopener"':''}>Visit site</a></article></section>`).join('');
$('#dots').innerHTML=['Top',...CFG.biz.map(b=>b.n),'Contact'].map((n,i)=>`<a href="#" data-i="${i}" aria-label="${n}"></a>`).join('');
$('#call').href='tel:+'+CFG.phone;$('#wa').href='https://wa.me/'+CFG.phone;$('#mail').href='mailto:'+CFG.email;
$('#ft').innerHTML=`<span>&copy; ${new Date().getFullYear()} Pawarbuildkon, Nanded City, Pune</span>`+CFG.biz.map(b=>`<a href="${b.u}">${b.n}</a>`).join('');
const dots=[...document.querySelectorAll('#dots a')];
dots.forEach(d=>d.onclick=e=>{e.preventDefault();scrollTo({top:d.dataset.i*innerHeight,behavior:'smooth'})});
document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

