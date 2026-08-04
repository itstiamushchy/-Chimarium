// ============ Т-06: ГУСТИНИ РОЗЧИНІВ ============
// Джерело: CRC Handbook of Chemistry and Physics, 97th ed.; Справочник химика (Никольский Б.П.)
// Дані при 20°C

const TABLE_DENSITY = {
  id: 'density',
  title: 'Густини розчинів',
  topic: '4-2-concentration',
  data: [
    {
      substance: 'H₂SO₄',
      name: 'Сульфатна кислота',
      formula: 'H₂SO₄',
      M: 98.08,
      points: [
        {pct:0,   density:0.9982},
        {pct:5,   density:1.0300},
        {pct:10,  density:1.0661},
        {pct:15,  density:1.1020},
        {pct:20,  density:1.1394},
        {pct:25,  density:1.1783},
        {pct:30,  density:1.2185},
        {pct:35,  density:1.2599},
        {pct:40,  density:1.3028},
        {pct:45,  density:1.3476},
        {pct:50,  density:1.3951},
        {pct:55,  density:1.4453},
        {pct:60,  density:1.4983},
        {pct:65,  density:1.5533},
        {pct:70,  density:1.6105},
        {pct:75,  density:1.6692},
        {pct:80,  density:1.7272},
        {pct:85,  density:1.7786},
        {pct:90,  density:1.8144},
        {pct:95,  density:1.8337},
        {pct:98,  density:1.8384},
        {pct:100, density:1.8305},
      ]
    },
    {
      substance: 'HNO₃',
      name: 'Нітратна кислота',
      formula: 'HNO₃',
      M: 63.01,
      points: [
        {pct:0,   density:0.9982},
        {pct:5,   density:1.0256},
        {pct:10,  density:1.0543},
        {pct:15,  density:1.0842},
        {pct:20,  density:1.1150},
        {pct:25,  density:1.1469},
        {pct:30,  density:1.1800},
        {pct:35,  density:1.2140},
        {pct:40,  density:1.2463},
        {pct:45,  density:1.2783},
        {pct:50,  density:1.3100},
        {pct:55,  density:1.3393},
        {pct:60,  density:1.3667},
        {pct:65,  density:1.3913},
        {pct:70,  density:1.4134},
        {pct:75,  density:1.4337},
        {pct:80,  density:1.4521},
        {pct:85,  density:1.4686},
        {pct:90,  density:1.4826},
        {pct:95,  density:1.4940},
        {pct:100, density:1.5129},
      ]
    },
    {
      substance: 'HCl',
      name: 'Хлоридна кислота',
      formula: 'HCl',
      M: 36.46,
      points: [
        {pct:0,  density:0.9982},
        {pct:2,  density:1.0082},
        {pct:4,  density:1.0181},
        {pct:6,  density:1.0279},
        {pct:8,  density:1.0376},
        {pct:10, density:1.0474},
        {pct:12, density:1.0574},
        {pct:14, density:1.0675},
        {pct:16, density:1.0776},
        {pct:18, density:1.0878},
        {pct:20, density:1.0980},
        {pct:22, density:1.1083},
        {pct:24, density:1.1187},
        {pct:26, density:1.1290},
        {pct:28, density:1.1392},
        {pct:30, density:1.1492},
        {pct:32, density:1.1593},
        {pct:34, density:1.1691},
        {pct:36, density:1.1789},
        {pct:38, density:1.1885},
      ]
    },
    {
      substance: 'NaOH',
      name: 'Натрій гідроксид',
      formula: 'NaOH',
      M: 40.00,
      points: [
        {pct:0,  density:0.9982},
        {pct:2,  density:1.0207},
        {pct:4,  density:1.0428},
        {pct:6,  density:1.0648},
        {pct:8,  density:1.0869},
        {pct:10, density:1.1089},
        {pct:12, density:1.1309},
        {pct:14, density:1.1530},
        {pct:16, density:1.1751},
        {pct:18, density:1.1972},
        {pct:20, density:1.2191},
        {pct:22, density:1.2411},
        {pct:24, density:1.2629},
        {pct:26, density:1.2848},
        {pct:28, density:1.3064},
        {pct:30, density:1.3279},
        {pct:35, density:1.3800},
        {pct:40, density:1.4300},
        {pct:45, density:1.4770},
        {pct:50, density:1.5253},
      ]
    },
    {
      substance: 'KOH',
      name: 'Калій гідроксид',
      formula: 'KOH',
      M: 56.11,
      points: [
        {pct:0,  density:0.9982},
        {pct:2,  density:1.0175},
        {pct:4,  density:1.0366},
        {pct:6,  density:1.0554},
        {pct:8,  density:1.0742},
        {pct:10, density:1.0929},
        {pct:12, density:1.1114},
        {pct:14, density:1.1299},
        {pct:16, density:1.1482},
        {pct:18, density:1.1665},
        {pct:20, density:1.1848},
        {pct:22, density:1.2030},
        {pct:24, density:1.2211},
        {pct:26, density:1.2390},
        {pct:28, density:1.2569},
        {pct:30, density:1.2746},
        {pct:35, density:1.3190},
        {pct:40, density:1.3627},
        {pct:45, density:1.4055},
        {pct:50, density:1.4477},
      ]
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚖️ Густини розчинів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:16px;line-height:1.6">
        Залежність густини ρ (г/мл) від масової частки ω (%) при <b>20°C</b>.<br>
        Джерело: CRC Handbook of Chemistry and Physics, 97-е вид.; Довідник хіміка (Нікольський Б.П.)
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px">`;
    this.data.forEach((s,i) => {
      html += `<button class="sol-mode-btn${i===0?' on':''}" onclick="DENSITY_showTable(${i})" id="density-btn-${i}">${s.substance}</button>`;
    });
    html += `</div><div id="density-table-area"></div>`;
    c.innerHTML = html;
    DENSITY_showTable(0);
  }
};

function DENSITY_showTable(idx) {
  const sub = TABLE_DENSITY.data[idx];
  document.querySelectorAll('[id^="density-btn-"]').forEach((b,i)=>{
    b.classList.toggle('on', i===idx);
  });
  const area = document.getElementById('density-table-area');
  if (!area) return;
  // calc molarity
  let tableRows = '';
  sub.points.forEach(p => {
    const molarity = p.pct > 0 ? (p.pct * p.density * 10 / sub.M).toFixed(3) : '0.000';
    tableRows += `<tr style="border-bottom:0.5px solid #1e2240">
      <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700">${p.pct}%</td>
      <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:700">${p.density.toFixed(4)}</td>
      <td style="padding:7px 12px;color:#CE93D8">${molarity}</td>
      <td style="padding:7px 12px">
        <div style="background:#1e2240;border-radius:4px;height:6px;overflow:hidden;width:120px">
          <div style="width:${Math.round(((p.density-0.99)/0.6)*100)}%;max-width:100%;height:100%;background:#4FC3F7;border-radius:4px"></div>
        </div>
      </td>
    </tr>`;
  });
  area.innerHTML = `
    <div style="margin-bottom:10px;font-size:13px;color:#fff"><b style="color:#4FC3F7">${sub.substance}</b> — ${sub.name} (M = ${sub.M} г/моль)</div>
    <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr style="border-bottom:1px solid #1e2240">
        <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">ω (%)</th>
        <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">ρ (г/мл)</th>
        <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">C (моль/л)</th>
        <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Відносна густина</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table></div>
    <div style="margin-top:14px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
      💡 <b style="color:#4FC3F7">Формула:</b> C (моль/л) = ω(%) × ρ(г/мл) × 10 / M(г/моль)
    </div>`;
}
