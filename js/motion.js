// ---- UI motion ----
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('[data-s]').forEach(el=>{el.innerHTML=[...el.textContent].map(ch=>`<span class="ch">${ch}</span>`).join('')});
addEventListener('load',()=>{
 const tl=gsap.timeline();
 tl.to('#ld',{opacity:0,duration:.6,delay:.5,onComplete:()=>$('#ld').remove()});
 if(!RM){tl.from('.ch',{yPercent:115,duration:1.1,stagger:.045,ease:'expo.out'},'-=.2').from('.sub,.cue',{opacity:0,y:20,duration:.8,stagger:.15},'-=.5');
 document.querySelectorAll('.panel').forEach(p=>gsap.from(p,{opacity:0,x:p.closest('.r')?60:-60,duration:.9,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 82%',toggleActions:'play none none reverse'}}))}
});
if(!RM&&matchMedia('(hover:hover)').matches){
 document.querySelectorAll('.panel').forEach(p=>{p.addEventListener('pointermove',e=>{const r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(p,{rotateY:x*8,rotateX:-y*8,transformPerspective:900,duration:.4})});p.addEventListener('pointerleave',()=>gsap.to(p,{rotateX:0,rotateY:0,duration:.6}))});
 document.querySelectorAll('.mag').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.3})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}))});
}
