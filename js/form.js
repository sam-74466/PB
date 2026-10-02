// Enquiry form: validation, spam protection (honeypot, timing, rate limit, link limit), safe submit.
(()=>{
const f=document.getElementById('enq');if(!f)return;
const t0=Date.now(),st=document.getElementById('fs'),$=n=>f.elements[n];
const rules={
 name:v=>v.trim().length>=2||'Please enter your name.',
 phone:v=>{const d=v.replace(/\D/g,'');return /^(91)?[6-9]\d{9}$/.test(d)||'Enter a valid 10-digit Indian mobile number.'},
 biz:v=>!!v||'Choose a business.',
 message:v=>(v.trim().length>=10&&v.length<=1000)||'Write at least 10 characters (max 1000).',
 agree:()=>f.agree.checked||'Please tick the box to continue.'};
function check(n){const el=$(n),r=rules[n](n==='agree'?'':el.value),ok=r===true,e=document.getElementById('e-'+n);
 el.setAttribute('aria-invalid',ok?'false':'true');if(e)e.textContent=ok?'':r;return ok}
Object.keys(rules).forEach(n=>$(n).addEventListener('blur',()=>check(n)));
const say=(m,k)=>{st.textContent=m;st.className=k||''};
f.addEventListener('submit',async ev=>{
 ev.preventDefault();say('');
 const bad=Object.keys(rules).filter(n=>!check(n));if(bad.length){$(bad[0]).focus();return}
 if($('website').value)return say('Thank you. We will be in touch soon.','ok');
 if(Date.now()-t0<3000)return say('Please take a moment to review your message, then send again.','bad');
 let last=0;try{last=+localStorage.getItem('pbk_last')||0}catch(e){}
 if(Date.now()-last<60000)return say('You just sent an enquiry. Please wait a minute before sending another.','bad');
 if((f.message.value.match(/https?:\/\//gi)||[]).length>2)return say('Please remove extra links from your message.','bad');
 const d={name:f.name.value.trim(),phone:f.phone.value.trim(),business:f.biz.value,message:f.message.value.trim()};
 const btn=f.querySelector('button[type=submit]');btn.disabled=true;
 try{
  if(SITE.formEndpoint){
   const r=await fetch(SITE.formEndpoint,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({...d,_subject:'Pawarbuildkon enquiry: '+d.business})});
   if(!r.ok)throw 0;say('Thank you. We have received your enquiry and will call you soon.','ok');f.reset();
  }else{
   const m=`Hello, I am ${d.name} (${d.phone}). Business: ${d.business}. ${d.message}`;
   window.open('https://wa.me/'+SITE.phone+'?text='+encodeURIComponent(m),'_blank','noopener');say('Opening WhatsApp so you can send your enquiry.','ok');
  }
  try{localStorage.setItem('pbk_last',Date.now())}catch(e){}
 }catch(e){say('Could not send right now. Please call or WhatsApp us instead.','bad')}
 btn.disabled=false});
})();
