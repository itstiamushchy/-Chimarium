// ============ Т-41: СИСТЕМИ РОЗДІЛЕННЯ ІОНІВ (аналітична хімія) ============
// Джерела: Скуг Д., Вест Д., Хоулер Ф. — Основи аналітичної хімії, 2001.
// Харви Д. — Сучасна аналітична хімія, 2000.
// Аналітична хімія. Кислотно-основна класифікація катіонів (H₂S-система).

const TABLE_ION_SEPARATION = {
  id: 'ion_separation',
  title: 'Системи розділення іонів',
  topic: '6-1-qualitative',
  data: [
    {
      group: 'I',
      ions: ['Ag⁺', 'Pb²⁺', 'Hg₂²⁺'],
      reagent: 'HCl (розв.)',
      effect: 'Білі осади: AgCl, PbCl₂, Hg₂Cl₂',
      note: 'Осади нерозчинні у HNO₃; PbCl₂ розчиняється у гарячій воді'
    },
    {
      group: 'II',
      ions: ['Cu²⁺', 'Bi³⁺', 'Cd²⁺', 'As³⁺', 'As⁵⁺', 'Sb³⁺', 'Sn²⁺', 'Sn⁴⁺', 'Hg²⁺', 'Pb²⁺'],
      reagent: 'H₂S / HCl (0.3 М)',
      effect: 'Кольорові осади сульфідів у кислому середовищі',
      note: 'CuS (чорн.), Bi₂S₃ (кор.), CdS (жовт.); As₂S₃ (жовт.), HgS (чорн.)'
    },
    {
      group: 'III',
      ions: ['Fe²⁺', 'Fe³⁺', 'Al³⁺', 'Cr³⁺', 'Co²⁺', 'Ni²⁺', 'Mn²⁺', 'Zn²⁺'],
      reagent: 'NH₃ + NH₄Cl (буфер) + H₂S',
      effect: 'Гідроксиди (Fe, Al, Cr) або сульфіди (Co, Ni, Mn, Zn) у лужному середовищі',
      note: 'Al(OH)₃, Fe(OH)₃ — при pH 9; CoS, NiS, MnS, ZnS — з H₂S у буфері'
    },
    {
      group: 'IV',
      ions: ['Ca²⁺', 'Sr²⁺', 'Ba²⁺'],
      reagent: '(NH₄)₂CO₃ / NH₃',
      effect: 'Білі осади карбонатів CaCO₃, SrCO₃, BaCO₃',
      note: 'Розділення: BaSO₄ (H₂SO₄), SrSO₄ (спирт + H₂SO₄), Ca²⁺ залишається в р-ні'
    },
    {
      group: 'V',
      ions: ['Mg²⁺', 'Na⁺', 'K⁺', 'NH₄⁺'],
      reagent: 'Специфічні реагенти',
      effect: 'Іони не осаджуються попередніми реагентами — залишаються в фільтраті',
      note: 'Mg²⁺: Na₂HPO₄+NH₃ → MgNH₄PO₄↓; K⁺: Na₃[Co(NO₂)₆] → жовт. осад; NH₄⁺: NaOH+нагрів → NH₃↑'
    }
  ],

  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧫 Системи розділення іонів</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Кислотно-основна класифікація катіонів (H₂S-система). Аналітичні групи розділяються послідовним дією групових реагентів.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#0a0f2a;border-bottom:1px solid #1e2240">
            <th style="padding:10px 12px;text-align:center;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Група</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Іони</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace;white-space:nowrap">Груповий реагент</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Ефект</th>
            <th style="padding:10px 12px;text-align:left;color:#4FC3F7;font-family:'Oxanium',monospace">Примітка</th>
          </tr>
        </thead>
        <tbody>`;

    this.data.forEach((r, i) => {
      const bg = i % 2 === 0 ? '#0f1632' : '#0d1228';
      const groupColors = ['#FF8A80','#FFD180','#B9F6CA','#80D8FF','#EA80FC'];
      const gc = groupColors[i] || '#4FC3F7';
      html += `<tr style="background:${bg};border-bottom:0.5px solid #1e2240">
        <td style="padding:10px 12px;text-align:center;font-family:'Oxanium',monospace;font-weight:700;font-size:18px;color:${gc}">${r.group}</td>
        <td style="padding:10px 12px;color:#e0e8ff;font-family:'Oxanium',monospace;font-size:11px">${r.ions.join(', ')}</td>
        <td style="padding:10px 12px;color:#00E5CC;font-family:'Oxanium',monospace;white-space:nowrap">${r.reagent}</td>
        <td style="padding:10px 12px;color:#ffffff">${r.effect}</td>
        <td style="padding:10px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });

    html += `</tbody></table></div>
      <div style="margin-top:14px;background:#0a0f1a;border:0.5px solid #1e3060;border-radius:8px;padding:12px 16px;font-size:11px;color:#7080b8;line-height:1.7">
        <b style="color:#4FC3F7">Порядок аналізу:</b> Осадження іде послідовно: I → II → III → IV → V групи.
        Фільтрат від кожної групи надходить на наступну. Іони V групи визначають специфічними реакціями у фільтраті після осадження IV групи.
      </div>`;
    c.innerHTML = html;
  }
};
