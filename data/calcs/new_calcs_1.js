// new_calcs_1.js — Розрахунки розділів 1–2: Фундаментальні + Стехіометрія
// Р-01..Р-07

window._NEW_CALCS_1 = {

  // Р-01: Відносна атомна маса через ізотопний склад
  'isotope_avg_mass': ({pct1, m1, pct2, m2, pct3, m3, pct4, m4}) => {
    const pairs = [
      [+pct1, +m1],
      [+pct2, +m2],
    ];
    if (+pct3 && +m3) pairs.push([+pct3, +m3]);
    if (+pct4 && +m4) pairs.push([+pct4, +m4]);
    const sumPct = pairs.reduce((s,[p])=>s+p, 0);
    if (Math.abs(sumPct - 100) > 0.5) throw new Error(`Сума відсотків = ${sumPct.toFixed(2)} ≠ 100`);
    const Ar = pairs.reduce((s,[p,m])=>s + p*m/100, 0);
    const steps = pairs.map(([p,m])=>`${p}% × ${m} / 100 = ${(p*m/100).toFixed(4)}`);
    steps.push(`Ar = ${steps.map((_,i)=>pairs[i][0]+'%×'+pairs[i][1]).join(' + ')} / 100 = ${Ar.toFixed(4)}`);
    return { result: Ar.toFixed(4), label: 'Відносна атомна маса Ar', steps };
  },

  // Р-02: Масова частка елемента в сполуці ω%
  'mass_fraction_element': ({n, Ar, Mr}) => {
    n = +n; Ar = +Ar; Mr = +Mr;
    if (Mr <= 0) throw new Error('Mr має бути > 0');
    const omega = n * Ar / Mr * 100;
    return {
      result: `${omega.toFixed(2)}%`,
      label: 'Масова частка ω(%)',
      steps: [
        `ω(E) = n × Ar(E) / Mr × 100%`,
        `ω = ${n} × ${Ar} / ${Mr} × 100 = ${omega.toFixed(2)}%`
      ]
    };
  },

  // Р-03: Виведення найпростішої формули за ω%
  'empirical_formula': ({omega_C, omega_H, omega_N, omega_O}) => {
    omega_C = +omega_C || 0;
    omega_H = +omega_H || 0;
    omega_N = +omega_N || 0;
    // omega_O: якщо 0 або пусто — обчислюємо як решту
    omega_O = +omega_O;
    if (omega_O <= 0) omega_O = 100 - omega_C - omega_H - omega_N;
    if (omega_C <= 0) throw new Error('ω(C) має бути > 0');

    const elems = [];
    const AR = {C:12.011, H:1.008, N:14.007, O:15.999};
    if (omega_C > 0) elems.push({s:'C', r: omega_C / AR.C});
    if (omega_H > 0) elems.push({s:'H', r: omega_H / AR.H});
    if (omega_N > 0) elems.push({s:'N', r: omega_N / AR.N});
    if (omega_O > 0) elems.push({s:'O', r: omega_O / AR.O});

    const minR = Math.min(...elems.map(e=>e.r));
    const ratios = elems.map(e=>({s:e.s, x: e.r/minR}));

    // Округлення до цілих через НСД (пробуємо множники 1..6)
    let mult = 1;
    for (let m = 1; m <= 6; m++) {
      if (ratios.every(e => Math.abs(e.x*m - Math.round(e.x*m)) < 0.08)) { mult = m; break; }
    }
    const indices = ratios.map(e=>({s:e.s, idx:Math.round(e.x*mult)}));
    const formula = indices.map(e=>e.idx===1?e.s:`${e.s}${e.idx}`).join('');

    const steps = [
      ...elems.map(e=>`${e.s}: ${(+('omega_'+e.s.toLowerCase()) || (e.s==='C'?omega_C:e.s==='H'?omega_H:e.s==='N'?omega_N:omega_O)).toFixed(2)}% / ${AR[e.s]} = ${e.r.toFixed(4)}`),
      `Мінімальне: ${minR.toFixed(4)}`,
      ...ratios.map(e=>`${e.s}: ${e.r.toFixed(4)} / ${minR.toFixed(4)} = ${e.x.toFixed(3)}  × ${mult} ≈ ${Math.round(e.x*mult)}`),
      `Найпростіша формула: ${formula}`
    ];
    return { result: formula, label: 'Найпростіша формула', steps };
  },

  // Р-04: Відносна густина газу D
  'gas_rel_density': ({M_A, M_B}) => {
    M_A = +M_A; M_B = +M_B;
    if (!M_B || M_B <= 0) M_B = 29;
    const D = M_A / M_B;
    const ref = Math.abs(M_B - 29) < 0.5 ? ' (відносно повітря)' : '';
    return {
      result: `D = ${D.toFixed(4)}${ref}`,
      label: 'Відносна густина D',
      steps: [
        `D(B) = M(A) / M(B)`,
        `D = ${M_A} / ${M_B} = ${D.toFixed(4)}${ref}`
      ]
    };
  },

  // Р-05: Лімітуючий реагент
  'limiting_reagent': ({m_A, M_A, coeff_A, m_B, M_B, coeff_B, M_product, coeff_product}) => {
    m_A=+m_A; M_A=+M_A; coeff_A=+coeff_A;
    m_B=+m_B; M_B=+M_B; coeff_B=+coeff_B;
    M_product=+(M_product||0); coeff_product=+(coeff_product||0);
    if (M_A <= 0) throw new Error('M(A) має бути > 0');
    if (M_B <= 0) throw new Error('M(B) має бути > 0');
    if (m_A < 0) throw new Error('m(A) не може бути від\'ємною');
    if (m_B < 0) throw new Error('m(B) не може бути від\'ємною');
    if (coeff_A <= 0 || coeff_B <= 0) throw new Error('Стехіометричні коефіцієнти мають бути > 0');
    const n_A = m_A / M_A;
    const n_B = m_B / M_B;
    const n_B_needed = n_A * coeff_B / coeff_A;
    const n_A_needed = n_B * coeff_A / coeff_B;

    let limitant, excess_g, n_lim;
    if (n_B_needed <= n_B) {
      limitant = 'A (реагент A лімітує)';
      excess_g = (n_B - n_B_needed) * M_B;
      n_lim = n_A;
    } else {
      limitant = 'B (реагент B лімітує)';
      excess_g = (n_A - n_A_needed) * M_A;
      n_lim = n_B;
    }
    const m_prod = coeff_product > 0 && M_product > 0
      ? n_lim * (coeff_product / (limitant.startsWith('A') ? coeff_A : coeff_B)) * M_product
      : null;
    const steps = [
      `n(A) = ${m_A} / ${M_A} = ${n_A.toFixed(4)} моль`,
      `n(B) = ${m_B} / ${M_B} = ${n_B.toFixed(4)} моль`,
      `Потрібно B для A: ${n_A.toFixed(4)} × ${coeff_B}/${coeff_A} = ${n_B_needed.toFixed(4)} моль`,
      `Наявно B: ${n_B.toFixed(4)} моль`,
      `Лімітант: ${limitant}`,
      `Надлишок: ${excess_g.toFixed(3)} г`
    ];
    if (m_prod !== null) steps.push(`m(продукту) теор. = ${m_prod.toFixed(3)} г`);
    const resultStr = `${limitant} | надлишок: ${excess_g.toFixed(2)} г${m_prod!==null?' | m_прод: '+m_prod.toFixed(2)+' г':''}`;
    return { result: resultStr, label: 'Лімітуючий реагент', steps };
  },

  // Р-06: Вихід продукту η%
  'product_yield': ({m_reagent, M_reagent, coeff_reagent, M_product, coeff_product, m_practical}) => {
    m_reagent=+m_reagent; M_reagent=+M_reagent; coeff_reagent=+coeff_reagent;
    M_product=+M_product; coeff_product=+coeff_product; m_practical=+m_practical;
    if (M_reagent <= 0) throw new Error('M(реагента) має бути > 0');
    if (M_product <= 0) throw new Error('M(продукту) має бути > 0');
    if (m_reagent <= 0) throw new Error('m(реагента) має бути > 0');
    if (m_practical < 0) throw new Error('m практична не може бути від\'ємною');
    if (coeff_reagent <= 0 || coeff_product <= 0) throw new Error('Коефіцієнти мають бути > 0');
    const n = m_reagent / M_reagent;
    const m_theor = n * (coeff_product / coeff_reagent) * M_product;
    const eta = m_practical / m_theor * 100;
    return {
      result: `η = ${eta.toFixed(2)}% | m_теор = ${m_theor.toFixed(3)} г`,
      label: 'Вихід продукту η%',
      steps: [
        `n(реаг) = ${m_reagent} / ${M_reagent} = ${n.toFixed(4)} моль`,
        `m_теор = ${n.toFixed(4)} × (${coeff_product}/${coeff_reagent}) × ${M_product} = ${m_theor.toFixed(3)} г`,
        `η = ${m_practical} / ${m_theor.toFixed(3)} × 100 = ${eta.toFixed(2)}%`
      ]
    };
  },

  // Р-07: Розрахунок через сировину з домішками
  'raw_material_purity': ({m_raw, purity_pct, M_reagent, coeff_reagent, coeff_product, M_product}) => {
    m_raw=+m_raw; purity_pct=+purity_pct; M_reagent=+M_reagent;
    coeff_reagent=+coeff_reagent; coeff_product=+coeff_product; M_product=+M_product;
    if (m_raw <= 0) throw new Error('m(сировини) має бути > 0');
    if (purity_pct <= 0 || purity_pct > 100) throw new Error('Чистота має бути 0–100%');
    if (M_reagent <= 0) throw new Error('M(реагента) має бути > 0');
    if (M_product <= 0) throw new Error('M(продукту) має бути > 0');
    const m_pure = m_raw * purity_pct / 100;
    const n = m_pure / M_reagent;
    const m_product = n * (coeff_product / coeff_reagent) * M_product;
    return {
      result: `m(продукту) = ${m_product.toFixed(3)} г`,
      label: 'Маса продукту з сировини',
      steps: [
        `m_чистої = ${m_raw} × ${purity_pct}% / 100 = ${m_pure.toFixed(3)} г`,
        `n = ${m_pure.toFixed(3)} / ${M_reagent} = ${n.toFixed(4)} моль`,
        `m_прод = ${n.toFixed(4)} × (${coeff_product}/${coeff_reagent}) × ${M_product} = ${m_product.toFixed(3)} г`
      ]
    };
  }

};
