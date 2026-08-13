window._FormulaConfigs = {

  // 1. pH сильна кислота: pH = −lg(C)
  pH_strong_acid: {
    id: 'pH_strong_acid',
    name: 'pH сильної кислоти',
    vars: { C: 'Концентрація (моль/л)', pH: 'pH' },
    formulas: {
      pH: {
        expr: 'pH = −lg[H⁺] = −lg(C)',
        compute: ({ C }) => -Math.log10(C),
        steps: ({ C }, pH) => [
          `Сильна кислота повністю дисоціює: HA → H⁺ + A⁻`,
          `Тому [H⁺] = C = <b>${C} моль/л</b>`,
          `pH = −lg([H⁺]) = −lg(${C}) = <b>${pH.toFixed(4)}</b>`,
        ],
      },
      C: {
        expr: 'C = 10^(−pH)',
        compute: ({ pH }) => Math.pow(10, -pH),
        steps: ({ pH }, C) => [
          `Формула: [H⁺] = 10^(−pH) = 10^(−${pH})`,
          `C = <b>${C.toExponential(4)} моль/л</b>`,
        ],
      },
    },
  },

  // 2. pH сильна двопротонна кислота (H₂SO₄): pH = −lg(2C)
  pH_strong_diprotic: {
    id: 'pH_strong_diprotic',
    name: 'pH двопротонної кислоти (H₂SO₄)',
    vars: { C: 'Концентрація (моль/л)', pH: 'pH' },
    formulas: {
      pH: {
        expr: 'pH = −lg(2C)',
        compute: ({ C }) => -Math.log10(2 * C),
        steps: ({ C }, pH) => [
          `H₂SO₄ — двопротонна кислота: повністю дисоціює двічі.`,
          `H₂SO₄ → 2H⁺ + SO₄²⁻ → [H⁺] = 2 × C = 2 × ${C} = <b>${2*C} моль/л</b>`,
          `pH = −lg(${2*C}) = <b>${pH.toFixed(4)}</b>`,
        ],
      },
      C: {
        expr: 'C = 10^(−pH) / 2',
        compute: ({ pH }) => Math.pow(10, -pH) / 2,
        steps: ({ pH }, C) => [
          `[H⁺] = 10^(−${pH}) = ${Math.pow(10,-pH).toExponential(4)} моль/л`,
          `C = [H⁺] / 2 = <b>${C.toExponential(4)} моль/л</b>`,
        ],
      },
    },
  },

  // 3. pH слабка кислота: [H⁺] = √(Ka × C), pH = −lg([H⁺])
  pH_weak_acid: {
    id: 'pH_weak_acid',
    name: 'pH слабкої кислоти',
    vars: { C: 'Концентрація (моль/л)', Ka: 'Константа дисоціації Ka', pH: 'pH', alpha: 'Ступінь дисоціації α' },
    formulas: {
      pH: {
        expr: 'pH = −lg(√(Ka×C))',
        compute: ({ C, Ka }) => {
          const Hc = Math.sqrt(Ka * C);
          return -Math.log10(Hc);
        },
        steps: ({ C, Ka }, pH) => {
          const Hc = Math.sqrt(Ka * C);
          const alpha = Hc / C;
          return [
            `Слабка кислота дисоціює частково: HA ⇌ H⁺ + A⁻`,
            `Ka = ${Ka.toExponential(2)}, C = ${C} моль/л`,
            `Ступінь дисоціації: α = √(Ka/C) = √(${Ka.toExponential(2)}/${C}) = <b>${(alpha*100).toFixed(3)}%</b>`,
            `[H⁺] = √(Ka × C) = √(${(Ka*C).toExponential(4)}) = <b>${Hc.toExponential(4)} моль/л</b>`,
            `pH = −lg(${Hc.toExponential(4)}) = <b>${pH.toFixed(4)}</b>`,
            alpha > 0.05
              ? `⚠️ α > 5% — наближення менш точне. Для точного розрахунку потрібне квадратне рівняння.`
              : `✓ α < 5% — наближення √(Ka×C) коректне.`,
          ];
        },
      },
      C: {
        expr: 'C = [H⁺]² / Ka',
        compute: ({ pH, Ka }) => {
          const Hc = Math.pow(10, -pH);
          return Hc * Hc / Ka;
        },
        steps: ({ pH, Ka }, C) => {
          const Hc = Math.pow(10, -pH);
          return [
            `З pH = ${pH} → [H⁺] = 10^(−${pH}) = ${Hc.toExponential(4)} моль/л`,
            `Із HA ⇌ H⁺ + A⁻: Ka = [H⁺]² / C`,
            `C = [H⁺]² / Ka = ${(Hc*Hc).toExponential(4)} / ${Ka.toExponential(2)} = <b>${C.toFixed(6)} моль/л</b>`,
          ];
        },
      },
      Ka: {
        expr: 'Ka = [H⁺]² / C',
        compute: ({ pH, C }) => {
          const Hc = Math.pow(10, -pH);
          return Hc * Hc / C;
        },
        steps: ({ pH, C }, Ka) => {
          const Hc = Math.pow(10, -pH);
          return [
            `[H⁺] = 10^(−${pH}) = ${Hc.toExponential(4)} моль/л`,
            `Ka = [H⁺]² / C = ${(Hc*Hc).toExponential(4)} / ${C} = <b>${Ka.toExponential(4)}</b>`,
          ];
        },
      },
    },
  },

  // 4. pH сильна основа: pOH = −lg(C), pH = 14 − pOH
  pH_strong_base: {
    id: 'pH_strong_base',
    name: 'pH сильної основи',
    vars: { C: 'Концентрація (моль/л)', pH: 'pH', pOH: 'pOH' },
    formulas: {
      pH: {
        expr: 'pH = 14 − pOH = 14 + lg(C)',
        compute: ({ C, diprotic }) => {
          const OHc = diprotic ? 2 * C : C;
          const pOH = -Math.log10(OHc);
          return 14 - pOH;
        },
        steps: ({ C, diprotic }, pH) => {
          const OHc = diprotic ? 2 * C : C;
          const pOH = -Math.log10(OHc);
          const steps = [`Сильна основа повністю дисоціює.`];
          if (diprotic) steps.push(`Двокислотна основа (Ca(OH)₂, Ba(OH)₂): [OH⁻] = 2 × C = <b>${OHc} моль/л</b>`);
          else steps.push(`[OH⁻] = C = <b>${OHc} моль/л</b>`);
          steps.push(
            `pOH = −lg([OH⁻]) = −lg(${OHc}) = <b>${pOH.toFixed(4)}</b>`,
            `pH = 14 − pOH = 14 − ${pOH.toFixed(4)} = <b>${pH.toFixed(4)}</b>`,
            `Закон іонного добутку води: pH + pOH = 14 (при 25°C)`,
          );
          return steps;
        },
      },
      C: {
        expr: 'C = 10^(pOH−14) = 10^(pH−14)',
        compute: ({ pH }) => Math.pow(10, pH - 14),
        steps: ({ pH }, C) => [
          `pOH = 14 − pH = 14 − ${pH} = ${14 - pH}`,
          `[OH⁻] = 10^(−pOH) = 10^(−${14-pH}) = <b>${C.toExponential(4)} моль/л</b>`,
        ],
      },
    },
  },

  // 5. pH слабка основа: [OH⁻] = √(Kb × C), pOH = −lg([OH⁻]), pH = 14 − pOH
  pH_weak_base: {
    id: 'pH_weak_base',
    name: 'pH слабкої основи',
    vars: { C: 'Концентрація (моль/л)', Kb: 'Константа основності Kb', pH: 'pH' },
    formulas: {
      pH: {
        expr: 'pH = 14 − pOH = 14 + lg(√(Kb×C))',
        compute: ({ C, Kb }) => {
          const OHc = Math.sqrt(Kb * C);
          const pOH = -Math.log10(OHc);
          return 14 - pOH;
        },
        steps: ({ C, Kb }, pH) => {
          const OHc = Math.sqrt(Kb * C);
          const alpha = OHc / C;
          const pOH = -Math.log10(OHc);
          return [
            `Слабка основа дисоціює частково: B + H₂O ⇌ BH⁺ + OH⁻`,
            `Kb = ${Kb.toExponential(2)}, C = ${C} моль/л`,
            `[OH⁻] = √(Kb × C) = √(${(Kb*C).toExponential(4)}) = <b>${OHc.toExponential(4)} моль/л</b>`,
            `Ступінь дисоціації α = <b>${(alpha*100).toFixed(3)}%</b>`,
            `pOH = −lg(${OHc.toExponential(4)}) = <b>${pOH.toFixed(4)}</b>`,
            `pH = 14 − pOH = <b>${pH.toFixed(4)}</b>`,
          ];
        },
      },
      C: {
        expr: 'C = [OH⁻]² / Kb',
        compute: ({ pH, Kb }) => {
          const OHc = Math.pow(10, -(14 - pH));
          return OHc * OHc / Kb;
        },
        steps: ({ pH, Kb }, C) => {
          const pOH = 14 - pH;
          const OHc = Math.pow(10, -pOH);
          return [
            `pOH = 14 − pH = ${pOH.toFixed(4)}, [OH⁻] = ${OHc.toExponential(4)} моль/л`,
            `C = [OH⁻]² / Kb = ${(OHc*OHc).toExponential(4)} / ${Kb.toExponential(2)} = <b>${C.toFixed(6)} моль/л</b>`,
          ];
        },
      },
    },
  },

  // 6. pOH ↔ pH: pH + pOH = 14
  pOH_from_pH: {
    id: 'pOH_from_pH',
    name: 'Зв\'язок pH ↔ pOH',
    vars: { pH: 'pH', pOH: 'pOH' },
    formulas: {
      pOH: {
        expr: 'pOH = 14 − pH',
        compute: ({ pH }) => 14 - pH,
        steps: ({ pH }, pOH) => [
          `Іонний добуток води: Kw = [H⁺][OH⁻] = 10⁻¹⁴ при 25°C`,
          `Тому pH + pOH = 14`,
          `pOH = 14 − ${pH} = <b>${pOH.toFixed(4)}</b>`,
        ],
      },
      pH: {
        expr: 'pH = 14 − pOH',
        compute: ({ pOH }) => 14 - pOH,
        steps: ({ pOH }, pH) => [
          `pH = 14 − pOH = 14 − ${pOH} = <b>${pH.toFixed(4)}</b>`,
        ],
      },
    },
  },

  // 7. Молярна маса: m = n × M
  molar_mass: {
    id: 'molar_mass',
    name: 'Маса речовини: m = n × M',
    vars: { m: 'Маса (г)', n: 'Кількість молів (моль)', M: 'Молярна маса (г/моль)' },
    formulas: {
      m: {
        expr: 'm = n × M',
        compute: ({ n, M }) => n * M,
        steps: ({ n, M }, m) => [
          `Формула: m = n × M`,
          `m = ${n} моль × ${M} г/моль = <b>${m.toFixed(4)} г</b>`,
        ],
      },
      n: {
        expr: 'n = m / M',
        compute: ({ m, M }) => m / M,
        steps: ({ m, M }, n) => [
          `n = m / M = ${m} г / ${M} г/моль = <b>${n.toFixed(5)} моль</b>`,
        ],
      },
      M: {
        expr: 'M = m / n',
        compute: ({ m, n }) => m / n,
        steps: ({ m, n }, M) => [
          `M = m / n = ${m} г / ${n} моль = <b>${M.toFixed(3)} г/моль</b>`,
        ],
      },
    },
  },

  // 8. Молярна концентрація: C = n / V
  molar_conc: {
    id: 'molar_conc',
    name: 'Молярна концентрація: C = n / V',
    vars: { C: 'Концентрація (моль/л)', n: 'Кількість молів (моль)', V: 'Об\'єм (л)' },
    formulas: {
      C: {
        expr: 'C = n / V',
        compute: ({ n, V }) => n / V,
        steps: ({ n, V }, C) => [
          `C = n / V = ${n} моль / ${V} л = <b>${C.toFixed(4)} моль/л</b>`,
        ],
      },
      n: {
        expr: 'n = C × V',
        compute: ({ C, V }) => C * V,
        steps: ({ C, V }, n) => [
          `n = C × V = ${C} моль/л × ${V} л = <b>${n.toFixed(5)} моль</b>`,
        ],
      },
      V: {
        expr: 'V = n / C',
        compute: ({ n, C }) => n / C,
        steps: ({ n, C }, V) => [
          `V = n / C = ${n} моль / ${C} моль/л = <b>${V.toFixed(4)} л</b>`,
        ],
      },
    },
  },

  // 9. Масова частка: ω = m_речовини / m_розчину × 100%
  mass_fraction: {
    id: 'mass_fraction',
    name: 'Масова частка: ω = m(реч.) / m(р-ну) × 100%',
    vars: { omega: 'Масова частка (%)', m_s: 'Маса речовини (г)', m_r: 'Маса розчину (г)' },
    formulas: {
      omega: {
        expr: 'ω = m(реч.) / m(р-ну) × 100%',
        compute: ({ m_s, m_r }) => m_s / m_r * 100,
        steps: ({ m_s, m_r }, omega) => [
          `ω = m(речовини) / m(розчину) × 100%`,
          `ω = ${m_s} г / ${m_r} г × 100% = <b>${omega.toFixed(3)}%</b>`,
        ],
      },
      m_s: {
        expr: 'm(реч.) = ω × m(р-ну) / 100',
        compute: ({ omega, m_r }) => omega / 100 * m_r,
        steps: ({ omega, m_r }, m_s) => [
          `m(речовини) = ω × m(розчину) / 100 = ${omega}% × ${m_r} г / 100 = <b>${m_s.toFixed(3)} г</b>`,
        ],
      },
      m_r: {
        expr: 'm(р-ну) = m(реч.) / ω × 100',
        compute: ({ omega, m_s }) => m_s / omega * 100,
        steps: ({ omega, m_s }, m_r) => [
          `m(розчину) = m(речовини) / ω × 100 = ${m_s} г / ${omega}% × 100 = <b>${m_r.toFixed(3)} г</b>`,
        ],
      },
    },
  },

  // 10. Ідеальний газ: PV = nRT
  ideal_gas: {
    id: 'ideal_gas',
    name: 'Рівняння ідеального газу: PV = nRT',
    vars: {
      P: 'Тиск (атм)', V: 'Об\'єм (л)', n: 'Кількість молів (моль)',
      T: 'Температура (К)', R: 'R = 0.08206 л·атм/(моль·К)',
    },
    formulas: {
      V: {
        expr: 'V = nRT / P',
        compute: ({ n, T, P }) => n * 0.08206 * T / P,
        steps: ({ n, T, P }, V) => [
          `PV = nRT → V = nRT / P`,
          `V = ${n} × 0.08206 × ${T} / ${P} = <b>${V.toFixed(4)} л</b>`,
        ],
      },
      P: {
        expr: 'P = nRT / V',
        compute: ({ n, T, V }) => n * 0.08206 * T / V,
        steps: ({ n, T, V }, P) => [
          `P = nRT / V = ${n} × 0.08206 × ${T} / ${V} = <b>${P.toFixed(4)} атм</b>`,
        ],
      },
      n: {
        expr: 'n = PV / RT',
        compute: ({ P, V, T }) => P * V / (0.08206 * T),
        steps: ({ P, V, T }, n) => [
          `n = PV / RT = ${P} × ${V} / (0.08206 × ${T}) = <b>${n.toFixed(5)} моль</b>`,
        ],
      },
      T: {
        expr: 'T = PV / nR',
        compute: ({ P, V, n }) => P * V / (n * 0.08206),
        steps: ({ P, V, n }, T) => [
          `T = PV / nR = ${P} × ${V} / (${n} × 0.08206) = <b>${T.toFixed(2)} K = ${(T-273.15).toFixed(2)} °C</b>`,
        ],
      },
    },
  },

  // 11. Закон Генрі: C = Kh × P
  henry: {
    id: 'henry',
    name: 'Закон Генрі: C = Kh × P',
    vars: { C: 'Розчинність (моль/л)', Kh: 'Константа Генрі (моль/л·атм)', P: 'Тиск (атм)' },
    formulas: {
      C: {
        expr: 'C = Kh × P',
        compute: ({ Kh, P }) => Kh * P,
        steps: ({ Kh, P }, C) => [
          `Закон Генрі: C = Kh × P`,
          `C = ${Kh.toExponential ? Kh.toExponential(3) : Kh} моль/л·атм × ${P} атм = <b>${C.toExponential(4)} моль/л</b>`,
        ],
      },
      P: {
        expr: 'P = C / Kh',
        compute: ({ C, Kh }) => C / Kh,
        steps: ({ C, Kh }, P) => [
          `P = C / Kh = ${C} / ${Kh} = <b>${P.toFixed(4)} атм</b>`,
        ],
      },
      Kh: {
        expr: 'Kh = C / P',
        compute: ({ C, P }) => C / P,
        steps: ({ C, P }, Kh) => [
          `Kh = C / P = ${C} / ${P} = <b>${Kh.toExponential(4)} моль/л·атм</b>`,
        ],
      },
    },
  },

  // 12. Розбавлення: C₁V₁ = C₂V₂
  dilution: {
    id: 'dilution',
    name: 'Закон розбавлення: C₁V₁ = C₂V₂',
    vars: { C1: 'C₁ (моль/л)', V1: 'V₁ (мл)', C2: 'C₂ (моль/л)', V2: 'V₂ (мл)' },
    formulas: {
      C2: {
        expr: 'C₂ = C₁V₁ / V₂',
        compute: ({ C1, V1, V2 }) => C1 * V1 / V2,
        steps: ({ C1, V1, V2 }, C2) => [
          `Кількість молів не змінюється: n = C₁V₁ = C₂V₂`,
          `C₂ = C₁ × V₁ / V₂ = ${C1} × ${V1} / ${V2} = <b>${C2.toFixed(4)} моль/л</b>`,
        ],
      },
      V2: {
        expr: 'V₂ = C₁V₁ / C₂',
        compute: ({ C1, V1, C2 }) => C1 * V1 / C2,
        steps: ({ C1, V1, C2 }, V2) => [
          `V₂ = C₁V₁ / C₂ = ${C1} × ${V1} / ${C2} = <b>${V2.toFixed(2)} мл</b>`,
          `Треба додати ${(V2 - V1).toFixed(1)} мл розчинника.`,
        ],
      },
      C1: {
        expr: 'C₁ = C₂V₂ / V₁',
        compute: ({ C2, V2, V1 }) => C2 * V2 / V1,
        steps: ({ C2, V2, V1 }, C1) => [
          `C₁ = C₂V₂ / V₁ = ${C2} × ${V2} / ${V1} = <b>${C1.toFixed(4)} моль/л</b>`,
        ],
      },
      V1: {
        expr: 'V₁ = C₂V₂ / C₁',
        compute: ({ C2, V2, C1 }) => C2 * V2 / C1,
        steps: ({ C2, V2, C1 }, V1) => [
          `V₁ = C₂V₂ / C₁ = ${C2} × ${V2} / ${C1} = <b>${V1.toFixed(2)} мл</b>`,
        ],
      },
    },
  },

};
