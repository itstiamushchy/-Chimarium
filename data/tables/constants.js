// ============ Т-21: ФУНДАМЕНТАЛЬНІ ФІЗИКО-ХІМІЧНІ КОНСТАНТИ ============
// Джерело: CODATA 2018 (NIST), SI Brochure 9th edition (2019)
// Точні значення станом на 2019 р. (redefinition of SI)

const TABLE_CONSTANTS = {
  id: 'constants',
  title: 'Фундаментальні фізико-хімічні константи',
  topic: '1-5-gases',
  data: [
    {name:'Стала Авогадро',               symbol:'Nₐ',    value:'6.02214076×10²³',  unit:'моль⁻¹',            note:'Точне визначення SI (2019)'},
    {name:'Універсальна газова стала',    symbol:'R',     value:'8.314462618',      unit:'Дж/(моль·К)',        note:'R = Nₐ · kB'},
    {name:'Стала Больцмана',             symbol:'kB',    value:'1.380649×10⁻²³',   unit:'Дж/К',              note:'Точне визначення SI (2019)'},
    {name:'Стала Фарадея',               symbol:'F',     value:'96485.33212',      unit:'Кл/моль',            note:'F = Nₐ · e'},
    {name:'Елементарний заряд',          symbol:'e',     value:'1.602176634×10⁻¹⁹',unit:'Кл',                note:'Точне визначення SI (2019)'},
    {name:'Стала Планка',                symbol:'h',     value:'6.62607015×10⁻³⁴', unit:'Дж·с',              note:'Точне визначення SI (2019)'},
    {name:'Зведена стала Планка',        symbol:'ℏ',     value:'1.054571817×10⁻³⁴',unit:'Дж·с',              note:'ℏ = h / (2π)'},
    {name:'Швидкість світла у вакуумі',  symbol:'c',     value:'2.99792458×10⁸',   unit:'м/с',               note:'Точне визначення (1983)'},
    {name:'Електрична стала (вакуум)',   symbol:'ε₀',    value:'8.8541878128×10⁻¹²',unit:'Ф/м',             note:'ε₀ = 1/(μ₀c²)'},
    {name:'Магнітна стала (вакуум)',     symbol:'μ₀',    value:'1.25663706212×10⁻⁶',unit:'Гн/м',            note:'μ₀ = 4π×10⁻⁷ (апрокс.)'},
    {name:'Маса спокою електрона',       symbol:'mₑ',    value:'9.1093837015×10⁻³¹',unit:'кг',              note:'mₑ = 0.51100 МеВ/c²'},
    {name:'Маса спокою протона',         symbol:'mₚ',    value:'1.67262192369×10⁻²⁷',unit:'кг',            note:'mₚ/mₑ ≈ 1836.15'},
    {name:'Маса спокою нейтрона',        symbol:'mₙ',    value:'1.67492749804×10⁻²⁷',unit:'кг',            note:'mₙ > mₚ на 1.293 МеВ/c²'},
    {name:'Атомна одиниця маси',         symbol:'u',     value:'1.66053906660×10⁻²⁷',unit:'кг',            note:'1/12 маси ¹²C; 931.494 МеВ/c²'},
    {name:'Стандартне прискорення вільного падіння', symbol:'g', value:'9.80665',  unit:'м/с²',              note:'Конвенційне значення ISO 80000-3'},
    {name:'Стандартний атмосферний тиск',symbol:'p°',    value:'101325',           unit:'Па',                note:'1 атм = 101325 Па (точно)'},
    {name:'Стала Стефана-Больцмана',     symbol:'σ',     value:'5.670374419×10⁻⁸', unit:'Вт/(м²·К⁴)',        note:'σ = 2π⁵kB⁴/(15h³c²)'},
    {name:'Число Лошмідта (0°C, 1 атм)', symbol:'nL',   value:'2.6867774×10²⁵',   unit:'м⁻³',               note:'Концентрація ідеального газу'},
    {name:'Молярний об\'єм ідеального газу (0°C, 1 атм)', symbol:'Vm', value:'22.41396954', unit:'л/моль', note:'T=273.15 K, p=101.325 кПа'},
    {name:'Стала тонкої структури',      symbol:'α',     value:'7.2973525693×10⁻³', unit:'(безрозм.)',        note:'α = e²/(4πε₀ℏc) ≈ 1/137'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🔭 Фундаментальні фізико-хімічні константи</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CODATA 2018 · NIST · SI Brochure 9th ed. (2019)</div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7;font-weight:700">Назва</th>
            <th style="text-align:center;padding:9px 12px;color:#4FC3F7;font-weight:700">Символ</th>
            <th style="text-align:right;padding:9px 16px;color:#4FC3F7;font-weight:700">Значення</th>
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7;font-weight:700">Одиниця</th>
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7;font-weight:700">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:9px 12px;color:#ffffff">${r.name}</td>
            <td style="padding:9px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-size:14px;font-weight:700">${r.symbol}</td>
            <td style="padding:9px 16px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;white-space:nowrap">${r.value}</td>
            <td style="padding:9px 12px;color:#CE93D8;white-space:nowrap">${r.unit}</td>
            <td style="padding:9px 12px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
