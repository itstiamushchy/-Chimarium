// ============ Т-45: ДОВІДНИКОВІ КОНСТАНТИ РЕЧОВИН І РОЗЧИНІВ ============
// Джерела: IUPAC — Standard atomic weights, 2021.
// NIST Chemistry WebBook, 2023.
// CRC Handbook of Chemistry and Physics, 104th ed., 2023.
// Atkins P., de Paula J. — Physical Chemistry, 11th ed., 2018.
// IUPAC Green Book, 3rd ed., 2007.

const TABLE_REFERENCE_CONSTANTS = {
  id: 'reference_constants',
  title: 'Довідникові константи речовин і розчинів',
  topic: '4-3-electrolytes',
  data: [
    { name: 'Іонний добуток води', symbol: 'Kw', value: 1e-14, T: 25, unit: 'моль²/л²', note: 'Kw = [H⁺][OH⁻]; при 25°C. pH + pOH = 14' },
    { name: 'Іонний добуток води при 0°C', symbol: 'Kw(0°C)', value: 1.14e-15, T: 0, unit: 'моль²/л²', note: 'pH нейтральної води при 0°C = 7.47' },
    { name: 'Іонний добуток води при 100°C', symbol: 'Kw(100°C)', value: 5.5e-13, T: 100, unit: 'моль²/л²', note: 'pH нейтральної води при 100°C = 6.13' },
    { name: 'Константа дисоціації HCl (у воді)', symbol: 'Ka(HCl)', value: '~10⁷', T: 25, unit: 'моль/л', note: 'Сильна кислота; практично повна дисоціація' },
    { name: 'Константа дисоціації CH₃COOH', symbol: 'Ka(AcOH)', value: 1.75e-5, T: 25, unit: 'моль/л', note: 'pKa = 4.757; слабка кислота (оцтова)' },
    { name: 'Константа дисоціації NH₃ (у воді)', symbol: 'Kb(NH₃)', value: 1.77e-5, T: 25, unit: 'моль/л', note: 'pKb = 4.752; слабка основа (аміак у воді)' },
    { name: 'Константа дисоціації H₂CO₃ (1 ступінь)', symbol: 'Ka1(H₂CO₃)', value: 4.47e-7, T: 25, unit: 'моль/л', note: 'pKa1 = 6.35; рівновага CO₂+H₂O ⇌ H⁺+HCO₃⁻' },
    { name: 'Константа дисоціації H₂CO₃ (2 ступінь)', symbol: 'Ka2(H₂CO₃)', value: 4.68e-11, T: 25, unit: 'моль/л', note: 'pKa2 = 10.33; HCO₃⁻ ⇌ H⁺ + CO₃²⁻' },
    { name: 'Константа дисоціації H₃PO₄ (1 ступінь)', symbol: 'Ka1(H₃PO₄)', value: 7.1e-3, T: 25, unit: 'моль/л', note: 'pKa1 = 2.15; помірна кислота' },
    { name: 'Константа дисоціації H₃PO₄ (2 ступінь)', symbol: 'Ka2(H₃PO₄)', value: 6.3e-8, T: 25, unit: 'моль/л', note: 'pKa2 = 7.20; буфер крові' },
    { name: 'Константа дисоціації H₃PO₄ (3 ступінь)', symbol: 'Ka3(H₃PO₄)', value: 4.2e-13, T: 25, unit: 'моль/л', note: 'pKa3 = 12.38' },
    { name: 'Кріоскопічна константа (вода)', symbol: 'Kf(H₂O)', value: 1.853, T: 0, unit: 'К·кг/моль', note: 'Зниження T замерзання: ΔTf = Kf·m' },
    { name: 'Ебуліоскопічна константа (вода)', symbol: 'Kb(H₂O)', value: 0.512, T: 100, unit: 'К·кг/моль', note: 'Підвищення T кипіння: ΔTb = Kb·m' },
    { name: 'Кріоскопічна константа (бензен)', symbol: 'Kf(C₆H₆)', value: 5.12, T: 5.5, unit: 'К·кг/моль', note: 'Бензен — зручний кріоскопічний розчинник (висока Kf)' },
    { name: 'Стала Фарадея', symbol: 'F', value: 96485.332, T: null, unit: 'Кл/моль', note: 'F = Nₐ·e; заряд 1 моля одновалентних іонів' },
    { name: 'Газова стала', symbol: 'R', value: 8.31446, T: null, unit: 'Дж/(моль·К)', note: 'Рівняння стану: PV = nRT. R = kB·Nₐ' },
    { name: 'Осмотичний коефіцієнт (ідеальний р-н)', symbol: 'i (Ван-Гофф)', value: 1, T: 25, unit: 'безрозмірний', note: 'Π = i·C·R·T; для неелектролітів i=1, для NaCl i→2' },
    { name: 'Розчинність CO₂ у воді (при 1 атм)', symbol: 'H(CO₂)', value: 3.4e-2, T: 25, unit: 'моль/(л·атм)', note: 'Константа Генрі; c(CO₂) = H·P. Зменшується з T' },
    { name: 'Розчинність O₂ у воді (при 1 атм)', symbol: 'H(O₂)', value: 1.3e-3, T: 25, unit: 'моль/(л·атм)', note: 'Константа Генрі O₂; ≈ 8.2 мг/л при 25°C, 1 атм' },
    { name: 'рН чистої води при 25°C', symbol: 'pH(H₂O)', value: 7.00, T: 25, unit: 'безрозмірний', note: 'pH = -lg[H⁺] = -lg(10⁻⁷) = 7.00 при 25°C' }
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">📌 Довідникові константи речовин і розчинів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Рівноважні та фізичні константи для розчинів і речовин. Джерела: IUPAC, NIST, CRC Handbook. Температура вказана для стандартних умов якщо не зазначено інше.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Назва</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Символ</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Значення</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">T (°C)</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Одиниця</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      let valStr;
      if (typeof r.value === 'string') {
        valStr = r.value;
      } else if (r.value === null) {
        valStr = '—';
      } else if (Math.abs(r.value) >= 1e4 || (Math.abs(r.value) < 1e-3 && r.value !== 0)) {
        valStr = r.value.toExponential(2);
      } else {
        valStr = r.value.toString();
      }
      const T_str = r.T !== null ? r.T : '—';
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:700;white-space:nowrap">${r.symbol}</td>
        <td style="padding:8px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${valStr}</td>
        <td style="padding:8px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">${T_str}</td>
        <td style="padding:8px 12px;color:#e0e8ff;font-size:11px;white-space:nowrap">${r.unit}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>`;
    c.innerHTML = html;
  }
};
