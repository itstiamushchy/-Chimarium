// ============ Т-24: КОНСТАНТИ КРИТИЧНОГО СТАНУ ============
// Джерело: CRC Handbook of Chemistry and Physics, 103rd ed.; NIST WebBook;
//          Poling, Prausnitz, O'Connell "Properties of Gases and Liquids", 5th ed.
// Tc — критична температура (К), Pc — критичний тиск (МПа), Vc — критичний об'єм (мл/моль)

const TABLE_CRITICAL = {
  id: 'critical',
  title: 'Константи критичного стану',
  topic: '3-5-phase',
  data: [
    // ПРОСТІ РЕЧОВИНИ — ГАЗИ
    {name:'Водень',            formula:'H₂',        Tc:33.15,   Pc:1.2964,  Vc:65.0,   Zc:0.305, group:'gas'},
    {name:'Гелій',             formula:'He',         Tc:5.19,    Pc:0.2275,  Vc:57.3,   Zc:0.301, group:'gas'},
    {name:'Неон',              formula:'Ne',         Tc:44.40,   Pc:2.7600,  Vc:41.7,   Zc:0.314, group:'gas'},
    {name:'Аргон',             formula:'Ar',         Tc:150.86,  Pc:4.8980,  Vc:74.6,   Zc:0.291, group:'gas'},
    {name:'Азот',              formula:'N₂',         Tc:126.19,  Pc:3.3958,  Vc:89.2,   Zc:0.289, group:'gas'},
    {name:'Кисень',            formula:'O₂',         Tc:154.58,  Pc:5.0430,  Vc:73.4,   Zc:0.288, group:'gas'},
    {name:'Хлор',              formula:'Cl₂',        Tc:416.90,  Pc:7.9910,  Vc:123.0,  Zc:0.284, group:'gas'},
    // НЕОРГАНІЧНІ СПОЛУКИ
    {name:'Вода',              formula:'H₂O',        Tc:647.10,  Pc:22.064,  Vc:55.9,   Zc:0.229, group:'inorganic'},
    {name:'Аміак',             formula:'NH₃',        Tc:405.56,  Pc:11.333,  Vc:69.8,   Zc:0.242, group:'inorganic'},
    {name:'Хлороводень',       formula:'HCl',        Tc:324.60,  Pc:8.3100,  Vc:81.0,   Zc:0.249, group:'inorganic'},
    {name:'Сірководень',       formula:'H₂S',        Tc:373.10,  Pc:9.0000,  Vc:98.5,   Zc:0.285, group:'inorganic'},
    {name:'Вуглекислий газ',   formula:'CO₂',        Tc:304.13,  Pc:7.3750,  Vc:94.1,   Zc:0.274, group:'inorganic'},
    {name:'Чадний газ',        formula:'CO',         Tc:132.86,  Pc:3.4940,  Vc:93.1,   Zc:0.295, group:'inorganic'},
    {name:'Оксид азоту(I)',    formula:'N₂O',        Tc:309.52,  Pc:7.2450,  Vc:97.4,   Zc:0.274, group:'inorganic'},
    {name:'Оксид сірки(IV)',   formula:'SO₂',        Tc:430.80,  Pc:7.8840,  Vc:122.0,  Zc:0.269, group:'inorganic'},
    // ОРГАНІЧНІ РЕЧОВИНИ
    {name:'Метан',             formula:'CH₄',        Tc:190.56,  Pc:4.5992,  Vc:98.6,   Zc:0.286, group:'organic'},
    {name:'Етан',              formula:'C₂H₆',       Tc:305.33,  Pc:4.8722,  Vc:145.5,  Zc:0.279, group:'organic'},
    {name:'Пропан',            formula:'C₃H₈',       Tc:369.89,  Pc:4.2512,  Vc:200.0,  Zc:0.276, group:'organic'},
    {name:'Бутан',             formula:'C₄H₁₀',      Tc:425.13,  Pc:3.7960,  Vc:255.0,  Zc:0.274, group:'organic'},
    {name:'Бензол',            formula:'C₆H₆',       Tc:562.05,  Pc:4.8950,  Vc:256.0,  Zc:0.268, group:'organic'},
    {name:'Метанол',           formula:'CH₃OH',      Tc:512.64,  Pc:8.0970,  Vc:117.0,  Zc:0.224, group:'organic'},
    {name:'Етанол',            formula:'C₂H₅OH',     Tc:513.91,  Pc:6.1480,  Vc:167.1,  Zc:0.241, group:'organic'},
    {name:'Ацетон',            formula:'(CH₃)₂CO',   Tc:508.10,  Pc:4.7010,  Vc:209.0,  Zc:0.233, group:'organic'},
    {name:'Оцтова кислота',    formula:'CH₃COOH',    Tc:592.71,  Pc:5.7860,  Vc:171.0,  Zc:0.201, group:'organic'},
    {name:'Хлороформ',         formula:'CHCl₃',      Tc:536.40,  Pc:5.4720,  Vc:239.0,  Zc:0.293, group:'organic'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      gas:      {label:'Прості речовини (гази)', col:'#00E5CC'},
      inorganic:{label:'Неорганічні сполуки',     col:'#4FC3F7'},
      organic:  {label:'Органічні речовини',       col:'#CE93D8'},
    };
    const fmt = (v, col) => v === null ? '<span style="color:#546E7A">—</span>' :
      `<span style="color:${col}">${v.toFixed(v>=100?1:v>=10?2:3)}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">💨 Константи критичного стану</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CRC Handbook 103rd ed. · NIST · Poling et al.</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
          <th style="text-align:center;padding:9px 12px;color:#4FC3F7">Формула</th>
          <th style="text-align:right;padding:9px 14px;color:#4FC3F7">Tc (К)</th>
          <th style="text-align:right;padding:9px 14px;color:#4FC3F7">Pc (МПа)</th>
          <th style="text-align:right;padding:9px 14px;color:#4FC3F7">Vc (мл/моль)</th>
          <th style="text-align:right;padding:9px 14px;color:#4FC3F7">Zc</th>
        </tr></thead><tbody>`;
    let lastGroup = null;
    this.data.forEach((r, i) => {
      if (r.group !== lastGroup) {
        const g = groups[r.group];
        html += `<tr><td colspan="6" style="padding:8px 12px;background:#080c1a;color:${g.col};font-size:11px;font-weight:700">${g.label}</td></tr>`;
        lastGroup = r.group;
      }
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.formula}</td>
        <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace">${fmt(r.Tc,'#FFB300')}</td>
        <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace">${fmt(r.Pc,'#FF7043')}</td>
        <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace">${fmt(r.Vc,'#4FC3F7')}</td>
        <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace;color:#7080b8">${r.Zc.toFixed(3)}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
    c.innerHTML = html;
  }
};
