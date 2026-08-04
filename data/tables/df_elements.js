// ============ Т-55: d та f ЕЛЕМЕНТИ — ФІЗИЧНІ ВЛАСТИВОСТІ ============
// M — атомна маса (а.о.м.), mp — точка плавлення (°C), bp — точка кипіння (°C)
// density — Густина при 20°C (г/см³), config — електронна конфігурація
// Джерело: IUPAC 2021 atomic weights; CRC Handbook 103rd ed.; WebElements

const TABLE_DF_ELEMENTS = {
  id: 'df_elements',
  title: 'd та f елементи — фізичні властивості',
  topic: '2-4-d-f-elements',
  data: [
    // 3d-ПЕРЕХІДНІ ЕЛЕМЕНТИ (4-й період)
    {element:'Sc', name:'Скандій',    M:44.96,  mp:1541,  bp:2836,  density:2.985,  config:'[Ar]3d¹4s²',    group:'3d'},
    {element:'Ti', name:'Титан',      M:47.87,  mp:1668,  bp:3287,  density:4.507,  config:'[Ar]3d²4s²',    group:'3d'},
    {element:'V',  name:'Ванадій',    M:50.94,  mp:1910,  bp:3407,  density:6.110,  config:'[Ar]3d³4s²',    group:'3d'},
    {element:'Cr', name:'Хром',       M:52.00,  mp:1907,  bp:2671,  density:7.190,  config:'[Ar]3d⁵4s¹',    group:'3d'},
    {element:'Mn', name:'Манган',     M:54.94,  mp:1246,  bp:2061,  density:7.470,  config:'[Ar]3d⁵4s²',    group:'3d'},
    {element:'Fe', name:'Ферум',      M:55.85,  mp:1538,  bp:2861,  density:7.874,  config:'[Ar]3d⁶4s²',    group:'3d'},
    {element:'Co', name:'Кобальт',    M:58.93,  mp:1495,  bp:2927,  density:8.900,  config:'[Ar]3d⁷4s²',    group:'3d'},
    {element:'Ni', name:'Нікель',     M:58.69,  mp:1455,  bp:2913,  density:8.908,  config:'[Ar]3d⁸4s²',    group:'3d'},
    {element:'Cu', name:'Купрум',     M:63.55,  mp:1085,  bp:2562,  density:8.960,  config:'[Ar]3d¹⁰4s¹',   group:'3d'},
    {element:'Zn', name:'Цинк',       M:65.38,  mp:419.5, bp:907,   density:7.133,  config:'[Ar]3d¹⁰4s²',   group:'3d'},
    // 4d-ПЕРЕХІДНІ ЕЛЕМЕНТИ (5-й період)
    {element:'Y',  name:'Ітрій',      M:88.91,  mp:1526,  bp:3336,  density:4.472,  config:'[Kr]4d¹5s²',    group:'4d'},
    {element:'Zr', name:'Цирконій',   M:91.22,  mp:1855,  bp:4409,  density:6.506,  config:'[Kr]4d²5s²',    group:'4d'},
    {element:'Nb', name:'Ніобій',     M:92.91,  mp:2477,  bp:4744,  density:8.570,  config:'[Kr]4d⁴5s¹',    group:'4d'},
    {element:'Mo', name:'Молібден',   M:95.96,  mp:2623,  bp:4639,  density:10.28,  config:'[Kr]4d⁵5s¹',    group:'4d'},
    {element:'Tc', name:'Технецій',   M:98.00,  mp:2157,  bp:4265,  density:11.50,  config:'[Kr]4d⁵5s²',    group:'4d'},
    {element:'Ru', name:'Рутеній',    M:101.1,  mp:2334,  bp:4150,  density:12.45,  config:'[Kr]4d⁷5s¹',    group:'4d'},
    {element:'Rh', name:'Родій',      M:102.9,  mp:1964,  bp:3695,  density:12.41,  config:'[Kr]4d⁸5s¹',    group:'4d'},
    {element:'Pd', name:'Паладій',    M:106.4,  mp:1555,  bp:2963,  density:12.02,  config:'[Kr]4d¹⁰',      group:'4d'},
    {element:'Ag', name:'Срібло',     M:107.9,  mp:962,   bp:2162,  density:10.49,  config:'[Kr]4d¹⁰5s¹',   group:'4d'},
    {element:'Cd', name:'Кадмій',     M:112.4,  mp:321.1, bp:767,   density:8.650,  config:'[Kr]4d¹⁰5s²',   group:'4d'},
    // 5d-ПЕРЕХІДНІ ЕЛЕМЕНТИ (6-й період)
    {element:'Hf', name:'Гафній',     M:178.5,  mp:2233,  bp:4603,  density:13.31,  config:'[Xe]4f¹⁴5d²6s²',group:'5d'},
    {element:'Ta', name:'Тантал',     M:180.9,  mp:3017,  bp:5458,  density:16.69,  config:'[Xe]4f¹⁴5d³6s²',group:'5d'},
    {element:'W',  name:'Вольфрам',   M:183.8,  mp:3422,  bp:5555,  density:19.25,  config:'[Xe]4f¹⁴5d⁴6s²',group:'5d'},
    {element:'Re', name:'Рений',      M:186.2,  mp:3186,  bp:5596,  density:21.02,  config:'[Xe]4f¹⁴5d⁵6s²',group:'5d'},
    {element:'Os', name:'Осмій',      M:190.2,  mp:3033,  bp:5012,  density:22.59,  config:'[Xe]4f¹⁴5d⁶6s²',group:'5d'},
    {element:'Ir', name:'Іридій',     M:192.2,  mp:2446,  bp:4428,  density:22.56,  config:'[Xe]4f¹⁴5d⁷6s²',group:'5d'},
    {element:'Pt', name:'Платина',    M:195.1,  mp:1768,  bp:3825,  density:21.45,  config:'[Xe]4f¹⁴5d⁹6s¹',group:'5d'},
    {element:'Au', name:'Золото',     M:197.0,  mp:1064,  bp:2856,  density:19.32,  config:'[Xe]4f¹⁴5d¹⁰6s¹',group:'5d'},
    {element:'Hg', name:'Меркурій',   M:200.6,  mp:-38.8, bp:357,   density:13.53,  config:'[Xe]4f¹⁴5d¹⁰6s²',group:'5d'},
    // f-ЕЛЕМЕНТИ (лантаноїди, основні)
    {element:'La', name:'Лантан',     M:138.9,  mp:920,   bp:3464,  density:6.162,  config:'[Xe]5d¹6s²',    group:'lanthanide'},
    {element:'Ce', name:'Церій',      M:140.1,  mp:798,   bp:3443,  density:6.770,  config:'[Xe]4f¹5d¹6s²', group:'lanthanide'},
    {element:'Nd', name:'Неодим',     M:144.2,  mp:1021,  bp:3074,  density:7.008,  config:'[Xe]4f⁴6s²',    group:'lanthanide'},
    {element:'Gd', name:'Гадоліній',  M:157.3,  mp:1313,  bp:3273,  density:7.901,  config:'[Xe]4f⁷5d¹6s²', group:'lanthanide'},
    {element:'Dy', name:'Диспрозій',  M:162.5,  mp:1412,  bp:2567,  density:8.551,  config:'[Xe]4f¹⁰6s²',   group:'lanthanide'},
    {element:'Er', name:'Ербій',      M:167.3,  mp:1529,  bp:2868,  density:9.066,  config:'[Xe]4f¹²6s²',   group:'lanthanide'},
    {element:'Yb', name:'Ітербій',    M:173.0,  mp:819,   bp:1196,  density:6.965,  config:'[Xe]4f¹⁴6s²',   group:'lanthanide'},
    {element:'Lu', name:'Лютецій',    M:175.0,  mp:1652,  bp:3402,  density:9.841,  config:'[Xe]4f¹⁴5d¹6s²',group:'lanthanide'},
    // f-ЕЛЕМЕНТИ (актиноїди, основні)
    {element:'Ac', name:'Актиній',    M:227.0,  mp:1051,  bp:3198,  density:10.07,  config:'[Rn]6d¹7s²',    group:'actinide'},
    {element:'Th', name:'Торій',      M:232.0,  mp:1750,  bp:4788,  density:11.72,  config:'[Rn]6d²7s²',    group:'actinide'},
    {element:'U',  name:'Уран',       M:238.0,  mp:1132,  bp:4131,  density:19.05,  config:'[Rn]5f³6d¹7s²', group:'actinide'},
    {element:'Pu', name:'Плутоній',   M:244.0,  mp:640,   bp:3228,  density:19.86,  config:'[Rn]5f⁶7s²',    group:'actinide'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      '3d': {label:'3d-перехідні елементи (4-й період, Sc → Zn)', col:'#4FC3F7'},
      '4d': {label:'4d-перехідні елементи (5-й період, Y → Cd)',  col:'#00E5CC'},
      '5d': {label:'5d-перехідні елементи (6-й період, Hf → Hg)', col:'#FFB300'},
      'lanthanide': {label:'f-елементи: Лантаноїди (вибрані)',    col:'#CE93D8'},
      'actinide':   {label:'f-елементи: Актиноїди (вибрані)',      col:'#FF5252'},
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚙️ d та f елементи — фізичні властивості</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: IUPAC 2021 atomic weights · CRC Handbook 103rd ed. · WebElements</div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r => r.group === type);
      html += `<div style="font-family:'Oxanium',monospace;color:${g.col};font-size:13px;font-weight:700;margin:14px 0 6px">${g.label} (${rows.length})</div>
      <div style="overflow-x:auto;margin-bottom:8px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="padding:6px 8px;text-align:center;color:#7080b8">Ел.</th>
          <th style="padding:6px 8px;text-align:left;color:#7080b8">Назва</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8">M</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8;white-space:nowrap">Tпл (°C)</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8;white-space:nowrap">Tкип (°C)</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8;white-space:nowrap">ρ (г/см³)</th>
          <th style="padding:6px 10px;text-align:left;color:#7080b8">Конфігурація</th>
        </tr></thead>
        <tbody>`;
      rows.forEach((r, i) => {
        html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
          <td style="padding:6px 8px;text-align:center;font-family:'Oxanium',monospace;color:${g.col};font-weight:700;font-size:14px">${r.element}</td>
          <td style="padding:6px 8px;color:#fff">${r.name}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300">${r.M.toFixed(2)}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.mp}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.bp}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8">${r.density.toFixed(3)}</td>
          <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#00E5CC;font-size:11px">${r.config}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
    });
    html += `<div style="margin-top:12px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
      💡 d-елементи: 30 (3d: 10, 4d: 10, 5d: 10). f-елементи: лантаноїди (La–Lu, 15 ел.) + актиноїди (Ac–Lr, 15 ел.). Наведено основні представники.
    </div>`;
    c.innerHTML = html;
  }
};
