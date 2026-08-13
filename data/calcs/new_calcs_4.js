// new_calcs_4.js — Розрахунки розділів 8–12: Аналітика + Спектроскопія + Біохімія
// Р-21..Р-28

window._NEW_CALCS_4 = {

  // Р-21: Хроматографія — Rf і Rs
  'chromatography': ({mode, d_spot, d_front, tR1, tR2, w1, w2}) => {
    if ((mode || 'Rf') === 'Rf') {
      d_spot = +d_spot; d_front = +d_front;
      if (d_front <= 0) throw new Error('d_front має бути > 0');
      if (d_spot < 0) throw new Error('d_spot має бути ≥ 0');
      if (d_spot > d_front) throw new Error('d_spot не може бути більшим за d_front');
      const Rf = d_spot / d_front;
      return {
        result: `Rf = ${Rf.toFixed(4)}`,
        label: 'Фактор утримання Rf (ТШХ)',
        steps: [
          'Rf = d(плями) / d(фронту)',
          `Rf = ${d_spot} / ${d_front} = ${Rf.toFixed(4)}`,
          Rf < 0.2 ? 'Rf < 0.2 — речовина слабо рухається (полярна / слабкий елюент)' :
          Rf > 0.8 ? 'Rf > 0.8 — речовина рухається надто швидко (неполярна / сильний елюент)' :
          'Rf у робочому діапазоні 0.2–0.8 ✓'
        ]
      };
    } else {
      // Rs
      tR1 = +tR1; tR2 = +tR2; w1 = +w1; w2 = +w2;
      if (w1 <= 0 || w2 <= 0) throw new Error('Ширини піків мають бути > 0');
      if (tR2 < tR1) throw new Error('tR2 має бути ≥ tR1');
      const Rs = 2 * (tR2 - tR1) / (w1 + w2);
      return {
        result: `Rs = ${Rs.toFixed(4)}`,
        label: 'Роздільна здатність Rs (ГХ/ВЕРХ)',
        steps: [
          'Rs = 2×(tR₂ − tR₁) / (w₁ + w₂)',
          `tR₂ − tR₁ = ${tR2} − ${tR1} = ${(tR2 - tR1).toFixed(4)} хв`,
          `w₁ + w₂ = ${w1} + ${w2} = ${(w1 + w2).toFixed(4)} хв`,
          `Rs = 2 × ${(tR2 - tR1).toFixed(4)} / ${(w1 + w2).toFixed(4)} = ${Rs.toFixed(4)}`,
          Rs < 1 ? 'Rs < 1.0 — піки перекриваються' :
          Rs < 1.5 ? 'Rs = 1.0–1.5 — часткове розділення' :
          'Rs ≥ 1.5 — базове розділення ✓'
        ]
      };
    }
  },

  // Р-22: Ступінь вилучення при рідинній екстракції
  'extraction': ({D, V_org, V_aq, n_stages}) => {
    D = +D; V_org = +V_org; V_aq = +V_aq;
    n_stages = Math.round(+n_stages) || 1;
    if (D <= 0) throw new Error('D має бути > 0');
    if (V_org <= 0 || V_aq <= 0) throw new Error('Об\'єми мають бути > 0');
    if (n_stages < 1) throw new Error('n_stages має бути ≥ 1');
    const q = V_aq / (D * V_org + V_aq); // частка що залишається в водній фазі за 1 ступінь
    const E1 = (1 - q) * 100;
    const En = (1 - Math.pow(q, n_stages)) * 100;
    return {
      result: `E(1 ступінь) = ${E1.toFixed(2)}%  |  E(${n_stages} ступенів) = ${En.toFixed(2)}%`,
      label: 'Ступінь вилучення при екстракції',
      steps: [
        'E₁ = D×V_org / (D×V_org + V_aq) × 100%',
        `D = ${D}, V_org = ${V_org} мл, V_aq = ${V_aq} мл`,
        `D×V_org = ${D} × ${V_org} = ${(D * V_org).toFixed(4)}`,
        `D×V_org + V_aq = ${(D * V_org).toFixed(4)} + ${V_aq} = ${(D * V_org + V_aq).toFixed(4)}`,
        `E₁ = ${(D * V_org).toFixed(4)} / ${(D * V_org + V_aq).toFixed(4)} × 100 = ${E1.toFixed(2)}%`,
        `Для n ступенів: Eₙ = (1 − (V_aq/(D×V_org+V_aq))^n) × 100%`,
        `q = ${V_aq} / ${(D * V_org + V_aq).toFixed(4)} = ${q.toFixed(5)}`,
        `E(${n_stages}) = (1 − ${q.toFixed(5)}^${n_stages}) × 100 = (1 − ${Math.pow(q, n_stages).toFixed(5)}) × 100 = ${En.toFixed(2)}%`
      ]
    };
  },

  // Р-23: Закон Брегга-Вульфа — рентгеноструктурний аналіз
  'bragg': ({mode, lambda, d, theta_deg, n_order}) => {
    lambda = +lambda;
    n_order = Math.round(+(n_order || 1)) || 1;
    if (lambda <= 0) throw new Error('λ має бути > 0');
    if (n_order < 1) throw new Error('n має бути ≥ 1');

    if ((mode || 'A') === 'A') {
      // Режим А: обчислити d
      theta_deg = +theta_deg;
      if (theta_deg <= 0 || theta_deg >= 90) throw new Error('θ має бути між 0° і 90°');
      const theta_rad = theta_deg * Math.PI / 180;
      const d_val = (n_order * lambda) / (2 * Math.sin(theta_rad));
      return {
        result: `d = ${d_val.toFixed(5)} (ті самі одиниці, що λ)`,
        label: 'Міжплощинна відстань d (Брегг)',
        steps: [
          'nλ = 2d·sin(θ) → d = nλ / (2·sin(θ))',
          `n = ${n_order}, λ = ${lambda}, θ = ${theta_deg}°`,
          `sin(${theta_deg}°) = ${Math.sin(theta_rad).toFixed(6)}`,
          `d = ${n_order} × ${lambda} / (2 × ${Math.sin(theta_rad).toFixed(6)})`,
          `d = ${(n_order * lambda).toFixed(5)} / ${(2 * Math.sin(theta_rad)).toFixed(6)}`,
          `d = ${d_val.toFixed(5)}`
        ]
      };
    } else {
      // Режим Б: обчислити θ
      d = +d;
      if (d <= 0) throw new Error('d має бути > 0');
      const sinVal = (n_order * lambda) / (2 * d);
      if (sinVal > 1) throw new Error('Немає розв\'язку: nλ/(2d) > 1');
      const theta_rad = Math.asin(sinVal);
      const theta_res = theta_rad * 180 / Math.PI;
      return {
        result: `θ = ${theta_res.toFixed(4)}°`,
        label: 'Кут Брегга θ (Брегг)',
        steps: [
          'nλ = 2d·sin(θ) → sin(θ) = nλ / (2d)',
          `n = ${n_order}, λ = ${lambda}, d = ${d}`,
          `sin(θ) = ${n_order} × ${lambda} / (2 × ${d}) = ${sinVal.toFixed(6)}`,
          `θ = arcsin(${sinVal.toFixed(6)}) = ${theta_res.toFixed(4)}°`
        ]
      };
    }
  },

  // Р-24: Радіоактивний розпад
  'radioactive_decay': ({N0, T_half, t}) => {
    N0 = +N0; T_half = +T_half; t = +t;
    if (N0 <= 0) throw new Error('N₀ має бути > 0');
    if (T_half <= 0) throw new Error('T½ має бути > 0');
    if (t < 0) throw new Error('t має бути ≥ 0');
    const lambda = Math.LN2 / T_half;
    const Nt = N0 * Math.pow(0.5, t / T_half);
    const pct = (Nt / N0) * 100;
    const A_ratio = Math.pow(0.5, t / T_half); // A(t)/A₀ = N(t)/N₀
    return {
      result: `N(t) = ${Nt.toExponential(4)},  залишилось ${pct.toFixed(4)}%,  A(t)/A₀ = ${A_ratio.toFixed(6)}`,
      label: 'Радіоактивний розпад',
      steps: [
        'N(t) = N₀ × (0.5)^(t/T½)',
        `λ = ln2 / T½ = 0.6931 / ${T_half} = ${lambda.toExponential(4)} (ті самі одиниці⁻¹)`,
        `t / T½ = ${t} / ${T_half} = ${(t / T_half).toFixed(6)}`,
        `(0.5)^(t/T½) = (0.5)^${(t / T_half).toFixed(6)} = ${A_ratio.toFixed(6)}`,
        `N(t) = ${N0} × ${A_ratio.toFixed(6)} = ${Nt.toExponential(4)}`,
        `Залишилось: ${pct.toFixed(4)}%`,
        `A(t)/A₀ = λ×N(t) / (λ×N₀) = N(t)/N₀ = ${A_ratio.toFixed(6)}`
      ]
    };
  },

  // Р-25: Ізоелектрична точка — розширений (3 pKa)
  // Доповнення до існуючого '5-5-nitrogen-compounds_V' (тільки 2 pKa)
  'pi_extended': ({pKa1, pKa2, pKa3, aa_type, pH}) => {
    pKa1 = +pKa1; pKa2 = +pKa2;
    pKa3 = pKa3 !== undefined && pKa3 !== '' ? +pKa3 : null;
    aa_type = aa_type || 'neutral';

    let pI;
    let formula_desc;
    if (pKa3 === null || isNaN(pKa3)) {
      // 2 pKa — нейтральна
      pI = (pKa1 + pKa2) / 2;
      formula_desc = `pI = (pKa1 + pKa2) / 2 = (${pKa1} + ${pKa2}) / 2`;
    } else {
      // 3 pKa — кисла чи основна
      const vals = [pKa1, pKa2, pKa3].sort((a, b) => a - b);
      if (aa_type === 'acidic') {
        // Дві менших pKa
        pI = (vals[0] + vals[1]) / 2;
        formula_desc = `Кисла АК: pI = (pKa_менш1 + pKa_менш2) / 2 = (${vals[0]} + ${vals[1]}) / 2`;
      } else {
        // Основна: дві більших pKa
        pI = (vals[1] + vals[2]) / 2;
        formula_desc = `Основна АК: pI = (pKa_більш1 + pKa_більш2) / 2 = (${vals[1]} + ${vals[2]}) / 2`;
      }
    }

    const steps = [
      formula_desc,
      `pI = ${pI.toFixed(4)}`
    ];

    let charge_str = '';
    if (pH !== undefined && pH !== '' && pH !== null) {
      const pH_val = +pH;
      const diff = Math.abs(pH_val - pI);
      if (diff < 0.05) {
        charge_str = '≈ 0 (цвіттер-іон)';
      } else if (pH_val < pI) {
        charge_str = '+1 (катіон, pH < pI)';
      } else {
        charge_str = '−1 (аніон, pH > pI)';
      }
      steps.push(`Заряд при pH=${pH_val}: ${charge_str}`);
    }

    return {
      result: `pI = ${pI.toFixed(4)}` + (charge_str ? `;  заряд при pH=${pH}: ${charge_str}` : ''),
      label: 'Ізоелектрична точка (розширений, до 3 pKa)',
      steps
    };
  },

  // Р-26: DBE — тільки розширена інтерпретація (формула вже є і коректна у 5-1-organic-basics_V)
  'dbe_check': ({C, H, N, X}) => {
    C = +C; H = +H;
    N = N !== undefined && N !== '' ? +N : 0;
    X = X !== undefined && X !== '' ? +X : 0;
    if (C < 0 || H < 0 || N < 0 || X < 0) throw new Error('Кількість атомів має бути ≥ 0');
    const DBE = 1 + C - H / 2 + N / 2 - X / 2;
    let interp;
    if (DBE === 0) interp = 'Алкан (насичений, ациклічний)';
    else if (DBE === 1) interp = 'Алкен або циклоалкан (1 π-зв\'язок або 1 цикл)';
    else if (DBE === 2) interp = "Алкін, дієн або біциклічне з'єднання";
    else if (DBE === 3) interp = 'Аліциклічне або 3 ступені ненасиченості';
    else if (DBE === 4) interp = 'Бензольне кільце (або інша ароматична система)';
    else if (DBE > 4 && DBE < 8) interp = `${DBE} ступенів: поліциклічний або поліненасичений';`;
    else if (DBE >= 8) interp = `${DBE} ступенів: поліциклічний ароматичний`;
    else interp = `DBE = ${DBE} (перевірте формулу)`;
    return {
      result: `DBE = ${DBE}  (${interp})`,
      label: 'Ступінь ненасиченості DBE + інтерпретація',
      steps: [
        'DBE = 1 + C − H/2 + N/2 − X/2  (O і S не входять)',
        `DBE = 1 + ${C} − ${H}/2 + ${N}/2 − ${X}/2`,
        `DBE = 1 + ${C} − ${(H / 2).toFixed(1)} + ${(N / 2).toFixed(1)} − ${(X / 2).toFixed(1)} = ${DBE}`,
        interp
      ]
    };
  },

  // Р-27: Кінетика Міхаеліса-Ментен
  'michaelis_menten': ({mode, Vmax, Km, S, v}) => {
    Vmax = +Vmax; Km = +Km;
    if (Vmax <= 0) throw new Error('Vmax має бути > 0');
    if (Km <= 0) throw new Error('Km має бути > 0');

    if ((mode || 'A') === 'A') {
      S = +S;
      if (S < 0) throw new Error('[S] має бути ≥ 0');
      const v_calc = Vmax * S / (Km + S);
      const pct = (v_calc / Vmax) * 100;
      return {
        result: `v = ${v_calc.toFixed(4)} мкМ/с  (${pct.toFixed(2)}% від Vmax)`,
        label: 'Швидкість реакції (Міхаеліс-Ментен)',
        steps: [
          'v = Vmax × [S] / (Km + [S])',
          `Vmax = ${Vmax}, Km = ${Km} мкМ, [S] = ${S} мкМ`,
          `Km + [S] = ${Km} + ${S} = ${(Km + S).toFixed(4)}`,
          `v = ${Vmax} × ${S} / ${(Km + S).toFixed(4)} = ${v_calc.toFixed(4)} мкМ/с`,
          `v / Vmax = ${pct.toFixed(2)}%`,
          S === Km ? '⚑ [S] = Km → v = Vmax/2 (напівмаксимальна швидкість)' :
          S < Km ? '[S] << Km → реакція 1-го порядку по [S]' :
          '[S] >> Km → реакція наближається до Vmax (насичення)'
        ]
      };
    } else {
      // Режим Б: знайти [S]
      v = +v;
      if (v <= 0) throw new Error('v має бути > 0');
      if (v >= Vmax) throw new Error('v має бути < Vmax');
      const S_calc = Km * v / (Vmax - v);
      return {
        result: `[S] = ${S_calc.toFixed(4)} мкМ`,
        label: 'Концентрація субстрату [S] (Міхаеліс-Ментен)',
        steps: [
          'v = Vmax×[S]/(Km+[S]) → [S] = Km×v / (Vmax − v)',
          `Vmax = ${Vmax}, Km = ${Km}, v = ${v}`,
          `Vmax − v = ${Vmax} − ${v} = ${(Vmax - v).toFixed(4)}`,
          `[S] = ${Km} × ${v} / ${(Vmax - v).toFixed(4)} = ${S_calc.toFixed(4)} мкМ`
        ]
      };
    }
  },

  // Р-28: Щільність кристала
  'crystal_density': ({Z, M, a}) => {
    Z = Math.round(+Z); M = +M; a = +a;
    const NA = 6.02214076e23;
    if (Z < 1) throw new Error('Z має бути ≥ 1');
    if (M <= 0) throw new Error('M має бути > 0');
    if (a <= 0) throw new Error('a має бути > 0');
    // a в нм → V в нм³ → V в см³: 1 нм = 1e-7 см → 1 нм³ = 1e-21 см³
    const V_nm3 = a * a * a;
    const V_cm3 = V_nm3 * 1e-21;
    const rho = (Z * M) / (NA * V_cm3);
    return {
      result: `ρ = ${rho.toFixed(4)} г/см³`,
      label: 'Щільність кристала',
      steps: [
        'ρ = Z × M / (Nₐ × V)',
        `Z = ${Z} (формульних одиниць у комірці)`,
        `M = ${M} г/моль,  a = ${a} нм`,
        `V_куб = a³ = ${a}³ = ${V_nm3.toFixed(6)} нм³`,
        `1 нм³ = 10⁻²¹ см³  →  V = ${V_cm3.toExponential(4)} см³`,
        `Nₐ = 6.02214×10²³ моль⁻¹`,
        `ρ = ${Z} × ${M} / (6.02214×10²³ × ${V_cm3.toExponential(4)})`,
        `ρ = ${(Z * M).toFixed(4)} / ${(NA * V_cm3).toExponential(4)} = ${rho.toFixed(4)} г/см³`
      ]
    };
  }

};
