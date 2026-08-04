// ============ Т-25: ГРАВІМЕТРИЧНІ ФАКТОРИ ============
// Джерело: Skoog, West, Holler "Fundamentals of Analytical Chemistry", 9th ed.;
//          Vogel's Textbook of Quantitative Chemical Analysis, 6th ed.;
//          IUPAC Atomic Weights 2021 (Commission on Isotopic Abundances)
// F = M(визначуваного) / M(осаду) × стехіометричний коефіцієнт
// Мол. маси: Fe=55.845, Fe₂O₃=159.688, BaSO₄=233.390, Cl=35.453, AgCl=143.321 і т.д.

const TABLE_GRAVIMETRIC = {
  id: 'gravimetric',
  title: 'Гравіметричні фактори',
  topic: '6-2-titrimetry',
  data: [
    // ЗАЛІЗО
    {analyte:'Fe',       precipitate:'Fe₂O₃',    factor:0.6994, note:'F = 2×55.845/159.688'},
    {analyte:'FeO',      precipitate:'Fe₂O₃',    factor:0.8998, note:'F = 2×71.844/159.688'},
    {analyte:'Fe₂O₃',   precipitate:'Fe₂O₃',    factor:1.0000, note:'Пряме визначення'},
    {analyte:'Fe₃O₄',   precipitate:'Fe₂O₃',    factor:0.9666, note:'F = 2×231.533/(3×159.688)'},
    // КАЛЬЦІЙ
    {analyte:'Ca',       precipitate:'CaO',       factor:0.7147, note:'F = 40.078/56.077'},
    {analyte:'Ca',       precipitate:'CaCO₃',     factor:0.4004, note:'F = 40.078/100.087'},
    {analyte:'Ca',       precipitate:'CaC₂O₄',    factor:0.2743, note:'F = 40.078/146.112'},
    {analyte:'CaO',      precipitate:'CaCO₃',     factor:0.5603, note:'F = 56.077/100.087'},
    // МАГНІЙ
    {analyte:'Mg',       precipitate:'MgO',        factor:0.6032, note:'F = 24.305/40.304'},
    {analyte:'Mg',       precipitate:'Mg₂P₂O₇',   factor:0.2184, note:'F = 2×24.305/222.553'},
    {analyte:'MgO',      precipitate:'Mg₂P₂O₇',   factor:0.3621, note:'F = 2×40.304/222.553'},
    // БАРІЙ / СУЛЬФАТ
    {analyte:'Ba',       precipitate:'BaSO₄',      factor:0.5885, note:'F = 137.327/233.390'},
    {analyte:'BaO',      precipitate:'BaSO₄',      factor:0.6570, note:'F = 153.326/233.390'},
    {analyte:'SO₃',      precipitate:'BaSO₄',      factor:0.3430, note:'F = 80.060/233.390'},
    {analyte:'SO₄²⁻',   precipitate:'BaSO₄',      factor:0.4116, note:'F = 96.059/233.390'},
    {analyte:'S',        precipitate:'BaSO₄',      factor:0.1374, note:'F = 32.060/233.390'},
    // ХЛОР / СРІБЛО
    {analyte:'Cl',       precipitate:'AgCl',       factor:0.2474, note:'F = 35.453/143.321'},
    {analyte:'Cl⁻',     precipitate:'AgCl',       factor:0.2474, note:'Те саме'},
    {analyte:'HCl',      precipitate:'AgCl',       factor:0.2545, note:'F = 36.461/143.321'},
    {analyte:'NaCl',     precipitate:'AgCl',       factor:0.4079, note:'F = 58.443/143.321'},
    // ФОСФОР
    {analyte:'P',        precipitate:'Mg₂P₂O₇',   factor:0.2783, note:'F = 2×30.974/222.553'},
    {analyte:'P₂O₅',    precipitate:'Mg₂P₂O₇',   factor:0.6378, note:'F = 141.944/222.553'},
    {analyte:'PO₄³⁻',   precipitate:'Mg₂P₂O₇',   factor:0.8784, note:'F = 2×94.970/216.553 (≈)'},
    // АЛЮМІНІЙ
    {analyte:'Al',       precipitate:'Al₂O₃',      factor:0.5293, note:'F = 2×26.982/101.961'},
    {analyte:'Al',       precipitate:'AlPO₄',      factor:0.2212, note:'F = 26.982/121.951'},
    // НІКЕЛЬ / МІДЬ
    {analyte:'Ni',       precipitate:'Ni(C₄H₇N₂O₂)₂', factor:0.2031, note:'Диметилгліоксимат Ni; F = 58.693/288.915'},
    {analyte:'Cu',       precipitate:'CuSCN',       factor:0.5225, note:'F = 63.546/121.628'},
    // КРЕМНІЙ
    {analyte:'Si',       precipitate:'SiO₂',        factor:0.4674, note:'F = 28.086/60.085'},
    {analyte:'SiO₂',    precipitate:'SiO₂',        factor:1.0000, note:'Пряме визначення'},
    // СВИНЕЦЬ / СРІБЛО
    {analyte:'Pb',       precipitate:'PbSO₄',       factor:0.6832, note:'F = 207.200/303.263'},
    {analyte:'Ag',       precipitate:'AgCl',         factor:0.7526, note:'F = 107.868/143.321'},
    {analyte:'Ag',       precipitate:'Ag₂SO₄',       factor:0.6942, note:'F = 2×107.868/311.799'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    // Group by analyte element
    const elementOrder = ['Fe','Ca','Mg','Ba/SO₄','Cl/Ag','P','Al','Ni/Cu','Si','Pb/Ag'];
    const groupMap = {
      'Fe':['Fe','FeO','Fe₂O₃','Fe₃O₄'],
      'Ca':['Ca','CaO','CaCO₃','CaC₂O₄'],
      'Mg':['Mg','MgO'],
      'Ba/SO₄':['Ba','BaO','SO₃','SO₄²⁻','S'],
      'Cl/Ag':['Cl','Cl⁻','HCl','NaCl','Ag'],
      'P':['P','P₂O₅','PO₄³⁻'],
      'Al':['Al'],
      'Ni/Cu':['Ni','Cu'],
      'Si':['Si','SiO₂'],
      'Pb/Ag':['Pb','Ag'],
    };
    const colors = {'Fe':'#FF7043','Ca':'#4FC3F7','Mg':'#00E5CC','Ba/SO₄':'#FFB300',
                    'Cl/Ag':'#CE93D8','P':'#81D4FA','Al':'#A5D6A7','Ni/Cu':'#FFAB40',
                    'Si':'#80DEEA','Pb/Ag':'#EF9A9A'};
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">⚖️ Гравіметричні фактори</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:6px">Джерело: Skoog et al. Fundamentals of Analytical Chemistry 9th ed. · Vogel's QCA · IUPAC 2021</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">F = маса визначуваного / маса осаду</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Визначувана речовина</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Осад (зважувана форма)</th>
          <th style="text-align:right;padding:9px 18px;color:#4FC3F7">Фактор F</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Примітка</th>
        </tr></thead><tbody>`;
    let rowIdx = 0;
    elementOrder.forEach(grp => {
      const analytes = groupMap[grp];
      const grpData = this.data.filter(r => analytes.includes(r.analyte));
      if (!grpData.length) return;
      html += `<tr><td colspan="4" style="padding:8px 12px;background:#080c1a;color:${colors[grp]||'#4FC3F7'};font-size:11px;font-weight:700">${grp}</td></tr>`;
      grpData.forEach(r => {
        html += `<tr style="border-bottom:0.5px solid #1e2240;background:${rowIdx%2===0?'#0f1632':'#0b1028'}">
          <td style="padding:8px 12px;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.analyte}</td>
          <td style="padding:8px 12px;font-family:'Oxanium',monospace;color:#ffffff">${r.precipitate}</td>
          <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.factor.toFixed(4)}</td>
          <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note||''}</td>
        </tr>`;
        rowIdx++;
      });
    });
    html += '</tbody></table></div>';
    c.innerHTML = html;
  }
};
