// ============ Т-44: ОДИНИЦІ ВИМІРЮВАННЯ (перерахунок) ============
// Джерела: BIPM — Le Système international d'unités (SI), 9th ed., 2019.
// NIST Special Publication 330, 2019.
// CRC Handbook of Chemistry and Physics, 104th ed., 2023.
// IUPAC Green Book — Quantities, Units and Symbols in Physical Chemistry, 3rd ed., 2007.

const TABLE_UNITS = {
  id: 'units',
  title: 'Одиниці вимірювання (перерахунок)',
  topic: '1-5-gases',
  data: [
    // ТИСК
    { quantity: 'Тиск', from: 'атм', to: 'Па', factor: 101325, note: '1 атм = стандартний атмосферний тиск' },
    { quantity: 'Тиск', from: 'атм', to: 'кПа', factor: 101.325, note: '' },
    { quantity: 'Тиск', from: 'атм', to: 'бар', factor: 1.01325, note: '1 бар ≈ 0.987 атм' },
    { quantity: 'Тиск', from: 'атм', to: 'мм рт.ст. (торр)', factor: 760, note: '1 торр = 1/760 атм точно' },
    { quantity: 'Тиск', from: 'Па', to: 'мм рт.ст.', factor: 0.0075006, note: '' },
    { quantity: 'Тиск', from: 'бар', to: 'кПа', factor: 100, note: '1 бар = 100 000 Па точно (SI)' },
    { quantity: 'Тиск', from: 'psi (фунт/дюйм²)', to: 'кПа', factor: 6.89476, note: '1 psi = 6894.76 Па' },
    // ЕНЕРГІЯ
    { quantity: 'Енергія', from: 'кДж/моль', to: 'ккал/моль', factor: 0.23901, note: '1 кал = 4.184 Дж (терм.)' },
    { quantity: 'Енергія', from: 'ккал/моль', to: 'кДж/моль', factor: 4.184, note: '' },
    { quantity: 'Енергія', from: 'еВ (на молекулу)', to: 'кДж/моль', factor: 96.485, note: '1 еВ·Nₐ = 96485 Дж/моль' },
    { quantity: 'Енергія', from: 'Дж', to: 'кал', factor: 0.23901, note: '1 Дж = 0.2390 кал' },
    { quantity: 'Енергія', from: 'Дж', to: 'кВт·год', factor: 2.7778e-7, note: '1 кВт·год = 3 600 000 Дж' },
    { quantity: 'Енергія', from: 'см⁻¹ (хвильове число)', to: 'кДж/моль', factor: 0.011963, note: '1 см⁻¹ = 11.963 Дж/моль' },
    // КОНЦЕНТРАЦІЯ
    { quantity: 'Концентрація', from: 'моль/л (M)', to: 'моль/м³', factor: 1000, note: '1 М = 1000 моль/м³' },
    { quantity: 'Концентрація', from: 'мг/л', to: 'мкмоль/л (для NaCl, M=58.44)', factor: 17.12, note: 'Залежить від молярної маси речовини' },
    { quantity: 'Концентрація', from: 'г/л', to: 'моль/л (NaCl)', factor: 0.01711, note: 'M(NaCl)=58.44 г/моль' },
    { quantity: 'Концентрація', from: 'ppm (мг/кг)', to: 'мг/л (для вод. р-нів ρ≈1)', factor: 1, note: 'Для розведених водних розчинів ppm ≈ мг/л' },
    { quantity: 'Концентрація', from: 'моль/л', to: 'н (нормальність, для HCl)', factor: 1, note: 'Для одноосновних кислот C(М) = C(н)' },
    { quantity: 'Концентрація', from: 'моль/л (H₂SO₄)', to: 'н', factor: 2, note: 'H₂SO₄ двоосновна: н = 2 × моль/л' },
    // ТЕМПЕРАТУРА
    { quantity: 'Температура', from: '°C', to: 'K', factor: null, note: 'T(K) = T(°C) + 273.15' },
    { quantity: 'Температура', from: 'K', to: '°C', factor: null, note: 'T(°C) = T(K) − 273.15' },
    { quantity: 'Температура', from: '°F', to: '°C', factor: null, note: 'T(°C) = (T(°F) − 32) × 5/9' },
    { quantity: 'Температура', from: '°C', to: '°F', factor: null, note: 'T(°F) = T(°C) × 9/5 + 32' },
    // ДОВЖИНА / МАСА / ОБ'ЄМ
    { quantity: 'Довжина', from: 'Å (ангстрем)', to: 'нм', factor: 0.1, note: '1 Å = 10⁻¹⁰ м' },
    { quantity: 'Довжина', from: 'нм', to: 'пм', factor: 1000, note: '1 нм = 1000 пм' },
    { quantity: "Об'єм", from: 'л', to: 'мл', factor: 1000, note: '1 л = 1 дм³' },
    { quantity: "Об'єм", from: 'мл', to: 'см³', factor: 1, note: '1 мл = 1 см³ точно' },
    { quantity: 'Маса', from: 'г', to: 'мг', factor: 1000, note: '' },
    { quantity: 'Маса', from: 'а.о.м. (Да)', to: 'г', factor: 1.66054e-24, note: '1 Да = 1.66054 × 10⁻²⁴ г' }
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    // Group by quantity
    const groups = {};
    this.data.forEach(r => {
      if (!groups[r.quantity]) groups[r.quantity] = [];
      groups[r.quantity].push(r);
    });

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">📐 Одиниці вимірювання (перерахунок)</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Коефіцієнти переведення між одиницями SI та позасистемними. Де коефіцієнт вказано — множте значення «З» на нього, щоб отримати «В». Для температур — формула в примітці.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Величина</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">З</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">В</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Коефіцієнт</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    let rowIdx = 0;
    const qColors = {
      'Тиск': '#FF8A80', 'Енергія': '#FFD180', 'Концентрація': '#B9F6CA',
      'Температура': '#80D8FF', "Довжина": '#CE93D8', "Об'єм": '#EA80FC', "Маса": '#CCFF90'
    };
    let lastQ = null;
    this.data.forEach((r) => {
      const bg = rowIdx % 2 === 0 ? '#0f1632' : '#0d1228';
      const qc = qColors[r.quantity] || '#4FC3F7';
      const factorStr = r.factor !== null
        ? (r.factor >= 0.001 && r.factor < 1e6 ? r.factor.toString() : r.factor.toExponential(4))
        : '—';
      const showQ = r.quantity !== lastQ;
      lastQ = r.quantity;
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:8px 12px;color:${qc};font-weight:${showQ?'700':'400'};font-size:${showQ?'12':'11'}px">${showQ ? r.quantity : ''}</td>
        <td style="padding:8px 12px;color:#e0e8ff;font-family:'Oxanium',monospace">${r.from}</td>
        <td style="padding:8px 12px;color:#e0e8ff;font-family:'Oxanium',monospace">${r.to}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${factorStr}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
      rowIdx++;
    });

    html += `</tbody></table></div>`;
    c.innerHTML = html;
  }
};
