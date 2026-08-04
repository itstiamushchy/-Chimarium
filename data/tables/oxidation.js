// ============ Т-10: СТУПЕНІ ОКИСНЕННЯ ЕЛЕМЕНТІВ ============
// Джерело: IUPAC Red Book (2005); CRC Handbook of Chemistry and Physics, 97th ed.
// typical — найбільш характерні, possible — всі відомі ступені окиснення

const TABLE_OXIDATION = {
  id: 'oxidation',
  title: 'Ступені окиснення елементів',
  topic: '1-1-atom',
  data: [
    // Period 1
    {element:'Гідроген',    symbol:'H',  Z:1,  typical:[1],       possible:[-1,0,1]},
    // Period 2
    {element:'Літій',       symbol:'Li', Z:3,  typical:[1],       possible:[0,1]},
    {element:'Берилій',     symbol:'Be', Z:4,  typical:[2],       possible:[0,2]},
    {element:'Бор',         symbol:'B',  Z:5,  typical:[3],       possible:[-3,0,1,2,3]},
    {element:'Карбон',      symbol:'C',  Z:6,  typical:[2,4],     possible:[-4,-3,-2,-1,0,1,2,3,4]},
    {element:'Нітроген',    symbol:'N',  Z:7,  typical:[-3,3,5],  possible:[-3,-2,-1,0,1,2,3,4,5]},
    {element:'Оксиген',     symbol:'O',  Z:8,  typical:[-2],      possible:[-2,-1,0,1,2]},
    {element:'Флуор',       symbol:'F',  Z:9,  typical:[-1],      possible:[-1,0]},
    {element:'Натрій',      symbol:'Na', Z:11, typical:[1],       possible:[0,1]},
    // Period 3
    {element:'Магній',      symbol:'Mg', Z:12, typical:[2],       possible:[0,2]},
    {element:'Алюміній',    symbol:'Al', Z:13, typical:[3],       possible:[-1,0,1,2,3]},
    {element:'Силіцій',     symbol:'Si', Z:14, typical:[4],       possible:[-4,-3,-2,-1,0,1,2,3,4]},
    {element:'Фосфор',      symbol:'P',  Z:15, typical:[-3,3,5],  possible:[-3,-2,-1,0,1,2,3,4,5]},
    {element:'Сульфур',     symbol:'S',  Z:16, typical:[-2,4,6],  possible:[-2,-1,0,1,2,3,4,5,6]},
    {element:'Хлор',        symbol:'Cl', Z:17, typical:[-1,1,3,5,7], possible:[-1,0,1,2,3,4,5,6,7]},
    {element:'Калій',       symbol:'K',  Z:19, typical:[1],       possible:[0,1]},
    {element:'Кальцій',     symbol:'Ca', Z:20, typical:[2],       possible:[0,2]},
    // d-elements period 4
    {element:'Хром',        symbol:'Cr', Z:24, typical:[3,6],     possible:[-2,-1,0,1,2,3,4,5,6]},
    {element:'Манган',      symbol:'Mn', Z:25, typical:[2,4,7],   possible:[-3,-2,-1,0,1,2,3,4,5,6,7]},
    {element:'Ферум',       symbol:'Fe', Z:26, typical:[2,3],     possible:[-2,-1,0,1,2,3,4,6]},
    {element:'Кобальт',     symbol:'Co', Z:27, typical:[2,3],     possible:[-3,-1,0,1,2,3,4,5]},
    {element:'Нікель',      symbol:'Ni', Z:28, typical:[2],       possible:[-2,-1,0,1,2,3,4]},
    {element:'Купрум',      symbol:'Cu', Z:29, typical:[1,2],     possible:[0,1,2,3,4]},
    {element:'Цинк',        symbol:'Zn', Z:30, typical:[2],       possible:[0,2]},
    // Period 4 p
    {element:'Бром',        symbol:'Br', Z:35, typical:[-1,1,5],  possible:[-1,0,1,3,4,5,7]},
    {element:'Рубідій',     symbol:'Rb', Z:37, typical:[1],       possible:[0,1]},
    {element:'Стронцій',    symbol:'Sr', Z:38, typical:[2],       possible:[0,2]},
    // d-elements period 5
    {element:'Молібден',    symbol:'Mo', Z:42, typical:[4,6],     possible:[-4,-2,-1,0,1,2,3,4,5,6]},
    {element:'Аргентум',    symbol:'Ag', Z:47, typical:[1],       possible:[0,1,2,3]},
    {element:'Кадмій',      symbol:'Cd', Z:48, typical:[2],       possible:[0,2]},
    {element:'Йод',         symbol:'I',  Z:53, typical:[-1,1,5,7],possible:[-1,0,1,3,4,5,6,7]},
    {element:'Барій',       symbol:'Ba', Z:56, typical:[2],       possible:[0,2]},
    // d-elements period 6
    {element:'Вольфрам',    symbol:'W',  Z:74, typical:[4,6],     possible:[-4,-2,-1,0,1,2,3,4,5,6]},
    {element:'Плюмбум',     symbol:'Pb', Z:82, typical:[2,4],     possible:[0,2,4]},
    {element:'Меркурій',    symbol:'Hg', Z:80, typical:[1,2],     possible:[0,1,2]},
    {element:'Аурум',       symbol:'Au', Z:79, typical:[1,3],     possible:[0,1,2,3,5]},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const sorted = [...this.data].sort((a,b)=>a.Z-b.Z);
    let rows = '';
    sorted.forEach(r => {
      const typicalHtml = r.typical.map(n => {
        const col = n<0?'#FF5252':n===0?'#FFB300':'#4FC3F7';
        return `<span style="background:rgba(${n<0?'255,82,82':n===0?'255,179,0':'79,195,247'},0.18);color:${col};font-family:'Oxanium',monospace;font-weight:700;font-size:12px;padding:2px 7px;border-radius:5px;margin:1px">${n>0?'+'+n:n}</span>`;
      }).join('');
      const possibleHtml = r.possible.map(n => {
        const col = n<0?'#EF9A9A':n===0?'#FFE082':'#90CAF9';
        return `<span style="color:${col};font-family:'Oxanium',monospace;font-size:11px;padding:1px 5px;margin:1px">${n>0?'+'+n:n}</span>`;
      }).join('');
      rows += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;color:#fff;font-weight:600">${r.element}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#CE93D8;font-weight:700;font-size:14px">${r.symbol}</td>
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;color:#546E7A">${r.Z}</td>
        <td style="padding:7px 10px">${typicalHtml}</td>
        <td style="padding:7px 10px">${possibleHtml}</td>
      </tr>`;
    });
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚛️ Ступені окиснення елементів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        <b style="color:#4FC3F7">Типові</b> — найбільш характерні для хімічних реакцій. <b style="color:#90CAF9">Можливі</b> — всі відомі ступені окиснення.<br>
        Джерело: IUPAC Red Book (2005); CRC Handbook 97-е вид.
      </div>
      <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:14px;font-size:12px">
        <span style="color:#FF5252">■ Від'ємний</span>
        <span style="color:#FFB300">■ Нуль</span>
        <span style="color:#4FC3F7">■ Додатній</span>
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Елемент</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Символ</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Z</th>
          <th style="padding:8px 12px;text-align:left;color:#4FC3F7;font-weight:600">Типові с.о.</th>
          <th style="padding:8px 12px;text-align:left;color:#7080b8;font-weight:600">Всі можливі</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      <div style="margin-top:14px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Мнемоніка:</b> Флуор — завжди −1. Оксиген — як правило −2 (виняток: OF₂ = +2, H₂O₂ = −1). 
        Лужні метали — завжди +1. Лужноземельні — завжди +2.
      </div>`;
  }
};
