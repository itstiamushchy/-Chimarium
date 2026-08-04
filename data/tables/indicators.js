// ============ Т-05: КИСЛОТНО-ОСНОВНІ ІНДИКАТОРИ ============
// Перехідні інтервали pH та кольори кислотно-основних індикаторів
// Джерела: CRC Handbook of Chemistry and Physics 97th ed.,
//          Vogel's Textbook of Quantitative Chemical Analysis, 6th ed.

const TABLE_INDICATORS = {
  id: 'indicators',
  title: 'Кислотно-основні індикатори',
  topic: '4-3-electrolytes',
  data: [
    {name:'Метиловий фіолетовий', formula:'C₂₄H₂₈N₃Cl',  phFrom:0.0,  phTo:1.6,  colorAcid:'жовтий',      colorBase:'фіолетовий', note:'Інтенсивний фіолетовий барвник'},
    {name:'Малахітовий зелений',  formula:'C₂₃H₂₅ClN₂',  phFrom:0.2,  phTo:1.8,  colorAcid:'жовтий',      colorBase:'зелений',    note:'Трифенілметановий барвник'},
    {name:'Тімолблакитний (1)',   formula:'C₂₇H₂₈O₅S',   phFrom:1.2,  phTo:2.8,  colorAcid:'червоний',    colorBase:'жовтий',     note:'1-й перехід (кислий діапазон)'},
    {name:'Метиловий жовтогарячий',formula:'C₁₄H₁₄N₃NaO₃S',phFrom:3.1, phTo:4.4, colorAcid:'червоний',  colorBase:'жовтий',     note:'Диметиламіноазобензолсульфонат Na'},
    {name:'Бромфеноловий синій',  formula:'C₁₉H₁₀Br₄O₅S', phFrom:3.0,  phTo:4.6,  colorAcid:'жовтий',    colorBase:'синій',      note:'Бромзаміщений феноловий синій'},
    {name:'Конго червоний',       formula:'C₃₂H₂₂N₆Na₂O₆S₂',phFrom:3.0,phTo:5.0, colorAcid:'синій',     colorBase:'червоний',   note:'Азобарвник, класичний індикатор'},
    {name:'Метиловий червоний',   formula:'C₁₅H₁₅N₃O₂',   phFrom:4.2,  phTo:6.3,  colorAcid:'червоний',  colorBase:'жовтий',     note:'Широко використовується в аналізі'},
    {name:'Лакмус',               formula:'C₁₂H₁₂O₄',      phFrom:5.0,  phTo:8.0,  colorAcid:'червоний',  colorBase:'синій',      note:'Природний барвник із лишайників'},
    {name:'Бромтімоловий синій',  formula:'C₂₇H₂₈Br₂O₅S',  phFrom:6.0,  phTo:7.6,  colorAcid:'жовтий',   colorBase:'синій',      note:'Зручний для нейтральної зони'},
    {name:'Нейтральний червоний', formula:'C₁₅H₁₇ClN₄',    phFrom:6.8,  phTo:8.0,  colorAcid:'червоний',  colorBase:'жовтий',     note:'Використ. у біологічних дослідженнях'},
    {name:'Феноловий червоний',   formula:'C₁₉H₁₄O₅S',     phFrom:6.8,  phTo:8.4,  colorAcid:'жовтий',    colorBase:'червоний',   note:'Часто використ. у мікробіології'},
    {name:'Крезоловий червоний',  formula:'C₂₁H₁₈O₅S',     phFrom:7.2,  phTo:8.8,  colorAcid:'жовтий',    colorBase:'пурпурний',  note:'Подібний до фенолового червоного'},
    {name:'Тімолблакитний (2)',   formula:'C₂₇H₂₈O₅S',     phFrom:8.0,  phTo:9.6,  colorAcid:'жовтий',    colorBase:'синій',      note:'2-й перехід (лужний діапазон)'},
    {name:'Фенолфталеїн',         formula:'C₂₀H₁₄O₄',      phFrom:8.2,  phTo:10.0, colorAcid:'безбарвний',colorBase:'малиновий',  note:'Найпоширеніший лужний індикатор'},
    {name:'Тімолфталеїн',         formula:'C₂₈H₃₀O₄',      phFrom:9.3,  phTo:10.5, colorAcid:'безбарвний',colorBase:'синій',      note:'Використ. при pH > 9'},
    {name:'Алізарин жовтий',      formula:'C₁₃H₉N₂NaO₄',   phFrom:10.1, phTo:12.0, colorAcid:'блідо-жовтий',colorBase:'жовто-бурий',note:'Для сильнолужного середовища'},
    {name:'Індигокармін',         formula:'C₁₆H₈N₂Na₂O₈S₂', phFrom:11.6, phTo:14.0, colorAcid:'синій',    colorBase:'жовтий',     note:'Лужний індикатор'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const sorted = [...this.data].sort((a,b)=>a.phFrom-b.phFrom);
    const colorBox = (name) => {
      const map = {
        'жовтий':'#FFD600','червоний':'#F44336','синій':'#2196F3','фіолетовий':'#9C27B0',
        'зелений':'#4CAF50','малиновий':'#E91E63','пурпурний':'#9C27B0','безбарвний':'transparent',
        'блідо-жовтий':'#FFF9C4','жовто-бурий':'#A1887F','помаранчевий':'#FF9800'
      };
      const bg = map[name] || '#7080b8';
      const border = name === 'безбарвний' ? 'border:1px solid #1e2240;' : '';
      return `<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${bg};${border}margin-right:5px;vertical-align:middle"></span>${name}`;
    };
    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🎨 Кислотно-основні індикатори</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:14px;line-height:1.6">
        Перехідні інтервали pH та кольори при кімнатній температурі. Джерело: CRC Handbook.
      </div>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="border-bottom:1px solid #1e2240">
          <th style="padding:7px 10px;text-align:left;color:#7080b8">Назва</th>
          <th style="padding:7px 10px;text-align:left;color:#7080b8;white-space:nowrap">Інтервал pH</th>
          <th style="padding:7px 10px;text-align:left;color:#7080b8">Колір (кисле)</th>
          <th style="padding:7px 10px;text-align:left;color:#7080b8">Колір (лужне)</th>
        </tr></thead>
        <tbody>`;
    sorted.forEach(r => {
      const midPh = (r.phFrom + r.phTo) / 2;
      const barLeft = Math.round((r.phFrom / 14) * 100);
      const barWidth = Math.round(((r.phTo - r.phFrom) / 14) * 100);
      html += `<tr style="border-bottom:0.5px solid #1e2240" title="${r.name}: ${r.note}">
        <td style="padding:6px 10px">
          <div style="color:#fff;font-size:12px;margin-bottom:3px">${r.name}</div>
          <div style="background:#1e2240;border-radius:3px;height:5px;position:relative;width:120px">
            <div style="position:absolute;left:${barLeft}%;width:${barWidth}%;height:100%;background:linear-gradient(90deg,#FF5252,#4FC3F7);border-radius:3px"></div>
          </div>
        </td>
        <td style="padding:6px 10px;font-family:'Oxanium',monospace;color:#4FC3F7;font-weight:700;white-space:nowrap">${r.phFrom.toFixed(1)} – ${r.phTo.toFixed(1)}</td>
        <td style="padding:6px 10px;font-size:12px">${colorBox(r.colorAcid)}</td>
        <td style="padding:6px 10px;font-size:12px">${colorBox(r.colorBase)}</td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <div style="margin-top:14px;padding:10px 14px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:11px;color:#7080b8;line-height:1.6">
        💡 Індикатор — слабка органічна кислота HInd, де HInd і Ind⁻ мають різний колір. При pH < pKa переважає HInd (кисла форма), при pH > pKa — Ind⁻ (основна форма).
        <br>📍 Фенолфталеїн понад pH 10 знову стає безбарвним (третя форма).
      </div>`;
    c.innerHTML = html;
  }
};
