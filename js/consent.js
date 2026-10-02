// Cookie consent: nothing optional runs until the visitor accepts.
(()=>{
const K='pbk_consent',get=()=>{try{return localStorage.getItem(K)}catch(e){return null}},put=v=>{try{localStorage.setItem(K,v)}catch(e){}};
function loadGA(){const id=SITE.gaId;if(!/^G-[A-Z0-9]{4,}$/.test(id)||window.gtag)return;
 window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};
 gtag('js',new Date());gtag('config',id,{cookie_flags:'SameSite=None;Secure'});
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s)}
function show(){if(document.querySelector('.cc'))return;const el=document.createElement('div');el.className='cc';el.setAttribute('role','dialog');el.setAttribute('aria-label','Cookie consent');
 el.innerHTML='<p>We use optional analytics cookies to learn which pages help visitors. Nothing is set unless you accept. <a href="privacy.html#cookies">How we use them</a></p><div class="row"><button class="btn yes" data-v="yes">Accept analytics</button><button class="btn" data-v="no">Reject</button></div>';
 el.addEventListener('click',e=>{const v=e.target.dataset.v;if(!v)return;const was=get();put(v);el.remove();if(v==='yes')loadGA();else if(was==='yes'&&window.gtag)location.reload()});
 document.body.appendChild(el);el.querySelector('.yes').focus({preventScroll:true})}
const ft=document.getElementById('ft');
if(ft)ft.insertAdjacentHTML('beforeend','<a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a><button class="linkbtn" data-cc>Cookie settings</button>');
document.addEventListener('click',e=>{if(e.target.closest('[data-cc]'))show()});
const c=get();if(c==='yes')loadGA();else if(!c)setTimeout(show,1200);
})();
