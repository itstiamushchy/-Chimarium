// ============ Т-08: ТИСК НАСИЧЕНОЇ ВОДЯНОЇ ПАРИ ============
// Джерело: CRC Handbook of Chemistry and Physics, 97th ed.; NIST Chemistry WebBook
// T — температура (°C), P — тиск насиченої пари (кПа), rho — густина пари (г/м³)

const TABLE_VAPOR = {
  id: 'vapor',
  title: 'Тиск насиченої водяної пари',
  topic: '4-4-colligative',
  data: [
    {T:0,   P:0.6113,  rho:4.847},
    {T:5,   P:0.8726,  rho:6.797},
    {T:10,  P:1.2281,  rho:9.399},
    {T:15,  P:1.7057,  rho:12.83},
    {T:20,  P:2.3388,  rho:17.30},
    {T:25,  P:3.1690,  rho:23.05},
    {T:30,  P:4.2470,  rho:30.36},
    {T:35,  P:5.6267,  rho:39.60},
    {T:40,  P:7.3849,  rho:51.19},
    {T:45,  P:9.5898,  rho:65.57},
    {T:50,  P:12.352,  rho:83.23},
    {T:55,  P:15.763,  rho:104.9},
    {T:60,  P:19.940,  rho:130.8},
    {T:65,  P:25.022,  rho:161.9},
    {T:70,  P:31.176,  rho:198.8},
    {T:75,  P:38.595,  rho:242.4},
    {T:80,  P:47.396,  rho:293.8},
    {T:85,  P:57.834,  rho:354.2},
    {T:90,  P:70.182,  rho:424.9},
    {T:95,  P:84.609,  rho:507.6},
    {T:100, P:101.325, rho:597.9},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const maxP = 101.325;
    let rows = '';
    this.data.forEach(r => {
      const barW = Math.round((r.P / maxP) * 100);
      rows += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700">${r.T}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:700">${r.P.toFixed(4)}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.rho.toFixed(1)}</td>
        <td style="padding:7px 12px">
          <div style="background:#1e2240;border-radius:4px;height:6px;overflow:hidden;width:150px">
            <div style="width:${barW}%;height:100%;background:linear-gradient(90deg,#4FC3F7,#FF5252);border-radius:4px"></div>
          </div>
        </td>
      </tr>`;
    });
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">💧 Тиск насиченої водяної пари</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Тиск насиченої пари над рідкою водою при різних температурах.<br>
        ρ(г/м³) — масова концентрація водяної пари при насиченні (абсолютна вологість насичення).<br>
        Джерело: CRC Handbook 97-е вид.; NIST WebBook (Antoine equation).
      </div>
      <div style="background:#0f1632;border:0.5px solid #1e3060;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Рівняння Антуана (вода, 60–150°C):</b><br>
        lg(P/кПа) = 7.07354 − 1657.46 / (227.02 + T°C) &nbsp;&nbsp;При 100°C: P = 101.325 кПа (= 1 атм)
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">T (°C)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">P (кПа)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">ρ (г/м³)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Відносний тиск</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }
};
