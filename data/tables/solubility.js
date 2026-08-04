// ============ ТАБЛИЦЯ РОЗЧИННОСТІ (зовнішній модуль) ============
// Перенесено з index.html v1.1.8 → v1.1.9

// Катіони (рядки): 13 штук
const SOL_CATIONS=[
  {id:'H',label:'H⁺',name:'Гідроген'},
  {id:'Li',label:'Li⁺',name:'Літій'},
  {id:'Na',label:'Na⁺',name:'Натрій'},
  {id:'K',label:'K⁺',name:'Калій'},
  {id:'NH4',label:'NH₄⁺',name:'Амоній'},
  {id:'Ca',label:'Ca²⁺',name:'Кальцій'},
  {id:'Mg',label:'Mg²⁺',name:'Магній'},
  {id:'Al',label:'Al³⁺',name:'Алюміній'},
  {id:'Fe2',label:'Fe²⁺',name:'Ферум(II)'},
  {id:'Fe3',label:'Fe³⁺',name:'Ферум(III)'},
  {id:'Cu',label:'Cu²⁺',name:'Купрум'},
  {id:'Ba',label:'Ba²⁺',name:'Барій'},
  {id:'Pb',label:'Pb²⁺',name:'Плюмбум'},
];
// Аніони (стовпці): 9 штук
const SOL_ANIONS=[
  {id:'OH',label:'OH⁻',name:'Гідроксид'},
  {id:'Cl',label:'Cl⁻',name:'Хлорид'},
  {id:'SO4',label:'SO₄²⁻',name:'Сульфат'},
  {id:'NO3',label:'NO₃⁻',name:'Нітрат'},
  {id:'CO3',label:'CO₃²⁻',name:'Карбонат'},
  {id:'PO4',label:'PO₄³⁻',name:'Фосфат'},
  {id:'S',label:'S²⁻',name:'Сульфід'},
  {id:'SiO3',label:'SiO₃²⁻',name:'Силікат'},
  {id:'F',label:'F⁻',name:'Флуорид'},
];
// Значення: s=розчинна, n=нерозчинна, m=малорозчинна, r=розчиняється (кислота/луг), d=не існує/розкладається
// Порядок: OH Cl SO4 NO3 CO3 PO4 S SiO3 F
const SOL_DATA={
  H:   ['r','r','r','r','r','r','r','r','r'],
  Li:  ['r','r','r','r','r','m','r','—','m'],
  Na:  ['r','r','r','r','r','r','r','r','r'],
  K:   ['r','r','r','r','r','r','r','r','r'],
  NH4: ['r','r','r','r','r','r','r','r','r'],
  Ca:  ['m','r','m','r','n','n','r','n','m'],
  Mg:  ['n','r','r','r','n','n','n','n','r'],
  Al:  ['n','r','r','r','d','n','d','n','r'],
  Fe2: ['n','r','r','r','n','n','n','n','r'],
  Fe3: ['n','r','r','r','d','n','d','n','r'],
  Cu:  ['n','r','r','r','n','n','n','n','r'],
  Ba:  ['r','r','n','r','n','n','n','n','m'],
  Pb:  ['n','n','n','r','n','n','n','n','n'],
};
// Назви сполук для пояснень
const SOL_NAMES={
  'H_OH':'H₂O — Вода',
  'H_Cl':'HCl — Хлоридна кислота',
  'H_SO4':'H₂SO₄ — Сульфатна кислота',
  'H_NO3':'HNO₃ — Нітратна кислота',
  'H_CO3':'H₂CO₃ — Карбонатна кислота',
  'H_PO4':'H₃PO₄ — Фосфатна кислота',
  'H_S':'H₂S — Сірководень',
  'H_SiO3':'H₂SiO₃ — Силікатна кислота',
  'H_F':'HF — Флуоридна кислота',
  'Li_OH':'LiOH — Літій гідроксид',
  'Na_OH':'NaOH — Натрій гідроксид (їдкий натр)',
  'K_OH':'KOH — Калій гідроксид',
  'NH4_OH':'NH₃·H₂O — Аміачна вода',
  'Ca_OH':'Ca(OH)₂ — Кальцій гідроксид (гашене вапно)',
  'Mg_OH':'Mg(OH)₂ — Магній гідроксид',
  'Al_OH':'Al(OH)₃ — Алюміній гідроксид',
  'Fe2_OH':'Fe(OH)₂ — Ферум(II) гідроксид',
  'Fe3_OH':'Fe(OH)₃ — Ферум(III) гідроксид',
  'Cu_OH':'Cu(OH)₂ — Купрум(II) гідроксид',
  'Ba_OH':'Ba(OH)₂ — Барій гідроксид',
  'Pb_OH':'Pb(OH)₂ — Плюмбум гідроксид',
  'Ca_SO4':'CaSO₄ — Кальцій сульфат (гіпс)',
  'Ba_SO4':'BaSO₄ — Барій сульфат',
  'Pb_SO4':'PbSO₄ — Плюмбум сульфат',
  'Pb_Cl':'PbCl₂ — Плюмбум хлорид',
  'Ca_CO3':'CaCO₃ — Кальцій карбонат (крейда, вапняк, мармур)',
  'Ba_CO3':'BaCO₃ — Барій карбонат',
  'Mg_CO3':'MgCO₃ — Магній карбонат',
  'Fe2_CO3':'FeCO₃ — Ферум(II) карбонат (сидерит)',
  'Cu_CO3':'CuCO₃ — Купрум карбонат',
  'Pb_CO3':'PbCO₃ — Плюмбум карбонат',
  'Ca_F':'CaF₂ — Кальцій флуорид (флюорит)',
  'Ba_F':'BaF₂ — Барій флуорид',
  'Pb_F':'PbF₂ — Плюмбум флуорид',
};
// Детальні пояснення для ключових сполук
const SOL_EXPLS={
  'Ca_SO4':'<b>CaSO₄ (гіпс)</b> — малорозчинна сполука. Розчинність ≈ 2.4 г/л при 25°C. Саме тому гіпс не «розмокає» у воді одразу, але при тривалому контакті — повільно розчиняється. <b>У будівництві</b>: гіпс твердіє при контакті з водою через утворення кристалів CaSO₄·2H₂O.',
  'BaSO4':'<b>BaSO₄</b> — майже нерозчинна сіль (0.0002 г/100 мл). Саме тому іон <span class="term">Ba²⁺</span> є якісним реагентом на сульфат-іон SO₄²⁻: при змішуванні утворюється білий осад, нерозчинний ні в кислотах, ні в лугах.',
  'Ba_SO4':'<b>BaSO₄</b> — майже нерозчинна сіль (0.0002 г/100 мл). Саме тому іон <span class="term">Ba²⁺</span> є якісним реагентом на сульфат-іон SO₄²⁻: при змішуванні утворюється білий осад, нерозчинний ні в кислотах, ні в лугах. У медицині: «барієва каша» — суспензія BaSO₄ для рентгенографії шлунка.',
  'Ca_OH':'<b>Ca(OH)₂ (гашене вапно)</b> — малорозчинна основа. Розчинність ≈ 1.6 г/л (зменшується при нагріванні — рідкісний виняток!). Прозорий розчин Ca(OH)₂ = <span class="term">вапняна вода</span>. CO₂ робить її каламутною через утворення нерозчинного CaCO₃ — ця реакція є якісною на CO₂.',
  'Ca_CO3':'<b>CaCO₃</b> — нерозчинна сіль. Але! Розчиняється в кислотах з виділенням CO₂: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. <b>Природні форми</b>: крейда, вапняк, мармур, черепашки молюсків, яєчна шелупа — це все CaCO₃. Карстові печери — результат розчинення CaCO₃ дощовою водою (H₂O + CO₂ = H₂CO₃).',
  'Al_OH':'<b>Al(OH)₃</b> — нерозчинна основа з унікальною властивістю: <span class="term">амфотерність</span>. Реагує і з кислотами, і з лугами: Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O; Al(OH)₃ + NaOH → Na[Al(OH)₄]. Це означає, що Al(OH)₃ розчиняється у лужному середовищі — тому алюмінієвий посуд пошкоджується содовими розчинами.',
  'Fe3_OH':'<b>Fe(OH)₃</b> — червоно-бурий осад. Не розчиняється у воді, але розчиняється в кислотах. Утворюється при окисненні Fe(OH)₂ або при реакції солей Fe³⁺ з лугами. <b>Іржа</b> — суміш Fe(OH)₃ і Fe₂O₃·nH₂O.',
  'Fe2_OH':'<b>Fe(OH)₂</b> — зеленкувато-білий осад. На повітрі швидко окиснюється до бурого Fe(OH)₃: 4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃.',
  'Cu_OH':'<b>Cu(OH)₂</b> — блакитний осад. Якісна реакція на іони Cu²⁺: додати NaOH → синій осад. При нагріванні чорніє: Cu(OH)₂ → CuO + H₂O. Реагує з глюкозою (реакція Фелінга) — використовується для виявлення цукру.',
  'Pb_SO4':'<b>PbSO₄</b> — нерозчинний білий осад. Утворюється при взаємодії солей плюмбуму з сульфатами. Не розчиняється в розбавленій H₂SO₄ — саме тому свинцевий акумулятор поступово деградує.',
  'Pb_Cl':'<b>PbCl₂</b> — нерозчинний білий осад (розчинність ≈ 0.99 г/100 мл). Якісна реакція на іони Pb²⁺ — додати HCl або хлорид → білий осад. Розчиняється при нагріванні (гарячою водою).',
  'NH4_OH':'<b>NH₃·H₂O (аміачна вода)</b> — аміак добре розчиняється у воді (700 л газу в 1 л води!). Утворює слабку основу. Не осаджується, бо NH₄OH — слабка основа і існує рівноважно: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.',
  'H_SiO3':'<b>H₂SiO₃</b> — силікатна кислота. Нерозчинна у воді, але розчиняється в лугах. Утворюється при дії кислот на силікати: Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓. Біла желеподібна маса.',
  'Ca_F':'<b>CaF₂ (флюорит)</b> — малорозчинна сіль. Є мінералом, з якого добувають фтор. Слабко розчинна, але не «нерозчинна» — розчинність ≈ 0.002 г/100 мл.',
};

