// ============ Т-32: АЗЕОТРОПНІ СУМІШІ ============
// Джерела: Horsley L.H. Azeotropic Data — III, ACS Advances in Chemistry Series 116 (1973);
//   Gmehling J. et al. Azeotropic Data, 3rd ed. Wiley-VCH (2004);
//   Perry's Chemical Engineers' Handbook, 8th ed. (2008), Section 13.

const TABLE_AZEOTROPES = {
  id: 'azeotropes',
  title: 'Азеотропні суміші',
  topic: '3-5-phase',
  data: [
    { comp1: 'Вода',     comp2: 'Етанол',          pct1: 4.4,  pct2: 95.6, bp: 78.1,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Ізопропанол',      pct1: 12.1, pct2: 87.9, bp: 80.4,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: '1-Бутанол',        pct1: 42.5, pct2: 57.5, bp: 93.0,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'н-Бутиловий ефір', pct1: 33.4, pct2: 66.6, bp: 94.1,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Бензол',           pct1: 8.9,  pct2: 91.1, bp: 69.4,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Толуол',           pct1: 19.6, pct2: 80.4, bp: 84.1,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Діетиловий ефір',  pct1: 1.3,  pct2: 98.7, bp: 34.2,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Хлороформ',        pct1: 2.8,  pct2: 97.2, bp: 56.1,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Хлористий метилен',pct1: 1.5,  pct2: 98.5, bp: 38.1,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'н-Гептан',         pct1: 12.9, pct2: 87.1, bp: 79.2,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Нітрометан',       pct1: 23.6, pct2: 76.4, bp: 83.6,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'Піридин',          pct1: 43.0, pct2: 57.0, bp: 94.0,  type: 'мінімум' },
    { comp1: 'Вода',     comp2: 'HCl (г)',          pct1: 79.8, pct2: 20.2, bp: 108.6, type: 'максимум' },
    { comp1: 'Вода',     comp2: 'HNO₃',             pct1: 68.0, pct2: 32.0, bp: 120.5, type: 'максимум' },
    { comp1: 'Вода',     comp2: 'H₂SO₄',            pct1: 38.0, pct2: 62.0, bp: 338.0, type: 'максимум' },
    { comp1: 'Вода',     comp2: 'HF',               pct1: 64.4, pct2: 35.6, bp: 111.4, type: 'максимум' },
    { comp1: 'Вода',     comp2: 'HBr',              pct1: 52.5, pct2: 47.5, bp: 126.0, type: 'максимум' },
    { comp1: 'Вода',     comp2: 'HI',               pct1: 43.0, pct2: 57.0, bp: 127.0, type: 'максимум' },
    { comp1: 'Етанол',   comp2: 'Гексан',           pct1: 21.0, pct2: 79.0, bp: 58.7,  type: 'мінімум' },
    { comp1: 'Ацетон',   comp2: 'Хлороформ',        pct1: 34.5, pct2: 65.5, bp: 64.7,  type: 'максимум' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚗️ Азеотропні суміші</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Склад у % мас. Тип: <b style="color:#FF5252">мінімум</b> — азеотроп кипить нижче обох компонентів (від'ємне відхилення від закону Рауля);
        <b style="color:#69F0AE">максимум</b> — вище обох компонентів (позитивне відхилення). Тиск 101.3 кПа.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Компонент 1</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Компонент 2</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Склад (%)</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">T<sub>кип</sub> (°C)</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Тип</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const typeColor = r.type === 'максимум' ? '#69F0AE' : '#FF5252';
      html += `
          <tr style="background:${bg};border-bottom:0.5px solid #1e2240">
            <td style="padding:9px 12px;color:#ffffff">${r.comp1}</td>
            <td style="padding:9px 12px;color:#ffffff">${r.comp2}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#c8d0e8">${r.pct1}% / ${r.pct2}%</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.bp}</td>
            <td style="padding:9px 8px;text-align:center;color:${typeColor};font-weight:700">${r.type}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      </div>
      <div style="margin-top:14px;font-size:11px;color:#4a5580;line-height:1.6">
        Джерела: Horsley L.H. Azeotropic Data — III, ACS (1973); Gmehling J. et al. Azeotropic Data, Wiley-VCH (2004);
        Perry's Chemical Engineers' Handbook, 8th ed. (2008).
      </div>`;

    c.innerHTML = html;
  }
};
