// ============ Т-31: МАС-СПЕКТРОМЕТРІЯ — ХАРАКТЕРИСТИЧНІ МАСИ ============
// Джерела: McLafferty F.W., Tureček F. Interpretation of Mass Spectra, 4th ed. (1993);
//   Silverstein R.M. et al. Spectrometric Identification of Organic Compounds, 8th ed. (2014);
//   NIST Mass Spectrometry Data Center; Gross J.H. Mass Spectrometry: A Textbook, 3rd ed. (2017).

const TABLE_MASS_SPEC = {
  id: 'mass_spec',
  title: 'Мас-спектрометрія — характеристичні маси',
  topic: '6-3-instrumental',
  data: [
    { fragment: 'M⁺',       mz: 'M',    note: 'Молекулярний іон (ціла молекула без одного електрона)' },
    { fragment: 'M−1',      mz: 'M−1',  note: 'Втрата H• (радикала водню); характерно для альдегідів' },
    { fragment: 'M−2',      mz: 'M−2',  note: 'Втрата H₂; спостерігається у циклічних сполуках' },
    { fragment: 'M−15',     mz: 'M−15', note: 'Втрата CH₃•; характерно для метилвмісних сполук' },
    { fragment: 'M−17',     mz: 'M−17', note: 'Втрата OH• або NH₃; характерно для спиртів, амінів' },
    { fragment: 'M−18',     mz: 'M−18', note: 'Втрата H₂O; спирти, альдегіди, кетони, карбонові кислоти' },
    { fragment: 'M−19',     mz: 'M−19', note: 'Втрата F•; фторовмісні сполуки' },
    { fragment: 'M−20',     mz: 'M−20', note: 'Втрата HF; фторовмісні сполуки' },
    { fragment: 'M−26',     mz: 'M−26', note: 'Втрата C₂H₂; ароматичні вуглеводні' },
    { fragment: 'M−27',     mz: 'M−27', note: 'Втрата HCN; азотовмісні ароматики, піридини' },
    { fragment: 'M−28',     mz: 'M−28', note: 'Втрата CO (кетони, хінони) або C₂H₄ (естери, аліфатика)' },
    { fragment: 'M−29',     mz: 'M−29', note: 'Втрата CHO• або C₂H₅•; альдегіди, етилвмісні сполуки' },
    { fragment: 'M−31',     mz: 'M−31', note: 'Втрата OCH₃•; метоксисполуки, метилові естери' },
    { fragment: 'M−32',     mz: 'M−32', note: 'Втрата CH₃OH або S; метилові ефіри, сірковмісні' },
    { fragment: 'M−35/37',  mz: 'M−35/37', note: 'Втрата Cl•; ізотопний дублет (³⁵Cl/³⁷Cl = 3:1)' },
    { fragment: 'M−36',     mz: 'M−36', note: 'Втрата HCl; хлоровмісні сполуки' },
    { fragment: 'M−43',     mz: 'M−43', note: 'Втрата CH₃CO• (ацетил); метилкетони, ацетати' },
    { fragment: 'M−44',     mz: 'M−44', note: 'Втрата CO₂ або C₃H₈; карбонові кислоти, карбонати' },
    { fragment: 'M−45',     mz: 'M−45', note: 'Втрата OC₂H₅• або COOH•; етилові ефіри, кислоти' },
    { fragment: 'M−46',     mz: 'M−46', note: 'Втрата NO₂• або C₂H₅OH; нітросполуки, етилові ефіри' },
    { fragment: 'M−48',     mz: 'M−48', note: 'Втрата SO•; сульфоксиди, сульфони' },
    { fragment: 'M−60',     mz: 'M−60', note: 'Втрата CH₃COOH (оцтова кислота); ацетати (McLafferty+)' },
    { fragment: 'M−79/81',  mz: 'M−79/81', note: 'Втрата Br•; ізотопний дублет (⁷⁹Br/⁸¹Br = 1:1)' },
    { fragment: 'M−80',     mz: 'M−80', note: 'Втрата HBr або SO₃; бромовмісні, сульфонові кислоти' },
    { fragment: 'm/z 29',   mz: '29',   note: 'CHO⁺ або C₂H₅⁺; характерно для аліфатичних альдегідів' },
    { fragment: 'm/z 43',   mz: '43',   note: 'CH₃CO⁺ (ацетил-катіон); метилкетони, ацетати' },
    { fragment: 'm/z 45',   mz: '45',   note: 'OC₂H₅⁺ або COOH⁺; етилові ефіри, кислоти' },
    { fragment: 'm/z 57',   mz: '57',   note: 'C₄H₉⁺ або C₃H₅O⁺; бутильний катіон, бутилові сполуки' },
    { fragment: 'm/z 77',   mz: '77',   note: 'C₆H₅⁺ (феніл-катіон); моноароматичні сполуки' },
    { fragment: 'm/z 91',   mz: '91',   note: 'C₇H₇⁺ (тропілій-катіон); толуол, бензильні сполуки' },
    { fragment: 'm/z 105',  mz: '105',  note: 'C₆H₅CO⁺ (бензоїл); ароматичні кетони' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔭 Мас-спектрометрія — характеристичні фрагменти</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Характеристичні іони та нейтральні втрати у мас-спектрах органічних сполук (EI, 70 еВ).
        M — молекулярна маса сполуки. Джерело: McLafferty &amp; Tureček, 4th ed.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Фрагмент</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">m/z</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка / інтерпретація</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      html += `
          <tr style="background:${bg};border-bottom:0.5px solid #1e2240">
            <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.fragment}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC">${r.mz}</td>
            <td style="padding:9px 12px;color:#c8d0e8;line-height:1.5">${r.note}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      </div>
      <div style="margin-top:14px;font-size:11px;color:#4a5580;line-height:1.6">
        Джерела: McLafferty F.W., Tureček F. Interpretation of Mass Spectra, 4th ed. (1993);
        Silverstein R.M. et al. Spectrometric Identification of Organic Compounds, 8th ed. (2014); NIST MS Database.
      </div>`;

    c.innerHTML = html;
  }
};
