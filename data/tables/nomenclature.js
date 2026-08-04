// ============ Т-13: НОМЕНКЛАТУРА НЕОРГАНІЧНИХ РЕЧОВИН ============
// Джерела: IUPAC Nomenclature of Inorganic Chemistry (Red Book, 2005),
// українська хімічна номенклатура (ІЮПАК-адаптація), підручники загальної хімії.

const TABLE_NOMENCLATURE = {
  id: 'nomenclature',
  title: 'Номенклатура неорганічних речовин',
  topic: '2-1-inorganic-classes',
  data: [
    // Оксиди
    {formula:'H₂O',    systematic:'Дигідроген оксид',         trivial:'Вода',                  type:'оксид'},
    {formula:'CO₂',    systematic:'Карбон(IV) оксид',         trivial:'Вуглекислий газ',        type:'оксид'},
    {formula:'CO',     systematic:'Карбон(II) оксид',         trivial:'Чадний газ',             type:'оксид'},
    {formula:'SO₂',    systematic:'Сульфур(IV) оксид',        trivial:'Сірчистий газ',          type:'оксид'},
    {formula:'SO₃',    systematic:'Сульфур(VI) оксид',        trivial:'Сірчаний ангідрид',      type:'оксид'},
    {formula:'NO',     systematic:'Нітроген(II) оксид',       trivial:'Оксид азоту(II)',        type:'оксид'},
    {formula:'NO₂',    systematic:'Нітроген(IV) оксид',       trivial:'Бурий газ',              type:'оксид'},
    {formula:'N₂O',    systematic:'Динітроген оксид',         trivial:'Звеселяючий газ',        type:'оксид'},
    {formula:'P₂O₅',   systematic:'Дифосфор пентаоксид',      trivial:'Фосфорний ангідрид',     type:'оксид'},
    {formula:'CaO',    systematic:'Кальцій оксид',            trivial:'Негашене вапно',         type:'оксид'},
    {formula:'Fe₂O₃',  systematic:'Ферум(III) оксид',         trivial:'Залізна іржа (оксид)',   type:'оксид'},
    {formula:'Fe₃O₄',  systematic:'Ферум(II,III) оксид',      trivial:'Магнетит',               type:'оксид'},
    {formula:'MnO₂',   systematic:'Манган(IV) оксид',         trivial:'Піролюзит',              type:'оксид'},
    {formula:'SiO₂',   systematic:'Силіцій(IV) оксид',        trivial:'Кварц / Кремнезем',      type:'оксид'},
    {formula:'Al₂O₃',  systematic:'Алюміній оксид',           trivial:'Корунд / Глинозем',      type:'оксид'},
    {formula:'Cu₂O',   systematic:'Купрум(I) оксид',          trivial:'Куприт',                 type:'оксид'},
    {formula:'CuO',    systematic:'Купрум(II) оксид',         trivial:'Тенорит',                type:'оксид'},
    // Кислоти
    {formula:'HCl',    systematic:'Хлоридна кислота',         trivial:'Соляна кислота',         type:'кислота'},
    {formula:'H₂SO₄',  systematic:'Сульфатна кислота',        trivial:'Сірчана кислота',        type:'кислота'},
    {formula:'H₂SO₃',  systematic:'Сульфітна кислота',        trivial:'Сірчиста кислота',       type:'кислота'},
    {formula:'HNO₃',   systematic:'Нітратна кислота',         trivial:'Азотна кислота',         type:'кислота'},
    {formula:'HNO₂',   systematic:'Нітритна кислота',         trivial:'Азотиста кислота',       type:'кислота'},
    {formula:'H₃PO₄',  systematic:'Ортофосфатна кислота',     trivial:'Фосфорна кислота',       type:'кислота'},
    {formula:'H₂CO₃',  systematic:'Карбонатна кислота',       trivial:'Вугільна кислота',       type:'кислота'},
    {formula:'HF',     systematic:'Флуоридна кислота',        trivial:'Плавикова кислота',      type:'кислота'},
    {formula:'HBr',    systematic:'Бромідна кислота',         trivial:'Бромоводнева кислота',   type:'кислота'},
    {formula:'HI',     systematic:'Йодидна кислота',          trivial:'Йодоводнева кислота',    type:'кислота'},
    {formula:'H₂S',    systematic:'Сульфідна кислота',        trivial:'Сірководень',            type:'кислота'},
    {formula:'HCN',    systematic:'Ціанідна кислота',         trivial:'Синильна кислота',       type:'кислота'},
    {formula:'CH₃COOH',systematic:'Етанова кислота',          trivial:'Оцтова кислота',         type:'кислота'},
    {formula:'H₂SiO₃', systematic:'Силікатна кислота',        trivial:'Кремнієва кислота',      type:'кислота'},
    {formula:'HMnO₄',  systematic:'Манганатна(VII) кислота',  trivial:'Марганцева кислота',     type:'кислота'},
    {formula:'HClO₄',  systematic:'Перхлоратна кислота',      trivial:'Хлорна кислота',         type:'кислота'},
    // Основи
    {formula:'NaOH',   systematic:'Натрій гідроксид',         trivial:'Їдкий натр / Каустик',   type:'основа'},
    {formula:'KOH',    systematic:'Калій гідроксид',          trivial:'Їдке калі',              type:'основа'},
    {formula:'Ca(OH)₂',systematic:'Кальцій гідроксид',        trivial:'Гашене вапно',           type:'основа'},
    {formula:'Ba(OH)₂',systematic:'Барій гідроксид',          trivial:'Барієва вода',           type:'основа'},
    {formula:'NH₃·H₂O',systematic:'Амоній гідроксид',         trivial:'Аміачна вода',           type:'основа'},
    {formula:'Al(OH)₃',systematic:'Алюміній гідроксид',       trivial:'Гідроксид алюмінію',     type:'основа'},
    {formula:'Fe(OH)₃',systematic:'Ферум(III) гідроксид',     trivial:'Залізо(III) гідроксид',  type:'основа'},
    // Солі
    {formula:'NaCl',   systematic:'Натрій хлорид',            trivial:'Кухонна сіль',           type:'сіль'},
    {formula:'Na₂CO₃', systematic:'Натрій карбонат',          trivial:'Кальцинована сода',      type:'сіль'},
    {formula:'NaHCO₃', systematic:'Натрій гідрогенкарбонат',  trivial:'Питна сода',             type:'сіль'},
    {formula:'CaCO₃',  systematic:'Кальцій карбонат',         trivial:'Вапняк / Крейда / Мармур',type:'сіль'},
    {formula:'CaSO₄',  systematic:'Кальцій сульфат',          trivial:'Гіпс (при 2H₂O)',        type:'сіль'},
    {formula:'CaSO₄·2H₂O',systematic:'Кальцій сульфат дигідрат',trivial:'Гіпс (дигідрат)',     type:'сіль'},
    {formula:'BaSO₄',  systematic:'Барій сульфат',            trivial:'Барит',                  type:'сіль'},
    {formula:'Na₂SO₄·10H₂O',systematic:'Натрій сульфат декагідрат',trivial:'Глауберова сіль',  type:'сіль'},
    {formula:'CuSO₄·5H₂O',systematic:'Купрум(II) сульфат пентагідрат',trivial:'Мідний купорос', type:'сіль'},
    {formula:'FeSO₄·7H₂O',systematic:'Ферум(II) сульфат гептагідрат',trivial:'Залізний купорос',type:'сіль'},
    {formula:'KMnO₄',  systematic:'Калій перманганат',        trivial:'Марганцівка',            type:'сіль'},
    {formula:'K₂Cr₂O₇',systematic:'Калій дихромат',           trivial:'Двохромокисле калі',     type:'сіль'},
    {formula:'AgNO₃',  systematic:'Аргентум нітрат',          trivial:'Ляпіс',                  type:'сіль'},
    {formula:'KNO₃',   systematic:'Калій нітрат',             trivial:'Калійна селітра',        type:'сіль'},
    {formula:'NH₄NO₃', systematic:'Амоній нітрат',            trivial:'Аміачна селітра',        type:'сіль'},
    {formula:'NaNO₃',  systematic:'Натрій нітрат',            trivial:'Натрієва (чилійська) селітра',type:'сіль'},
    {formula:'Ca₃(PO₄)₂',systematic:'Кальцій ортофосфат',     trivial:'Трикальційфосфат / Фосфорит',type:'сіль'},
    {formula:'Ca(H₂PO₄)₂',systematic:'Кальцій дигідрогенфосфат',trivial:'Суперфосфат',         type:'сіль'},
    {formula:'Na₂SiO₃',systematic:'Натрій силікат',           trivial:'Рідке скло',             type:'сіль'},
    {formula:'NaClO',  systematic:'Натрій гіпохлорит',        trivial:'Відбілювач (активна речовина)',type:'сіль'},
    {formula:'AlCl₃',  systematic:'Алюміній хлорид',          trivial:'Хлорид алюмінію',        type:'сіль'},
    {formula:'FeCl₃',  systematic:'Ферум(III) хлорид',        trivial:'Хлорне залізо',          type:'сіль'},
    {formula:'K₂SO₄',  systematic:'Калій сульфат',            trivial:'Калій сернокислий',      type:'сіль'},
    // Амфотерні та інші
    {formula:'ZnO',    systematic:'Цинк оксид',               trivial:'Цинкові білила',         type:'амфотерний оксид'},
    {formula:'Zn(OH)₂',systematic:'Цинк гідроксид',           trivial:'Гідроксид цинку',        type:'амфотерна основа'},
  ],
  render: function(containerId) {
    const c = document.getElementById(containerId);
    if (!c) return;
    const types = ['оксид','кислота','основа','сіль','амфотерний оксид','амфотерна основа'];
    const typeColors = {
      'оксид':'#FFB300','кислота':'#FF5252','основа':'#4FC3F7',
      'сіль':'#00E5CC','амфотерний оксид':'#CE93D8','амфотерна основа':'#81C784'
    };
    let filterState = 'all';
    const filterId = 'nom-filter-' + Date.now();
    const tableId = 'nom-table-' + Date.now();

    const renderRows = (filter) => {
      const rows = filter === 'all' ? this.data : this.data.filter(r=>r.type===filter);
      let tbody = '';
      rows.forEach(r => {
        const col = typeColors[r.type] || '#7080b8';
        tbody += `<tr style="border-bottom:0.5px solid #1e2240">
          <td style="padding:7px 12px;font-family:'Oxanium',monospace;font-weight:700;color:#fff">${r.formula}</td>
          <td style="padding:7px 12px;color:#e0e8ff">${r.systematic}</td>
          <td style="padding:7px 12px;color:#7080b8;font-style:italic">${r.trivial || '—'}</td>
          <td style="padding:7px 12px"><span style="background:rgba(0,0,0,0.3);border:0.5px solid ${col};color:${col};font-size:11px;padding:2px 8px;border-radius:4px">${r.type}</span></td>
        </tr>`;
      });
      return tbody;
    };

    let filterBtns = `<span style="font-size:12px;color:#7080b8;margin-right:8px">Фільтр:</span>
      <button onclick="document.getElementById('${tableId}').querySelector('tbody').innerHTML=window._nomRenderAll('all');this.closest('.nom-filters').querySelectorAll('button').forEach(b=>b.style.borderColor='#1e2240');this.style.borderColor='#4FC3F7'" style="background:#0f1632;border:0.5px solid #4FC3F7;color:#4FC3F7;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;margin-right:4px">Всі</button>`;
    types.forEach(t => {
      const col = typeColors[t]||'#7080b8';
      filterBtns += `<button onclick="document.getElementById('${tableId}').querySelector('tbody').innerHTML=window._nomRenderAll('${t}');this.closest('.nom-filters').querySelectorAll('button').forEach(b=>b.style.borderColor='#1e2240');this.style.borderColor='${col}'" style="background:#0f1632;border:0.5px solid #1e2240;color:${col};border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;margin-right:4px;margin-bottom:4px">${t}</button>`;
    });

    window._nomRenderAll = (filter) => renderRows(filter);

    let html = `
      <button class="sol-mode-btn" style="margin-bottom:14px" onclick="initTablesPanel()">← Назад до таблиць</button>
      <div class="sec-title" style="font-size:16px;margin-bottom:10px">🧪 Номенклатура неорганічних речовин</div>
      <div style="font-size:12px;color:#7080b8;margin-bottom:12px;line-height:1.6">
        Систематичні (ІЮПАК) та тривіальні назви для ${this.data.length} неорганічних речовин.
      </div>
      <div class="nom-filters" style="margin-bottom:14px;display:flex;flex-wrap:wrap;align-items:center">
        ${filterBtns}
      </div>
      <div style="overflow-x:auto">
      <table id="${tableId}" style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:1px solid #1e2240">
            <th style="padding:8px 12px;text-align:left;color:#7080b8;white-space:nowrap">Формула</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Систематична назва</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Тривіальна назва</th>
            <th style="padding:8px 12px;text-align:left;color:#7080b8">Клас</th>
          </tr>
        </thead>
        <tbody>${renderRows('all')}</tbody>
      </table></div>
      <div style="margin-top:16px;padding:12px 16px;background:#0f1632;border:0.5px solid #1e2240;border-radius:8px;font-size:12px;color:#7080b8;line-height:1.7">
        💡 <b style="color:#4FC3F7">ІЮПАК:</b> назва складається з назви аніона (закінчення <i>-ид, -ат, -іт</i>) та катіона. 
        Ступінь окиснення металу вказується римськими цифрами в дужках, якщо він змінний.
      </div>`;
    c.innerHTML = html;
  }
};
