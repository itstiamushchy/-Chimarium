// ============ Т-29: ОКИСНО-ВІДНОВНІ ІНДИКАТОРИ ============
// Джерело: Skoog D.A., West D.M., Holler F.J. Fundamentals of Analytical Chemistry, 9th ed.
//          Kolthoff I.M., Stenger V.A. Volumetric Analysis, 2nd ed. (1947)
//          Vogel's Textbook of Quantitative Chemical Analysis, 6th ed. (1989)
// E° — стандартний (умовний) редокс-потенціал індикатора при pH=0 (В відносно СВЕ)

const TABLE_REDOX_INDICATORS = {
  id: 'redox_indicators',
  title: 'Окисно-відновні індикатори',
  topic: '6-2-titrimetry',
  data: [
    {name:'Дифеніламін',            formula:'(C₆H₅)₂NH',         potential:0.76,  colorOx:'фіолетовий',    colorRed:'безбарвний',   note:'KMnO₄, K₂Cr₂O₇; не в HCl'},
    {name:'Дифеніламінсульфонат Na',formula:'C₁₂H₁₀NO₃S·Na',    potential:0.84,  colorOx:'фіолетово-синій',colorRed:'безбарвний',  note:'Покращена версія дифеніламіну'},
    {name:'Ерітрозин B',            formula:'C₂₀H₆I₄Na₂O₅',     potential:1.00,  colorOx:'безбарвний',    colorRed:'рожевий',      note:'Зворотний індикатор'},
    {name:'Ферроїн (фенантролін Fe)',formula:'[Fe(phen)₃]²⁺/³⁺', potential:1.06,  colorOx:'блідо-голубий', colorRed:'яскраво-червоний', note:'Церіметрія, перманганатометрія'},
    {name:'Нітроферроїн',           formula:'[Fe(4-NO₂-phen)₃]', potential:1.25,  colorOx:'блідо-голубий', colorRed:'червоний',     note:'Вищий потенціал ніж ферроїн'},
    {name:'5-Нітрофенантролін Fe(II)',formula:'[Fe(5-NO₂-phen)₃]',potential:1.10, colorOx:'блідо-синій',  colorRed:'жовтогарячий',  note:'Церіметрія, хроматометрія'},
    {name:'Метиленовий синій',      formula:'C₁₆H₁₈ClN₃S',       potential:0.53,  colorOx:'синій',         colorRed:'безбарвний',   note:'Слабкі відновники'},
    {name:'Тіонін',                 formula:'C₁₂H₉N₃S',          potential:0.56,  colorOx:'фіолетовий',    colorRed:'безбарвний',   note:'Аналог метиленового синього'},
    {name:'Індиго тетрасульфонат',  formula:'C₁₆H₈N₂Na₄O₁₁S₄', potential:0.36,  colorOx:'синій',         colorRed:'жовтий',       note:'Йодометрія, йодатометрія'},
    {name:'Крохмаль (з I₂)',        formula:'(C₆H₁₀O₅)ₙ',       potential:null,  colorOx:'темно-синій',   colorRed:'безбарвний',   note:'Специфічний: тільки з I₂/I₃⁻'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const colorDots = {
      'фіолетовий':'#CE93D8','фіолетово-синій':'#9C88D4','синій':'#4FC3F7',
      'блідо-голубий':'#B2EBF2','блідо-синій':'#B3E5FC','темно-синій':'#1565C0',
      'червоний':'#FF5252','яскраво-червоний':'#FF1744','жовтогарячий':'#FF6D00',
      'рожевий':'#F48FB1','жовтий':'#FFD600','безбарвний':'#546E7A',
    };
    const dot = (color) => {
      const bg = colorDots[color] || '#7080b8';
      return `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${bg};margin-right:5px;vertical-align:middle"></span>`;
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🔴 Окисно-відновні індикатори</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: Skoog et al. Fundamentals of Analytical Chemistry 9th ed. · Kolthoff & Stenger Volumetric Analysis · E° відносно СВЕ, pH = 0</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Назва індикатора</th>
          <th style="text-align:right;padding:9px 12px;color:#FFB300">E° (В)</th>
          <th style="text-align:left;padding:9px 12px;color:#FF5252">Колір (окисн.)</th>
          <th style="text-align:left;padding:9px 12px;color:#00E5CC">Колір (відновл.)</th>
          <th style="text-align:left;padding:9px 12px;color:#7080b8">Застосування</th>
        </tr></thead><tbody>`;
    this.data.forEach((r, i) => {
      const pot = r.potential !== null ? r.potential.toFixed(2) : '—';
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff;font-weight:600">${r.name}<br><span style="font-family:'Oxanium',monospace;font-size:10px;color:#7080b8">${r.formula}</span></td>
        <td style="padding:8px 12px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${pot}</td>
        <td style="padding:8px 12px;color:#FF5252">${dot(r.colorOx)}${r.colorOx}</td>
        <td style="padding:8px 12px;color:#00E5CC">${dot(r.colorRed)}${r.colorRed}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:12px;font-size:11px;color:#7080b8;line-height:1.7">
        Редокс-індикатор змінює колір при потенціалі: <b style="color:#4FC3F7">E = E°(ind) ± 0.059/n В</b>.
        Обирають індикатор так, щоб його E° потрапляв у стрибок потенціалу на кривій титрування.
      </div>`;
    c.innerHTML = html;
  }
};
