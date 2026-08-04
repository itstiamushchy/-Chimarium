// ============ Т-01: ЕЛЕКТРОХІМІЧНИЙ РЯД НАПРУГ МЕТАЛІВ ============
// Стандартні електродні потенціали (E°) при 25°C, 1 атм, концентрація 1 моль/л
// Джерело: IUPAC, CRC Handbook of Chemistry and Physics, 97th ed.

const TABLE_ELECTROCHEMICAL = {
  id: 'electrochemical',
  title: 'Електрохімічний ряд напруг металів',
  topic: '3-4-electrochemistry',
  data: [
    {metal:'Li',  ion:'Li⁺',  potential:-3.045},
    {metal:'K',   ion:'K⁺',   potential:-2.931},
    {metal:'Ba',  ion:'Ba²⁺', potential:-2.912},
    {metal:'Ca',  ion:'Ca²⁺', potential:-2.868},
    {metal:'Na',  ion:'Na⁺',  potential:-2.710},
    {metal:'Mg',  ion:'Mg²⁺', potential:-2.372},
    {metal:'Al',  ion:'Al³⁺', potential:-1.662},
    {metal:'Ti',  ion:'Ti²⁺', potential:-1.628},
    {metal:'Mn',  ion:'Mn²⁺', potential:-1.185},
    {metal:'Zn',  ion:'Zn²⁺', potential:-0.762},
    {metal:'Cr',  ion:'Cr³⁺', potential:-0.744},
    {metal:'Fe',  ion:'Fe²⁺', potential:-0.440},
    {metal:'Cd',  ion:'Cd²⁺', potential:-0.403},
    {metal:'Co',  ion:'Co²⁺', potential:-0.280},
    {metal:'Ni',  ion:'Ni²⁺', potential:-0.257},
    {metal:'Sn',  ion:'Sn²⁺', potential:-0.138},
    {metal:'Pb',  ion:'Pb²⁺', potential:-0.126},
    {metal:'H₂',  ion:'H⁺',   potential: 0.000},
    {metal:'Bi',  ion:'Bi³⁺', potential: 0.308},
    {metal:'Cu',  ion:'Cu²⁺', potential: 0.342},
    {metal:'Cu',  ion:'Cu⁺',  potential: 0.521},
    {metal:'Hg',  ion:'Hg₂²⁺',potential: 0.796},
    {metal:'Ag',  ion:'Ag⁺',  potential: 0.799},
    {metal:'Pd',  ion:'Pd²⁺', potential: 0.951},
    {metal:'Pt',  ion:'Pt²⁺', potential: 1.188},
    {metal:'Au',  ion:'Au³⁺', potential: 1.498},
    {metal:'Au',  ion:'Au⁺',  potential: 1.692},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const sorted = [...this.data].sort((a,b)=>a.potential-b.potential);
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚡ Електрохімічний ряд напруг металів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Стандартні електродні потенціали E° (В) при 25°C відносно стандартного водневого електрода.<br>
        <span style="color:#FF5252">Чим менше E°</span> — тим активніший метал (сильніший відновник).
        <span style="color:#4FC3F7">Чим більше E°</span> — тим благородніший (слабший відновник).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:1px solid #1e2240">
            <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Метал</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Іон</th>
            <th style="padding:8px 12px;text-align:right;color:#7080b8;font-weight:600">E° (В)</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Активність</th>
          </tr>
        </thead>
        <tbody>`;
    sorted.forEach(r => {
      const isH = r.metal === 'H₂';
      const bar = Math.round(((r.potential + 3.1) / 4.9) * 100);
      const col = r.potential < 0 ? '#FF5252' : r.potential === 0 ? '#FFB300' : '#4FC3F7';
      html += `<tr style="border-bottom:0.5px solid #1e2240;${isH?'background:#0f1632':''}">
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;font-weight:700;color:#fff">${r.metal}</td>
        <td style="padding:7px 12px;color:#CE93D8">${r.ion}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:${col};font-weight:700">${r.potential.toFixed(3)}</td>
        <td style="padding:7px 12px;width:140px">
          <div style="background:#1e2240;border-radius:4px;height:6px;overflow:hidden">
            <div style="width:${bar}%;height:100%;background:${col};border-radius:4px"></div>
          </div>
        </td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:16px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Правило:</b> Метал витісняє з розчину солі будь-який метал, що стоїть <b>правіше</b> від нього в ряду.
        Метали лівіше водню витісняють H₂ з кислот. Au, Pt, Pd — «благородні метали», не реагують з більшістю кислот.
      </div>`;
    c.innerHTML = html;
  }
};
