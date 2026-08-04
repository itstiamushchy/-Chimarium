// ============ Т-34: ФАЗОВІ СТАНИ РЕЧОВИН ПРИ Н.У. (25°C, 101.3 кПа) ============
// Джерела: CRC Handbook of Chemistry and Physics, 104th ed. (2023);
//   NIST WebBook SRD 69; Greenwood N.N., Earnshaw A. Chemistry of the Elements, 2nd ed. (1997).

const TABLE_PHASE_STATES = {
  id: 'phase_states',
  title: 'Фазові стани речовин при н.у.',
  topic: '1-4-states',
  data: [
    // Прості речовини — гази
    { name: 'Водень',         formula: 'H₂',    state: 'газ',   color: 'безбарвний' },
    { name: 'Гелій',          formula: 'He',    state: 'газ',   color: 'безбарвний' },
    { name: 'Неон',           formula: 'Ne',    state: 'газ',   color: 'безбарвний' },
    { name: 'Аргон',          formula: 'Ar',    state: 'газ',   color: 'безбарвний' },
    { name: 'Азот',           formula: 'N₂',    state: 'газ',   color: 'безбарвний' },
    { name: 'Кисень',         formula: 'O₂',    state: 'газ',   color: 'безбарвний' },
    { name: 'Озон',           formula: 'O₃',    state: 'газ',   color: 'блідо-блакитний' },
    { name: 'Фтор',           formula: 'F₂',    state: 'газ',   color: 'жовтувато-зелений' },
    { name: 'Хлор',           formula: 'Cl₂',   state: 'газ',   color: 'жовто-зелений' },
    // Прості речовини — рідини
    { name: 'Бром',           formula: 'Br₂',   state: 'рідина', color: 'червоно-бурий' },
    { name: 'Ртуть',          formula: 'Hg',    state: 'рідина', color: 'сріблясто-білий' },
    // Прості речовини — тверді
    { name: 'Літій',          formula: 'Li',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Натрій',         formula: 'Na',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Калій',          formula: 'K',     state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Кальцій',        formula: 'Ca',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Магній',         formula: 'Mg',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Алюміній',       formula: 'Al',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Залізо',         formula: 'Fe',    state: 'тверда', color: 'сіро-сріблястий' },
    { name: 'Мідь',           formula: 'Cu',    state: 'тверда', color: 'червоно-рожевий' },
    { name: 'Цинк',           formula: 'Zn',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Срібло',         formula: 'Ag',    state: 'тверда', color: 'сріблясто-білий' },
    { name: 'Золото',         formula: 'Au',    state: 'тверда', color: 'золотисто-жовтий' },
    { name: 'Вуглець (графіт)',formula: 'C',    state: 'тверда', color: 'чорний' },
    { name: 'Вуглець (алмаз)',formula: 'C',     state: 'тверда', color: 'безбарвний' },
    { name: 'Сірка',          formula: 'S₈',    state: 'тверда', color: 'жовтий' },
    { name: 'Фосфор (білий)', formula: 'P₄',    state: 'тверда', color: 'воскоподібно-білий' },
    { name: 'Йод',            formula: 'I₂',    state: 'тверда', color: 'темно-фіолетовий/чорний' },
    // Оксиди
    { name: 'Вода',           formula: 'H₂O',   state: 'рідина', color: 'безбарвний' },
    { name: 'Вуглекислий газ',formula: 'CO₂',   state: 'газ',   color: 'безбарвний' },
    { name: 'Чадний газ',     formula: 'CO',    state: 'газ',   color: 'безбарвний' },
    { name: 'Оксид азоту(II)',formula: 'NO',    state: 'газ',   color: 'безбарвний' },
    { name: 'Оксид азоту(IV)',formula: 'NO₂',   state: 'газ',   color: 'бурий (коричневий)' },
    { name: 'Оксид сірки(IV)',formula: 'SO₂',   state: 'газ',   color: 'безбарвний' },
    { name: 'Оксид сірки(VI)',formula: 'SO₃',   state: 'рідина', color: 'безбарвний' },
    { name: 'Оксид натрію',   formula: 'Na₂O',  state: 'тверда', color: 'білий' },
    { name: 'Оксид кальцію',  formula: 'CaO',   state: 'тверда', color: 'білий' },
    { name: 'Оксид міді(II)', formula: 'CuO',   state: 'тверда', color: 'чорний' },
    { name: 'Оксид заліза(III)',formula: 'Fe₂O₃',state: 'тверда', color: 'червоно-бурий' },
    // Кислоти
    { name: 'Хлоридна кислота', formula: 'HCl', state: 'газ',   color: 'безбарвний' },
    { name: 'Флуоридна кислота',formula: 'HF',  state: 'газ',   color: 'безбарвний' },
    { name: 'Сірководень',    formula: 'H₂S',   state: 'газ',   color: 'безбарвний' },
    { name: 'Аміак',          formula: 'NH₃',   state: 'газ',   color: 'безбарвний' },
    { name: 'Сульфатна кислота', formula: 'H₂SO₄', state: 'рідина', color: 'безбарвний (в\'язкий)' },
    { name: 'Нітратна кислота',  formula: 'HNO₃',  state: 'рідина', color: 'безбарвний (жовтуватий)' },
    { name: 'Фосфатна кислота',  formula: 'H₃PO₄', state: 'тверда', color: 'безбарвний' },
    // Солі / Луги
    { name: 'Гідроксид натрію', formula: 'NaOH',  state: 'тверда', color: 'білий' },
    { name: 'Хлорид натрію',   formula: 'NaCl',  state: 'тверда', color: 'білий' },
    { name: 'Карбонат кальцію',formula: 'CaCO₃', state: 'тверда', color: 'білий' },
    { name: 'Сульфат міді(II)',formula: 'CuSO₄·5H₂O', state: 'тверда', color: 'блакитний' },
    { name: 'Дихромат калію',  formula: 'K₂Cr₂O₇', state: 'тверда', color: 'оранжево-червоний' },
    { name: 'Перманганат калію',formula: 'KMnO₄', state: 'тверда', color: 'темно-фіолетовий' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const stateColor = { 'газ': '#4FC3F7', 'рідина': '#00E5CC', 'тверда': '#FFB300' };
    const stateIcon  = { 'газ': '💨', 'рідина': '💧', 'тверда': '🪨' };

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🌡️ Фазові стани речовин при н.у. (25°C, 101.3 кПа)</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:10px;line-height:1.6">
        Стан при стандартних умовах (25°C, 101.3 кПа):
        <span style="color:#4FC3F7;font-weight:700">💨 газ</span> &nbsp;
        <span style="color:#00E5CC;font-weight:700">💧 рідина</span> &nbsp;
        <span style="color:#FFB300;font-weight:700">🪨 тверда</span>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Речовина</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Формула</th>
            <th style="padding:10px 8px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace">Стан</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Колір</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const sc = stateColor[r.state] || '#ffffff';
      const si = stateIcon[r.state] || '';
      html += `
          <tr style="background:${bg};border-bottom:0.5px solid #1e2240">
            <td style="padding:9px 12px;color:#ffffff">${r.name}</td>
            <td style="padding:9px 12px;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:700">${r.formula}</td>
            <td style="padding:9px 8px;text-align:center;color:${sc};font-weight:700">${si} ${r.state}</td>
            <td style="padding:9px 12px;color:#c8d0e8">${r.color}</td>
          </tr>`;
    });

    html += `
        </tbody>
      </table>
      </div>
      <div style="margin-top:14px;font-size:11px;color:#4a5580;line-height:1.6">
        Джерела: CRC Handbook of Chemistry and Physics, 104th ed. (2023);
        Greenwood N.N., Earnshaw A. Chemistry of the Elements, 2nd ed. (1997); NIST WebBook SRD 69.
      </div>`;

    c.innerHTML = html;
  }
};
