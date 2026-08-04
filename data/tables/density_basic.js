// ============ Т-40: БАЗОВІ ЗНАЧЕННЯ ГУСТИНИ РЕЧОВИН ============
// Джерела: CRC Handbook of Chemistry and Physics 104th ed. (2023);
//          NIST WebBook; Lide «CRC Handbook» 84th ed.

const TABLE_DENSITY_BASIC = {
  id: 'density_basic',
  title: 'Базові значення густини речовин',
  topic: '1-4-states',
  data: [
    // ---- РІДИНИ ----
    {name:'Вода',              formula:'H₂O',        density:1.000,    densityStr:'1.000',   T:4,    state:'рідина',  unit:'г/мл', note:'Максимальна густини при 4°C'},
    {name:'Вода',              formula:'H₂O',        density:0.9971,   densityStr:'0.9971',  T:25,   state:'рідина',  unit:'г/мл', note:'При 25°C (лабор. умови)'},
    {name:'Ртуть',             formula:'Hg',         density:13.534,   densityStr:'13.534',  T:20,   state:'рідина',  unit:'г/мл', note:'Найважча рідина при н.у.'},
    {name:'Сульфатна кислота', formula:'H₂SO₄',      density:1.840,    densityStr:'1.840',   T:20,   state:'рідина',  unit:'г/мл', note:'100% (конц.)'},
    {name:'Нітратна кислота',  formula:'HNO₃',       density:1.512,    densityStr:'1.512',   T:20,   state:'рідина',  unit:'г/мл', note:'100% (конц.)'},
    {name:'Хлоридна кислота',  formula:'HCl (36.5%)',density:1.179,    densityStr:'1.179',   T:20,   state:'рідина',  unit:'г/мл', note:'36.5% (конц. HCl)'},
    {name:'Оцтова кислота',    formula:'CH₃COOH',    density:1.049,    densityStr:'1.049',   T:20,   state:'рідина',  unit:'г/мл', note:'Льодяна (99.5%)'},
    {name:'Бензен',            formula:'C₆H₆',       density:0.879,    densityStr:'0.879',   T:20,   state:'рідина',  unit:'г/мл', note:'Ароматичний вуглеводень'},
    {name:'Толуен',            formula:'C₆H₅CH₃',    density:0.867,    densityStr:'0.867',   T:20,   state:'рідина',  unit:'г/мл', note:''},
    {name:'Етанол',            formula:'C₂H₅OH',     density:0.789,    densityStr:'0.789',   T:20,   state:'рідина',  unit:'г/мл', note:'Безводний (96% = 0.807)'},
    {name:'Метанол',           formula:'CH₃OH',       density:0.791,    densityStr:'0.791',   T:20,   state:'рідина',  unit:'г/мл', note:''},
    {name:'Ацетон',            formula:'(CH₃)₂CO',    density:0.791,    densityStr:'0.791',   T:20,   state:'рідина',  unit:'г/мл', note:''},
    {name:'Хлороформ',         formula:'CHCl₃',       density:1.489,    densityStr:'1.489',   T:20,   state:'рідина',  unit:'г/мл', note:'Важча за воду'},
    {name:'Чотирихлористий вуглець', formula:'CCl₄', density:1.594,    densityStr:'1.594',   T:20,   state:'рідина',  unit:'г/мл', note:''},
    {name:'Діетиловий ефір',   formula:'(C₂H₅)₂O',  density:0.713,    densityStr:'0.713',   T:20,   state:'рідина',  unit:'г/мл', note:'Легша за воду'},
    {name:'Гліцерол',          formula:'C₃H₈O₃',     density:1.261,    densityStr:'1.261',   T:20,   state:'рідина',  unit:'г/мл', note:'В'язка рідина'},
    // ---- ТВЕРДІ РЕЧОВИНИ ----
    {name:'Осмій',             formula:'Os',          density:22.59,    densityStr:'22.59',   T:20,   state:'тверда',  unit:'г/мл', note:'Найщільніший метал'},
    {name:'Іридій',            formula:'Ir',          density:22.56,    densityStr:'22.56',   T:20,   state:'тверда',  unit:'г/мл', note:'2-й за густиною'},
    {name:'Золото',            formula:'Au',          density:19.32,    densityStr:'19.32',   T:20,   state:'тверда',  unit:'г/мл', note:''},
    {name:'Свинець',           formula:'Pb',          density:11.34,    densityStr:'11.34',   T:20,   state:'тверда',  unit:'г/мл', note:''},
    {name:'Мідь',              formula:'Cu',          density:8.960,    densityStr:'8.960',   T:20,   state:'тверда',  unit:'г/мл', note:''},
    {name:'Залізо',            formula:'Fe',          density:7.874,    densityStr:'7.874',   T:20,   state:'тверда',  unit:'г/мл', note:'α-Fe (феррит)'},
    {name:'Алюміній',          formula:'Al',          density:2.700,    densityStr:'2.700',   T:20,   state:'тверда',  unit:'г/мл', note:''},
    {name:'Магній',            formula:'Mg',          density:1.738,    densityStr:'1.738',   T:20,   state:'тверда',  unit:'г/мл', note:'Легший за Al'},
    {name:'Натрій хлорид',     formula:'NaCl',        density:2.165,    densityStr:'2.165',   T:20,   state:'тверда',  unit:'г/мл', note:'Кам\'яна сіль'},
    {name:'Кальцій карбонат',  formula:'CaCO₃',       density:2.710,    densityStr:'2.710',   T:20,   state:'тверда',  unit:'г/мл', note:'Кальцит; мармур 2.71'},
    {name:'Кремній діоксид',   formula:'SiO₂',        density:2.650,    densityStr:'2.650',   T:20,   state:'тверда',  unit:'г/мл', note:'Кварц (аморф. 2.20)'},
    {name:'Алмаз',             formula:'C (алмаз)',    density:3.515,    densityStr:'3.515',   T:20,   state:'тверда',  unit:'г/мл', note:'Графіт: 2.09–2.23 г/мл'},
    {name:'Сірка (ромбічна)',  formula:'S₈',           density:2.070,    densityStr:'2.070',   T:20,   state:'тверда',  unit:'г/мл', note:'α-S; моноклінна S: 1.96'},
    {name:'Йод',               formula:'I₂',           density:4.933,    densityStr:'4.933',   T:20,   state:'тверда',  unit:'г/мл', note:'Важкий неметал'},
    // ---- ГАЗИ (при 0°C, 1 атм; одиниця г/л) ----
    {name:'Водень',            formula:'H₂',           density:0.0899,   densityStr:'0.0899',  T:0,    state:'газ',     unit:'г/л',  note:'Найлегший газ; 0°C, 1 атм'},
    {name:'Гелій',             formula:'He',           density:0.1785,   densityStr:'0.1785',  T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм'},
    {name:'Азот',              formula:'N₂',           density:1.2506,   densityStr:'1.2506',  T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм; основний компонент повітря'},
    {name:'Кисень',            formula:'O₂',           density:1.4290,   densityStr:'1.4290',  T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм'},
    {name:'Вуглекислий газ',   formula:'CO₂',          density:1.9770,   densityStr:'1.9770',  T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм; важчий за повітря'},
    {name:'Хлор',              formula:'Cl₂',          density:3.2140,   densityStr:'3.214',   T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм; жовто-зелений газ'},
    {name:'Аміак',             formula:'NH₃',          density:0.7710,   densityStr:'0.771',   T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм; легший за повітря'},
    {name:'Метан',             formula:'CH₄',          density:0.7168,   densityStr:'0.7168',  T:0,    state:'газ',     unit:'г/л',  note:'0°C, 1 атм; природний газ'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const stateColor = {
      'рідина': '#4FC3F7',
      'тверда':  '#FFB300',
      'газ':     '#A5D6A7',
    };
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚖️ Базові значення густини речовин</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: CRC Handbook 104th ed. (2023) · NIST WebBook. Рідини і тверді — г/мл, гази — г/л при 0°C, 1 атм.</div>
      <div style="display:flex;gap:16px;margin-bottom:14px;flex-wrap:wrap">
        <span style="font-size:11px"><span style="color:#4FC3F7">■</span> рідина (г/мл)</span>
        <span style="font-size:11px"><span style="color:#FFB300">■</span> тверда (г/мл)</span>
        <span style="font-size:11px"><span style="color:#A5D6A7">■</span> газ (г/л, 0°C)</span>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Формула</th>
            <th style="text-align:right;padding:9px 14px;color:#4FC3F7">ρ</th>
            <th style="text-align:left;padding:9px 8px;color:#4FC3F7">Одиниця</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">T (°C)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Стан</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
            <td style="padding:8px 10px;color:#CE93D8;font-family:'Oxanium',monospace;font-size:11px">${r.formula}</td>
            <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700;white-space:nowrap">${r.densityStr}</td>
            <td style="padding:8px 8px;color:#7080b8;font-size:11px">${r.unit}</td>
            <td style="padding:8px 10px;text-align:center;color:#b0c0e0">${r.T}</td>
            <td style="padding:8px 10px;text-align:center;color:${stateColor[r.state]||'#b0c0e0'};font-size:11px;white-space:nowrap">${r.state}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
