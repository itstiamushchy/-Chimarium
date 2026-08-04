// ============ Т-52: ПОЛІМЕРИ — ФІЗИКО-ХІМІЧНІ ВЛАСТИВОСТІ ============
// Tg — температура склування (°C)
// Tm — температура плавлення (°C), "-" якщо аморфний
// density — густина (г/см³)
// Джерело: Polymer Handbook 4th ed. (Brandrup, Immergut, Grulke); CRC Handbook; ISO 1183

const TABLE_POLYMERS = {
  id: 'polymers',
  title: 'Полімери — фізико-хімічні властивості',
  topic: '5-6-polymers',
  data: [
    {name:'Поліетилен низького тиску (HDPE)', abbr:'HDPE', formula:'(CH₂CH₂)n',         Tg:-120, Tm:130,  density:0.95, note:'Висока кристалічність ~80%'},
    {name:'Поліетилен високого тиску (LDPE)', abbr:'LDPE', formula:'(CH₂CH₂)n',         Tg:-120, Tm:110,  density:0.92, note:'Розгалужена структура'},
    {name:'Поліпропілен (ізотактичний)',       abbr:'PP',   formula:'(CHCH₃CH₂)n',       Tg:-10,  Tm:165,  density:0.91, note:'Тактичність впливає на Tm'},
    {name:'Полістирол',                        abbr:'PS',   formula:'(CHC₆H₅CH₂)n',      Tg:100,  Tm:null, density:1.05, note:'Аморфний, крихкий'},
    {name:'Полівінілхлорид',                   abbr:'PVC',  formula:'(CHClCH₂)n',         Tg:87,   Tm:212,  density:1.40, note:'Потребує стабілізаторів'},
    {name:'Поліетилентерефталат',              abbr:'PET',  formula:'(C₁₀H₈O₄)n',         Tg:76,   Tm:255,  density:1.38, note:'Напівкристалічний поліестер'},
    {name:'Поліамід 6 (Капрон)',               abbr:'PA-6', formula:'(C₆H₁₁NO)n',         Tg:50,   Tm:220,  density:1.14, note:'Поглинає вологу'},
    {name:'Поліамід 6,6 (Найлон)',             abbr:'PA-66',formula:'(C₁₂H₂₂N₂O₂)n',     Tg:57,   Tm:265,  density:1.14, note:'Вища Tm ніж PA-6'},
    {name:'Полікарбонат',                      abbr:'PC',   formula:'(C₁₆H₁₄O₃)n',        Tg:147,  Tm:null, density:1.20, note:'Аморфний, оптично прозорий'},
    {name:'Поліметилметакрилат (оргскло)',     abbr:'PMMA', formula:'(C₅H₈O₂)n',          Tg:105,  Tm:null, density:1.19, note:'Пропускання світла ~92%'},
    {name:'Поліуретан',                        abbr:'PU',   formula:'(RNHCOO)n',           Tg:-50,  Tm:null, density:1.20, note:'Залежить від твердих/м\'яких сегментів'},
    {name:'Поліетерефталат (натяжний)',        abbr:'BOPET',formula:'(C₁₀H₈O₄)n',         Tg:76,   Tm:254,  density:1.40, note:'Двовісно орієнтований'},
    {name:'Тефлон (ПТФЕ)',                     abbr:'PTFE', formula:'(CF₂CF₂)n',           Tg:-97,  Tm:327,  density:2.20, note:'Найнижчий коефіцієнт тертя'},
    {name:'Каучук натуральний',                abbr:'NR',   formula:'(C₅H₈)n',             Tg:-73,  Tm:null, density:0.91, note:'цис-1,4-поліізопрен'},
    {name:'Полівінілацетат',                   abbr:'PVAc', formula:'(C₄H₆O₂)n',           Tg:30,   Tm:null, density:1.19, note:'Основа для клеїв ПВА'},
    {name:'Поліоксиметилен (поліацеталь)',     abbr:'POM',  formula:'(CH₂O)n',             Tg:-83,  Tm:175,  density:1.41, note:'Висока жорсткість, зносостійкість'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const fmtT = v => v === null ? '<span style="color:#7080b8">аморф.</span>' :
      `<span style="color:${v < 0 ? '#4FC3F7' : '#FFB300'}">${v}</span>`;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧱 Полімери — фізико-хімічні властивості</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Стандартні значення. Джерело: Polymer Handbook 4th ed. (Brandrup, Immergut, Grulke); CRC Handbook of Chemistry and Physics.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="padding:8px 10px;text-align:left;color:#4FC3F7">Назва</th>
          <th style="padding:8px 8px;text-align:center;color:#4FC3F7">Абр.</th>
          <th style="padding:8px 10px;text-align:left;color:#4FC3F7">Формула</th>
          <th style="padding:8px 8px;text-align:center;color:#4FC3F7;white-space:nowrap">Tg (°C)</th>
          <th style="padding:8px 8px;text-align:center;color:#4FC3F7;white-space:nowrap">Tпл (°C)</th>
          <th style="padding:8px 8px;text-align:center;color:#4FC3F7;white-space:nowrap">ρ (г/см³)</th>
          <th style="padding:8px 10px;text-align:left;color:#4FC3F7">Примітка</th>
        </tr></thead>
        <tbody>`;
    this.data.forEach((r, i) => {
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:7px 10px;color:#fff">${r.name}</td>
        <td style="padding:7px 8px;text-align:center;font-family:'Oxanium',monospace;color:#00E5CC;font-weight:700">${r.abbr}</td>
        <td style="padding:7px 10px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
        <td style="padding:7px 8px;text-align:center;font-family:'Oxanium',monospace">${fmtT(r.Tg)}</td>
        <td style="padding:7px 8px;text-align:center;font-family:'Oxanium',monospace">${fmtT(r.Tm)}</td>
        <td style="padding:7px 8px;text-align:center;font-family:'Oxanium',monospace;color:#FFB300">${r.density.toFixed(2)}</td>
        <td style="padding:7px 10px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
    <div style="margin-top:12px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
      💡 <b style="color:#fff">Tg</b> — температура склування: нижче полімер крихкий. <b style="color:#fff">Tпл</b> — тільки для кристалічних полімерів. «Аморф.» — полімер не має чіткої точки плавлення.
    </div>`;
    c.innerHTML = html;
  }
};
