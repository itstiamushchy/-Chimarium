// ============ Т-15: БУФЕРНІ РОЗЧИНИ ============
// Джерела: CRC Handbook 97th ed.; NIST Standard Reference Database;
// Gómez-Hens & Pérez-Bendito (1991); фармакопейні стандарти (USP, EP)

const TABLE_BUFFERS = {
  id: 'buffers',
  title: 'Буферні розчини',
  topic: '4-3-electrolytes',
  data: [
    {
      name: 'Гліцин-HCl',
      components: 'H₂N-CH₂-COOH / HCl',
      phRange: '1.0–3.7',
      pKa: '2.35',
      prep: '3.754 г гліцину розчинити у воді, додати HCl до потрібного pH, довести до 1 л. Для pH 2.0: 50 мл 0.2 М гліцину + 44.0 мл 0.2 М HCl.',
      note: 'Застосовується для pH < 3. Гліцин має pKa₁=2.35 (карбоксильна група).'
    },
    {
      name: 'Цитратний (Mc-Ilvaine)',
      components: 'C₆H₈O₇ / Na₂HPO₄',
      phRange: '2.2–8.0',
      pKa: '3.13; 4.76; 6.40',
      prep: 'Суміш 0.1 М лимонної кислоти та 0.2 М Na₂HPO₄ у різних пропорціях. Для pH 5.0: 24.3 мл C₆H₈O₇ + 25.7 мл Na₂HPO₄.',
      note: 'Широкий діапазон pH завдяки трьом pKa лимонної кислоти. Часто використовується в біохімії.'
    },
    {
      name: 'Ацетатний',
      components: 'CH₃COOH / CH₃COONa',
      phRange: '3.7–5.6',
      pKa: '4.76',
      prep: '8.2 г CH₃COONa·3H₂O (або 4.1 г безв.) розчинити у воді, додати оцтову кислоту до pH 4.76, довести до 1 л. Для pH 4.6: 1 M CH₃COOH 36% + CH₃COONa 50:50.',
      note: 'Найпоширеніший лабораторний буфер у слабкокислому діапазоні. pKa=4.76 при 25°C.'
    },
    {
      name: 'Фосфатний (PBS)',
      components: 'KH₂PO₄ / Na₂HPO₄',
      phRange: '5.8–8.0',
      pKa: '7.20',
      prep: 'Стандарт: 1.36 г KH₂PO₄ + 8.10 г Na₂HPO₄·12H₂O, довести до 1 л. pH ≈ 7.4. Або: 50 мл 0.2 М KH₂PO₄ + 39.6 мл 0.2 М Na₂HPO₄ → pH 7.0.',
      note: 'PBS (фізіологічний буфер) — стандарт у біохімії та медицині. Ізотонічна версія містить NaCl.'
    },
    {
      name: 'Трис-HCl',
      components: 'Tris / HCl',
      phRange: '7.0–9.0',
      pKa: '8.07',
      prep: '12.11 г Tris-основи (трис(гідроксиметил)амінометан) розчинити у воді, додати HCl до потрібного pH, довести до 1 л. Для pH 7.4: ≈60 мл 1 М HCl на 100 мл 1 М Tris.',
      note: 'Стандарт у молекулярній біології (ПЛР, електрофорез). Обережно: pH сильно залежить від температури (ΔpH ≈ -0.028/°C).'
    },
    {
      name: 'Боратний',
      components: 'H₃BO₃ / NaOH (або Na₂B₄O₇)',
      phRange: '8.0–10.0',
      pKa: '9.24',
      prep: 'Для pH 9.0: 50 мл 0.1 М борної кислоти + 20.8 мл 0.1 М NaOH. Або: розчин тетраборату натрію (бури) довести до потрібного pH.',
      note: 'Застосовується у капілярному електрофорезі, розділенні амінокислот, лужних середовищах. Стабільний до 35°C.'
    },
    {
      name: 'Карбонат-бікарбонатний',
      components: 'NaHCO₃ / Na₂CO₃',
      phRange: '9.2–10.8',
      pKa: '10.33',
      prep: 'Для pH 10.0: 27 мл 0.1 М NaHCO₃ + 23 мл 0.1 М Na₂CO₃. Для pH 9.5: 37 мл NaHCO₃ + 13 мл Na₂CO₃.',
      note: 'CO₂/HCO₃⁻/CO₃²⁻ — природна буферна система крові. Нестабільний на повітрі через втрату CO₂.'
    },
    {
      name: 'Аміачний (амоній-аміак)',
      components: 'NH₄Cl / NH₃·H₂O',
      phRange: '8.2–10.2',
      pKa: '9.25',
      prep: 'Для pH 9.25: 5.35 г NH₄Cl + 80 мл 25% NH₃, довести до 1 л. Концентрований: 20 г NH₄Cl + 100 мл NH₃(конц.).',
      note: 'Широко використовується в комплексонометрії (ЕДТА-титрування), аналізі жорсткості води. Токсичний — працювати у витяжній шафі!'
    },
    {
      name: 'HEPES',
      components: 'HEPES / NaOH',
      phRange: '6.8–8.2',
      pKa: '7.55',
      prep: '23.83 г HEPES (вільна кислота) розчинити у воді, довести NaOH до pH 7.4, довести до 1 л. Концентрація: типово 10–50 мМ.',
      note: 'Цвіттер-іонний буфер Гуда. Не взаємодіє з металами, стабільний при 4–37°C. Золотий стандарт клітинних культур.'
    },
    {
      name: 'MES',
      components: 'MES / NaOH',
      phRange: '5.5–6.7',
      pKa: '6.15',
      prep: '19.53 г MES (вільна кислота) розчинити у воді, додати NaOH до pH 6.0, довести до 1 л. Типова концентрація 20–100 мМ.',
      note: 'Буфер Гуда для слабкокислого діапазону. Стабільний, не реагує з Ca²⁺/Mg²⁺. Застосовується в ПЛР і клітинних дослідженнях.'
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧫 Буферні розчини</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Основні буферні системи, їх діапазони pH та способи приготування 1 л буфера.
      </div>`;

    this.data.forEach(r => {
      const phNums = r.phRange.split('–').map(Number);
      const phCenter = ((phNums[0]+phNums[1])/2);
      const col = phCenter < 4 ? '#FF5252' : phCenter < 7 ? '#FFB300' : phCenter < 9 ? '#4FC3F7' : '#CE93D8';
      html += `<div style="background:#0f1632;border:0.5px solid #1e2240;border-radius:10px;padding:16px;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px">
          <span style="font-family:'Oxanium',monospace;font-weight:700;color:#fff;font-size:14px">${r.name}</span>
          <span style="background:rgba(0,0,0,0.3);border:0.5px solid ${col};color:${col};font-size:12px;padding:2px 10px;border-radius:5px;font-family:'Oxanium',monospace">pH ${r.phRange}</span>
          <span style="color:#7080b8;font-size:12px">pKa = ${r.pKa}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:10px;font-size:12px">
          <div>
            <div style="color:#7080b8;margin-bottom:3px;font-size:11px">КОМПОНЕНТИ</div>
            <div style="font-family:'Oxanium',monospace;color:#00E5CC">${r.components}</div>
          </div>
          <div>
            <div style="color:#7080b8;margin-bottom:3px;font-size:11px">ПРИГОТУВАННЯ</div>
            <div style="color:#c0c8e8;line-height:1.5">${r.prep}</div>
          </div>
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:0.5px solid #1e2240;font-size:11px;color:#546E7A">
          💡 ${r.note}
        </div>
      </div>`;
    });

    html += `<div style="margin-top:8px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
      💡 <b style="color:#4FC3F7">Рівняння Гендерсона–Гассельбаха:</b> pH = pKa + log([A⁻]/[HA]).<br>
      Буферна ємність максимальна при pH = pKa (рівні концентрації кислоти та солі). 
      Ефективний діапазон: pH = pKa ± 1.
    </div>`;
    c.innerHTML = html;
  }
};
