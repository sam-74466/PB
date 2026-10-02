// ---- 3D skyline ----
let R;try{R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true})}catch(e){document.body.classList.add('nogl')}
let sIdx=-1;
function setActive(i){if(i===sIdx)return;sIdx=i;dots.forEach((d,k)=>d.classList.toggle('on',k===i));document.documentElement.style.setProperty('--acc',i>0&&i<6?CFG.biz[i-1].c:'#f5b335')}
setActive(0);
if(R){
const BG=0x0a0e14;R.setPixelRatio(Math.min(devicePixelRatio,1.75));R.setClearColor(BG);
const S=new THREE.Scene();S.fog=new THREE.Fog(BG,45,130);
const C=new THREE.PerspectiveCamera(55,1,.1,300);
const rs=()=>{R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};rs();addEventListener('resize',rs);
S.add(new THREE.AmbientLight(0x7788aa,.7));const dl=new THREE.DirectionalLight(0xffffff,.6);dl.position.set(10,30,20);S.add(dl);
S.add(new THREE.GridHelper(220,110,0x1d2a3a,0x131b27));
const st=new Float32Array(1500);for(let i=0;i<500;i++){const r=130+Math.random()*30,a=Math.random()*6.283,e=Math.random()*1.3;st[i*3]=Math.cos(a)*Math.cos(e)*r;st[i*3+1]=Math.sin(e)*r+5;st[i*3+2]=Math.sin(a)*Math.cos(e)*r-40}
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(st,3));S.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xaabbdd,size:.5,fog:false})));

const dm=new THREE.MeshStandardMaterial({color:0x121a24,roughness:.5,metalness:.5});
const bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),cy=(r,h,s=8)=>new THREE.CylinderGeometry(r,r,h,s);
function A(g,geo,x,y,z,c,rz=0,rx=0){const o=new THREE.Group();o.add(new THREE.Mesh(geo,dm),new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:c})));o.position.set(x,y,z);o.rotation.set(rx,0,rz);g.add(o);return o}
function win(g,c,w,rows,z){const m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.75});for(let r=0;r<rows;r++)for(let k=-1;k<=1;k++){const p=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.8),m);p.position.set(k*w,2+r*2.2,z);g.add(p)}}
const G=CFG.biz.map((b,j)=>{const g=new THREE.Group();g.position.x=(j-2)*14;S.add(g);const L=new THREE.PointLight(b.c,2.4,32);L.position.set(0,9,8);g.add(L);g.c=new THREE.Color(b.c);return g});
let g=G[0],c=G[0].c;
A(g,bx(6,10,6),0,5,0,c);A(g,bx(7.4,.6,7.4),0,10.3,0,c);A(g,new THREE.SphereGeometry(3.6,10,5,0,6.283,0,1.571),0,10.6,0,c);win(g,c,1.8,4,3.02);
const N=170,rp=new Float32Array(N*3);for(let i=0;i<N;i++){rp[i*3]=(Math.random()-.5)*11;rp[i*3+1]=Math.random()*15;rp[i*3+2]=(Math.random()-.5)*11}
const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.BufferAttribute(rp,3));g.add(new THREE.Points(rg,new THREE.PointsMaterial({color:c,size:.2})));
g=G[1];c=g.c;A(g,bx(7,7,5),0,3.5,0,c);win(g,c,2,2,2.52);A(g,cy(.4,10),4.6,5,0,c);A(g,cy(.4,5),2.1,9.8,0,c,1.571);A(g,cy(.4,3),-.4,8.3,0,c);
const ring=A(g,new THREE.TorusGeometry(1.9,.3,6,16),-1.5,6.3,3.2,c);
g=G[2];c=g.c;A(g,bx(10,4,6),0,2,0,c);A(g,bx(10.8,.4,6.8),0,4.2,0,c);for(let k=0;k<4;k++)A(g,bx(1.4,1.4,1.4),-3+k*1.9,.7,4.3,c);A(g,bx(1.4,1.4,1.4),-1.1,2.1,4.3,c);A(g,bx(1.4,1.4,1.4),.8,2.1,4.3,c);A(g,cy(.15,9),-4.5,4.5,3.4,c);A(g,bx(3.6,1.4,.2),-4.5,8.8,3.4,c);
g=G[3];c=g.c;A(g,bx(5,1.2,5),0,.6,0,c);A(g,bx(.9,14,.9),0,8,0,c);A(g,bx(1.8,1.6,1.8),1.6,2,0,c);
const boom=new THREE.Group();boom.position.y=15.2;g.add(boom);A(boom,bx(14,.7,.7),3,0,0,c);A(boom,bx(3,1.4,1.4),-5.4,-.4,0,c);A(boom,cy(.05,5,4),7,-2.6,0,c);A(boom,bx(.8,.8,.8),7,-5.3,0,c);
g=G[4];c=g.c;A(g,bx(17,.15,7.5),0,.08,0,c);for(let k=-2;k<=2;k++)A(g,bx(1.6,.03,.25),k*3.4,.2,0,c);
const tk=new THREE.Group();tk.position.z=1.6;g.add(tk);A(tk,bx(2,1.8,2.2),2.2,1.7,0,c);A(tk,bx(4.4,.5,2.2),-.4,1.05,0,c);A(tk,bx(3.2,.25,.25),-1.2,2.6,0,c,.5);[-1.7,.9,2.9].forEach(x=>[-1.2,1.2].forEach(z=>A(tk,cy(.55,.4,10),x,.55,z,c,0,1.571)));
const pin=A(g,new THREE.ConeGeometry(1,2.6,6),0,9,0,c,3.1416);
const pr=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,40),new THREE.MeshBasicMaterial({color:c,transparent:true,side:2}));m.rotation.x=-1.5708;m.position.y=.3;g.add(m);return m});

