// ============ Т-22: ТЕМПЕРАТУРИ ПЛАВЛЕННЯ І КИПІННЯ ============
// Джерело: CRC Handbook of Chemistry and Physics, 103rd ed.;
//          NIST Chemistry WebBook; Lange's Handbook of Chemistry, 16th ed.
// Тиск 1 атм (101.325 кПа), якщо не зазначено інше

const TABLE_MELTING = {
  id: 'melting',
  title: 'Температури плавлення і кипіння речовин',
  topic: '1-4-states',
  data: [
    // ПРОСТІ РЕЧОВИНИ — НЕМЕТАЛИ
    {name:'Водень',           formula:'H₂',       mp:-259.16, bp:-252.88, group:'nonmetal'},
    {name:'Гелій',            formula:'He',        mp:null,    bp:-268.93, group:'nonmetal', note:'Не плавиться при 1 атм'},
    {name:'Азот',             formula:'N₂',        mp:-210.00, bp:-195.79, group:'nonmetal'},
    {name:'Кисень',           formula:'O₂',        mp:-218.79, bp:-182.96, group:'nonmetal'},
    {name:'Фтор',             formula:'F₂',        mp:-219.62, bp:-188.12, group:'nonmetal'},
    {name:'Хлор',             formula:'Cl₂',       mp:-101.05, bp:-34.04,  group:'nonmetal'},
    {name:'Бром',             formula:'Br₂',       mp:-7.25,   bp:58.80,   group:'nonmetal'},
    {name:'Йод',              formula:'I₂',        mp:113.70,  bp:184.40,  group:'nonmetal'},
    {name:'Сірка (ромб.)',    formula:'S',          mp:112.80,  bp:444.61,  group:'nonmetal'},
    {name:'Фосфор (білий)',   formula:'P',          mp:44.15,   bp:280.50,  group:'nonmetal'},
    {name:'Вуглець (графіт)', formula:'C',          mp:3550.0,  bp:4027.0,  group:'nonmetal', note:'Сублімує при ~3642°C'},
    // ПРОСТІ РЕЧОВИНИ — МЕТАЛИ
    {name:'Літій',            formula:'Li',         mp:180.54,  bp:1342.0,  group:'metal'},
    {name:'Натрій',           formula:'Na',         mp:97.79,   bp:882.94,  group:'metal'},
    {name:'Калій',            formula:'K',          mp:63.38,   bp:759.0,   group:'metal'},
    {name:'Магній',           formula:'Mg',         mp:650.0,   bp:1090.0,  group:'metal'},
    {name:'Кальцій',          formula:'Ca',         mp:842.0,   bp:1484.0,  group:'metal'},
    {name:'Алюміній',         formula:'Al',         mp:660.32,  bp:2519.0,  group:'metal'},
    {name:'Залізо',           formula:'Fe',         mp:1538.0,  bp:2861.0,  group:'metal'},
    {name:'Мідь',             formula:'Cu',         mp:1084.62, bp:2562.0,  group:'metal'},
    {name:'Цинк',             formula:'Zn',         mp:419.53,  bp:907.0,   group:'metal'},
    {name:'Свинець',          formula:'Pb',         mp:327.46,  bp:1749.0,  group:'metal'},
    {name:'Ртуть',            formula:'Hg',         mp:-38.83,  bp:356.62,  group:'metal'},
    {name:'Срібло',           formula:'Ag',         mp:961.78,  bp:2162.0,  group:'metal'},
    {name:'Золото',           formula:'Au',         mp:1064.18, bp:2856.0,  group:'metal'},
    {name:'Платина',          formula:'Pt',         mp:1768.3,  bp:3825.0,  group:'metal'},
    {name:'Вольфрам',         formula:'W',          mp:3414.0,  bp:5555.0,  group:'metal', note:'Найвища Tпл серед металів'},
    {name:'Хром',             formula:'Cr',         mp:1907.0,  bp:2671.0,  group:'metal'},
    {name:'Нікель',           formula:'Ni',         mp:1455.0,  bp:2913.0,  group:'metal'},
    // НЕОРГАНІЧНІ СПОЛУКИ
    {name:'Вода',             formula:'H₂O',        mp:0.00,    bp:100.00,  group:'compound'},
    {name:'Натрій хлорид',    formula:'NaCl',       mp:800.7,   bp:1413.0,  group:'compound'},
    {name:'Калій хлорид',     formula:'KCl',        mp:770.0,   bp:1437.0,  group:'compound'},
    {name:'Кальцій хлорид',   formula:'CaCl₂',      mp:775.0,   bp:1935.0,  group:'compound'},
    {name:'Натрій гідроксид', formula:'NaOH',       mp:318.4,   bp:1388.0,  group:'compound'},
    {name:'Калій гідроксид',  formula:'KOH',        mp:360.0,   bp:1327.0,  group:'compound'},
    {name:'Амоніак',          formula:'NH₃',        mp:-77.73,  bp:-33.35,  group:'compound'},
    {name:'Хлороводень',      formula:'HCl',        mp:-114.22, bp:-85.05,  group:'compound'},
    {name:'Сульфатна кислота',formula:'H₂SO₄',      mp:10.31,   bp:337.0,   group:'compound'},
    {name:'Нітратна кислота', formula:'HNO₃',       mp:-41.59,  bp:83.0,    group:'compound'},
    {name:'Кальцій карбонат', formula:'CaCO₃',      mp:825.0,   bp:null,    group:'compound', note:'Розкладається при ~840°C'},
    {name:'Оксид кальцію',    formula:'CaO',        mp:2613.0,  bp:2850.0,  group:'compound'},
    {name:'Оксид алюмінію',   formula:'Al₂O₃',      mp:2054.0,  bp:2977.0,  group:'compound'},
    {name:'Оксид кремнію',    formula:'SiO₂',       mp:1713.0,  bp:2950.0,  group:'compound'},
    {name:'Оксид заліза(III)',formula:'Fe₂O₃',      mp:1565.0,  bp:null,    group:'compound', note:'Розкладається при ~1565°C'},
    {name:'Кальцій сульфат',  formula:'CaSO₄',      mp:1460.0,  bp:null,    group:'compound', note:'Розкладається при нагріванні'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      nonmetal: {label:'Прості речовини — неметали', col:'#00E5CC'},
      metal:    {label:'Прості речовини — метали',    col:'#4FC3F7'},
      compound: {label:'Неорганічні сполуки',         col:'#CE93D8'},
    };
    const fmtT = v => v === null ? '<span style="color:#546E7A">—</span>' :
      `<span style="color:${v < 0 ? '#82B1FF' : '#FFB300'}">${v.toFixed(2)}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🌡️ Температури плавлення і кипіння</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CRC Handbook 103rd ed. · NIST · Тиск 1 атм</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
          <th style="text-align:center;padding:9px 12px;color:#4FC3F7">Формула</th>
          <th style="text-align:right;padding:9px 16px;color:#4FC3F7">Tпл (°C)</th>
          <th style="text-align:right;padding:9px 16px;color:#4FC3F7">Tкип (°C)</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Примітка</th>
        </tr></thead><tbody>`;
    let lastGroup = null;
    this.data.forEach((r, i) => {
      if (r.group !== lastGroup) {
        const g = groups[r.group];
        html += `<tr><td colspan="5" style="padding:8px 12px;background:#080c1a;color:${g.col};font-size:11px;font-weight:700;letter-spacing:0.05em">${g.label}</td></tr>`;
        lastGroup = r.group;
      }
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.formula}</td>
        <td style="padding:8px 16px;text-align:right;font-family:'Oxanium',monospace">${fmtT(r.mp)}</td>
        <td style="padding:8px 16px;text-align:right;font-family:'Oxanium',monospace">${fmtT(r.bp)}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note||''}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
    c.innerHTML = html;
  }
};
