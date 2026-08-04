// ============ Т-37: ПОРІГ КОАГУЛЯЦІЇ ТА ККМ ПОВЕРХНЕВО-АКТИВНИХ РЕЧОВИН ============
// Джерела: Tanford «The Hydrophobic Effect» (1980), Rosen «Surfactants and Interfacial Phenomena» 4th ed.,
//          Shaw «Introduction to Colloid & Surface Chemistry» 4th ed.

const TABLE_COLLOIDS = {
  id: 'colloids',
  title: 'Критична концентрація міцелоутворення та коагуляція',
  topic: '4-5-colloids',
  data: [],  // дані в полях surfactants та coagulation

  // Дані ПАР (ККМ)
  surfactants: [
    {substance:'SDS (додецилсульфат натрію)',         formula:'C₁₂H₂₅OSO₃Na',    cmc:8.2e-3,   cmcStr:'8.2×10⁻³',  unit:'моль/л', note:'H₂O, 25°C; аніонна ПАР'},
    {substance:'CTAB (цетилтриметиламоній бромід)',   formula:'C₁₆H₃₃N(CH₃)₃Br', cmc:9.2e-4,   cmcStr:'9.2×10⁻⁴',  unit:'моль/л', note:'H₂O, 25°C; катіонна ПАР'},
    {substance:'Тритон X-100',                        formula:'C₈H₁₇C₆H₄(OC₂H₄)₉₋₁₀OH', cmc:2.5e-4, cmcStr:'2.5×10⁻⁴', unit:'моль/л', note:'H₂O, 25°C; неіоногенна ПАР'},
    {substance:'Твін-80 (полісорбат 80)',             formula:'C₆₄H₁₂₄O₂₆',       cmc:1.2e-5,   cmcStr:'1.2×10⁻⁵',  unit:'моль/л', note:'H₂O, 25°C; неіоногенна ПАР'},
    {substance:'Додецилтриметиламоній хлорид (DTAC)', formula:'C₁₂H₂₅N(CH₃)₃Cl', cmc:2.0e-2,   cmcStr:'2.0×10⁻²',  unit:'моль/л', note:'H₂O, 25°C; катіонна ПАР'},
    {substance:'SLS (лаурилсульфат натрію = SDS)',   formula:'C₁₂H₂₅OSO₃Na',     cmc:8.1e-3,   cmcStr:'8.1×10⁻³',  unit:'моль/л', note:'H₂O, 25°C; те саме, що SDS'},
    {substance:'SDBS (додецилбензолсульфонат Na)',   formula:'C₁₂H₂₅C₆H₄SO₃Na',  cmc:1.5e-3,   cmcStr:'1.5×10⁻³',  unit:'моль/л', note:'H₂O, 25°C; аніонна ПАР'},
    {substance:'Лецитин (фосфатидилхолін)',           formula:'(C₅H₁₂NO₄P·R₂)',   cmc:4.0e-9,   cmcStr:'4×10⁻⁹',    unit:'моль/л', note:'H₂O, 37°C; цвітеріонна ПАР'},
    {substance:'Бетаїн (C₁₂, DDMAB)',               formula:'C₁₂H₂₅N⁺(CH₃)₂CH₂COO⁻', cmc:1.6e-3, cmcStr:'1.6×10⁻³', unit:'моль/л', note:'H₂O, 25°C; амфотерна ПАР'},
    {substance:'Сапонін (суміш тритерпенів)',         formula:'(глікозиди тритерпенів)', cmc:5.0e-5, cmcStr:'5×10⁻⁵', unit:'моль/л', note:'H₂O, 25°C; природна ПАР'},
  ],

  // Дані коагуляції (поріг коагуляції — мін. конц. електроліту для коагуляції золю)
  coagulation: [
    {sol:'Колоїд As₂S₃ (від⊖)',    electrolyte:'NaCl',   threshold:51,    unit:'ммоль/л', note:'Правило Шульце-Гарді: іон Na⁺ (заряд 1+)'},
    {sol:'Колоїд As₂S₃ (від⊖)',    electrolyte:'CaCl₂',  threshold:0.65,  unit:'ммоль/л', note:'Ca²⁺ (заряд 2+) — у ~80× ефективніший'},
    {sol:'Колоїд As₂S₃ (від⊖)',    electrolyte:'AlCl₃',  threshold:0.093, unit:'ммоль/л', note:'Al³⁺ (заряд 3+) — у ~550× ефективніший'},
    {sol:'Колоїд Fe(OH)₃ (від⊕)',  electrolyte:'NaCl',   threshold:9.25,  unit:'ммоль/л', note:'Cl⁻ коагулює позитивний золь'},
    {sol:'Колоїд Fe(OH)₃ (від⊕)',  electrolyte:'K₂SO₄',  threshold:0.22,  unit:'ммоль/л', note:'SO₄²⁻ (заряд 2−) — у ~42× ефективніший'},
    {sol:'Колоїд Fe(OH)₃ (від⊕)',  electrolyte:'K₃[Fe(CN)₆]', threshold:0.008, unit:'ммоль/л', note:'[Fe(CN)₆]³⁻ (заряд 3−) — дуже ефективний'},
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🫧 Критична концентрація міцелоутворення (ККМ) та поріг коагуляції</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:16px">Джерело: Rosen «Surfactants and Interfacial Phenomena» 4th ed. · Shaw «Colloid & Surface Chemistry» 4th ed.</div>

      <div style="font-family:'Oxanium',monospace;font-size:11px;letter-spacing:2px;color:#4FC3F7;text-transform:uppercase;margin-bottom:10px">Частина 1: ккм поверхнево-активних речовин</div>
      <div style="overflow-x:auto;margin-bottom:28px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Формула</th>
            <th style="text-align:right;padding:9px 14px;color:#4FC3F7">ККМ</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Одиниця</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.surfactants.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff;font-size:12px">${r.substance}</td>
            <td style="padding:8px 10px;color:#CE93D8;font-family:'Oxanium',monospace;font-size:11px;white-space:nowrap">${r.formula}</td>
            <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.cmcStr}</td>
            <td style="padding:8px 10px;color:#CE93D8;white-space:nowrap">${r.unit}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>

      <div style="font-family:'Oxanium',monospace;font-size:11px;letter-spacing:2px;color:#4FC3F7;text-transform:uppercase;margin-bottom:10px">Частина 2: порог коагуляції колоїдів (правило Шульце-Гарді)</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Правило Шульце-Гарді:</b> ефективність коагуляції пропорційна 6-му ступеню заряду протиіона: γ ∝ z⁶.<br>
        Заряди 1⁺:2⁺:3⁺ відповідають порогам у співвідношенні приблизно 1 : 1/64 : 1/729.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Золь</th>
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Електроліт</th>
            <th style="text-align:right;padding:9px 14px;color:#4FC3F7">Поріг коагуляції</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Одиниця</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.coagulation.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff">${r.sol}</td>
            <td style="padding:8px 12px;color:#00E5CC;font-family:'Oxanium',monospace">${r.electrolyte}</td>
            <td style="padding:8px 14px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.threshold}</td>
            <td style="padding:8px 10px;color:#CE93D8;white-space:nowrap">${r.unit}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
