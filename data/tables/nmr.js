// ============ Т-19: ЯМР-СПЕКТРОСКОПІЯ — ХІМІЧНІ ЗСУВИ ============
// Джерела: Silverstein, Bassler & Morrill, Spectrometric Identification
//   of Organic Compounds, 8th ed. (2014);
// Breitmaier & Voelter, Carbon-13 NMR Spectroscopy, 3rd ed. (1987);
// Fulmer et al., Organometallics 29, 2010 (розчинники).

const TABLE_NMR = {
  id: 'nmr',
  title: 'ЯМР — хімічні зсуви',
  topic: '6-3-instrumental',

  protons: [
    // Аліфатичні CH
    { proton: 'CH₄ (метан)',             shift: '0.23',    multiplicity: 'с',      note: 'Еталон δ≈0; ТМС: δ=0.00' },
    { proton: 'CH₃ (алкан, RCH₃)',       shift: '0.8–1.0', multiplicity: 'с/д/т', note: 'Ізольований CH₃: ~0.9; прибл. д (CH₃CH)' },
    { proton: 'CH₂ (алкан, RCH₂R)',      shift: '1.2–1.4', multiplicity: 'м',     note: 'Множинна мультиплетність' },
    { proton: 'CH (алкан, R₃CH)',         shift: '1.4–1.7', multiplicity: 'м',     note: 'Секстет або більш складний' },
    { proton: 'CH₂–C=O (α до карбонілу)',shift: '2.1–2.6', multiplicity: 'м/т',   note: 'Зсув через –I ефект C=O' },
    { proton: 'CH₃–C=O (ацетил)',        shift: '2.0–2.5', multiplicity: 'с',     note: 'Ацетон: 2.17; ацетальдегід: 2.20' },
    { proton: 'CH₂–Ar (бензильний)',     shift: '2.3–2.9', multiplicity: 'м',     note: 'Активований ароматичним кільцем' },
    { proton: 'CH₃–N (метиламін)',        shift: '2.2–2.9', multiplicity: 'с/д',   note: 'Аліфатичні аміни; зсув залежить від N' },
    { proton: 'CH₃–O (метокси)',         shift: '3.3–3.5', multiplicity: 'с',     note: 'Метанол: 3.43; DMSO: 2.50 (у CDCl₃: 3.30)' },
    { proton: 'CH₂–O (оксиметилен)',     shift: '3.4–4.0', multiplicity: 'т/д',   note: 'Прості ефіри, спирти' },
    { proton: 'CH–O (оксиметин)',        shift: '3.8–4.4', multiplicity: 'м',     note: 'Вторинні спирти; ацеталі ~4.7' },
    { proton: 'O–CH₂–O (метилендіокси)',shift: '5.8–6.0', multiplicity: 'с',     note: 'Характерний синглет сафролу тощо' },
    { proton: 'C=CH₂ (вінільний, =CH₂)', shift: '4.6–5.2', multiplicity: 'м',    note: 'Термінальний алкен; два сигнали (H_cis, H_trans)' },
    { proton: 'C=CH– (вінільний, =CH–)', shift: '5.0–5.7', multiplicity: 'дтд',  note: 'Внутрішній алкен' },
    { proton: '≡C–H (кінцевий алкін)',   shift: '2.3–2.7', multiplicity: 'с',     note: 'Дуже специфічний; далеко від алкенів' },
    // Ароматичні
    { proton: 'Ar–H (бензол, незамін.)', shift: '7.27',    multiplicity: 'с',     note: 'Бензол; хлороформ-d: 7.26 (розчинник)' },
    { proton: 'Ar–H (електроноакцептор)',shift: '7.5–9.0', multiplicity: 'м',     note: 'NO₂, CHO, CF₃; низькопольний зсув' },
    { proton: 'Ar–H (електронодонор)', shift: '6.5–7.4',  multiplicity: 'м',     note: 'OH, NH₂, OR; висоKопольний зсув' },
    // Спеціальні групи
    { proton: 'CHO (альдегід)',           shift: '9.5–10.5', multiplicity: 'д/с',  note: 'Ацетальдегід: 9.96; HCHO: 9.97' },
    { proton: 'COOH (карбонова кислота)', shift: '10–12',   multiplicity: 'ш.с',   note: 'Широкий; обмін D₂O → зникає' },
    { proton: 'OH (спирт)',               shift: '1–5',     multiplicity: 'ш.с',   note: 'Положення змінюється з концентрацією/T' },
    { proton: 'OH (фенол)',               shift: '4–8',     multiplicity: 'ш.с',   note: 'Більш висоKопольний, ніж кислоти' },
    { proton: 'NH₂ (первинний амін)',     shift: '0.5–3.0', multiplicity: 'ш.с',   note: 'Аліфатичні; аромат. NH₂ ~3.5–5.5' },
    { proton: 'NH (піридин, піррол)',     shift: '7.5–9.0', multiplicity: 'ш.с',   note: 'Залежить від гетероциклу' },
  ],

  carbons: [
    { proton: '¹³C: CH₄ (sp³, алкан)',        shift: '0–50',    multiplicity: 'c або DEPT',    note: 'Метан: 2.3 ppm; ізопропан: ~24' },
    { proton: '¹³C: C–O (спирт, ефір)',        shift: '50–90',   multiplicity: 'CH/CH₂ (DEPT)', note: 'MeOH C: 50.4; Et₂O: 66.3' },
    { proton: '¹³C: C≡C (алкін)',              shift: '65–95',   multiplicity: 'C/CH',          note: 'Ацетилен: 71.9 ppm' },
    { proton: '¹³C: C=C (алкен)',              shift: '100–150', multiplicity: 'CH=',           note: 'Етилен: 123.3; бензол: 128.4' },
    { proton: '¹³C: Ar–C (арен, четвертинний)',shift: '125–145', multiplicity: 'C (DEPT neg)', note: 'Бензол: 128.4; замін. різні' },
    { proton: '¹³C: C=O (альдегід)',           shift: '190–205', multiplicity: 'C',             note: 'Ацетальдегід: 200.5' },
    { proton: '¹³C: C=O (кетон)',             shift: '195–220', multiplicity: 'C',             note: 'Ацетон: 206.5' },
    { proton: '¹³C: C=O (кислота, естер)',     shift: '160–185', multiplicity: 'C',             note: 'AcOH: 179.2; EtOAc CO: 170.6' },
    { proton: '¹³C: C=O (амід)',               shift: '165–178', multiplicity: 'C',             note: 'Нижча, ніж кетон; електрон N' },
    { proton: '¹³C: C≡N (нітрил)',             shift: '115–125', multiplicity: 'C',             note: 'MeCN: 118.0; низька інтенсивність' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const buildTable = (rows, isCarbon) => {
      let t = `<table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:18px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">${isCarbon ? 'Вуглець / Тип' : 'Протон / Тип'}</th>
            <th style="padding:9px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">δ (м.ч.)</th>
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Мультиплетність</th>
            <th style="padding:9px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead><tbody>`;
      rows.forEach((r, i) => {
        const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
        const shiftNum = parseFloat(r.shift.split('–')[0]);
        let col;
        if (isCarbon) {
          col = shiftNum < 50 ? '#7080b8' : shiftNum < 100 ? '#00E5CC' : shiftNum < 160 ? '#FFB300' : '#FF5252';
        } else {
          col = shiftNum < 3 ? '#7080b8' : shiftNum < 6 ? '#00E5CC' : shiftNum < 9 ? '#FFB300' : '#FF5252';
        }
        t += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
          <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:600">${r.proton}</td>
          <td style="padding:9px 12px;text-align:center;font-family:'Oxanium',monospace;font-weight:700;color:${col};white-space:nowrap">${r.shift}</td>
          <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.multiplicity}</td>
          <td style="padding:9px 12px;color:#7080b8;font-size:11px;line-height:1.4">${r.note}</td>
        </tr>`;
      });
      return t + `</tbody></table>`;
    };

    const legend = `<div style="margin-top:6px;margin-bottom:14px;font-size:11px;color:#7080b8;line-height:1.7">
      <b style="color:#4FC3F7">Мультиплетність:</b>
      с — синглет | д — дублет | т — триплет | к — квартет | м — мультиплет | ш.с — широкий синглет.<br>
      <b style="color:#4FC3F7">Правило n+1:</b> n сусідніх H → n+1 ліній. DEPT розрізняє CH/CH₂/CH₃ у ¹³C.
    </div>`;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧲 ЯМР-спектроскопія — хімічні зсуви δ (ppm від ТМС)</div>
      ${legend}
      <div style="font-family:'Oxanium',monospace;font-size:13px;font-weight:700;color:#FFB300;margin-bottom:8px;padding:6px 12px;background:#1a1000;border-radius:6px;display:inline-block">¹H NMR — Протони (${this.protons.length} типів)</div>
      <div style="overflow-x:auto">${buildTable(this.protons, false)}</div>

      <div style="font-family:'Oxanium',monospace;font-size:13px;font-weight:700;color:#69F0AE;margin-bottom:8px;padding:6px 12px;background:#001a10;border-radius:6px;display:inline-block">¹³C NMR — Вуглеці (${this.carbons.length} типів)</div>
      <div style="overflow-x:auto">${buildTable(this.carbons, true)}</div>

      <div style="margin-top:4px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Швидка діагностика ¹H NMR:</b>
        δ &gt; 10 → кислота/альдегід | δ 7–9 → Ar–H або ненасичений | δ 4–6 → C=C–H або O–CH | δ 2–4 → α-CH до O або N | δ 0–2 → аліфатичний | Широкий сигнал → OH/NH (D₂O обмін).
      </div>`;

    c.innerHTML = html;
  }
};
