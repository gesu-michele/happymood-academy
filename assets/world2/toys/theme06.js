(() => {
  'use strict';

  const CFG = Object.assign({
    forceTeacher: false,
    assetRoot: '../../assets/world2/toys/words/',
    audioRoot: '../../assets/world2/toys/audio/',
    world2Url: '../../world2.html',
    themeIndex: 5,
    previousThemeIndex: 4,
    build: 'theme06-patch-v1.1.0'
  }, window.LEXICONIA_THEME06_CONFIG || {});

  const qs = new URLSearchParams(location.search);
  const PREVIEW = Boolean(CFG.forceTeacher || qs.get('preview') === 'teacher' || qs.get('teacherPreview') === '1');
  const OPEN_LAB = PREVIEW && (CFG.forceTeacher || qs.get('lab') === '1');
  const THEME_ID = 'toys';
  const THEME_KEY = 'lexiconia.theme06.toys.v1';
  const W2_KEY = 'lexiconia.world2.waterWorld.v1';
  const W1_KEY = 'lexiconia.world1.fiveThemes.v1';
  const ACTIVE_KEY = 'lexiconia.active.profile.v1';
  const PROFILE_KEY = 'lexiconia.sprint1.profiles.v1';
  const TOY_WORDS = ['Doll','Teddy bear','Toy car','Toy train','Toy plane','Toy boat','Ball','Kite','Yo-yo','Spinning top','Jump rope','Hula hoop','Building blocks','Puzzle','Slime','Playing cards','Marbles','Toy robot','Action figure','Puppet','Rocking horse','Scooter','Toy dinosaur','Remote-control car','Dollhouse','Toy soldiers','Water gun','Rubber duck','Frisbee','Drone'];
  const TIER_NAMES = ['FOUNDATION','EXPLORER','CHALLENGER','MASTER'];

  const TARGETS = [
    ['Doll','muñeca','01-doll.png','01_doll.png','/dɒl/','doll','pretend','A human-shaped toy used in pretend play.','pretend play'],
    ['Teddy bear','oso de peluche','02-teddy-bear.png','02_teddy_bear.png','/ˈtedi beə/','ted·dy bear','soft','A soft toy shaped like a bear.','comfort'],
    ['Toy car','carro / coche de juguete','03-toy-car.png','03_toy_car.png','/ˈtɔɪ kɑː/','toy car','vehicle','A small wheeled vehicle pushed by hand.','rolling'],
    ['Toy train','tren de juguete','04-toy-train.png','04_toy_train.png','/ˈtɔɪ treɪn/','toy train','vehicle','A toy vehicle that may run on tracks.','tracks'],
    ['Toy plane','avión de juguete','05-toy-plane.png','05_toy_plane.png','/ˈtɔɪ pleɪn/','toy plane','vehicle','A model aircraft usually moved by hand.','air'],
    ['Toy boat','barco de juguete','06-toy-boat.png','06_toy_boat.png','/ˈtɔɪ bəʊt/','toy boat','vehicle','A small boat used for pretend or water play.','water'],
    ['Ball','pelota','07-ball.png','07_ball.png','/bɔːl/','ball','outdoor','A round object that can be thrown, caught, kicked or bounced.','movement'],
    ['Kite','cometa','08-kite.png','08_kite.png','/kaɪt/','kite','outdoor','A light toy flown in the wind on a string.','wind'],
    ['Yo-yo','yoyó','09-yo-yo.png','09_yo_yo.png','/ˈjəʊ jəʊ/','yo-yo','skill','A toy that travels down and up a string.','string'],
    ['Spinning top','trompo','10-spinning-top.png','10_spinning_top.png','/ˈspɪnɪŋ tɒp/','spin·ning top','skill','A toy that balances while rotating on a point.','spin'],
    ['Jump rope','cuerda para saltar','11-jump-rope.png','11_jump_rope.png','/ˈdʒʌmp rəʊp/','jump rope','outdoor','A rope swung around the body while the player jumps.','jump'],
    ['Hula hoop','aro / hula hoop','12-hula-hoop.png','12_hula_hoop.png','/ˈhuːlə huːp/','hu·la hoop','outdoor','A large ring rotated around the body.','rotation'],
    ['Building blocks','bloques de construcción','13-building-blocks.png','13_building_blocks.png','/ˈbɪldɪŋ blɒks/','build·ing blocks','construction','Small pieces joined or stacked to create structures.','build'],
    ['Puzzle','rompecabezas','14-puzzle.png','14_puzzle.png','/ˈpʌzəl/','puz·zle','thinking','Many pieces fitted together to complete a picture.','pieces'],
    ['Slime','slime / masa viscosa','15-slime.png','15_slime.png','/slaɪm/','slime','sensory','A soft, stretchy and mouldable play material.','texture'],
    ['Playing cards','cartas / naipes','16-playing-cards.png','16_playing_cards.png','/ˈpleɪɪŋ kɑːdz/','play·ing cards','tabletop','A set of cards used for many different games.','game'],
    ['Marbles','canicas','17-marbles.png','17_marbles.png','/ˈmɑːbəlz/','mar·bles','skill','Small hard balls rolled in traditional games.','roll'],
    ['Toy robot','robot de juguete','18-toy-robot.png','18_toy_robot.png','/ˈtɔɪ rəʊbɒt/','toy ro·bot','figure','A toy designed to look or move like a robot.','machine'],
    ['Action figure','figura de acción','19-action-figure.png','19_action_figure.png','/ˈækʃən ˌfɪɡə/','ac·tion fig·ure','figure','A movable character figure used in imaginary adventures.','character'],
    ['Puppet','títere','20-puppet.png','20_puppet.png','/ˈpʌpɪt/','pup·pet','performance','A character controlled by a hand or strings.','performance'],
    ['Rocking horse','caballo balancín','21-rocking-horse.png','21_rocking_horse.png','/ˈrɒkɪŋ hɔːs/','rock·ing horse','ride-on','A horse-shaped toy that moves backwards and forwards.','rock'],
    ['Scooter','patinete / scooter','22-scooter.png','22_scooter.png','/ˈskuːtə/','scoot·er','ride-on','A wheeled ride-on toy pushed with one foot.','ride'],
    ['Toy dinosaur','dinosaurio de juguete','23-toy-dinosaur.png','23_toy_dinosaur.png','/ˈtɔɪ ˈdaɪnəsɔː/','toy di·no·saur','figure','A dinosaur model used for pretend play.','prehistoric'],
    ['Remote-control car','carro / coche a control remoto','24-remote-control-car.png','24_remote_control_car.png','/rɪˌməʊt kənˈtrəʊl kɑː/','re·mote-con·trol car','remote','A car moved from a distance using a controller.','remote'],
    ['Dollhouse','casa de muñecas','25-dollhouse.png','25_dollhouse.png','/ˈdɒlhaʊs/','doll·house','pretend','A miniature house designed for dolls.','miniature'],
    ['Toy soldiers','soldados de juguete','26-toy-soldiers.png','26_toy_soldiers.png','/ˈtɔɪ ˌsəʊldʒəz/','toy sol·diers','figure','Small soldier figures used to create imaginary scenes.','figures'],
    ['Water gun','pistola de agua','27-water-gun.png','27_water_gun.png','/ˈwɔːtə ɡʌn/','wa·ter gun','water','A toy that sprays water.','spray'],
    ['Rubber duck','pato de goma','28-rubber-duck.png','28_rubber_duck.png','/ˈrʌbə dʌk/','rub·ber duck','water','A floating duck-shaped bath toy.','float'],
    ['Frisbee','disco volador','29-frisbee.png','29_frisbee.png','/ˈfrɪzbiː/','fris·bee','outdoor','A flying disc thrown from one person to another.','throw'],
    ['Drone','dron','30-drone.png','30_drone.png','/drəʊn/','drone','remote','A small flying device controlled from a distance.','rotors']
  ].map((x,i)=>({id:i+1,word:x[0],es:x[1],file:x[2],legacyFile:x[3],ipa:x[4],syllables:x[5],group:x[6],clue:x[7],trait:x[8],audio:x[2].replace(/\.png$/i,'.mp3')}));

  const TARGET_BY_WORD = Object.fromEntries(TARGETS.map(t=>[t.word.toLowerCase(),t]));
  const CATEGORY_LABELS={pretend:'Pretend play',soft:'Soft toys',vehicle:'Toy vehicles',outdoor:'Outdoor & movement',skill:'Skill toys',construction:'Construction',thinking:'Thinking toys',sensory:'Sensory play',tabletop:'Tabletop games',figure:'Figures & characters',performance:'Performance','ride-on':'Ride-on toys',remote:'Remote-controlled',water:'Water play'};

  const KNOWLEDGE = [
    {fact:'A kite flies because moving air pushes against its surface. It has no engine.',es:'Una cometa vuela porque el aire en movimiento empuja su superficie. No tiene motor.',answer:'Kite',icon:'🪁'},
    {fact:'A remote-control car is controlled from a distance with a transmitter.',es:'Un carro a control remoto se controla a distancia con un transmisor.',answer:'Remote-control car',icon:'🎮'},
    {fact:'A puzzle is completed by fitting many pieces into the correct positions.',es:'Un rompecabezas se completa colocando muchas piezas en las posiciones correctas.',answer:'Puzzle',icon:'🧩'},
    {fact:'Building blocks are stacked or joined to create new structures.',es:'Los bloques de construcción se apilan o unen para crear estructuras.',answer:'Building blocks',icon:'🧱'},
    {fact:'A puppet can be controlled by a hand, rods or strings.',es:'Un títere puede controlarse con una mano, varillas o cuerdas.',answer:'Puppet',icon:'🎭'},
    {fact:'A yo-yo moves down and returns along its string.',es:'Un yoyó baja y regresa por su cuerda.',answer:'Yo-yo',icon:'🪀'},
    {fact:'A spinning top rotates while balancing on a small point.',es:'Un trompo gira mientras se equilibra sobre una punta.',answer:'Spinning top',icon:'🌀'},
    {fact:'A rubber duck is designed to float during water or bath play.',es:'Un pato de goma está diseñado para flotar durante el juego con agua.',answer:'Rubber duck',icon:'🦆'},
    {fact:'A frisbee is a flying disc. “Flying disc” is the generic term.',es:'Un frisbee es un disco volador. “Flying disc” es el término genérico.',answer:'Frisbee',icon:'🥏'},
    {fact:'In British English, “skipping rope” is common; “jump rope” is common in American English. Lexiconia accepts both.',es:'En inglés británico es común “skipping rope”; en inglés americano, “jump rope”. Lexiconia acepta ambos.',answer:'Jump rope',icon:'🇬🇧🇺🇸'},
    {fact:'In British English, “doll’s house” is common; “dollhouse” is common in American English. Lexiconia accepts both.',es:'En inglés británico es común “doll’s house”; en inglés americano, “dollhouse”. Lexiconia acepta ambos.',answer:'Dollhouse',icon:'🏠'},
    {fact:'A drone flies with rotors and is usually controlled remotely.',es:'Un dron vuela con rotores y normalmente se controla a distancia.',answer:'Drone',icon:'🚁'},
    {fact:'Marbles are traditionally made from glass and are rolled in games.',es:'Las canicas tradicionalmente son de vidrio y se hacen rodar en juegos.',answer:'Marbles',icon:'🔵'},
    {fact:'A rocking horse moves backwards and forwards but does not travel across the floor.',es:'Un caballo balancín se mueve hacia atrás y adelante, pero no avanza por el suelo.',answer:'Rocking horse',icon:'🐴'},
    {fact:'Toys can support imagination, coordination, problem-solving and social play.',es:'Los juguetes pueden favorecer la imaginación, coordinación, resolución de problemas y juego social.',answer:'Toys',icon:'🧠'}
  ];

  const SPELLING_WRONG = {
    doll:['Dol','Dool','Dollh'], 'teddy bear':['Tedy bear','Teddy bare','Teddi bear'], 'toy car':['Toy carr','Toi car','Toy kar'],
    'toy train':['Toy trane','Toy trein','Toi train'],'toy plane':['Toy plain','Toy plaine','Toi plane'],'toy boat':['Toy bote','Toy boatt','Toi boat'],
    ball:['Bal','Boll','Baall'],kite:['Kight','Kyte','Kitee'],'yo-yo':['Yo yoa','Yoyo-o','Yo-yoo'],'spinning top':['Spining top','Spinning topp','Spinining top'],
    'jump rope':['Jamp rope','Jump roap','Jummp rope'],'hula hoop':['Hoola hoop','Hula hop','Hulla hoop'],'building blocks':['Bulding blocks','Building bloks','Buildding blocks'],
    puzzle:['Puzle','Puzzel','Puzlle'],slime:['Slyme','Slimee','Sliime'],'playing cards':['Playng cards','Playing cardes','Plaing cards'],marbles:['Marbels','Marbless','Marblese'],
    'toy robot':['Toy robbot','Toy rowbot','Toi robot'],'action figure':['Action figgure','Acton figure','Action figur'],'puppet':['Pupet','Puppit','Puppett'],
    'rocking horse':['Roking horse','Rocking hors','Rockking horse'],scooter:['Scoter','Scootar','Scootter'],'toy dinosaur':['Toy dinosor','Toy dinosuar','Toi dinosaur'],
    'remote-control car':['Remot-control car','Remote-controll car','Remote-control carr'],dollhouse:['Dolhouse','Dollhous','Dollhousse'],'toy soldiers':['Toy solders','Toy soldiars','Toi soldiers'],
    'water gun':['Watter gun','Water gunn','Woter gun'],'rubber duck':['Ruber duck','Rubber duk','Rubber ducck'],frisbee:['Frizbee','Frisbi','Frissbee'],drone:['Dron','Droan','Dronne']
  };

  const GAME_DEFS = [
    ['quick-recall','⚡','Quick Recall','Rapid recognition across all 30 toys.',['RECOGNITION','ADAPTIVE']],
    ['picture-match','🖼️','Picture Match','Identify a toy from its full uncropped image.',['VISUAL','VOCABULARY']],
    ['listen-choose','🔊','Listen & Choose','Use British pronunciation and spoken clues.',['LISTENING','BRITISH']],
    ['toy-categories','🧺','Toy Categories','Classify toys by type, use and movement.',['CLASSIFICATION','THINKING']],
    ['what-am-i','❓','What Am I?','Infer a toy from an indirect description.',['RIDDLES','INFERENCE']],
    ['missing-letters','🔤','Missing Letters','Recover several missing letters.',['SPELLING','TYPE']],
    ['correct-spelling','✅','Spelling Detector','Identify exact spelling among plausible errors.',['SPELLING','CHOICE']],
    ['build-word','🧩','Build the Word','Construct challenging toy names from shuffled letters.',['SPELLING','BUILD']],
    ['toy-properties','🔎','Toy Properties','Reason from materials, motion and function.',['PROPERTIES','LOGIC']],
    ['odd-one-out','🧠','Odd One Out','Find the item that does not belong and explain mentally why.',['CLASSIFICATION','ELIMINATION']],
    ['toy-riddles','💭','Toy Riddles','Solve layered clues rather than direct naming.',['REASONING','CLUES']],
    ['memory-challenge','🃏','Memory Challenge','Match 15 images with 15 English words.',['30 CARDS','MEMORY']],
    ['bubble-rescue','🫧','Bubble Rescue','Pop the correct toy before it escapes.',['ACTION','SPELLING']],
    ['submarine-sonar','🚢','Submarine Sonar','Locate the correct toy signal underwater.',['ACTION','LISTENING']],
    ['current-chase','🐠','Current Chase','Intercept the correct moving target.',['ACTION','TIMING']],
    ['toy-mine','⛏️','Toy Mine','Classic auto-swinging claw, rocks, timing and dynamite.',['GOLD MINER','REASONING']],
    ['toy-rush','⏱️','Toy Rush','Solve increasingly difficult clues against the clock.',['SPEED','ADAPTIVE']],
    ['kraken-battle','🐙','Kraken Battle','Defeat the boss through spelling and reasoning.',['BOSS','HEARTS']],
    ['practice-mistakes','🛠️','Practice My Mistakes','Target the language flagged by the Academic Record.',['NEEDS REVIEW','PERSONALISED']],
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
  function playTargetAudio(t,rate=.78){
    if(!t){return;}const root=CFG.audioRoot||'';if(!root){speak(t.word,rate);return;}const a=new Audio(root+t.audio);let settled=false;
    const fallback=()=>{if(settled)return;settled=true;speak(t.word,rate);};a.addEventListener('canplaythrough',()=>{if(settled)return;settled=true;a.play().catch(fallback);},{once:true});a.addEventListener('error',fallback,{once:true});setTimeout(fallback,700);a.load();
  }
  function acceptedAnswer(value,answer){
    const v=norm(value),a=norm(answer);if(v===a)return true;
    const aliases={'jump rope':['skipping rope'],'dollhouse':["doll's house",'dolls house'],'frisbee':['flying disc'],'remote-control car':['remote control car']};
    return (aliases[a]||[]).some(x=>norm(x)===v);
  }

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
    companions:{unlocked:[],selected:null,rewardSeen:false}, badges:[], lastPlayed:Date.now(),
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
    $('heroName').textContent=profile?.name||'Hero';$('heroRank').textContent=`Toy Explorer · ${TIER_NAMES[tier()]}`;
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
  function syncCompanions(){if(PREVIEW)return;state.companions=state.companions||{unlocked:[],selected:'dog',rewardSeen:false};const completed=world2.themeComplete.filter(Boolean).length;PETS.filter(p=>completed>=p.milestone).forEach(p=>{if(!state.companions.unlocked.includes(p.id))state.companions.unlocked.push(p.id);});if(!state.companions.unlocked.includes(state.companions.selected))state.companions.selected=state.companions.unlocked[0]||null;persistTheme();}
  function renderCompanions(){
    syncCompanions();
    const box=$('companionRow');if(!box)return;box.innerHTML='';const unlocked=state.companions?.unlocked||[];
    PETS.forEach(p=>{const open=PREVIEW||unlocked.includes(p.id),sel=state.companions?.selected===p.id;const d=document.createElement('div');d.className=`pet-chip ${open?'':'locked'} ${sel?'selected':''}`;d.title=open?`${p.name}${sel?' · selected':''}`:`Locked · future milestone`;d.innerHTML=`<span>${open?p.icon:'◼️'}</span>${open?'':'<span class="lock">🔒</span>'}<button aria-label="${open?'Select '+p.name:'Locked companion'}"></button>`;d.querySelector('button').onclick=()=>{if(!open){toast(`🔒 ${p.name} unlocks at a future milestone.`);return;}state.companions.selected=p.id;persistTheme();renderCompanions();toast(`${p.icon} ${p.name} selected.`,'good');};box.appendChild(d);});
  }

  function unlockArrivalCompanion(){/* Theme 06 shows silhouettes; the first companion unlocks after this Theme is mastered. */}


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
      $('speakWord').onclick=()=>playTargetAudio(t);
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
    if(next<0)return;if(next>=max){if(preteachMode==='language'){state.preteach.language=true;state.preteach.index=0;}else{state.preteach.knowledge=true;state.preteach.factIndex=0;}persistTheme();toast('Preparation stage complete!','good');showScreen('homeScreen');updateHud();return;}preteachIndex=next;if(preteachMode==='language')state.preteach.index=preteachIndex;else state.preteach.factIndex=preteachIndex;persistTheme();renderPreteach();if(delta>0)setTimeout(()=>{if(preteachMode==='language')playTargetAudio(TARGETS[preteachIndex]);},180);
  }

  function createSession(game,rounds=8){
    session={gameId:game.id,title:game.title,round:0,rounds,correct:0,wrong:0,attempts:0,credit:0,maxCredit:0,streak:0,bestStreak:0,assistedThisRound:false,creditFactor:1,help5050:false,started:Date.now(),questionHistory:[],timer:null,hearts:10,score:0,academicMisses:[],gameplayMisses:0};
    currentGame=game;feedbackLocked=false;showScreen('gameScreen');$('gameTitle').textContent=`${game.icon} ${game.title}`;$('gameSubtitle').textContent=`Theme 06 · ${TIER_NAMES[tier()]}`;$('helpButton').classList.toggle('hidden',game.id==='mastery-challenge');$('helpNote').classList.remove('show');$('helpNote').textContent='';$('gameHow').textContent=game.desc;updateStats();
  }
  function updateStats(){
    if(!session)return;$('correctStat').textContent=session.correct;$('wrongStat').textContent=session.wrong;$('sessionStreak').textContent=session.streak;$('scoreStat').textContent=Math.round(session.score||session.credit*100);$('roundCounter').textContent=`${Math.min(session.round+1,session.rounds)} / ${session.rounds}`;$('roundProgress').style.width=(session.round/session.rounds*100)+'%';if($('roundProgressMirror'))$('roundProgressMirror').style.width=(session.round/session.rounds*100)+'%';
    const hearts=$('heartsStat');hearts.textContent='❤️'.repeat(Math.max(0,session.hearts||0))||'—';
  }

  function uniqueOptions(answer,candidates,count=4){
    const seen=new Set([norm(answer)]),out=[answer];for(const c of shuffle(candidates)){if(!c||seen.has(norm(c)))continue;seen.add(norm(c));out.push(c);if(out.length>=count)break;}
    for(const c of shuffle(TOY_WORDS)){if(!seen.has(norm(c))){seen.add(norm(c));out.push(c);}if(out.length>=count)break;}return shuffle(out.slice(0,count));
  }
  function spellingOptions(answer){const wrong=SPELLING_WRONG[norm(answer)]||[answer+'e',answer.slice(0,-1),answer[0]+answer];return uniqueOptions(answer,wrong,4);}
  function q(prompt,answer,options,targetWord,hint,strongHint,context='recognition',extra={}){return Object.assign({prompt,answer,options,target:targetWord,hint,strongHint,context,explanation:`Correct answer: ${answer}.`,speak:prompt},extra);}
  function categoryMembers(group){return TARGETS.filter(t=>t.group===group).map(t=>t.word);}
  function translationQuestion(t=tier()){
    const item=TARGETS[Math.floor(Math.random()*TARGETS.length)];
    if(t===0)return q(`Which English toy means “${item.es}”?`,item.word,uniqueOptions(item.word,TOY_WORDS),item.word,'Recall the English–Spanish pair from Pre-Teach.',`The word begins with “${item.word.slice(0,1)}”.`,'recognition');
    return q(`Which correctly spelled toy name matches “${item.es}”?`,item.word,spellingOptions(item.word),item.word,'Identify the meaning first, then check every letter.',`Use the spelling rhythm: ${item.syllables}.`,'spelling');
  }
  function categoryQuestion(t=tier()){
    const pools={vehicle:['Toy car','Toy train','Toy plane','Toy boat'],outdoor:['Ball','Kite','Jump rope','Hula hoop','Frisbee'],skill:['Yo-yo','Spinning top','Marbles'],figure:['Toy robot','Action figure','Toy dinosaur','Toy soldiers'],water:['Toy boat','Water gun','Rubber duck'],remote:['Remote-control car','Drone'],thinking:['Puzzle','Building blocks','Playing cards']};
    const keys=Object.keys(pools),group=keys[Math.floor(Math.random()*keys.length)],members=pools[group],ans=members[Math.floor(Math.random()*members.length)],label={vehicle:'toy vehicle',outdoor:'outdoor or movement toy',skill:'skill toy',figure:'figure or character toy',water:'water-play toy',remote:'remotely controlled toy',thinking:'thinking or construction toy'}[group];
    const distractors=TOY_WORDS.filter(w=>!members.includes(w));
    if(t<2)return q(`Which option is a ${label}?`,ans,uniqueOptions(ans,distractors),ans,`Think about the category “${label}”.`,`The answer belongs to the same group as ${members.filter(x=>x!==ans).slice(0,2).join(' and ')}.`,'classification');
    return q(`Choose the toy that belongs to the ${label} category while the other options do not.`,ans,uniqueOptions(ans,distractors),ans,'Classify every option before choosing.',`The target’s key feature is: ${target(ans).trait}.`,'classification');
  }
  const PROPERTY_BANK=[
    ['Which toy can stay in the air without having an engine?','Kite'],
    ['Which toy is usually completed by fitting many pieces into one picture?','Puzzle'],
    ['Which toy can move because a person controls it from a distance on the ground?','Remote-control car'],
    ['Which toy is designed to rock backwards and forwards without travelling across the floor?','Rocking horse'],
    ['Which toy contains pieces that can be stacked to create structures?','Building blocks'],
    ['Which toy moves down and returns along a string?','Yo-yo'],
    ['Which toy balances while rotating on a small point?','Spinning top'],
    ['Which toy is controlled by a hand or strings to perform a character?','Puppet'],
    ['Which toy is soft, stretchy and mouldable rather than rigid?','Slime'],
    ['Which toy is a miniature home designed for dolls?','Dollhouse'],
    ['Which toy sprays water rather than floating on it?','Water gun'],
    ['Which toy is designed to float and looks like a bird?','Rubber duck'],
    ['Which toy is thrown through the air as a flat disc?','Frisbee'],
    ['Which toy flies with rotors and can be controlled remotely?','Drone'],
    ['Which ride-on toy is pushed with one foot and has a handlebar?','Scooter'],
    ['Which toy uses a long rope that passes under the player’s feet?','Jump rope'],
    ['Which toy is a large ring rotated around the body?','Hula hoop'],
    ['Which toy is a set of small glass balls used in rolling games?','Marbles'],
    ['Which toy is a set used for games with suits and numbers?','Playing cards'],
    ['Which toy is a small model of a prehistoric animal?','Toy dinosaur']
  ];
  const MASTER_BANK=[
    ['A toy moves through the air, but unlike a drone it has no rotors and unlike a toy plane it is held by a string. What is it?','Kite'],
    ['Choose the toy that can travel on the ground without being pushed directly by the player.','Remote-control car'],
    ['Which toy combines a circular shape, body movement and continuous rotation?','Hula hoop'],
    ['Which toy can be part of a performance, but is not an action figure because the player controls it with a hand or strings?','Puppet'],
    ['Which toy is a vehicle, works in water and may also be used in a bath, but is not shaped like an animal?','Toy boat'],
    ['Which toy requires arranging pieces by position rather than stacking pieces upward?','Puzzle'],
    ['Which toy can fly remotely and is neither a model plane moved by hand nor a kite held by a string?','Drone'],
    ['Which toy moves in place from side to side and supports a rider, but has no wheels?','Rocking horse'],
    ['Which toy is plural, often glass, and used by rolling rather than throwing through the air?','Marbles'],
    ['Which toy is a character figure associated with movement and imaginary adventures, but is not controlled by strings?','Action figure']
  ];
  function propertyQuestion(t=tier()){
    const bank=t>=3?MASTER_BANK:PROPERTY_BANK,x=bank[Math.floor(Math.random()*bank.length)],ans=x[1];
    const options=t>=2&&SPELLING_WRONG[norm(ans)]&&Math.random()<.45?spellingOptions(ans):uniqueOptions(ans,TOY_WORDS);
    return q(x[0],ans,options,ans,'Identify the toy’s function, movement or material.',`Key feature: ${target(ans)?.clue||'Use the full description.'}`,'reasoning');
  }
  function knowledgeQuestion(hard=false){
    const f=KNOWLEDGE[Math.floor(Math.random()*KNOWLEDGE.length)],ans=f.answer==='Toys'?TARGETS[Math.floor(Math.random()*TARGETS.length)].word:f.answer;
    if(f.answer==='Toys')return propertyQuestion(hard?3:1);
    return q(`According to Knowledge Boost: ${f.fact.replace(new RegExp(ans,'i'),'which toy')}`,ans,hard&&SPELLING_WRONG[norm(ans)]?spellingOptions(ans):uniqueOptions(ans,TOY_WORDS),ans,'Recall the fact introduced before the games.',f.fact,'knowledge');
  }
  function riddleQuestion(t=tier()){
    const bank=t>=2?MASTER_BANK:PROPERTY_BANK,x=bank[Math.floor(Math.random()*bank.length)],ans=x[1];
    return q(`What am I? ${x[0].replace(/^Which toy /i,'I ').replace(/\?$/,'')}`,ans,uniqueOptions(ans,TOY_WORDS),ans,'Turn each part of the riddle into a toy property.',target(ans)?.clue||x[0],'riddle');
  }
  function generateQuestion(kind='mixed',forcedTier=tier()){
    if(kind==='translation'||kind==='recognition')return translationQuestion(forcedTier);
    if(kind==='category')return categoryQuestion(forcedTier);
    if(kind==='property'||kind==='reasoning')return propertyQuestion(forcedTier);
    if(kind==='knowledge')return knowledgeQuestion(forcedTier>=2);
    if(kind==='riddle')return riddleQuestion(forcedTier);
    if(kind==='spelling'){const pool=TARGETS.filter(t=>t.word.length>=4),t=pool[Math.floor(Math.random()*pool.length)];return q('Choose the correctly spelled toy name.',t.word,spellingOptions(t.word),t.word,'Compare every letter and every word boundary.',`Spelling rhythm: ${t.syllables}.`,'spelling',{explanation:`${t.word} is the correct spelling.`});}
    const r=Math.random();return r<.18?translationQuestion(forcedTier):r<.42?categoryQuestion(forcedTier):r<.82?propertyQuestion(forcedTier):knowledgeQuestion(forcedTier>=2);
  }

  function startGame(id){
    const game=GAME_DEFS.find(g=>g.id===id);if(!game)return;
    if(!isGameUnlocked(game)){toast('🔒 Complete the required preparation or previous experiences first.','bad');return;}
    currentGame=game;
    const dispatch={
      'quick-recall':()=>startStandard(game,'mixed',8),
      'picture-match':()=>startPictureMatch(game),
      'listen-choose':()=>startToyListening(game),
      'toy-categories':()=>startStandard(game,'category',8),
      'what-am-i':()=>startStandard(game,'riddle',8),
      'missing-letters':()=>startMissingLetters(game),
      'correct-spelling':()=>startStandard(game,'spelling',8),
      'build-word':()=>startBuildWord(game),
      'toy-properties':()=>startStandard(game,'property',9),
      'odd-one-out':()=>startOddOneOut(game),
      'toy-riddles':()=>startToyRiddles(game),
      'memory-challenge':()=>startMemoryChallenge(game),
      'bubble-rescue':()=>startBubbleRescue(game),
      'submarine-sonar':()=>startSonar(game),
      'current-chase':()=>startCurrentChase(game),
      'toy-mine':()=>startGoldMiner(game),
      'toy-rush':()=>startToyRush(game),
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
    if(feedbackLocked)return;feedbackLocked=true;const ok=acceptedAnswer(value,currentQuestion.answer);button.classList.add(ok?'correct':'wrong');if(ok)audio.sfx('correct');else audio.sfx('wrong');
    recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);updateStats();
    $$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(acceptedAnswer(b.dataset.answer,currentQuestion.answer))b.classList.add('correct');});
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

  function imageMarkup(t,cls='picture-img'){
    return `<img class="${cls}" src="${escapeHtml(imagePath(t))}" data-legacy="${escapeHtml(imagePath(t,true))}" alt="${escapeHtml(t.word)}"><div class="picture-fallback hidden">${escapeHtml(t.word)}</div>`;
  }
  function wireImageFallback(root=$('challengeArea')){root.querySelectorAll('img[data-legacy]').forEach(img=>{img.onerror=()=>{if(img.dataset.tried!=='1'){img.dataset.tried='1';img.src=img.dataset.legacy;}else{img.style.display='none';img.nextElementSibling?.classList.remove('hidden');}};});}
  function startPictureMatch(game){
    createSession(game,8);currentStandardNext=()=>{const t=TARGETS[Math.floor(Math.random()*TARGETS.length)],qn=q('Which English toy is shown in the image?',t.word,uniqueOptions(t.word,TOY_WORDS),t.word,'Study the complete image, then recall its English name.',`The Spanish meaning is “${t.es}”.`,'visual');newRoundQuestion(qn);
      prepareGameArea({kicker:'🖼️ PICTURE MATCH',prompt:qn.prompt,sub:'Images are shown complete with object-fit: contain.',html:`<div class="picture-focus"><div class="picture-panel">${imageMarkup(t)}</div><div class="picture-answer-grid">${qn.options.map(o=>`<button class="answer-btn" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}</div></div>`});wireImageFallback();$$('.answer-btn',$('challengeArea')).forEach(b=>b.onclick=()=>answerMcq(b.dataset.answer,b));updateStats();};currentStandardNext();
  }
  function startToyListening(game){
    createSession(game,8);currentStandardNext=()=>{const qn=session.round%3===0?translationQuestion(Math.max(1,tier())):propertyQuestion(Math.max(1,tier()));const original=qn.prompt;qn.prompt='Listen carefully. Choose the toy that matches the spoken clue.';qn.speak=original;renderMcq(qn,{speakNow:true});$('promptSub').innerHTML='<button id="replayAudio" class="btn small">🔊 REPLAY</button>';$('replayAudio').onclick=()=>speak(original,.68);};currentStandardNext();
  }
  function startToyRiddles(game){createSession(game,8);currentStandardNext=()=>renderMcq(riddleQuestion(Math.max(1,tier())));currentStandardNext();}
  function startOddOneOut(game){
    const sets=[
      [['Toy car','Toy train','Toy plane','Puppet'],'Puppet','The other three are toy vehicles.'],
      [['Kite','Frisbee','Drone','Dollhouse'],'Dollhouse','The other three can move through the air.'],
      [['Puzzle','Building blocks','Playing cards','Water gun'],'Water gun','The other three are mainly tabletop or thinking activities.'],
      [['Toy boat','Rubber duck','Water gun','Action figure'],'Action figure','The other three are connected with water play.'],
      [['Yo-yo','Spinning top','Marbles','Teddy bear'],'Teddy bear','The other three are skill toys with controlled movement.'],
      [['Doll','Action figure','Toy dinosaur','Jump rope'],'Jump rope','The other three are figures used in pretend play.'],
      [['Rocking horse','Scooter','Hula hoop','Dollhouse'],'Dollhouse','The other three involve large body movement.'],
      [['Remote-control car','Drone','Toy robot','Puzzle'],'Puzzle','The other three are associated with technology or machines.']
    ];
    createSession(game,8);currentStandardNext=()=>{const s=sets[session.round%sets.length],qn=q('Which toy does not belong with the other three?',s[1],shuffle(s[0]),s[1],'Classify all four toys before selecting.',s[2],'classification',{explanation:s[2]});renderMcq(qn);};currentStandardNext();
  }
  function startMemoryChallenge(game){
    createSession(game,1);const chosen=shuffle(TARGETS).slice(0,15);session.memory={cards:shuffle(chosen.flatMap(t=>[{key:norm(t.word),type:'word',t},{key:norm(t.word),type:'image',t}])),open:[],matched:new Set(),moves:0,locked:false};newRoundQuestion(q('Match every image with its English toy name.','all',[],chosen[0].word,'Remember the position of every card.','Create pairs: one image + one English word.','memory'));renderMemoryBoard();
  }
  function renderMemoryBoard(){
    const m=session.memory;prepareGameArea({kicker:'🃏 MEMORY CHALLENGE',prompt:'Match 15 images with 15 English words.',sub:`${m.matched.size} / 15 pairs · ${m.moves} moves`,html:'<div id="memoryBoard" class="memory-board"></div>'});const board=$('memoryBoard');m.cards.forEach((c,i)=>{const revealed=m.open.includes(i)||m.matched.has(c.key),b=document.createElement('button');b.className=`memory-card ${revealed?'revealed':''} ${m.matched.has(c.key)?'matched':''}`;b.disabled=m.matched.has(c.key)||m.locked;b.innerHTML=`<span class="memory-front">🎁</span><span class="memory-back">${c.type==='word'?escapeHtml(c.t.word):imageMarkup(c.t,'')}</span>`;b.onclick=()=>flipMemory(i);board.appendChild(b);});wireImageFallback(board);updateStats();
  }
  function flipMemory(i){const m=session.memory;if(m.locked||m.open.includes(i)||m.matched.has(m.cards[i].key))return;m.open.push(i);if(m.open.length===2){m.moves++;m.locked=true;const [a,b]=m.open.map(x=>m.cards[x]);const ok=a.key===b.key&&a.type!==b.type;if(ok){m.matched.add(a.key);recordAcademic(a.t.word,true,{context:'memory'});audio.sfx('correct');setTimeout(()=>{m.open=[];m.locked=false;if(m.matched.size===15){session.round=1;session.score=100;finishRegularGame();}else renderMemoryBoard();},480);}else{session.gameplayMisses++;audio.sfx('wrong');setTimeout(()=>{m.open=[];m.locked=false;renderMemoryBoard();},720);}}renderMemoryBoard();}
  function startQuickRecallPreteach(){
    const game={id:'preteach-recall',title:'Pre-Teach Quick Recall',icon:'⚡',desc:'Prove that you can recognise the new language.'};createSession(game,8);$('helpButton').classList.add('hidden');currentStandardNext=()=>renderMcq(generateQuestion(Math.random()<.5?'spelling':'mixed',0));
    const originalFinish=finishRegularGame;session._preteach=true;currentStandardNext();
  }
  function finishPreteachRecall(){
    const percent=session.maxCredit?Math.round(session.credit/session.maxCredit*100):0;if(percent>=60){state.preteach.recall=true;persistTheme();openModal({title:'⚡ QUICK RECALL COMPLETE',html:`<p style="text-align:center;font-size:22px">You achieved ${percent}%. The games are now ${allPreteachDone()?'unlocked':'one step closer to unlocking'}.</p>`,actions:[{label:'RETURN',className:'gold',onClick:()=>{showScreen('homeScreen');updateHud();}}],closable:false});}else openModal({title:'RETRY QUICK RECALL',html:`<p>You achieved ${percent}%. Reach 60% to complete this preparation stage.</p>`,actions:[{label:'TRY AGAIN',className:'gold',onClick:()=>startQuickRecallPreteach()},{label:'RETURN',onClick:()=>showScreen('homeScreen')}],closable:false});
  }

  function maskWord(word){
    const chars=[...word];const eligible=chars.map((c,i)=>/[a-z]/i.test(c)&&i>0&&i<chars.length-1?i:null).filter(i=>i!==null);const removeCount=clamp(Math.floor(chars.length/3)+(tier()>1?1:0),2,Math.min(5,eligible.length));shuffle(eligible).slice(0,removeCount).forEach(i=>chars[i]='_');return chars.join(' ');
  }
  function startMissingLetters(game){createSession(game,7);currentStandardNext=()=>{const pool=TARGETS.filter(t=>t.word.length>=5),t=pool[Math.floor(Math.random()*pool.length)];newRoundQuestion(q(`Complete the word:`,t.word,[],t.word,'Use the visible letters and the meaning from Pre-Teach.',`The word begins with ${t.word.slice(0,2)} and ends with ${t.word.slice(-2)}.`,'spelling'));prepareGameArea({kicker:'MISSING LETTERS',prompt:'Recover the complete spelling.',sub:t.es,html:`<div class="masked-word">${maskWord(t.word.toUpperCase())}</div><input id="typedAnswer" class="input-answer" autocomplete="off" spellcheck="false" placeholder="Type the complete word"><div style="text-align:center;margin-top:14px"><button id="submitTyped" class="btn gold">CHECK ANSWER</button></div>`});$('submitTyped').onclick=checkTyped;$('typedAnswer').addEventListener('keydown',e=>{if(e.key==='Enter')checkTyped();});$('typedAnswer').focus();};currentStandardNext();}
  function checkTyped(){if(feedbackLocked)return;const input=$('typedAnswer'),value=input.value,ok=acceptedAnswer(value,currentQuestion.answer);feedbackLocked=true;input.classList.add(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:'spelling',assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);$('promptSub').textContent=ok?'✅ Excellent spelling!':`❌ Correct spelling: ${currentQuestion.answer}`;audio.sfx(ok?'correct':'wrong');setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},800);}

  function startBuildWord(game){createSession(game,7);currentStandardNext=()=>{const pool=TARGETS.filter(t=>t.word.length>=6),t=pool[Math.floor(Math.random()*pool.length)];session.buildTarget=t;session.built=[];newRoundQuestion(q(`Build the word meaning “${t.es}”.`,t.word,[],t.word,'Use every letter exactly once.',`The spelling rhythm is ${t.syllables}.`,'spelling'));renderBuildBoard();};currentStandardNext();}
  function renderBuildBoard(){const t=session.buildTarget,remaining=[...t.word.toUpperCase()];session.built.forEach(letter=>{const i=remaining.indexOf(letter);if(i>=0)remaining.splice(i,1);});prepareGameArea({kicker:'BUILD THE WORD',prompt:currentQuestion.prompt,sub:`${t.ipa} · ${t.syllables}`,html:`<div id="builtWord" class="built-word">${session.built.map(l=>`<span class="built-letter">${l}</span>`).join('')}</div><div id="letterBoard" class="letter-board"></div><div style="text-align:center"><button id="backLetter" class="btn ghost small">⌫ BACK</button> <button id="resetLetters" class="btn ghost small">RESET</button></div>`});shuffle(remaining).forEach(l=>{const b=document.createElement('button');b.className='letter-btn';b.textContent=l;b.onclick=()=>{session.built.push(l);if(session.built.length===t.word.length){const made=session.built.join(''),ok=acceptedAnswer(made,t.word);recordAcademic(t.word,ok,{context:'spelling'});session.score+=ok?100:0;if(!ok)session.academicMisses.push(t.word);audio.sfx(ok?'correct':'wrong');$('promptSub').textContent=ok?'✅ Word constructed correctly!':`❌ You built ${made}. Try the correct order next.`;setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},750);}else renderBuildBoard();};$('letterBoard').appendChild(b);});$('backLetter').onclick=()=>{session.built.pop();renderBuildBoard();};$('resetLetters').onclick=()=>{session.built=[];renderBuildBoard();};}

  function startBubbleRescue(game){
    createSession(game,6);currentStandardNext=()=>{const qn=generateQuestion(session.round%2?'spelling':'mixed',Math.max(1,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'🫧 BUBBLE RESCUE',prompt:qn.prompt,sub:'Pop the correct bubble before it reaches the surface.',html:'<div id="bubbleZone" class="bubble-zone"></div>'});
      const zone=$('bubbleZone'),options=shuffle(qn.options);let resolved=false;options.forEach((o,i)=>{const b=document.createElement('button');b.className='bubble';b.dataset.answer=o;b.textContent=o;b.style.setProperty('--s',(105+Math.random()*30)+'px');b.style.setProperty('--x',(4+i*(88/Math.max(1,options.length-1)))+'%');b.style.setProperty('--d',(6.4+Math.random()*2.4)+'s');b.style.setProperty('--drift',(-25+Math.random()*50)+'px');b.style.animationDelay=(i*.24)+'s';b.onclick=()=>{if(resolved)return;resolved=true;const ok=acceptedAnswer(o,qn.answer);recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});session.score+=ok?120*session.creditFactor:0;if(!ok)session.academicMisses.push(qn.target);b.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');setTimeout(next,550);};b.addEventListener('animationend',()=>{if(!resolved&&acceptedAnswer(o,qn.answer)){resolved=true;session.gameplayMisses++;toast('The correct bubble escaped. Timing miss — Mastery unchanged.','bad');setTimeout(next,450);}});zone.appendChild(b);});function next(){session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();}updateStats();};currentStandardNext();
  }

  function startSonar(game){
    createSession(game,6);currentStandardNext=()=>{const qn=generateQuestion(session.round%2?'mixed':'spelling',Math.max(1,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'🚢 SUBMARINE SONAR',prompt:qn.prompt,sub:'Wait for the sweep, then confirm the correct signal.',html:'<div id="sonarZone" class="sonar-zone"></div>'});
      const positions=[[26,27],[70,25],[31,67],[72,69]];shuffle(qn.options).forEach((o,i)=>{const b=document.createElement('button');b.className='blip';b.dataset.answer=o;b.textContent=o;b.style.setProperty('--x',positions[i][0]+'%');b.style.setProperty('--y',positions[i][1]+'%');b.onclick=()=>{if(feedbackLocked)return;feedbackLocked=true;const ok=acceptedAnswer(o,qn.answer);recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});session.score+=ok?130*session.creditFactor:0;if(!ok)session.academicMisses.push(qn.target);b.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');setTimeout(()=>{session.round++;if(session.round>=session.rounds)finishRegularGame();else currentStandardNext();},650);};$('sonarZone').appendChild(b);});updateStats();};currentStandardNext();
  }

  function startCurrentChase(game){
    createSession(game,6);
    currentStandardNext=()=>{
      const qn=generateQuestion('mixed',Math.max(1,tier()));
      newRoundQuestion(qn);
      prepareGameArea({
        kicker:'🐠 CURRENT CHASE',
        prompt:qn.prompt,
        sub:'Intercept the correct target. The fish move at a learner-friendly speed; a timing miss never reduces Mastery.',
        html:'<div id="currentZone" class="current-zone"></div>'
      });
      const zone=$('currentZone');
      let resolved=false;
      const coarsePointer=window.matchMedia?.('(pointer: coarse)')?.matches;
      const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      const baseDuration=reducedMotion?18:(coarsePointer?15.5:12.5);

      const resolveTarget=(button,answer)=>{
        if(resolved)return;
        resolved=true;
        button.style.animationPlayState='paused';
        const ok=acceptedAnswer(answer,qn.answer);
        recordAcademic(qn.target,ok,{credit:session.creditFactor,context:qn.context,assisted:session.assistedThisRound});
        session.score+=ok?130*session.creditFactor:0;
        if(!ok)session.academicMisses.push(qn.target);
        button.classList.add(ok?'correct':'wrong');
        audio.sfx(ok?'correct':'wrong');
        setTimeout(next,650);
      };

      shuffle(qn.options).forEach((o,i)=>{
        const b=document.createElement('button');
        b.className='chase-target';
        b.dataset.answer=o;
        b.textContent=o;
        b.style.setProperty('--y',(44+i*88)+'px');
        b.style.setProperty('--d',(baseDuration+i*.85)+'s');
        b.style.animationDelay=(i*.32)+'s';
        b.setAttribute('aria-label',`Catch ${o}`);
        // pointerdown reacts immediately on mouse and touch, before a fast-moving
        // target can leave the pointer between press and click.
        b.addEventListener('pointerdown',e=>{
          e.preventDefault();
          e.stopPropagation();
          resolveTarget(b,o);
        });
        b.addEventListener('animationend',()=>{
          if(!resolved&&acceptedAnswer(o,qn.answer)){
            resolved=true;
            session.gameplayMisses++;
            toast('Target passed. Timing miss — no Mastery penalty.','bad');
            setTimeout(next,550);
          }
        });
        zone.appendChild(b);
      });
      function next(){
        session.round++;
        if(session.round>=session.rounds)finishRegularGame();
        else currentStandardNext();
      }
      updateStats();
    };
    currentStandardNext();
  }

  function startToyRush(game){
    createSession(game,10);session.remaining=60;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;currentStandardNext=()=>renderMcq(generateQuestion('mixed',Math.max(1,tier())));currentStandardNext();timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0){clearInterval(timerHandle);timerHandle=null;session.round=session.rounds;finishRegularGame({customTitle:'⏱️ TIME IS UP'});}},1000);actionCleanup=()=>{$('timerWrap').classList.add('hidden');};
  }

  function startGoldMiner(game){
    createSession(game,6);session.hearts=5;session.minerItems={dynamite:1,power:1,extraTime:0};session.remaining=75;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;$('heartsWrap').classList.remove('hidden');updateStats();
    openModal({title:'⛏️ MINER SHOP',html:`<p>Coins buy gameplay tools. Gems remain reserved for learning support.</p><div class="help-grid"><button class="help-option" data-shop="dynamite"><strong>🧨 Dynamite <span class="cost">🪙35</span></strong><small>Destroy a heavy rock already caught by the claw.</small></button><button class="help-option" data-shop="time"><strong>⏱️ Extra Time <span class="cost">🪙45</span></strong><small>Add 15 seconds to this mining run.</small></button><button class="help-option" data-shop="power"><strong>💪 Power Boost <span class="cost">🪙50</span></strong><small>Pull rocks and word tablets back faster.</small></button></div><p id="shopInventory" style="text-align:center;font-weight:900;color:#fff1a0"></p>`,actions:[{label:'START TOY MINE',className:'gold',onClick:beginGoldMiner}],closable:false});
    $$('[data-shop]',$('modalBody')).forEach(b=>b.onclick=()=>buyMinerItem(b.dataset.shop));updateMinerInventoryText();
  }
  function buyMinerItem(id){const costs={dynamite:35,time:45,power:50};if(!spend('gold',costs[id])){toast('NOT ENOUGH COINS','bad');return;}if(id==='dynamite')session.minerItems.dynamite++;if(id==='time'){session.minerItems.extraTime+=15;session.remaining+=15;}if(id==='power')session.minerItems.power+=.35;audio.sfx('correct');updateMinerInventoryText();}
  function updateMinerInventoryText(){const el=$('shopInventory');if(el)el.textContent=`Inventory: 🧨 ${session.minerItems.dynamite} · ⏱️ +${session.minerItems.extraTime}s · 💪 x${session.minerItems.power.toFixed(2)}`;}
  function beginGoldMiner(){
    const qn=generateQuestion('reasoning',Math.max(2,tier()));newRoundQuestion(qn);prepareGameArea({kicker:'⛏️ TOY MINE',prompt:qn.prompt,sub:'The claw swings automatically. Click, tap or press Space at the right moment.',showHearts:true,html:`<div class="canvas-frame"><canvas id="minerCanvas" width="1000" height="560" aria-label="Toy Mine"></canvas></div><div class="miner-controls"><button id="launchClaw" class="btn gold">⛓️ RELEASE CLAW</button><button id="useDynamite" class="btn red">🧨 DYNAMITE (<span id="dynCount">${session.minerItems.dynamite}</span>)</button><button id="buyDynamite" class="btn small">BUY 🧨 · 🪙35</button></div>`});
    initMinerCanvas(qn);$('launchClaw').onclick=minerLaunch;$('useDynamite').onclick=minerDynamite;$('buyDynamite').onclick=()=>{if(spend('gold',35)){session.minerItems.dynamite++;$('dynCount').textContent=session.minerItems.dynamite;toast('🧨 Dynamite added.','good');}else toast('NOT ENOUGH COINS','bad');};
  }
  let miner=null;
  function initMinerCanvas(qn){
    const canvas=$('minerCanvas'),ctx=canvas.getContext('2d');miner={canvas,ctx,w:1000,h:560,last:performance.now(),question:qn,roundResolved:false,objects:[],particles:[],hook:{ox:500,oy:112,min:64,length:64,angle:-1.12,dir:1,state:'swing',max:620,tipX:500,tipY:176,caught:null},timerAccumulator:0};
    buildMinerObjects(qn);canvas.addEventListener('pointerdown',minerLaunch);document.addEventListener('keydown',minerKey);timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0)endMinerRun('⏱️ Time expired.');},1000);actionCleanup=()=>{document.removeEventListener('keydown',minerKey);$('timerWrap').classList.add('hidden');miner=null;};minerLoop(performance.now());
  }
  function minerKey(e){if(e.code==='Space'||e.code==='ArrowDown'){e.preventDefault();minerLaunch();}if(e.code==='KeyD'||e.code==='ArrowUp'){e.preventDefault();minerDynamite();}}
  function buildMinerObjects(qn){
    // Defensive integrity pass: the live mine must always contain four distinct
    // word tablets and the correct answer must always be one of them.
    const answer=String(qn.answer||'').trim(),seen=new Set(),clean=[];
    [answer,...(qn.options||[])].forEach(value=>{const label=String(value||'').trim(),key=norm(label);if(label&&key&&!seen.has(key)){seen.add(key);clean.push(label);}});
    for(const target of shuffle(TARGETS.slice())){if(clean.length>=4)break;const label=target.en,key=norm(label);if(!seen.has(key)){seen.add(key);clean.push(label);}}
    const slots=[[145,255],[355,305],[650,260],[845,330]],options=shuffle(clean.slice(0,4));
    options.forEach((o,i)=>miner.objects.push({kind:'word',label:o,x:slots[i][0],y:slots[i][1],r:62+Math.min(18,o.length*.72),weight:.9,value:acceptedAnswer(o,answer),tone:i%4,seed:41+i*23}));
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
  function nextMinerRound(){if(!miner)return;const qn=generateQuestion('reasoning',Math.max(2,tier()));newRoundQuestion(qn);miner.question=qn;miner.objects=[];buildMinerObjects(qn);$('promptText').textContent=qn.prompt;$('promptSub').textContent='The claw swings automatically. Choose the release moment.';miner.hook.state='swing';miner.hook.length=miner.hook.min;updateStats();}
  function endMinerRun(message){if(!miner)return;toast(message);if(timerHandle){clearInterval(timerHandle);timerHandle=null;}if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}document.removeEventListener('keydown',minerKey);miner=null;$('timerWrap').classList.add('hidden');finishRegularGame({forceSuccess:session.correct>=4,customTitle:'⛏️ TOY MINE RESULTS'});}
  function minerExplode(x,y){if(!miner)return;for(let i=0;i<50;i++){const a=Math.random()*Math.PI*2,s=50+Math.random()*180;miner.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-50,life:.5+Math.random()*.5,color:['#ffd54d','#ff743e','#5a4032'][i%3]});}}
  function drawMiner(){
    const {ctx,w,h}=miner,t=performance.now()*.001;
    ctx.clearRect(0,0,w,h);
    const cave=ctx.createLinearGradient(0,0,0,h);cave.addColorStop(0,'#174a67');cave.addColorStop(.18,'#0b2d43');cave.addColorStop(.55,'#241d1d');cave.addColorStop(1,'#0c0909');ctx.fillStyle=cave;ctx.fillRect(0,0,w,h);
    // Deep cave layers and warm headlamp beam.
    const lamp=ctx.createRadialGradient(500,72,12,500,215,420);lamp.addColorStop(0,'rgba(255,235,143,.72)');lamp.addColorStop(.32,'rgba(255,191,69,.16)');lamp.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=lamp;ctx.fillRect(0,0,w,h);
    for(let layer=0;layer<4;layer++){ctx.save();ctx.globalAlpha=.22-layer*.035;ctx.fillStyle=['#4c3a32','#322b2b','#211c20','#141217'][layer];ctx.beginPath();ctx.moveTo(0,155+layer*72);for(let x=0;x<=w;x+=55){ctx.lineTo(x,165+layer*72+Math.sin(x*.017+layer*1.8)*18+Math.cos(x*.009)*9);}ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fill();ctx.restore();}
    // Timber supports.
    const wood=ctx.createLinearGradient(0,0,40,0);wood.addColorStop(0,'#3e2111');wood.addColorStop(.35,'#9a5b25');wood.addColorStop(.65,'#6b3717');wood.addColorStop(1,'#2e160c');
    ctx.fillStyle=wood;ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=12;ctx.fillRect(32,40,34,h-72);ctx.fillRect(w-66,40,34,h-72);ctx.fillRect(26,42,w-52,30);ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(255,208,113,.18)';ctx.lineWidth=3;for(const x of [42,w-56]){ctx.beginPath();ctx.moveTo(x,50);ctx.lineTo(x,h-40);ctx.stroke();}
    // Lanterns.
    for(const x of [90,910]){ctx.save();ctx.translate(x,110);const glow=ctx.createRadialGradient(0,0,1,0,0,75);glow.addColorStop(0,'rgba(255,235,137,.8)');glow.addColorStop(1,'rgba(255,160,32,0)');ctx.fillStyle=glow;ctx.fillRect(-80,-80,160,160);ctx.fillStyle='#e7a62b';ctx.strokeStyle='#3b2511';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-16,-25,32,44,6);ctx.fill();ctx.stroke();ctx.fillStyle='#fff0a7';ctx.fillRect(-9,-15,18,25);ctx.restore();}
    // Rails and sleepers.
    ctx.fillStyle='#5c321a';for(let x=40;x<w-40;x+=82)ctx.fillRect(x,h-72,54,15);ctx.strokeStyle='#a8875c';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(10,h-86);ctx.lineTo(w-10,h-86);ctx.moveTo(10,h-45);ctx.lineTo(w-10,h-45);ctx.stroke();
    // Gold glints.
    for(let i=0;i<18;i++){const x=(i*157+41)%w,y=185+((i*89)%300);ctx.globalAlpha=.18+.2*Math.sin(t*2+i)**2;ctx.fillStyle='#ffd65a';ctx.beginPath();ctx.arc(x,y,2+(i%3),0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    drawMinerCharacter(ctx,500,10);drawMinerPet(ctx,105,96,state.companions?.selected||null);
    miner.objects.slice().sort((a,b)=>a.y-b.y).forEach(o=>drawMinerObject(ctx,o));if(miner.hook.caught)drawMinerObject(ctx,miner.hook.caught);
    // Rope and metal claw.
    const hq=miner.hook;ctx.shadowColor='rgba(0,0,0,.65)';ctx.shadowBlur=7;ctx.strokeStyle='#1d1511';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(hq.ox,hq.oy);ctx.lineTo(hq.tipX,hq.tipY);ctx.stroke();ctx.shadowBlur=0;const rope=ctx.createLinearGradient(hq.ox,hq.oy,hq.tipX,hq.tipY);rope.addColorStop(0,'#f2ddaa');rope.addColorStop(.5,'#8f744f');rope.addColorStop(1,'#d8bd82');ctx.strokeStyle=rope;ctx.lineWidth=4;ctx.stroke();ctx.save();ctx.translate(hq.tipX,hq.tipY);ctx.rotate(-hq.angle);ctx.shadowColor='#000';ctx.shadowBlur=9;ctx.strokeStyle='#d9e0e5';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-15);ctx.lineTo(0,10);ctx.arc(14,10,14,Math.PI,0);ctx.stroke();ctx.strokeStyle='#6e7479';ctx.lineWidth=3;ctx.stroke();ctx.restore();ctx.shadowBlur=0;
    miner.particles.forEach(p=>{ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.life*5);ctx.fillRect(-3,-3,6,6);ctx.restore();ctx.globalAlpha=1;});
  }
  function drawMinerCharacter(ctx,x,y){
    ctx.save();ctx.translate(x,y);
    // Pickaxe behind the miner.
    ctx.save();ctx.translate(98,50);ctx.rotate(-.55);ctx.strokeStyle='#6d4529';ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(0,105);ctx.stroke();ctx.strokeStyle='#b9c4cb';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(-45,-8);ctx.quadraticCurveTo(0,-30,45,-8);ctx.stroke();ctx.restore();
    // Torso, vest and shoulders.
    const shirt=ctx.createLinearGradient(-80,78,80,160);shirt.addColorStop(0,'#f4e4c9');shirt.addColorStop(1,'#b98e61');ctx.fillStyle=shirt;ctx.strokeStyle='#4c2f20';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-72,88,144,90,30);ctx.fill();ctx.stroke();
    const vest=ctx.createLinearGradient(-60,90,60,170);vest.addColorStop(0,'#b9712d');vest.addColorStop(.55,'#75421e');vest.addColorStop(1,'#3b2417');ctx.fillStyle=vest;ctx.beginPath();ctx.moveTo(-65,92);ctx.lineTo(-25,84);ctx.lineTo(-8,175);ctx.lineTo(-58,170);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(65,92);ctx.lineTo(25,84);ctx.lineTo(8,175);ctx.lineTo(58,170);ctx.closePath();ctx.fill();ctx.fillStyle='#e4a84a';for(const px of [-45,45]){ctx.beginPath();ctx.arc(px,122,7,0,Math.PI*2);ctx.fill();}
    // Arms and gloves holding the winch.
    ctx.strokeStyle='#d69b6b';ctx.lineWidth=24;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-62,112);ctx.lineTo(-105,145);ctx.moveTo(62,112);ctx.lineTo(105,145);ctx.stroke();ctx.fillStyle='#503422';for(const px of [-108,108]){ctx.beginPath();ctx.arc(px,148,18,0,Math.PI*2);ctx.fill();}
    // Neck and face.
    ctx.fillStyle='#d99b68';ctx.fillRect(-18,70,36,30);const face=ctx.createRadialGradient(-18,35,8,0,45,58);face.addColorStop(0,'#f8c18b');face.addColorStop(.68,'#d8945f');face.addColorStop(1,'#a86642');ctx.fillStyle=face;ctx.strokeStyle='#4e2d20';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,53,50,55,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Ears.
    ctx.fillStyle='#d99060';ctx.beginPath();ctx.ellipse(-49,55,10,16,0,0,Math.PI*2);ctx.ellipse(49,55,10,16,0,0,Math.PI*2);ctx.fill();
    // Hair/brows/eyes.
    ctx.fillStyle='#4b2c1c';ctx.beginPath();ctx.arc(0,32,45,Math.PI,Math.PI*2);ctx.fill();ctx.strokeStyle='#40251a';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-31,43);ctx.quadraticCurveTo(-18,34,-6,42);ctx.moveTo(6,42);ctx.quadraticCurveTo(18,34,31,43);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(-18,52,10,13,0,0,Math.PI*2);ctx.ellipse(18,52,10,13,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2a241f';ctx.beginPath();ctx.arc(-17,54,5,0,Math.PI*2);ctx.arc(17,54,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-15,51,2,0,Math.PI*2);ctx.arc(19,51,2,0,Math.PI*2);ctx.fill();
    // Nose, smile and beard.
    ctx.strokeStyle='#7d432d';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,55);ctx.lineTo(-3,66);ctx.lineTo(4,67);ctx.stroke();ctx.strokeStyle='#5a2d20';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,66,22,.15,Math.PI-.15);ctx.stroke();ctx.globalAlpha=.55;ctx.strokeStyle='#4a2c22';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,61,37,.22,Math.PI-.22);ctx.stroke();ctx.globalAlpha=1;
    // Helmet with metallic gradients.
    const helmet=ctx.createLinearGradient(-65,-18,65,40);helmet.addColorStop(0,'#fff3a8');helmet.addColorStop(.23,'#eeb83e');helmet.addColorStop(.62,'#b87412');helmet.addColorStop(1,'#654006');ctx.fillStyle=helmet;ctx.strokeStyle='#493008';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,22,61,Math.PI,0);ctx.lineTo(62,34);ctx.lineTo(-62,34);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#f0be43';ctx.beginPath();ctx.roundRect(-73,29,146,17,8);ctx.fill();ctx.stroke();
    // Headlamp and light cone.
    ctx.save();ctx.globalCompositeOperation='screen';const beam=ctx.createRadialGradient(0,4,1,0,4,50);beam.addColorStop(0,'rgba(255,255,225,.95)');beam.addColorStop(.28,'rgba(255,229,128,.55)');beam.addColorStop(1,'rgba(255,207,58,0)');ctx.fillStyle=beam;ctx.fillRect(-55,-45,110,105);ctx.restore();ctx.fillStyle='#3c4145';ctx.beginPath();ctx.arc(0,5,18,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff6c0';ctx.beginPath();ctx.arc(0,5,11,0,Math.PI*2);ctx.fill();
    // Winch front aligned with hook origin.
    ctx.fillStyle='#2b241f';ctx.strokeStyle='#a6875d';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,103,48,23,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#d0b17b';ctx.lineWidth=3;for(let i=-32;i<=32;i+=8){ctx.beginPath();ctx.moveTo(i,86);ctx.lineTo(i,120);ctx.stroke();}
    ctx.restore();
  }
  function drawMinerPet(ctx,x,y,id){
    ctx.save();ctx.translate(x,y);
    if(!id){ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=12;ctx.fillStyle='rgba(8,17,27,.88)';ctx.beginPath();ctx.arc(0,0,42,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.font='34px sans-serif';ctx.fillStyle='#ffe27a';ctx.textAlign='center';ctx.fillText('🔒',0,12);ctx.restore();return;}
    const pet=PETS.find(p=>p.id===id)||PETS[0],tone=id==='fox'?'#e8782c':id==='raccoon'?'#77828c':id==='capybara'?'#9a6948':id==='beaver'?'#8b5b3f':id==='cat'?'#d7a56c':'#c58a55';
    ctx.shadowColor='rgba(0,0,0,.48)';ctx.shadowBlur=12;const body=ctx.createRadialGradient(-15,-18,2,0,0,48);body.addColorStop(0,'#fff0ce');body.addColorStop(.42,tone);body.addColorStop(1,'#3c2b25');ctx.fillStyle=body;ctx.strokeStyle='#31211c';ctx.lineWidth=3;
    // ears
    ctx.beginPath();if(id==='raccoon'||id==='cat'||id==='fox'){ctx.moveTo(-32,-27);ctx.lineTo(-18,-55);ctx.lineTo(-7,-27);ctx.moveTo(7,-27);ctx.lineTo(20,-55);ctx.lineTo(33,-27);}else{ctx.arc(-27,-28,13,0,Math.PI*2);ctx.arc(27,-28,13,0,Math.PI*2);}ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.ellipse(0,0,43,39,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    if(id==='raccoon'){ctx.fillStyle='#31363c';ctx.beginPath();ctx.ellipse(-15,-5,15,10,-.2,0,Math.PI*2);ctx.ellipse(15,-5,15,10,.2,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-14,-6,9,0,Math.PI*2);ctx.arc(14,-6,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#1d1b1a';ctx.beginPath();ctx.arc(-13,-5,4,0,Math.PI*2);ctx.arc(13,-5,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2b1d18';ctx.beginPath();ctx.ellipse(0,9,7,5,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#4b2c24';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,10,15,.15,Math.PI-.15);ctx.stroke();ctx.font='18px sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(pet.icon,0,60);ctx.restore();
  }
  function drawMinerLabel(ctx,label,r){
    const words=String(label||'').split(/\s+/).filter(Boolean),lines=[];
    if(words.length<=1)lines.push(words[0]||'');
    else if(words.length===2)lines.push(words[0],words[1]);
    else{const pivot=Math.ceil(words.length/2);lines.push(words.slice(0,pivot).join(' '),words.slice(pivot).join(' '));}
    const longest=Math.max(...lines.map(line=>line.length),1),fontSize=Math.max(11,Math.min(23,(r*1.55)/(longest*.58)));
    ctx.font=`900 ${fontSize}px Trebuchet MS`;
    const lineHeight=fontSize*1.05,startY=2-(lines.length-1)*lineHeight/2;
    lines.forEach((line,index)=>{const y=startY+index*lineHeight;ctx.strokeText(line,0,y);ctx.fillText(line,0,y);});
  }

  function drawMinerObject(ctx,o){
    ctx.save();ctx.translate(o.x,o.y);ctx.shadowColor='rgba(0,0,0,.52)';ctx.shadowBlur=14;ctx.shadowOffsetY=8;
    if(o.kind==='rock'){
      const r=o.r,pts=[];for(let i=0;i<10;i++){const a=i/10*Math.PI*2,rr=r*(.78+((o.seed+i*19)%23)/100);pts.push([Math.cos(a)*rr,Math.sin(a)*rr]);}const g=ctx.createRadialGradient(-r*.35,-r*.38,2,0,0,r*1.05);g.addColorStop(0,'#c4b4a2');g.addColorStop(.42,'#776a61');g.addColorStop(1,'#2f2927');ctx.fillStyle=g;ctx.strokeStyle='#2a2220';ctx.lineWidth=4;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='rgba(230,220,205,.32)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-r*.4,-r*.18);ctx.lineTo(-r*.1,r*.08);ctx.lineTo(r*.23,-r*.1);ctx.moveTo(r*.02,r*.12);ctx.lineTo(r*.35,r*.38);ctx.stroke();
    }else{
      const r=o.r,pal=[['#fff5aa','#d89b18','#78500b'],['#d8fbff','#27bdd1','#075980'],['#e8ddff','#8e69da','#4a2a88'],['#ffe1d0','#eb7752','#8c321d']][o.tone%4],g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,pal[0]);g.addColorStop(.47,pal[1]);g.addColorStop(1,pal[2]);ctx.fillStyle=g;ctx.strokeStyle='#fff1b6';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-r,-r*.58,r*2,r*1.16,18);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle=o.tone===0?'#281a08':'#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=3;drawMinerLabel(ctx,o.label,r);ctx.globalAlpha=.28;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(-r+8,-r*.50,r*1.65,10,6);ctx.fill();ctx.globalAlpha=1;
    }
    ctx.restore();
  }

  function startKraken(game){
    createSession(game,8);session.hearts=6;session.krakenHp=8;session.remaining=100;$('timerWrap').classList.remove('hidden');$('timerStat').textContent=session.remaining;$('heartsWrap').classList.remove('hidden');renderKrakenRound();timerHandle=setInterval(()=>{session.remaining--;$('timerStat').textContent=session.remaining;if(session.remaining<=0)finishKraken(false,'Time expired.');},1000);actionCleanup=()=>{$('timerWrap').classList.add('hidden');kraken=null;};
  }
  let kraken=null;
  function renderKrakenRound(){
    if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}
    const qn=session.round%3===0?generateQuestion('spelling',3):session.round%3===1?generateQuestion('knowledge',3):generateQuestion('mixed',3);newRoundQuestion(qn);
    prepareGameArea({kicker:'🐙 KRAKEN BATTLE',prompt:qn.prompt,sub:'Correct answers damage the Kraken. Academic errors cost a heart.',showHearts:true,html:`<div class="boss-label"><span>BOSS · TOY KRAKEN</span><span>PHASE ${session.krakenHp>5?1:session.krakenHp>2?2:3}</span></div><div class="boss-hp"><i id="krakenHpFill" style="width:${session.krakenHp/8*100}%"></i></div><div class="canvas-frame"><canvas id="krakenCanvas" width="1000" height="560"></canvas><div id="krakenOptions" class="kraken-options">${qn.options.map(o=>`<button class="answer-btn" data-answer="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}</div></div>`});
    $$('.answer-btn',$('krakenOptions')).forEach(b=>b.onclick=()=>answerKraken(b.dataset.answer,b));kraken={canvas:$('krakenCanvas'),ctx:$('krakenCanvas').getContext('2d'),last:performance.now(),hit:0,attack:0,phase:session.krakenHp>5?1:session.krakenHp>2?2:3};krakenLoop(performance.now());updateStats();
  }
  function answerKraken(value,button){
    if(feedbackLocked)return;feedbackLocked=true;const ok=acceptedAnswer(value,currentQuestion.answer);recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});
    if(ok){session.krakenHp--;session.score+=180*session.creditFactor;kraken.hit=1;audio.sfx('boss');button.classList.add('correct');toast('DIRECT HIT! The Kraken loses HP.','good');}
    else{session.hearts--;session.academicMisses.push(currentQuestion.target);kraken.attack=1;audio.sfx('wrong');button.classList.add('wrong');toast(`Kraken attack! Correct answer: ${currentQuestion.answer}`,'bad');}
    updateStats();$('krakenHpFill').style.width=(session.krakenHp/8*100)+'%';$$('.answer-btn',$('krakenOptions')).forEach(b=>{b.disabled=true;if(acceptedAnswer(b.dataset.answer,currentQuestion.answer))b.classList.add('correct');});
    session.round++;setTimeout(()=>{if(session.krakenHp<=0)finishKraken(true,'Kraken defeated!');else if(session.hearts<=0||session.round>=session.rounds)finishKraken(false,session.hearts<=0?'No hearts remaining.':'The Kraken survived.');else renderKrakenRound();},900);
  }
  function finishKraken(success,msg){if(!session||session.gameId!=='kraken-battle')return;if(timerHandle){clearInterval(timerHandle);timerHandle=null;}if(animationHandle){cancelAnimationFrame(animationHandle);animationHandle=null;}kraken=null;$('timerWrap').classList.add('hidden');toast(msg,success?'good':'bad');finishRegularGame({forceSuccess:success,customTitle:success?'🐙 KRAKEN DEFEATED':'🐙 KRAKEN RETREAT'});}
  function krakenLoop(now){if(!kraken)return;const dt=Math.min(.035,(now-kraken.last)/1000||0);kraken.last=now;kraken.hit=Math.max(0,kraken.hit-dt*2.7);kraken.attack=Math.max(0,kraken.attack-dt*2.4);drawKrakenCanvas();animationHandle=requestAnimationFrame(krakenLoop);}
  function drawKrakenCanvas(){
    const {ctx}=kraken,w=1000,h=560,t=performance.now()*.001;
    const sea=ctx.createLinearGradient(0,0,0,h);sea.addColorStop(0,'#39d7ef');sea.addColorStop(.22,'#0878aa');sea.addColorStop(.58,'#063b67');sea.addColorStop(1,'#020f2b');ctx.fillStyle=sea;ctx.fillRect(0,0,w,h);
    // Volumetric light rays.
    ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<5;i++){const x=80+i*210,g=ctx.createLinearGradient(x,0,x+130,h);g.addColorStop(0,'rgba(190,248,255,.24)');g.addColorStop(1,'rgba(190,248,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+85,0);ctx.lineTo(x+230,h);ctx.lineTo(x+80,h);ctx.closePath();ctx.fill();}ctx.restore();
    // Distant ruins and seafloor.
    ctx.fillStyle='rgba(6,28,52,.5)';for(let i=0;i<7;i++){const x=20+i*160,hh=60+(i%3)*35;ctx.fillRect(x,h-120-hh,32,hh);ctx.fillRect(x-18,h-120-hh,68,12);}ctx.fillStyle='#071b2a';ctx.beginPath();ctx.moveTo(0,h-72);for(let x=0;x<=w;x+=55)ctx.lineTo(x,h-70-Math.sin(x*.021)*16);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fill();
    // School of fish silhouettes.
    ctx.fillStyle='rgba(180,241,247,.24)';for(let i=0;i<12;i++){const x=(i*137+t*18)%w,y=80+(i*61)%300;ctx.save();ctx.translate(x,y);ctx.scale(.65+(i%3)*.18,.65+(i%3)*.18);ctx.beginPath();ctx.ellipse(0,0,17,8,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-15,0);ctx.lineTo(-28,-10);ctx.lineTo(-28,10);ctx.closePath();ctx.fill();ctx.restore();}
    drawSubmarine(ctx,145,300,t);
    // Kraken tentacles behind head.
    ctx.save();ctx.translate(735,315);ctx.globalAlpha=kraken.hit?.55+Math.sin(t*30)*.35:1;for(let i=0;i<8;i++){const a=(i-3.5)*.37,phase=t*(1.12+kraken.phase*.16)+i;const tg=ctx.createLinearGradient(0,0,260,210);tg.addColorStop(0,i%2?'#a7478e':'#833479');tg.addColorStop(.55,i%2?'#702666':'#552052');tg.addColorStop(1,'#28122f');ctx.strokeStyle=tg;ctx.lineWidth=42-i%2*5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(Math.sin(a)*82,55);ctx.bezierCurveTo(Math.sin(a)*180+Math.sin(phase)*35,100,Math.sin(a)*250+Math.cos(phase)*42,175,Math.sin(a)*315,235);ctx.stroke();ctx.strokeStyle='rgba(255,193,225,.32)';ctx.lineWidth=7;ctx.stroke();
      // suckers
      ctx.fillStyle='rgba(255,178,216,.6)';for(let j=1;j<5;j++){const yy=65+j*35,xx=Math.sin(a)*(85+j*36)+Math.sin(phase+j)*10;ctx.beginPath();ctx.ellipse(xx,yy,5,8,a,0,Math.PI*2);ctx.fill();}}
    // Head/body with 3D gradient and ridges.
    const body=ctx.createRadialGradient(-55,-80,15,0,-5,220);body.addColorStop(0,'#e174bb');body.addColorStop(.24,'#a8478f');body.addColorStop(.62,'#622660');body.addColorStop(1,'#26122e');ctx.fillStyle=body;ctx.strokeStyle='#1e0b28';ctx.lineWidth=8;ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=25;ctx.beginPath();ctx.ellipse(0,-30,185,158,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(255,200,229,.18)';ctx.lineWidth=5;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.arc(i*26,-45,105-Math.abs(i)*9,-1.3,-.1);ctx.stroke();}
    // Eyes, brows and pupils.
    ctx.fillStyle='#ffdb58';ctx.shadowColor='#ff9a3d';ctx.shadowBlur=22;ctx.beginPath();ctx.ellipse(-62,-72,24,36,-.08,0,Math.PI*2);ctx.ellipse(62,-72,24,36,.08,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#2a0f25';ctx.beginPath();ctx.ellipse(-60,-68,9,17,0,0,Math.PI*2);ctx.ellipse(60,-68,9,17,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#35132d';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-92,-110);ctx.quadraticCurveTo(-60,-128,-31,-105);ctx.moveTo(31,-105);ctx.quadraticCurveTo(60,-128,92,-110);ctx.stroke();
    // Angry mouth and teeth.
    ctx.fillStyle='#2a0b20';ctx.beginPath();ctx.ellipse(0,24,68,43,0,0,Math.PI);ctx.lineTo(-68,24);ctx.closePath();ctx.fill();ctx.fillStyle='#fff3e3';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*22-8,24);ctx.lineTo(i*22,42);ctx.lineTo(i*22+8,24);ctx.closePath();ctx.fill();}ctx.fillStyle='#e66b8e';ctx.beginPath();ctx.ellipse(0,52,35,13,0,0,Math.PI*2);ctx.fill();
    if(kraken.attack){ctx.fillStyle=`rgba(255,75,51,${kraken.attack*.28})`;ctx.beginPath();ctx.arc(0,0,248,0,Math.PI*2);ctx.fill();}
    ctx.restore();
    // Bubbles and particles.
    ctx.fillStyle='rgba(225,252,255,.72)';for(let i=0;i<30;i++){const x=(i*157+t*24)%1000,y=(i*79+t*42)%560;ctx.beginPath();ctx.arc(x,y,2+(i%5),0,Math.PI*2);ctx.fill();}
  }
  function drawSubmarine(ctx,x,y,t){
    ctx.save();ctx.translate(x,y+Math.sin(t*2)*6);ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=18;const g=ctx.createLinearGradient(-120,-55,120,55);g.addColorStop(0,'#fff5a4');g.addColorStop(.25,'#e9b52d');g.addColorStop(.63,'#a66a0b');g.addColorStop(1,'#503707');ctx.fillStyle=g;ctx.strokeStyle='#3c2a08';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,0,118,61,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    // Window band.
    ctx.fillStyle='#174760';ctx.beginPath();ctx.roundRect(-58,-30,118,53,24);ctx.fill();ctx.strokeStyle='#f0cf67';ctx.lineWidth=4;ctx.stroke();for(const px of [-35,0,35]){const wg=ctx.createRadialGradient(px-6,-12,2,px,-8,18);wg.addColorStop(0,'#c9fbff');wg.addColorStop(1,'#2ebad3');ctx.fillStyle=wg;ctx.beginPath();ctx.arc(px,-8,16,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#143849';ctx.stroke();}
    // Tower and periscope.
    ctx.fillStyle='#8a5b0a';ctx.beginPath();ctx.roundRect(-25,-86,50,39,15);ctx.fill();ctx.strokeStyle='#3a2808';ctx.stroke();ctx.lineWidth=9;ctx.strokeStyle='#b68a31';ctx.beginPath();ctx.moveTo(0,-83);ctx.lineTo(0,-115);ctx.lineTo(25,-115);ctx.stroke();
    // Tail and propeller.
    ctx.fillStyle='#e0a921';ctx.beginPath();ctx.moveTo(-105,0);ctx.lineTo(-152,-42);ctx.lineTo(-152,42);ctx.closePath();ctx.fill();ctx.strokeStyle='#493307';ctx.stroke();ctx.save();ctx.translate(-158,0);ctx.rotate(t*4);ctx.strokeStyle='#d1dde3';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(18,0);ctx.moveTo(0,-18);ctx.lineTo(0,18);ctx.stroke();ctx.restore();
    // Spotlight.
    ctx.save();ctx.globalCompositeOperation='screen';const beam=ctx.createLinearGradient(95,0,300,0);beam.addColorStop(0,'rgba(230,255,255,.5)');beam.addColorStop(1,'rgba(230,255,255,0)');ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(95,-16);ctx.lineTo(330,-90);ctx.lineTo(330,90);ctx.lineTo(95,16);ctx.closePath();ctx.fill();ctx.restore();ctx.restore();
  }

  function openGemHelp(){
    if(!currentQuestion||currentGame?.id==='mastery-challenge'){toast('Gem Help is unavailable in the Mastery Challenge.','bad');return;}
    const options=[
      ['quick',25,'QUICK HINT','A conceptual nudge without revealing the answer.'],
      ['fifty',30,'50 / 50','Eliminate two distractors. One use per question.'],
      ['strong',45,'STRONG HINT','A more focused clue that still requires the answer.'],
      ['slow',15,'SLOW REPLAY','Hear the English clue more slowly.'],
      ['spelling',20,'SPELLING SUPPORT','Reveal a multi-letter pattern, not the complete answer.']
    ].filter(x=>!(x[0]==='fifty'&&(session.help5050||currentGame?.id==='toy-mine')));
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
    if(hard||Math.random()<.48)return q(`Choose the correctly spelled toy name meaning “${t.es}”.`,t.word,spellingOptions(t.word),t.word,'Compare every letter and word boundary.',`Spelling rhythm: ${t.syllables}.`,'spelling');
    return q(`Which English toy means “${t.es}”?`,t.word,uniqueOptions(t.word,TOY_WORDS),t.word,'Recall the Pre-Teach pair.',t.clue,'recognition');
  }
  function startPracticeMistakes(game){
    let keys=Object.entries(state.needsReview||{}).sort((a,b)=>b[1]-a[1]).map(([k])=>k);
    if(!keys.length&&PREVIEW){state.needsReview={puzzle:3,'remote-control car':2,puppet:2};keys=['puzzle','remote-control car','puppet'];toast('Teacher Preview created sample Needs Review targets.');}
    if(!keys.length){toast('No targets currently need review.','good');return;}
    createSession(game,Math.min(10,Math.max(6,keys.length*2)));session.reviewKeys=keys;currentStandardNext=()=>{const key=session.reviewKeys[session.round%session.reviewKeys.length],t=target(key)||TARGETS[0];renderMcq(questionForTarget(t,session.round%2===1));};currentStandardNext();
  }

  function buildMasterySet(){
    const set=[];const add=(qn,mode='mcq')=>{qn.mode=mode;if(!set.some(x=>x.prompt===qn.prompt))set.push(qn);};
    add(propertyQuestion(2));add(categoryQuestion(2));add(generateQuestion('spelling',3));add(knowledgeQuestion(true));add(riddleQuestion(3));
    add(propertyQuestion(3));add(categoryQuestion(3));add(generateQuestion('spelling',3));const listening=propertyQuestion(3);add(listening,'listen');add(translationQuestion(2));
    shuffle(TARGETS.filter(t=>t.word.length>=7)).slice(0,3).forEach(t=>add(q(`Type the correctly spelled English toy name for “${t.es}”.`,t.word,[],t.word,'No hints are available in Mastery.',`Recall ${t.syllables}.`,'spelling'),'type'));
    add(propertyQuestion(3));add(riddleQuestion(3));while(set.length<15)add(generateQuestion('mixed',3));return set.slice(0,15);
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
  function answerMasteryChoice(value,button){if(feedbackLocked)return;feedbackLocked=true;const ok=acceptedAnswer(value,currentQuestion.answer);button.classList.add(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{context:`mastery-${currentQuestion.context}`});if(!ok)session.academicMisses.push(currentQuestion.target);audio.sfx(ok?'correct':'wrong');$$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(acceptedAnswer(b.dataset.answer,currentQuestion.answer))b.classList.add('correct');});setTimeout(advanceMastery,700);}
  function answerMasteryTyped(){if(feedbackLocked)return;feedbackLocked=true;const value=$('masteryTyped').value,ok=acceptedAnswer(value,currentQuestion.answer);recordAcademic(currentQuestion.target,ok,{context:'mastery-spelling'});if(!ok)session.academicMisses.push(currentQuestion.target);$('promptSub').textContent=ok?'✅ Exact spelling confirmed.':`❌ Correct spelling: ${currentQuestion.answer}`;audio.sfx(ok?'correct':'wrong');setTimeout(advanceMastery,750);}
  function advanceMastery(){session.round++;if(session.round>=session.rounds)finishMastery();else renderMasteryRound();}
  function finishMastery(){
    const score=Math.round(session.correct/session.rounds*100);state.masteryBest=Math.max(Number(state.masteryBest)||0,score);const [icon,label]=masteryStatus(score);let reward={xp:0,gems:0,gold:0};
    if(score>=80){state.status=label;world2.themeComplete[CFG.themeIndex]=true;world2.themePending[CFG.themeIndex]=false;world2.themeIndex=Math.max(Number(world2.themeIndex)||0,CFG.themeIndex+1);world2.mastery=world2.mastery||{};world2.mastery[THEME_ID]=Math.max(Number(world2.mastery[THEME_ID])||0,score);world2.completed[CFG.themeIndex]=[...new Set(state.completedGames)];reward=score===100?{xp:1000,gems:100,gold:300}:score>=90?{xp:750,gems:65,gold:220}:{xp:550,gems:40,gold:160};addEconomy(reward);registerWeekly();if(score===100&&!state.badges.includes('Elite Toy Scholar · Theme 06'))state.badges.push('Elite Toy Scholar · Theme 06');}
    else{state.status='NEEDS REVIEW';session.academicMisses.forEach(w=>addNeed(w,1));}
    persistTheme();persistWorld2();updateHud();showMasteryResult(score,reward,icon,label);
  }
  function showMasteryResult(score,reward,icon,label){
    if(score===100){showPerfectMastery();return;}
    const passed=score>=80,needs=[...new Set(session.academicMisses.map(w=>target(w)?.word||w))];
    openModal({title:`${icon} ${label}`,html:`<div style="text-align:center;font-size:76px">${icon}</div><p style="text-align:center;font-size:23px">Mastery Score: <strong>${score}%</strong></p>${passed?`<p style="text-align:center">Theme 06 is academically mastered. Theme 07 is now unlocked.<br>Reward: ⭐${reward.xp} · 💎${reward.gems} · 🪙${reward.gold}</p>`:`<p style="text-align:center">80% is required. You do not need to repeat the full Theme.</p>`}${needs.length?`<p style="text-align:center">Targets to refine:</p><div class="needs-list">${needs.map(w=>`<span class="needs-chip">${escapeHtml(w)}</span>`).join('')}</div>`:''}`,actions:passed?[{label:'VIEW ACADEMIC RECORD',className:'gold',onClick:showAcademicRecord},{label:'RETURN TO WORLD 2',onClick:returnWorld2}]:[{label:'PRACTICE MY MISTAKES',className:'gold',onClick:()=>startGame('practice-mistakes')},{label:'RETURN TO THEME',onClick:()=>{showScreen('homeScreen');updateHud();}}],closable:false});
  }
  function showPerfectMastery(){confetti(180);audio.sfx('unlock');showScreen('completeScreen');$('completeIcon').textContent='👑';$('completeTitle').textContent='PERFECT MASTERY';$('completeMessage').innerHTML='Flawless! You achieved <strong>100% Mastery</strong>.<br>You have earned <strong>Elite Toy Scholar</strong> status for Theme 06.';$('completeReward').textContent='⭐ +1,000 · 💎 +100 · 🪙 +300 · Elite Toy Scholar Badge';renderAcademicRecord();}

  function renderAcademicRecord(){
    const [icon,label]=masteryStatus(state.masteryBest),needs=Object.entries(state.needsReview||{}).sort((a,b)=>b[1]-a[1]).map(([k])=>target(k)?.word||k);const inv=meta().invicto;
    $('recordContent').innerHTML=`<div class="record-grid"><div><small>MASTERY</small><strong>${Math.round(state.masteryBest||0)}%</strong></div><div><small>STATUS</small><strong>${icon} ${label}</strong></div><div><small>ATTEMPTS</small><strong>${state.masteryAttempts||0}</strong></div><div><small>GEM HELP</small><strong>${state.helpUsed||0}</strong></div><div><small>EXPERIENCES</small><strong>${GAME_DEFS.slice(0,18).filter(g=>state.completedGames.includes(g.id)).length}/18</strong></div><div><small>BEST INVICTO</small><strong>${Number(inv.best)||0}</strong></div><div><small>BADGES</small><strong>${state.badges.length}</strong></div><div><small>NEEDS REVIEW</small><strong>${needs.length}</strong></div></div>${needs.length?`<p>Words and patterns to keep refining:</p><div class="needs-list">${needs.map(w=>`<span class="needs-chip">${escapeHtml(w)}</span>`).join('')}</div>`:'<p>There are no active Needs Review targets.</p>'}`;
  }
  function showAcademicRecord(){renderAcademicRecord();openModal({title:'📊 ACADEMIC RECORD · THEME 06',html:$('recordContent').innerHTML,actions:[{label:'RETURN TO THEME',className:'gold',onClick:()=>{showScreen('homeScreen');updateHud();}},{label:'RETURN TO WORLD 2',onClick:returnWorld2}]});}
  function returnWorld2(){if(CFG.world2Url==='#'){showScreen('homeScreen');updateHud();return;}location.href=CFG.world2Url+(PREVIEW?(CFG.world2Url.includes('?')?'&':'?')+'preview=teacher':'');}

  function renderTeacherLab(){
    const lab=$('teacherLab');if(!PREVIEW){$('teacherButton').classList.add('hidden');lab.classList.add('hidden');return;}
    $('teacherButton').classList.remove('hidden');lab.classList.remove('hidden');const gameButtons=GAME_DEFS.map(g=>`<button class="btn small" data-lab-game="${g.id}">${g.icon} ${g.title}</button>`).join('');
    $('teacherLabBody').innerHTML=`<div class="lab-section"><h3>Direct Screens</h3><div class="lab-grid"><button class="btn small" data-lab-pre="language">📚 New Language</button><button class="btn small" data-lab-pre="recall">⚡ Quick Recall</button><button class="btn small" data-lab-pre="knowledge">🧠 Knowledge Boost</button><button class="btn small" data-lab-action="record">📊 Academic Record</button><button class="btn small" data-lab-action="perfect">👑 Perfect Mastery</button><button class="btn small" data-lab-action="home">🏠 Theme Home</button></div></div><div class="lab-section"><h3>Every Game</h3><div class="lab-grid">${gameButtons}</div></div><div class="lab-section"><h3>Difficulty</h3><div class="lab-grid">${TIER_NAMES.map((t,i)=>`<button class="btn small" data-lab-tier="${i}">${i} · ${t}</button>`).join('')}</div></div><div class="lab-section"><h3>Economy & States</h3><div class="lab-grid"><button class="btn small" data-lab-action="economy">+1000 💎 / 🪙</button><button class="btn small" data-lab-action="errors">Create Needs Review</button><button class="btn small" data-lab-action="unlock">Unlock Core Games</button><button class="btn small" data-lab-action="reset">Reset Preview</button></div></div><div class="lab-section"><h3>Companion Preview</h3><div class="lab-grid">${PETS.map(p=>`<button class="btn small" data-lab-pet="${p.id}">${p.icon} ${p.name}</button>`).join('')}</div></div><p style="color:#ffefa3;font-size:11px">Teacher Preview is isolated. No learner progress or rewards are saved.</p>`;
    $$('[data-lab-game]',lab).forEach(b=>b.onclick=()=>{lab.classList.remove('open');startGame(b.dataset.labGame);});$$('[data-lab-pre]',lab).forEach(b=>b.onclick=()=>{lab.classList.remove('open');startPreteach(b.dataset.labPre);});$$('[data-lab-tier]',lab).forEach(b=>b.onclick=()=>setTier(Number(b.dataset.labTier)));$$('[data-lab-pet]',lab).forEach(b=>b.onclick=()=>{state.companions.selected=b.dataset.labPet;renderCompanions();toast(`${b.textContent.trim()} selected.`,'good');});$$('[data-lab-action]',lab).forEach(b=>b.onclick=()=>teacherAction(b.dataset.labAction));
  }
  function teacherAction(id){
    if(id==='record'){showAcademicRecord();return;}if(id==='perfect'){state.masteryBest=100;state.status='PERFECT MASTERY';if(!state.badges.includes('Elite Toy Scholar · Theme 06'))state.badges.push('Elite Toy Scholar · Theme 06');showPerfectMastery();return;}if(id==='home'){showScreen('homeScreen');updateHud();return;}if(id==='economy'){state.localEconomy.gems+=1000;state.localEconomy.gold+=1000;state.localEconomy.xp+=1000;updateHud();toast('Preview economy replenished.','good');return;}if(id==='errors'){state.needsReview={puzzle:3,'remote-control car':2,puppet:2};renderHomeStatus();toast('Needs Review state created.');return;}if(id==='unlock'){state.preteach={language:true,recall:true,knowledge:true,index:0,factIndex:0};state.completedGames=GAME_DEFS.slice(0,18).map(g=>g.id);renderHomeStatus();toast('All core experiences unlocked.','good');return;}if(id==='reset'){state=defaultThemeState();state.preteach={language:true,recall:true,knowledge:true,index:0,factIndex:0};state.companions={unlocked:PETS.map(p=>p.id),selected:'capybara',rewardSeen:true};state.localEconomy={xp:99999,gems:9999,gold:9999};renderHomeStatus();updateHud();toast('Preview reset.');}
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
    if(feedbackLocked)return;feedbackLocked=true;const ok=acceptedAnswer(value,currentQuestion.answer);button.classList.add(ok?'correct':'wrong');audio.sfx(ok?'correct':'wrong');recordAcademic(currentQuestion.target,ok,{credit:session.creditFactor,context:currentQuestion.context,assisted:session.assistedThisRound});session.score+=ok?100*session.creditFactor:0;if(!ok)session.academicMisses.push(currentQuestion.target);updateStats();$$('.answer-btn',$('challengeArea')).forEach(b=>{b.disabled=true;if(acceptedAnswer(b.dataset.answer,currentQuestion.answer))b.classList.add('correct');});$('promptSub').textContent=ok?`✅ ${currentQuestion.explanation||'Correct!'}`:`❌ ${currentQuestion.explanation||`Correct answer: ${currentQuestion.answer}.`}`;setTimeout(()=>{session.round++;if(session.round>=session.rounds){if(session._preteach)finishPreteachRecall();else finishRegularGame();}else currentStandardNext?.();},850);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.LexiconiaTheme06={startGame,startPreteach,showAcademicRecord,setTier,state:()=>serialise(state),build:CFG.build,debug:()=>serialise({miner:miner?{question:miner.question,objects:miner.objects}:null,currentQuestion}),qa:{targets:TARGETS.map(t=>serialise(t)),games:GAME_DEFS.map(g=>serialise(g)),sampleQuestions:(n=100)=>Array.from({length:n},(_,i)=>serialise(generateQuestion(i%5===0?'spelling':i%5===1?'category':i%5===2?'property':i%5===3?'knowledge':'mixed',i%4)))}};
})();
