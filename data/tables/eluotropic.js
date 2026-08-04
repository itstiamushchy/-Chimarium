// ============ Т-28: ЕЛЮОТРОПНИЙ РЯД РОЗЧИННИКІВ (ХРОМАТОГРАФІЯ) ============
// Джерело: Snyder L.R. J. Chromatogr. 92 (1974) 223-230; класична шкала Снайдера
//          Skoog D.A., Leary J.J. Principles of Instrumental Analysis, 5th ed.
//          Bauer H.H. et al. Instrumental Analysis (1978)
// ε° — сила елюента на силікагелі (шкала Снайдера), P' — індекс полярності

const TABLE_ELUOTROPIC = {
  id: 'eluotropic',
  title: 'Елюотропний ряд розчинників',
  topic: '6-3-instrumental',
  data: [
    {solvent:'н-Пентан',          formula:'C₅H₁₂',        polarity:0.0,  eValue:0.00,  note:'Аполярний, вуглеводні'},
    {solvent:'н-Гексан',          formula:'C₆H₁₄',        polarity:0.0,  eValue:0.01,  note:'Найпоширеніший старт-розчинник'},
    {solvent:'н-Гептан',          formula:'C₇H₁₆',        polarity:0.0,  eValue:0.01,  note:'Аналог гексану'},
    {solvent:'Циклогексан',       formula:'C₆H₁₂',        polarity:0.2,  eValue:0.04,  note:'Слабополярний'},
    {solvent:'Тетрахлорид вуглецю',formula:'CCl₄',        polarity:1.6,  eValue:0.18,  note:'Хлорвмісний, слабкий елюент'},
    {solvent:'Ізопропіловий ефір',formula:'(i-C₃H₇)₂O',  polarity:2.4,  eValue:0.28,  note:'Помірний елюент'},
    {solvent:'Толуен',            formula:'C₇H₈',          polarity:2.4,  eValue:0.29,  note:'Ароматичний'},
    {solvent:'Діетиловий ефір',   formula:'(C₂H₅)₂O',     polarity:2.8,  eValue:0.38,  note:'Сильніший за аліфатичні ефіри'},
    {solvent:'Хлороформ',         formula:'CHCl₃',         polarity:4.1,  eValue:0.40,  note:'Дипольний, середній елюент'},
    {solvent:'Дихлорометан',      formula:'CH₂Cl₂',        polarity:3.1,  eValue:0.42,  note:'ДХМ — дуже поширений'},
    {solvent:'Тетрагідрофуран',   formula:'C₄H₈O',         polarity:4.0,  eValue:0.57,  note:'ТГФ — змішується з водою'},
    {solvent:'Ацетон',            formula:'(CH₃)₂CO',      polarity:5.1,  eValue:0.56,  note:'Полярний протоаперт.'},
    {solvent:'н-Пропанол',        formula:'C₃H₇OH',        polarity:4.0,  eValue:0.82,  note:'Сильний елюент'},
    {solvent:'Етанол',            formula:'C₂H₅OH',        polarity:4.3,  eValue:0.88,  note:'Протонодонор'},
    {solvent:'Метанол',           formula:'CH₃OH',          polarity:5.1,  eValue:0.95,  note:'Найсильніший протодон. елюент'},
    {solvent:'Ацетонітрил',       formula:'CH₃CN',          polarity:5.8,  eValue:0.65,  note:'Полярний апротонний, ВЕРХ'},
    {solvent:'Вода',              formula:'H₂O',            polarity:9.0,  eValue:largeVal=1.0, note:'Найполярніший, обернена фаза'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const maxP = 9.0;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🧪 Елюотропний ряд розчинників (хроматографія)</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: Snyder L.R. J. Chromatogr. 92, 223 (1974) · Skoog & Leary, Principles of Instrumental Analysis 5th ed. · Сорбент: силікагель (пряма фаза)</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Розчинник</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Формула</th>
          <th style="text-align:right;padding:9px 12px;color:#FFB300">Полярність P'</th>
          <th style="text-align:right;padding:9px 12px;color:#00E5CC">ε° (силікагель)</th>
          <th style="text-align:left;padding:9px 12px;color:#7080b8">Примітка</th>
        </tr></thead><tbody>`;
    this.data.forEach((r, i) => {
      const barW = Math.round((r.polarity / maxP) * 80);
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff;font-weight:600">${r.solvent}</td>
        <td style="padding:8px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
        <td style="padding:8px 12px;text-align:right">
          <span style="font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.polarity.toFixed(1)}</span>
          <div style="background:#1e2240;border-radius:3px;height:4px;margin-top:4px"><div style="background:#FFB300;width:${barW}%;height:4px;border-radius:3px"></div></div>
        </td>
        <td style="padding:8px 12px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.eValue.toFixed(2)}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:12px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">P'</b> — індекс полярності Снайдера. &nbsp;
        <b style="color:#4FC3F7">ε°</b> — сила елюента на силікагелі: більше ε° → сильніше вимиває речовини з колонки (пряма фаза). В оберненій фазі порядок протилежний.
      </div>`;
    c.innerHTML = html;
  }
};
