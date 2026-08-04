// ============ Т-18: ІЧ-СПЕКТРОСКОПІЯ — ХАРАКТЕРНІ ЧАСТОТИ ============
// Джерела: Silverstein, Bassler & Morrill, Spectrometric Identification
//   of Organic Compounds, 8th ed. (2014);
// Coates J., Interpretation of Infrared Spectra, Encyclopedia of
//   Analytical Chemistry (2000); SDBS (AIST Japan).

const TABLE_IR = {
  id: 'ir',
  title: 'ІЧ-спектроскопія — характерні частоти',
  topic: '6-3-instrumental',
  data: [
    // О-Н коливання
    { group: 'O–H (спирт, вільний)',    range: '3580–3650', intensity: 'гостра, середня',     note: 'У розведеному розчині (CCl₄); вільний O–H' },
    { group: 'O–H (спирт, асоційований)', range: '3200–3550', intensity: 'широка, сильна',    note: 'Міжмолекулярні водневі зв\'язки; широке плато' },
    { group: 'O–H (карбонова кислота)',  range: '2500–3300', intensity: 'дуже широка, сильна', note: 'Характерна «широченна» смуга через димеризацію' },
    { group: 'O–H (фенол)',             range: '3200–3600', intensity: 'широка, сильна',       note: 'Трохи вужча, ніж спирт' },
    // N-H коливання
    { group: 'N–H (первинний амін)',    range: '3300–3500', intensity: 'середня, дві смуги',   note: 'Симетричне та асиметричне N–H: νs і νas' },
    { group: 'N–H (вторинний амін)',    range: '3310–3350', intensity: 'середня, одна смуга',  note: 'Одна смуга (одна зв\'язок N–H)' },
    { group: 'N–H (амід)',             range: '3180–3360', intensity: 'середня',               note: 'Зсув порівняно з амінами через C=O' },
    // C-H коливання
    { group: 'C–H (sp³, алкан)',       range: '2850–2960', intensity: 'сильна',               note: 'CH₃: ~2870 і ~2962 см⁻¹; CH₂: ~2853 і ~2926 см⁻¹' },
    { group: 'C–H (sp², алкен)',       range: '3000–3100', intensity: 'середня',               note: 'Чітко виявляє C=C–H; вища за аліфатичний C–H' },
    { group: 'C–H (sp², арен)',        range: '3030–3080', intensity: 'слабка–середня',        note: 'Кілька смуг від різних C–H у кільці' },
    { group: 'C–H (sp, алкін)',        range: '3280–3320', intensity: 'гостра, сильна',        note: 'Кінцевий ≡C–H; характерна вузька смуга' },
    { group: '≡C–H (алкін, деформ.)', range: '600–700',   intensity: 'сильна',               note: 'Позаплощинна деформація кінцевого ≡C–H' },
    // Потрійні зв'язки
    { group: 'C≡C (алкін)',            range: '2100–2260', intensity: 'слабка–середня',        note: 'Симетричний алкін (~2150 см⁻¹) може бути відсутнім' },
    { group: 'C≡N (нітрил)',           range: '2210–2260', intensity: 'сильна',               note: 'Різко відрізняється від C–H смуг; вузька' },
    { group: 'N≡C (ізонітрил)',        range: '2110–2165', intensity: 'дуже сильна',           note: 'Незвичайна висока інтенсивність' },
    { group: 'C=O (кетон)',            range: '1705–1725', intensity: 'дуже сильна',           note: 'Ациклічний кетон ~1715 см⁻¹; циклопентанон ~1740' },
    { group: 'C=O (альдегід)',         range: '1720–1740', intensity: 'дуже сильна',           note: 'Також CH: дві смуги ~2720 та ~2820 см⁻¹' },
    { group: 'C=O (карбонова кислота)',range: '1700–1725', intensity: 'дуже сильна',           note: 'Ширша за кетон через H-зв\'язки; також OH 2500–3300' },
    { group: 'C=O (естер)',            range: '1735–1750', intensity: 'дуже сильна',           note: 'Вища частота, ніж кетон; також C–O–C ~1150–1300' },
    { group: 'C=O (амід)',             range: '1630–1690', intensity: 'дуже сильна',           note: 'Смуга амід I; нижча через мезомерію C–N' },
    { group: 'C=O (ангідрид)',         range: '1800–1850 і 1750–1790', intensity: 'дві сильні', note: 'Характерна пара смуг розщеплення' },
    { group: 'C=O (хлорангідрид)',     range: '1790–1815', intensity: 'дуже сильна',           note: 'Найвища частота C=O; –I ефект Cl' },
    { group: 'C=C (алкен)',            range: '1620–1680', intensity: 'слабка–середня',        note: 'Симетричний транс-алкен може бути нечутливим' },
    { group: 'C=C (арен)',             range: '1450–1600', intensity: 'декілька смуг',         note: 'Кілька смуг; ~1500 і ~1600 найсильніші' },
    // C-O, C-N
    { group: 'C–O (простий ефір)',     range: '1070–1150', intensity: 'дуже сильна',           note: 'Аліфат. ефір ~1120; аромат. ~1040 і ~1250' },
    { group: 'C–O (первинний спирт)',  range: '1030–1085', intensity: 'сильна',               note: 'Також є OH смуга 3200–3550 см⁻¹' },
    { group: 'C–N (амін)',             range: '1020–1230', intensity: 'слабка',               note: 'Важко ідентифікувати; NH смуги надійніші' },
    // NO₂, S=O
    { group: 'N–O (нітро-гр.)',        range: '1300–1380 і 1500–1560', intensity: 'дві сильні', note: 'Νas і νs розщеплення; ароматичн. нітросполуки' },
    { group: 'S=O (сульфоксид)',       range: '1030–1070', intensity: 'сильна',               note: 'DMSO: 1055 см⁻¹; ширша за C=O' },
    { group: 'S=O (сульфон)',          range: '1120–1160 і 1300–1350', intensity: 'дві сильні', note: 'Дві смуги νas і νs S=O' },
    // Відбитки пальців
    { group: 'Відбитки пальців',       range: '500–1500',  intensity: 'складний патерн',      note: 'Унікальний для кожної молекули; ідентифікація' },
    { group: 'C–X (C–Cl)',             range: '600–800',   intensity: 'сильна',               note: 'Зменш. частота F→Cl→Br→I; C–F ~1000–1400' },
    { group: 'C–H деформ. (CH₂, CH₃)',range: '1350–1470', intensity: 'середня',               note: 'Ножичне CH₂ ~1465; деформ. CH₃ ~1375 і ~1450' },
    { group: 'C–H (= поза площ.)',     range: '680–900',   intensity: 'сильна',               note: 'Визначає модель заміщення арену (1,2-; 1,3-; 1,4-)' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">📡 ІЧ-спектроскопія — характерні частоти поглинання</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Хвильові числа ν̃ (см⁻¹) ІЧ-смуг для функціональних груп органічних сполук. Характеристична область: &gt;1500 см⁻¹ — групи; &lt;1500 см⁻¹ — «відбитки пальців».
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Група / Зв'язок</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Діапазон (см⁻¹)</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Інтенсивність</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const intColor = r.intensity.includes('дуже сильна') ? '#FF5252'
                     : r.intensity.includes('сильна')      ? '#FFB300'
                     : r.intensity.includes('середня')     ? '#00E5CC' : '#7080b8';
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:600">${r.group}</td>
        <td style="padding:9px 12px;text-align:center;font-family:'Oxanium',monospace;font-weight:700;color:#4FC3F7;white-space:nowrap">${r.range}</td>
        <td style="padding:9px 12px;color:${intColor}">${r.intensity}</td>
        <td style="padding:9px 12px;color:#7080b8;font-size:11px;line-height:1.4">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">
      <div style="padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8">
        <span style="color:#FF5252;font-weight:700">■</span> Дуже сильна — C=O, NO₂, S=O<br>
        <span style="color:#FFB300;font-weight:700">■</span> Сильна — O–H, N–H, C–O<br>
        <span style="color:#00E5CC;font-weight:700">■</span> Середня — C–H, C=C, C≡C
      </div>
      <div style="padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
        💡 <b style="color:#4FC3F7">Ключова діагностика:</b><br>
        C=O ~1700–1750 + OH широка → карбонова кислота<br>
        C=O ~1735 без OH → естер<br>
        Широка OH 3200–3550 без C=O → спирт
      </div>
    </div>`;

    c.innerHTML = html;
  }
};
