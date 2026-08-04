// ============ Т-36: СПЕКТРОСКОПІЧНІ ТА КВАНТОВІ КОНСТАНТИ ============
// Джерела: CODATA 2018 (NIST), IUPAC Green Book 3rd ed., Atkins Physical Chemistry 11th ed.

const TABLE_SPECTROSCOPY = {
  id: 'spectroscopy',
  title: 'Спектроскопічні та квантові константи',
  topic: '6-3-instrumental',
  data: [
    {name:'Стала Планка',                        symbol:'h',      value:'6.62607015×10⁻³⁴',  unit:'Дж·с',          note:'Точне визначення SI (2019)'},
    {name:'Зведена стала Планка (h-бар)',         symbol:'ℏ',      value:'1.054571817×10⁻³⁴', unit:'Дж·с',          note:'ℏ = h/(2π)'},
    {name:'Стала Рідберга',                       symbol:'R∞',     value:'1.0973731568539×10⁷',unit:'м⁻¹',          note:'CODATA 2018; R∞ = mₑe⁴/(8ε₀²h³c)'},
    {name:'Стала Рідберга (в еВ)',                symbol:'Ry',     value:'13.605693122994',    unit:'еВ',            note:'1 Ry = R∞·h·c; енергія іонізації H'},
    {name:'Стала тонкої структури',              symbol:'α',      value:'7.2973525693×10⁻³',  unit:'(безрозм.)',     note:'α = e²/(4πε₀ℏc) ≈ 1/137.036'},
    {name:'Магнетон Бора',                        symbol:'μB',     value:'9.2740100783×10⁻²⁴', unit:'Дж/Т',         note:'μB = eℏ/(2mₑ); одиниця магн. моменту е⁻'},
    {name:'Ядерний магнетон',                     symbol:'μN',     value:'5.0507837461×10⁻²⁷', unit:'Дж/Т',         note:'μN = eℏ/(2mₚ); для ЯМР ядер'},
    {name:'Гіромагнітне відношення протона',     symbol:'γp',     value:'2.6752218744×10⁸',   unit:'рад/(с·Т)',     note:'¹H ЯМР; νL = γp·B₀/(2π)'},
    {name:'Частота ЯМР ¹H при 1 Тл',            symbol:'ν(¹H)',  value:'42.577',              unit:'МГц/Тл',        note:'Для ¹H на спектрометрі 400 МГц → B₀ = 9.39 Тл'},
    {name:'Частота ЯМР ¹³C при 1 Тл',           symbol:'ν(¹³C)', value:'10.708',              unit:'МГц/Тл',        note:'¹³C ≈ 1/4 від частоти ¹H'},
    {name:'Енергія кванта при λ=600 нм (видиме)', symbol:'E',     value:'3.31×10⁻¹⁹',         unit:'Дж',            note:'E = hc/λ; жовто-оранжевий фотон'},
    {name:'Стала зсуву Відена',                  symbol:'b',      value:'2.897771955×10⁻³',   unit:'м·К',           note:'λmax·T = b; CODATA 2018'},
    {name:'Стала Стефана-Больцмана',             symbol:'σ',      value:'5.670374419×10⁻⁸',   unit:'Вт/(м²·К⁴)',   note:'σ = 2π⁵kB⁴/(15h³c²)'},
    {name:'Перша стала Планка (випромінювання)', symbol:'c₁',     value:'3.741771852×10⁻¹⁶',  unit:'Вт·м²',         note:'c₁ = 2πhc²; Planck radiance law'},
    {name:'Друга стала Планка',                  symbol:'c₂',     value:'1.438776877×10⁻²',   unit:'м·К',           note:'c₂ = hc/kB; Planck radiance law'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">📡 Спектроскопічні та квантові константи</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CODATA 2018 · NIST · Atkins Physical Chemistry 11th ed.</div>
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
