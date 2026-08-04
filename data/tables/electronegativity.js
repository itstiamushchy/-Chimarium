// ============ Т-11: ЕЛЕКТРОНЕГАТИВНІСТЬ ЕЛЕМЕНТІВ ============
// Джерела: Pauling (1960), Mulliken (1934/перераховані), Allred-Rochow (1958)
// CRC Handbook of Chemistry and Physics, 97th ed.; IUPAC 2016

const TABLE_ELECTRONEGATIVITY = {
  id: 'electronegativity',
  title: 'Електронегативність елементів',
  topic: '1-3-bond',
  data: [
    {element:'H',  z:1,  pauling:2.20, mulliken:7.17, allred:2.20},
    {element:'He', z:2,  pauling:null, mulliken:12.30,allred:5.50},
    {element:'Li', z:3,  pauling:0.98, mulliken:3.01, allred:0.97},
    {element:'Be', z:4,  pauling:1.57, mulliken:4.90, allred:1.47},
    {element:'B',  z:5,  pauling:2.04, mulliken:4.29, allred:2.01},
    {element:'C',  z:6,  pauling:2.55, mulliken:6.27, allred:2.50},
    {element:'N',  z:7,  pauling:3.04, mulliken:7.30, allred:3.07},
    {element:'O',  z:8,  pauling:3.44, mulliken:7.54, allred:3.50},
    {element:'F',  z:9,  pauling:3.98, mulliken:10.41,allred:4.10},
    {element:'Ne', z:10, pauling:null, mulliken:null, allred:4.84},
    {element:'Na', z:11, pauling:0.93, mulliken:2.85, allred:1.01},
    {element:'Mg', z:12, pauling:1.31, mulliken:3.75, allred:1.23},
    {element:'Al', z:13, pauling:1.61, mulliken:3.21, allred:1.47},
    {element:'Si', z:14, pauling:1.90, mulliken:4.77, allred:1.74},
    {element:'P',  z:15, pauling:2.19, mulliken:5.62, allred:2.06},
    {element:'S',  z:16, pauling:2.58, mulliken:6.22, allred:2.44},
    {element:'Cl', z:17, pauling:3.16, mulliken:8.30, allred:2.83},
    {element:'Ar', z:18, pauling:null, mulliken:null, allred:3.20},
    {element:'K',  z:19, pauling:0.82, mulliken:2.42, allred:0.91},
    {element:'Ca', z:20, pauling:1.00, mulliken:2.20, allred:1.04},
    {element:'Sc', z:21, pauling:1.36, mulliken:3.34, allred:1.20},
    {element:'Ti', z:22, pauling:1.54, mulliken:3.45, allred:1.32},
    {element:'V',  z:23, pauling:1.63, mulliken:3.60, allred:1.45},
    {element:'Cr', z:24, pauling:1.66, mulliken:3.72, allred:1.56},
    {element:'Mn', z:25, pauling:1.55, mulliken:3.72, allred:1.60},
    {element:'Fe', z:26, pauling:1.83, mulliken:4.06, allred:1.64},
    {element:'Co', z:27, pauling:1.88, mulliken:4.30, allred:1.70},
    {element:'Ni', z:28, pauling:1.91, mulliken:4.40, allred:1.75},
    {element:'Cu', z:29, pauling:1.90, mulliken:4.48, allred:1.75},
    {element:'Zn', z:30, pauling:1.65, mulliken:4.45, allred:1.66},
    {element:'Ga', z:31, pauling:1.81, mulliken:3.20, allred:1.82},
    {element:'Ge', z:32, pauling:2.01, mulliken:4.60, allred:2.02},
    {element:'As', z:33, pauling:2.18, mulliken:5.30, allred:2.20},
    {element:'Se', z:34, pauling:2.55, mulliken:5.89, allred:2.48},
    {element:'Br', z:35, pauling:2.96, mulliken:7.59, allred:2.74},
    {element:'Rb', z:37, pauling:0.82, mulliken:2.34, allred:0.89},
    {element:'Sr', z:38, pauling:0.95, mulliken:2.00, allred:0.99},
    {element:'Y',  z:39, pauling:1.22, mulliken:3.19, allred:1.11},
    {element:'Zr', z:40, pauling:1.33, mulliken:3.64, allred:1.22},
    {element:'Nb', z:41, pauling:1.60, mulliken:4.00, allred:1.23},
    {element:'Mo', z:42, pauling:2.16, mulliken:3.90, allred:1.30},
    {element:'Pd', z:46, pauling:2.20, mulliken:4.45, allred:1.35},
    {element:'Ag', z:47, pauling:1.93, mulliken:4.44, allred:1.42},
    {element:'Cd', z:48, pauling:1.69, mulliken:4.33, allred:1.46},
    {element:'In', z:49, pauling:1.78, mulliken:3.10, allred:1.49},
    {element:'Sn', z:50, pauling:1.96, mulliken:4.30, allred:1.72},
    {element:'Sb', z:51, pauling:2.05, mulliken:4.85, allred:1.82},
    {element:'Te', z:52, pauling:2.10, mulliken:5.49, allred:2.01},
    {element:'I',  z:53, pauling:2.66, mulliken:6.76, allred:2.21},
    {element:'Cs', z:55, pauling:0.79, mulliken:2.18, allred:0.86},
    {element:'Ba', z:56, pauling:0.89, mulliken:2.40, allred:0.97},
    {element:'La', z:57, pauling:1.10, mulliken:3.10, allred:1.08},
    {element:'Hf', z:72, pauling:1.30, mulliken:3.80, allred:1.23},
    {element:'Ta', z:73, pauling:1.50, mulliken:4.11, allred:1.33},
    {element:'W',  z:74, pauling:2.36, mulliken:4.40, allred:1.40},
    {element:'Pt', z:78, pauling:2.28, mulliken:5.60, allred:1.44},
    {element:'Au', z:79, pauling:2.54, mulliken:5.77, allred:1.42},
    {element:'Hg', z:80, pauling:2.00, mulliken:4.91, allred:1.44},
    {element:'Tl', z:81, pauling:1.62, mulliken:3.20, allred:1.44},
    {element:'Pb', z:82, pauling:2.33, mulliken:3.90, allred:1.55},
    {element:'Bi', z:83, pauling:2.02, mulliken:4.69, allred:1.67},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const sorted = [...this.data].sort((a,b)=>a.z-b.z);
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔋 Електронегативність елементів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Три найпоширені шкали електронегативності.<br>
        <b style="color:#4FC3F7">Шкала Полінга</b> — відносна, безрозмірна (F=3.98 максимум).
        <b style="color:#CE93D8">Шкала Маллікена</b> — середнє IE та EA, еВ.
        <b style="color:#00E5CC">Шкала Оллред-Рохова</b> — через електростатичну силу ядра.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:1px solid #1e2240">
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Елемент</th>
            <th style="padding:8px 12px;text-align:center;color:#7080b8">Z</th>
            <th style="padding:8px 12px;text-align:right;color:#4FC3F7">Полінг</th>
            <th style="padding:8px 12px;text-align:right;color:#CE93D8">Маллікен</th>
            <th style="padding:8px 12px;text-align:right;color:#00E5CC">Оллред-Рохов</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Відносно F</th>
          </tr>
        </thead>
        <tbody>`;
    sorted.forEach(r => {
      const pVal = r.pauling !== null ? r.pauling.toFixed(2) : '—';
      const mVal = r.mulliken !== null ? r.mulliken.toFixed(2) : '—';
      const aVal = r.allred !== null ? r.allred.toFixed(2) : '—';
      const barPct = r.pauling !== null ? Math.round((r.pauling / 3.98) * 100) : 0;
      const col = r.pauling === null ? '#546E7A' :
                  r.pauling >= 3.0 ? '#FF5252' :
                  r.pauling >= 2.0 ? '#FFB300' :
                  r.pauling >= 1.0 ? '#4FC3F7' : '#7080b8';
      html += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;font-weight:700;color:#fff">${r.element}</td>
        <td style="padding:7px 12px;text-align:center;color:#7080b8;font-size:11px">${r.z}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700">${pVal}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8">${mVal}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC">${aVal}</td>
        <td style="padding:7px 12px;width:120px">
          <div style="background:#1e2240;border-radius:4px;height:6px;overflow:hidden">
            <div style="width:${barPct}%;height:100%;background:${col};border-radius:4px"></div>
          </div>
        </td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:16px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Різниця ΔEN:</b> &gt;1.7 → іонний зв'язок; 0.4–1.7 → полярний ковалентний; &lt;0.4 → неполярний ковалентний.
        <br>Флуор F — найбільш електронегативний елемент (Полінг: 3.98), Цезій Cs — найменш (0.79).
      </div>`;
    c.innerHTML = html;
  }
};
