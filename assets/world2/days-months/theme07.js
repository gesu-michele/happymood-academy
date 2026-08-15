(() => {
  'use strict';

  const CFG = Object.assign({
    forceTeacher: false,
    assetRoot: '../../assets/world2/days-months/words/',
    world2Url: '../../world2.html',
    themeIndex: 6,
    previousThemeIndex: 5,
    build: 'theme07-final-v1.0.0'
  }, window.LEXICONIA_THEME07_CONFIG || {});

  const qs = new URLSearchParams(location.search);
  const PREVIEW = Boolean(CFG.forceTeacher || qs.get('preview') === 'teacher' || qs.get('teacherPreview') === '1');
  const OPEN_LAB = PREVIEW && (CFG.forceTeacher || qs.get('lab') === '1');
  const THEME_ID = 'days-months';
  const THEME_KEY = 'lexiconia.theme07.daysMonths.v1';
  const W2_KEY = 'lexiconia.world2.waterWorld.v1';
  const W1_KEY = 'lexiconia.world1.fiveThemes.v1';
  const ACTIVE_KEY = 'lexiconia.active.profile.v1';
  const PROFILE_KEY = 'lexiconia.sprint1.profiles.v1';
  const DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const TIER_NAMES = ['FOUNDATION','EXPLORER','CHALLENGER','MASTER'];

  const TARGETS = [
    ['Monday','lunes','01-monday.png','01_monday.png','/ˈmʌndeɪ/','Mon·day','day'],
    ['Tuesday','martes','02-tuesday.png','02_tuesday.png','/ˈtjuːzdeɪ/','Tues·day','day'],
    ['Wednesday','miércoles','03-wednesday.png','03_wednesday.png','/ˈwenzdeɪ/','Wednes·day','day'],
    ['Thursday','jueves','04-thursday.png','04_thursday.png','/ˈθɜːzdeɪ/','Thurs·day','day'],
    ['Friday','viernes','05-friday.png','05_friday.png','/ˈfraɪdeɪ/','Fri·day','day'],
    ['Saturday','sábado','06-saturday.png','06_saturday.png','/ˈsætədeɪ/','Sat·ur·day','day'],
    ['Sunday','domingo','07-sunday.png','07_sunday.png','/ˈsʌndeɪ/','Sun·day','day'],
    ['day','día','08-day.png','08_day.png','/deɪ/','day','time'],
    ['week','semana','09-week.png','09_week.png','/wiːk/','week','time'],
    ['calendar','calendario','10-calendar.png','10_calendar.png','/ˈkælɪndə/','cal·en·dar','time'],
    ['month','mes','11-month.png','11_month.png','/mʌnθ/','month','time'],
    ['year','año','12-year.png','12_year.png','/jɪə/','year','time'],
    ['January','enero','13-january.png','13_january.png','/ˈdʒænjuəri/','Jan·u·ar·y','month'],
    ['February','febrero','14-february.png','14_february.png','/ˈfebruəri/','Feb·ru·ar·y','month'],
    ['March','marzo','15-march.png','15_march.png','/mɑːtʃ/','March','month'],
    ['April','abril','16-april.png','16_april.png','/ˈeɪprəl/','A·pril','month'],
    ['May','mayo','17-may.png','17_may.png','/meɪ/','May','month'],
    ['June','junio','18-june.png','18_june.png','/dʒuːn/','June','month'],
    ['July','julio','19-july.png','19_july.png','/dʒuˈlaɪ/','Ju·ly','month'],
    ['August','agosto','20-august.png','20_august.png','/ˈɔːɡəst/','Au·gust','month'],
    ['September','septiembre','21-september.png','21_september.png','/sepˈtembə/','Sep·tem·ber','month'],
    ['October','octubre','22-october.png','22_october.png','/ɒkˈtəʊbə/','Oc·to·ber','month'],
    ['November','noviembre','23-november.png','23_november.png','/nəʊˈvembə/','No·vem·ber','month'],
    ['December','diciembre','24-december.png','24_december.png','/dɪˈsembə/','De·cem·ber','month'],
    ['time','tiempo','25-time.png','25_time.png','/taɪm/','time','extended'],
    ['season','estación','26-season.png','26_season.png','/ˈsiːzən/','sea·son','extended'],
    ['date','fecha','27-date.png','27_date.png','/deɪt/','date','extended'],
    ['decade','década','28-decade.png','28_decade.png','/ˈdekeɪd/','dec·ade','extended'],
    ['century','siglo','29-century.png','29_century.png','/ˈsentʃəri/','cen·tu·ry','extended'],
    ['millennium','milenio','30-millennium.png','30_millennium.png','/mɪˈleniəm/','mil·len·ni·um','extended']
  ].map((x, i) => ({id:i+1, word:x[0], es:x[1], file:x[2], legacyFile:x[3], ipa:x[4], syllables:x[5], group:x[6]}));

  const TARGET_BY_WORD = Object.fromEntries(TARGETS.map(t => [t.word.toLowerCase(), t]));

  const KNOWLEDGE = [
    {fact:'A week has seven days.', es:'Una semana tiene siete días.', answer:'week', icon:'7️⃣'},
    {fact:'A year has twelve months.', es:'Un año tiene doce meses.', answer:'year', icon:'1️⃣2️⃣'},
    {fact:'February is the shortest month of the year.', es:'Febrero es el mes más corto del año.', answer:'February', icon:'❄️'},
    {fact:'New Year begins in January.', es:'El Año Nuevo comienza en enero.', answer:'January', icon:'🎆'},
    {fact:'Halloween is celebrated in October.', es:'Halloween se celebra en octubre.', answer:'October', icon:'🎃'},
    {fact:'Christmas is celebrated in December.', es:'La Navidad se celebra en diciembre.', answer:'December', icon:'🎄'},
    {fact:'U.S. Independence Day is celebrated in July.', es:'El Día de la Independencia de Estados Unidos se celebra en julio.', answer:'July', icon:'🎇'},
    {fact:'Earth Day is observed in April.', es:'El Día de la Tierra se conmemora en abril.', answer:'April', icon:'🌍'},
    {fact:'A decade is a period of ten years.', es:'Una década es un período de diez años.', answer:'decade', icon:'🔟'},
    {fact:'A century is a period of one hundred years.', es:'Un siglo es un período de cien años.', answer:'century', icon:'💯'},
    {fact:'A millennium is a period of one thousand years.', es:'Un milenio es un período de mil años.', answer:'millennium', icon:'✨'},
    {fact:'A date identifies a particular day on a calendar.', es:'Una fecha identifica un día específico en un calendario.', answer:'date', icon:'📌'},
    {fact:'A season is one of the main divisions of the year.', es:'Una estación es una de las divisiones principales del año.', answer:'season', icon:'🌦️'},
    {fact:'Seasons change by hemisphere. Lexiconia always names the hemisphere in season questions.', es:'Las estaciones cambian según el hemisferio. Lexiconia siempre nombra el hemisferio.', answer:'season', icon:'🌎'},
    {fact:'British English is Lexiconia’s main model. The words in this Theme have the same spelling in British and American English.', es:'El inglés británico es el modelo principal. Estas palabras se escriben igual en inglés británico y americano.', answer:'calendar', icon:'🇬🇧🇺🇸'}
  ];

  const RESEARCH_SET = [
    {prompt:'Research Challenge: In which month is World Environment Day observed?', answer:'June', hint:'Look for the United Nations observance on 5 June.'},
    {prompt:'Research Challenge: In which month was Albert Einstein born?', answer:'March', hint:'Search for Albert Einstein’s date of birth.'},
    {prompt:'Research Challenge: In which month is International Women’s Day observed?', answer:'March', hint:'Look for the global observance on 8 March.'},
    {prompt:'Research Challenge: In which month is World Oceans Day observed?', answer:'June', hint:'Search for the international day held on 8 June.'},
    {prompt:'Research Challenge: In which month did the first human land on the Moon in 1969?', answer:'July', hint:'Search for Apollo 11 Moon landing date.'}
  ];

  const SPELLING_WRONG = {
    monday:['Munday','Mondey','Mondai'], tuesday:['Tuesdey','Tuseday','Tusday'], wednesday:['Wensday','Wednsday','Wednesdey'],
    thursday:['Thersday','Thurday','Thirsday'], friday:['Fryday','Fridai','Frydei'], saturday:['Saterday','Saturdey','Satuday'], sunday:['Sonday','Sundai','Sundey'],
    calendar:['Calender','Calandar','Callendar'], january:['Januery','Janurary','Jannuary'], february:['Febuary','Febraury','Februrary'],
    march:['Marsh','Marrch','Murch'], april:['Aprill','Aprel','Aperil'], may:['Mai','Mey','Maay'], june:['Joon','Juun','Junee'],
    july:['Juli','Yuly','Juuly'], august:['Agust','Augost','Auguest'], september:['Septembar','Setember','Septembre'], october:['Octobar','Ocktober','Octuber'],
    november:['Novembar','Novenber','Novembre'], december:['Decembar','Desember','Decembre'], time:['Tyme','Tiem','Tiime'], season:['Seeson','Saison','Seasson'],
    date:['Dait','Daet','Datte'], decade:['Decaid','Dekade','Deccade'], century:['Sentury','Centery','Centurry'], millennium:['Milennium','Millenium','Millenniumm'],
    week:['Weak','Weeck','Wek'], month:['Mounth','Monthe','Munth'], year:['Yeer','Yiar','Yeer'], day:['Dai','Dey','Daay']
  };

  const GAME_DEFS = [
    ['quick-recall','⚡','Quick Recall','Rapid recognition across all 30 targets.',['RECOGNITION','ADAPTIVE']],
    ['week-order','🗓️','Order the Week','Build the seven-day sequence without guessing.',['SEQUENCE','DAYS']],
    ['month-order','📆','Order the Year','Arrange all twelve months in order.',['SEQUENCE','MONTHS']],
    ['missing-letters','🔤','Missing Letters','Recover several missing letters, not just one.',['SPELLING','TYPE']],
    ['correct-spelling','✅','Spelling Detector','Identify authentic spelling among plausible errors.',['SPELLING','CHOICE']],
    ['build-word','🧩','Build the Word','Construct difficult calendar words from shuffled letters.',['SPELLING','BUILD']],
    ['before-after','↔️','Before & After','Solve one-step and multi-step calendar relationships.',['LOGIC','SEQUENCE']],
    ['calendar-riddles','🧠','Calendar Riddles','Infer the answer from indirect clues.',['REASONING','CLUES']],
    ['listen-choose','🔊','Listen & Choose','Use British pronunciation to identify the target.',['LISTENING','BRITISH']],
    ['culture-challenge','🌍','Culture Challenge','Use pre-taught world knowledge to solve calendar clues.',['CULTURE','KNOWLEDGE']],
    ['research-challenge','🔎','Research Challenge','Leave, research, read, return and answer in English.',['RESEARCH','READING']],
    ['calendar-logic','🧮','Calendar Logic','Solve two-step ordinal and time-period challenges.',['MASTER THINKING','LOGIC']],
    ['bubble-rescue','🫧','Bubble Rescue','Pop the correct answer before it escapes.',['ACTION','SPELLING']],
    ['submarine-sonar','🚢','Submarine Sonar','Find the correct signal on the underwater radar.',['ACTION','LISTENING']],
    ['current-chase','🐠','Current Chase','Intercept the right target in a moving current.',['ACTION','TIMING']],
    ['calendar-mine','⛏️','Calendar Mine','Classic auto-swinging claw, rocks, timing and dynamite.',['GOLD MINER','REASONING']],
    ['calendar-rush','⏱️','Calendar Rush','Answer challenging clues against the clock.',['SPEED','ADAPTIVE']],
    ['kraken-battle','🐙','Kraken Battle','Defeat the boss using spelling, culture and logic.',['BOSS','HEARTS']],
    ['practice-mistakes','🛠️','Practice My Mistakes','Target the language your Academic Record flags.',['NEEDS REVIEW','PERSONALISED']],
    ['mastery-challenge','👑','Mastery Challenge','New questions, no Gem Help, 80% required.',['FINAL','NO HELP']]
  ].map((g,i)=>({id:g[0],icon:g[1],title:g[2],desc:g[3],tags:g[4],index:i+1}));

  const $ = (id) => document.getElementById(id);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  const shuffle = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
  const norm = (s) => String(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const escapeHtml = (s) => String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const serialise = (v) => JSON.parse(JSON.stringify(v));
  const target = (word) => TARGET_BY_WORD[norm(word)] || TARGETS.find(t=>norm(t.word)===norm(word));
  const imagePath = (t, legacy=false) => CFG.assetRoot + (legacy ? t.legacyFile : t.file);

  function getProfile(){
    try{const p=JSON.parse(localStorage.getItem(ACTIVE_KEY)||'null');if(p)return p;}catch(_){ }
    try{const list=JSON.parse(localStorage.getItem(PROFILE_KEY)||'[]');return [...list].sort((a,b)=>(b.lastPlayed||0)-(a.lastPlayed||0))[0]||null;}catch(_){return null;}
  }
  const profile = getProfile();
  const slug = (s)=>(s||'hero').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-');
  const heroId = profile?.id || slug((profile?.name||'Hero')+'-'+(profile?.birthYear||''));

  const defaultThemeState = () => ({
    version:1, preteach:{language:false,recall:false,knowledge:false,index:0,factIndex:0},
    completedGames:[], attempts:{}, gameScores:{}, evidence:{}, needsReview:{}, masteryBest:0, masteryAttempts:0,
    status:'LEARNING', adaptiveTier:0, adaptiveCorrect:0, adaptiveWrong:0, helpUsed:0,
    companions:{unlocked:['dog'],selected:'dog',rewardSeen:false}, badges:[], lastPlayed:Date.now(),
    localEconomy:{xp:0,gems:200,gold:350}, researchDone:[], academicLog:[]
  });
  const previewState = defaultThemeState();
  previewState.preteach={language:true,recall:true,knowledge:true,index:0,factIndex:0};
  previewState.companions={unlocked:['dog','cat','beaver','fox','raccoon','capybara'],selected:'capybara',rewardSeen:true};
  previewState.localEconomy={xp:99999,gems:9999,gold:9999};
  let state = loadThemeState();
  let world2 = loadWorld2();
  let currentGame = null;
  let session = null;
  let currentQuestion = null;
  let feedbackLocked = false;
  let preteachMode = 'language';
  let preteachIndex = 0;
  let timerHandle = null;
  let animationHandle = null;
  let actionCleanup = null;
  let modalCallback = null;
  let lastScreen = 'homeScreen';

  function loadThemeState(){
    if(PREVIEW)return previewState;
    try{const all=JSON.parse(localStorage.getItem(THEME_KEY)||'{}');return Object.assign(defaultThemeState(),all[heroId]||{});}catch(_){return defaultThemeState();}
  }
  function persistTheme(){
    if(PREVIEW)return;
    state.lastPlayed=Date.now();
    try{const all=JSON.parse(localStorage.getItem(THEME_KEY)||'{}');all[heroId]=state;localStorage.setItem(THEME_KEY,JSON.stringify(all));}catch(_){ }
  }
  function defaultW2(){return{themeIndex:0,completed:Array.from({length:20},()=>[]),pending:Array.from({length:20},()=>[]),themeComplete:Array(20).fill(false),themePending:Array(20).fill(false),mastery:{},meta:{weekly:{count:0,best:0,lastWeek:null},invicto:{current:0,best:0}},lastPlayed:Date.now()};}
  function loadWorld2(){
    const base=defaultW2(); if(PREVIEW)return base;
    try{const all=JSON.parse(localStorage.getItem(W2_KEY)||'{}'),raw=all[heroId]||{};const w=Object.assign(base,raw);w.completed=Array.from({length:20},(_,i)=>Array.isArray(raw.completed?.[i])?raw.completed[i]:[]);w.pending=Array.from({length:20},(_,i)=>Array.isArray(raw.pending?.[i])?raw.pending[i]:[]);w.themeComplete=Array.from({length:20},(_,i)=>!!raw.themeComplete?.[i]);w.themePending=Array.from({length:20},(_,i)=>!!raw.themePending?.[i]);w.meta=raw.meta||base.meta;w.meta.weekly=raw.meta?.weekly||base.meta.weekly;w.meta.invicto=raw.meta?.invicto||base.meta.invicto;return w;}catch(_){return base;}
  }
  function persistWorld2(){
    if(PREVIEW)return; world2.lastPlayed=Date.now();
    try{const all=JSON.parse(localStorage.getItem(W2_KEY)||'{}');all[heroId]=world2;localStorage.setItem(W2_KEY,JSON.stringify(all));}catch(_){ }
  }
  function globalEconomyRecord(){
    if(PREVIEW)return state.localEconomy;
    try{const all=JSON.parse(localStorage.getItem(W1_KEY)||'{}');if(!all[heroId])all[heroId]={xp:0,gems:0,gold:0};return all[heroId];}catch(_){return state.localEconomy;}
  }
  function saveGlobalEconomy(rec){
    if(PREVIEW){state.localEconomy=rec;return;}
    try{const all=JSON.parse(localStorage.getItem(W1_KEY)||'{}');all[heroId]=rec;localStorage.setItem(W1_KEY,JSON.stringify(all));}catch(_){state.localEconomy=rec;persistTheme();}
  }
  function economy(){const r=globalEconomyRecord();return{xp:Number(r.xp)||0,gems:Number(r.gems)||0,gold:Number(r.gold)||0};}
  function addEconomy({xp=0,gems=0,gold=0}={}){const r=globalEconomyRecord();r.xp=(Number(r.xp)||0)+xp;r.gems=(Number(r.gems)||0)+gems;r.gold=(Number(r.gold)||0)+gold;saveGlobalEconomy(r);updateHud();}
  function spend(kind,amount){const r=globalEconomyRecord();if((Number(r[kind])||0)<amount)return false;r[kind]-=amount;saveGlobalEconomy(r);updateHud();return true;}

  function weekSerial(d=new Date()){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()),offset=(x.getDay()+6)%7;return Math.floor(Date.UTC(x.getFullYear(),x.getMonth(),x.getDate()-offset)/604800000);}
  function meta(){world2.meta=world2.meta||{};world2.meta.weekly=world2.meta.weekly||{count:0,best:0,lastWeek:null};world2.meta.invicto=world2.meta.invicto||{current:0,best:0};return world2.meta;}
  function invictoRank(n){if(n>=200)return['⚡','INVICTO SUPREMO'];if(n>=100)return['👑','LEGENDARIO INVICTO'];if(n>=50)return['🏆','GENERAL INVICTO'];if(n>=25)return['🔥','INVICTO MAYOR'];if(n>=10)return['⚔️','INVICTO'];return['🛡️','SOLDIER'];}
  function registerCorrect(){if(PREVIEW)return;const i=meta().invicto;i.current=(Number(i.current)||0)+1;i.best=Math.max(Number(i.best)||0,i.current);persistWorld2();}
  function registerWrong(){if(PREVIEW)return;meta().invicto.current=0;persistWorld2();}
  function registerWeekly(){if(PREVIEW)return;const w=meta().weekly,now=weekSerial();if(w.lastWeek===now)return;w.count=(Number.isFinite(w.lastWeek)&&w.lastWeek===now-1)?(Number(w.count)||0)+1:1;w.best=Math.max(Number(w.best)||0,w.count);w.lastWeek=now;persistWorld2();}

  function allPreteachDone(){return Boolean(state.preteach.language&&state.preteach.recall&&state.preteach.knowledge);}
  function priorThemeComplete(){return PREVIEW || Boolean(world2.themeComplete?.[CFG.previousThemeIndex]) || Number(world2.themeIndex)>=CFG.themeIndex;}
  function tier(){return clamp(Number(state.adaptiveTier)||0,0,3);}
  function setTier(n){state.adaptiveTier=clamp(Number(n)||0,0,3);persistTheme();updateHud();}
  function adaptiveResult(ok){
    if(ok){state.adaptiveCorrect=(state.adaptiveCorrect||0)+1;state.adaptiveWrong=0;if(state.adaptiveCorrect>=3&&state.adaptiveTier<3){state.adaptiveTier++;state.adaptiveCorrect=0;toast(`⬆️ Difficulty increased: ${TIER_NAMES[tier()]}`,'good');}}
    else{state.adaptiveWrong=(state.adaptiveWrong||0)+1;state.adaptiveCorrect=0;if(state.adaptiveWrong>=2&&state.adaptiveTier>0){state.adaptiveTier--;state.adaptiveWrong=0;toast(`🧭 Consolidation level: ${TIER_NAMES[tier()]}`);}}
    persistTheme();updateHud();
  }

  function evidenceFor(word){const key=norm(word);state.evidence[key]=state.evidence[key]||{correct:0,wrong:0,assisted:0,credit:0,contexts:{}};return state.evidence[key];}
  function addNeed(word,amount=1){const key=norm(word);state.needsReview[key]=(Number(state.needsReview[key])||0)+amount;}
  function reduceNeed(word,amount=1){const key=norm(word);state.needsReview[key]=Math.max(0,(Number(state.needsReview[key])||0)-amount);if(!state.needsReview[key])delete state.needsReview[key];}
  function recordAcademic(word,ok,{credit=1,context='recognition',assisted=false}={}){
    const t=target(word)||{word};const ev=evidenceFor(t.word);ev.contexts[context]=(ev.contexts[context]||0)+1;
    if(ok){ev.correct++;ev.credit+=credit;if(assisted)ev.assisted++;if(ev.correct>=2&&ev.wrong<=ev.correct)reduceNeed(t.word,.5);registerCorrect();}
    else{ev.wrong++;addNeed(t.word,1);registerWrong();}
    if(session){session.attempts++;session.maxCredit+=1;if(ok){session.correct++;session.credit+=credit;session.streak++;session.bestStreak=Math.max(session.bestStreak,session.streak);}else{session.wrong++;session.streak=0;}}
    adaptiveResult(ok);persistTheme();updateStats();
  }

  function masteryStatus(score){if(score>=100)return['👑','PERFECT MASTERY'];if(score>=90)return['🌟','EXCELLENT MASTERY'];if(score>=80)return['🎯','MASTERED'];return['📘','NEEDS REVIEW'];}
  function showScreen(id){
    if(actionCleanup){try{actionCleanup();}catch(_){ }actionCleanup=null;}
    if(timerHandle){clearInterval(timerHandle);timerHandle=null;}
    if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}
    $$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));lastScreen=id;window.scrollTo(0,0);
  }

  class AudioEngine{
    constructor(){this.ctx=null;this.master=null;this.muted=false;}
    ensure(){if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=.34;this.master.connect(this.ctx.destination);}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});return this.ctx;}
    tone(freq,dur=.12,type='sine',vol=.08,end=null,delay=0){if(this.muted)return;const ac=this.ensure();if(!ac)return;const t=ac.currentTime+delay,o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(end)o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+dur);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+dur+.03);}
    sfx(name){if(name==='correct'){[523,659,784].forEach((f,i)=>this.tone(f,.16,'triangle',.05,null,i*.06));}else if(name==='wrong'){this.tone(230,.2,'sawtooth',.04,120);}else if(name==='launch'){this.tone(300,.13,'triangle',.04,120);}else if(name==='grab'){this.tone(440,.08,'square',.04,650);}else if(name==='boss'){this.tone(120,.35,'sawtooth',.08,55);}else if(name==='unlock'){[440,554,659,880].forEach((f,i)=>this.tone(f,.25,'sine',.05,null,i*.09));}else this.tone(420,.06,'triangle',.04,520);}
  }
  const audio=new AudioEngine();
  function speak(text,rate=.78){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=rate;u.pitch=1.03;window.speechSynthesis.speak(u);}

  function toast(msg,type=''){const el=$('toast');if(!el)return;el.textContent=msg;el.className=`toast show ${type}`;clearTimeout(el._t);el._t=setTimeout(()=>el.className='toast',1900);}
  function openModal({title='',html='',actions=[],closable=true,onClose=null}){
    $('modalTitle').textContent=title;$('modalBody').innerHTML=html;$('modalActions').innerHTML='';$('modalClose').style.display=closable?'block':'none';modalCallback=onClose;
    actions.forEach(a=>{const b=document.createElement('button');b.className=`btn ${a.className||''}`;b.textContent=a.label;b.disabled=!!a.disabled;b.onclick=()=>{if(a.close!==false)closeModal(false);a.onClick?.();};$('modalActions').appendChild(b);});
    $('modalLayer').classList.add('open');$('modalLayer').setAttribute('aria-hidden','false');
  }
  function closeModal(trigger=true){$('modalLayer').classList.remove('open');$('modalLayer').setAttribute('aria-hidden','true');const cb=modalCallback;modalCallback=null;if(trigger)cb?.();}
  function confetti(count=100){const box=$('confetti');box.innerHTML='';const colors=['#ffd55c','#3ee1e9','#74e888','#ff7180','#a975ef','#fff'];for(let i=0;i<count;i++){const p=document.createElement('i');p.style.setProperty('--x',Math.random()*100+'%');p.style.setProperty('--d',(2.6+Math.random()*3.2)+'s');p.style.setProperty('--r',(Math.random()*360)+'deg');p.style.setProperty('--c',colors[i%colors.length]);p.style.animationDelay=(Math.random()*.8)+'s';box.appendChild(p);}setTimeout(()=>box.innerHTML='',6500);}

  function updateHud(){
    const e=economy(),m=meta(),rank=invictoRank(Number(m.invicto.current)||0),weekly=m.weekly||{};
    $('heroName').textContent=profile?.name||'Hero';$('heroRank').textContent=`Water Scholar · ${TIER_NAMES[tier()]}`;
    $('xpValue').textContent=e.xp.toLocaleString();$('gemValue').textContent=e.gems.toLocaleString();$('coinValue').textContent=e.gold.toLocaleString();
    $('weeklyBadge').innerHTML=PREVIEW?'<strong>🛠️ PREVIEW</strong><small>NOT SAVED</small>':`<strong>🔥 ${Number(weekly.count)||0} WEEK${Number(weekly.count)===1?'':'S'}</strong><small>BEST ${Number(weekly.best)||0}</small>`;
    $('invictoBadge').innerHTML=PREVIEW?'<strong>⚔️ INVICTO</strong><small>FROZEN</small>':`<strong>${rank[0]} ${Number(m.invicto.current)||0}</strong><small>${rank[1]} · BEST ${Number(m.invicto.best)||0}</small>`;
    $('difficultyLabel').textContent=TIER_NAMES[tier()];if($('difficultyLabelGame'))$('difficultyLabelGame').textContent=TIER_NAMES[tier()];
    renderHomeStatus();
  }

  function renderHomeStatus(){
    if(!$('homeScreen'))return;
    const coreDone=GAME_DEFS.slice(0,18).filter(g=>state.completedGames.includes(g.id)).length, done=coreDone, pct=Math.round(coreDone/18*100), status=masteryStatus(state.masteryBest);
    $('preteachSummary').textContent=allPreteachDone()?'All three preparation stages complete.':'Complete New Language, Quick Recall and Knowledge Boost before playing.';
    $('preteachProgress').style.width=((Number(state.preteach.language)+Number(state.preteach.recall)+Number(state.preteach.knowledge))/3*100)+'%';
    $('preteachCount').textContent=`${Number(state.preteach.language)+Number(state.preteach.recall)+Number(state.preteach.knowledge)} / 3`;
    $('experienceProgress').style.width=pct+'%';$('experienceCount').textContent=`${done} / 18 core experiences`;
    $('masteryNumber').textContent=`${Math.round(state.masteryBest||0)}%`;$('masteryStatus').textContent=`${status[0]} ${status[1]}`;
    $('needsCount').textContent=Object.keys(state.needsReview||{}).length;
    renderCompanions();renderGameGrid();
  }

  const PETS = [
    {id:'dog',name:'Dog',icon:'🐕',milestone:6},{id:'cat',name:'Cat',icon:'🐈',milestone:9},{id:'beaver',name:'Beaver',icon:'🦫',milestone:11},
    {id:'fox',name:'Fox',icon:'🦊',milestone:13},{id:'raccoon',name:'Raccoon',icon:'🦝',milestone:16},{id:'capybara',name:'Capybara',icon:'🐹',milestone:19}
  ];
  function syncCompanions(){if(PREVIEW)return;state.companions=state.companions||{unlocked:[],selected:'dog',rewardSeen:false};const completed=world2.themeComplete.filter(Boolean).length;PETS.filter(p=>completed>=p.milestone).forEach(p=>{if(!state.companions.unlocked.includes(p.id))state.companions.unlocked.push(p.id);});if(!state.companions.unlocked.includes(state.companions.selected))state.companions.selected=state.companions.unlocked[0]||'dog';persistTheme();}
  function renderCompanions(){
    syncCompanions();
    const box=$('companionRow');if(!box)return;box.innerHTML='';const unlocked=state.companions?.unlocked||[];
    PETS.forEach(p=>{const open=PREVIEW||unlocked.includes(p.id),sel=state.companions?.selected===p.id;const d=document.createElement('div');d.className=`pet-chip ${open?'':'locked'} ${sel?'selected':''}`;d.title=open?`${p.name}${sel?' · selected':''}`:`Locked · future milestone`;d.innerHTML=`<span>${open?p.icon:'◼️'}</span>${open?'':'<span class="lock">🔒</span>'}<button aria-label="${open?'Select '+p.name:'Locked companion'}"></button>`;d.querySelector('button').onclick=()=>{if(!open){toast(`🔒 ${p.name} unlocks at a future milestone.`);return;}state.companions.selected=p.id;persistTheme();renderCompanions();toast(`${p.icon} ${p.name} selected.`,'good');};box.appendChild(d);});
  }

  function unlockArrivalCompanion(){
    if(PREVIEW||state.companions.rewardSeen)return;state.companions=state.companions||{unlocked:[],selected:'dog'};if(!state.companions.unlocked.includes('dog'))state.companions.unlocked.push('dog');state.companions.selected=state.companions.selected||'dog';state.companions.rewardSeen=true;persistTheme();audio.sfx('unlock');confetti(75);
    openModal({title:'🎁 COMPANION UNLOCKED!',html:'<div style="text-align:center;font-size:76px">🐕</div><p style="text-align:center;font-size:20px"><strong>Dog</strong> has joined your Water World expedition. Future milestones will reveal the other silhouettes.</p>',actions:[{label:'WELCOME, DOG!',className:'gold'}],closable:false});
  }

  function isGameUnlocked(g){
    if(PREVIEW)return true;if(!allPreteachDone())return false;
    if(g.id==='practice-mistakes')return Object.keys(state.needsReview||{}).length>0;
    if(g.id==='mastery-challenge')return GAME_DEFS.slice(0,18).every(x=>state.completedGames.includes(x.id));
    return true;
  }
  function renderGameGrid(){
    const grid=$('gameGrid');if(!grid)return;grid.innerHTML='';
    GAME_DEFS.forEach(g=>{const complete=state.completedGames.includes(g.id),unlocked=isGameUnlocked(g);const card=document.createElement('article');card.className=`game-card ${complete?'complete':''} ${g.id==='mastery-challenge'?'mastery':''} ${!unlocked?'locked':''}`;card.innerHTML=`<span class="game-num">${String(g.index).padStart(2,'0')}</span>${complete?'<span class="card-check">✓</span>':!unlocked?'<span class="card-lock">🔒</span>':''}<div class="game-icon">${g.icon}</div><h3>${g.title}</h3><p>${g.desc}</p><div class="game-tags">${g.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><button class="btn small ${g.id==='mastery-challenge'?'gold':''}" ${!unlocked?'disabled':''}>${complete?'REPLAY':'ENTER'} ➜</button>`;card.querySelector('button').onclick=()=>startGame(g.id);grid.appendChild(card);});
  }

  function startPreteach(mode='language'){
    preteachMode=mode;preteachIndex=mode==='knowledge'?(state.preteach.factIndex||0):(state.preteach.index||0);showScreen('preteachScreen');renderPreteach();
  }
  function renderPreteach(){
    $$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.mode===preteachMode));
    const visual=$('preteachVisual'),wordPanel=$('preteachWordPanel');visual.classList.remove('loaded','missing');
    if(preteachMode==='language'){
      const t=TARGETS[clamp(preteachIndex,0,TARGETS.length-1)],img=$('preteachImage');img.style.display='block';img.onload=()=>visual.classList.add('loaded');img.onerror=()=>{if(!img.dataset.legacy){img.dataset.legacy='1';img.src=imagePath(t,true);}else visual.classList.add('missing');};img.dataset.legacy='';img.src=imagePath(t);img.alt=t.word;$('fallbackWord').textContent=t.word;
      wordPanel.innerHTML=`<span class="word-counter">${String(preteachIndex+1).padStart(2,'0')} / 30</span><div class="english-word">${t.word}</div><div class="spanish-word">${t.es}</div><div class="phonetic">🇬🇧 ${t.ipa}</div><div class="syllables">Spelling rhythm: ${t.syllables}</div><button id="speakWord" class="speak-btn" aria-label="Listen">🔊</button><p style="color:#cdebf5">British English is the pronunciation model. These targets share their spelling with American English.</p>`;
      $('speakWord').onclick=()=>speak(t.word);
      $('preteachPrev').disabled=preteachIndex===0;$('preteachNext').textContent=preteachIndex===TARGETS.length-1?'FINISH NEW LANGUAGE ✓':'NEXT WORD ➜';
    }else if(preteachMode==='knowledge'){
      const f=KNOWLEDGE[clamp(preteachIndex,0,KNOWLEDGE.length-1)],img=$('preteachImage');img.style.display='none';visual.classList.add('missing');$('fallbackWord').innerHTML=`<div><div style="font-size:95px">${f.icon}</div><div class="fact-card">${f.fact}<small>${f.es}</small></div></div>`;
      wordPanel.innerHTML=`<span class="word-counter">${String(preteachIndex+1).padStart(2,'0')} / ${KNOWLEDGE.length}</span><div class="english-word" style="font-size:44px">KNOWLEDGE BOOST</div><div class="spanish-word">Learn the fact before it appears in a challenge.</div><button id="speakWord" class="speak-btn">🔊</button><div class="phonetic">Key target: ${target(f.answer)?.word||f.answer}</div>`;$('speakWord').onclick=()=>speak(f.fact,.72);
      $('preteachPrev').disabled=preteachIndex===0;$('preteachNext').textContent=preteachIndex===KNOWLEDGE.length-1?'FINISH KNOWLEDGE BOOST ✓':'NEXT FACT ➜';
    }else{
      showScreen('gameScreen');startQuickRecallPreteach();return;
    }
    $('preteachModeTitle').textContent=preteachMode==='language'?'A. NEW LANGUAGE':'C. KNOWLEDGE BOOST';
    $('preteachProgressBar').style.width=((preteachIndex+1)/(preteachMode==='language'?TARGETS.length:KNOWLEDGE.length)*100)+'%';
  }
  function advancePreteach(delta){
    const max=preteachMode==='language'?TARGETS.length:KNOWLEDGE.length;const next=preteachIndex+delta;
    if(next<0)return;if(next>=max){if(preteachMode==='language'){state.preteach.language=true;state.preteach.index=0;}else{state.preteach.knowledge=true;state.preteach.factIndex=0;}persistTheme();toast('Preparation stage complete!','good');showScreen('homeScreen');updateHud();return;}preteachIndex=next;if(preteachMode==='language')state.preteach.index=preteachIndex;else state.preteach.factIndex=preteachIndex;persistTheme();renderPreteach();if(delta>0)setTimeout(()=>{if(preteachMode==='language')speak(TARGETS[preteachIndex].word);},180);
  }

  function createSession(game,rounds=8){
    session={gameId:game.id,title:game.title,round:0,rounds,correct:0,wrong:0,attempts:0,credit:0,maxCredit:0,streak:0,bestStreak:0,assistedThisRound:false,creditFactor:1,help5050:false,started:Date.now(),questionHistory:[],timer:null,hearts:10,score:0,academicMisses:[],gameplayMisses:0};
    currentGame=game;feedbackLocked=false;showScreen('gameScreen');$('gameTitle').textContent=`${game.icon} ${game.title}`;$('gameSubtitle').textContent=`Theme 07 · ${TIER_NAMES[tier()]}`;$('helpButton').classList.toggle('hidden',game.id==='mastery-challenge');$('helpNote').classList.remove('show');$('helpNote').textContent='';$('gameHow').textContent=game.desc;updateStats();
  }
  function updateStats(){
    if(!session)return;$('correctStat').textContent=session.correct;$('wrongStat').textContent=session.wrong;$('sessionStreak').textContent=session.streak;$('scoreStat').textContent=Math.round(session.score||session.credit*100);$('roundCounter').textContent=`${Math.min(session.round+1,session.rounds)} / ${session.rounds}`;$('roundProgress').style.width=(session.round/session.rounds*100)+'%';if($('roundProgressMirror'))$('roundProgressMirror').style.width=(session.round/session.rounds*100)+'%';
    const hearts=$('heartsStat');hearts.textContent='❤️'.repeat(Math.max(0,session.hearts||0))||'—';
  }

  function uniqueOptions(answer,candidates,count=4){const seen=new Set([norm(answer)]),out=[answer];for(const c of shuffle(candidates)){if(!c||seen.has(norm(c)))continue;seen.add(norm(c));out.push(c);if(out.length>=count)break;}const fallback=[...DAY_NAMES,...MONTH_NAMES,'day','week','calendar','month','year','time','season','date','decade','century','millennium'];for(const c of shuffle(fallback)){if(!seen.has(norm(c))){seen.add(norm(c));out.push(c);}if(out.length>=count)break;}return shuffle(out.slice(0,count));}
  function spellingOptions(answer){const wrong=SPELLING_WRONG[norm(answer)]||[answer+'e',answer.slice(0,-1),answer[0]+answer];return uniqueOptions(answer,wrong,4);}
  function relative(list,index,offset){return list[(index+offset+list.length)%list.length];}
  function dayQuestion(t=tier()){
    const i=Math.floor(Math.random()*7),ans=DAY_NAMES[i];
    if(t===0){const forms=[`Which is day number ${i+1} of a Monday-first week?`,`Which day comes immediately after ${relative(DAY_NAMES,i,-1)}?`,`Which day comes immediately before ${relative(DAY_NAMES,i,1)}?`];return q(forms[Math.floor(Math.random()*forms.length)],ans,uniqueOptions(ans,DAY_NAMES),ans,`Count from Monday as day 1.`,`The answer is the day in position ${i+1}.`,'sequence');}
    if(t===1){const off=Math.random()<.5?2:-2,base=relative(DAY_NAMES,i,-off);return q(`Which day comes ${Math.abs(off)} days ${off>0?'after':'before'} ${base}?`,ans,uniqueOptions(ans,DAY_NAMES),ans,'Move carefully through the weekly sequence.',`Start at ${base} and move ${Math.abs(off)} positions.`,'logic');}
    if(t===2){const bank=[
      ['Which day comes two days before the first weekend day?','Thursday'],
      ['Which day is immediately after the day between Monday and Wednesday?','Wednesday'],
      ['A school event is held one day before Friday. Which day is it?','Thursday'],
      ['Which day is two days after the first day of the working week?','Wednesday'],
      ['Which day comes immediately before the second weekend day?','Saturday']
    ];const x=bank[Math.floor(Math.random()*bank.length)];return q(x[0],x[1],uniqueOptions(x[1],DAY_NAMES),x[1],'Identify the reference day, then move through the sequence.','This clue requires more than one step.','reasoning');}
    const bank=[
      ['If today is the day after the day between Monday and Wednesday, what day is today?','Wednesday'],
      ['A challenge happens three days after Monday. Which day is it?','Thursday'],
      ['Choose the day that is one day after the middle day of a Monday-to-Sunday week.','Friday'],
      ['A club meets two days before Sunday and one day after Thursday. Which day satisfies both clues?','Friday'],
      ['Which day is exactly halfway between Monday and Sunday when counting forward?','Thursday']
    ];const x=bank[Math.floor(Math.random()*bank.length)];return q(x[0],x[1],uniqueOptions(x[1],DAY_NAMES),x[1],'Use every part of the clue.','Check that your answer satisfies all conditions.','master-reasoning');
  }
  function monthQuestion(t=tier()){
    const i=Math.floor(Math.random()*12),ans=MONTH_NAMES[i];
    if(t===0){const forms=[`Which is month number ${i+1}?`,`Which month comes immediately after ${relative(MONTH_NAMES,i,-1)}?`,`Which month comes immediately before ${relative(MONTH_NAMES,i,1)}?`];return q(forms[Math.floor(Math.random()*forms.length)],ans,uniqueOptions(ans,MONTH_NAMES),ans,`Count from January as month 1.`,`The target occupies position ${i+1}.`,'sequence');}
    if(t===1){const off=Math.random()<.5?2:-2,base=relative(MONTH_NAMES,i,-off);return q(`Which month comes ${Math.abs(off)} months ${off>0?'after':'before'} ${base}?`,ans,uniqueOptions(ans,MONTH_NAMES),ans,'Move through the month sequence.','Count month by month without skipping.','logic');}
    if(t===2){const bank=[
      ['Which month comes immediately after the shortest month of the year?','March'],
      ['Which month opens the second half of the year?','July'],
      ['Which month is between September and November?','October'],
      ['Which month comes two months before the final month of the year?','October'],
      ['Which month is three months after March?','June'],
      ['Which month comes immediately before the month of U.S. Independence Day?','June']
    ];const x=bank[Math.floor(Math.random()*bank.length)];return q(x[0],x[1],uniqueOptions(x[1],MONTH_NAMES),x[1],'Identify the key fact or position first.','Use the calendar sequence after interpreting the clue.','reasoning');}
    const bank=[
      ['Choose the month that is two months after the month before April.','May'],
      ['Which month is one month after the month immediately following the shortest month?','April'],
      ['A celebration is one month before Halloween and two months after July. Which month is it?','September'],
      ['Which month is the tenth month and also immediately before November?','October'],
      ['Choose the month that begins the final quarter of the year.','October'],
      ['Which month is halfway between March and September when moving forward month by month?','June']
    ];const x=bank[Math.floor(Math.random()*bank.length)];return q(x[0],x[1],uniqueOptions(x[1],MONTH_NAMES),x[1],'Break the clue into two smaller steps.','Use both the ordinal and sequence information.','master-reasoning');
  }
  function knowledgeQuestion(hard=false){
    const bank=[
      ['Which month is the shortest month of the year?','February'],
      ['In which month is Christmas celebrated?','December'],
      ['In which month is Halloween celebrated?','October'],
      ['In which month is U.S. Independence Day celebrated?','July'],
      ['In which month does New Year begin?','January'],
      ['Which word means a period of ten years?','decade'],
      ['Which word means a period of one hundred years?','century'],
      ['Which word means a period of one thousand years?','millennium'],
      ['Which word identifies a particular day on a calendar?','date'],
      ['Which word names one of the main divisions of a year, such as spring?','season'],
      ['Which word describes seven consecutive days?','week'],
      ['Which word describes the complete twelve-month cycle?','year'],
      ['Which month contains Earth Day?','April']
    ];
    const x=bank[Math.floor(Math.random()*bank.length)],ans=x[1];return q(x[0],ans,hard&&SPELLING_WRONG[norm(ans)]?spellingOptions(ans):uniqueOptions(ans,[...MONTH_NAMES,'week','year','date','season','decade','century','millennium']),ans,'Recall the Knowledge Boost before choosing.','The answer was explicitly introduced in Knowledge Boost.','knowledge');
  }
  function extendedQuestion(t=tier()){
    const bank=[
      ['A historian studies a period of 100 years. Which time word is needed?','century'],
      ['A project lasts 10 years. Which time word describes that period?','decade'],
      ['A civilisation develops across 1,000 years. Which word names that period?','millennium'],
      ['Which word would you write next to “14 August 2026” on a form?','date'],
      ['Which word completes this idea: spring, summer, autumn and winter are each a ___?','season'],
      ['Which tool organises days, weeks and months?','calendar'],
      ['Which general word describes what clocks measure?','time']
    ];const x=bank[Math.floor(Math.random()*bank.length)];return q(x[0],x[1],uniqueOptions(x[1],['calendar','time','date','season','decade','century','millennium','year','month']),x[1],'Focus on the meaning of the time word.','Match the quantity or function in the clue.','context');
  }
  function q(prompt,answer,options,targetWord,hint,strongHint,context='recognition',extra={}){return Object.assign({prompt,answer,options,target:targetWord,hint,strongHint,context,explanation:`Correct answer: ${answer}.`,speak:prompt},extra);}
  function generateQuestion(kind='mixed',forcedTier=tier()){
    if(kind==='day')return dayQuestion(forcedTier);if(kind==='month')return monthQuestion(forcedTier);if(kind==='knowledge')return knowledgeQuestion(forcedTier>=2);if(kind==='extended')return extendedQuestion(forcedTier);
    if(kind==='spelling'){const pool=TARGETS.filter(t=>t.word.length>=4),t=pool[Math.floor(Math.random()*pool.length)];return q(`Choose the correctly spelled word.`,t.word,spellingOptions(t.word),t.word,'Compare every letter carefully.',`The correct spelling begins with “${t.word.slice(0,2)}” and ends with “${t.word.slice(-2)}”.`,'spelling',{explanation:`${t.word} is the correct spelling.`});}
    const r=Math.random();return r<.32?dayQuestion(forcedTier):r<.68?monthQuestion(forcedTier):r<.86?knowledgeQuestion(forcedTier>=2):extendedQuestion(forcedTier);
  }

  function startGame(id){
    const game=GAME_DEFS.find(g=>g.id===id);if(!game)return;
    if(!isGameUnlocked(game)){toast('🔒 Complete the required preparation or previous experiences first.','bad');return;}
    currentGame=game;
    const dispatch={
      'quick-recall':()=>startStandard(game,'mixed',8),
      'week-order':()=>startOrderGame(game,DAY_NAMES),
      'month-order':()=>startOrderGame(game,MONTH_NAMES),
      'missing-letters':()=>startMissingLetters(game),
      'correct-spelling':()=>startStandard(game,'spelling',8),
      'build-word':()=>startBuildWord(game),
      'before-after':()=>startStandard(game,Math.random()<.5?'day':'month',8),
      'calendar-riddles':()=>startRiddles(game),
      'listen-choose':()=>startListening(game),
      'culture-challenge':()=>startStandard(game,'knowledge',8),
      'research-challenge':()=>startResearch(game),
      'calendar-logic':()=>startCalendarLogic(game),
      'bubble-rescue':()=>startBubbleRescue(game),
      'submarine-sonar':()=>startSonar(game),
      'current-chase':()=>startCurrentChase(game),
      'calendar-mine':()=>startGoldMiner(game),
      'calendar-rush':()=>startCalendarRush(game),
      'kraken-battle':()=>startKraken(game),
      'practice-mistakes':()=>startPracticeMistakes(game),
      'mastery-challenge':()=>startMastery(game)
    };dispatch[id]?.();
  }

  function prepareGameArea({prompt='',sub='',html='',kicker='CHALLENGE',showHearts=false}={}){
    $('promptKicker').textContent=kicker;$('promptText').textContent=prompt;$('promptSub').textContent=sub;$('challengeArea').innerHTML=html;$('heartsWrap').classList.toggle('hidden',!showHearts);$('helpNote').classList.remove('show');$('helpNote').textContent='';
  }
  function newRoundQuestion(qn){
    currentQuestion=qn;session.assistedThisRound=false;session.creditFactor=1;session.help5050=false;session.questionHistory.push(qn.prompt);feedbackLocked=false;
  }
  function renderMcq(qn,{speakNow=false,showHearts=false}={}){
    newRoundQuestion(qn);
    prepareGameArea({prompt:qn.prompt,sub:qn.context==='spelling'?'Only one spelling is correct.':'Think before you choose.',kicker:qn.context?.toUpperCase()||'CHALLENGE',showHearts,html:`<div class="answer-grid">${qn.options.map(o=>`<button class="answer-btn" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}</div>`});
    $$('.answer-btn',$('challengeArea')).forEach(b=>b.onclick=()=>answerMcq(b.dataset.answer,b));if(speakNow)setTimeout(()=>speak(qn.speak||qn.prompt,.72),260);updateStats();
  }
  function answerMcq(value,button){
    if(feedbackLocked)return;feedbackLocked=true;const ok=norm(value)===norm(currentQuestion.answer);button.classList.add(ok?'correct':'wrong');if(ok)audio.sfx('correct');else audio.sfx('wrong');
    recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);updateStats();
    $$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(norm(b.dataset.answer)===norm(currentQuestion.answer))b.classList.add('correct');});
    $('promptSub').textContent=ok?`✅ ${currentQuestion.explanation||'Correct!'}`:`❌ ${currentQuestion.explanation||`Correct answer: ${currentQuestion.answer}.`}`;
    setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext?.();},850);
  }
  let currentStandardNext=null;
  function startStandard(game,kind,rounds=8){
    createSession(game,rounds);currentStandardNext=()=>renderMcq(generateQuestion(kind,tier()));currentStandardNext();
  }

  function finishRegularGame({forceSuccess=null,customTitle=null}={}){
    if(timerHandle){clearInterval(timerHandle);timerHandle=null;}if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}
    const percent=session.maxCredit?Math.round(session.credit/session.maxCredit*100):Math.round(session.correct/Math.max(1,session.rounds)*100);const success=forceSuccess==null?percent>=60:forceSuccess;
    const gameId=session.gameId,first=!state.completedGames.includes(gameId);state.attempts[gameId]=(state.attempts[gameId]||0)+1;state.gameScores[gameId]=Math.max(Number(state.gameScores[gameId])||0,percent);
    if(success&&!state.completedGames.includes(gameId))state.completedGames.push(gameId);if(success&&gameId==='practice-mistakes'&&session.reviewKeys){session.reviewKeys.forEach(k=>reduceNeed(k,1));}
    const base={xp:90+tier()*25,gems:10+tier()*4,gold:35+tier()*12};const factor=first?1:.5;const reward=success?{xp:Math.round(base.xp*factor),gems:Math.round(base.gems*factor),gold:Math.round(base.gold*factor)}:{xp:25,gems:0,gold:8};addEconomy(reward);if(success)registerWeekly();persistTheme();persistWorld2();renderHomeStatus();
    const needs=[...new Set(session.academicMisses.map(norm))].map(k=>target(k)?.word||k);
    openModal({title:customTitle||`${success?'✅ EXPERIENCE COMPLETE':'📘 KEEP PRACTISING'}`,html:`<div style="text-align:center;font-size:68px">${success?'🌟':'🛠️'}</div><p style="text-align:center;font-size:21px"><strong>${escapeHtml(session.title)}</strong><br>Performance: <strong>${percent}%</strong></p><div class="record-grid"><div><small>CORRECT</small><strong>${session.correct}</strong></div><div><small>WRONG</small><strong>${session.wrong}</strong></div><div><small>BEST STREAK</small><strong>${session.bestStreak}</strong></div><div><small>REWARD</small><strong>💎${reward.gems} · 🪙${reward.gold}</strong></div></div>${needs.length?`<p style="text-align:center">Needs Review:</p><div class="needs-list">${needs.map(w=>`<span class="needs-chip">${escapeHtml(w)}</span>`).join('')}</div>`:''}`,actions:[{label:'RETURN TO THEME',className:'gold',onClick:()=>{showScreen('homeScreen');updateHud();}},{label:'REPLAY',className:'',onClick:()=>startGame(gameId)}],closable:false});
  }

  function startQuickRecallPreteach(){
    const game={id:'preteach-recall',title:'Pre-Teach Quick Recall',icon:'⚡',desc:'Prove that you can recognise the new language.'};createSession(game,8);$('helpButton').classList.add('hidden');currentStandardNext=()=>renderMcq(generateQuestion(Math.random()<.5?'spelling':'mixed',0));
    const originalFinish=finishRegularGame;session._preteach=true;currentStandardNext();
  }
  function finishPreteachRecall(){
    const percent=session.maxCredit?Math.round(session.credit/session.maxCredit*100):0;if(percent>=60){state.preteach.recall=true;persistTheme();openModal({title:'⚡ QUICK RECALL COMPLETE',html:`<p style="text-align:center;font-size:22px">You achieved ${percent}%. The games are now ${allPreteachDone()?'unlocked':'one step closer to unlocking'}.</p>`,actions:[{label:'RETURN',className:'gold',onClick:()=>{showScreen('homeScreen');updateHud();}}],closable:false});}else openModal({title:'RETRY QUICK RECALL',html:`<p>You achieved ${percent}%. Reach 60% to complete this preparation stage.</p>`,actions:[{label:'TRY AGAIN',className:'gold',onClick:()=>startQuickRecallPreteach()},{label:'RETURN',onClick:()=>showScreen('homeScreen')}],closable:false});
  }

  function startOrderGame(game,list){
    createSession(game,1);session.orderList=[...list];session.selected=[];newRoundQuestion(q(`Place the ${list.length===7?'days':'months'} in chronological order.`,list.join('|'),list,list[0],'Start from the beginning of the sequence.','Use the complete calendar order.','sequence'));
    renderOrderBoard();
  }
  function renderOrderBoard(){
    prepareGameArea({kicker:'SEQUENCE',prompt:currentQuestion.prompt,sub:'Select each tile in order. A wrong choice resets the current sequence.',html:`<div class="order-line" id="orderLine"></div><div class="order-pool" id="orderPool"></div>`});
    shuffle(session.orderList.filter(x=>!session.selected.includes(x))).forEach(w=>{const b=document.createElement('button');b.className='order-tile';b.textContent=w;b.onclick=()=>selectOrderWord(w);$('orderPool').appendChild(b);});renderOrderSelected();
  }
  function renderOrderSelected(){$('orderLine').innerHTML=session.selected.map(w=>`<span class="order-tile">${w}</span>`).join('');}
  function selectOrderWord(word){
    const expected=session.orderList[session.selected.length];if(word===expected){session.selected.push(word);recordAcademic(word,true,{context:'sequence'});audio.sfx('correct');if(session.selected.length===session.orderList.length){session.round=1;session.score=100;setTimeout(()=>finishRegularGame(),450);}else renderOrderBoard();}
    else{recordAcademic(expected,false,{context:'sequence'});session.academicMisses.push(expected);audio.sfx('wrong');toast(`Sequence reset. Expected ${expected}.`,'bad');session.selected=[];renderOrderBoard();}
  }

  function maskWord(word){
    const chars=[...word];const eligible=chars.map((c,i)=>/[a-z]/i.test(c)&&i>0&&i<chars.length-1?i:null).filter(i=>i!==null);const removeCount=clamp(Math.floor(chars.length/3)+(tier()>1?1:0),2,Math.min(5,eligible.length));shuffle(eligible).slice(0,removeCount).forEach(i=>chars[i]='_');return chars.join(' ');
  }
  function startMissingLetters(game){createSession(game,7);currentStandardNext=()=>{const pool=TARGETS.filter(t=>t.word.length>=5),t=pool[Math.floor(Math.random()*pool.length)];newRoundQuestion(q(`Complete the word:`,t.word,[],t.word,'Use the visible letters and the meaning from Pre-Teach.',`The word begins with ${t.word.slice(0,2)} and ends with ${t.word.slice(-2)}.`,'spelling'));prepareGameArea({kicker:'MISSING LETTERS',prompt:'Recover the complete spelling.',sub:t.es,html:`<div class="masked-word">${maskWord(t.word.toUpperCase())}</div><input id="typedAnswer" class="input-answer" autocomplete="off" spellcheck="false" placeholder="Type the complete word"><div style="text-align:center;margin-top:14px"><button id="submitTyped" class="btn gold">CHECK ANSWER</button></div>`});$('submitTyped').onclick=checkTyped;$('typedAnswer').addEventListener('keydown',e=>{if(e.key==='Enter')checkTyped();});$('typedAnswer').focus();};currentStandardNext();}
  function checkTyped(){if(feedbackLocked)return;const input=$('typedAnswer'),value=input.value,ok=norm(value)===norm(currentQuestion.answer);feedbackLocked=true;input.classList.add(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:'spelling',assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);$('promptSub').textContent=ok?'✅ Excellent spelling!':`❌ Correct spelling: ${currentQuestion.answer}`;audio.sfx(ok?'correct':'wrong');setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},800);}

  function startBuildWord(game){createSession(game,7);currentStandardNext=()=>{const pool=TARGETS.filter(t=>t.word.length>=6),t=pool[Math.floor(Math.random()*pool.length)];session.buildTarget=t;session.built=[];newRoundQuestion(q(`Build the word meaning “${t.es}”.`,t.word,[],t.word,'Use every letter exactly once.',`The spelling rhythm is ${t.syllables}.`,'spelling'));renderBuildBoard();};currentStandardNext();}
  function renderBuildBoard(){const t=session.buildTarget,remaining=[...t.word.toUpperCase()];session.built.forEach(letter=>{const i=remaining.indexOf(letter);if(i>=0)remaining.splice(i,1);});prepareGameArea({kicker:'BUILD THE WORD',prompt:currentQuestion.prompt,sub:`${t.ipa} · ${t.syllables}`,html:`<div id="builtWord" class="built-word">${session.built.map(l=>`<span class="built-letter">${l}</span>`).join('')}</div><div id="letterBoard" class="letter-board"></div><div style="text-align:center"><button id="backLetter" class="btn ghost small">⌫ BACK</button> <button id="resetLetters" class="btn ghost small">RESET</button></div>`});shuffle(remaining).forEach(l=>{const b=document.createElement('button');b.className='letter-btn';b.textContent=l;b.onclick=()=>{session.built.push(l);if(session.built.length===t.word.length){const made=session.built.join(''),ok=norm(made)===norm(t.word);recordAcademic(t.word,ok,{context:'spelling'});session.score+=ok?100:0;if(!ok)session.academicMisses.push(t.word);audio.sfx(ok?'correct':'wrong');$('promptSub').textContent=ok?'✅ Word constructed correctly!':`❌ You built ${made}. Try the correct order next.`;setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},750);}else renderBuildBoard();};$('letterBoard').appendChild(b);});$('backLetter').onclick=()=>{session.built.pop();renderBuildBoard();};$('resetLetters').onclick=()=>{session.built=[];renderBuildBoard();};}

  function startRiddles(game){
    createSession(game,8);const riddles=[
      q('I am the first month, but I am not the first day. Who am I?','January',spellingOptions('January'),'January','Think about the beginning of a year.','The year begins with this month.','reasoning'),
      q('I arrive after September and leave before November. Who am I?','October',spellingOptions('October'),'October','I am between two named months.','Look at the month directly between September and November.','reasoning'),
      q('I contain seven days but I am not a month. What am I?','week',uniqueOptions('week',['day','month','year','calendar']),'week','Think about a unit of seven days.','Seven days make this unit.','context'),
      q('Ten of me make a century. What am I?','decade',spellingOptions('decade'),'decade','Use the relationship between 10 and 100 years.','Ten decades equal one century.','reasoning'),
      q('I am the month immediately after the shortest month. Who am I?','March',spellingOptions('March'),'March','First identify the shortest month.','February is shortest; move one month forward.','reasoning'),
      q('I am a specific point on a calendar, not the whole calendar. What am I?','date',spellingOptions('date'),'date','Think of something written as day + month + year.','A particular calendar point is a date.','context'),
      q('I last one thousand years. What am I?','millennium',spellingOptions('millennium'),'millennium','Compare decade, century and millennium.','One millennium equals 1,000 years.','reasoning'),
      q('I come two days before Sunday. Who am I?','Friday',spellingOptions('Friday'),'Friday','Count backwards twice.','Sunday ← Saturday ← Friday.','sequence')
    ];currentStandardNext=()=>renderMcq(riddles[session.round%riddles.length]);currentStandardNext();
  }

  function startListening(game){createSession(game,8);currentStandardNext=()=>{const qn=generateQuestion(Math.random()<.55?'mixed':'spelling',Math.max(1,tier()));qn.prompt='Listen carefully. Choose the answer that matches the spoken clue.';qn.speak=generateQuestion(Math.random()<.5?'day':'month',Math.max(1,tier())).prompt;const spokenQ=qn.speak;const logical=spokenQ.includes('day')?dayQuestion(Math.max(1,tier())):monthQuestion(Math.max(1,tier()));logical.prompt='Listen carefully. Choose the answer that matches the spoken clue.';logical.speak=logical._original||logical.speak||spokenQ;renderMcq(logical,{speakNow:true});$('promptSub').innerHTML='<button id="replayAudio" class="btn small">🔊 REPLAY</button>';$('replayAudio').onclick=()=>speak(logical.speak,.72);};currentStandardNext();}

  function startResearch(game){
    createSession(game,RESEARCH_SET.length);session.researchSet=shuffle(RESEARCH_SET);currentStandardNext=()=>{const item=session.researchSet[session.round],t=target(item.answer);newRoundQuestion(q(item.prompt,item.answer,[],item.answer,'This is a deliberate research task.',item.hint,'research'));prepareGameArea({kicker:'🔎 RESEARCH CHALLENGE',prompt:item.prompt,sub:'Open a trusted source, research the fact, return and answer in English.',html:`<div class="research-note"><strong>This information was not pre-taught on purpose.</strong><br>Research + reading comprehension + English are the objective.</div><input id="typedAnswer" class="input-answer" autocomplete="off" placeholder="Type the month in English"><div style="text-align:center;margin-top:14px"><button id="submitResearch" class="btn gold">SUBMIT RESEARCH ANSWER</button></div>`});$('submitResearch').onclick=checkResearch;$('typedAnswer').addEventListener('keydown',e=>{if(e.key==='Enter')checkResearch();});};currentStandardNext();
  }
  function checkResearch(){if(feedbackLocked)return;const value=$('typedAnswer').value,ok=norm(value)===norm(currentQuestion.answer);feedbackLocked=true;recordAcademic(currentQuestion.target,ok,{context:'research'});session.score+=ok?120:0;if(ok&&!state.researchDone.includes(currentQuestion.prompt))state.researchDone.push(currentQuestion.prompt);if(!ok)session.academicMisses.push(currentQuestion.target);persistTheme();$('promptSub').textContent=ok?'✅ Research confirmed.':`❌ Correct answer: ${currentQuestion.answer}. ${currentQuestion.strongHint}`;audio.sfx(ok?'correct':'wrong');setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},900);}

  function startCalendarLogic(game){createSession(game,9);currentStandardNext=()=>{const type=session.round%3===0?'extended':session.round%3===1?'month':'day';renderMcq(generateQuestion(type,Math.max(2,tier())));};currentStandardNext();}

  function startBubbleRescue(game){
    createSession(game,6);currentStandardNext=()=>{const qn=generateQuestion(session.round%2?'spelling':'mixed',Math.max(1,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'🫧 BUBBLE RESCUE',prompt:qn.prompt,sub:'Pop the correct bubble before it reaches the surface.',html:'<div id="bubbleZone" class="bubble-zone"></div>'});
      const zone=$('bubbleZone'),options=shuffle(qn.options);let resolved=false;options.forEach((o,i)=>{const b=document.createElement('button');b.className='bubble';b.dataset.answer=o;b.textContent=o;b.style.setProperty('--s',(105+Math.random()*30)+'px');b.style.setProperty('--x',(4+i*(88/Math.max(1,options.length-1)))+'%');b.style.setProperty('--d',(6.4+Math.random()*2.4)+'s');b.style.setProperty('--drift',(-25+Math.random()*50)+'px');b.style.animationDelay=(i*.24)+'s';b.onclick=()=>{if(resolved)return;resolved=true;const ok=norm(o)===norm(qn.answer);recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});session.score+=ok?120*session.creditFactor:0;if(!ok)session.academicMisses.push(qn.target);b.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');setTimeout(next,550);};b.addEventListener('animationend',()=>{if(!resolved&&norm(o)===norm(qn.answer)){resolved=true;session.gameplayMisses++;toast('The correct bubble escaped. Timing miss — Mastery unchanged.','bad');setTimeout(next,450);}});zone.appendChild(b);});function next(){session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();}updateStats();};currentStandardNext();
  }

  function startSonar(game){
    createSession(game,6);currentStandardNext=()=>{const qn=generateQuestion(session.round%2?'mixed':'spelling',Math.max(1,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'🚢 SUBMARINE SONAR',prompt:qn.prompt,sub:'Wait for the sweep, then confirm the correct signal.',html:'<div id="sonarZone" class="sonar-zone"></div>'});
      const positions=[[26,27],[70,25],[31,67],[72,69]];shuffle(qn.options).forEach((o,i)=>{const b=document.createElement('button');b.className='blip';b.dataset.answer=o;b.textContent=o;b.style.setProperty('--x',positions[i][0]+'%');b.style.setProperty('--y',positions[i][1]+'%');b.onclick=()=>{if(feedbackLocked)return;feedbackLocked=true;const ok=norm(o)===norm(qn.answer);recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});session.score+=ok?130*session.creditFactor:0;if(!ok)session.academicMisses.push(qn.target);b.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},650);};$('sonarZone').appendChild(b);});updateStats();};currentStandardNext();
  }

  function startCurrentChase(game){
    createSession(game,6);currentStandardNext=()=>{const qn=generateQuestion('mixed',Math.max(1,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'🐠 CURRENT CHASE',prompt:qn.prompt,sub:'Intercept the correct target. Missing a target is a gameplay miss, not an English error.',html:'<div id="currentZone" class="current-zone"></div>'});const zone=$('currentZone');let resolved=false;shuffle(qn.options).forEach((o,i)=>{const b=document.createElement('button');b.className='chase-target';b.dataset.answer=o;b.textContent=o;b.style.setProperty('--y',(58+i*84)+'px');b.style.setProperty('--d',(6.8+i*.55)+'s');b.style.animationDelay=(i*.22)+'s';b.onclick=()=>{if(resolved)return;resolved=true;const ok=norm(o)===norm(qn.answer);recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});session.score+=ok?130*session.creditFactor:0;if(!ok)session.academicMisses.push(qn.target);audio.sfx(ok?'correct':'wrong');setTimeout(next,550);};b.addEventListener('animationend',()=>{if(!resolved&&norm(o)===norm(qn.answer)){resolved=true;session.gameplayMisses++;toast('Target passed. Timing miss — no Mastery penalty.','bad');setTimeout(next,450);}});zone.appendChild(b);});function next(){session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();}updateStats();};currentStandardNext();
  }

  function startCalendarRush(game){
    createSession(game,10);session.remaining=60;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;currentStandardNext=()=>renderMcq(generateQuestion('mixed',Math.max(1,tier())));currentStandardNext();timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0){clearInterval(timerHandle);timerHandle=null;session.round=session.rounds;finishRegularGame({customTitle:'⏱️ TIME IS UP'});}},1000);actionCleanup=()=>{$('timerWrap').classList.add('hidden');};
  }

  function startGoldMiner(game){
    createSession(game,6);session.hearts=5;session.minerItems={dynamite:1,power:1,extraTime:0};session.remaining=75;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;$('heartsWrap').classList.remove('hidden');updateStats();
    openModal({title:'⛏️ MINER SHOP',html:`<p>Coins buy gameplay tools. Gems remain reserved for learning support.</p><div class="help-grid"><button class="help-option" data-shop="dynamite"><strong>🧨 Dynamite <span class="cost">🪙35</span></strong><small>Destroy a heavy rock already caught by the claw.</small></button><button class="help-option" data-shop="time"><strong>⏱️ Extra Time <span class="cost">🪙45</span></strong><small>Add 15 seconds to this mining run.</small></button><button class="help-option" data-shop="power"><strong>💪 Power Boost <span class="cost">🪙50</span></strong><small>Pull rocks and word tablets back faster.</small></button></div><p id="shopInventory" style="text-align:center;font-weight:900;color:#fff1a0"></p>`,actions:[{label:'START CALENDAR MINE',className:'gold',onClick:beginGoldMiner}],closable:false});
    $$('[data-shop]',$('modalBody')).forEach(b=>b.onclick=()=>buyMinerItem(b.dataset.shop));updateMinerInventoryText();
  }
  function buyMinerItem(id){const costs={dynamite:35,time:45,power:50};if(!spend('gold',costs[id])){toast('NOT ENOUGH COINS','bad');return;}if(id==='dynamite')session.minerItems.dynamite++;if(id==='time'){session.minerItems.extraTime+=15;session.remaining+=15;}if(id==='power')session.minerItems.power+=.35;audio.sfx('correct');updateMinerInventoryText();}
  function updateMinerInventoryText(){const el=$('shopInventory');if(el)el.textContent=`Inventory: 🧨 ${session.minerItems.dynamite} · ⏱️ +${session.minerItems.extraTime}s · 💪 x${session.minerItems.power.toFixed(2)}`;}
  function beginGoldMiner(){
    const qn=generateQuestion('mixed',Math.max(2,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'⛏️ CALENDAR MINE',prompt:qn.prompt,sub:'The claw swings automatically. Click, tap or press Space at the right moment.',showHearts:true,html:`<div class="canvas-frame"><canvas id="minerCanvas" width="1000" height="560" aria-label="Calendar Mine"></canvas></div><div class="miner-controls"><button id="launchClaw" class="btn gold">⛓️ RELEASE CLAW</button><button id="useDynamite" class="btn red">🧨 DYNAMITE (<span id="dynCount">${session.minerItems.dynamite}</span>)</button><button id="buyDynamite" class="btn small">BUY 🧨 · 🪙35</button></div>`});
    initMinerCanvas(qn);$('launchClaw').onclick=minerLaunch;$('useDynamite').onclick=minerDynamite;$('buyDynamite').onclick=()=>{if(spend('gold',35)){session.minerItems.dynamite++;$('dynCount').textContent=session.minerItems.dynamite;toast('🧨 Dynamite added.','good');}else toast('NOT ENOUGH COINS','bad');};
  }
  let miner=null;
  function initMinerCanvas(qn){
    const canvas=$('minerCanvas'),ctx=canvas.getContext('2d');miner={canvas,ctx,w:1000,h:560,last:performance.now(),question:qn,roundResolved:false,objects:[],particles:[],hook:{ox:500,oy:112,min:64,length:64,angle:-1.12,dir:1,state:'swing',max:620,tipX:500,tipY:176,caught:null},timerAccumulator:0};
    buildMinerObjects(qn);canvas.addEventListener('pointerdown',minerLaunch);document.addEventListener('keydown',minerKey);timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0)endMinerRun('⏱️ Time expired.');},1000);actionCleanup=()=>{document.removeEventListener('keydown',minerKey);$('timerWrap').classList.add('hidden');miner=null;};minerLoop(performance.now());
  }
  function minerKey(e){if(e.code==='Space'||e.code==='ArrowDown'){e.preventDefault();minerLaunch();}if(e.code==='KeyD'||e.code==='ArrowUp'){e.preventDefault();minerDynamite();}}
  function buildMinerObjects(qn){
    const slots=[[145,255],[355,305],[650,260],[845,330]],options=shuffle(qn.options);options.forEach((o,i)=>miner.objects.push({kind:'word',label:o,x:slots[i][0],y:slots[i][1],r:58+Math.min(12,o.length*1.2),weight:.9,value:norm(o)===norm(qn.answer)}));
    const rockSlots=[[250,420],[495,395],[760,455],[92,455],[910,210]];rockSlots.forEach((p,i)=>miner.objects.push({kind:'rock',x:p[0],y:p[1],r:32+(i%3)*8,weight:3.6+i*.3,seed:i*17+7}));
  }
  function minerLaunch(){if(!miner||miner.hook.state!=='swing'||feedbackLocked)return;miner.hook.state='out';miner.hook.max=minerRayBoundary(miner.hook.angle);audio.sfx('launch');}
  function minerRayBoundary(angle){const h=miner.hook,dx=Math.sin(angle),dy=Math.cos(angle);let t=(miner.h-20-h.oy)/Math.max(.001,dy);if(dx<-.001)t=Math.min(t,(20-h.ox)/dx);if(dx>.001)t=Math.min(t,(miner.w-20-h.ox)/dx);return Math.max(100,t);}
  function minerDynamite(){if(!miner)return;const h=miner.hook;if(!h.caught||h.caught.kind!=='rock'){toast('Dynamite is only needed for a caught rock.');return;}if(session.minerItems.dynamite<=0){toast('No dynamite. Buy one with Coins.','bad');return;}session.minerItems.dynamite--;$('dynCount').textContent=session.minerItems.dynamite;minerExplode(h.caught.x,h.caught.y);h.caught=null;h.state='back';audio.sfx('boss');toast('🧨 Rock destroyed. Mastery unchanged.','good');}
  function minerLoop(now){if(!miner)return;const dt=Math.min(.035,(now-miner.last)/1000||0);miner.last=now;updateMiner(dt);drawMiner();animationHandle=requestAnimationFrame(minerLoop);}
  function updateMiner(dt){
    const h=miner.hook;h.prevX=h.tipX;h.prevY=h.tipY;
    if(h.state==='swing'){h.angle+=h.dir*.95*dt;if(h.angle>1.32){h.angle=1.32;h.dir=-1;}if(h.angle<-1.32){h.angle=-1.32;h.dir=1;}}
    else if(h.state==='out'){h.length=Math.min(h.max,h.length+650*dt);const hit=minerCollision(h.prevX,h.prevY,h.ox+Math.sin(h.angle)*h.length,h.oy+Math.cos(h.angle)*h.length);if(hit){miner.objects=miner.objects.filter(o=>o!==hit);h.caught=hit;h.state='back';audio.sfx('grab');}else if(h.length>=h.max-.1){h.state='back';session.gameplayMisses++;toast('Missed target — no Mastery penalty.');}}
    else if(h.state==='back'){const weight=h.caught?.weight||.5;const speed=(600*session.minerItems.power)/Math.max(.45,weight);h.length-=speed*dt;if(h.length<=h.min){h.length=h.min;resolveMinerCatch(h.caught);h.caught=null;h.state='swing';}}
    h.tipX=h.ox+Math.sin(h.angle)*h.length;h.tipY=h.oy+Math.cos(h.angle)*h.length;if(h.caught){h.caught.x=h.tipX;h.caught.y=h.tipY+9;}
    miner.particles.forEach(p=>{p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=180*dt;});miner.particles=miner.particles.filter(p=>p.life>0);
  }
  function minerCollision(x1,y1,x2,y2){let best=null,bestT=Infinity;for(const o of miner.objects){const t=segmentCircleHit(x1,y1,x2,y2,o.x,o.y,o.r+8);if(t!=null&&t<bestT){best=o;bestT=t;}}return best;}
  function segmentCircleHit(x1,y1,x2,y2,cx,cy,r){const dx=x2-x1,dy=y2-y1,fx=x1-cx,fy=y1-cy,a=dx*dx+dy*dy;if(a<1e-6)return null;const b=2*(fx*dx+fy*dy),c=fx*fx+fy*fy-r*r,d=b*b-4*a*c;if(d<0)return null;const s=Math.sqrt(d),t1=(-b-s)/(2*a),t2=(-b+s)/(2*a);if(t1>=0&&t1<=1)return t1;if(t2>=0&&t2<=1)return t2;return null;}
  function resolveMinerCatch(obj){
    if(!obj)return;if(obj.kind==='rock'){session.gameplayMisses++;toast('🪨 Heavy rock! Time lost, but Mastery is unchanged.','bad');return;}
    const ok=Boolean(obj.value);recordAcademic(miner.question.target,ok,{credit:session.creditFactor,context:miner.question.context,assisted:session.assistedThisRound});session.score+=ok?160*session.creditFactor:0;if(!ok){session.academicMisses.push(miner.question.target);session.hearts--;audio.sfx('wrong');}else audio.sfx('correct');updateStats();
    $('promptSub').textContent=ok?`✅ ${obj.label} is correct.`:`❌ ${obj.label} is not correct. The answer was ${miner.question.answer}.`;
    session.round++;if(session.hearts<=0||session.round>=session.rounds){setTimeout(()=>endMinerRun(session.hearts<=0?'No hearts remaining.':'Mining mission complete.'),650);}else setTimeout(nextMinerRound,650);
  }
  function nextMinerRound(){if(!miner)return;const qn=generateQuestion('mixed',Math.max(2,tier()));newRoundQuestion(qn);miner.question=qn;miner.objects=[];buildMinerObjects(qn);$('promptText').textContent=qn.prompt;$('promptSub').textContent='The claw swings automatically. Choose the release moment.';miner.hook.state='swing';miner.hook.length=miner.hook.min;updateStats();}
  function endMinerRun(message){if(!miner)return;toast(message);if(timerHandle){clearInterval(timerHandle);timerHandle=null;}if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}document.removeEventListener('keydown',minerKey);miner=null;$('timerWrap').classList.add('hidden');finishRegularGame({forceSuccess:session.correct>=4,customTitle:'⛏️ CALENDAR MINE RESULTS'});}
  function minerExplode(x,y){if(!miner)return;for(let i=0;i<50;i++){const a=Math.random()*Math.PI*2,s=50+Math.random()*180;miner.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-50,life:.5+Math.random()*.5,color:['#ffd54d','#ff743e','#5a4032'][i%3]});}}
  function drawMiner(){
    const {ctx,w,h}=miner;const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,'#2aa5c9');grad.addColorStop(.18,'#153f60');grad.addColorStop(1,'#1b100d');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
    ctx.fillStyle='rgba(255,219,112,.12)';for(let y=170;y<h;y+=75){ctx.beginPath();ctx.moveTo(0,y);for(let x=0;x<=w;x+=40)ctx.lineTo(x,y+Math.sin(x*.02+y)*8);ctx.lineTo(w,y+25);ctx.lineTo(0,y+25);ctx.fill();}
    drawMinerCharacter(ctx,500,22);drawMinerPet(ctx,82,70,state.companions?.selected||'dog');
    miner.objects.slice().sort((a,b)=>a.y-b.y).forEach(o=>drawMinerObject(ctx,o));if(miner.hook.caught)drawMinerObject(ctx,miner.hook.caught);
    const hq=miner.hook;ctx.strokeStyle='#221a15';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(hq.ox,hq.oy);ctx.lineTo(hq.tipX,hq.tipY);ctx.stroke();ctx.strokeStyle='#d9c7a8';ctx.lineWidth=3;ctx.stroke();ctx.save();ctx.translate(hq.tipX,hq.tipY);ctx.rotate(-hq.angle);ctx.strokeStyle='#d8dde0';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(0,10);ctx.arc(13,10,13,Math.PI,0);ctx.stroke();ctx.restore();
    miner.particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,5,5);ctx.globalAlpha=1;});
  }
  function drawMinerCharacter(ctx,x,y){
    ctx.save();ctx.translate(x,y);const helmet=ctx.createLinearGradient(-60,0,60,70);helmet.addColorStop(0,'#fff09a');helmet.addColorStop(.55,'#e5a92b');helmet.addColorStop(1,'#8d5308');ctx.fillStyle=helmet;ctx.strokeStyle='#5b390c';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,48,56,Math.PI,0);ctx.lineTo(58,64);ctx.lineTo(-58,64);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#ffd874';ctx.fillRect(-70,58,140,15);ctx.strokeRect(-70,58,140,15);ctx.fillStyle='#f1b680';ctx.beginPath();ctx.arc(0,83,43,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#7b4b31';ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-15,78,8,0,Math.PI*2);ctx.arc(15,78,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2b2a2a';ctx.beginPath();ctx.arc(-14,79,4,0,Math.PI*2);ctx.arc(14,79,4,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#6b3528';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,92,17,.15,Math.PI-.15);ctx.stroke();ctx.fillStyle='#5a3624';ctx.fillRect(-48,112,96,22);ctx.restore();
  }
  function drawMinerPet(ctx,x,y,id){const pet=PETS.find(p=>p.id===id)||PETS[0];ctx.save();ctx.translate(x,y);const g=ctx.createRadialGradient(-12,-14,3,0,0,42);g.addColorStop(0,'#fff7d2');g.addColorStop(.45,id==='fox'?'#f58a38':id==='raccoon'?'#87929c':id==='capybara'||id==='beaver'?'#a8754f':'#d9b27f');g.addColorStop(1,'#4b3326');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,38,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-12,-4,8,0,Math.PI*2);ctx.arc(12,-4,8,0,Math.PI*2);ctx.fill();ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-11,-4,4,0,Math.PI*2);ctx.arc(11,-4,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2e211c';ctx.beginPath();ctx.arc(0,9,6,0,Math.PI*2);ctx.fill();ctx.font='20px sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(pet.icon,0,61);ctx.restore();}
  function drawMinerObject(ctx,o){ctx.save();ctx.translate(o.x,o.y);if(o.kind==='rock'){const r=o.r,g=ctx.createRadialGradient(-r*.3,-r*.3,2,0,0,r);g.addColorStop(0,'#aa9b8d');g.addColorStop(1,'#3b3029');ctx.fillStyle=g;ctx.strokeStyle='#28201c';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<9;i++){const a=i/9*Math.PI*2,rr=r*(.8+((o.seed+i*13)%20)/100);const x=Math.cos(a)*rr,y=Math.sin(a)*rr;if(!i)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.fill();ctx.stroke();}else{const r=o.r,g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,o.value?'#fff5a0':'#d9f7ff');g.addColorStop(.42,o.value?'#e5ab24':'#2cc3d5');g.addColorStop(1,o.value?'#895107':'#075783');ctx.fillStyle=g;ctx.strokeStyle='#fff1aa';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(-r,-r*.58,r*2,r*1.16,18);ctx.fill();ctx.stroke();ctx.fillStyle=o.value?'#241605':'#fff';ctx.font=`900 ${Math.max(15,31-o.label.length*.7)}px Trebuchet MS`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(o.label,0,2);};ctx.restore();}

  function startKraken(game){
    createSession(game,8);session.hearts=6;session.krakenHp=8;session.remaining=100;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;$('heartsWrap').classList.remove('hidden');renderKrakenRound();timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0)finishKraken(false,'Time expired.');},1000);actionCleanup=()=>{$('timerWrap').classList.add('hidden');kraken=null;};
  }
  let kraken=null;
  function renderKrakenRound(){
    if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}
    const qn=session.round%3===0?generateQuestion('spelling',3):session.round%3===1?generateQuestion('knowledge',3):generateQuestion('mixed',3);newRoundQuestion(qn);
    prepareGameArea({kicker:'🐙 KRAKEN BATTLE',prompt:qn.prompt,sub:'Correct answers damage the Kraken. Academic errors cost a heart.',showHearts:true,html:`<div class="boss-label"><span>BOSS · CALENDAR KRAKEN</span><span>PHASE ${session.krakenHp>5?1:session.krakenHp>2?2:3}</span></div><div class="boss-hp"><i id="krakenHpFill" style="width:${session.krakenHp/8*100}%"></i></div><div class="canvas-frame"><canvas id="krakenCanvas" width="1000" height="560"></canvas><div id="krakenOptions" class="kraken-options">${qn.options.map(o=>`<button class="answer-btn" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}</div></div>`});
    $$('.answer-btn',$('krakenOptions')).forEach(b=>b.onclick=()=>answerKraken(b.dataset.answer,b));kraken={canvas:$('krakenCanvas'),ctx:$('krakenCanvas').getContext('2d'),last:performance.now(),hit:0,attack:0,phase:session.krakenHp>5?1:session.krakenHp>2?2:3};krakenLoop(performance.now());updateStats();
  }
  function answerKraken(value,button){
    if(feedbackLocked)return;feedbackLocked=true;const ok=norm(value)===norm(currentQuestion.answer);recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});
    if(ok){session.krakenHp--;session.score+=180*session.creditFactor;kraken.hit=1;audio.sfx('boss');button.classList.add('correct');toast('DIRECT HIT! The Kraken loses HP.','good');}
    else{session.hearts--;session.academicMisses.push(currentQuestion.target);kraken.attack=1;audio.sfx('wrong');button.classList.add('wrong');toast(`Kraken attack! Correct answer: ${currentQuestion.answer}`,'bad');}
    updateStats();$('krakenHpFill').style.width=(session.krakenHp/8*100)+'%';$$('.answer-btn',$('krakenOptions')).forEach(b=>{b.disabled=true;if(norm(b.dataset.answer)===norm(currentQuestion.answer))b.classList.add('correct');});
    session.round++;setTimeout(()=>{if(session.krakenHp<=0)finishKraken(true,'Kraken defeated!');else if(session.hearts<=0||session.round>=session.rounds)finishKraken(false,session.hearts<=0?'No hearts remaining.':'The Kraken survived.');else renderKrakenRound();},900);
  }
  function finishKraken(success,msg){if(!session||session.gameId!=='kraken-battle')return;if(timerHandle){clearInterval(timerHandle);timerHandle=null;}if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}kraken=null;$('timerWrap').classList.add('hidden');toast(msg,success?'good':'bad');finishRegularGame({forceSuccess:success,customTitle:success?'🐙 KRAKEN DEFEATED':'🐙 KRAKEN RETREAT'});}
  function krakenLoop(now){if(!kraken)return;const dt=Math.min(.035,(now-kraken.last)/1000||0);kraken.last=now;kraken.hit=Math.max(0,kraken.hit-dt*2.7);kraken.attack=Math.max(0,kraken.attack-dt*2.4);drawKrakenCanvas();animationHandle=requestAnimationFrame(krakenLoop);}
  function drawKrakenCanvas(){
    const {ctx}=kraken,w=1000,h=560,t=performance.now()*.001;const sea=ctx.createLinearGradient(0,0,0,h);sea.addColorStop(0,'#1fc7eb');sea.addColorStop(.35,'#075f91');sea.addColorStop(1,'#031a3b');ctx.fillStyle=sea;ctx.fillRect(0,0,w,h);
    ctx.globalAlpha=.13;ctx.strokeStyle='#b9f8ff';ctx.lineWidth=2;for(let y=60;y<h;y+=65){ctx.beginPath();for(let x=0;x<=w;x+=35)ctx.lineTo(x,y+Math.sin(x*.025+t*1.5+y)*7);ctx.stroke();}ctx.globalAlpha=1;
    drawSubmarine(ctx,105,300,t);
    ctx.save();ctx.translate(700,325);ctx.globalAlpha=kraken.hit?.55+Math.sin(t*30)*.35:1;const body=ctx.createRadialGradient(-50,-70,20,0,0,220);body.addColorStop(0,'#bd5b9d');body.addColorStop(.48,'#6c2869');body.addColorStop(1,'#251439');ctx.fillStyle=body;ctx.strokeStyle='#210d2d';ctx.lineWidth=7;
    for(let i=0;i<8;i++){const a=(i-3.5)*.36,phase=t*(1.1+kraken.phase*.15)+i;ctx.strokeStyle=i%2?'#7b2c76':'#5f2264';ctx.lineWidth=38-i%2*5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(Math.sin(a)*90,45);ctx.bezierCurveTo(Math.sin(a)*180+Math.sin(phase)*28,95,Math.sin(a)*240+Math.cos(phase)*38,165,Math.sin(a)*300,215);ctx.stroke();ctx.strokeStyle='rgba(255,178,222,.25)';ctx.lineWidth=6;ctx.stroke();}
    ctx.beginPath();ctx.ellipse(0,-28,175,150,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#ffd25a';ctx.shadowColor='#ff8b3d';ctx.shadowBlur=20;ctx.beginPath();ctx.ellipse(-58,-60,20,31,0,0,Math.PI*2);ctx.ellipse(58,-60,20,31,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#241122';ctx.beginPath();ctx.arc(-58,-58,8,0,Math.PI*2);ctx.arc(58,-58,8,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#e89fbd';ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,10,50,.25,Math.PI-.25);ctx.stroke();
    if(kraken.attack){ctx.fillStyle=`rgba(255,92,63,${kraken.attack*.25})`;ctx.beginPath();ctx.arc(0,0,240,0,Math.PI*2);ctx.fill();}
    ctx.restore();
    ctx.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<24;i++){const x=(i*157+t*20)%1000,y=(i*79+t*35)%560;ctx.beginPath();ctx.arc(x,y,2+(i%4),0,Math.PI*2);ctx.fill();}
  }
  function drawSubmarine(ctx,x,y,t){ctx.save();ctx.translate(x,y+Math.sin(t*2)*5);const g=ctx.createLinearGradient(-90,-40,90,40);g.addColorStop(0,'#fff2a0');g.addColorStop(.48,'#d89519');g.addColorStop(1,'#775006');ctx.fillStyle=g;ctx.strokeStyle='#46320c';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,0,105,55,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#51d8ef';ctx.beginPath();ctx.arc(-25,-10,21,0,Math.PI*2);ctx.arc(25,-10,21,0,Math.PI*2);ctx.fill();ctx.fillStyle='#73510e';ctx.fillRect(-9,-83,18,35);ctx.beginPath();ctx.arc(0,-80,34,Math.PI,0);ctx.fill();ctx.fillStyle='#f4c23a';ctx.beginPath();ctx.moveTo(-95,0);ctx.lineTo(-135,-35);ctx.lineTo(-135,35);ctx.closePath();ctx.fill();ctx.restore();}

  function openGemHelp(){
    if(!currentQuestion||currentGame?.id==='mastery-challenge'){toast('Gem Help is unavailable in the Mastery Challenge.','bad');return;}
    const options=[
      ['quick',25,'QUICK HINT','A conceptual nudge without revealing the answer.'],
      ['fifty',30,'50 / 50','Eliminate two distractors. One use per question.'],
      ['strong',45,'STRONG HINT','A more focused clue that still requires the answer.'],
      ['slow',15,'SLOW REPLAY','Hear the English clue more slowly.'],
      ['spelling',20,'SPELLING SUPPORT','Reveal a multi-letter pattern, not the complete answer.']
    ].filter(x=>!(x[0]==='fifty'&&(session.help5050||currentGame?.id==='calendar-mine')));
    openModal({title:'💎 NEED HELP?',html:`<p>Gem Help supports learning. Assisted answers earn reduced Mastery credit but do not break Invicto.</p><div class="help-grid">${options.map(x=>`<button class="help-option" data-help="${x[0]}" data-cost="${x[1]}"><strong>${x[2]} <span class="cost">💎${x[1]}</span></strong><small>${x[3]}</small></button>`).join('')}</div>`,actions:[{label:'CANCEL',className:'ghost'}]});
    $$('[data-help]',$('modalBody')).forEach(b=>b.onclick=()=>confirmHelp(b.dataset.help,Number(b.dataset.cost)));
  }
  function confirmHelp(type,cost){
    closeModal(false);openModal({title:'💎 USE GEM HELP?',html:`<p style="text-align:center;font-size:19px">This help costs <strong>${cost} Gems</strong>.<br>Assisted answers earn reduced Mastery credit.<br><br><strong>${cost} Gems will be deducted.</strong><br>Continue?</p>`,actions:[{label:'CANCEL',className:'ghost'},{label:`YES · −${cost} 💎`,className:'gold',onClick:()=>applyHelp(type,cost)}]});
  }
  function applyHelp(type,cost){
    if(!spend('gems',cost)){toast('NOT ENOUGH GEMS','bad');return;}state.helpUsed++;session.assistedThisRound=true;const factors={quick:.9,fifty:.78,strong:.75,slow:.9,spelling:.84};session.creditFactor=Math.min(session.creditFactor,factors[type]||.85);persistTheme();
    let note='';
    if(type==='quick')note=`💡 ${currentQuestion.hint}`;
    else if(type==='strong')note=`🔎 ${currentQuestion.strongHint}`;
    else if(type==='slow'){speak(currentQuestion.speak||currentQuestion.prompt,.55);note='🔊 The clue is being replayed slowly.';}
    else if(type==='spelling'){const a=currentQuestion.answer;const reveal=[...a].map((c,i)=>i===0||i===a.length-1||i===Math.floor(a.length/2)?c:'_').join(' ');note=`🔤 Pattern: ${reveal}`;}
    else if(type==='fifty'){
      const buttons=$$('[data-answer]',$('challengeArea')).filter(b=>norm(b.dataset.answer)!==norm(currentQuestion.answer)&&!b.classList.contains('eliminated'));shuffle(buttons).slice(0,2).forEach(b=>b.classList.add('eliminated'));session.help5050=true;note='50/50 used: two distractors were removed.';
    }
    $('helpNote').textContent=note;$('helpNote').classList.add('show');toast(`💎 ${cost} Gems used.`);updateHud();
  }

  function questionForTarget(t,hard=false){
    if(!t)t=TARGETS[Math.floor(Math.random()*TARGETS.length)];
    if(hard||Math.random()<.5)return q(`Choose the correctly spelled word meaning “${t.es}”.`,t.word,spellingOptions(t.word),t.word,'Compare every letter.','Use the Pre-Teach spelling rhythm.','spelling');
    if(t.group==='day')return q(`Which option means “${t.es}” and is spelled correctly?`,t.word,uniqueOptions(t.word,DAY_NAMES),t.word,'Recall the day vocabulary.','Use the English–Spanish pair from Pre-Teach.','recognition');
    if(t.group==='month')return q(`Which option means “${t.es}” and is spelled correctly?`,t.word,uniqueOptions(t.word,MONTH_NAMES),t.word,'Recall the month vocabulary.','Use the English–Spanish pair from Pre-Teach.','recognition');
    return q(`Which time word means “${t.es}”?`,t.word,uniqueOptions(t.word,TARGETS.filter(x=>x.group!=='day'&&x.group!=='month').map(x=>x.word)),t.word,'Recall the meaning from Pre-Teach.','Match the concept and spelling.','recognition');
  }
  function startPracticeMistakes(game){
    const keys=Object.entries(state.needsReview||{}).sort((a,b)=>b[1]-a[1]).map(([k])=>k);if(!keys.length){toast('No targets currently need review.','good');return;}
    createSession(game,Math.min(10,Math.max(6,keys.length*2)));session.reviewKeys=keys;currentStandardNext=()=>{const key=session.reviewKeys[session.round%session.reviewKeys.length],t=target(key)||TARGETS[0];renderMcq(questionForTarget(t,session.round%2===1));};currentStandardNext();
  }

  function buildMasterySet(){
    const set=[];const add=(qn,mode='mcq')=>{qn.mode=mode;if(!set.some(x=>x.prompt===qn.prompt))set.push(qn);};
    add(dayQuestion(2));add(monthQuestion(2));add(generateQuestion('spelling',3));add(knowledgeQuestion(true));add(extendedQuestion(3));
    add(dayQuestion(3));add(monthQuestion(3));add(generateQuestion('spelling',3));add(knowledgeQuestion(true),'listen');add(extendedQuestion(3));
    const hardTargets=shuffle(TARGETS.filter(t=>t.word.length>=6)).slice(0,3);hardTargets.forEach(t=>add(q(`Type the correctly spelled English word for “${t.es}”.`,t.word,[],t.word,'No hints are available in Mastery.','Recall the exact spelling.','spelling'),'type'));
    add(dayQuestion(3));add(monthQuestion(3));
    while(set.length<15)add(generateQuestion('mixed',3));return set.slice(0,15);
  }
  function startMastery(game){
    createSession(game,15);session.masterySet=buildMasterySet();session.hearts=15;state.masteryAttempts=(state.masteryAttempts||0)+1;persistTheme();$('helpButton').classList.add('hidden');renderMasteryRound();
  }
  function renderMasteryRound(){
    const qn=session.masterySet[session.round];newRoundQuestion(qn);
    if(qn.mode==='type'){
      prepareGameArea({kicker:'👑 INDEPENDENT MASTERY',prompt:qn.prompt,sub:'No Gem Help. Exact spelling is required.',html:`<input id="masteryTyped" class="input-answer" autocomplete="off" spellcheck="false"><div style="text-align:center;margin-top:14px"><button id="masterySubmit" class="btn gold">SUBMIT</button></div>`});$('masterySubmit').onclick=answerMasteryTyped;$('masteryTyped').addEventListener('keydown',e=>{if(e.key==='Enter')answerMasteryTyped();});$('masteryTyped').focus();
    }else{
      prepareGameArea({kicker:qn.mode==='listen'?'🔊 LISTENING MASTERY':'👑 MASTERY CHALLENGE',prompt:qn.mode==='listen'?'Listen to the clue and choose the answer.':qn.prompt,sub:'No Gem Help is available in the final challenge.',html:`${qn.mode==='listen'?'<div style="text-align:center;margin:8px"><button id="masteryReplay" class="btn small">🔊 REPLAY</button></div>':''}<div class="answer-grid">${qn.options.map(o=>`<button class="answer-btn" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}</div>`});
      if(qn.mode==='listen'){setTimeout(()=>speak(qn.speak||qn.prompt,.7),220);$('masteryReplay').onclick=()=>speak(qn.speak||qn.prompt,.7);}
      $$('.answer-btn',$('challengeArea')).forEach(b=>b.onclick=()=>answerMasteryChoice(b.dataset.answer,b));
    }updateStats();
  }
  function answerMasteryChoice(value,button){if(feedbackLocked)return;feedbackLocked=true;const ok=norm(value)===norm(currentQuestion.answer);button.classList.add(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{context:`mastery-${currentQuestion.context}`});if(!ok)session.academicMisses.push(currentQuestion.target);audio.sfx(ok?'correct':'wrong');$$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(norm(b.dataset.answer)===norm(currentQuestion.answer))b.classList.add('correct');});setTimeout(advanceMastery,700);}
  function answerMasteryTyped(){if(feedbackLocked)return;feedbackLocked=true;const value=$('masteryTyped').value,ok=norm(value)===norm(currentQuestion.answer);recordAcademic(currentQuestion.target,ok,{context:'mastery-spelling'});if(!ok)session.academicMisses.push(currentQuestion.target);$('promptSub').textContent=ok?'✅ Exact spelling confirmed.':`❌ Correct spelling: ${currentQuestion.answer}`;audio.sfx(ok?'correct':'wrong');setTimeout(advanceMastery,750);}
  function advanceMastery(){session.round++;if(session.round>=session.rounds)finishMastery();else renderMasteryRound();}
  function finishMastery(){
    const score=Math.round(session.correct/session.rounds*100);state.masteryBest=Math.max(Number(state.masteryBest)||0,score);const [icon,label]=masteryStatus(score);let reward={xp:0,gems:0,gold:0};
    if(score>=80){state.status=label;world2.themeComplete[CFG.themeIndex]=true;world2.themePending[CFG.themeIndex]=false;world2.themeIndex=Math.max(Number(world2.themeIndex)||0,CFG.themeIndex+1);world2.mastery=world2.mastery||{};world2.mastery[THEME_ID]=Math.max(Number(world2.mastery[THEME_ID])||0,score);world2.completed[CFG.themeIndex]=[...new Set(state.completedGames)];reward=score===100?{xp:1000,gems:100,gold:300}:score>=90?{xp:750,gems:65,gold:220}:{xp:550,gems:40,gold:160};addEconomy(reward);registerWeekly();if(score===100&&!state.badges.includes('Elite Scholar · Theme 07'))state.badges.push('Elite Scholar · Theme 07');}
    else{state.status='NEEDS REVIEW';session.academicMisses.forEach(w=>addNeed(w,1));}
    persistTheme();persistWorld2();updateHud();showMasteryResult(score,reward,icon,label);
  }
  function showMasteryResult(score,reward,icon,label){
    if(score===100){showPerfectMastery();return;}
    const passed=score>=80,needs=[...new Set(session.academicMisses.map(w=>target(w)?.word||w))];
    openModal({title:`${icon} ${label}`,html:`<div style="text-align:center;font-size:76px">${icon}</div><p style="text-align:center;font-size:23px">Mastery Score: <strong>${score}%</strong></p>${passed?`<p style="text-align:center">Theme 07 is academically unlocked.<br>Reward: ⭐${reward.xp} · 💎${reward.gems} · 🪙${reward.gold}</p>`:`<p style="text-align:center">80% is required. You do not need to repeat the full Theme.</p>`}${needs.length?`<p style="text-align:center">Targets to refine:</p><div class="needs-list">${needs.map(w=>`<span class="needs-chip">${escapeHtml(w)}</span>`).join('')}</div>`:''}`,actions:passed?[{label:'VIEW ACADEMIC RECORD',className:'gold',onClick:showAcademicRecord},{label:'RETURN TO WORLD 2',onClick:returnWorld2}]:[{label:'PRACTICE MY MISTAKES',className:'gold',onClick:()=>startGame('practice-mistakes')},{label:'RETURN TO THEME',onClick:()=>{showScreen('homeScreen');updateHud();}}],closable:false});
  }
  function showPerfectMastery(){confetti(180);audio.sfx('unlock');showScreen('completeScreen');$('completeIcon').textContent='👑';$('completeTitle').textContent='PERFECT MASTERY';$('completeMessage').innerHTML='Flawless! You achieved <strong>100% Mastery</strong>.<br>You have earned <strong>Elite Scholar</strong> status for Theme 07.';$('completeReward').textContent='⭐ +1,000 · 💎 +100 · 🪙 +300 · Elite Scholar Badge';renderAcademicRecord();}

  function renderAcademicRecord(){
    const [icon,label]=masteryStatus(state.masteryBest),needs=Object.entries(state.needsReview||{}).sort((a,b)=>b[1]-a[1]).map(([k])=>target(k)?.word||k);const inv=meta().invicto;
    $('recordContent').innerHTML=`<div class="record-grid"><div><small>MASTERY</small><strong>${Math.round(state.masteryBest||0)}%</strong></div><div><small>STATUS</small><strong>${icon} ${label}</strong></div><div><small>ATTEMPTS</small><strong>${state.masteryAttempts||0}</strong></div><div><small>GEM HELP</small><strong>${state.helpUsed||0}</strong></div><div><small>EXPERIENCES</small><strong>${GAME_DEFS.slice(0,18).filter(g=>state.completedGames.includes(g.id)).length}/18</strong></div><div><small>BEST INVICTO</small><strong>${Number(inv.best)||0}</strong></div><div><small>BADGES</small><strong>${state.badges.length}</strong></div><div><small>NEEDS REVIEW</small><strong>${needs.length}</strong></div></div>${needs.length?`<p>Words and patterns to keep refining:</p><div class="needs-list">${needs.map(w=>`<span class="needs-chip">${escapeHtml(w)}</span>`).join('')}</div>`:'<p>There are no active Needs Review targets.</p>'}`;
  }
  function showAcademicRecord(){renderAcademicRecord();openModal({title:'📊 ACADEMIC RECORD · THEME 07',html:$('recordContent').innerHTML,actions:[{label:'RETURN TO THEME',className:'gold',onClick:()=>{showScreen('homeScreen');updateHud();}},{label:'RETURN TO WORLD 2',onClick:returnWorld2}]});}
  function returnWorld2(){if(CFG.world2Url==='#'){showScreen('homeScreen');updateHud();return;}location.href=CFG.world2Url+(PREVIEW?(CFG.world2Url.includes('?')?'&':'?')+'preview=teacher':'');}

  function renderTeacherLab(){
    const lab=$('teacherLab');if(!PREVIEW){$('teacherButton').classList.add('hidden');lab.classList.add('hidden');return;}
    $('teacherButton').classList.remove('hidden');lab.classList.remove('hidden');const gameButtons=GAME_DEFS.map(g=>`<button class="btn small" data-lab-game="${g.id}">${g.icon} ${g.title}</button>`).join('');
    $('teacherLabBody').innerHTML=`<div class="lab-section"><h3>Direct Screens</h3><div class="lab-grid"><button class="btn small" data-lab-pre="language">📚 New Language</button><button class="btn small" data-lab-pre="recall">⚡ Quick Recall</button><button class="btn small" data-lab-pre="knowledge">🧠 Knowledge Boost</button><button class="btn small" data-lab-action="record">📊 Academic Record</button><button class="btn small" data-lab-action="perfect">👑 Perfect Mastery</button><button class="btn small" data-lab-action="home">🏠 Theme Home</button></div></div><div class="lab-section"><h3>Every Game</h3><div class="lab-grid">${gameButtons}</div></div><div class="lab-section"><h3>Difficulty</h3><div class="lab-grid">${TIER_NAMES.map((t,i)=>`<button class="btn small" data-lab-tier="${i}">${i} · ${t}</button>`).join('')}</div></div><div class="lab-section"><h3>Economy & States</h3><div class="lab-grid"><button class="btn small" data-lab-action="economy">+1000 💎 / 🪙</button><button class="btn small" data-lab-action="errors">Create Needs Review</button><button class="btn small" data-lab-action="unlock">Unlock Core Games</button><button class="btn small" data-lab-action="reset">Reset Preview</button></div></div><div class="lab-section"><h3>Companion Preview</h3><div class="lab-grid">${PETS.map(p=>`<button class="btn small" data-lab-pet="${p.id}">${p.icon} ${p.name}</button>`).join('')}</div></div><p style="color:#ffefa3;font-size:11px">Teacher Preview is isolated. No learner progress or rewards are saved.</p>`;
    $$('[data-lab-game]',lab).forEach(b=>b.onclick=()=>{lab.classList.remove('open');startGame(b.dataset.labGame);});$$('[data-lab-pre]',lab).forEach(b=>b.onclick=()=>{lab.classList.remove('open');startPreteach(b.dataset.labPre);});$$('[data-lab-tier]',lab).forEach(b=>b.onclick=()=>setTier(Number(b.dataset.labTier)));$$('[data-lab-pet]',lab).forEach(b=>b.onclick=()=>{state.companions.selected=b.dataset.labPet;renderCompanions();toast(`${b.textContent.trim()} selected.`,'good');});$$('[data-lab-action]',lab).forEach(b=>b.onclick=()=>teacherAction(b.dataset.labAction));
  }
  function teacherAction(id){
    if(id==='record'){showAcademicRecord();return;}if(id==='perfect'){state.masteryBest=100;state.status='PERFECT MASTERY';if(!state.badges.includes('Elite Scholar · Theme 07'))state.badges.push('Elite Scholar · Theme 07');showPerfectMastery();return;}if(id==='home'){showScreen('homeScreen');updateHud();return;}if(id==='economy'){state.localEconomy.gems+=1000;state.localEconomy.gold+=1000;state.localEconomy.xp+=1000;updateHud();toast('Preview economy replenished.','good');return;}if(id==='errors'){state.needsReview={wednesday:3,february:2,millennium:2};renderHomeStatus();toast('Needs Review state created.');return;}if(id==='unlock'){state.preteach={language:true,recall:true,knowledge:true,index:0,factIndex:0};state.completedGames=GAME_DEFS.slice(0,18).map(g=>g.id);renderHomeStatus();toast('All core experiences unlocked.','good');return;}if(id==='reset'){state=defaultThemeState();state.preteach={language:true,recall:true,knowledge:true,index:0,factIndex:0};state.companions={unlocked:PETS.map(p=>p.id),selected:'dog',rewardSeen:true};state.localEconomy={xp:99999,gems:9999,gold:9999};renderHomeStatus();updateHud();toast('Preview reset.');}
  }

  function confirmExitGame(){openModal({title:'Leave this experience?',html:'<p>Your current round will be discarded, but previously saved Theme progress remains safe.</p>',actions:[{label:'KEEP PLAYING',className:'ghost'},{label:'LEAVE',className:'red',onClick:()=>{showScreen('homeScreen');updateHud();}}]});}
  function initEvents(){
    $('modalClose').onclick=()=>closeModal();$('modalLayer').addEventListener('pointerdown',e=>{if(e.target===$('modalLayer')&&$('modalClose').style.display!=='none')closeModal();});
    $('preteachLanguage').onclick=()=>startPreteach('language');$('preteachRecall').onclick=()=>startPreteach('recall');$('preteachKnowledge').onclick=()=>startPreteach('knowledge');$('reviewVocabulary').onclick=()=>startPreteach('language');
    $$('.tab').forEach(t=>t.onclick=()=>startPreteach(t.dataset.mode));$('preteachPrev').onclick=()=>advancePreteach(-1);$('preteachNext').onclick=()=>advancePreteach(1);$('preteachExit').onclick=()=>{showScreen('homeScreen');updateHud();};
    $('helpButton').onclick=openGemHelp;$('exitGame').onclick=confirmExitGame;$('backWorld2').onclick=returnWorld2;$('gateBack').onclick=returnWorld2;$('completeReturn').onclick=returnWorld2;$('completeRecord').onclick=showAcademicRecord;$('recordButton').onclick=showAcademicRecord;
    $('fullButton').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>toast('Fullscreen was blocked.','bad'));
    $('musicButton').onclick=()=>{audio.muted=!audio.muted;$('musicButton').textContent=audio.muted?'🔇':'♫';toast(audio.muted?'Sound muted':'Sound enabled');};
    $('teacherButton').onclick=()=>$('teacherLab').classList.toggle('open');$('teacherClose').onclick=()=>$('teacherLab').classList.remove('open');
    document.addEventListener('pointerdown',()=>audio.ensure(),{once:true});document.addEventListener('visibilitychange',()=>{if(document.hidden&&currentGame)toast('Game paused by browser visibility.');});
  }

  function init(){
    document.documentElement.dataset.lexiconiaBuild=CFG.build;initEvents();renderTeacherLab();updateHud();renderAcademicRecord();
    if(PREVIEW)$('previewRibbon')?.classList.remove('hidden');
    if(!priorThemeComplete()){$('app').classList.add('hidden');showScreen('gateScreen');return;}
    $('gateScreen').classList.remove('active');$('app').classList.remove('hidden');showScreen('homeScreen');unlockArrivalCompanion();updateHud();if(OPEN_LAB)setTimeout(()=>$('teacherLab').classList.add('open'),150);
  }

  // Correct the pre-teach Quick Recall completion path without duplicating the regular reward system.
  const baseAnswerMcq=answerMcq;
  answerMcq=function(value,button){
    if(feedbackLocked)return;feedbackLocked=true;const ok=norm(value)===norm(currentQuestion.answer);button.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);updateStats();$$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(norm(b.dataset.answer)===norm(currentQuestion.answer))b.classList.add('correct');});$('promptSub').textContent=ok?`✅ ${currentQuestion.explanation||'Correct!'}`:`❌ ${currentQuestion.explanation||`Correct answer: ${currentQuestion.answer}.`}`;setTimeout(()=>{session.round++;if(session.round>=session.rounds){if(session._preteach)finishPreteachRecall();else finishRegularGame();}else currentStandardNext?.();},850);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.LexiconiaTheme07={startGame,startPreteach,showAcademicRecord,setTier,state:()=>serialise(state),build:CFG.build,qa:{targets:TARGETS.map(t=>serialise(t)),games:GAME_DEFS.map(g=>serialise(g)),sampleQuestions:(n=100)=>Array.from({length:n},(_,i)=>serialise(generateQuestion(i%5===0?'spelling':i%5===1?'day':i%5===2?'month':i%5===3?'knowledge':'extended',i%4)))}};
})();
