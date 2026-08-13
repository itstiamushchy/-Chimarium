// new_calcs_3.js — Розрахунки розділів 5–7: Кінетика + Рівновага + Електрохімія
// Р-15..Р-20

window._NEW_CALCS_3 = {

  // Р-15: Рівноважні концентрації (ICE-таблиця для A ⇌ B + C)
  'ice_table_simple': ({Kc, C0_A}) => {
    Kc = +Kc; C0_A = +C0_A;
    if (Kc <= 0) throw new Error('Kc має бути > 0');
    if (C0_A <= 0) throw new Error('C₀(A) має бути > 0');
    // x² + Kc·x - Kc·C0 = 0
    const D = Kc * Kc + 4 * Kc * C0_A;
    const x = (-Kc + Math.sqrt(D)) / 2;
    const A_eq = C0_A - x;
    const alpha = (x / C0_A) * 100;
    return {
      result: `[A]=${A_eq.toFixed(5)} М, [B]=[C]=${x.toFixed(5)} М, α=${alpha.toFixed(2)}%`,
      label: 'Рівноважні концентрації (ICE A⇌B+C)',
      steps: [
        'A ⇌ B + C: ICE-таблиця',
        `Початково: [A]₀=${C0_A}, [B]₀=0, [C]₀=0`,
        'Зміна: −x, +x, +x',
        `Рівноваги: [A]=${C0_A}−x, [B]=x, [C]=x`,
        `Kc = x·x / (${C0_A}−x) → x² + ${Kc}x − ${Kc}×${C0_A} = 0`,
        `D = ${Kc}² + 4×${Kc}×${C0_A} = ${D.toExponential(4)}`,
        `x = (−${Kc} + √D) / 2 = ${x.toFixed(5)} моль/л`,
        `[A]рівн = ${C0_A} − ${x.toFixed(5)} = ${A_eq.toFixed(5)} моль/л`,
        `[B]рівн = [C]рівн = ${x.toFixed(5)} моль/л`,
        `α = x/C₀ × 100% = ${alpha.toFixed(2)}%`
      ]
    };
  },

  // Р-16: Kp ↔ Kc перерахунок
  'kp_kc_convert': ({mode, Kc_or_Kp, delta_n, T_C}) => {
    const R = 0.08206; // л·атм/(моль·К)
    const val = +Kc_or_Kp;
    const dn = Math.round(+delta_n);
    const T = +T_C + 273.15;
    if (val <= 0) throw new Error('Kc або Kp має бути > 0');
    if (T <= 0) throw new Error('T(K) має бути > 0');
    const RT_dn = Math.pow(R * T, dn);
    let Kc, Kp;
    if ((mode || 'kc') === 'kp') {
      // вхід: Kp → знайти Kc
      Kp = val;
      Kc = Kp / RT_dn;
    } else {
      // вхід: Kc → знайти Kp
      Kc = val;
      Kp = Kc * RT_dn;
    }
    return {
      result: `Kp = ${Kp.toExponential(4)}, Kc = ${Kc.toExponential(4)}`,
      label: 'Перерахунок Kp ↔ Kc',
      steps: [
        'Kp = Kc × (R·T)^Δn,  R = 0.08206 л·атм/(моль·К)',
        `T = ${+T_C}°C + 273.15 = ${T.toFixed(2)} К`,
        `Δn = ${dn}`,
        `(R·T)^Δn = (0.08206 × ${T.toFixed(2)})^${dn} = ${RT_dn.toExponential(4)}`,
        dn === 0
          ? 'Δn = 0 → Kp = Kc (тиск не впливає)'
          : `Kp = Kc × ${RT_dn.toExponential(4)}`,
        `Kc = ${Kc.toExponential(4)}`,
        `Kp = ${Kp.toExponential(4)}`
      ]
    };
  },

  // Р-17: Ea з двох вимірів k(T) — рівняння Арреніуса
  'arrhenius_ea': ({k1, T1_C, k2, T2_C}) => {
    k1 = +k1; k2 = +k2;
    const T1 = +T1_C + 273.15;
    const T2 = +T2_C + 273.15;
    const R = 8.314; // Дж/(моль·К)
    if (k1 <= 0 || k2 <= 0) throw new Error('k має бути > 0');
    if (T1 <= 0 || T2 <= 0) throw new Error('T(K) має бути > 0');
    if (T1 === T2) throw new Error('T₁ і T₂ мають відрізнятися');
    const Ea = R * Math.log(k2 / k1) / (1 / T1 - 1 / T2);
    const lnA = Math.log(k1) + Ea / (R * T1);
    const A = Math.exp(lnA);
    const Ea_kJ = Ea / 1000;
    return {
      result: `Ea = ${Ea_kJ.toFixed(2)} кДж/моль, A = ${A.toExponential(3)}`,
      label: 'Енергія активації (Арреніус)',
      steps: [
        'Ea = R × ln(k₂/k₁) / (1/T₁ − 1/T₂)',
        `R = 8.314 Дж/(моль·К)`,
        `T₁ = ${+T1_C}°C + 273.15 = ${T1.toFixed(2)} К`,
        `T₂ = ${+T2_C}°C + 273.15 = ${T2.toFixed(2)} К`,
        `ln(k₂/k₁) = ln(${k2}/${k1}) = ${Math.log(k2 / k1).toFixed(4)}`,
        `1/T₁ − 1/T₂ = ${(1/T1).toFixed(6)} − ${(1/T2).toFixed(6)} = ${(1/T1 - 1/T2).toExponential(4)}`,
        `Ea = 8.314 × ${Math.log(k2/k1).toFixed(4)} / ${(1/T1-1/T2).toExponential(4)} = ${Ea.toFixed(1)} Дж/моль`,
        `Ea = ${Ea_kJ.toFixed(2)} кДж/моль`,
        `ln(A) = ln(k₁) + Ea/(R·T₁) = ${lnA.toFixed(3)}`,
        `A = e^${lnA.toFixed(3)} = ${A.toExponential(3)}`
      ]
    };
  },

  // Р-18: Час піврозпаду і поточна концентрація (1-й порядок)
  'first_order_decay': ({k, t, C0}) => {
    k = +k; t = +t; C0 = +C0;
    if (k <= 0) throw new Error('k має бути > 0');
    if (C0 <= 0) throw new Error('C₀ має бути > 0');
    if (t < 0) throw new Error('t має бути ≥ 0');
    const t_half = 0.693147 / k;
    const Ct = C0 * Math.exp(-k * t);
    const pct = (Ct / C0) * 100;
    return {
      result: `t½ = ${t_half.toFixed(4)}, C(t) = ${Ct.toFixed(5)} моль/л, залишилось ${pct.toFixed(2)}%`,
      label: 'Кінетика 1-го порядку: t½ і C(t)',
      steps: [
        't½ = ln2 / k = 0.6931 / k',
        `t½ = 0.6931 / ${k} = ${t_half.toFixed(4)} (ті самі одиниці, що k⁻¹)`,
        '[A](t) = [A]₀ × e^(−k·t)',
        `C(t) = ${C0} × e^(−${k}×${t})`,
        `e^(−${(k*t).toFixed(4)}) = ${Math.exp(-k*t).toFixed(5)}`,
        `C(t) = ${C0} × ${Math.exp(-k*t).toFixed(5)} = ${Ct.toFixed(5)} моль/л`,
        `Залишилось = ${pct.toFixed(2)}%`
      ]
    };
  },

  // Р-19: Закон Фарадея — розширений (режими Б і В; режим А вже є в 3-4-electrochemistry_n)
  'faraday_extended': ({mode, M, I, t_s, n_el, m}) => {
    const F = 96485; // Кл/моль
    M = +M; n_el = Math.round(+n_el);
    if (M <= 0) throw new Error('M має бути > 0');
    if (n_el <= 0) throw new Error('n(e⁻) має бути > 0');

    if ((mode || 'B') === 'A') {
      // Режим А: m = M·I·t/(n·F) — маса
      I = +I; t_s = +t_s;
      if (I <= 0) throw new Error('I має бути > 0');
      if (t_s <= 0) throw new Error('t має бути > 0');
      const mass = M * I * t_s / (n_el * F);
      return {
        result: `m = ${mass.toFixed(4)} г`,
        label: 'Маса продукту (закон Фарадея)',
        steps: [
          'm = M × I × t / (n × F)',
          `F = 96485 Кл/моль`,
          `m = ${M} × ${I} × ${t_s} / (${n_el} × 96485)`,
          `m = ${(M*I*t_s).toFixed(2)} / ${(n_el*F).toFixed(0)} = ${mass.toFixed(4)} г`
        ]
      };
    } else if ((mode || 'B') === 'B') {
      // Режим Б: t = m·n·F/(M·I) — час
      I = +I; m = +m;
      if (I <= 0) throw new Error('I має бути > 0');
      if (m <= 0) throw new Error('m має бути > 0');
      const t_sec = m * n_el * F / (M * I);
      const t_min = t_sec / 60;
      return {
        result: `t = ${t_sec.toFixed(1)} с (${t_min.toFixed(2)} хв)`,
        label: 'Час електролізу (закон Фарадея)',
        steps: [
          't = m × n × F / (M × I)',
          `F = 96485 Кл/моль`,
          `t = ${m} × ${n_el} × 96485 / (${M} × ${I})`,
          `t = ${(m*n_el*F).toFixed(2)} / ${(M*I).toFixed(2)} = ${t_sec.toFixed(1)} с`,
          `t = ${t_min.toFixed(2)} хв`
        ]
      };
    } else {
      // Режим В: I = m·n·F/(M·t) — сила струму
      t_s = +t_s; m = +m;
      if (t_s <= 0) throw new Error('t має бути > 0');
      if (m <= 0) throw new Error('m має бути > 0');
      const current = m * n_el * F / (M * t_s);
      return {
        result: `I = ${current.toFixed(4)} А`,
        label: 'Сила струму (закон Фарадея)',
        steps: [
          'I = m × n × F / (M × t)',
          `F = 96485 Кл/моль`,
          `I = ${m} × ${n_el} × 96485 / (${M} × ${t_s})`,
          `I = ${(m*n_el*F).toFixed(2)} / ${(M*t_s).toFixed(2)} = ${current.toFixed(4)} А`
        ]
      };
    }
  },

  // Р-20: Рівняння Нернста — розширений (режим Б: [Ox]/[Red]; режим А вже є в 3-4-electrochemistry_P)
  'nernst_extended': ({mode, E0, n_el, C_ox, C_red, E}) => {
    E0 = +E0; n_el = Math.round(+n_el);
    if (n_el <= 0) throw new Error('n(e⁻) має бути > 0');

    if ((mode || 'A') === 'A') {
      // Режим А: E = E0 - (0.0592/n) × lg([Ox]/[Red])
      C_ox = +C_ox; C_red = +C_red;
      if (C_ox <= 0) throw new Error('[Ox] має бути > 0');
      if (C_red <= 0) throw new Error('[Red] має бути > 0');
      const ratio = C_ox / C_red;
      const E_val = E0 - (0.0592 / n_el) * Math.log10(ratio);
      return {
        result: `E = ${E_val.toFixed(4)} В`,
        label: 'Потенціал (рівняння Нернста, 25°C)',
        steps: [
          'E = E° − (0.0592/n) × lg([Ox]/[Red])',
          `E° = ${E0} В, n = ${n_el}`,
          `[Ox]/[Red] = ${C_ox}/${C_red} = ${ratio.toExponential(4)}`,
          `lg(${ratio.toExponential(4)}) = ${Math.log10(ratio).toFixed(4)}`,
          `E = ${E0} − (0.0592/${n_el}) × ${Math.log10(ratio).toFixed(4)}`,
          `E = ${E0} − ${(0.0592/n_el).toFixed(4)} × ${Math.log10(ratio).toFixed(4)}`,
          `E = ${E_val.toFixed(4)} В`
        ]
      };
    } else {
      // Режим Б: [Ox]/[Red] = 10^((E0-E)*n/0.0592)
      E = +E;
      const exponent = (E0 - E) * n_el / 0.0592;
      const ratio = Math.pow(10, exponent);
      return {
        result: `[Ox]/[Red] = ${ratio.toExponential(4)}`,
        label: 'Відношення концентрацій (рівняння Нернста)',
        steps: [
          '[Ox]/[Red] = 10^((E°−E)×n / 0.0592)',
          `E° = ${E0} В, E = ${E} В, n = ${n_el}`,
          `(E°−E)×n = (${E0}−${E})×${n_el} = ${((E0-E)*n_el).toFixed(4)}`,
          `Показник = ${((E0-E)*n_el).toFixed(4)} / 0.0592 = ${exponent.toFixed(4)}`,
          `[Ox]/[Red] = 10^${exponent.toFixed(4)} = ${ratio.toExponential(4)}`
        ]
      };
    }
  }

};