// Текстовий опис за статусом
function getSolStatus(s){
  if(s==='r')return{badge:'Р',cls:'s',short:'Розчинна',full:'<b>Розчинна</b> — добре розчиняється у воді (більше 1 г на 100 мл). Утворює прозорий розчин без осаду.'};
  if(s==='n')return{badge:'Н',cls:'n',short:'Нерозчинна',full:'<b>Нерозчинна</b> — практично не розчиняється у воді (менше 0.01 г на 100 мл). При змішуванні двох розчинів випадає у вигляді <span class="term">осаду</span>.'};
  if(s==='m')return{badge:'М',cls:'m',short:'Малорозчинна',full:'<b>Малорозчинна</b> — розчиняється частково (від 0.01 до 1 г на 100 мл). Розчин насичується швидко, надлишок випадає в осад.'};
  if(s==='r*'||s==='rr')return{badge:'Р*',cls:'r',short:'Розчиняється з реакцією',full:'<b>Розчиняється з реакцією</b> — реагує з водою (кислота або луг). Не «розчиняється» у звичайному сенсі, а реагує: H⁺ + OH⁻ → H₂O.'};
  if(s==='d'||s==='—')return{badge:'—',cls:'d',short:'Не існує',full:'<b>Не існує</b> або <b>розкладається водою</b> — ця сполука або не утворюється в звичайних умовах, або миттєво гідролізується при контакті з водою.'};
  return{badge:s,cls:'s',short:s,full:s};
}

