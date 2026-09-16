(() => {
const data=window.SITE_CONTENT;
let lang='zh';try{lang=localStorage.getItem('yijun-language')==='en'?'en':'zh'}catch(_){}
const text=v=>typeof v==='string'?v:v?.[lang]||'';
function element(tag,cls,value){const n=document.createElement(tag);if(cls)n.className=cls;if(value)n.textContent=value;return n}

// Render decorative symbols as vector paths, not platform-dependent emoji glyphs.
const iconPaths={'↗':'M5 19 19 5M5 5h14v14','↑':'M12 20V4m-7 7 7-7 7 7','↓':'M12 4v16m-7-7 7 7 7-7','✳':'M12 2v20M2 12h20M5 5l14 14M5 19 19 5'};
function vectorSymbols(root){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())if(/[↗↑↓✳]/.test(walker.currentNode.nodeValue))nodes.push(walker.currentNode);
 nodes.forEach(node=>{
  const fragment=document.createDocumentFragment();
  node.nodeValue.split(/([↗↑↓✳])/).forEach(part=>{
   if(!iconPaths[part]){fragment.append(document.createTextNode(part));return}
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
   svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','symbol-icon');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
   const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',iconPaths[part]);svg.append(path);fragment.append(svg);
  });node.replaceWith(fragment);
 });
}

function timeline(items,id){
 document.getElementById(id).replaceChildren(...items.map(item=>{
  const a=element('article','timeline-item'),meta=element('div','meta');
  meta.append(element('span','date',text(item.date)));
  if(item.current)meta.append(element('span','current',text(data.copy.current)));
  const heading=element('div','institution-heading');
  if(item.logo){const frame=element('a','institution-logo');frame.href=item.website;frame.target='_blank';frame.rel='noopener noreferrer';frame.setAttribute('aria-label',text(item.title)+(lang==='zh'?'：官网（新窗口）':': official website (new tab)'));const img=element('img');img.src=item.logo;img.alt='';img.loading='lazy';frame.append(img);heading.append(frame)}
  const title=element('h4'),link=element('a','institution-link',text(item.title));
  link.href=item.website;link.target='_blank';link.rel='noopener noreferrer';
  link.setAttribute('aria-label',text(item.title)+(lang==='zh'?'：官网（新窗口）':': official website (new tab)'));
  title.append(link);heading.append(title);a.append(meta,heading,element('p','role',text(item.role)),element('p','place',text(item.place)));
  if(item.description)a.append(element('p','description',text(item.description)));
  if(item.details){const d=element('details');d.append(element('summary','',text(data.copy.details)),element('p','description',text(item.details)));a.append(d)}
  return a;
 }));
}

function renderLifePhotos(){
 const grid=document.querySelector('.life-grid'),closing=grid.querySelector('.open-page');
 grid.querySelectorAll('[data-travel-photo]').forEach(n=>n.remove());
 (data.lifePhotos||[]).forEach((photo,index)=>{
  const figure=element('figure','postcard');figure.dataset.travelPhoto='';
  const img=element('img');img.src=photo.src;img.alt=text(photo.alt);img.loading='lazy';
  const caption=element('figcaption');
  caption.append(element('small','','A MOMENT AWAY'),element('span','',text(photo.caption)),element('small','',photo.location));
  figure.append(img,element('span','figure-number','FIG. '+String(index+2).padStart(3,'0')),caption);
  grid.insertBefore(figure,closing);
 });
}

function render(){renderLifePhotos();document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-copy]').forEach(n=>n.textContent=text(data.copy[n.dataset.copy]));const b=document.getElementById('language');b.textContent=lang==='zh'?'EN ↗':'中文 ↗';b.setAttribute('aria-label',lang==='zh'?'Switch to English':'切换到中文');document.querySelector('.cover').alt=lang==='zh'?'刘一骏在金门大桥前':'Yijun Liu in front of the Golden Gate Bridge';document.querySelector('.postcard img').alt=lang==='zh'?'金门大桥与海湾':'The Golden Gate Bridge and the bay';timeline(data.education,'education-list');timeline(data.experience,'experience-list');const extra=document.getElementById('additional-sections');extra.replaceChildren();data.sections.forEach(s=>{const section=element('section','additional-section');section.append(element('h3','',text(s.title)),element('p','',text(s.text)));const gallery=element('div','gallery');(s.photos||[]).forEach(p=>{const f=element('figure'),img=element('img');img.src=p.src;img.alt=text(p.alt);img.loading='lazy';f.append(img,element('figcaption','',text(p.caption)));gallery.append(f)});section.append(gallery);extra.append(section)});vectorSymbols(document.querySelector('header'));vectorSymbols(document.querySelector('main'));vectorSymbols(document.querySelector('footer'))}
document.getElementById('language').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('yijun-language',lang)}catch(_){}render()});document.getElementById('year').textContent=new Date().getFullYear();render();
})();