// camera path: index 0 hero, 1..5 businesses, 6 contact
const mob=()=>innerWidth<800;
function key(i){if(i<=0)return[new THREE.Vector3(0,12,64),new THREE.Vector3(0,4,0)];
 if(i>=6)return[new THREE.Vector3(0,26,76),new THREE.Vector3(0,3,0)];
 const x=(i-3)*14,j=i-1;if(mob())return[new THREE.Vector3(x,10,25),new THREE.Vector3(x,.5,0)];
 const o=j%2?5:-5;return[new THREE.Vector3(x+o+(j%2?-5:5),8,20),new THREE.Vector3(x+o,4,0)]}
const cur=key(0).map(v=>v.clone());
let ty=0,tp=0,yaw=0,pit=0,mx=0,my=0,drag=false,lx=0,ly=0;
addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&!e.target.closest('a,button,.panel')){drag=true;lx=e.clientX;ly=e.clientY;document.body.classList.add('drag')}});
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(drag){ty=Math.max(-1,Math.min(1,ty+(e.clientX-lx)*.005));tp=Math.max(-.8,Math.min(.8,tp+(e.clientY-ly)*.004));lx=e.clientX;ly=e.clientY}});
addEventListener('pointerup',()=>{drag=false;ty=tp=0;document.body.classList.remove('drag')});
const Y=new THREE.Vector3(0,1,0);let last=performance.now();
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
 const s=Math.max(0,Math.min(6,scrollY/innerHeight)),i0=Math.min(5,Math.floor(s));let f=s-i0;f=f*f*(3-2*f);
 const a=key(i0),b=key(i0+1),k=1-Math.exp(-dt*3.5);
 cur[0].lerp(a[0].lerp(b[0],f),k);cur[1].lerp(a[1].lerp(b[1],f),k);
 yaw+=(ty+mx*.14-yaw)*.08;pit+=(tp+my*.06-pit)*.08;
 const off=cur[0].clone().sub(cur[1]).applyAxisAngle(Y,-yaw);C.position.copy(cur[1]).add(off);C.position.y+=pit*12;C.lookAt(cur[1]);
 setActive(Math.round(s));
 const p=rg.attributes.position;for(let i=0;i<N;i++){p.array[i*3+1]-=dt*7;if(p.array[i*3+1]<0)p.array[i*3+1]=15}p.needsUpdate=true;
 ring.rotation.y=t*1.2;ring.rotation.x=Math.sin(t)*.4;
 boom.rotation.y=Math.sin(t*.4)*.9;tk.position.x=Math.sin(t*.5)*3;
 pin.position.y=9+Math.sin(t*2)*.5;pin.rotation.y=t;
 pr.forEach((m,i)=>{const q=((t*.6+i*.5)%1);m.scale.setScalar(1+q*9);m.material.opacity=1-q});
 R.render(S,C)}
requestAnimationFrame(frame);
}

