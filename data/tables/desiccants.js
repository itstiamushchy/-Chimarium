// ============ Т-30: СУШИЛЬНІ АГЕНТИ ============
// Джерело: Perrin D.D., Armarego W.L.F. Purification of Laboratory Chemicals, 7th ed. (2012)
//          Furniss B.S. et al. Vogel's Practical Organic Chemistry, 5th ed. (1989)
//          Clayden J. et al. Organic Chemistry, 2nd ed. (2012)
// Ефективність: залишкова вологість після сушіння (мкг H₂O / л повітря або г/л)

const TABLE_DESICCANTS = {
  id: 'desiccants',
  title: 'Сушильні агенти',
  topic: '5-1-organic-basics',
  data: [
    {
      name:'CaCl₂ (безводний)',
      formula:'CaCl₂',
      efficiency:'добра',
      efficiencyLevel:2,
      residual:'1.5 мг/л',
      compatible:'вуглеводні, галогеналкани, алкени, ефіри (коротко)',
      incompatible:'спирти, аміни, аміди, кетони, деякі естери, NH₃',
      note:'Утворює аддукти CaCl₂·ROH та CaCl₂·RNH₂'
    },
    {
      name:'MgSO₄ (безводний)',
      formula:'MgSO₄',
      efficiency:'добра',
      efficiencyLevel:2,
      residual:'3 мг/л',
      compatible:'широкий спектр: кислоти, естери, спирти, кетони, альдегіди',
      incompatible:'сильні луги (розчиняється)',
      note:'Найуніверсальніший сушильний агент'
    },
    {
      name:'Na₂SO₄ (безводний)',
      formula:'Na₂SO₄',
      efficiency:'слабка',
      efficiencyLevel:1,
      residual:'25 мг/л',
      compatible:'будь-які органічні сполуки',
      incompatible:'—',
      note:'Повільний, для попереднього сушіння'
    },
    {
      name:'K₂CO₃ (безводний)',
      formula:'K₂CO₃',
      efficiency:'добра',
      efficiencyLevel:2,
      residual:'4 мг/л',
      compatible:'аміни, спирти, кетони, естери, нітрили',
      incompatible:'кислоти, феноли (реагує як основа)',
      note:'Лужний агент; для основних сполук'
    },
    {
      name:'P₂O₅ (фосфорний ангідрид)',
      formula:'P₂O₅',
      efficiency:'відмінна',
      efficiencyLevel:4,
      residual:'<0.001 мг/л',
      compatible:'вуглеводні, галогеналкани, нітрили (для газів)',
      incompatible:'спирти, аміни, кетони, ефіри (реагує), основні сполуки',
      note:'Найефективніший, але важкий у роботі'
    },
    {
      name:'CaH₂',
      formula:'CaH₂',
      efficiency:'відмінна',
      efficiencyLevel:4,
      residual:'<0.1 мг/л',
      compatible:'аміни, ефіри, вуглеводні, THF, DCM',
      incompatible:'спирти, кислоти, галогеналкани (реагує), вода (H₂↑)',
      note:'Найкращий для ефірів і THF; небезпечний з водою'
    },
    {
      name:'Молекулярні сита 4Å',
      formula:'Na₁₂[(AlO₂)₁₂(SiO₂)₁₂]',
      efficiency:'відмінна',
      efficiencyLevel:4,
      residual:'<0.1 мг/л',
      compatible:'більшість органічних розчинників, ДМФА, ДМА',
      incompatible:'дуже малі молекули (не адсорбуються)',
      note:'Регенерують нагріванням 300°C; ідеальні для ДМФА'
    },
    {
      name:'Na (металевий натрій)',
      formula:'Na',
      efficiency:'відмінна',
      efficiencyLevel:4,
      residual:'<0.1 мг/л',
      compatible:'ефіри (Et₂O), THF, вуглеводні з бензофеноном',
      incompatible:'спирти, кислоти, галогеновані розчинники, галогеналкани',
      note:'Тест: синій кольор кетил-радикалу з бензофеноном'
    },
    {
      name:'KOH / NaOH',
      formula:'KOH/NaOH',
      efficiency:'добра',
      efficiencyLevel:2,
      residual:'2 мг/л',
      compatible:'аміни (первинні, вторинні, третинні)',
      incompatible:'кислоти, феноли, естери, альдегіди (реагує)',
      note:'Специфічно для амінів; сильна основа'
    },
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const effColors = {1:'#7080b8', 2:'#FFB300', 3:'#FF7043', 4:'#00E5CC'};
    const effLabels = {1:'слабка', 2:'добра', 3:'висока', 4:'відмінна'};
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:4px">🧂 Сушильні агенти</div>
      <div style="font-size:11px;color:#7080b8;margin-bottom:14px">Джерело: Perrin & Armarego, Purification of Laboratory Chemicals 7th ed. (2012) · Vogel's Practical Organic Chemistry 5th ed.</div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="background:#0a0e1f;border-bottom:1px solid #1e2240">
          <th style="text-align:left;padding:9px 12px;color:#4FC3F7">Агент</th>
          <th style="text-align:center;padding:9px 10px;color:#FFB300">Ефективність</th>
          <th style="text-align:left;padding:9px 12px;color:#00E5CC">Сумісний з</th>
          <th style="text-align:left;padding:9px 12px;color:#FF5252">Несумісний з</th>
          <th style="text-align:left;padding:9px 12px;color:#7080b8">Примітка</th>
        </tr></thead><tbody>`;
    this.data.forEach((r, i) => {
      const col = effColors[r.efficiencyLevel] || '#7080b8';
      const stars = '★'.repeat(r.efficiencyLevel) + '☆'.repeat(4 - r.efficiencyLevel);
      html += `<tr style="border-bottom:0.5px solid #1e2240;background:${i%2===0?'#0f1632':'#0b1028'}">
        <td style="padding:8px 12px;color:#ffffff;font-weight:700">${r.name}<br><span style="font-family:'Oxanium',monospace;font-size:10px;color:#7080b8">${r.formula}</span></td>
        <td style="padding:8px 10px;text-align:center">
          <div style="color:${col};font-size:11px;font-weight:700">${r.efficiency}</div>
          <div style="color:${col};font-size:11px;letter-spacing:1px">${stars}</div>
          <div style="font-size:10px;color:#546E7A">${r.residual}</div>
        </td>
        <td style="padding:8px 12px;color:#00E5CC;font-size:11px">${r.compatible}</td>
        <td style="padding:8px 12px;color:#FF5252;font-size:11px">${r.incompatible}</td>
        <td style="padding:8px 12px;color:#7080b8;font-size:11px">${r.note}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:12px;font-size:11px;color:#7080b8;line-height:1.7">
        Вибір сушильного агента: спочатку перевірте <b style="color:#FF5252">несумісність</b>, потім <b style="color:#FFB300">ефективність</b>.
        MgSO₄ — найуніверсальніший вибір; P₂O₅ і молекулярні сита — для абсолютного сушіння.
      </div>`;
    c.innerHTML = html;
  }
};
