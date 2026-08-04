// ============ Т-09: ЕНЕРГІЇ ТА ДОВЖИНИ ХІМІЧНИХ ЗВ'ЯЗКІВ ============
// Джерело: CRC Handbook of Chemistry and Physics, 97th ed.; Darwent, B. de B. (1970) NSRDS-NBS 31
// length — довжина зв'язку (пм), energy — середня енергія дисоціації (кДж/моль) при 25°C

const TABLE_BONDS = {
  id: 'bonds',
  title: 'Енергії та довжини хімічних зв\'язків',
  topic: '1-3-bond',
  data: [
    // C–C зв'язки
    {bond:'C–C',   type:'одинарний', length:154, energy:347,  category:'Карбон–Карбон'},
    {bond:'C=C',   type:'подвійний', length:134, energy:614,  category:'Карбон–Карбон'},
    {bond:'C≡C',   type:'потрійний', length:120, energy:839,  category:'Карбон–Карбон'},
    // C–H
    {bond:'C–H',   type:'одинарний', length:109, energy:413,  category:'Карбон–Гідроген'},
    // C–O, C=O
    {bond:'C–O',   type:'одинарний', length:143, energy:358,  category:'Карбон–Оксиген'},
    {bond:'C=O',   type:'подвійний', length:122, energy:745,  category:'Карбон–Оксиген'},
    {bond:'C≡O',   type:'потрійний', length:113, energy:1072, category:'Карбон–Оксиген'},
    // C–N
    {bond:'C–N',   type:'одинарний', length:147, energy:305,  category:'Карбон–Нітроген'},
    {bond:'C=N',   type:'подвійний', length:128, energy:615,  category:'Карбон–Нітроген'},
    {bond:'C≡N',   type:'потрійний', length:116, energy:891,  category:'Карбон–Нітроген'},
    // C–halogen
    {bond:'C–F',   type:'одинарний', length:135, energy:485,  category:'Карбон–Галоген'},
    {bond:'C–Cl',  type:'одинарний', length:177, energy:339,  category:'Карбон–Галоген'},
    {bond:'C–Br',  type:'одинарний', length:194, energy:285,  category:'Карбон–Галоген'},
    {bond:'C–I',   type:'одинарний', length:214, energy:213,  category:'Карбон–Галоген'},
    // O–H, O–O
    {bond:'O–H',   type:'одинарний', length:96,  energy:459,  category:'Оксиген'},
    {bond:'O–O',   type:'одинарний', length:148, energy:146,  category:'Оксиген'},
    {bond:'O=O',   type:'подвійний', length:121, energy:498,  category:'Оксиген'},
    // N–H, N–N
    {bond:'N–H',   type:'одинарний', length:101, energy:391,  category:'Нітроген'},
    {bond:'N–N',   type:'одинарний', length:145, energy:163,  category:'Нітроген'},
    {bond:'N=N',   type:'подвійний', length:125, energy:418,  category:'Нітроген'},
    {bond:'N≡N',   type:'потрійний', length:110, energy:945,  category:'Нітроген'},
    // H–X
    {bond:'H–H',   type:'одинарний', length:74,  energy:436,  category:'Гідроген'},
    {bond:'H–F',   type:'одинарний', length:92,  energy:567,  category:'Гідроген–Галоген'},
    {bond:'H–Cl',  type:'одинарний', length:127, energy:432,  category:'Гідроген–Галоген'},
    {bond:'H–Br',  type:'одинарний', length:141, energy:366,  category:'Гідроген–Галоген'},
    {bond:'H–I',   type:'одинарний', length:161, energy:298,  category:'Гідроген–Галоген'},
    // S
    {bond:'S–H',   type:'одинарний', length:134, energy:363,  category:'Сульфур'},
    {bond:'S–S',   type:'одинарний', length:204, energy:266,  category:'Сульфур'},
    {bond:'C–S',   type:'одинарний', length:182, energy:272,  category:'Сульфур'},
    {bond:'S=O',   type:'подвійний', length:143, energy:522,  category:'Сульфур'},
    // Si
    {bond:'Si–O',  type:'одинарний', length:166, energy:452,  category:'Силіцій'},
    {bond:'Si–H',  type:'одинарний', length:148, energy:318,  category:'Силіцій'},
    {bond:'Si–Si', type:'одинарний', length:235, energy:222,  category:'Силіцій'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const maxE = Math.max(...this.data.map(r=>r.energy));
    let rows = '';
    this.data.forEach(r => {
      const barW = Math.round((r.energy / maxE) * 100);
      const col = r.type==='потрійний' ? '#FF5252' : r.type==='подвійний' ? '#FFB300' : '#4FC3F7';
      rows += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;font-weight:700;color:${col};font-size:14px">${r.bond}</td>
        <td style="padding:7px 12px;font-size:11px;color:#7080b8">${r.type}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:700">${r.length}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:700">${r.energy}</td>
        <td style="padding:7px 12px">
          <div style="background:#1e2240;border-radius:4px;height:6px;overflow:hidden;width:120px">
            <div style="width:${barW}%;height:100%;background:${col};border-radius:4px"></div>
          </div>
        </td>
        <td style="padding:7px 12px;font-size:11px;color:#546E7A">${r.category}</td>
      </tr>`;
    });
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔗 Енергії та довжини хімічних зв'язків</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Середні енергії дисоціації та рівноважні довжини зв'язків при <b>25°C</b>.<br>
        Джерело: CRC Handbook 97-е вид.; Darwent (1970) NSRDS-NBS 31.
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:14px;font-size:12px">
        <span style="color:#4FC3F7">■ Одинарний</span>
        <span style="color:#FFB300">■ Подвійний</span>
        <span style="color:#FF5252">■ Потрійний</span>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Зв'язок</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Тип</th>
          <th style="padding:8px 12px;text-align:left;color:#CE93D8;font-weight:600">Довжина (пм)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Енергія (кДж/моль)</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Відносна енергія</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Категорія</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <div style="margin-top:14px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Закономірність:</b> Кратність зв'язку ↑ → довжина ↓, енергія ↑.<br>
        Наприклад: C–C (154 пм, 347 кДж/моль) → C=C (134 пм, 614) → C≡C (120 пм, 839).
      </div>`;
  }
};
