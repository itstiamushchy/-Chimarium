// ============ Т-53: УНІВЕРСАЛЬНІ ФІЗИЧНІ СТАЛІ (розширений) ============
// Джерело: CODATA 2018 (NIST), SI Brochure 9th edition (2019)
// Розширення constants.js: електромагнітні, ядерні, атомні, астрофізичні

const TABLE_PHYSICAL_CONSTANTS = {
  id: 'physical_constants',
  title: 'Універсальні фізичні сталі (розширений)',
  topic: '1-5-gases',
  data: [
    // ОСНОВНІ
    {name:'Стала Авогадро',                    symbol:'Nₐ',    value:'6.02214076×10²³',   unit:'моль⁻¹',       group:'fundamental', note:'Точне визначення SI (2019)'},
    {name:'Універсальна газова стала',         symbol:'R',     value:'8.314462618',        unit:'Дж/(моль·К)',  group:'fundamental', note:'R = Nₐ · kB'},
    {name:'Стала Больцмана',                  symbol:'kB',    value:'1.380649×10⁻²³',    unit:'Дж/К',        group:'fundamental', note:'Точне визначення SI (2019)'},
    {name:'Стала Планка',                     symbol:'h',     value:'6.62607015×10⁻³⁴',  unit:'Дж·с',        group:'fundamental', note:'Точне визначення SI (2019)'},
    {name:'Зведена стала Планка',             symbol:'ℏ',     value:'1.054571817×10⁻³⁴', unit:'Дж·с',        group:'fundamental', note:'ℏ = h/(2π)'},
    {name:'Швидкість світла у вакуумі',       symbol:'c',     value:'2.99792458×10⁸',    unit:'м/с',         group:'fundamental', note:'Точне визначення (1983)'},
    {name:'Стандартне прискорення г. п.',     symbol:'g',     value:'9.80665',            unit:'м/с²',        group:'fundamental', note:'Конвенційне ISO 80000-3'},
    // ЕЛЕКТРОМАГНІТНІ
    {name:'Елементарний заряд',               symbol:'e',     value:'1.602176634×10⁻¹⁹', unit:'Кл',          group:'electromagnetic', note:'Точне визначення SI (2019)'},
    {name:'Стала Фарадея',                    symbol:'F',     value:'96485.33212',        unit:'Кл/моль',     group:'electromagnetic', note:'F = Nₐ · e'},
    {name:'Електрична стала (вакуум)',        symbol:'ε₀',    value:'8.8541878128×10⁻¹²',unit:'Ф/м',         group:'electromagnetic', note:'ε₀ = 1/(μ₀c²)'},
    {name:'Магнітна стала (вакуум)',          symbol:'μ₀',    value:'1.25663706212×10⁻⁶',unit:'Гн/м',        group:'electromagnetic', note:'μ₀ = 4π×10⁻⁷ (апрокс.)'},
    {name:'Стала тонкої структури',           symbol:'α',     value:'7.2973525693×10⁻³', unit:'(безрозм.)',   group:'electromagnetic', note:'α ≈ 1/137.036'},
    {name:'Магнетон Бора',                    symbol:'μB',    value:'9.2740100783×10⁻²⁴',unit:'Дж/Т',        group:'electromagnetic', note:'μB = eℏ/(2mₑ)'},
    {name:'Ядерний магнетон',                 symbol:'μN',    value:'5.0507837461×10⁻²⁷',unit:'Дж/Т',        group:'electromagnetic', note:'μN = eℏ/(2mₚ)'},
    {name:'Стала Джозефсона',                symbol:'KJ',    value:'483597.8484×10⁹',   unit:'Гц/В',        group:'electromagnetic', note:'KJ = 2e/h'},
    {name:'Стала фон Клітцинга',             symbol:'RK',    value:'25812.80745',        unit:'Ом',          group:'electromagnetic', note:'RK = h/e²'},
    // ЯДЕРНІ ТА АТОМНІ
    {name:'Маса спокою електрона',            symbol:'mₑ',    value:'9.1093837015×10⁻³¹',unit:'кг',          group:'nuclear', note:'0.51100 МеВ/c²'},
    {name:'Маса спокою протона',              symbol:'mₚ',    value:'1.67262192369×10⁻²⁷',unit:'кг',         group:'nuclear', note:'938.272 МеВ/c²'},
    {name:'Маса спокою нейтрона',             symbol:'mₙ',    value:'1.67492749804×10⁻²⁷',unit:'кг',         group:'nuclear', note:'939.565 МеВ/c²'},
    {name:'Атомна одиниця маси',              symbol:'u',     value:'1.66053906660×10⁻²⁷',unit:'кг',         group:'nuclear', note:'931.494 МеВ/c²'},
    {name:'Радіус Бора',                      symbol:'a₀',    value:'5.29177210903×10⁻¹¹',unit:'м',          group:'nuclear', note:'a₀ = ℏ/(mₑcα)'},
    {name:'Стала Рідберга',                   symbol:'R∞',    value:'1.0973731568160×10⁷',unit:'м⁻¹',         group:'nuclear', note:'R∞ = mₑe⁴/(8ε₀²h³c)'},
    {name:'Комптонівська довжина хвилі ел.',  symbol:'λC',    value:'2.42631023867×10⁻¹²',unit:'м',          group:'nuclear', note:'λC = h/(mₑc)'},
    // ТЕРМОДИНАМІЧНІ ТА ОПТИЧНІ
    {name:'Стала Стефана-Больцмана',          symbol:'σ',     value:'5.670374419×10⁻⁸',  unit:'Вт/(м²·К⁴)', group:'thermo', note:'σ = 2π⁵kB⁴/(15h³c²)'},
    {name:'Перша радіаційна стала',           symbol:'c₁',    value:'3.741771852×10⁻¹⁶', unit:'Вт·м²',       group:'thermo', note:'c₁ = 2πhc²'},
    {name:'Друга радіаційна стала',           symbol:'c₂',    value:'1.438776877×10⁻²',  unit:'м·К',         group:'thermo', note:'c₂ = hc/kB'},
    {name:'Число Лошмідта (0°C, 1 атм)',      symbol:'nL',    value:'2.6867774×10²⁵',    unit:'м⁻³',         group:'thermo', note:'Концентрація ідеального газу'},
    {name:'Молярний об\'єм газу (0°C, 1 атм)',symbol:'Vm',    value:'22.41396954',        unit:'л/моль',      group:'thermo', note:'T=273.15 K, p=101.325 кПа'},
    {name:'Стандартний тиск',                 symbol:'p°',    value:'101325',             unit:'Па',          group:'thermo', note:'1 атм = 101325 Па (точно)'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      fundamental:     {label:'Основні фізичні сталі',           col:'#4FC3F7'},
      electromagnetic: {label:'Електромагнітні сталі',           col:'#FFB300'},
      nuclear:         {label:'Атомні та ядерні сталі',          col:'#FF5252'},
      thermo:          {label:'Термодинамічні та оптичні сталі', col:'#00E5CC'},
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🔭 Універсальні фізичні сталі (розширений)</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CODATA 2018 · NIST · SI Brochure 9th ed. (2019). Розширення Т-21.</div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r => r.group === type);
      html += `<div style="font-family:'Oxanium',monospace;color:${g.col};font-size:13px;font-weight:700;margin:14px 0 6px">${g.label} (${rows.length})</div>
      <div style="overflow-x:auto;margin-bottom:8px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:7px 10px;color:#7080b8">Назва</th>
          <th style="text-align:center;padding:7px 8px;color:#7080b8">Символ</th>
          <th style="text-align:right;padding:7px 12px;color:#7080b8;white-space:nowrap">Значення</th>
          <th style="text-align:left;padding:7px 8px;color:#7080b8">Одиниця</th>
          <th style="text-align:left;padding:7px 10px;color:#7080b8">Примітка</th>
        </tr></thead>
        <tbody>`;
      rows.forEach((r, i) => {
        html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
          <td style="padding:7px 10px;color:#fff">${r.name}</td>
          <td style="padding:7px 8px;text-align:center;font-family:'Oxanium',monospace;color:${g.col};font-size:14px;font-weight:700">${r.symbol}</td>
          <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;white-space:nowrap">${r.value}</td>
          <td style="padding:7px 8px;color:#CE93D8;white-space:nowrap">${r.unit}</td>
          <td style="padding:7px 10px;color:#7080b8;font-size:11px">${r.note}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
    });
    c.innerHTML = html;
  }
};
