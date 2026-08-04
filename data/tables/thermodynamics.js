// ============ Т-04: ТЕРМОДИНАМІЧНІ КОНСТАНТИ РЕЧОВИН ============
// Стандартні термодинамічні величини при 25°C (298.15 K), 1 бар
// ΔHf° — стандартна ентальпія утворення (кДж/моль)
// S°    — стандартна ентропія (Дж/(моль·К))
// ΔGf° — стандартна енергія Гіббса утворення (кДж/моль)
// Cp    — молярна теплоємність (Дж/(моль·К))
// Джерело: NIST-JANAF Thermochemical Tables, 4th ed.; NIST Chemistry WebBook

const TABLE_THERMODYNAMICS = {
  id: 'thermodynamics',
  title: 'Термодинамічні константи речовин',
  topic: '3-1-thermodynamics',
  data: [
    // ЕЛЕМЕНТИ (стандартний стан — 0)
    {name:'Водень',             formula:'H₂',      state:'g', dHf:0,       S:130.7, dGf:0,       Cp:28.8,  group:'element'},
    {name:'Кисень',             formula:'O₂',      state:'g', dHf:0,       S:205.2, dGf:0,       Cp:29.4,  group:'element'},
    {name:'Азот',               formula:'N₂',      state:'g', dHf:0,       S:191.6, dGf:0,       Cp:29.1,  group:'element'},
    {name:'Вуглець (графіт)',   formula:'C',       state:'s', dHf:0,       S:5.74,  dGf:0,       Cp:8.53,  group:'element'},
    {name:'Сірка (ромб.)',      formula:'S',       state:'s', dHf:0,       S:32.1,  dGf:0,       Cp:22.6,  group:'element'},
    // НЕОРГАНІЧНІ СПОЛУКИ
    {name:'Вода',               formula:'H₂O',     state:'l', dHf:-285.8,  S:70.0,  dGf:-237.1,  Cp:75.3,  group:'inorganic'},
    {name:'Вода (пара)',         formula:'H₂O',     state:'g', dHf:-241.8,  S:188.8, dGf:-228.6,  Cp:33.6,  group:'inorganic'},
    {name:'Аміак',              formula:'NH₃',     state:'g', dHf:-46.1,   S:192.8, dGf:-16.5,   Cp:35.1,  group:'inorganic'},
    {name:'Хлороводень',        formula:'HCl',     state:'g', dHf:-92.3,   S:186.9, dGf:-95.3,   Cp:29.1,  group:'inorganic'},
    {name:'Сірководень',        formula:'H₂S',     state:'g', dHf:-20.6,   S:205.8, dGf:-33.4,   Cp:34.2,  group:'inorganic'},
    {name:'Вуглекислий газ',    formula:'CO₂',     state:'g', dHf:-393.5,  S:213.8, dGf:-394.4,  Cp:37.1,  group:'inorganic'},
    {name:'Чадний газ',         formula:'CO',      state:'g', dHf:-110.5,  S:197.7, dGf:-137.2,  Cp:29.1,  group:'inorganic'},
    {name:'Оксид сірки(IV)',    formula:'SO₂',     state:'g', dHf:-296.8,  S:248.2, dGf:-300.2,  Cp:39.9,  group:'inorganic'},
    {name:'Оксид сірки(VI)',    formula:'SO₃',     state:'g', dHf:-395.7,  S:256.8, dGf:-371.1,  Cp:50.7,  group:'inorganic'},
    {name:'Оксид азоту(II)',    formula:'NO',      state:'g', dHf:91.3,    S:210.8, dGf:87.6,    Cp:29.8,  group:'inorganic'},
    {name:'Оксид азоту(IV)',    formula:'NO₂',     state:'g', dHf:33.2,    S:240.1, dGf:51.3,    Cp:37.2,  group:'inorganic'},
    {name:'Натрій хлорид',      formula:'NaCl',    state:'s', dHf:-411.2,  S:72.1,  dGf:-384.1,  Cp:50.5,  group:'inorganic'},
    {name:'Кальцій карбонат',   formula:'CaCO₃',   state:'s', dHf:-1207.6, S:91.7,  dGf:-1128.8, Cp:83.5,  group:'inorganic'},
    {name:'Оксид алюмінію',     formula:'Al₂O₃',   state:'s', dHf:-1675.7, S:50.9,  dGf:-1582.3, Cp:79.0,  group:'inorganic'},
    {name:'Сульфатна кислота',  formula:'H₂SO₄',   state:'l', dHf:-814.0,  S:156.9, dGf:-690.0,  Cp:138.9, group:'inorganic'},
    {name:'Натрій гідроксид',   formula:'NaOH',    state:'s', dHf:-425.6,  S:64.5,  dGf:-379.5,  Cp:59.5,  group:'inorganic'},
    // ОРГАНІЧНІ СПОЛУКИ
    {name:'Метан',              formula:'CH₄',     state:'g', dHf:-74.8,   S:186.3, dGf:-50.7,   Cp:35.5,  group:'organic'},
    {name:'Етан',               formula:'C₂H₆',    state:'g', dHf:-84.7,   S:229.6, dGf:-32.8,   Cp:52.5,  group:'organic'},
    {name:'Пропан',             formula:'C₃H₈',    state:'g', dHf:-103.8,  S:270.3, dGf:-23.5,   Cp:73.6,  group:'organic'},
    {name:'Бутан',              formula:'C₄H₁₀',   state:'g', dHf:-126.2,  S:310.2, dGf:-17.2,   Cp:97.5,  group:'organic'},
    {name:'Етилен',             formula:'C₂H₄',    state:'g', dHf:52.5,    S:219.6, dGf:68.4,    Cp:43.6,  group:'organic'},
    {name:'Ацетилен',           formula:'C₂H₂',    state:'g', dHf:226.7,   S:200.9, dGf:209.2,   Cp:44.0,  group:'organic'},
    {name:'Бензол',             formula:'C₆H₆',    state:'l', dHf:49.1,    S:173.4, dGf:124.5,   Cp:136.0, group:'organic'},
    {name:'Етанол',             formula:'C₂H₅OH',  state:'l', dHf:-277.7,  S:160.7, dGf:-174.9,  Cp:112.3, group:'organic'},
    {name:'Метанол',            formula:'CH₃OH',   state:'l', dHf:-238.7,  S:126.8, dGf:-166.3,  Cp:81.6,  group:'organic'},
    {name:'Оцтова кислота',     formula:'CH₃COOH', state:'l', dHf:-484.5,  S:159.8, dGf:-389.9,  Cp:123.4, group:'organic'},
    {name:'Глюкоза',            formula:'C₆H₁₂O₆', state:'s', dHf:-1273.3, S:212.1, dGf:-910.4,  Cp:219.2, group:'organic'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      element:   {label:'Прості речовини (елементи)', col:'#7080b8'},
      inorganic: {label:'Неорганічні сполуки',         col:'#4FC3F7'},
      organic:   {label:'Органічні сполуки',           col:'#00E5CC'},
    };
    const stateLabel = s => ({'g':'(г)','l':'(р)','s':'(к)'}[s]||s);
    const fmtV = v => v === 0 ? '<span style="color:#7080b8">0</span>' :
      `<span style="color:${v<0?'#FF5252':'#4FC3F7'}">${v.toFixed(1)}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🌡️ Термодинамічні константи речовин</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:6px;line-height:1.6">
        Стандартні значення при 25°C (298.15 K), 1 бар. Джерело: NIST-JANAF.
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;font-size:11px;color:#7080b8">
        <span><b style="color:#fff">ΔHf°</b> — ентальпія утворення (кДж/моль)</span>
        <span><b style="color:#fff">S°</b> — ентропія (Дж/(моль·К))</span>
        <span><b style="color:#fff">ΔGf°</b> — енергія Гіббса (кДж/моль)</span>
        <span><b style="color:#fff">Cp</b> — теплоємність (Дж/(моль·К))</span>
      </div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r=>r.group===type);
      html += `<div style="font-family:'Oxanium',monospace;color:${g.col};font-size:13px;font-weight:700;margin:14px 0 6px">${g.label} (${rows.length})</div>
      <div style="overflow-x:auto;margin-bottom:8px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:6px 8px;text-align:left;color:#7080b8;white-space:nowrap">Речовина</th>
          <th style="padding:6px 8px;text-align:left;color:#7080b8">Формула</th>
          <th style="padding:6px 8px;text-align:center;color:#7080b8">Стан</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8;white-space:nowrap">ΔHf°</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8">S°</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8;white-space:nowrap">ΔGf°</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8">Cp</th>
        </tr></thead>
        <tbody>`;
      rows.forEach(r => {
        html += `<tr style="border-bottom:0.5px solid #1e2240">
          <td style="padding:5px 8px;color:#fff;white-space:nowrap">${r.name}</td>
          <td style="padding:5px 8px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
          <td style="padding:5px 8px;text-align:center;color:#7080b8">${stateLabel(r.state)}</td>
          <td style="padding:5px 8px;text-align:right;font-family:'Oxanium',monospace">${fmtV(r.dHf)}</td>
          <td style="padding:5px 8px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.S.toFixed(1)}</td>
          <td style="padding:5px 8px;text-align:right;font-family:'Oxanium',monospace">${fmtV(r.dGf)}</td>
          <td style="padding:5px 8px;text-align:right;font-family:'Oxanium',monospace;color:#7080b8">${r.Cp.toFixed(1)}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
    });
    html += `<div style="margin-top:12px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
      💡 ΔG° = ΔH° − T·ΔS°. Якщо ΔGf° < 0 — сполука термодинамічно стабільна. ΔH° реакції = Σ ΔHf°(продуктів) − Σ ΔHf°(реагентів).
    </div>`;
    c.innerHTML = html;
  }
};
