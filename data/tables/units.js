// ============ Т-41: ОДИНИЦІ ВИМІРЮВАННЯ ============
// Джерела: IUPAC Green Book 3rd ed. (2007); SI Brochure 9th ed. (2019);
//          CRC Handbook of Chemistry and Physics 104th ed. (2023);
//          NIST SP 811 (2008 ed., rev. 2019).
// 29 пар перерахунку: тиск, енергія, концентрація, температура,
//   довжина, об'єм, маса. SI / IUPAC.

const TABLE_UNITS = {
  id: 'units',
  title: 'Одиниці вимірювання',
  topic: '1-5-gases',
  data: [
    // ---- ТИСК ----
    { cat: 'Тиск',          from: 'Па',           to: 'атм',        factor: '1 / 101325',    result: '9.8692\u00d710\u207b\u2076',   note: '1 Па = 9.8692\u00d710\u207b\u2076 атм' },
    { cat: 'Тиск',          from: 'атм',          to: 'Па',         factor: '101325',        result: '101\u202f325',         note: '1 атм = 101\u202f325 Па (точно)' },
    { cat: 'Тиск',          from: 'атм',          to: 'кПа',        factor: '101.325',       result: '101.325',             note: '1 атм = 101.325 кПа' },
    { cat: 'Тиск',          from: 'бар',          to: 'Па',         factor: '100000',        result: '100\u202f000',         note: '1 бар = 10\u2075 Па' },
    { cat: 'Тиск',          from: 'мм рт.ст.',    to: 'Па',         factor: '133.322',       result: '133.322',             note: '1 мм рт.ст. = 133.322 Па' },
    { cat: 'Тиск',          from: 'атм',          to: 'мм рт.ст.',  factor: '760',           result: '760',                 note: '1 атм = 760 мм рт.ст. (точно)' },
    // ---- ЕНЕРГІЯ ----
    { cat: 'Енергія',       from: 'кДж',          to: 'кал',        factor: '1000 / 4.184',  result: '239.006',             note: '1 кДж = 239.006 кал' },
    { cat: 'Енергія',       from: 'ккал',         to: 'кДж',        factor: '4.184',         result: '4.184',               note: '1 ккал = 4.184 кДж' },
    { cat: 'Енергія',       from: 'еВ',           to: 'кДж/моль',   factor: '96.4853',       result: '96.4853',             note: '1 еВ/молекула = 96.485 кДж/моль' },
    { cat: 'Енергія',       from: 'кДж/моль',     to: 'еВ',         factor: '1 / 96.4853',   result: '0.010364',            note: '1 кДж/моль = 0.010364 еВ' },
    { cat: 'Енергія',       from: 'Дж',           to: 'ерг',        factor: '1\u00d710\u2077', result: '10\u202f000\u202f000', note: '1 Дж = 10\u2077 ерг (CGS)' },
    // ---- КОНЦЕНТРАЦІЯ ----
    { cat: 'Концентрація',  from: 'моль/л',       to: 'ммоль/л',    factor: '1000',          result: '1000',                note: '1 М = 1000 мМ' },
    { cat: 'Концентрація',  from: 'мг/л',         to: 'мкг/мл',     factor: '1',             result: '1',                   note: '1 мг/л = 1 мкг/мл' },
    { cat: 'Концентрація',  from: 'г/л',          to: 'г/мл',       factor: '0.001',         result: '0.001',               note: '1 г/л = 0.001 г/мл' },
    { cat: 'Концентрація',  from: 'ppm',          to: 'мг/л',       factor: '1',             result: '1',                   note: '1 ppm \u2248 1 мг/л (водн. р-н)' },
    { cat: 'Концентрація',  from: 'ppb',          to: 'мкг/л',      factor: '1',             result: '1',                   note: '1 ppb \u2248 1 мкг/л (водн. р-н)' },
    // ---- ТЕМПЕРАТУРА ----
    { cat: 'Температура',   from: '\u00b0C',      to: 'K',          factor: 'T + 273.15',    result: '+273.15',             note: '0\u00b0C = 273.15 K (точно IUPAC)' },
    { cat: 'Температура',   from: 'K',            to: '\u00b0C',    factor: 'T \u2212 273.15', result: '\u2212273.15',      note: '0 K = \u2212273.15\u00b0C' },
    { cat: 'Температура',   from: '\u00b0F',      to: '\u00b0C',    factor: '(T \u2212 32) / 1.8', result: '(F\u221232)/1.8', note: '32\u00b0F = 0\u00b0C; 212\u00b0F = 100\u00b0C' },
    { cat: 'Температура',   from: '\u00b0C',      to: '\u00b0F',    factor: 'T \u00d7 1.8 + 32', result: '\u00d71.8+32',   note: '100\u00b0C = 212\u00b0F' },
    // ---- ДОВЖИНА ----
    { cat: 'Довжина',       from: 'нм',           to: 'м',          factor: '1\u00d710\u207b\u2079', result: '10\u207b\u2079', note: '1 нм = 10\u207b\u2079 м' },
    { cat: 'Довжина',       from: '\u00c5 (ангстрем)', to: 'нм',   factor: '0.1',           result: '0.1',                 note: '1 \u00c5 = 0.1 нм = 10\u207b\u00b9\u2070 м' },
    { cat: 'Довжина',       from: 'пм',           to: '\u00c5',     factor: '0.01',          result: '0.01',                note: '1 пм = 0.01 \u00c5; атомні радіуси' },
    // ---- ОБ'ЄМ ----
    { cat: "Об\u2019єм",   from: 'л',            to: 'м\u00b3',    factor: '0.001',         result: '0.001',               note: '1 л = 10\u207b\u00b3 м\u00b3' },
    { cat: "Об\u2019єм",   from: 'мл',           to: 'см\u00b3',   factor: '1',             result: '1',                   note: '1 мл = 1 см\u00b3 (точно)' },
    { cat: "Об\u2019єм",   from: 'дм\u00b3',     to: 'л',          factor: '1',             result: '1',                   note: '1 дм\u00b3 = 1 л (точно)' },
    // ---- МАСА ----
    { cat: 'Маса',          from: 'а.о.м.',       to: 'г/моль',     factor: '1',             result: '1',                   note: '1 а.о.м. = 1 г/моль (чисельно)' },
    { cat: 'Маса',          from: 'а.о.м.',       to: 'кг',         factor: '1.66054\u00d710\u207b\u00b2\u2077', result: '1.66054\u00d710\u207b\u00b2\u2077', note: '1 а.о.м. = 1.66054\u00d710\u207b\u00b2\u2077 кг' },
    { cat: 'Маса',          from: 'кДа',          to: 'г/моль',     factor: '1000',          result: '1000',                note: '1 кДа = 1000 г/моль (біохімія)' },
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;

    const catColors = {
      'Тиск':           '#4FC3F7',
      'Енергія':        '#FFB300',
      'Концентрація':   '#A5D6A7',
      'Температура':    '#F48FB1',
      'Довжина':        '#CE93D8',
      'Об\u2019єм':     '#80DEEA',
      'Маса':           '#FFCC80',
    };

    const cats = {};
    this.data.forEach(r => {
      if (!cats[r.cat]) cats[r.cat] = [];
      cats[r.cat].push(r);
    });

    let rows = '';
    let totalRows = 0;
    Object.entries(cats).forEach(([cat, items]) => {
      const color = catColors[cat] || '#b0c0e0';
      items.forEach((r, i) => {
        const bg = totalRows % 2 === 0 ? '#0f1632' : '#0b1028';
        rows += `
          <tr style="border-bottom:0.5px solid #1e2240;background:${bg}">
            ${i === 0 ? `<td rowspan="${items.length}" style="padding:8px 12px;vertical-align:middle;font-weight:700;color:${color};font-size:11px;white-space:nowrap;border-right:1px solid #1e2240">${cat}</td>` : ''}
            <td style="padding:7px 10px;color:#b0c0e0;font-family:'Oxanium',monospace;font-size:12px">${r.from}</td>
            <td style="padding:7px 6px;text-align:center;color:#4FC3F7;font-size:13px">\u2192</td>
            <td style="padding:7px 10px;color:#b0c0e0;font-family:'Oxanium',monospace;font-size:12px">${r.to}</td>
            <td style="padding:7px 12px;text-align:right;color:${color};font-family:'Oxanium',monospace;font-weight:700;font-size:12px;white-space:nowrap">${r.result}</td>
            <td style="padding:7px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`;
        totalRows++;
      });
    });

    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">\u2190 Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">\ud83d\udcd0 Одиниці вимірювання \u00b7 Перерахунок</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:12px;line-height:1.6">
        Джерела: IUPAC Green Book 3rd ed. (2007) \u00b7 SI Brochure 9th ed. (2019) \u00b7 NIST SP\u202f811.
        Для температури \u2014 формула перетворення, не множник.
      </div>
      <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
        ${Object.entries(catColors).map(([cat, color]) =>
          `<span style="font-size:11px"><span style="color:${color}">\u25a0</span> ${cat}</span>`
        ).join('')}
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Категорія</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">З</th>
            <th style="padding:9px 6px"></th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">В</th>
            <th style="text-align:right;padding:9px 12px;color:#4FC3F7">Множник / формула</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      </div>
      <div style="font-size:10px;color:#4a5070;margin-top:10px;line-height:1.7">
        а.о.м. \u2014 атомна одиниця маси; \u00c5 \u2014 ангстрем (1\u202f\u00c5\u202f=\u202f10\u207b\u00b9\u2070\u202fм);
        кДа \u2014 кілодальтон; ppm \u2014 parts per million; ppb \u2014 parts per billion.
      </div>`;
  }
};
