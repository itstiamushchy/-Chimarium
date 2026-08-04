// ============ Т-16: КОНСТАНТИ СТІЙКОСТІ КОМПЛЕКСНИХ СПОЛУК ============
// Джерела: NIST Critically Selected Stability Constants of Metal Complexes (2004);
// Martell & Smith, Critical Stability Constants (1974–1989);
// Ringbom, Complexation in Analytical Chemistry (1963);
// Дікалов та ін., Хімія та застосування ЕДТА (2000).

const TABLE_COMPLEXES = {
  id: 'complexes',
  title: 'Константи стійкості комплексних сполук',
  topic: '3-4-electrochemistry',
  data: [
    // ЕДТА-комплекси (Y = EDTA-аніон)
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Ca²⁺', formula: '[CaY]²⁻',    lgK: 10.70, note: 'Застосовується у комплексонометрії (жорсткість води)' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Mg²⁺', formula: '[MgY]²⁻',    lgK: 8.70,  note: 'Слабкіший, ніж Ca-EDTA; титрують при pH 10' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Fe³⁺', formula: '[FeY]⁻',     lgK: 25.10, note: 'Один з найстійкіших ЕДТА-комплексів' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Fe²⁺', formula: '[FeY]²⁻',    lgK: 14.30, note: 'Значно менш стійкий, ніж Fe³⁺-EDTA' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Cu²⁺', formula: '[CuY]²⁻',    lgK: 18.80, note: 'Яскраво-синій комплекс; стабільний при pH 3–12' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Zn²⁺', formula: '[ZnY]²⁻',    lgK: 16.50, note: 'Безбарвний; індикатор EBT стає синім при ТЕ' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Ni²⁺', formula: '[NiY]²⁻',    lgK: 18.62, note: 'Блакитнуватий; рекомендується pH 5–7' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Co²⁺', formula: '[CoY]²⁻',    lgK: 16.31, note: 'Рожево-фіолетовий комплекс' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Pb²⁺', formula: '[PbY]²⁻',    lgK: 18.04, note: '⚠️ Токсичний Pb²⁺; ЕДТА — антидот при отруєнні свинцем' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Al³⁺', formula: '[AlY]⁻',     lgK: 16.13, note: 'Кінетично повільне утворення; нагрівання прискорює' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Hg²⁺', formula: '[HgY]²⁻',    lgK: 21.80, note: '⚠️ Токсичний; ЕДТА утворює дуже стійкий комплекс' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Cd²⁺', formula: '[CdY]²⁻',    lgK: 16.46, note: '⚠️ Токсичний кадмій; стійкий при pH 4–10' },
    { ligand: 'ЕДТА (Y⁴⁻)', metal: 'Mn²⁺', formula: '[MnY]²⁻',    lgK: 13.87, note: 'Безбарвний; застосовують в аналізі ґрунтів' },
    // Ціано-комплекси
    { ligand: 'CN⁻',        metal: 'Fe²⁺', formula: '[Fe(CN)₆]⁴⁻', lgK: 35.4,  note: 'Червона кров\'яна сіль; реагент на Fe³⁺' },
    { ligand: 'CN⁻',        metal: 'Fe³⁺', formula: '[Fe(CN)₆]³⁻', lgK: 42.0,  note: 'Жовта кров\'яна сіль; реагент на Fe²⁺ (берлінська блакить)' },
    { ligand: 'CN⁻',        metal: 'Ag⁺',  formula: '[Ag(CN)₂]⁻',  lgK: 21.1,  note: 'Дуже стійкий; ціанідне вилуговування золота' },
    { ligand: 'CN⁻',        metal: 'Ni²⁺', formula: '[Ni(CN)₄]²⁻', lgK: 31.3,  note: 'Квадратно-планарний; ⚠️ CN⁻ — токсичний' },
    // Амінові комплекси
    { ligand: 'NH₃',        metal: 'Cu²⁺', formula: '[Cu(NH₃)₄]²⁺', lgK: 12.03, note: 'Яскраво-синій; розчиняє Cu(OH)₂' },
    { ligand: 'NH₃',        metal: 'Ag⁺',  formula: '[Ag(NH₃)₂]⁺',  lgK: 7.24,  note: 'Реактив Толленса; AgCl розчиняється в NH₃' },
    { ligand: 'NH₃',        metal: 'Co³⁺', formula: '[Co(NH₃)₆]³⁺', lgK: 35.2,  note: 'Жовто-оранжевий; класичний d⁶ комплекс' },
    { ligand: 'NH₃',        metal: 'Ni²⁺', formula: '[Ni(NH₃)₆]²⁺', lgK: 8.74,  note: 'Фіолетово-синій' },
    { ligand: 'NH₃',        metal: 'Zn²⁺', formula: '[Zn(NH₃)₄]²⁺', lgK: 9.46,  note: 'Безбарвний; ZnO розчиняється в NH₃' },
    // Тіоціанатні комплекси
    { ligand: 'SCN⁻',       metal: 'Fe³⁺', formula: '[Fe(SCN)]²⁺',  lgK: 3.03,  note: 'Кров\'яно-червоний; якісна реакція на Fe³⁺' },
    { ligand: 'SCN⁻',       metal: 'Co²⁺', formula: '[Co(SCN)₄]²⁻', lgK: 3.00,  note: 'Синій у безводному ацетоні; ідент. Co²⁺' },
    // Гідроксокомплекси
    { ligand: 'OH⁻',        metal: 'Al³⁺', formula: '[Al(OH)₄]⁻',   lgK: 33.0,  note: 'Тетрагідроксоалюмінат; Al(OH)₃ розч. у надл. NaOH' },
    { ligand: 'OH⁻',        metal: 'Zn²⁺', formula: '[Zn(OH)₄]²⁻',  lgK: 17.66, note: 'Тетрагідроксоцинкат; Zn(OH)₂ — амфотерний' },
    { ligand: 'OH⁻',        metal: 'Cr³⁺', formula: '[Cr(OH)₄]⁻',   lgK: 29.9,  note: 'Cr(OH)₃ амфотерний; розч. у лузі' },
    // Комплекси з Cl⁻
    { ligand: 'Cl⁻',        metal: 'Hg²⁺', formula: '[HgCl₄]²⁻',   lgK: 15.1,  note: 'Тетрахлоромеркурат; стійкий ком. Hg²⁺' },
    { ligand: 'Cl⁻',        metal: 'Pt²⁺', formula: '[PtCl₄]²⁻',   lgK: 16.0,  note: 'Тетрахлороплатинат; K₂[PtCl₄]' },
    // Оксалатні комплекси
    { ligand: 'C₂O₄²⁻',    metal: 'Fe³⁺', formula: '[Fe(C₂O₄)₃]³⁻', lgK: 20.2, note: 'Трисоксалатоферрат(III); фоточутливий' },
    { ligand: 'C₂O₄²⁻',    metal: 'Ca²⁺', formula: '[CaC₂O₄]',     lgK: 3.19,  note: 'Слабкий; CaC₂O₄ практично нерозчинний (Ksp=2.3×10⁻⁹)' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔗 Константи стійкості комплексних сполук</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        lgK = log(K<sub>ст</sub>) — логарифм константи стійкості комплексу. Чим більший lgK, тим стійкіший комплекс. T = 25°C, I = 0.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Ліганд</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Метал</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Формула</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">lgK</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    // Group by ligand
    let lastLigand = '';
    this.data.forEach((r, i) => {
      const isNew = r.ligand !== lastLigand;
      lastLigand = r.ligand;
      const lgKColor = r.lgK >= 20 ? '#FF5252' : r.lgK >= 10 ? '#FFB300' : '#00E5CC';
      const rowBg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      html += `<tr style="background:${rowBg};border-bottom:0.5px solid #1e2240">
        <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:${isNew?'700':'400'};border-top:${isNew?'1px solid #2a3060':'none'}">${isNew ? r.ligand : ''}</td>
        <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#fff">${r.metal}</td>
        <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#00E5CC">${r.formula}</td>
        <td style="padding:9px 12px;text-align:center;font-family:'Oxanium',monospace;font-weight:700;color:${lgKColor}">${r.lgK.toFixed(2)}</td>
        <td style="padding:9px 12px;color:#7080b8;line-height:1.4">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
    <div style="margin-top:14px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
      💡 <b style="color:#4FC3F7">Шкала стійкості lgK:</b>
      <span style="color:#00E5CC">≤ 10 — слабкі</span> &nbsp;|&nbsp;
      <span style="color:#FFB300">10–20 — середні</span> &nbsp;|&nbsp;
      <span style="color:#FF5252">&gt; 20 — дуже стійкі</span>.<br>
      K<sub>нест</sub> = 1 / K<sub>ст</sub>. Ліганди з вищою дентатністю (ЕДТА — гексадентатний) утворюють стійкіші комплекси за рахунок <b style="color:#fff">хелатного ефекту</b>.
    </div>`;

    c.innerHTML = html;
  }
};
