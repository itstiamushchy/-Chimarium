// ============ Т-43: ФАЗОВІ ДІАГРАМИ (двокомпонентні системи) ============
// Джерела: ASM International. Binary Alloy Phase Diagrams, 2nd ed., 1990.
// Massalski T.B. (ed.) — Binary Alloy Phase Diagrams, ASM, 1990.
// Hultgren R. et al. — Selected Values of Thermodynamic Properties of Alloys, 1973.
// CRC Handbook of Chemistry and Physics, 104th ed., 2023.
// Zief M., Wilcox W.R. — Fractional Solidification, 1967.

const TABLE_PHASE_DIAGRAMS = {
  id: 'phase_diagrams',
  title: 'Фазові діаграми двокомпонентних систем',
  topic: '3-5-phase',
  data: [
    {
      system: 'Fe–C',
      eutectic_T: 1147,
      eutectic_C: 4.3,
      eutectic_label: 'Евтектика (ледебурит)',
      peritectic_T: 1493,
      peritectic_C: 0.17,
      note: 'Основа металургії сталі та чавуну. Eutektoid (перліт): 727°C, 0.77% C. Сталь < 2.14% C, чавун > 2.14% C'
    },
    {
      system: 'Pb–Sn',
      eutectic_T: 183,
      eutectic_C: 61.9,
      eutectic_label: 'Евтектика (припій)',
      peritectic_T: null,
      peritectic_C: null,
      note: 'Класичний припій ПОС-60 (60%Sn). Евтектика — найнижча T плавлення в системі. Широко застосовується в електроніці'
    },
    {
      system: 'Al–Si',
      eutectic_T: 577,
      eutectic_C: 12.6,
      eutectic_label: 'Евтектика',
      peritectic_T: null,
      peritectic_C: null,
      note: 'Силуміни (АЛ2, АЛ4): ливарні Al-сплави. Евтектика 577°C при 12.6% Si. Добра ливарність, мала усадка'
    },
    {
      system: 'Cu–Zn',
      eutectic_T: null,
      eutectic_C: null,
      eutectic_label: '(без евтектики)',
      peritectic_T: 902,
      peritectic_C: 36.8,
      note: 'Латуні: β-фаза (CuZn) при > 38% Zn. Перітектика 902°C. α-латунь (< 38% Zn) — пластична, β — тверда. Жовтий метал'
    },
    {
      system: 'H₂O–NaCl',
      eutectic_T: -21.1,
      eutectic_C: 23.3,
      eutectic_label: 'Евтектика (кріогідрат)',
      peritectic_T: null,
      peritectic_C: null,
      note: 'Основа антиобледенювачів і кріосумішей. При -21.1°C (23.3% NaCl) замерзає вся система. Максимальна депресія точки замерзання'
    },
    {
      system: 'Au–Si',
      eutectic_T: 363,
      eutectic_C: 18.6,
      eutectic_label: 'Евтектика',
      peritectic_T: null,
      peritectic_C: null,
      note: 'Евтектика Au-Si 363°C при 18.6 ат.% Si. Застосовується в мікроелектроніці для монтажу кристалів Si на золоті (евтектичне паяння)'
    },
    {
      system: 'Bi–Cd',
      eutectic_T: 144,
      eutectic_C: 40.0,
      eutectic_label: 'Евтектика (сплав Вуда)',
      peritectic_T: null,
      peritectic_C: null,
      note: 'Складова сплаву Вуда (Bi-Pb-Sn-Cd, Tпл ≈ 70°C). Евтектика 144°C при 40% Cd. Застосування: теплові запобіжники'
    }
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">📊 Фазові діаграми двокомпонентних систем</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Характеристики евтектичних і перітектичних точок найважливіших двокомпонентних систем. Склад наведено у масових відсотках другого компонента (якщо не зазначено інше).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Система</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">T евт./періт. (°C)</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Склад (%)</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Тип точки</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Значення та застосування</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const T_e = r.eutectic_T !== null ? r.eutectic_T : '—';
      const C_e = r.eutectic_C !== null ? r.eutectic_C : '—';
      const T_p = r.peritectic_T !== null ? `/ ${r.peritectic_T}` : '';
      const T_disp = T_e !== '—' ? `${T_e}${T_p}` : (r.peritectic_T !== null ? r.peritectic_T : '—');
      const C_disp = C_e !== '—' ? C_e : (r.peritectic_C !== null ? r.peritectic_C : '—');
      const tCol = r.eutectic_T !== null ? (r.eutectic_T < 0 ? '#80D8FF' : r.eutectic_T < 500 ? '#FFD180' : '#FF8A80') : '#CE93D8';
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:10px 12px;color:#ffffff;font-family:'Oxanium',monospace;font-weight:700">${r.system}</td>
        <td style="padding:10px 12px;text-align:center;font-family:'Oxanium',monospace;color:${tCol};font-weight:700">${T_disp}</td>
        <td style="padding:10px 12px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC">${C_disp}</td>
        <td style="padding:10px 12px;color:#4FC3F7;font-size:11px">${r.eutectic_label}</td>
        <td style="padding:10px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
      <div style="margin-top:14px;background:#0a0f1a;border:0.5px solid #1e3060;border-radius:8px;padding:12px 16px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">Евтектика</b> — точка на діаграмі стану, де рідина кристалізується одночасно в обидві тверді фази при найнижчій температурі.
        <b style="color:#CE93D8">Перітектика</b> — точка, де тверда фаза реагує з рідиною з утворенням нової твердої фази при охолодженні.
      </div>`;
    c.innerHTML = html;
  }
};
