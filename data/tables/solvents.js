// ============ Т-14: ФІЗИЧНІ ВЛАСТИВОСТІ ОРГАНІЧНИХ РОЗЧИННИКІВ ============
// Джерела: CRC Handbook of Chemistry and Physics, 97th ed.;
// Riddick, Bunger, Sakano "Organic Solvents" (1986); Reichardt "Solvents" (2003)
// bp = температура кипіння (°C, 1 атм), mp = температура плавлення (°C)
// density = г/мл при 20°C, epsilon = діелектрична проникність при 25°C

const TABLE_SOLVENTS = {
  id: 'solvents',
  title: 'Фізичні властивості органічних розчинників',
  topic: '5-1-organic-basics',
  data: [
    {name:'Вода',          formula:'H₂O',           bp:100.0, mp:0.0,    density:0.998, epsilon:80.1,  polarity:'полярний протонний'},
    {name:'Метанол',       formula:'CH₃OH',          bp:64.7,  mp:-97.6,  density:0.791, epsilon:32.6,  polarity:'полярний протонний'},
    {name:'Етанол',        formula:'C₂H₅OH',         bp:78.4,  mp:-114.1, density:0.789, epsilon:24.3,  polarity:'полярний протонний'},
    {name:'Пропан-1-ол',   formula:'C₃H₇OH',         bp:97.2,  mp:-126.5, density:0.803, epsilon:20.1,  polarity:'полярний протонний'},
    {name:'Пропан-2-ол',   formula:'(CH₃)₂CHOH',     bp:82.4,  mp:-88.0,  density:0.786, epsilon:18.3,  polarity:'полярний протонний'},
    {name:'Оцтова кислота',formula:'CH₃COOH',         bp:117.9, mp:16.6,   density:1.049, epsilon:6.2,   polarity:'полярний протонний'},
    {name:'Ацетон',        formula:'(CH₃)₂CO',        bp:56.1,  mp:-94.7,  density:0.791, epsilon:20.7,  polarity:'полярний апротонний'},
    {name:'Діетиловий етер',formula:'(C₂H₅)₂O',      bp:34.6,  mp:-116.3, density:0.713, epsilon:4.3,   polarity:'неполярний'},
    {name:'Тетрагідрофуран',formula:'C₄H₈O',          bp:66.0,  mp:-108.4, density:0.889, epsilon:7.6,   polarity:'полярний апротонний'},
    {name:'Дихлорометан',  formula:'CH₂Cl₂',          bp:39.6,  mp:-96.7,  density:1.325, epsilon:8.9,   polarity:'полярний апротонний'},
    {name:'Хлороформ',     formula:'CHCl₃',           bp:61.2,  mp:-63.5,  density:1.492, epsilon:4.8,   polarity:'слабкополярний'},
    {name:'Чотирихлористий вуглець',formula:'CCl₄',   bp:76.7,  mp:-22.9,  density:1.594, epsilon:2.2,   polarity:'неполярний'},
    {name:'Бензен',        formula:'C₆H₆',            bp:80.1,  mp:5.5,    density:0.879, epsilon:2.3,   polarity:'неполярний'},
    {name:'Толуол',        formula:'C₆H₅CH₃',         bp:110.6, mp:-94.9,  density:0.867, epsilon:2.4,   polarity:'неполярний'},
    {name:'Ксилол (суміш)',formula:'C₆H₄(CH₃)₂',     bp:138.0, mp:-47.0,  density:0.864, epsilon:2.4,   polarity:'неполярний'},
    {name:'Гексан',        formula:'C₆H₁₄',           bp:69.0,  mp:-95.3,  density:0.659, epsilon:1.9,   polarity:'неполярний'},
    {name:'Петролейний ефір',formula:'C₅–C₇ (суміш)',bp:60.0,  mp:null,   density:0.640, epsilon:1.8,   polarity:'неполярний'},
    {name:'Ацетонітрил',   formula:'CH₃CN',           bp:81.6,  mp:-44.0,  density:0.786, epsilon:37.5,  polarity:'полярний апротонний'},
    {name:'ДМСО',          formula:'(CH₃)₂SO',        bp:189.0, mp:18.5,   density:1.100, epsilon:46.7,  polarity:'полярний апротонний'},
    {name:'ДМФА',          formula:'HCON(CH₃)₂',      bp:153.0, mp:-60.4,  density:0.944, epsilon:36.7,  polarity:'полярний апротонний'},
    {name:'Піридин',       formula:'C₅H₅N',           bp:115.2, mp:-41.6,  density:0.982, epsilon:12.4,  polarity:'полярний апротонний'},
    {name:'Диоксан',       formula:'C₄H₈O₂',          bp:101.3, mp:11.8,   density:1.034, epsilon:2.2,   polarity:'неполярний'},
    {name:'Етилацетат',    formula:'CH₃COOC₂H₅',      bp:77.1,  mp:-83.6,  density:0.902, epsilon:6.0,   polarity:'полярний апротонний'},
    {name:'н-Бутанол',     formula:'C₄H₉OH',          bp:117.7, mp:-89.5,  density:0.810, epsilon:17.8,  polarity:'полярний протонний'},
    {name:'Гліцерин',      formula:'C₃H₅(OH)₃',       bp:290.0, mp:18.2,   density:1.261, epsilon:42.5,  polarity:'полярний протонний'},
    {name:'Етиленгліколь', formula:'C₂H₄(OH)₂',       bp:197.6, mp:-13.0,  density:1.113, epsilon:37.7,  polarity:'полярний протонний'},
    {name:'н-Пентан',      formula:'C₅H₁₂',           bp:36.1,  mp:-129.7, density:0.626, epsilon:1.8,   polarity:'неполярний'},
    {name:'Циклогексан',   formula:'C₆H₁₂',           bp:80.7,  mp:6.6,    density:0.779, epsilon:2.0,   polarity:'неполярний'},
    {name:'Мурашина кислота',formula:'HCOOH',          bp:100.8, mp:8.3,    density:1.220, epsilon:58.5,  polarity:'полярний протонний'},
    {name:'Нітрометан',    formula:'CH₃NO₂',           bp:101.2, mp:-28.6,  density:1.137, epsilon:35.9,  polarity:'полярний апротонний'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const polColors = {
      'полярний протонний':'#4FC3F7',
      'полярний апротонний':'#CE93D8',
      'слабкополярний':'#FFB300',
      'неполярний':'#546E7A'
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧴 Фізичні властивості органічних розчинників</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        <b style="color:#4FC3F7">Tкип/Tпл</b> — °C при 1 атм; <b style="color:#00E5CC">ρ</b> — г/мл при 20°C; 
        <b style="color:#CE93D8">ε</b> — діелектрична проникність при 25°C (безрозмірна).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="border-bottom:1px solid #1e2240">
            <th style="padding:8px 10px;text-align:left;color:#7080b8">Назва</th>
            <th style="padding:8px 10px;text-align:left;color:#7080b8">Формула</th>
            <th style="padding:8px 10px;text-align:right;color:#4FC3F7">Tкип (°C)</th>
            <th style="padding:8px 10px;text-align:right;color:#4FC3F7">Tпл (°C)</th>
            <th style="padding:8px 10px;text-align:right;color:#00E5CC">ρ (г/мл)</th>
            <th style="padding:8px 10px;text-align:right;color:#CE93D8">ε</th>
            <th style="padding:8px 10px;text-align:left;color:#7080b8">Тип</th>
          </tr>
        </thead>
        <tbody>`;
    this.data.forEach(r => {
      const col = polColors[r.polarity] || '#7080b8';
      html += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:6px 10px;color:#fff;font-weight:600">${r.name}</td>
        <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#4FC3F7;font-size:11px">${r.formula}</td>
        <td style="padding:6px 10px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300">${r.bp.toFixed(1)}</td>
        <td style="padding:6px 10px;text-align:right;font-family:'Oxanium',monospace;color:#7080b8">${r.mp !== null ? r.mp.toFixed(1) : '—'}</td>
        <td style="padding:6px 10px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC">${r.density.toFixed(3)}</td>
        <td style="padding:6px 10px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:700">${r.epsilon.toFixed(1)}</td>
        <td style="padding:6px 10px"><span style="color:${col};font-size:11px">${r.polarity}</span></td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:16px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Правило «подібне розчиняє подібне»:</b> полярні розчинники (велике ε) розчиняють іонні та полярні речовини; 
        неполярні (мале ε) — жири, вуглеводні. Протонні розчинники (OH, COOH) утворюють водневі зв'язки.
      </div>`;
    c.innerHTML = html;
  }
};
