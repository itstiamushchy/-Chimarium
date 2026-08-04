// ============ Т-39: ТЕРМОДИНАМІЧНІ ПОТЕНЦІАЛИ ============
// Джерела: Atkins «Physical Chemistry» 11th ed.; Callen «Thermodynamics» 2nd ed.;
//          IUPAC Green Book 3rd ed. (2007)

const TABLE_POTENTIALS = {
  id: 'potentials',
  title: 'Термодинамічні потенціали',
  topic: '3-1-thermodynamics',
  data: [
    {
      name:'Внутрішня енергія',
      symbol:'U',
      definition:'dU = TdS − pdV',
      unit:'Дж',
      note:'Повна енергія системи (теплова + хімічна + ін.); природні змінні: S, V'
    },
    {
      name:'Ентальпія',
      symbol:'H',
      definition:'H = U + pV; dH = TdS + Vdp',
      unit:'Дж',
      note:'Теплота при p = const; природні змінні: S, p; ΔH = qp'
    },
    {
      name:'Енергія Гельмгольца (вільна енергія)',
      symbol:'A (або F)',
      definition:'A = U − TS; dA = −SdT − pdV',
      unit:'Дж',
      note:'Максимальна робота при T, V = const; природні змінні: T, V'
    },
    {
      name:'Енергія Гіббса (вільна ентальпія)',
      symbol:'G',
      definition:'G = H − TS; dG = −SdT + Vdp',
      unit:'Дж',
      note:'Критерій самочинності при T, p = const; G → min в рівновазі; ΔG = ΔH − TΔS'
    },
    {
      name:'Велика канонічна потенціал',
      symbol:'Ω',
      definition:'Ω = A − μN; dΩ = −SdT − pdV − Ndμ',
      unit:'Дж',
      note:'Для відкритих систем зі змінним N; статистична термодинаміка'
    },
    {
      name:'Хімічний потенціал',
      symbol:'μᵢ',
      definition:'μᵢ = (∂G/∂nᵢ)T,p,nⱼ = (∂U/∂nᵢ)S,V,nⱼ',
      unit:'Дж/моль',
      note:'Зміна G при додаванні 1 моль компонента i; умова рівноваги: μᵢ(α)=μᵢ(β)'
    },
    {
      name:'Ентропія',
      symbol:'S',
      definition:'dS = δqrev/T; S = kB ln W',
      unit:'Дж/К',
      note:'Міра безладу / «розподіл» енергії; 2-й закон: dS ≥ 0 (ізол. сист.)'
    },
    {
      name:'Ексергія (потенціал максимальної роботи)',
      symbol:'Ex',
      definition:'Ex = (U − U₀) + p₀(V − V₀) − T₀(S − S₀)',
      unit:'Дж',
      note:'Максимальна корисна робота відносно довкілля; Ex ≥ 0; Ex = 0 в рівновазі'
    },
    {
      name:'Потенціал Масьє',
      symbol:'J (= −A/T)',
      definition:'J = −A/T = S − U/T',
      unit:'Дж/К',
      note:'Використовується у формалізмі ентропійного представлення термодинаміки'
    },
    {
      name:'Потенціал Планка (Планкова функція)',
      symbol:'Y (= −G/T)',
      definition:'Y = −G/T = S − H/T',
      unit:'Дж/К',
      note:'Аналог G в ентропійному представленні; max при рівновазі T, p = const'
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🌡️ Термодинамічні потенціали</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: Atkins Physical Chemistry 11th ed. · Callen Thermodynamics 2nd ed. · IUPAC Green Book 3rd ed.</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Зв'язки Максвела:</b> з кожного потенціалу виводяться 4 тотожності другого порядку.<br>
        Наприклад, з dG = −SdT + Vdp → <b>(∂S/∂p)T = −(∂V/∂T)p</b>.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Назва</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Символ</th>
            <th style="text-align:left;padding:9px 14px;color:#4FC3F7">Визначення / диференціал</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Одиниця</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:9px 12px;color:#ffffff">${r.name}</td>
            <td style="padding:9px 10px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-size:15px;font-weight:700;white-space:nowrap">${r.symbol}</td>
            <td style="padding:9px 14px;color:#FFB300;font-family:'Oxanium',monospace;font-size:11px;white-space:nowrap">${r.definition}</td>
            <td style="padding:9px 10px;text-align:center;color:#CE93D8;white-space:nowrap">${r.unit}</td>
            <td style="padding:9px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
