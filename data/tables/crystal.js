// ============ Т-47: КРИСТАЛОХІМІЯ ============
// Джерела: Wells «Structural Inorganic Chemistry» 5th ed. (1984);
//          CRC Handbook of Chemistry and Physics 104th ed.;
//          International Tables for Crystallography Vol. A (2016);
//          ICDD PDF-2 database

const TABLE_CRYSTAL = {
  id: 'crystal',
  title: 'Кристалохімія — параметри кристалічних ґраток',
  topic: '3-4-electrochemistry',
  data: [
    // name, structure type, lattice type, a (Å), c (Å or null), z, density (g/cm³), note
    {name:'NaCl',   struct:'Типу NaCl (ГЦК)',    lattice:'КЦК/ГЦК', a:5.640, c:null,  z:4,  density:2.165, note:'Галіт; октаедрична координація Na⁺ і Cl⁻'},
    {name:'KCl',    struct:'Типу NaCl (ГЦК)',    lattice:'ГЦК',     a:6.293, c:null,  z:4,  density:1.987, note:'Сільвін; ізотипний NaCl'},
    {name:'CsCl',   struct:'Типу CsCl (ПК)',     lattice:'ПК',      a:4.123, c:null,  z:1,  density:3.988, note:'Кубічна координація 8:8'},
    {name:'ZnS',    struct:'Сфалерит (ГЦК)',     lattice:'ГЦК',     a:5.406, c:null,  z:4,  density:4.087, note:'β-ZnS; тетраедрична координація 4:4'},
    {name:'CaF₂',  struct:'Флюорит (ГЦК)',      lattice:'ГЦК',     a:5.463, c:null,  z:4,  density:3.180, note:'Ca²⁺ у ГЦК, F⁻ заповнюють всі тетраедри'},
    {name:'TiO₂',  struct:'Рутил (тетраг.)',    lattice:'P4₂/mnm', a:4.594, c:2.959, z:2,  density:4.245, note:'Ti⁴⁺ в октаедрах; форма рутилу'},
    {name:'Al₂O₃', struct:'Корунд (тригон.)',   lattice:'R3̄c',     a:4.758, c:12.99, z:6,  density:3.987, note:'Корунд; гексагональна щільна упаковка O²⁻'},
    {name:'SiO₂',  struct:'Кварц (тригон.)',    lattice:'P3₁21',   a:4.913, c:5.405, z:3,  density:2.648, note:'α-кварц; тетраедри SiO₄, зв\'язані вершинами'},
    {name:'Fe',     struct:'ОЦК (α-залізо)',     lattice:'ОЦК',     a:2.866, c:null,  z:2,  density:7.874, note:'α-Fe при н.у.; γ-Fe (ГЦК) при 912–1394°C'},
    {name:'Cu',     struct:'ГЦК',               lattice:'ГЦК',     a:3.615, c:null,  z:4,  density:8.960, note:'Еталон ГЦК-металу; висока тягучість'},
    {name:'NaI',    struct:'Типу NaCl (ГЦК)',    lattice:'ГЦК',     a:6.473, c:null,  z:4,  density:3.667, note:'Більший параметр через великий I⁻'},
    {name:'MgO',    struct:'Типу NaCl (ГЦК)',    lattice:'ГЦК',     a:4.211, c:null,  z:4,  density:3.580, note:'Периклаз; Tпл=2852°C — вогнетривкий'},
    {name:'BaTiO₃', struct:'Перовскіт (тетраг.)',lattice:'P4mm',    a:3.994, c:4.038, z:1,  density:5.900, note:'Сегнетоелектрик; Ba у вершинах куба'},
    {name:'NaOH',   struct:'Моноклінна',         lattice:'моноклін',a:3.401, c:null,  z:4,  density:2.130, note:'Луг; шарувата структура'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">💎 Кристалохімія — параметри ґраток</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:10px">Джерело: Wells «Structural Inorganic Chemistry» 5th ed. · CRC Handbook 104th ed. · International Tables for Crystallography Vol. A</div>
      <div style="background:#0a1020;border:0.5px solid #1e3060;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#b0c0e0;line-height:1.7">
        <b style="color:#4FC3F7">Позначення:</b> a, c — параметри елементарної комірки (Å); Z — кількість формульних одиниць в комірці; ρ — рентгенівська густина (г/см³). ГЦК — гранецентрована кубічна, ОЦК — об'ємоцентрована кубічна, ПК — проста кубічна.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
            <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Речовина</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Структура</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">a (Å)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">c (Å)</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">Z</th>
            <th style="text-align:center;padding:9px 10px;color:#4FC3F7">ρ (г/см³)</th>
            <th style="text-align:left;padding:9px 10px;color:#4FC3F7">Примітка</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map((r,i)=>`
          <tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
            <td style="padding:8px 12px;color:#FFB300;font-family:'Oxanium',monospace;font-weight:700">${r.name}</td>
            <td style="padding:8px 10px;color:#ffffff;font-size:11px">${r.struct}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#4FC3F7">${r.a.toFixed(3)}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#80CBC4">${r.c!==null?r.c.toFixed(3):'—'}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#CE93D8">${r.z}</td>
            <td style="padding:8px 10px;text-align:center;font-family:'Oxanium',monospace;color:#69F0AE">${r.density.toFixed(3)}</td>
            <td style="padding:8px 10px;color:#7080b8;font-size:11px">${r.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>`;
  }
};
