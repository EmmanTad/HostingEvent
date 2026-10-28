const EMAIL='YOUR_EMAIL@gmail.com'; // inquiries open in the visitor’s email app, addressed here
const $=s=>document.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#yr').textContent=new Date().getFullYear();
const nav=$('#menu'),bg=$('#bg'),hd=$('#hd');
const scrim=Object.assign(document.createElement('div'),{id:'scrim'});scrim.setAttribute('aria-hidden','true');document.body.append(scrim);
const menu=o=>{nav.classList.toggle('open',o);root.classList.toggle('menu-open',o);bg.setAttribute('aria-expanded',o)};
bg.onclick=()=>menu(!nav.classList.contains('open'));scrim.onclick=()=>menu(false);
nav.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu(false);bg.focus()}});
addEventListener('resize',()=>{if(innerWidth>900&&nav.classList.contains('open'))menu(false)});
const lite=innerWidth<760; // fewer particles on phones

// header, scroll-progress bar
const prog=document.createElement('div');prog.id='prog';prog.setAttribute('aria-hidden','true');document.body.prepend(prog);
const sc=()=>{hd.classList.toggle('solid',scrollY>40);const m=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(m>0?Math.min(scrollY/m,1):0)+')'};
sc();addEventListener('scroll',sc,{passive:true});

// equalizer bars (Services page)
const eq=$('.eq');if(eq)for(let i=0;i<24;i++){const b=document.createElement('i');b.style.animationDelay=(-Math.random()*1.2)+'s';b.style.animationDuration=(.6+Math.random()*.9)+'s';eq.appendChild(b)}

/* ---------- animation helpers ---------- */
// give a group of elements a reveal style + staggered delay
const set=(sel,a,step=.1,{mod=0,base=0,cap=8}={})=>$$(sel).forEach((el,i)=>{
 el.classList.add('rv');if(a)el.dataset.a=a;
 const k=mod?i%mod:Math.min(i,cap);
 el.style.setProperty('--d',(base+k*step).toFixed(2)+'s');el.style.setProperty('--i',i)});
// split text into words that rise from a mask (keeps <em> etc.)
const splitWords=(el,wb=0)=>{let n=0;const label=el.textContent.trim().replace(/\s+/g,' ');
 const walk=node=>[...node.childNodes].forEach(c=>{
  if(c.nodeType===3){const f=document.createDocumentFragment();
   c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(' ');return}
    const w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
    const i=document.createElement('span');i.className='wi';i.style.setProperty('--i',n++);i.textContent=t;w.append(i);f.append(w)});
   c.replaceWith(f)}else if(c.nodeType===1)walk(c)});
 walk(el);el.setAttribute('aria-label',label);el.classList.add('split');el.classList.remove('rv');if(wb)el.style.setProperty('--wb',wb+'s')};
const splitChars=(el,cls='ch')=>{const t=el.textContent.trim();el.setAttribute('aria-label',t);el.textContent='';let i=0;
 t.split(' ').forEach((word,wi,arr)=>{const g=document.createElement('span');g.className='cw';g.setAttribute('aria-hidden','true');
  [...word].forEach(c=>{const s=document.createElement('span');s.className=cls;s.style.setProperty('--i',i++);s.textContent=c;g.append(s)});
  el.append(g);if(wi<arr.length-1){el.append(' ');i++}})};
const motes=(el,n,top)=>{if(calm)return;const d=document.createElement(top?'div':'i');d.className=top?'i-dusts':'dusts';d.setAttribute('aria-hidden','true');
 for(let k=0;k<n;k++){const s=document.createElement('span');
  s.style.cssText=`--x:${Math.random()*100}%;--s:${(1.5+Math.random()*3).toFixed(1)}px;--t:${(9+Math.random()*10).toFixed(1)}s;--dl:${(-Math.random()*16).toFixed(1)}s;--dx:${((Math.random()-.5)*160).toFixed(0)}px`;d.append(s)}
 el.prepend(d);return d};

