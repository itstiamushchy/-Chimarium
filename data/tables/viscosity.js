// ============ Т-26: В'ЯЗКІСТЬ ТА ПОВЕРХНЕВИЙ НАТЯГ РІДИН ============
// Джерела: CRC Handbook of Chemistry and Physics, 103rd ed. (2022-2023);
//          Lide D.R. (ed.) CRC Handbook, 84th ed.;
//          Yaws C.L. Chemical Properties Handbook (1999)
// Температура: 20°C (293.15 K), якщо не вказано інше
// η — динамічна в'язкість (мПа·с = сП), σ — поверхневий натяг (мН/м)

const TABLE_VISCOSITY = {
  id: 'viscosity',
  title: "В'язкість та поверхневий натяг",
  topic: '4-5-colloids',
  data: [
    {name:'Вода',             formula:'H₂O',          T:20,  viscosity:1.002,  surfaceTension:72.8},
    {name:'Етанол',           formula:'C₂H₅OH',       T:20,  viscosity:1.200,  surfaceTension:22.3},
    {name:'Метанол',          formula:'CH₃OH',         T:20,  viscosity:0.597,  surfaceTension:22.6},
    {name:'Гліцерол',         formula:'C₃H₈O₃',       T:20,  viscosity:1412.0, surfaceTension:63.4},
    {name:'Ацетон',           formula:'(CH₃)₂CO',      T:20,  viscosity:0.316,  surfaceTension:23.7},
    {name:'Бензен',           formula:'C₆H₆',          T:20,  viscosity:0.652,  surfaceTension:28.9},
    {name:'Діетиловий ефір',  formula:'(C₂H₅)₂O',     T:20,  viscosity:0.224,  surfaceTension:17.1},
    {name:'Хлороформ',        formula:'CHCl₃',         T:20,  viscosity:0.563,  surfaceTension:27.1},
    {name:'Ртуть',            formula:'Hg',            T:20,  viscosity:1.526,  surfaceTension:485.5},
    {name:'Оливкова олія',    formula:'(суміш)',       T:20,  viscosity:84.0,   surfaceTension:33.0},
    {name:'Діметилсульфоксид',formula:'(CH₃)₂SO',     T:20,  viscosity:2.000,  surfaceTension:43.5},
    {name:'Чотирихлористий вуглець', formula:'CCl₄',  T:20,  viscosity:0.969,  surfaceTension:26.9},
    {name:'Толуен',           formula:'C₇H₈',          T:20,  viscosity:0.590,  surfaceTension:28.4},
    {name:'н-Гексан',         formula:'C₆H₁₄',        T:20,  viscosity:0.307,  surfaceTension:18.4},
    {name:'Оцтова кислота',   formula:'CH₃COOH',       T:20,  viscosity:1.220,  surfaceTension:27.6},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">💧 В'язкість та поверхневий натяг рідин</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: CRC Handbook of Chemistry and Physics, 103rd ed. (2022–2023) · Yaws Chemical Properties Handbook · T = 20°C</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Рідина</th>
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Формула</th>
          <th style="text-align:right;padding:9px 12px;color:#4FC3F7">T (°C)</th>
          <th style="text-align:right;padding:9px 12px;color:#FFB300">η (мПа·с)</th>
          <th style="text-align:right;padding:9px 18px;color:#00E5CC">σ (мН/м)</th>
        </tr></thead><tbody>`;
    this.data.forEach((r, i) => {
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff;font-weight:600">${r.name}</td>
        <td style="padding:8px 12px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
        <td style="padding:8px 12px;text-align:right;color:#7080b8">${r.T}</td>
        <td style="padding:8px 12px;text-align:right;font-family:'Oxanium',monospace;color:#FFB300;font-weight:700">${r.viscosity.toFixed(3)}</td>
        <td style="padding:8px 18px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.surfaceTension.toFixed(1)}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:12px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">η</b> — динамічна в'язкість: опір рідини течії. 1 мПа·с = 1 сантипуаз (сП).<br>
        <b style="color:#4FC3F7">σ</b> — поверхневий натяг: енергія поверхні розділу рідина/газ. Ртуть має аномально високе σ через металічні зв'язки.
      </div>`;
    c.innerHTML = html;
  }
};
