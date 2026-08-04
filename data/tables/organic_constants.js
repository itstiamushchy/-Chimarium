// ============ Т-46: ОРГАНІЧНА ХІМІЯ — ФІЗИКО-ХІМІЧНІ КОНСТАНТИ ============
// Джерела: CRC Handbook of Chemistry and Physics, 104th ed. (2023);
//          NIST WebBook (webbook.nist.gov); Lide «CRC Handbook» 85th ed.;
//          Atkins «Physical Chemistry» 11th ed.

const TABLE_ORGANIC_CONSTANTS = {
  id: 'organic_constants',
  title: 'Органічна хімія — фізико-хімічні константи',
  topic: '5-1-organic-basics',
  data: [
    // Алкани
    {name:'Метан',           formula:'CH₄',          bp:-161.5, mp:-182.5, density:0.423,  state:'газ',    class:'алкан'},
    {name:'Етан',            formula:'C₂H₆',         bp: -88.6, mp:-183.3, density:0.546,  state:'газ',    class:'алкан'},
    {name:'Пропан',          formula:'C₃H₈',         bp: -42.1, mp:-187.7, density:0.501,  state:'газ',    class:'алкан'},
    {name:'Бутан',           formula:'C₄H₁₀',        bp:  -0.5, mp:-138.4, density:0.579,  state:'газ',    class:'алкан'},
    {name:'Пентан',          formula:'C₅H₁₂',        bp:  36.1, mp:-129.7, density:0.626,  state:'рідина', class:'алкан'},
    {name:'Гексан',          formula:'C₆H₁₄',        bp:  68.7, mp: -95.4, density:0.659,  state:'рідина', class:'алкан'},
    {name:'Гептан',          formula:'C₇H₁₆',        bp:  98.4, mp: -90.6, density:0.684,  state:'рідина', class:'алкан'},
    {name:'Октан',           formula:'C₈H₁₈',        bp: 125.7, mp: -56.8, density:0.703,  state:'рідина', class:'алкан'},
    {name:'Декан',           formula:'C₁₀H₂₂',       bp: 174.1, mp: -29.7, density:0.730,  state:'рідина', class:'алкан'},
    // Алкени
    {name:'Етилен (Етен)',   formula:'C₂H₄',         bp:-103.7, mp:-169.4, density:0.570,  state:'газ',    class:'алкен'},
    {name:'Пропен',          formula:'C₃H₆',         bp: -47.6, mp:-185.2, density:0.514,  state:'газ',    class:'алкен'},
    {name:'1-Бутен',         formula:'C₄H₈',         bp:  -6.3, mp:-185.4, density:0.595,  state:'газ',    class:'алкен'},
    {name:'1-Пентен',        formula:'C₅H₁₀',        bp:  30.0, mp:-138.0, density:0.641,  state:'рідина', class:'алкен'},
    {name:'1-Гексен',        formula:'C₆H₁₂',        bp:  63.5, mp:-139.8, density:0.673,  state:'рідина', class:'алкен'},
    // Алкіни
    {name:'Ацетилен (Етин)', formula:'C₂H₂',         bp: -84.0, mp: -80.8, density:0.620,  state:'газ',    class:'алкін'},
    {name:'Пропін',          formula:'C₃H₄',         bp: -23.2, mp:-101.5, density:0.670,  state:'газ',    class:'алкін'},
    // Арени
    {name:'Бензен',          formula:'C₆H₆',         bp:  80.1, mp:   5.5, density:0.879,  state:'рідина', class:'арен'},
    {name:'Толуен',          formula:'C₇H₈',         bp: 110.6, mp: -94.9, density:0.867,  state:'рідина', class:'арен'},
    {name:'о-Ксилен',        formula:'C₈H₁₀',        bp: 144.4, mp: -25.2, density:0.880,  state:'рідина', class:'арен'},
    {name:'Нафтален',        formula:'C₁₀H₈',        bp: 218.0, mp:  80.3, density:1.025,  state:'тверде', class:'арен'},
    {name:'Стирен',          formula:'C₈H₈',         bp: 145.0, mp: -30.6, density:0.909,  state:'рідина', class:'арен'},
    // Спирти
    {name:'Метанол',         formula:'CH₃OH',         bp:  64.7, mp: -97.8, density:0.791,  state:'рідина', class:'спирт'},
    {name:'Етанол',          formula:'C₂H₅OH',        bp:  78.4, mp:-114.1, density:0.789,  state:'рідина', class:'спирт'},
    {name:'1-Пропанол',      formula:'C₃H₇OH',        bp:  97.2, mp:-126.5, density:0.803,  state:'рідина', class:'спирт'},
    {name:'Гліцерин',        formula:'C₃H₈O₃',        bp: 290.0, mp:  17.9, density:1.261,  state:'рідина', class:'спирт'},
    {name:'Фенол',           formula:'C₆H₅OH',        bp: 181.8, mp:  40.9, density:1.071,  state:'тверде', class:'спирт'},
    // Кислоти
    {name:'Мурашина кислота',formula:'HCOOH',         bp: 100.8, mp:   8.3, density:1.220,  state:'рідина', class:'кислота'},
    {name:'Оцтова кислота',  formula:'CH₃COOH',       bp: 117.9, mp:  16.6, density:1.049,  state:'рідина', class:'кислота'},
    {name:'Пропіонова кислота',formula:'C₂H₅COOH',   bp: 141.1, mp: -20.8, density:0.993,  state:'рідина', class:'кислота'},
    {name:'Масляна кислота', formula:'C₃H₇COOH',     bp: 163.8, mp:  -5.1, density:0.958,  state:'рідина', class:'кислота'},
    {name:'Бензойна кислота',formula:'C₆H₅COOH',     bp: 249.0, mp: 122.4, density:1.266,  state:'тверде', class:'кислота'},
    {name:'Щавлева кислота', formula:'(COOH)₂',       bp: 365.0, mp: 189.0, density:1.900,  state:'тверде', class:'кислота'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const classColors = {
      'алкан':  '#4FC3F7',
      'алкен':  '#69F0AE',
      'алкін':  '#FFB300',
      'арен':   '#CE93D8',
      'спирт':  '#FF8A65',
      'кислота':'#FF5252',
    };
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🧪 Органічна хімія — фізико-хімічні константи</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: CRC Handbook 104th ed. (2023) · NIST WebBook · Atkins Physical Chemistry 11th ed.</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
        ${Object.entries(classColors).map(([cls,col])=>`<span style="background:rgba(0,0,0,0.3);border:0.5px solid ${col}44;border-radius:5px;padding:3px 10px;font-size:11px;color:${col}">${cls}</span>`).join('')}
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Назва</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Формула</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Tкип (°C)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Tпл (°C)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">ρ (г/мл)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Стан</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>{
            const col = classColors[r.class] || '#7080b8';
            return `
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff">${r.name} <span style="font-size:10px;color:${col};border:0.5px solid ${col}44;border-radius:3px;padding:1px 5px;margin-left:4px">${r.class}</span></td>
            <td style="padding:8px 10px;color:#CE93D8;font-family:'Oxanium',monospace;font-size:11px">${r.formula}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300">${r.bp}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#80CBC4">${r.mp}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#69F0AE">${r.density}</td>
            <td style="padding:8px 10px;text-align:center;color:#7080b8">${r.state}</td>
          </tr>`;}).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
