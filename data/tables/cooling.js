// ============ Т-20: ОХОЛОДЖУВАЛЬНІ СУМІШІ ============
// Джерела: CRC Handbook of Chemistry and Physics, 97th ed. (2016);
// Перрі Р., Хімічний довідник інженера (1969);
// Lide D.R., Handbook of Organic Solvents (1995);
// Bevington P.R., Data Reduction and Error Analysis (1969).

const TABLE_COOLING = {
  id: 'cooling',
  title: 'Охолоджувальні суміші',
  topic: '3-5-phase',
  data: [
    { components: 'Лід + NaCl',              ratio: '3 : 1 (мас.)',  tempMin: -21,  note: 'Класична кріосуміш; евтектика −21.1°C при 23.3% NaCl' },
    { components: 'Лід + CaCl₂·6H₂O',       ratio: '4 : 5 (мас.)',  tempMin: -55,  note: 'Ефективніша за NaCl; евтектика −55°C при 30% CaCl₂' },
    { components: 'Лід + MgCl₂',             ratio: '3 : 1 (мас.)',  tempMin: -34,  note: 'Проміжний варіант між NaCl і CaCl₂' },
    { components: 'Лід + H₂SO₄ (конц.)',     ratio: '6 : 1 (мас.)',  tempMin: -37,  note: '⚠️ Небезпечно! Тільки у витяжній шафі' },
    { components: 'Лід + HNO₃ (конц.)',      ratio: '1 : 1 (мас.)',  tempMin: -30,  note: '⚠️ Небезпечно! Окисник' },
    { components: 'Льодяна оцтова к-та + сух. лід', ratio: 'надлишок оцтової', tempMin: -78, note: 'Зручний стабільний −78°C для лаб. синтезів' },
    { components: 'Ацетон + сухий лід (CO₂)', ratio: 'надлишок ацетону',    tempMin: -78,  note: 'Стандартна кріосуміш −78°C; ацетон або EtOH' },
    { components: 'Сухий лід (CO₂, чистий)', ratio: '—',             tempMin: -78,  note: 'Сублімація при −78.5°C (1 атм); зручний для транспорту' },
    { components: 'Рідкий N₂',               ratio: '—',             tempMin: -196, note: 'T_кип = −195.8°C; найдоступніший кріоген' },
    { components: 'Рідкий Ar',               ratio: '—',             tempMin: -186, note: 'T_кип = −185.9°C; для інертної атмосфери' },
    { components: 'Рідкий O₂',              ratio: '—',             tempMin: -183, note: '⚠️ Вибухонебезпечний з органікою! T_кип = −182.9°C' },
    { components: 'EtOH + рідкий N₂',        ratio: 'надлишок EtOH', tempMin: -114, note: 'T_пл EtOH = −114°C; стабільна ванна' },
    { components: 'Ацетонітрил + рідкий N₂', ratio: 'надлишок MeCN', tempMin: -41,  note: 'T_пл MeCN = −41°C; корисний для −41°C' },
    { components: 'CCl₄ + рідкий N₂',        ratio: 'надлишок CCl₄', tempMin: -23,  note: 'T_пл CCl₄ = −22.9°C; ⚠️ токсичний' },
    { components: 'Вода + лід (1 : 1)',       ratio: '1 : 1 (мас.)',  tempMin: 0,    note: 'Стабільні 0°C; буферна баня для кріоскопії' },
    { components: 'Лід + NH₄Cl',             ratio: '5 : 1 (мас.)',  tempMin: -16,  note: 'Старовинна сніго-сольова суміш; −15.8°C' },
    { components: 'Лід + NH₄NO₃',            ratio: '2 : 1 (мас.)',  tempMin: -14,  note: '≈−14°C; NH₄NO₃ — компонент «холодних пакетів»' },
    { components: 'Лід + KCl',               ratio: '3 : 1 (мас.)',  tempMin: -11,  note: 'Евтектика KCl −11.1°C при 20% KCl' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">❄️ Охолоджувальні суміші</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Температури охолоджувальних ванн і кріогенів для лабораторного та промислового використання. T<sub>мін</sub> — мінімальна досяжна температура при оптимальному співвідношенні.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Компоненти суміші</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Співвідношення</th>
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">T<sub>мін</sub> (°C)</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    // Sort by temperature descending (warmest first)
    const sorted = [...this.data].sort((a, b) => b.tempMin - a.tempMin);

    sorted.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const t = r.tempMin;
      const col = t >= -25 ? '#FFB300' : t >= -80 ? '#4FC3F7' : '#CE93D8';
      const bar = Math.round(Math.min(100, Math.abs(t) / 2));
      const hasWarning = r.note.includes('⚠️');
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#fff;font-weight:600">${r.components}</td>
        <td style="padding:9px 12px;text-align:center;color:#c0c8e8;font-size:11px">${r.ratio}</td>
        <td style="padding:9px 12px;text-align:center">
          <span style="font-family:'Oxanium',monospace;font-weight:700;font-size:14px;color:${col}">${t}</span>
          <div style="height:3px;background:#1e2240;border-radius:2px;margin-top:4px;max-width:80px;margin-left:auto;margin-right:auto">
            <div style="height:3px;width:${bar}%;background:${col};border-radius:2px"></div>
          </div>
        </td>
        <td style="padding:9px 12px;color:${hasWarning ? '#FF8C00' : '#7080b8'};font-size:11px;line-height:1.4">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px">
      <div style="padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
        <b style="color:#FFB300">■</b> 0 ... −25°C — сіль + лід<br>
        <b style="color:#4FC3F7">■</b> −25 ... −80°C — ацетон/CO₂, CaCl₂<br>
        <b style="color:#CE93D8">■</b> нижче −80°C — рідкі гази
      </div>
      <div style="padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
        💡 <b style="color:#4FC3F7">Правило евтектики:</b> мінімальна температура досягається лише при <b style="color:#fff">строгому співвідношенні</b> компонентів. Надлишок солі або льоду підвищує T.
      </div>
      <div style="padding:10px 14px;background:#200000;border:0.5px solid #3a1010;border-radius:8px;font-size:11px;color:#FF8C00;line-height:1.6">
        ⚠️ <b>Безпека:</b> рідкий N₂ і CO₂ спричиняють кріоопіки. Зберігайте у відкритих посудинах Дьюара. Не закривайте герметично!
      </div>
    </div>`;

    c.innerHTML = html;
  }
};
