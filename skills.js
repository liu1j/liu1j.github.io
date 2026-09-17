(() => {
 const entries = [
  ['Python','Python','python.svg'],['Wind','Wind','wind.png'],
  ['Excel','Excel','microsoftexcel.svg','#36b77e'],['PowerPoint','PowerPoint','microsoftpowerpoint.svg','#ec866c'],
  ['Word','Word','microsoftword.svg','#66a5ee'],['SQL','SQL','database.svg','#a3c2cc'],
  ['C++','C++','cplusplus.svg'],['R','R','r.svg'],['Java','Java','java.svg'],
  ['JavaScript','JavaScript','javascript.svg'],['MATLAB','MATLAB','matlab.svg'],
  ['EViews','EViews','eviews.png'],['Stata','Stata','stata.svg'],
  ['摄影','Photography','camera.svg','#d0bd96'],['剪辑','Video editing','clapperboard.svg','#d0bd96'],
  ['普通话','Mandarin','languages.svg','#c4d2cc','中'],['英语','English','languages.svg','#c4d2cc','EN']
 ];
 const copy={
  zh:{title:'所长与工具',intro:'让想法落地，也让好奇心有处可去。',hint:'点击图标，认识一项所长；点击箱子，收起或再次展开。',open:'打开工具箱',close:'收起工具箱',idle:'每一件工具，都是探索世界的另一种方式。',selected:'正在探索',count:'15 件工具 · 不止一种可能'},
  en:{title:'Skills & tools',intro:'Ways to bring ideas to life. Room to stay curious.',hint:'Select an icon to discover a skill. Tap the box to gather or unfold.',open:'Open the toolbox',close:'Close the toolbox',idle:'Every tool is another way to explore the world.',selected:'IN THE TOOLBOX',count:'15 TOOLS · MANY POSSIBILITIES'}
 };
 const section=document.createElement('section');section.id='skills';section.className='skills-section container';section.setAttribute('aria-labelledby','skills-title');
 section.innerHTML=`<div class="skills-heading"><div><p class="eyebrow">03 — SKILLS & TOOLS</p><h2 id="skills-title"></h2></div><p class="skills-intro"></p></div>
 <div class="skills-stage"><div class="toolbox-halo" aria-hidden="true"></div><div class="skill-items" id="skill-items"></div>
 <button class="toolbox" type="button" aria-controls="skill-items" aria-expanded="false">
 <svg viewBox="0 0 240 200" aria-hidden="true"><defs>
 <linearGradient id="box-front" x2="1" y2="1"><stop stop-color="#50625f"/><stop offset="1" stop-color="#1b2b2e"/></linearGradient>
 <linearGradient id="box-side" x2="1" y2="1"><stop stop-color="#334543"/><stop offset="1" stop-color="#132124"/></linearGradient>
 <linearGradient id="box-top" x2="0" y2="1"><stop stop-color="#73817a"/><stop offset="1" stop-color="#3d514c"/></linearGradient>
 </defs><ellipse cx="120" cy="177" rx="83" ry="12" fill="#000" opacity=".24"/>
 <path d="M32 79 120 47 208 79 120 111Z" fill="#091619" stroke="#b8c6b0" stroke-opacity=".25"/>
 <path d="M32 79 120 111 120 172 32 136Z" fill="url(#box-front)" stroke="#b8c6b0" stroke-opacity=".22"/>
 <path d="M120 111 208 79 208 136 120 172Z" fill="url(#box-side)" stroke="#b8c6b0" stroke-opacity=".2"/>
 <path d="M65 111 89 120" stroke="#c4b693" stroke-width="2" stroke-linecap="round"/>
 <g class="toolbox-lid"><path d="M29 72 120 39 211 72 120 107Z" fill="url(#box-top)" stroke="#ced7c0" stroke-opacity=".45"/>
 <path d="M29 72 120 107 211 72 211 81 120 116 29 81Z" fill="#374945" stroke="#c4b693" stroke-opacity=".3"/>
 <path d="M94 64 120 55 146 64 120 74Z" fill="none" stroke="#c4b693" stroke-opacity=".65"/></g></svg>
 <span class="toolbox-action"></span></button></div>
 <div class="skill-readout" role="status" aria-live="polite"><span class="skill-readout-label"></span><p class="skill-readout-name"></p></div>
 <p class="skills-hint"></p>`;
 document.getElementById('journey').after(section);
 const stage=section.querySelector('.skills-stage'),items=section.querySelector('.skill-items'),box=section.querySelector('.toolbox');
 const mobile=matchMedia('(max-width:600px)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let opened=false,interacted=false,selected=-1;
 const lang=()=>document.documentElement.lang.startsWith('zh')?'zh':'en';
 const buttons=entries.map((entry,i)=>{
  const button=document.createElement('button');button.type='button';button.className='skill-token';button.tabIndex=-1;
  button.style.setProperty('--delay',`${i*22}ms`);button.style.setProperty('--tilt',`${[ -7,5,-3,7,-5][i%5]}deg`);
  const image=document.createElement('img');image.src=`assets/skills/${entry[2]}`;image.alt='';image.width=36;image.height=36;
  // Use actual image elements so icons also render in local file previews (CSS masks can be blocked).
  if(entry[3])image.style.filter=entry[0]==='Excel'?'invert(64%) sepia(42%) saturate(652%) hue-rotate(103deg)':entry[0]==='PowerPoint'?'invert(66%) sepia(40%) saturate(781%) hue-rotate(324deg)':entry[0]==='Word'?'invert(65%) sepia(43%) saturate(1515%) hue-rotate(184deg)':'invert(83%) sepia(14%) saturate(493%) hue-rotate(356deg)';
  button.append(image);
  if(entry[4]){const badge=document.createElement('span');badge.className='skill-language';badge.textContent=entry[4];button.append(badge)}
  button.addEventListener('click',()=>{selected=i;render()});items.append(button);return button;
 });
 function render(){
  const c=copy[lang()];section.querySelector('#skills-title').textContent=c.title;
  document.querySelector('[data-skills-nav]').textContent=c.title;
  section.querySelector('.skills-intro').textContent=c.intro;section.querySelector('.skills-hint').textContent=c.hint;
  box.setAttribute('aria-label',opened?c.close:c.open);box.setAttribute('aria-expanded',String(opened));
  section.querySelector('.toolbox-action').textContent=opened?c.close:c.open;
  section.querySelector('.skill-readout-label').textContent=selected<0?(lang()==='zh'?`${entries.length} 件工具 · 不止一种可能`:`${entries.length} TOOLS · MANY POSSIBILITIES`):c.selected;
  section.querySelector('.skill-readout-name').textContent=selected<0?c.idle:entries[selected][lang()==='zh'?0:1];
  buttons.forEach((button,i)=>{button.setAttribute('aria-label',entries[i][lang()==='zh'?0:1]);button.setAttribute('aria-pressed',String(selected===i));button.tabIndex=opened?0:-1;button.setAttribute('aria-hidden',String(!opened))});
 }
 function toggle(value){opened=value;stage.classList.toggle('is-open',opened);if(!opened){selected=-1;if(items.contains(document.activeElement))box.focus()}render()}
 box.addEventListener('click',()=>{interacted=true;toggle(!opened)});
 section.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){interacted=true;toggle(false)}});
 function layout(){
  const positions=mobile.matches?
   [[14,10],[38,10],[62,10],[86,10],[14,24],[38,24],[62,24],[86,24],[12,43],[88,43],[14,73],[38,73],[62,73],[86,73],[22,89],[50,89],[78,89]]:
   [[16,13],[33,10],[50,12],[67,10],[84,13],[10,38],[29,35],[71,35],[90,38],[12,68],[29,69],[71,69],[88,68],[23,87],[41,87],[59,87],[77,87]];
  const {width,height}=stage.getBoundingClientRect();
  buttons.forEach((button,i)=>{button.style.setProperty('--x',`${(positions[i][0]-50)*width/100}px`);button.style.setProperty('--y',`${(positions[i][1]-50)*height/100}px`)});
 }
 new ResizeObserver(layout).observe(stage);mobile.addEventListener('change',layout);
 const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!interacted){toggle(true);observer.disconnect()}},{threshold:.55});observer.observe(stage);
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // Reduced motion retains the same controls and layout, without the burst animation.
 reduce.addEventListener('change',()=>stage.classList.toggle('motion-reduced',reduce.matches));
 stage.classList.toggle('motion-reduced',reduce.matches);layout();render();
})();