let solTableInited=false;
function initSolTable(){
  if(solTableInited)return;
  solTableInited=true;
  const tbl=document.getElementById('sol-table');
  let html='<thead><tr><th>Катіон \\ Аніон</th>';
  SOL_ANIONS.forEach(a=>{html+=`<th title="${a.name}">${a.label}<br><span style="font-size:8px;color:#7080b8;font-family:'Inter',sans-serif">${a.name}</span></th>`;});
  html+='</tr></thead><tbody>';
  SOL_CATIONS.forEach(cat=>{
    const row=SOL_DATA[cat.id];
    html+=`<tr><th class="row-head">${cat.label}<br><span style="font-size:8px;color:#7080b8;font-family:'Inter',sans-serif;font-weight:400">${cat.name}</span></th>`;
    row.forEach((s,ai)=>{
      const an=SOL_ANIONS[ai];
      const st=getSolStatus(s);
      html+=`<td class="${st.cls}" onclick="showSolExpl('${cat.id}','${an.id}','${s}')" title="${cat.name} + ${an.name}">${st.badge}</td>`;
    });
    html+='</tr>';
  });
  html+='</tbody>';
  tbl.innerHTML=html;
}

function showSolExpl(catId,anId,s){
  document.querySelectorAll('.sol-table td.act').forEach(td=>td.classList.remove('act'));
  event.target.classList.add('act');
  const cat=SOL_CATIONS.find(c=>c.id===catId);
  const an=SOL_ANIONS.find(a=>a.id===anId);
  const key=`${catId}_${anId}`;
  const st=getSolStatus(s);
  const compName=SOL_NAMES[key]||buildCompName(cat,an);
  const specificExpl=SOL_EXPLS[key]||'';
  const box=document.getElementById('sol-expl-box');
  box.className='sol-expl-box has-data';
  box.innerHTML=`
    <div class="sol-expl-title">📌 ${cat.name} + ${an.name}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px;flex-wrap:wrap">
      <div class="sol-expl-compound">${compName}</div>
      <span style="background:rgba(${st.cls==='s'?'0,229,204':st.cls==='n'?'255,82,82':st.cls==='m'?'255,179,0':st.cls==='r'?'206,147,216':'84,110,122'},0.15);color:${st.cls==='s'?'#00E5CC':st.cls==='n'?'#FF5252':st.cls==='m'?'#FFB300':st.cls==='r'?'#CE93D8':'#546E7A'};font-family:'Oxanium',monospace;font-size:14px;font-weight:700;padding:4px 12px;border-radius:5px">${st.badge} — ${st.short}</span>
    </div>
    <div class="sol-expl-text">${st.full}${specificExpl?'<hr style="border:none;border-top:0.5px solid #1e2240;margin:10px 0">'+specificExpl:''}</div>`;
}

