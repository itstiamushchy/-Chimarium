// ============ Т-33: ПИТОМЕ ОПТИЧНЕ ОБЕРТАННЯ ============
// Джерела: Merck Index, 15th ed. (2013); CRC Handbook of Chemistry and Physics, 104th ed. (2023);
//   Optical Rotations in Organic Chemistry, NIST WebBook SRD 69.
//   Умови: [α]²⁰D — натрієва D-лінія (589.3 нм), 20°C, c = 1–2 г/100 мл.

const TABLE_OPTICAL = {
  id: 'optical',
  title: 'Питоме оптичне обертання',
  topic: '5-4-oxygen-compounds',
  data: [
    // Моноцукри
    { name: 'D-Глюкоза (α)',      formula: 'C₆H₁₂O₆',  alpha: +112.2, solvent: 'H₂O',     note: 'Свіжорозчинена α-форма; мутаротує до +52.7°' },
    { name: 'D-Глюкоза (рівн.)',  formula: 'C₆H₁₂O₆',  alpha: +52.7,  solvent: 'H₂O',     note: 'Рівноважна суміш α/β після мутаротації' },
    { name: 'D-Фруктоза',         formula: 'C₆H₁₂O₆',  alpha: -92.4,  solvent: 'H₂O',     note: 'Сильне лівообертання; компонент сахарози' },
    { name: 'D-Галактоза',        formula: 'C₆H₁₂O₆',  alpha: +80.2,  solvent: 'H₂O',     note: 'Рівноважна суміш; входить до складу лактози' },
    { name: 'D-Манноза',          formula: 'C₆H₁₂O₆',  alpha: +14.2,  solvent: 'H₂O',     note: 'Рівноважна суміш α/β' },
    { name: 'D-Рибоза',           formula: 'C₅H₁₀O₅',  alpha: -23.7,  solvent: 'H₂O',     note: 'Пентоза; компонент РНК (рівновага)' },
    { name: 'D-Ксилоза',          formula: 'C₅H₁₀O₅',  alpha: +18.8,  solvent: 'H₂O',     note: 'Пентоза деревини; рівновага' },
    // Дисахариди
    { name: 'Сахароза',           formula: 'C₁₂H₂₂O₁₁', alpha: +66.5, solvent: 'H₂O',     note: 'Після гідролізу (інвертний цукор) обертання стає від\'ємним' },
    { name: 'Лактоза',            formula: 'C₁₂H₂₂O₁₁', alpha: +55.4, solvent: 'H₂O',     note: 'Молочний цукор; рівноважна суміш' },
    { name: 'Мальтоза',           formula: 'C₁₂H₂₂O₁₁', alpha: +130.4, solvent: 'H₂O',   note: 'Солодовий цукор; свіжорозчинений; мутаротує до +102.6°' },
    // Амінокислоти
    { name: 'L-Аланін',           formula: 'C₃H₇NO₂',  alpha: +14.6,  solvent: 'H₂O',     note: 'c=1, HCl 6M дає +1.8°; L-конфігурація' },
    { name: 'L-Аргінін',          formula: 'C₆H₁₄N₄O₂', alpha: +26.9, solvent: 'H₂O',    note: 'c=2, вода; основна амінокислота' },
    { name: 'L-Аспарагінова к-та',formula: 'C₄H₇NO₄',  alpha: +34.3,  solvent: '1M HCl',  note: 'c=1, 6M HCl; дикарбонова кислота' },
    { name: 'L-Глутамінова к-та', formula: 'C₅H₉NO₄',  alpha: +31.8,  solvent: '6M HCl',  note: 'c=1; глутамат — нейромедіатор' },
    { name: 'L-Лейцин',           formula: 'C₆H₁₃NO₂', alpha: +14.9,  solvent: '6M HCl',  note: 'c=1; незамінна амінокислота' },
    { name: 'L-Фенілаланін',      formula: 'C₉H₁₁NO₂', alpha: -34.5,  solvent: 'H₂O',     note: 'c=1, вода; незамінна амінокислота' },
    { name: 'L-Пролін',           formula: 'C₅H₉NO₂',  alpha: -85.0,  solvent: 'H₂O',     note: 'c=1; іміноамінокислота, входить до колагену' },
    { name: 'L-Серин',            formula: 'C₃H₇NO₃',  alpha: -7.5,   solvent: 'H₂O',     note: 'c=2; полярна амінокислота зі OH-групою' },
    { name: 'L-Цистеїн',          formula: 'C₃H₇NO₂S', alpha: +9.5,   solvent: '1M HCl',  note: 'c=1; містить SH-групу, утворює дисульфідні мости' },
    { name: 'L-Тирозин',          formula: 'C₉H₁₁NO₃', alpha: -10.0,  solvent: '1M HCl',  note: 'c=1; ароматична амінокислота' },
    // Інші
    { name: 'L-Яблучна кислота',  formula: 'C₄H₆O₅',   alpha: -2.3,   solvent: 'H₂O',     note: 'c=8.5, вода; міститься у яблуках і вині' },
    { name: 'L-Молочна кислота',  formula: 'C₃H₆O₃',   alpha: +3.8,   solvent: 'H₂O',     note: 'c=5, вода (м\'язова L-форма)' },
    { name: 'L-Аскорбінова к-та', formula: 'C₆H₈O₆',   alpha: +23.0,  solvent: 'H₂O',     note: 'c=1; вітамін С; біологічно активна L-форма' },
    { name: 'D-Камфора',          formula: 'C₁₀H₁₆O',  alpha: +44.1,  solvent: 'EtOH',    note: 'c=10, етанол; еталон поляриметрії' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🌀 Питоме оптичне обертання [α]²⁰D</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        [α]²⁰D — питоме оптичне обертання при 20°C, натрієва D-лінія (589.3 нм). Формула: [α] = α / (l·c),
        де l (дм) — довжина кювети, c (г/мл) — концентрація. «+» — правообертання (d), «−» — лівообертання (l).
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Речовина</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Формула</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">[α]²⁰D (°)</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Розчинник</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const alphaColor = r.alpha > 0 ? '#69F0AE' : '#FF8A80';
      const alphaStr = r.alpha > 0 ? '+' + r.alpha : String(r.alpha);
      html += `
          <tr style="background:${bg};border-bottom:0.5px solid #1e2240">
            <td style="padding:9px 12px;color:#ffffff;font-weight:600">${r.name}</td>
            <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
            <td style="padding:9px 8px;text-align:center;font-family:'Oxanium',monospace;color:${alphaColor};font-weight:700;font-size:13px">${alphaStr}</td>
            <td style="padding:9px 8px;text-align:center;color:#7080b8">${r.solvent}</td>
            <td style="padding:9px 12px;color:#c8d0e8;font-size:11px;line-height:1.5">${r.note}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      </div>
      <div style="margin-top:14px;font-size:11px;color:#4a5580;line-height:1.6">
        Джерела: Merck Index, 15th ed. (2013); CRC Handbook of Chemistry and Physics, 104th ed. (2023); NIST WebBook SRD 69.
      </div>`;

    c.innerHTML = html;
  }
};
