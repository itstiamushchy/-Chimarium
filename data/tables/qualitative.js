// ============ Т-17: ЯКІСНІ РЕАКЦІЇ НА ІОНИ ============
// Джерела: Аналітична хімія, Ю.Ю.Лурьє (1989);
// Qualitative Analysis, Feigl & Anger (1972);
// IUPAC Compendium of Analytical Nomenclature (2002);
// Черних В.П. та ін., Фармацевтична хімія (2012).

const TABLE_QUALITATIVE = {
  id: 'qualitative',
  title: 'Якісні реакції на іони',
  topic: '6-1-qualitative',
  data: [
    // === КАТІОНИ ===
    { type: 'cat', ion: 'H⁺',    reagent: 'Лакмус / метилоранж',       effect: 'Лакмус → червоний; МО → червоний',         note: 'pH < 7' },
    { type: 'cat', ion: 'Na⁺',   reagent: 'Полум\'я пальника',           effect: 'Жовте полум\'я (589 нм)',                   note: 'Маскує інші метали' },
    { type: 'cat', ion: 'K⁺',    reagent: 'Полум\'я через синє скло',    effect: 'Фіолетове (767 нм)',                        note: 'Синє скло поглинає жовтий Na' },
    { type: 'cat', ion: 'NH₄⁺',  reagent: 'NaOH + нагрів',              effect: 'NH₃↑ — різкий запах; синіє лакмус',        note: 'Білий дим з HCl' },
    { type: 'cat', ion: 'Li⁺',   reagent: 'Полум\'я',                    effect: 'Карміново-червоне (670 нм)',                note: 'Відрізн. від Na за кольором' },
    { type: 'cat', ion: 'Ca²⁺',  reagent: 'Na₂C₂O₄ або (NH₄)₂C₂O₄',   effect: 'CaC₂O₄↓ білий (нерозч. оцтова к-та)',     note: 'Полум\'я: цегл.-червоне (622 нм)' },
    { type: 'cat', ion: 'Ba²⁺',  reagent: 'H₂SO₄ (розб.)',              effect: 'BaSO₄↓ білий (нерозч. HCl і HNO₃!)',      note: 'Полум\'я: зелено-жовте (554 нм)' },
    { type: 'cat', ion: 'Sr²⁺',  reagent: 'Полум\'я',                    effect: 'Яскраво-червоне (606 нм)',                 note: 'Фаєрверки' },
    { type: 'cat', ion: 'Mg²⁺',  reagent: 'NaOH → Mg(OH)₂↓',           effect: 'Білий желеподібний осад',                  note: 'Розч. у NH₄Cl; с хінолізарином → синій' },
    { type: 'cat', ion: 'Al³⁺',  reagent: 'NaOH (надлишок)',            effect: 'Al(OH)₃↓ білий, розч. у надл. NaOH',      note: 'Амфотерний. Алізарин → червоний' },
    { type: 'cat', ion: 'Cr³⁺',  reagent: 'NaOH',                       effect: 'Cr(OH)₃↓ сіро-зелений; розч. у надл.',    note: 'Окисн. H₂O₂ в лузі → CrO₄²⁻ (жовт.)' },
    { type: 'cat', ion: 'Fe²⁺',  reagent: 'K₃[Fe(CN)₆]',               effect: 'Fe₄[Fe(CN)₆]₃ — берлінська блакить',      note: 'Також NaOH → Fe(OH)₂↓ зелен.' },
    { type: 'cat', ion: 'Fe³⁺',  reagent: 'KSCN',                       effect: '[Fe(SCN)]²⁺ — кров\'яно-червоний',         note: 'Чутливість до 10⁻⁶ М. K₄[Fe(CN)₆] → берл. блакить' },
    { type: 'cat', ion: 'Co²⁺',  reagent: 'KSCN / ацетон',              effect: '[Co(SCN)₄]²⁻ — синій у ацетоні',          note: 'NaOH → Co(OH)₂↓ рожевий' },
    { type: 'cat', ion: 'Ni²⁺',  reagent: 'диметилгліоксим (pH 5–9)',   effect: 'Ni(C₄H₇N₂O₂)₂↓ яскраво-червоний',       note: 'Реакція Чугаєва; чутливість 10⁻⁶ г/мл' },
    { type: 'cat', ion: 'Cu²⁺',  reagent: 'NaOH або NH₃',              effect: 'Cu(OH)₂↓ синій; надл. NH₃ → [Cu(NH₃)₄]²⁺', note: 'Яскраво-синій комплекс; з I⁻ → CuI↓ + I₂' },
    { type: 'cat', ion: 'Zn²⁺',  reagent: 'NaOH (надлишок)',            effect: 'Zn(OH)₂↓ білий, розч. у надл. NaOH',      note: 'H₂S → ZnS↓ білий (розч. в HCl)' },
    { type: 'cat', ion: 'Mn²⁺',  reagent: 'NaOH → Mn(OH)₂↓',           effect: 'Білий → буріє на повітрі (MnO₂)',         note: 'PbO₂/HNO₃ → MnO₄⁻ фіолетовий' },
    { type: 'cat', ion: 'Ag⁺',   reagent: 'HCl (розб.)',                effect: 'AgCl↓ білий (нерозч. HNO₃, розч. NH₃)',   note: 'Na₂S → Ag₂S↓ чорний' },
    { type: 'cat', ion: 'Pb²⁺',  reagent: 'H₂SO₄ (розб.)',             effect: 'PbSO₄↓ білий (нерозч. HNO₃)',             note: '⚠️ Токсичний! K₂CrO₄ → PbCrO₄↓ жовтий' },
    { type: 'cat', ion: 'Hg²⁺',  reagent: 'KI',                         effect: 'HgI₂↓ алий → [HgI₄]²⁻ розч. (надл. KI)', note: '⚠️ Токсичний! SnCl₂ → Hg↓ чорний' },
    { type: 'cat', ion: 'Cd²⁺',  reagent: 'H₂S або Na₂S',              effect: 'CdS↓ жовтий (нерозч. у розб. H₂SO₄)',    note: '⚠️ Токсичний!' },
    { type: 'cat', ion: 'Bi³⁺',  reagent: 'H₂O (розбавлення)',          effect: 'BiOCl↓ або Bi(OH)₃↓ білий гідроліз',     note: 'SnCl₂ у лузі → Bi (чорний)' },
    // === АНІОНИ ===
    { type: 'an',  ion: 'OH⁻',   reagent: 'Фенолфталеїн',               effect: 'Малиновий колір (pH > 8.2)',               note: 'pH > 7; лакмус → синій' },
    { type: 'an',  ion: 'Cl⁻',   reagent: 'AgNO₃ + HNO₃',              effect: 'AgCl↓ білий (нерозч. HNO₃, розч. NH₃)',   note: 'AgBr жовтуватий; AgI жовтий' },
    { type: 'an',  ion: 'Br⁻',   reagent: 'AgNO₃; Cl₂(водн.)',          effect: 'AgBr↓ блідо-жовт.; Br₂ (буріє)',          note: 'Бром: ж/оранж. в CCl₄' },
    { type: 'an',  ion: 'I⁻',    reagent: 'AgNO₃; Cl₂ + крохмаль',     effect: 'AgI↓ жовт.; I₂+крохмаль → синьо-чорний', note: 'Найчутливіша реакція 10⁻⁶ М I₂' },
    { type: 'an',  ion: 'SO₄²⁻', reagent: 'BaCl₂ + HCl',               effect: 'BaSO₄↓ білий (нерозч. HCl і HNO₃!)',      note: 'Відрізн. від SO₃²⁻: SO₃ — розч. HCl' },
    { type: 'an',  ion: 'SO₃²⁻', reagent: 'BaCl₂; кислота',            effect: 'BaSO₃↓ (розч. HCl!); SO₂↑ задушл. запах', note: 'MnO₄⁻ → знебарвлення' },
    { type: 'an',  ion: 'S²⁻',   reagent: 'Pb(CH₃COO)₂ (папірець)',     effect: 'H₂S↑ + PbAc₂ → PbS чорний папірець',    note: 'AgNO₃ → Ag₂S↓ чорний' },
    { type: 'an',  ion: 'CO₃²⁻', reagent: 'Кислота → Ca(OH)₂',         effect: 'CO₂↑ → помутн. вапн. води (CaCO₃↓)',     note: 'HCO₃⁻ не дає осаду з Ca(OH)₂' },
    { type: 'an',  ion: 'NO₃⁻',  reagent: 'FeSO₄ + H₂SO₄(конц.)',      effect: 'Буре кільце [Fe(H₂O)₅NO]²⁺',             note: 'Дифениламін → синій' },
    { type: 'an',  ion: 'NO₂⁻',  reagent: 'Кислота + KI + крохмаль',   effect: 'NO↑ (буріє); I₂ + крохмаль → синій',      note: 'Суміш Гріса → рожевий/черв.' },
    { type: 'an',  ion: 'PO₄³⁻', reagent: 'AgNO₃; молібдатний р-н',   effect: 'Ag₃PO₄↓ жовт. (розч. HNO₃ і NH₃)',       note: '(NH₄)₂MoO₄/HNO₃ → жовт. криcт. осад' },
    { type: 'an',  ion: 'F⁻',    reagent: 'CaCl₂',                      effect: 'CaF₂↓ білий желатиноподібний',            note: 'Розч. HCl; ZrCl₂/ализарин → знебарвл.' },
    { type: 'an',  ion: 'CrO₄²⁻', reagent: 'AgNO₃; BaCl₂',            effect: 'Ag₂CrO₄↓ цегл.-черв.; BaCrO₄↓ жовт.',    note: 'Кисле середовище → Cr₂O₇²⁻ (оранж.)' },
    { type: 'an',  ion: 'MnO₄⁻', reagent: 'Відновники (FeSO₄, Na₂SO₃)',effect: 'Фіолетовий → безбарвний',                  note: 'Ksp кислого → Mn²⁺; нейтр. → MnO₂↓' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const cations = this.data.filter(r => r.type === 'cat');
    const anions  = this.data.filter(r => r.type === 'an');

    const buildTable = (rows) => {
      let t = `<table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:18px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Іон</th>
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Реагент</th>
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Ефект / Спостереження</th>
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead><tbody>`;
      rows.forEach((r, i) => {
        const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
        t += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
          <td style="padding:9px 12px;font-family:'Oxanium',monospace;font-weight:700;color:#00E5CC;white-space:nowrap">${r.ion}</td>
          <td style="padding:9px 12px;color:#c0c8e8;line-height:1.4">${r.reagent}</td>
          <td style="padding:9px 12px;color:#fff;line-height:1.4">${r.effect}</td>
          <td style="padding:9px 12px;color:#7080b8;font-size:11px;line-height:1.4">${r.note}</td>
        </tr>`;
      });
      t += `</tbody></table>`;
      return t;
    };

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔍 Якісні реакції на іони</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Специфічні реакції для ідентифікації катіонів і аніонів. Основні ефекти: ↓ осад, ↑ газ, зміна кольору.
      </div>
      <div style="font-family:'Oxanium',monospace;font-size:13px;font-weight:700;color:#FFB300;margin-bottom:8px;padding:6px 12px;background:#1a1000;border-radius:6px;display:inline-block">⬆ КАТІОНИ (${cations.length})</div>
      <div style="overflow-x:auto">${buildTable(cations)}</div>
      <div style="font-family:'Oxanium',monospace;font-size:13px;font-weight:700;color:#69F0AE;margin-bottom:8px;padding:6px 12px;background:#001a10;border-radius:6px;display:inline-block">⬇ АНІОНИ (${anions.length})</div>
      <div style="overflow-x:auto">${buildTable(anions)}</div>
      <div style="margin-top:4px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Порядок систематичного аналізу катіонів:</b>
        1) NH₄⁺ (NaOH+нагрів) → 2) HCl (Ag⁺, Pb²⁺, Hg₂²⁺) → 3) H₂SO₄ (Ba²⁺, Sr²⁺, Ca²⁺) → 4) NaOH амфотерні (Al³⁺, Cr³⁺, Zn²⁺) → 5) NH₃ (Fe, Co, Ni, Mn) → 6) H₂S (Cu²⁺, Cd²⁺, Hg²⁺).
      </div>`;

    c.innerHTML = html;
  }
};