/* ---------- decorate every block ---------- */
// side curtains + dust on hero / page heads, mouse-spotlight
$$('.hero,.pagehead').forEach(el=>{el.prepend(Object.assign(document.createElement('i'),{className:'hc r'}),Object.assign(document.createElement('i'),{className:'hc l'}));});
$$('.hero,.pagehead,.band').forEach(el=>motes(el,el.matches('.hero')?(lite?18:34):(lite?8:16)));
const mk=$('.mark');if(mk)splitChars(mk);
set('.hero .by',null,0,{base:1.1});set('.hero .star','zoom',0,{base:1.3});set('.hero p',null,0,{base:1.5});set('.hero .btns','up',0,{base:1.7});
$$('.pagehead .wrap>*').forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--d',(.2+i*.15)+'s')});
// layout blocks
set('.grid2>.rv:first-child','left',0);set('.grid2>.rv:last-child','right',.15);
set('.dj>.rv:first-child','left',0);set('.dj>.rv:last-child','right',.15);
set('.cards .card','up',.16);set('.photos figure','curtain',.3,{base:.15});
set('.sub,.head,.caption,.gtitle,.soon',null,0);
set('.occ span','pop',.07);set('.t','flip',.16);set('.pkg','zoom',.16);
set('.specs div','zoom',.1);set('.sizes div','right',.12);
set('.gjump button','pop',.05);set('.ph','curtain',.09,{mod:3});
set('.band .wrap','zoom',0);
set('.contact .grid2>div:first-child>*','up',.1);set('.contact .grid2>form','right',.1);
set('form>*','up',.07,{base:.25});
set('.fgrid>div','up',.12);set('.fq-t','left',0);set('.fq-i','up',.07);

set('.stage .lead,#say,#bk',null,.1);
// split headings (not inside hero – handled separately below so the intro can finish first)
$$('h1,h2').forEach(h=>splitWords(h,h.closest('.hero')?.5:0));
// eyebrow rules
$$('.eyebrow').forEach(e=>{if(getComputedStyle(e).textAlign==='center')e.classList.add('ctr');if(!e.closest('.rv'))e.classList.add('rv')});
// list rows slide in one after another
$$('.card ul,.pkg ul').forEach(ul=>[...ul.children].forEach((li,k)=>li.style.setProperty('--k',k)));
$$('.t .s').forEach((s,i)=>s.style.setProperty('--i',i));
// mouse spotlight on cards / hero / heads
addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.card,.hero,.pagehead,.band');if(!t)return;
 const r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});

/* ---------- scroll reveal ---------- */
const reveal=(es,o)=>es.forEach(x=>{if(!x.isIntersecting)return;const el=x.target;
 el.classList.add('in');o.unobserve(el);
 const d=parseFloat(el.style.getPropertyValue('--d'))||0;setTimeout(()=>el.classList.add('done'),d*1000+1500)});
const io=new IntersectionObserver(reveal,{threshold:.1,rootMargin:'0px 0px -5% 0px'});
// curtain-wipe elements start clipped to a sliver, so they need a zero threshold
const ioC=new IntersectionObserver(reveal,{threshold:0,rootMargin:'0px 0px -8% 0px'});
const obs=el=>(el.dataset.a==='curtain'?ioC:io).observe(el),unobs=el=>(el.dataset.a==='curtain'?ioC:io).unobserve(el);
const start=()=>$$('.rv,.split').forEach(obs);

/* ---------- opening stage (home) / quick curtains (other pages) ---------- */
let went=false;
const go=()=>{if(went)return;went=true;root.classList.add('go');start()};
const intro=$('#intro');
if(intro&&root.classList.contains('intro-on')&&!calm){
 const guard=$$('#hd,main,footer,.fab');guard.forEach(e=>e.setAttribute('inert',''));
 splitChars($('.i-name'));
 const dn=document.createElement('div');dn.className='i-dusts';dn.setAttribute('aria-hidden','true');
 for(let k=0;k<26;k++){const s=document.createElement('span');
  s.style.cssText=`--x:${35+Math.random()*30}%;--s:${(1.5+Math.random()*2.8).toFixed(1)}px;--t:${(6+Math.random()*7).toFixed(1)}s;--dl:${(2+Math.random()*6).toFixed(1)}s;--dx:${((Math.random()-.5)*120).toFixed(0)}px`;dn.append(s)}
 $('.i-back').append(dn);
 let ended=false,timer=setTimeout(()=>end(),5600);
 function end(){if(ended)return;ended=true;clearTimeout(timer);
  intro.classList.add('out');root.classList.remove('intro-on');guard.forEach(e=>e.removeAttribute('inert'));
  setTimeout(go,250);setTimeout(()=>intro.remove(),1100)}
 intro.addEventListener('click',end);
 addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Enter')end()});
 $('#skip').focus({preventScroll:true});
}else{
 if(intro)intro.remove();root.classList.remove('intro-on');
 if(!calm){const q=document.createElement('div');q.className='qc';q.setAttribute('aria-hidden','true');
  q.innerHTML='<i class="i-c l"></i><i class="i-c r"></i>';document.body.append(q);
  setTimeout(go,520);setTimeout(()=>q.classList.add('end'),1250);setTimeout(()=>q.remove(),1650)}
 else go();
}

