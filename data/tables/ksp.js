// ============ Т-03: ДОБУТКИ РОЗЧИННОСТІ (Ksp) ============
// Добутки розчинності при 25°C у воді
// Джерела: NIST Chemistry WebBook, CRC Handbook 97th ed.,
//          Lange's Handbook of Chemistry 17th ed.

const TABLE_KSP = {
  id: 'ksp',
  title: 'Добутки розчинності (Ksp)',
  topic: '4-3-electrolytes',
  data: [
    // Хлориди
    {name:'Аргентум хлорид',    formula:'AgCl',       ksp:1.77e-10, type:'chloride'},
    {name:'Плюмбум(II) хлорид', formula:'PbCl₂',      ksp:1.70e-5,  type:'chloride'},
    {name:'Меркурій(I) хлорид', formula:'Hg₂Cl₂',     ksp:1.43e-18, type:'chloride'},
    {name:'Купрум(I) хлорид',   formula:'CuCl',        ksp:1.72e-7,  type:'chloride'},
    {name:'Талій(I) хлорид',    formula:'TlCl',        ksp:1.86e-4,  type:'chloride'},
    // Сульфати
    {name:'Барій сульфат',      formula:'BaSO₄',       ksp:1.08e-10, type:'sulfate'},
    {name:'Кальцій сульфат',    formula:'CaSO₄',       ksp:4.93e-5,  type:'sulfate'},
    {name:'Плюмбум(II) сульфат',formula:'PbSO₄',       ksp:2.53e-8,  type:'sulfate'},
    {name:'Аргентум сульфат',   formula:'Ag₂SO₄',      ksp:1.20e-5,  type:'sulfate'},
    {name:'Меркурій(I) сульфат',formula:'Hg₂SO₄',      ksp:6.50e-7,  type:'sulfate'},
    {name:'Стронцій сульфат',   formula:'SrSO₄',       ksp:3.44e-7,  type:'sulfate'},
    // Карбонати
    {name:'Кальцій карбонат',   formula:'CaCO₃',       ksp:3.36e-9,  type:'carbonate'},
    {name:'Барій карбонат',     formula:'BaCO₃',       ksp:2.58e-9,  type:'carbonate'},
    {name:'Магній карбонат',    formula:'MgCO₃',       ksp:6.82e-6,  type:'carbonate'},
    {name:'Ферум(II) карбонат', formula:'FeCO₃',       ksp:3.13e-11, type:'carbonate'},
    {name:'Купрум(II) карбонат',formula:'CuCO₃',       ksp:1.40e-10, type:'carbonate'},
    {name:'Плюмбум(II) карбонат',formula:'PbCO₃',      ksp:7.40e-14, type:'carbonate'},
    {name:'Аргентум карбонат',  formula:'Ag₂CO₃',      ksp:8.46e-12, type:'carbonate'},
    {name:'Манган(II) карбонат',formula:'MnCO₃',       ksp:2.24e-11, type:'carbonate'},
    // Гідроксиди
    {name:'Алюміній гідроксид', formula:'Al(OH)₃',     ksp:1.30e-33, type:'hydroxide'},
    {name:'Ферум(II) гідроксид',formula:'Fe(OH)₂',     ksp:4.87e-17, type:'hydroxide'},
    {name:'Ферум(III) гідроксид',formula:'Fe(OH)₃',    ksp:2.79e-39, type:'hydroxide'},
    {name:'Купрум(II) гідроксид',formula:'Cu(OH)₂',    ksp:2.19e-19, type:'hydroxide'},
    {name:'Цинк гідроксид',     formula:'Zn(OH)₂',     ksp:3.00e-17, type:'hydroxide'},
    {name:'Магній гідроксид',   formula:'Mg(OH)₂',     ksp:5.61e-12, type:'hydroxide'},
    {name:'Кальцій гідроксид',  formula:'Ca(OH)₂',     ksp:4.68e-6,  type:'hydroxide'},
    {name:'Манган(II) гідроксид',formula:'Mn(OH)₂',    ksp:2.00e-13, type:'hydroxide'},
    {name:'Нікель(II) гідроксид',formula:'Ni(OH)₂',    ksp:5.48e-16, type:'hydroxide'},
    {name:'Кобальт(II) гідроксид',formula:'Co(OH)₂',   ksp:5.92e-15, type:'hydroxide'},
    // Сульфіди
    {name:'Купрум(II) сульфід', formula:'CuS',         ksp:6.30e-36, type:'sulfide'},
    {name:'Плюмбум(II) сульфід',formula:'PbS',         ksp:9.04e-29, type:'sulfide'},
    {name:'Кадмій сульфід',     formula:'CdS',         ksp:8.00e-27, type:'sulfide'},
    {name:'Аргентум сульфід',   formula:'Ag₂S',        ksp:6.69e-50, type:'sulfide'},
    {name:'Цинк сульфід',       formula:'ZnS',         ksp:2.93e-25, type:'sulfide'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const groups = {
      chloride:  {label:'Хлориди',   col:'#4FC3F7'},
      sulfate:   {label:'Сульфати',  col:'#FFB300'},
      carbonate: {label:'Карбонати', col:'#00E5CC'},
      hydroxide: {label:'Гідроксиди',col:'#CE93D8'},
      sulfide:   {label:'Сульфіди',  col:'#FF5252'},
    };
    const fmtKsp = v => {
      if (v === 0) return '0';
      const exp = Math.floor(Math.log10(v));
      const m = (v / Math.pow(10, exp)).toFixed(2);
      return `${m}×10<sup>${exp}</sup>`;
    };
    const kspColor = v => {
      const lv = Math.log10(v);
      if (lv > -5)  return '#FFB300';
      if (lv > -10) return '#4FC3F7';
      if (lv > -20) return '#CE93D8';
      return '#FF5252';
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🔬 Добутки розчинності (Ksp)</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Добутки розчинності при 25°C. Чим менше Ksp — тим менш розчинна сполука. Значення з бази NIST.
      </div>`;
    Object.entries(groups).forEach(([type, g]) => {
      const rows = this.data.filter(r=>r.type===type).sort((a,b)=>a.ksp-b.ksp);
      html += `<div style="font-family:'Oxanium',monospace;color:${g.col};font-size:13px;font-weight:700;margin:14px 0 6px">${g.label} (${rows.length})</div>
      <div style="overflow-x:auto;margin-bottom:8px">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:6px 10px;text-align:left;color:#7080b8">Назва</th>
          <th style="padding:6px 10px;text-align:left;color:#7080b8">Формула</th>
          <th style="padding:6px 10px;text-align:left;color:#7080b8">Ksp (25°C)</th>
          <th style="padding:6px 10px;text-align:right;color:#7080b8">lg(Ksp)</th>
        </tr></thead>
        <tbody>`;
      rows.forEach(r => {
        const lgK = Math.log10(r.ksp).toFixed(1);
        html += `<tr style="border-bottom:0.5px solid #1e2240">
          <td style="padding:6px 10px;color:#fff">${r.name}</td>
          <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#CE93D8">${r.formula}</td>
          <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:${kspColor(r.ksp)};font-size:11px">${fmtKsp(r.ksp)}</td>
          <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:${kspColor(r.ksp)};text-align:right;font-weight:700">${lgK}</td>
        </tr>`;
      });
      html += `</tbody></table></div>`;
    });
    html += `<div style="margin-top:14px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
      💡 Ksp = [A⁺]ᵐ[B⁻]ⁿ — добуток концентрацій іонів у насиченому розчині. Якщо IP > Ksp — утворюється осад.
    </div>`;
    c.innerHTML = html;
  }
};
