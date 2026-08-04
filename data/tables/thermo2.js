// ============ Т-51: ТЕРМОДИНАМІЧНІ КОНСТАНТИ — ГРУПА 2 ============
// Стандартні термодинамічні величини при 25°C (298.15 K), 1 бар
// ΔHf° — стандартна ентальпія утворення (кДж/моль)
// S°    — стандартна ентропія (Дж/(моль·К))
// ΔGf° — стандартна енергія Гіббса утворення (кДж/моль)
// Cp    — молярна теплоємність (Дж/(моль·К))
// Джерело: NIST-JANAF Thermochemical Tables, 4th ed.; NIST Chemistry WebBook; Atkins Physical Chemistry 11th ed.

const TABLE_THERMO2 = {
  id: 'thermo2',
  title: 'Термодинамічні константи — група 2',
  topic: '3-1-thermodynamics',
  data: [
    // НЕОРГАНІЧНІ СПОЛУКИ (відсутні в thermodynamics.js)
    {name:'Фосфор пентахлорид',   formula:'PCl₅',    state:'g', dHf:-374.9,   S:364.6, dGf:-305.0,   Cp:112.8, group:'inorganic'},
    {name:'Фосфор трихлорид',     formula:'PCl₃',    state:'g', dHf:-287.0,   S:311.8, dGf:-267.8,   Cp:71.8,  group:'inorganic'},
    {name:'Оксид фосфору(V)',      formula:'P₂O₅',    state:'s', dHf:-1492.0,  S:114.5, dGf:-1348.8,  Cp:143.1, group:'inorganic'},
    {name:'Флуороводень',          formula:'HF',       state:'g', dHf:-273.3,   S:173.8, dGf:-275.4,   Cp:29.1,  group:'inorganic'},
    {name:'Бромоводень',           formula:'HBr',      state:'g', dHf:-36.3,    S:198.7, dGf:-53.4,    Cp:29.1,  group:'inorganic'},
    {name:'Йодоводень',            formula:'HI',       state:'g', dHf:26.5,     S:206.6, dGf:1.7,      Cp:29.2,  group:'inorganic'},
    {name:'Аміак (рідкий)',        formula:'NH₃',      state:'l', dHf:-80.3,    S:111.3, dGf:-26.5,    Cp:77.1,  group:'inorganic'},
    {name:'Оксид нітрогену(I)',    formula:'N₂O',      state:'g', dHf:82.1,     S:219.9, dGf:104.2,    Cp:38.6,  group:'inorganic'},
    {name:'Пероксид водню',        formula:'H₂O₂',     state:'l', dHf:-187.8,   S:109.6, dGf:-120.4,   Cp:89.1,  group:'inorganic'},
    {name:'Хлор',                  formula:'Cl₂',      state:'g', dHf:0,        S:223.1, dGf:0,        Cp:33.9,  group:'inorganic'},
    {name:'Бром (рідкий)',         formula:'Br₂',      state:'l', dHf:0,        S:152.2, dGf:0,        Cp:75.7,  group:'inorganic'},
    {name:'Йод (кристал)',         formula:'I₂',       state:'s', dHf:0,        S:116.1, dGf:0,        Cp:54.4,  group:'inorganic'},
    {name:'Карбон дисульфід',      formula:'CS₂',      state:'l', dHf:89.0,     S:151.3, dGf:65.3,     Cp:76.4,  group:'inorganic'},
    // ОРГАНІЧНІ СПОЛУКИ (відсутні в thermodynamics.js)
    {name:'Бензол (газ)',          formula:'C₆H₆',     state:'g', dHf:82.9,     S:269.2, dGf:129.7,    Cp:82.4,  group:'organic'},
    {name:'Толуол',                formula:'C₇H₈',     state:'l', dHf:12.0,     S:221.0, dGf:113.6,    Cp:157.3, group:'organic'},
    {name:'Толуол (газ)',          formula:'C₇H₈',     state:'g', dHf:50.0,     S:320.7, dGf:122.0,    Cp:103.6, group:'organic'},
    {name:'Глюкоза (розчин)',      formula:'C₆H₁₂O₆',  state:'aq',dHf:-1263.1,  S:288.9, dGf:-914.5,   Cp:218.0, group:'organic'},
    {name:'Сахароза',              formula:'C₁₂H₂₂O₁₁',state:'s', dHf:-2221.7,  S:360.2, dGf:-1543.5,  Cp:424.3, group:'organic'},
    {name:'Формальдегід',          formula:'HCHO',      state:'g', dHf:-108.6,   S:218.8, dGf:-102.5,   Cp:35.4,  group:'organic'},
    {name:'Ацетон',                formula:'(CH₃)₂CO', state:'l', dHf:-248.4,   S:200.4, dGf:-155.4,   Cp:125.5, group:'organic'},
    {name:'Діетиловий етер',       formula:'(C₂H₅)₂O', state:'l', dHf:-279.5,   S:253.5, dGf:-122.3,   Cp:172.2, group:'organic'},
    {name:'Гексан',                formula:'C₆H₁₄',    state:'l', dHf:-198.7,   S:296.0, dGf:-4.0,     Cp:195.6, group:'organic'},
    {name:'Циклогексан',           formula:'C₆H₁₂',    state:'l', dHf:-156.4,   S:204.3, dGf:26.7,     Cp:154.9, group:'organic'},
    {name:'Хлорметан',             formula:'CH₃Cl',     state:'g', dHf:-83.7,    S:234.4, dGf:-60.2,    Cp:40.8,  group:'organic'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      element:   {label:'Прості речовини', col:'#7080b8'},
      inorganic: {label:'Неорганічні сполуки', col:'#4FC3F7'},
      organic:   {label:'Органічні сполуки', col:'#00E5CC'},
    };
    const stateLabel = s => ({'g':'(г)','l':'(р)','s':'(к)','aq':'(р-н)'}[s]||s);
    const fmtV = v => v === 0 ? '<span style="color:#7080b8">0</span>' :
      `<span style="color:${v<0?'#FF5252':'#4FC3F7'}">${v.toFixed(1)}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🌡️ Термодинамічні константи — група 2</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:6px;line-height:1.6">
        Стандартні значення при 25°C (298.15 K), 1 бар. Речовини відсутні в основній таблиці. Джерело: NIST-JANAF, Atkins.
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;font-size:11px;color:#7080b8">
        <span><b style="color:#fff">ΔHf°</b> — ентальпія утворення (кДж/моль)</span>
        <span><b style="color:#fff">S°</b> — ентропія (Дж/(моль·К))</span>
        <span><b style="color:#fff">ΔGf°</b> — енергія Гіббса (кДж/моль)</span>
        <span><b style="color:#fff">Cp</b> — теплоємність (Дж/(моль·К))</span>
      </div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r=>r.group===type);
      if (!rows.length) return;
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
