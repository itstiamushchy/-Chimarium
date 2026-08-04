// ============ Т-07: КРІОСКОПІЧНІ ТА ЕБУЛІОСКОПІЧНІ КОНСТАНТИ ============
// Джерело: CRC Handbook of Chemistry and Physics, 97th ed.; Atkins' Physical Chemistry, 10th ed.
// Kf (кріоскопічна константа, К·кг/моль), Kb (ебуліоскопічна константа, К·кг/моль)
// Tf — температура замерзання (°C), Tb — температура кипіння (°C) при 1 атм

const TABLE_CRYOSCOPY = {
  id: 'cryoscopy',
  title: 'Кріоскопічні та ебуліоскопічні константи',
  topic: '4-4-colligative',
  data: [
    {solvent:'Вода',              formula:'H₂O',         Kf:1.853,  Kb:0.512,  Tf:0.00,    Tb:100.00},
    {solvent:'Бензен',            formula:'C₆H₆',        Kf:5.120,  Kb:2.530,  Tf:5.53,    Tb:80.10},
    {solvent:'Камфора',           formula:'C₁₀H₁₆O',     Kf:37.700, Kb:5.950,  Tf:178.75,  Tb:207.40},
    {solvent:'Оцтова кислота',    formula:'CH₃COOH',     Kf:3.900,  Kb:3.070,  Tf:16.64,   Tb:117.90},
    {solvent:'Циклогексан',       formula:'C₆H₁₂',       Kf:20.200, Kb:2.750,  Tf:6.55,    Tb:80.74},
    {solvent:'Нафталін',          formula:'C₁₀H₈',       Kf:6.980,  Kb:5.800,  Tf:80.29,   Tb:217.96},
    {solvent:'Феніл',             formula:'C₆H₅OH',      Kf:7.270,  Kb:3.560,  Tf:40.90,   Tb:181.75},
    {solvent:'Ацетон',            formula:'(CH₃)₂CO',    Kf:2.400,  Kb:1.710,  Tf:-94.70,  Tb:56.05},
    {solvent:'Хлороформ',         formula:'CHCl₃',       Kf:4.900,  Kb:3.630,  Tf:-63.50,  Tb:61.20},
    {solvent:'Диетиловий ефір',   formula:'(C₂H₅)₂O',   Kf:1.790,  Kb:2.160,  Tf:-116.20, Tb:34.51},
    {solvent:'Діоксан',           formula:'C₄H₈O₂',     Kf:4.630,  Kb:3.270,  Tf:11.80,   Tb:101.32},
    {solvent:'Піридин',           formula:'C₅H₅N',       Kf:4.750,  Kb:2.690,  Tf:-41.60,  Tb:115.25},
    {solvent:'Нітробензен',       formula:'C₆H₅NO₂',     Kf:7.000,  Kb:5.240,  Tf:5.67,    Tb:210.80},
    {solvent:'Тетрахлорметан',    formula:'CCl₄',        Kf:29.800, Kb:4.950,  Tf:-22.99,  Tb:76.72},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let rows = '';
    this.data.forEach(r => {
      rows += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;color:#fff;font-weight:600">${r.solvent}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700">${r.Kf.toFixed(2)}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#FF8A65;font-weight:700">${r.Kb.toFixed(3)}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:${r.Tf<0?'#64B5F6':'#FFB300'}">${r.Tf.toFixed(2)}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#FF5252">${r.Tb.toFixed(2)}</td>
      </tr>`;
    });
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">❄️ Кріоскопічні та ебуліоскопічні константи</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        <b style="color:#4FC3F7">K<sub>f</sub></b> — кріоскопічна (ебуліоскопічна зниження точки замерзання, К·кг/моль)<br>
        <b style="color:#FF8A65">K<sub>b</sub></b> — ебуліоскопічна константа (підвищення точки кипіння, К·кг/моль)<br>
        Джерело: CRC Handbook of Chemistry and Physics, 97-е вид.; Atkins' Physical Chemistry, 10-е вид.
      </div>
      <div style="background:#0f1632;border:0.5px solid #1e3060;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Закони Рауля:</b> ΔTf = Kf · b &nbsp;|&nbsp; ΔTb = Kb · b &nbsp;&nbsp;(b — моляльна концентрація, моль/кг)
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Розчинник</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Формула</th>
          <th style="padding:8px 12px;text-align:left;color:#4FC3F7;font-weight:600">Kf (К·кг/моль)</th>
          <th style="padding:8px 12px;text-align:left;color:#FF8A65;font-weight:600">Kb (К·кг/моль)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Tпл (°C)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Tкип (°C)</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }
};
