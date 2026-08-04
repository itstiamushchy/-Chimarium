// ============ Т-02: КОНСТАНТИ ДИСОЦІАЦІЇ КИСЛОТ І ОСНОВ ============
// Константи дисоціації при 25°C у водному розчині
// Джерела: NIST Chemistry WebBook, CRC Handbook of Chemistry and Physics 97th ed.,
//          Atkins' Physical Chemistry 10th ed.

const TABLE_DISSOCIATION = {
  id: 'dissociation',
  title: 'Константи дисоціації кислот і основ',
  topic: '4-3-electrolytes',
  data: [
    // КИСЛОТИ
    {name:'Хлоридна (соляна)',     formula:'HCl',         ka:1e7,        pka:-7.0,  type:'acid', note:'Сильна кислота (повна дисоціація)'},
    {name:'Сульфатна (1-й ступ.)', formula:'H₂SO₄',      ka:1e3,        pka:-3.0,  type:'acid', note:'1-й ступінь — сильна кислота'},
    {name:'Нітратна',              formula:'HNO₃',        ka:24,         pka:-1.38, type:'acid', note:'Сильна кислота'},
    {name:'Йодидна',               formula:'HI',          ka:3e9,        pka:-9.5,  type:'acid', note:'Сильна кислота'},
    {name:'Оксалатна (1-й ст.)',   formula:'H₂C₂O₄',     ka:5.9e-2,     pka:1.23,  type:'acid', note:'Щавлева кислота, 1-й ступінь'},
    {name:'Сульфатна (2-й ступ.)', formula:'HSO₄⁻',      ka:1.2e-2,     pka:1.92,  type:'acid', note:'2-й ступінь дисоціації H₂SO₄'},
    {name:'Фосфатна (1-й ст.)',    formula:'H₃PO₄',      ka:7.5e-3,     pka:2.12,  type:'acid', note:'Ортофосфорна кислота, 1-й ступінь'},
    {name:'Флуоридна',             formula:'HF',          ka:6.8e-4,     pka:3.17,  type:'acid', note:'Слабка кислота, корозійна'},
    {name:'Нітритна',              formula:'HNO₂',        ka:4.0e-4,     pka:3.40,  type:'acid', note:'Азотиста кислота'},
    {name:'Оксалатна (2-й ст.)',   formula:'HC₂O₄⁻',     ka:6.4e-5,     pka:4.19,  type:'acid', note:'Щавлева кислота, 2-й ступінь'},
    {name:'Оцтова',                formula:'CH₃COOH',     ka:1.74e-5,    pka:4.76,  type:'acid', note:'Найвідоміша слабка кислота'},
    {name:'Карбонатна (1-й ст.)',  formula:'H₂CO₃',      ka:4.3e-7,     pka:6.37,  type:'acid', note:'Вугільна кислота, 1-й ступінь'},
    {name:'Сірководнева (1-й ст.)',formula:'H₂S',         ka:9.1e-8,     pka:7.04,  type:'acid', note:'1-й ступінь'},
    {name:'Гіпохлоритна',          formula:'HClO',        ka:3.0e-8,     pka:7.52,  type:'acid', note:'Хлорнувата(I) кислота'},
    {name:'Ціанідна',              formula:'HCN',         ka:6.2e-10,    pka:9.21,  type:'acid', note:'Синильна кислота'},
    {name:'Борна',                 formula:'H₃BO₃',      ka:5.8e-10,    pka:9.24,  type:'acid', note:'Борна кислота, 1-й ступінь'},
    {name:'Фосфатна (2-й ст.)',    formula:'H₂PO₄⁻',     ka:6.2e-8,     pka:7.21,  type:'acid', note:'2-й ступінь H₃PO₄'},
    {name:'Карбонатна (2-й ст.)',  formula:'HCO₃⁻',      ka:4.7e-11,    pka:10.33, type:'acid', note:'Вугільна кислота, 2-й ступінь'},
    {name:'Фосфатна (3-й ст.)',    formula:'HPO₄²⁻',     ka:2.14e-13,   pka:12.67, type:'acid', note:'3-й ступінь H₃PO₄'},
    {name:'Силікатна (1-й ст.)',   formula:'H₂SiO₃',     ka:1.7e-10,    pka:9.77,  type:'acid', note:'1-й ступінь'},
    {name:'Сірководнева (2-й ст.)',formula:'HS⁻',         ka:1.2e-14,    pka:13.92, type:'acid', note:'2-й ступінь H₂S'},
    {name:'Сульфітна (1-й ст.)',   formula:'H₂SO₃',      ka:1.7e-2,     pka:1.77,  type:'acid', note:'Сірчиста кислота, 1-й ступінь'},
    // ОСНОВИ
    {name:'Натрій гідроксид',      formula:'NaOH',        kb:1e1,        pkb:-1.0,  type:'base', note:'Сильна основа (їдкий натр)'},
    {name:'Калій гідроксид',       formula:'KOH',         kb:1e1,        pkb:-1.0,  type:'base', note:'Сильна основа'},
    {name:'Кальцій гідроксид',     formula:'Ca(OH)₂',     kb:3.7e-3,     pkb:2.43,  type:'base', note:'Гашене вапно, помірна основа'},
    {name:'Аміак (аміачна вода)',   formula:'NH₃·H₂O',    kb:1.8e-5,     pkb:4.74,  type:'base', note:'Слабка основа'},
    {name:'Метиламін',             formula:'CH₃NH₂',      kb:4.4e-4,     pkb:3.36,  type:'base', note:'Первинний амін, сильніший за NH₃'},
    {name:'Диметиламін',           formula:'(CH₃)₂NH',    kb:5.9e-4,     pkb:3.23,  type:'base', note:'Вторинний амін'},
    {name:'Триметиламін',          formula:'(CH₃)₃N',     kb:6.3e-5,     pkb:4.20,  type:'base', note:'Третинний амін'},
    {name:'Етиламін',              formula:'C₂H₅NH₂',     kb:5.6e-4,     pkb:3.25,  type:'base', note:'Первинний алкіламін'},
    {name:'Анілін',                formula:'C₆H₅NH₂',     kb:4.3e-10,    pkb:9.37,  type:'base', note:'Ароматичний амін, дуже слабка основа'},
    {name:'Піридин',               formula:'C₅H₅N',       kb:1.7e-9,     pkb:8.77,  type:'base', note:'Гетероциклічна основа'},
    {name:'Гідразин',              formula:'N₂H₄',        kb:1.0e-6,     pkb:6.00,  type:'base', note:'Діазин, слабка основа'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const acids = this.data.filter(r=>r.type==='acid');
    const bases = this.data.filter(r=>r.type==='base');
    const fmtK = v => {
      if (Math.abs(v) >= 1) return v.toExponential(1);
      const exp = Math.floor(Math.log10(v));
      const m = (v / Math.pow(10, exp)).toFixed(2);
      return `${m}×10<sup>${exp}</sup>`;
    };
    const row = (r,isAcid) => {
      const K = isAcid ? r.ka : r.kb;
      const pK = isAcid ? r.pka : r.pkb;
      const col = isAcid
        ? (pK < 0 ? '#FF5252' : pK < 4 ? '#FFB300' : pK < 8 ? '#4FC3F7' : '#7080b8')
        : (pK < 0 ? '#FF5252' : pK < 5 ? '#FFB300' : '#7080b8');
      return `<tr style="border-bottom:0.5px solid #1e2240" title="${r.note}">
        <td style="padding:6px 10px;color:#fff;font-size:12px">${r.name}</td>
        <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#CE93D8;font-size:12px">${r.formula}</td>
        <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#4FC3F7;font-size:11px;white-space:nowrap">${fmtK(K)}</td>
        <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:${col};font-weight:700;font-size:13px">${pK.toFixed(2)}</td>
      </tr>`;
    };
    const thead = (kLabel, pkLabel) => `<thead><tr style="border-bottom:1px solid #1e2240">
      <th style="padding:8px 10px;text-align:left;color:#7080b8;font-size:12px">Назва</th>
      <th style="padding:8px 10px;text-align:left;color:#7080b8;font-size:12px">Формула</th>
      <th style="padding:8px 10px;text-align:left;color:#7080b8;font-size:12px">${kLabel}</th>
      <th style="padding:8px 10px;text-align:left;color:#7080b8;font-size:12px">${pkLabel}</th>
    </tr></thead>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧪 Константи дисоціації кислот і основ</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Константи при 25°C. <span style="color:#FF5252">Червоний</span> — сильна, <span style="color:#FFB300">жовтий</span> — помірна, <span style="color:#4FC3F7">блакитний</span> — слабка. Наведіть мишку на рядок для примітки.
      </div>
      <div style="font-family:'Oxanium',monospace;color:#4FC3F7;font-size:13px;font-weight:700;margin-bottom:6px">КИСЛОТИ (${acids.length})</div>
      <div style="overflow-x:auto;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        ${thead('Ka','pKa')}
        <tbody>${acids.map(r=>row(r,true)).join('')}</tbody>
      </table></div>
      <div style="font-family:'Oxanium',monospace;color:#00E5CC;font-size:13px;font-weight:700;margin-bottom:6px">ОСНОВИ (${bases.length})</div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        ${thead('Kb','pKb')}
        <tbody>${bases.map(r=>row(r,false)).join('')}</tbody>
      </table></div>
      <div style="margin-top:14px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
        💡 pKa = −lg(Ka). Чим менше pKa — тим сильніша кислота. Зв'язок: pKa + pKb = 14 (при 25°C).
      </div>`;
    c.innerHTML = html;
  }
};