// pick a card (Magic page)
const cardsEl=$('#cards');
if(cardsEl){
 const faces=['A♠','K♥','Q♦','J♣','10♥','7♠'],cs=[...cardsEl.querySelectorAll('.pc')],say=$('#say'),jim=$('#jim'),sec=cardsEl.closest('.stage'),cv=$('#fx'),cx=cv.getContext('2d');
 let done=false,busy=false,W=0,H=0,dpr=1,vis=true,raf=0,typer=0;
 const P=[],COL=['#e04860','#f2d9b0','#ffffff','#e04860','#f7f0ea'];
 // --- particle canvas ---
 const fit=()=>{dpr=Math.min(devicePixelRatio||1,2);W=sec.clientWidth;H=sec.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)};
 const star=(x,y,r,rot)=>{cx.beginPath();for(let k=0;k<8;k++){const a=rot+k*Math.PI/4,d=k%2?r*.38:r;cx.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d)}cx.closePath();cx.fill()};
 const dust=()=>({t:'d',x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.2,vy:-.1-Math.random()*.3,r:1+Math.random()*2.2,life:1,ph:Math.random()*6,c:COL[Math.random()*2|0],amb:1});
 const burst=(x,y,n=70)=>{for(let k=0;k<n;k++){const a=Math.random()*6.283,s=2+Math.random()*7;P.push({t:Math.random()<.55?'s':'c',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,r:3+Math.random()*6,rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:1,dec:.008+Math.random()*.012,g:.14,c:COL[Math.random()*COL.length|0]})}};
 const ring=(x,y)=>P.push({t:'r',x,y,r:10,life:1,dec:.02});
 const trail=(x,y)=>{if(calm)return;P.push({t:'d',x,y,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2+.4,r:1.5+Math.random()*2.5,life:1,dec:.03,ph:0,c:COL[Math.random()*COL.length|0]})};
 const loop=()=>{
  raf=0;if(!vis||calm)return;
  cx.clearRect(0,0,W,H);
  for(let i=P.length-1;i>=0;i--){const p=P[i];
   if(p.amb){p.x+=p.vx+Math.sin(p.ph+=.02)*.3;p.y+=p.vy;if(p.y<-8){p.y=H+8;p.x=Math.random()*W}}
   else{p.life-=p.dec;if(p.life<=0){P.splice(i,1);continue}
    if(p.t==='r')p.r+=7;else{p.x+=p.vx;p.y+=p.vy;if(p.g){p.vy+=p.g;p.vx*=.985}}}
   cx.globalAlpha=p.amb?.35+Math.sin(p.ph*2)*.3:Math.max(p.life,0);cx.fillStyle=cx.strokeStyle=p.c||'#e04860';
   if(p.t==='r'){cx.lineWidth=3;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.stroke()}
   else if(p.t==='s'){p.rot+=p.vr;star(p.x,p.y,p.r,p.rot)}
   else if(p.t==='c'){p.rot+=p.vr;cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);cx.restore()}
   else{cx.shadowColor=p.c;cx.shadowBlur=8;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();cx.shadowBlur=0}}
  cx.globalAlpha=1;raf=requestAnimationFrame(loop)};
 const kick=()=>{if(!raf&&vis&&!calm)raf=requestAnimationFrame(loop)};
 fit();addEventListener('resize',()=>{fit()});
 if('ResizeObserver' in window)new ResizeObserver(()=>fit()).observe(sec); // section grows when Jim’s panel opens
 if(!calm)for(let i=0;i<(lite?24:45);i++)P.push(dust());
 new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis)kick()},{threshold:0}).observe(sec);
 document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(vis)kick()});
 // sparkle trail over the cards
 cardsEl.addEventListener('pointermove',e=>{const r=sec.getBoundingClientRect();if(Math.random()<.6)trail(e.clientX-r.left,e.clientY-r.top);kick()});
 const centre=el=>{const r=el.getBoundingClientRect(),s=sec.getBoundingClientRect();return[r.left+r.width/2-s.left,r.top+r.height/2-s.top]};
 // --- deal the cards in when scrolled into view ---
 new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){cardsEl.classList.add('dealt');o.disconnect()}},{threshold:.4}).observe(cardsEl);
 // --- typewriter ---
 const type=t=>{clearInterval(typer);say.classList.remove('pop');if(calm){say.textContent=t;return}
  say.textContent='';say.classList.add('type');let k=0;
  typer=setInterval(()=>{say.textContent=t.slice(0,++k);if(k>=t.length){clearInterval(typer);say.classList.remove('type')}},38)};
 // --- shuffle + reset ---
 const reset=()=>{
  busy=true;cardsEl.classList.remove('lit');if(jim){jim.classList.remove('show');jim.hidden=true}clearInterval(typer);say.classList.remove('type');say.innerHTML='&nbsp;';
  cs.forEach(x=>x.classList.remove('on','pick'));
  const [mx]=centre(cardsEl);cs.forEach(x=>x.style.setProperty('--dx',(mx-centre(x)[0])+'px'));
  cardsEl.classList.add('lock');setTimeout(()=>{cardsEl.classList.add('shuf');},550);
  setTimeout(()=>{cardsEl.classList.remove('shuf','lock');busy=false;done=false},1700)};
 cs.forEach((c,i)=>c.onclick=()=>{
  if(busy)return;
  if(done){reset();return}
  busy=true;done=true;
  const pick=faces[Math.floor(Math.random()*faces.length)];
  cardsEl.classList.add('lit');
  cs.forEach((x,j)=>{x.querySelector('b').textContent=j===i?pick:faces[Math.floor(Math.random()*faces.length)];
   const chosen=j===i;
   setTimeout(()=>{x.classList.add('on');if(chosen)x.classList.add('pick')},chosen?0:420+j*90)});
  // flash, ring and confetti burst when the chosen card turns over
  setTimeout(()=>{const[x,y]=centre(c);ring(x,y);setTimeout(()=>ring(x,y),160);burst(x,y);burst(x,y,30);kick()},380);
  setTimeout(()=>{type('I knew you’d pick the '+pick+'. Tap a card to try again.');say.classList.add('pop')},1000);
  setTimeout(()=>{if(jim){jim.hidden=false;void jim.offsetWidth;jim.classList.add('show');setTimeout(()=>jim.scrollIntoView({behavior:calm?'auto':'smooth',block:jim.offsetHeight>innerHeight*.85?'start':'center'}),350)}},1900);
  setTimeout(()=>busy=false,1100);
 });
}
// photo lightbox (Gallery page)
const lb=$('#lb');
$$('.ph').forEach(p=>p.onclick=()=>{lb.querySelector('img').src=p.querySelector('img').src;lb.classList.add('on')});
lb.onclick=()=>lb.classList.remove('on');
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
// booking form (Book page): opens an email draft
const f=$('#f');
if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f),sv=d.getAll('s').join(', ')||'Not specified';
 const body=`Name: ${d.get('n')}\nPhone: ${d.get('p')}\nServices: ${sv}\nEvent: ${d.get('t')} on ${d.get('d')}\nVenue: ${d.get('v')||'-'}\nGuests: ${d.get('g')||'-'}\nNotes: ${d.get('m')||'-'}`;
 location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Event inquiry: '+d.get('t')+' on '+d.get('d'))}&body=${encodeURIComponent(body)}`;
 const ok=$('#ok');ok.classList.remove('pop');void ok.offsetWidth;ok.classList.add('pop');
 ok.textContent='Opening your email app. Hit send and we’ll get back to you soon!'};

