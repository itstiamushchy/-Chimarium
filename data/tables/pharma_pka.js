// ============ Т-49: ФАРМАЦЕВТИЧНА ХІМІЯ — pKa ЛІКАРСЬКИХ ЗАСОБІВ ============
// Джерела: Avdeef «Absorption and Drug Development» 2nd ed. (2012);
//          DrugBank (drugbank.ca); ChemAxon Marvin pKa predictor;
//          Martindale «The Complete Drug Reference» 38th ed. (2014);
//          Stahl & Wermuth «Handbook of Pharmaceutical Salts» 2nd ed. (2011)

const TABLE_PHARMA_PKA = {
  id: 'pharma_pka',
  title: 'Фармацевтична хімія — pKa лікарських засобів',
  topic: '5-5-nitrogen-compounds',
  data: [
    // Кислоти (COOH, OH, NH)
    {name:'Аспірин',             formula:'C₉H₈O₄',    pka:3.49,  type:'кислота (COOH)', class:'НПЗП',          note:'Ацетилсаліцилова кислота; блокатор ЦОГ'},
    {name:'Ібупрофен',           formula:'C₁₃H₁₈O₂',  pka:4.41,  type:'кислота (COOH)', class:'НПЗП',          note:'Пропіонова похідна; рацемат'},
    {name:'Диклофенак',          formula:'C₁₄H₁₁Cl₂NO₂',pka:4.15, type:'кислота (COOH)',class:'НПЗП',          note:'Фенілоцтова похідна'},
    {name:'Напроксен',           formula:'C₁₄H₁₄O₃',  pka:4.15,  type:'кислота (COOH)', class:'НПЗП',          note:'S-енантіомер — активний'},
    {name:'Варфарин',            formula:'C₁₉H₁₆O₄',  pka:5.05,  type:'кислота (enol)', class:'антикоагулянт', note:'Інгібітор VKORC1; антагоніст вітаміну К'},
    {name:'Фуросемід',           formula:'C₁₂H₁₁ClN₂O₅S',pka:3.90,type:'кислота (COOH)',class:'діуретик',      note:'Петльовий діуретик; блокатор NKCC2'},
    {name:'Аторвастатин',        formula:'C₃₃H₃₅FN₂O₅',pka:4.46, type:'кислота (COOH)', class:'статин',        note:'Інгібітор ГМГ-КоА-редуктази'},
    {name:'Омепразол',           formula:'C₁₇H₁₉N₃O₃S',pka:9.29, type:'основа (пірид.)', class:'ІПП',           note:'Інгібітор протонної помпи H⁺/K⁺-АТФази'},
    {name:'Метформін',           formula:'C₄H₁₁N₅',    pka:12.40, type:'основа (guanid.)',class:'антидіабетик',  note:'Гуанідинова база; практично не іонізована при pH 7.4'},
    {name:'Амоксицилін',         formula:'C₁₆H₁₉N₃O₅S',pka1:2.40, pka:9.60, type:'амфотерний', class:'антибіотик', note:'pKa1=2.40 (COOH), pKa2=9.60 (NH₂)'},
    {name:'Ципрофлоксацин',      formula:'C₁₇H₁₈FN₃O₃',pka1:6.09, pka:8.62, type:'амфотерний', class:'антибіотик', note:'pKa1=6.09 (COOH), pKa2=8.62 (піперазин)'},
    {name:'Морфін',              formula:'C₁₇H₁₉NO₃',  pka:8.00,  type:'основа (N)',    class:'опіоїд',        note:'Фенольний OH: pKa2=9.85; в плазмі ~76% катіон'},
    {name:'Кодеїн',              formula:'C₁₈H₂₁NO₳',  pka:8.17,  type:'основа (N)',    class:'опіоїд',        note:'O-метилморфін; слабша основа за морфін'},
    {name:'Атенолол',            formula:'C₁₄H₂₂N₂O₃', pka:9.60,  type:'основа (N)',    class:'β-блокатор',    note:'Кардіоселективний; гідрофільний'},
    {name:'Пропранолол',         formula:'C₁₆H₂₁NO₂',  pka:9.45,  type:'основа (N)',    class:'β-блокатор',    note:'Неселективний; ліпофільний (проходить ГЕБ)'},
    {name:'Лідокаїн',            formula:'C₁₄H₂₂N₂O',  pka:7.86,  type:'основа (N)',    class:'анестетик',     note:'При pH 7.4 ~50% нейтральна форма; активна'},
    {name:'Хлорпромазін',        formula:'C₁₇H₁₉ClN₂S',pka:9.30,  type:'основа (N)',    class:'антипсихотик',  note:'Фенотіазин; D₂-блокатор'},
    {name:'Діазепам',            formula:'C₁₆H₁₃ClN₂O',pka:3.40,  type:'кислота/основа',class:'анксіолітик',   note:'Дуже ліпофільний; pKa слабкий'},
    {name:'Метотрексат',         formula:'C₂₀H₂₂N₈O₅', pka1:4.70, pka:5.60, type:'кислота (COOH)',class:'цитостатик',note:'pKa1=4.70, pKa2=5.60 (дві COOH)'},
    {name:'Парацетамол',         formula:'C₈H₉NO₂',    pka:9.86,  type:'кислота (ArOH)',class:'анальгетик',    note:'Феноловий OH; нейтральний при pH 7.4'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const typeColors = {
      'кислота (COOH)':  '#FF5252',
      'кислота (enol)':  '#FF7043',
      'кислота (ArOH)':  '#FF8A65',
      'кислота/основа':  '#CE93D8',
      'амфотерний':      '#FFB300',
      'основа (N)':      '#69F0AE',
      'основа (пірид.)': '#80CBC4',
      'основа (guanid.)':'#4FC3F7',
    };
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">💊 Фармацевтична хімія — pKa лікарських засобів</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: Avdeef «Absorption and Drug Development» 2nd ed. · DrugBank · Martindale 38th ed. · Stahl & Wermuth «Handbook of Pharmaceutical Salts» 2nd ed.</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Важливість pKa у фармації:</b> ступінь іонізації ліків при pH крові (7.4) визначає розподіл між компартментами. Рівняння Гендерсона–Гассельбаха: <span style="font-family:'Oxanium',monospace;color:#FFB300">pH = pKa + lg([A⁻]/[HA])</span>. Нейтральна форма ліпофільна і краще проникає через мембрани.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Назва</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Формула</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">pKa</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Тип</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Клас</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>{
            const col = typeColors[r.type] || '#7080b8';
            const pkaDisplay = r.pka1 ? `${r.pka1} / ${r.pka}` : r.pka;
            return `
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#ffffff;font-weight:500">${r.name}</td>
            <td style="padding:8px 10px;color:#CE93D8;font-family:'Oxanium',monospace;font-size:10px">${r.formula}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${pkaDisplay}</td>
            <td style="padding:8px 10px"><span style="color:${col};font-size:11px">${r.type}</span></td>
            <td style="padding:8px 10px;color:#4FC3F7;font-size:11px">${r.class}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`;}).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
