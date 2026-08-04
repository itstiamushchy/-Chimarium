// ============ Т-12: РАДІУСИ АТОМІВ ТА ІОНІВ ============
// Джерела: Slater (1964), Cordero et al. (2008) — ковалентні;
// Shannon (1976) Acta Cryst. A32 — іонні; CRC Handbook 97th ed.
// rат = атомний (пм), rков = ковалентний (пм), rіон = іонний (пм)

const TABLE_RADII = {
  id: 'radii',
  title: 'Радіуси атомів та іонів',
  topic: '1-1-atom',
  data: [
    {element:'H',  z:1,  atomic:53,  covalent:31,  ionic:208, ionCharge:'-1'},
    {element:'He', z:2,  atomic:31,  covalent:28,  ionic:null,ionCharge:null},
    {element:'Li', z:3,  atomic:167, covalent:128, ionic:76,  ionCharge:'+1'},
    {element:'Be', z:4,  atomic:112, covalent:96,  ionic:45,  ionCharge:'+2'},
    {element:'B',  z:5,  atomic:87,  covalent:84,  ionic:27,  ionCharge:'+3'},
    {element:'C',  z:6,  atomic:67,  covalent:77,  ionic:16,  ionCharge:'+4'},
    {element:'N',  z:7,  atomic:56,  covalent:71,  ionic:146, ionCharge:'-3'},
    {element:'O',  z:8,  atomic:48,  covalent:66,  ionic:140, ionCharge:'-2'},
    {element:'F',  z:9,  atomic:42,  covalent:64,  ionic:133, ionCharge:'-1'},
    {element:'Ne', z:10, atomic:38,  covalent:58,  ionic:null,ionCharge:null},
    {element:'Na', z:11, atomic:190, covalent:166, ionic:102, ionCharge:'+1'},
    {element:'Mg', z:12, atomic:145, covalent:141, ionic:72,  ionCharge:'+2'},
    {element:'Al', z:13, atomic:118, covalent:121, ionic:53,  ionCharge:'+3'},
    {element:'Si', z:14, atomic:111, covalent:111, ionic:40,  ionCharge:'+4'},
    {element:'P',  z:15, atomic:98,  covalent:107, ionic:212, ionCharge:'-3'},
    {element:'S',  z:16, atomic:88,  covalent:105, ionic:184, ionCharge:'-2'},
    {element:'Cl', z:17, atomic:79,  covalent:102, ionic:181, ionCharge:'-1'},
    {element:'K',  z:19, atomic:243, covalent:203, ionic:138, ionCharge:'+1'},
    {element:'Ca', z:20, atomic:194, covalent:176, ionic:100, ionCharge:'+2'},
    {element:'Cr', z:24, atomic:166, covalent:139, ionic:62,  ionCharge:'+3'},
    {element:'Mn', z:25, atomic:161, covalent:139, ionic:67,  ionCharge:'+2'},
    {element:'Fe', z:26, atomic:156, covalent:132, ionic:64,  ionCharge:'+3'},
    {element:'Co', z:27, atomic:152, covalent:126, ionic:65,  ionCharge:'+2'},
    {element:'Ni', z:28, atomic:149, covalent:124, ionic:69,  ionCharge:'+2'},
    {element:'Cu', z:29, atomic:145, covalent:132, ionic:73,  ionCharge:'+2'},
    {element:'Zn', z:30, atomic:142, covalent:122, ionic:74,  ionCharge:'+2'},
    {element:'Br', z:35, atomic:114, covalent:120, ionic:196, ionCharge:'-1'},
    {element:'Rb', z:37, atomic:265, covalent:220, ionic:152, ionCharge:'+1'},
    {element:'Sr', z:38, atomic:219, covalent:195, ionic:118, ionCharge:'+2'},
    {element:'Ag', z:47, atomic:165, covalent:145, ionic:115, ionCharge:'+1'},
    {element:'Sn', z:50, atomic:162, covalent:139, ionic:69,  ionCharge:'+4'},
    {element:'I',  z:53, atomic:140, covalent:139, ionic:220, ionCharge:'-1'},
    {element:'Cs', z:55, atomic:298, covalent:244, ionic:167, ionCharge:'+1'},
    {element:'Ba', z:56, atomic:253, covalent:215, ionic:135, ionCharge:'+2'},
    {element:'Pb', z:82, atomic:202, covalent:146, ionic:119, ionCharge:'+2'},
    {element:'Au', z:79, atomic:174, covalent:136, ionic:137, ionCharge:'+1'},
    {element:'Hg', z:80, atomic:171, covalent:132, ionic:119, ionCharge:'+2'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const sorted = [...this.data].sort((a,b)=>a.z-b.z);
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">⚛️ Радіуси атомів та іонів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        <b style="color:#4FC3F7">rат</b> — атомний радіус (Слейтер), 
        <b style="color:#00E5CC">rков</b> — ковалентний радіус (Кордеро, 2008), 
        <b style="color:#CE93D8">rіон</b> — іонний радіус (Шеннон, 1976). Всі значення у <b>пм</b>.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:1px solid #1e2240">
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Елемент</th>
            <th style="padding:8px 12px;text-align:center;color:#7080b8">Z</th>
            <th style="padding:8px 12px;text-align:right;color:#4FC3F7">rат (пм)</th>
            <th style="padding:8px 12px;text-align:right;color:#00E5CC">rков (пм)</th>
            <th style="padding:8px 12px;text-align:right;color:#CE93D8">rіон (пм)</th>
            <th style="padding:8px 12px;text-align:center;color:#7080b8">Заряд іона</th>
          </tr>
        </thead>
        <tbody>`;
    sorted.forEach(r => {
      const ionVal = r.ionic !== null ? r.ionic : '—';
      const ionQ = r.ionCharge !== null ? r.ionCharge : '—';
      const maxR = 298;
      const barA = Math.round((r.atomic / maxR) * 100);
      html += `<tr style="border-bottom:0.5px solid #1e2240">
        <td style="padding:7px 12px;font-family:'Oxanium',monospace;font-weight:700;color:#fff">${r.element}</td>
        <td style="padding:7px 12px;text-align:center;color:#7080b8;font-size:11px">${r.z}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#4FC3F7">${r.atomic}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#00E5CC">${r.covalent}</td>
        <td style="padding:7px 12px;text-align:right;font-family:'Oxanium',monospace;color:#CE93D8">${ionVal}</td>
        <td style="padding:7px 12px;text-align:center;font-family:'Oxanium',monospace;font-weight:700;color:${ionQ==='+1'||ionQ==='+2'||ionQ==='+3'||ionQ==='+4'?'#FF5252':ionQ==='—'?'#546E7A':'#4FC3F7'}">${ionQ}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:16px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">Закономірність:</b> у групі радіус збільшується з Z (більше електронних шарів).
        У періоді — зменшується (більший заряд ядра). Катіони <b style="color:#FF5252">менші</b> за нейтральний атом, аніони — <b style="color:#4FC3F7">більші</b>.
      </div>`;
    c.innerHTML = html;
  }
};
