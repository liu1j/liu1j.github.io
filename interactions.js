(() => {
 const translations = {
  zh: {nav:'联系我',title:'让对话，从这里开始。',intro:'无论是交流想法、探讨合作，还是简单打个招呼，都欢迎在这里留下姓名、邮箱和想聊的内容。收到留言后，我会通过您填写的邮箱与您联系。',name:'姓名',email:'邮箱',message:'想聊些什么',privacy:'您提供的信息仅用于此次沟通，不会公开展示。点击发送即表示同意将这些信息提交给本站的表单服务用于转达留言。',send:'发送留言',note:'一封邮件，一段新的对话。',unavailable:'留言通道准备中，暂未开放提交。',sending:'正在发送，请稍候…',success:'留言已发送。感谢您的来信，我会通过您填写的邮箱与您联系。',error:'未能确认发送成功，您填写的内容已保留。请稍后重试。',ready:'',namePlaceholder:'如何称呼您',emailPlaceholder:'用于接收我的回复',messagePlaceholder:'写下您的想法，或想与我交流的事情。'},
  en: {nav:'Contact',title:'A conversation starts here.',intro:'An idea, a collaboration, or simply a hello — leave your name, email, and a note below. Once I receive your message, I’ll get in touch at the email address you provide.',name:'Name',email:'Email',message:'What’s on your mind?',privacy:'Your details are used only for this conversation and will not be displayed publicly. By sending, you agree to share them with this site’s form service to deliver your message.',send:'Send a note',note:'One email. A new conversation.',unavailable:'The message channel is being set up. Submissions are not open yet.',sending:'Sending your note…',success:'Your message has been sent. Thank you — I’ll get in touch at the email address you provided.',error:'Delivery could not be confirmed. Your message is still here; please try again later.',ready:'',namePlaceholder:'How should I address you?',emailPlaceholder:'Where I can reply',messagePlaceholder:'Share an idea or something you’d like to talk about.'}
 };
 const form=document.getElementById('contact-form'),button=document.getElementById('contact-submit'),status=document.getElementById('contact-status');
 const endpoint=window.SITE_CONTACT?.endpoint || '';
 const enabled=window.SITE_CONTACT?.submissionsEnabled === true && /^https:\/\/[^\s]+$/.test(endpoint);
 const hostedCaptcha=window.SITE_CONTACT?.submissionMode === 'hosted-captcha';
 if(enabled && hostedCaptcha){
  form.action=endpoint;form.method='POST';
  translations.zh.note='提交后将前往安全验证页面。';
  translations.en.note='Continue to a secure verification page.';
 }
 let state=enabled?'ready':'unavailable',busy=false;
 const language=()=>document.documentElement.lang.startsWith('zh')?'zh':'en';
 function translate(){
  const copy=translations[language()];
  document.querySelectorAll('[data-contact-copy]').forEach(n=>n.textContent=copy[n.dataset.contactCopy]);
  for(const key of ['name','email','message']) document.getElementById('contact-'+key).placeholder=copy[key+'Placeholder'];
  status.textContent=copy[state];button.disabled=!enabled||busy;
  form.setAttribute('aria-busy',String(busy));
 }
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(!enabled||busy||!form.reportValidity())return;
  if(form.elements._gotcha.value)return;
  const payload={name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),message:form.elements.message.value.trim()};
  if(!payload.name||!payload.message)return;
  if(hostedCaptcha){
   // Submit all named fields (including the honeypot) to Formspree's hosted CAPTCHA flow.
   // Only Formspree can verify the CAPTCHA and confirm delivery; do not show local success.
   HTMLFormElement.prototype.submit.call(form);
   return;
  }
  busy=true;state='sending';translate();
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
   if(!response.ok)throw new Error('Submission failed');
   state='success';form.reset();
  }catch(_){state='error'}finally{clearTimeout(timer);busy=false;translate()}
 });
 translate();
 const header=document.querySelector('header'),navLinks=[...header.querySelectorAll('nav a')];
 const sections=navLinks.map(a=>document.querySelector(a.hash));
 let queued=false;
 function updateNavigation(){
  queued=false;header.classList.toggle('is-scrolled',scrollY>24);
  const offset=header.getBoundingClientRect().height+80;
  let active=null;for(const section of sections)if(section.getBoundingClientRect().top<=offset)active=section.id;
  if(scrollY>0&&innerHeight+scrollY>=document.documentElement.scrollHeight-4)active='contact';
  navLinks.forEach(a=>{const on=a.hash==='#'+active;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 }
 function queueUpdate(){if(!queued){queued=true;requestAnimationFrame(updateNavigation)}}
 addEventListener('scroll',queueUpdate,{passive:true});addEventListener('resize',queueUpdate);updateNavigation();
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 // Measure the actual two-row mobile header instead of leaving a fixed spacer.
 const hero=document.querySelector('.hero'),cover=hero.querySelector('.cover'),shade=hero.querySelector('.shade');
 const media=document.createElement('div');media.className='hero-media';
 cover.before(media);media.append(cover,shade);
 const mobile=matchMedia('(max-width:600px)');
 function syncHeader(){document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px');queueUpdate()}
 new ResizeObserver(syncHeader).observe(header);syncHeader();
 let startX=0,startY=0,tracking=false,pulling=false;
 function releaseHero(){tracking=false;pulling=false;media.classList.remove('is-pulling');media.style.setProperty('--pull','0px')}
 media.addEventListener('touchstart',e=>{
  if(!mobile.matches||reduce.matches||scrollY>0||e.touches.length!==1)return;
  startX=e.touches[0].clientX;startY=e.touches[0].clientY;tracking=true;
 },{passive:true});
 media.addEventListener('touchmove',e=>{
  if(!tracking)return;
  if(e.touches.length!==1){releaseHero();return}
  const dy=e.touches[0].clientY-startY,dx=e.touches[0].clientX-startX;
  if(!pulling && (dy<0||Math.abs(dx)>Math.abs(dy))){tracking=false;return}
  if(dy<=0){releaseHero();return}
  if(!e.cancelable){releaseHero();return}
  e.preventDefault();pulling=true;media.classList.add('is-pulling');
  media.style.setProperty('--pull',Math.min(105,Math.sqrt(dy)*6)+'px');
 },{passive:false});
 media.addEventListener('touchend',releaseHero,{passive:true});
 media.addEventListener('touchcancel',releaseHero,{passive:true});
 mobile.addEventListener('change',releaseHero);reduce.addEventListener('change',releaseHero);
 let observer;
 function setupMotion(){
  observer?.disconnect();
  const nodes=document.querySelectorAll('.section-heading,.about-content,.timeline-item,.postcard,.open-page,.contact-intro,.contact-form');
  if(reduce.matches){nodes.forEach(n=>{n.classList.remove('reveal');n.classList.add('is-visible')});return}
  observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('is-visible');observer.unobserve(target)}}),{threshold:.08});
  nodes.forEach(n=>{n.classList.add('reveal');observer.observe(n)});
 }
 setupMotion();reduce.addEventListener('change',setupMotion);
 new MutationObserver(()=>{translate();setupMotion();queueUpdate()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
