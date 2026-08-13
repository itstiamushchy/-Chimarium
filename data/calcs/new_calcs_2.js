// new_calcs_2.js — Розрахунки розділів 3–4: Розчини + Термодинаміка
// Р-08..Р-14

window._NEW_CALCS_2 = {

  // Р-08: Осмотичний тиск
  'osmotic_pressure': ({i, C, T_C}) => {
    i = +i; C = +C; T_C = +T_C;
    const R = 0.08206; // л·атм/(моль·К)
    const T = T_C + 273.15;
    if (C <= 0) throw new Error('C має бути > 0');
    if (T <= 0) throw new Error('T(K) має бути > 0');
    const pi_atm = i * C * R * T;
    const pi_kPa = pi_atm * 101.325;
    return {
      result: `${pi_atm.toFixed(3)} атм`,
      label: 'Осмотичний тиск π',
      steps: [
        'π = i × C × R × T',
        `T = ${T_C}°C + 273.15 = ${T.toFixed(2)} К`,
        `π = ${i} × ${C} × 0.08206 × ${T.toFixed(2)}`,
        `π = ${pi_atm.toFixed(4)} атм`,
        `π = ${pi_atm.toFixed(4)} × 101.325 = ${pi_kPa.toFixed(2)} кПа`
      ]
    };
  },

  // Р-09: Кріоскопія — молярна маса
  'cryoscopy_molar_mass': ({Kf, m_solute, m_solvent, delta_T}) => {
    Kf = +Kf; m_solute = +m_solute; m_solvent = +m_solvent; delta_T = +delta_T;
    if (delta_T <= 0) throw new Error('ΔT має бути > 0');
    if (m_solvent <= 0) throw new Error('m(розчинника) має бути > 0');
    const M = 1000 * Kf * m_solute / (delta_T * m_solvent);
    return {
      result: `${M.toFixed(1)} г/моль`,
      label: 'Молярна маса M',
      steps: [
        'M = 1000 × Kf × m(розч.) / (ΔT × m(розч-ник))',
        `M = 1000 × ${Kf} × ${m_solute} / (${delta_T} × ${m_solvent})`,
        `M = ${(1000 * Kf * m_solute).toFixed(4)} / ${(delta_T * m_solvent).toFixed(4)}`,
        `M = ${M.toFixed(2)} г/моль`
      ]
    };
  },

  // Р-10: Ебуліоскопія — зсув температури кипіння
  'ebullioscopy': ({Kb, m_solute, M_solute, m_solvent, i, Tb0}) => {
    Kb = +Kb; m_solute = +m_solute; M_solute = +M_solute;
    m_solvent = +m_solvent; i = +i; Tb0 = +Tb0;
    if (M_solute <= 0) throw new Error('M(розчиненого) має бути > 0');
    if (m_solvent <= 0) throw new Error('m(розчинника) має бути > 0');
    const b = 1000 * m_solute / (M_solute * m_solvent);
    const dT = i * Kb * b;
    const steps = [
      'b = 1000 × m(розч.) / (M(розч.) × m(розч-ник))',
      `b = 1000 × ${m_solute} / (${M_solute} × ${m_solvent}) = ${b.toFixed(5)} моль/кг`,
      'ΔT = i × Kb × b',
      `ΔT = ${i} × ${Kb} × ${b.toFixed(5)} = ${dT.toFixed(4)}°C`
    ];
    let result = `ΔT = ${dT.toFixed(4)}°C`;
    if (Tb0 > 0) {
      const Tb_new = Tb0 + dT;
      steps.push(`Tкип = ${Tb0} + ${dT.toFixed(4)} = ${Tb_new.toFixed(4)}°C`);
      result += `, Tкип = ${Tb_new.toFixed(4)}°C`;
    }
    return { result, label: 'Підвищення температури кипіння ΔT', steps };
  },

  // Р-11: Правило змішування розчинів
  'solution_mixing': ({m1, omega1, m2, omega2}) => {
    m1 = +m1; omega1 = +omega1; m2 = +m2; omega2 = +omega2;
    if (m1 < 0 || m2 < 0) throw new Error('Маси мають бути ≥ 0');
    if (omega1 < 0 || omega1 > 100 || omega2 < 0 || omega2 > 100)
      throw new Error('Масові частки мають бути 0–100%');
    const m3 = m1 + m2;
    if (m3 === 0) throw new Error('Загальна маса = 0');
    const omega3 = (m1 * omega1 + m2 * omega2) / m3;
    return {
      result: `m₃ = ${m3.toFixed(2)} г, ω₃ = ${omega3.toFixed(2)}%`,
      label: 'Змішування розчинів',
      steps: [
        'm₃ = m₁ + m₂',
        `m₃ = ${m1} + ${m2} = ${m3.toFixed(2)} г`,
        'ω₃ = (m₁×ω₁ + m₂×ω₂) / m₃',
        `ω₃ = (${m1}×${omega1} + ${m2}×${omega2}) / ${m3.toFixed(2)}`,
        `ω₃ = ${(m1 * omega1 + m2 * omega2).toFixed(2)} / ${m3.toFixed(2)} = ${omega3.toFixed(2)}%`
      ]
    };
  },

  // Р-12: Закон Кірхгофа
  'kirchhoff': ({dH_T1, dCp, T1, T2}) => {
    dH_T1 = +dH_T1; dCp = +dCp; T1 = +T1; T2 = +T2;
    if (T1 <= 0 || T2 <= 0) throw new Error('T(K) мають бути > 0');
    const dT = T2 - T1;
    // dCp in J/K → convert to kJ/K for adding to dH in kJ/mol
    const dH_T2 = dH_T1 + (dCp / 1000) * dT;
    const diff = dH_T2 - dH_T1;
    return {
      result: `ΔH(${T2} K) = ${dH_T2.toFixed(3)} кДж/моль`,
      label: 'Ентальпія при T₂ (закон Кірхгофа)',
      steps: [
        'ΔH(T₂) = ΔH(T₁) + ΔCp × (T₂ − T₁)',
        `ΔCp = ${dCp} Дж/К = ${(dCp/1000).toFixed(4)} кДж/К`,
        `ΔH(${T2}) = ${dH_T1} + ${(dCp/1000).toFixed(4)} × (${T2} − ${T1})`,
        `ΔH(${T2}) = ${dH_T1} + ${(dCp/1000 * dT).toFixed(4)} = ${dH_T2.toFixed(4)} кДж/моль`,
        `Різниця ΔH(T₂) − ΔH(T₁) = ${diff.toFixed(4)} кДж/моль`
      ]
    };
  },

  // Р-13: Іонна сила розчину
  'ionic_strength': ({C1, z1, C2, z2, C3, z3, C4, z4}) => {
    const ions = [
      [+C1, +z1],
      [+C2||0, +z2||0],
      [+C3||0, +z3||0],
      [+C4||0, +z4||0]
    ].filter(([c, z]) => c > 0 && z !== 0);
    if (ions.length === 0) throw new Error('Введіть хоча б один іон (C > 0, z ≠ 0)');
    const I = 0.5 * ions.reduce((s, [c, z]) => s + c * z * z, 0);
    const steps = [
      'I = 0.5 × Σ(Cᵢ × zᵢ²)',
      ...ions.map(([c, z]) => `  ${c} × ${z}² = ${(c * z * z).toFixed(5)}`),
      `I = 0.5 × ${ions.reduce((s,[c,z])=>s+c*z*z,0).toFixed(5)} = ${I.toFixed(5)} моль/л`
    ];
    return { result: `I = ${I.toFixed(4)} моль/л`, label: 'Іонна сила розчину I', steps };
  },

  // Р-14: Коефіцієнт активності (Дебай-Хюккель)
  'activity_coefficient': ({z_plus, z_minus, I}) => {
    z_plus = +z_plus; z_minus = +z_minus; I = +I;
    if (I < 0) throw new Error('I має бути ≥ 0');
    const A = 0.509;
    const sqrtI = Math.sqrt(I);
    const lg_gamma = -A * Math.abs(z_plus * z_minus) * sqrtI;
    const gamma = Math.pow(10, lg_gamma);
    return {
      result: `γ± = ${gamma.toFixed(4)}`,
      label: 'Середній коефіцієнт активності γ±',
      steps: [
        'lg(γ±) = −A × |z₊ × z₋| × √I',
        `A = 0.509 (вода, 25°C)`,
        `√I = √${I} = ${sqrtI.toFixed(4)}`,
        `lg(γ±) = −0.509 × |${z_plus} × ${z_minus}| × ${sqrtI.toFixed(4)}`,
        `lg(γ±) = −0.509 × ${Math.abs(z_plus * z_minus)} × ${sqrtI.toFixed(4)} = ${lg_gamma.toFixed(4)}`,
        `γ± = 10^(${lg_gamma.toFixed(4)}) = ${gamma.toFixed(4)}`
      ]
    };
  }

};
