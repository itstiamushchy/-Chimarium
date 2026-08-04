// ============ Т-54: НЕОРГАНІЧНА ХІМІЯ — s та p ЕЛЕМЕНТИ ============
// M — атомна маса (а.о.м.), mp — точка плавлення (°C), bp — точка кипіння (°C)
// density — Густина при 20°C (г/см³), config — електронна конфігурація
// Джерело: IUPAC 2021 atomic weights; CRC Handbook 103rd ed.; WebElements

const TABLE_SP_ELEMENTS = {
  id: 'sp_elements',
  title: 'Неорганічна хімія — s та p елементи',
  topic: '2-2-s-elements',
  data: [
    // s-ЕЛЕМЕНТИ (група 1 — лужні метали)
    {element:'H',  name:'Гідроген',    M:1.008,   mp:-259.1, bp:-252.9, density:0.0000899, config:'1s¹',         group:'s1'},
    {element:'Li', name:'Літій',       M:6.941,   mp:180.5,  bp:1342,   density:0.534,     config:'[He]2s¹',      group:'s1'},
    {element:'Na', name:'Натрій',      M:22.99,   mp:97.8,   bp:883,    density:0.971,     config:'[Ne]3s¹',      group:'s1'},
    {element:'K',  name:'Калій',       M:39.10,   mp:63.4,   bp:759,    density:0.862,     config:'[Ar]4s¹',      group:'s1'},
    {element:'Rb', name:'Рубідій',     M:85.47,   mp:39.3,   bp:688,    density:1.532,     config:'[Kr]5s¹',      group:'s1'},
    {element:'Cs', name:'Цезій',       M:132.9,   mp:28.4,   bp:671,    density:1.873,     config:'[Xe]6s¹',      group:'s1'},
    {element:'Fr', name:'Францій',     M:223.0,   mp:27,     bp:677,    density:1.87,      config:'[Rn]7s¹',      group:'s1'},
    // s-ЕЛЕМЕНТИ (група 2 — лужноземельні метали)
    {element:'Be', name:'Берилій',     M:9.012,   mp:1287,   bp:2470,   density:1.848,     config:'[He]2s²',      group:'s2'},
    {element:'Mg', name:'Магній',      M:24.31,   mp:650,    bp:1090,   density:1.738,     config:'[Ne]3s²',      group:'s2'},
    {element:'Ca', name:'Кальцій',     M:40.08,   mp:842,    bp:1484,   density:1.550,     config:'[Ar]4s²',      group:'s2'},
    {element:'Sr', name:'Стронцій',    M:87.62,   mp:777,    bp:1382,   density:2.630,     config:'[Kr]5s²',      group:'s2'},
    {element:'Ba', name:'Барій',       M:137.3,   mp:727,    bp:1897,   density:3.594,     config:'[Xe]6s²',      group:'s2'},
    {element:'Ra', name:'Радій',       M:226.0,   mp:700,    bp:1737,   density:5.500,     config:'[Rn]7s²',      group:'s2'},
    // p-ЕЛЕМЕНТИ (група 13 — бор)
    {element:'B',  name:'Бор',         M:10.81,   mp:2076,   bp:3927,   density:2.370,     config:'[He]2s²2p¹',   group:'p1'},
    {element:'Al', name:'Алюміній',    M:26.98,   mp:660,    bp:2519,   density:2.699,     config:'[Ne]3s²3p¹',   group:'p1'},
    {element:'Ga', name:'Галій',       M:69.72,   mp:29.8,   bp:2204,   density:5.907,     config:'[Ar]3d¹⁰4s²4p¹',group:'p1'},
    {element:'In', name:'Індій',       M:114.8,   mp:156.6,  bp:2072,   density:7.310,     config:'[Kr]4d¹⁰5s²5p¹',group:'p1'},
    {element:'Tl', name:'Талій',       M:204.4,   mp:304,    bp:1473,   density:11.85,     config:'[Xe]4f¹⁴5d¹⁰6s²6p¹',group:'p1'},
    // p-ЕЛЕМЕНТИ (група 14 — карбон)
    {element:'C',  name:'Карбон',      M:12.01,   mp:3550,   bp:4027,   density:3.513,     config:'[He]2s²2p²',   group:'p2'},
    {element:'Si', name:'Силіцій',     M:28.09,   mp:1414,   bp:3265,   density:2.329,     config:'[Ne]3s²3p²',   group:'p2'},
    {element:'Ge', name:'Германій',    M:72.63,   mp:938,    bp:2833,   density:5.323,     config:'[Ar]3d¹⁰4s²4p²',group:'p2'},
    {element:'Sn', name:'Станум',      M:118.7,   mp:232,    bp:2602,   density:7.287,     config:'[Kr]4d¹⁰5s²5p²',group:'p2'},
    {element:'Pb', name:'Плюмбум',     M:207.2,   mp:327,    bp:1749,   density:11.34,     config:'[Xe]4f¹⁴5d¹⁰6s²6p²',group:'p2'},
    // p-ЕЛЕМЕНТИ (група 15 — нітроген)
    {element:'N',  name:'Нітроген',    M:14.01,   mp:-210.0, bp:-195.8, density:0.001251,  config:'[He]2s²2p³',   group:'p3'},
    {element:'P',  name:'Фосфор',      M:30.97,   mp:44.2,   bp:280.5,  density:1.823,     config:'[Ne]3s²3p³',   group:'p3'},
    {element:'As', name:'Арсен',       M:74.92,   mp:817,    bp:614,    density:5.727,     config:'[Ar]3d¹⁰4s²4p³',group:'p3'},
    {element:'Sb', name:'Стибій',      M:121.8,   mp:631,    bp:1587,   density:6.685,     config:'[Kr]4d¹⁰5s²5p³',group:'p3'},
    {element:'Bi', name:'Бісмут',      M:209.0,   mp:272,    bp:1564,   density:9.807,     config:'[Xe]4f¹⁴5d¹⁰6s²6p³',group:'p3'},
    // p-ЕЛЕМЕНТИ (група 16 — оксиген)
    {element:'O',  name:'Оксиген',     M:16.00,   mp:-219.0, bp:-183.0, density:0.001429,  config:'[He]2s²2p⁴',   group:'p4'},
    {element:'S',  name:'Сульфур',     M:32.06,   mp:113.0,  bp:444.6,  density:2.067,     config:'[Ne]3s²3p⁴',   group:'p4'},
    {element:'Se', name:'Селен',       M:78.96,   mp:221,    bp:685,    density:4.809,     config:'[Ar]3d¹⁰4s²4p⁴',group:'p4'},
    {element:'Te', name:'Телур',       M:127.6,   mp:450,    bp:988,    density:6.232,     config:'[Kr]4d¹⁰5s²5p⁴',group:'p4'},
    {element:'Po', name:'Полоній',     M:209.0,   mp:254,    bp:962,    density:9.196,     config:'[Xe]4f¹⁴5d¹⁰6s²6p⁴',group:'p4'},
    // p-ЕЛЕМЕНТИ (група 17 — галогени)
    {element:'F',  name:'Флуор',       M:19.00,   mp:-220.0, bp:-188.1, density:0.001696,  config:'[He]2s²2p⁵',   group:'p5'},
    {element:'Cl', name:'Хлор',        M:35.45,   mp:-101.5, bp:-34.1,  density:0.003214,  config:'[Ne]3s²3p⁵',   group:'p5'},
    {element:'Br', name:'Бром',        M:79.90,   mp:-7.3,   bp:58.9,   density:3.103,     config:'[Ar]3d¹⁰4s²4p⁵',group:'p5'},
    {element:'I',  name:'Йод',         M:126.9,   mp:113.5,  bp:184.4,  density:4.933,     config:'[Kr]4d¹⁰5s²5p⁵',group:'p5'},
    {element:'At', name:'Астат',       M:210.0,   mp:302,    bp:337,    density:6.400,     config:'[Xe]4f¹⁴5d¹⁰6s²6p⁵',group:'p5'},
    // p-ЕЛЕМЕНТИ (група 18 — благородні гази)
    {element:'He', name:'Гелій',       M:4.003,   mp:-272.2, bp:-268.9, density:0.000178,  config:'1s²',          group:'p6'},
    {element:'Ne', name:'Неон',        M:20.18,   mp:-248.6, bp:-246.1, density:0.000900,  config:'[He]2s²2p⁶',   group:'p6'},
    {element:'Ar', name:'Аргон',       M:39.95,   mp:-189.4, bp:-185.9, density:0.001784,  config:'[Ne]3s²3p⁶',   group:'p6'},
    {element:'Kr', name:'Криптон',     M:83.80,   mp:-157.4, bp:-153.2, density:0.003749,  config:'[Ar]3d¹⁰4s²4p⁶',group:'p6'},
    {element:'Xe', name:'Ксенон',      M:131.3,   mp:-111.8, bp:-108.0, density:0.005887,  config:'[Kr]4d¹⁰5s²5p⁶',group:'p6'},
    {element:'Rn', name:'Радон',       M:222.0,   mp:-71.0,  bp:-61.8,  density:0.00973,   config:'[Xe]4f¹⁴5d¹⁰6s²6p⁶',group:'p6'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      s1: {label:'s-елементи — Група 1 (лужні метали)', col:'#FF5252'},
      s2: {label:'s-елементи — Група 2 (лужноземельні)', col:'#FFB300'},
      p1: {label:'p-елементи — Група 13', col:'#4FC3F7'},
      p2: {label:'p-елементи — Група 14', col:'#00E5CC'},
      p3: {label:'p-елементи — Група 15', col:'#CE93D8'},
      p4: {label:'p-елементи — Група 16', col:'#81C784'},
      p5: {label:'p-елементи — Група 17 (галогени)', col:'#FFD54F'},
      p6: {label:'p-елементи — Група 18 (благородні гази)', col:'#7080b8'},
    };
    const fmtDens = v => v < 0.01 ? v.toFixed(6) : v.toFixed(3);
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚛️ Неорганічна хімія — s та p елементи</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: IUPAC 2021 atomic weights · CRC Handbook 103rd ed. · WebElements</div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r => r.group === type);
      html += `<div style="font-family:'Oxanium',monospace;color:${g.col};font-size:13px;font-weight:700;margin:14px 0 6px">${g.label} (${rows.length})</div>
      <div style="overflow-x:auto;margin-bottom:8px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="padding:6px 8px;text-align:center;color:#7080b8">Ел.</th>
          <th style="padding:6px 8px;text-align:left;color:#7080b8">Назва</th>
          <th style="padding:6px 8px;text-align:right;color:#7080b8">M (а.о.м.)</th>
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
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300">${r.M.toFixed(3)}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.mp}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.bp}</td>
          <td style="padding:6px 8px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8">${fmtDens(r.density)}</td>
          <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#00E5CC;font-size:11px">${r.config}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
    });
    html += `<div style="margin-top:12px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
      💡 s-елементи заповнюють s-підрівень, p-елементи — p-підрівень. Усього 38 елементів: 7 (s1) + 7 (s2) + 6×4 + 6×5 груп p-блоку.
    </div>`;
    c.innerHTML = html;
  }
};
