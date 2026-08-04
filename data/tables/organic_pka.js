// ============ Т-38: ШКАЛА pKa ОРГАНІЧНИХ СПОЛУК ============
// Джерела: Bordwell «Equilibrium Acidities in DMSO» Acc. Chem. Res. 1988, 21, 456;
//          March «Advanced Organic Chemistry» 5th ed.;
//          NIST WebBook; Evans pKa Table (MIT, 2005)

const TABLE_ORGANIC_PKA = {
  id: 'organic_pka',
  title: 'Шкала pKa органічних сполук (H₂O та ДМСО)',
  topic: '5-4-oxygen-compounds',
  data: [
    // Кислоти: мінімальний pKa → максимальний (все слабкіше)
    {name:'Трифтороцтова кислота',      formula:'CF₃COOH',           pkaWater: 0.5,  pkaDMSO:  3.5, note:'Сильна карбонова кислота; F-ефект'},
    {name:'Щавлева кислота (pKa1)',     formula:'HOOCCOOH',           pkaWater: 1.25, pkaDMSO:  6.2, note:'Двохосновна; CH₂ між двома COOH'},
    {name:'Дихлороцтова кислота',       formula:'CHCl₂COOH',          pkaWater: 1.48, pkaDMSO:  6.4, note:'Два атоми Cl підвищують кислотність'},
    {name:'Хлороцтова кислота',         formula:'ClCH₂COOH',          pkaWater: 2.86, pkaDMSO:  8.7, note:'Один Cl; −I ефект'},
    {name:'Мурашина кислота',           formula:'HCOOH',              pkaWater: 3.75, pkaDMSO:  9.4, note:'Найпростіша карбонова кислота'},
    {name:'Бензойна кислота',           formula:'C₆H₅COOH',           pkaWater: 4.20, pkaDMSO: 11.1, note:'Ароматична; +M ефект кільця'},
    {name:'Оцтова кислота',             formula:'CH₃COOH',            pkaWater: 4.76, pkaDMSO: 12.3, note:'Еталон порівняння; Bordwell 1988'},
    {name:'Пропіонова кислота',         formula:'CH₃CH₂COOH',         pkaWater: 4.87, pkaDMSO: 12.5, note:'Злегка слабкіша за оцтову'},
    {name:'Фенол',                      formula:'C₆H₅OH',             pkaWater: 9.99, pkaDMSO: 18.0, note:'Сполучення з кільцем знижує pKa'},
    {name:'п-Нітрофенол',              formula:'O₂N-C₆H₄-OH',        pkaWater: 7.15, pkaDMSO: 11.0, note:'NO₂ в пара-положенні — сильний -M'},
    {name:'п-Хлорфенол',              formula:'Cl-C₆H₄-OH',          pkaWater: 9.38, pkaDMSO: 16.7, note:'Cl: -I > +M, незначне зниження pKa'},
    {name:'Вода',                       formula:'H₂O',                pkaWater:15.74, pkaDMSO: 31.4, note:'Амфотерний розчинник'},
    {name:'Ацетон',                     formula:'CH₃COCH₃',           pkaWater:20.0,  pkaDMSO: 20.0, note:'α-С–Н; стабілізація аніону резонансом'},
    {name:'Ацетонітрил',               formula:'CH₃CN',               pkaWater:25.0,  pkaDMSO: 31.3, note:'Активований нітрильною групою'},
    {name:'Диметилсульфоксид (ДМСО)',  formula:'(CH₃)₂SO',           pkaWater:35.0,  pkaDMSO: 35.0, note:'Еталон для шкали ДМСО Бордвела'},
    {name:'Флуорен',                    formula:'C₁₃H₁₀',             pkaWater:22.6,  pkaDMSO: 22.6, note:'Кислотність С-Н між двома кільцями'},
    {name:'Трифенілметан',             formula:'(C₆H₅)₃CH',          pkaWater:30.6,  pkaDMSO: 30.6, note:'C-кислота; три кільця — резонанс'},
    {name:'Циклопентадієн',            formula:'C₅H₆',                pkaWater:18.0,  pkaDMSO: 18.0, note:'Анти-Гюккель анмон = ароматичний'},
    {name:'Метанол',                    formula:'CH₃OH',               pkaWater:15.54, pkaDMSO: 29.0, note:'О-Н кислота; ефект розчинника великий'},
    {name:'Дифенілметан',              formula:'(C₆H₅)₂CH₂',         pkaWater:43.0,  pkaDMSO: 32.2, note:'С-Н кислота; дуже слабка'},
    {name:'Малоновий ефір',            formula:'CH₂(COOC₂H₅)₂',      pkaWater:13.0,  pkaDMSO: 16.4, note:'Активована метиленова група'},
    {name:'Ацетилацетон',             formula:'CH₃COCH₂COCH₃',       pkaWater: 8.9,  pkaDMSO: 13.3, note:'β-дикетон; сильна С-Н кислота'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚗️ Шкала pKa органічних сполук</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: Bordwell Acc. Chem. Res. 1988 · March Advanced Organic Chemistry 5th ed. · Evans pKa Table (MIT)</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Важливо:</b> pKa у воді та ДМСО суттєво відрізняються. ДМСО не сольватує аніони (немає Н-зв'язків донора) — тому у ДМСО всі кислоти «слабкіші» (вищий pKa), особливо О-кислоти. С-кислоти відрізняються менше.<br>
        <b style="color:#FFB300">Менший pKa = сильніша кислота.</b>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Сполука</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Формула</th>
            <th style="text-align:center;padding:9px 14px;color:#4FC3F7">pKa (H₂O)</th>
            <th style="text-align:center;padding:9px 14px;color:#4FC3F7">pKa (ДМСО)</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>{
            const diff = r.pkaDMSO - r.pkaWater;
            const diffStr = diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
            return `
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff">${r.name}</td>
            <td style="padding:8px 10px;color:#CE93D8;font-family:'Oxanium',monospace;font-size:11px">${r.formula}</td>
            <td style="padding:8px 14px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.pkaWater}</td>
            <td style="padding:8px 14px;text-align:center;font-family:'Oxanium',monospace;color:#80CBC4;font-weight:700">${r.pkaDMSO}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`;}).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
