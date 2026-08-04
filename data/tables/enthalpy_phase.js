// ============ Т-23: СТАНДАРТНІ ЕНТАЛЬПІЇ ПЛАВЛЕННЯ І ВИПАРОВУВАННЯ ============
// Джерело: CRC Handbook of Chemistry and Physics, 103rd ed.;
//          NIST Chemistry WebBook; Atkins' Physical Chemistry, 11th ed.
// ΔHпл — ентальпія плавлення (при Tпл), ΔHвип — ентальпія випаровування (при Tкип або 25°C*)
// * позначено зірочкою якщо при 25°C

const TABLE_ENTHALPY_PHASE = {
  id: 'enthalpy_phase',
  title: 'Стандартні ентальпії плавлення і випаровування',
  topic: '3-1-thermodynamics',
  data: [
    // НЕОРГАНІЧНІ РЕЧОВИНИ
    {name:'Вода',              formula:'H₂O',       dHfus:6.010,  dHvap:40.65,  group:'inorganic', note:'ΔHвип при 100°C; при 25°C — 44.0 кДж/моль'},
    {name:'Аміак',             formula:'NH₃',       dHfus:5.654,  dHvap:23.33,  group:'inorganic', note:'ΔHвип при -33.4°C'},
    {name:'Хлороводень',       formula:'HCl',       dHfus:1.992,  dHvap:16.15,  group:'inorganic'},
    {name:'Сірководень',       formula:'H₂S',       dHfus:2.376,  dHvap:18.67,  group:'inorganic'},
    {name:'Хлор',              formula:'Cl₂',       dHfus:6.406,  dHvap:20.41,  group:'inorganic'},
    {name:'Бром',              formula:'Br₂',       dHfus:10.57,  dHvap:29.96,  group:'inorganic'},
    {name:'Йод',               formula:'I₂',        dHfus:15.52,  dHvap:41.57,  group:'inorganic'},
    {name:'Натрій хлорид',     formula:'NaCl',      dHfus:28.16,  dHvap:170.7,  group:'inorganic'},
    {name:'Натрій гідроксид',  formula:'NaOH',      dHfus:6.600,  dHvap:174.1,  group:'inorganic'},
    {name:'Сульфатна кислота', formula:'H₂SO₄',     dHfus:10.71,  dHvap:null,   group:'inorganic', note:'Розкладається, ΔHвип не визначають'},
    // ПРОСТІ РЕЧОВИНИ — МЕТАЛИ
    {name:'Натрій',            formula:'Na',         dHfus:2.598,  dHvap:97.70,  group:'metal'},
    {name:'Калій',             formula:'K',          dHfus:2.335,  dHvap:79.87,  group:'metal'},
    {name:'Магній',            formula:'Mg',         dHfus:8.954,  dHvap:127.4,  group:'metal'},
    {name:'Кальцій',           formula:'Ca',         dHfus:8.540,  dHvap:153.6,  group:'metal'},
    {name:'Алюміній',          formula:'Al',         dHfus:10.71,  dHvap:293.4,  group:'metal'},
    {name:'Залізо',            formula:'Fe',         dHfus:13.81,  dHvap:340.0,  group:'metal'},
    {name:'Мідь',              formula:'Cu',         dHfus:13.05,  dHvap:300.4,  group:'metal'},
    {name:'Цинк',              formula:'Zn',         dHfus:7.322,  dHvap:115.3,  group:'metal'},
    {name:'Свинець',           formula:'Pb',         dHfus:4.774,  dHvap:177.7,  group:'metal'},
    {name:'Ртуть',             formula:'Hg',         dHfus:2.295,  dHvap:59.11,  group:'metal'},
    {name:'Срібло',            formula:'Ag',         dHfus:11.30,  dHvap:250.6,  group:'metal'},
    {name:'Золото',            formula:'Au',         dHfus:12.55,  dHvap:324.0,  group:'metal'},
    // ОРГАНІЧНІ РЕЧОВИНИ
    {name:'Метан',             formula:'CH₄',       dHfus:0.941,  dHvap:8.170,  group:'organic', note:'ΔHвип при -161.5°C'},
    {name:'Етанол',            formula:'C₂H₅OH',    dHfus:4.931,  dHvap:38.56,  group:'organic', note:'ΔHвип при 78.4°C'},
    {name:'Бензол',            formula:'C₆H₆',      dHfus:9.874,  dHvap:30.72,  group:'organic'},
    {name:'Оцтова кислота',    formula:'CH₃COOH',   dHfus:11.73,  dHvap:23.70,  group:'organic'},
    {name:'Ацетон',            formula:'(CH₃)₂CO',  dHfus:5.690,  dHvap:29.10,  group:'organic'},
    {name:'Діетиловий ефір',   formula:'(C₂H₅)₂O', dHfus:7.270,  dHvap:26.52,  group:'organic'},
    {name:'Хлороформ',         formula:'CHCl₃',     dHfus:9.540,  dHvap:29.24,  group:'organic'},
    {name:'Чотирихлористий вуглець', formula:'CCl₄', dHfus:2.560, dHvap:29.82,  group:'organic'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      inorganic: {label:'Неорганічні речовини та прості речовини (неметали)', col:'#4FC3F7'},
      metal:     {label:'Прості речовини — метали', col:'#FFB300'},
      organic:   {label:'Органічні речовини', col:'#00E5CC'},
    };
    const fmtH = (v, pos) => v === null ? '<span style="color:#546E7A">—</span>' :
      `<span style="color:${pos?'#4FC3F7':'#00E5CC'}">${v.toFixed(2)}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🔥 Ентальпії плавлення і випаровування</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CRC Handbook 103rd ed. · NIST · Одиниці: кДж/моль</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
          <th style="text-align:center;padding:9px 12px;color:#4FC3F7">Формула</th>
          <th style="text-align:right;padding:9px 16px;color:#4FC3F7">ΔHпл (кДж/моль)</th>
          <th style="text-align:right;padding:9px 16px;color:#4FC3F7">ΔHвип (кДж/моль)</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Примітка</th>
        </tr></thead><tbody>`;
    let lastGroup = null;
    this.data.forEach((r, i) => {
      if (r.group !== lastGroup) {
        const g = groups[r.group];
        html += `<tr><td colspan="5" style="padding:8px 12px;background:#080c1a;color:${g.col};font-size:11px;font-weight:700">${g.label}</td></tr>`;
        lastGroup = r.group;
      }
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.formula}</td>
        <td style="padding:8px 16px;text-align:right;font-family:'Oxanium',monospace">${fmtH(r.dHfus, true)}</td>
        <td style="padding:8px 16px;text-align:right;font-family:'Oxanium',monospace">${fmtH(r.dHvap, false)}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note||''}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
    c.innerHTML = html;
  }
};