// ============ Стандартна обгортка TABLE_SOLUBILITY (A3: стандартизація) ============
function buildCompName(cat,an){
  return `${cat.label} + ${an.label}`;
}

const TABLE_SOLUBILITY = {
  id: 'solubility',
  title: 'Таблиця розчинності',
  topic: '4-3-electrolytes',
  data: [],  // дані в SOL_CATIONS, SOL_ANIONS, SOL_DATA
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">📋 Таблиця розчинності</div>
      <div class="sol-legend">
        <div class="sol-leg-item"><span class="sol-leg-badge" style="color:#00E5CC">Р</span>Розчинна (&gt; 1 г/100 мл)</div>
        <div class="sol-leg-item"><span class="sol-leg-badge" style="color:#FF5252">Н</span>Нерозчинна (&lt; 0.01 г/100 мл)</div>
        <div class="sol-leg-item"><span class="sol-leg-badge" style="color:#FFB300">М</span>Малорозчинна (0.01–1 г/100 мл)</div>
        <div class="sol-leg-item"><span class="sol-leg-badge" style="color:#CE93D8">Р*</span>Розчиняється з реакцією</div>
        <div class="sol-leg-item"><span class="sol-leg-badge" style="color:#546E7A">—</span>Не існує або розкладається водою</div>
      </div>
      <div class="sol-table-wrap"><table class="sol-table" id="sol-table"></table></div>
      <div class="sol-expl-box" id="sol-expl-box">
        <div class="sol-expl-empty">👆 Клацніть на клітинку таблиці, щоб побачити пояснення</div>
      </div>`;
    solTableInited = false;
    initSolTable();
  }
};
