// ============ Т-35: МОЛЕКУЛЯРНО-КІНЕТИЧНІ КОНСТАНТИ ГАЗІВ ============
// Джерела: Chapman S., Cowling T.G. The Mathematical Theory of Non-Uniform Gases, 3rd ed. (1970);
//   Atkins P.W., de Paula J. Physical Chemistry, 10th ed. (2014), Ch. 20;
//   CRC Handbook of Chemistry and Physics, 104th ed. (2023).
//   λ при н.у. (0°C, 101.3 кПа); <v> при 25°C.
//   d — ефективний кінетичний діаметр (σ за потенціалом Леннарда-Джонса).

const TABLE_KINETIC = {
  id: 'kinetic',
  title: 'Молекулярно-кінетичні константи газів',
  topic: '3-2-kinetics',
  data: [
    // name, M (г/моль), d (нм), lambda_stp (нм, при 0°C, 1 атм), v_mean_25 (м/с при 25°C)
    { name: 'Водень H₂',      M: 2.016,  d: 0.289, lambda_stp: 112,  v_mean_25: 1769 },
    { name: 'Гелій He',       M: 4.003,  d: 0.258, lambda_stp: 174,  v_mean_25: 1257 },
    { name: 'Неон Ne',        M: 20.18,  d: 0.275, lambda_stp: 132,  v_mean_25:  559 },
    { name: 'Азот N₂',        M: 28.01,  d: 0.364, lambda_stp:  66,  v_mean_25:  476 },
    { name: 'Кисень O₂',      M: 32.00,  d: 0.346, lambda_stp:  71,  v_mean_25:  445 },
    { name: 'Аргон Ar',       M: 39.95,  d: 0.340, lambda_stp:  70,  v_mean_25:  398 },
    { name: 'Вуглекислий газ CO₂', M: 44.01, d: 0.394, lambda_stp: 44, v_mean_25: 379 },
    { name: 'Аміак NH₃',      M: 17.03,  d: 0.326, lambda_stp:  92,  v_mean_25:  609 },
    { name: 'Хлор Cl₂',       M: 70.91,  d: 0.412, lambda_stp:  28,  v_mean_25:  299 },
    { name: 'Метан CH₄',      M: 16.04,  d: 0.380, lambda_stp:  53,  v_mean_25:  627 },
    { name: 'Повітря (умов.)',  M: 28.97,  d: 0.362, lambda_stp:  67,  v_mean_25:  467 },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔬 Молекулярно-кінетичні константи газів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        <b style="color:#4FC3F7">d</b> — ефективний кінетичний діаметр молекули (нм, σ за Леннардом-Джонсом).
        <b style="color:#4FC3F7">λ</b> — середня довжина вільного пробігу (нм) при н.у. (0°C, 101.3 кПа):
        λ = 1/(√2·π·d²·N/V). <b style="color:#4FC3F7">&lt;v&gt;</b> — середня арифметична швидкість (м/с) при 25°C:
        &lt;v&gt; = √(8RT/(πM)).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Газ</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">M (г/моль)</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">d (нм)</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">λ (нм) при н.у.</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">&lt;v&gt; (м/с) при 25°C</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      html += `
          <tr style="background:${bg};border-bottom:0.5px solid #1e2240">
            <td style="padding:9px 12px;color:#ffffff;font-weight:600">${r.name}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#c8d0e8">${r.M}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#CE93D8">${r.d}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.lambda_stp}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.v_mean_25}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      </div>
      <div style="margin-top:14px;font-size:11px;color:#4a5580;line-height:1.6">
        Джерела: Atkins P.W., de Paula J. Physical Chemistry, 10th ed. (2014);
        CRC Handbook of Chemistry and Physics, 104th ed. (2023);
        Chapman S., Cowling T.G. Mathematical Theory of Non-Uniform Gases, 3rd ed. (1970).
      </div>`;

    c.innerHTML = html;
  }
};
