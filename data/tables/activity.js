// ============ Т-27: КОЕФІЦІЄНТИ АКТИВНОСТІ ІОНІВ ============
// Джерело: Debye-Hückel theory; розширене рівняння Девіса (Davies equation)
//          Robinson R.A., Stokes R.H. Electrolyte Solutions, 2nd ed. (1959)
//          Bard A.J., Faulkner L.R. Electrochemical Methods, 2nd ed. (2001)
// γ — середній коефіцієнт активності, розрахований за розширеним рівнянням Дебая-Гюккеля:
// lg(γ) = −A·z²·(√I / (1 + B·a·√I)) + C·I, A=0.509, B·a≈1.0 (водні розчини, 25°C)

const TABLE_ACTIVITY = {
  id: 'activity',
  title: 'Коефіцієнти активності іонів',
  topic: '4-3-electrolytes',
  data: [
    {ionicStrength:0.0005, z1:0.975, z2:0.903, z3:0.805},
    {ionicStrength:0.001,  z1:0.965, z2:0.867, z3:0.738},
    {ionicStrength:0.005,  z1:0.928, z2:0.742, z3:0.540},
    {ionicStrength:0.01,   z1:0.904, z2:0.660, z3:0.445},
    {ionicStrength:0.05,   z1:0.830, z2:0.455, z3:0.195},
    {ionicStrength:0.1,    z1:0.796, z2:0.355, z3:0.120},
    {ionicStrength:0.2,    z1:0.767, z2:0.268, z3:0.066},
    {ionicStrength:0.5,    z1:0.754, z2:0.203, z3:0.029},
    {ionicStrength:1.0,    z1:0.809, z2:0.230, z3:0.022},
    {ionicStrength:2.0,    z1:1.010, z2:0.390, z3:0.060},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚡ Коефіцієнти активності іонів</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:6px">Джерело: Robinson & Stokes, Electrolyte Solutions, 2nd ed. (1959) · розширене рівняння Дебая-Гюккеля, 25°C</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">lg γ = −0.509·z²·√I / (1 + √I) &nbsp;(наближення Девіса для I ≤ 0.5 моль/л)</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:right;padding:9px 18px;color:#4FC3F7">I (моль/л)</th>
          <th style="text-align:right;padding:9px 18px;color:#FFB300">γ (z = 1)</th>
          <th style="text-align:right;padding:9px 18px;color:#00E5CC">γ (z = 2)</th>
          <th style="text-align:right;padding:9px 18px;color:#CE93D8">γ (z = 3)</th>
        </tr></thead><tbody>`;
    this.data.forEach((r, i) => {
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700">${r.ionicStrength.toFixed(4)}</td>
        <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300">${r.z1.toFixed(3)}</td>
        <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC">${r.z2.toFixed(3)}</td>
        <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8">${r.z3.toFixed(3)}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:12px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">I</b> — іонна сила: I = ½·Σ(cᵢ·zᵢ²). &nbsp;
        <b style="color:#4FC3F7">γ → 1</b> при I → 0 (ідеальний розбавлений розчин). &nbsp;
        При I > 0.5 моль/л γ може збільшуватись понад 1 (ефект «висолювання»).
      </div>`;
    c.innerHTML = html;
  }
};