// gallery filter (Gallery page) — photos re-deal with a curtain reveal on every filter change
const gal=$('#gal');
if(gal){
 const meta={all:['','All photos']},btns=$$('.gjump button'),figs=$$('.ph',gal);
 btns.forEach(b=>{const k=b.dataset.f;meta[k]=['',b.textContent.trim()];
  const c=k==='all'?figs.length:figs.filter(x=>x.dataset.cat===k).length;b.insertAdjacentHTML('beforeend','<span class="n">'+c+'</span>')});
 let first=true;
 const show=k=>{
  btns.forEach(b=>{const on=b.dataset.f===k;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  let n=0;figs.forEach(f=>{const ok=k==='all'||f.dataset.cat===k;f.hidden=!ok;
   if(ok){f.style.setProperty('--d',((n%3)*.09+(first?0:Math.floor(n/3)*.05)).toFixed(2)+'s');n++;
    if(!first){unobs(f);f.classList.remove('in','done');void f.offsetWidth;obs(f)}}});
  first=false;
  $('#gt').innerHTML=meta[k][1]+'<small>'+(n?n+' photo'+(n>1?'s':''):'')+'</small>';
  $('#soon').hidden=n>0;gal.hidden=n===0;$('#soonT').textContent=meta[k][1]+' photos coming soon';
  try{history.replaceState(null,'',k==='all'?location.pathname:'#'+k)}catch(e){}};
 btns.forEach(b=>b.onclick=()=>show(b.dataset.f));
 const h=location.hash.slice(1);show(meta[h]?h:'all');
}

// FAQ: keep one answer open at a time
$$('.fq-i').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.fq-i[open]').forEach(o=>{if(o!==d)o.open=false})}));
