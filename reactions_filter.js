// ============ REACTIONS FILTER ENGINE ============
// Вставити ПІСЛЯ завантаження reactions_tagged.json
// Замінити reactions.json → reactions_tagged.json у fetch-запиті

const RX_INDEX = { byElement:{}, byGroup:{}, byCompound:{}, byProcess:{}, bySection:{} };
let ALL_REACTIONS = []; // плаский масив всіх реакцій

function rxBuildIndex(data) {
  ALL_REACTIONS = [];
  data.forEach(section => {
    section.subsections?.forEach(sub => {
      sub.reactions?.forEach(r => {
        const i = ALL_REACTIONS.length;
        r._section = section.id;
        r._sectionLabel = section.label;
        ALL_REACTIONS.push(r);
        const t = r.tags || {};
        (t.elements  ||[]).forEach(x => (RX_INDEX.byElement[x]  ??= new Set()).add(i));
        (t.groups    ||[]).forEach(x => (RX_INDEX.byGroup[x]    ??= new Set()).add(i));
        (t.compounds ||[]).forEach(x => (RX_INDEX.byCompound[x] ??= new Set()).add(i));
        (t.processes ||[]).forEach(x => (RX_INDEX.byProcess[x]  ??= new Set()).add(i));
        (RX_INDEX.bySection[section.id] ??= new Set()).add(i);
      });
    });
  });
  console.log(`RX index built: ${ALL_REACTIONS.length} reactions`);
}

// Фільтр: AND між категоріями, OR всередині категорії
function rxFilter({ elements=[], groups=[], compounds=[], processes=[], sections=[] } = {}) {
  const pick = (index, keys) => {
    if (!keys.length) return null;
    const sets = keys.map(k => index[k]).filter(Boolean);
    if (!sets.length) return new Set();
    return sets.reduce((a,b) => new Set([...a].filter(x => b.has(x))));
  };

  const filters = [
    pick(RX_INDEX.byElement,  elements),
    pick(RX_INDEX.byGroup,    groups),
    pick(RX_INDEX.byCompound, compounds),
    pick(RX_INDEX.byProcess,  processes),
    pick(RX_INDEX.bySection,  sections),
  ].filter(s => s !== null);

  if (!filters.length) return ALL_REACTIONS;
  const result = filters.reduce((a,b) => new Set([...a].filter(x => b.has(x))));
  return [...result].map(i => ALL_REACTIONS[i]);
}

// ============ UI ============
// Вставити у HTML там де зараз є список реакцій

const FILTER_UI_HTML = `
<div id="rx-filter-panel" style="margin-bottom:14px">

  <div style="margin-bottom:8px">
    <div style="font-size:10px;color:#7080b8;margin-bottom:5px;font-family:'Oxanium',monospace;letter-spacing:1px">⚗️ ЕЛЕМЕНТИ</div>
    <div id="rx-el-btns" style="display:flex;flex-wrap:wrap;gap:4px"></div>
  </div>

  <div style="margin-bottom:8px">
    <div style="font-size:10px;color:#7080b8;margin-bottom:5px;font-family:'Oxanium',monospace;letter-spacing:1px">🧱 КЛАС СПОЛУК</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
      ${[
        ['oxide','Оксид'],['acid','Кислота'],['base','Основа'],
        ['salt','Сіль'],['water','Вода'],['elem_gas','Ел. газ']
      ].map(([v,l]) => `<button class="rx-fbtn" data-axis="compounds" data-val="${v}">${l}</button>`).join('')}
    </div>
  </div>

  <div style="margin-bottom:8px">
    <div style="font-size:10px;color:#7080b8;margin-bottom:5px;font-family:'Oxanium',monospace;letter-spacing:1px">⚡ ПРОЦЕС</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
      ${[
        ['combustion','🔥 Горіння'],['exothermic','♨️ Екзо'],['endothermic','❄️ Ендо'],
        ['reversible','⇌ Зворотна'],['dangerous','⚠️ Небезпечна'],['hydrolysis','💧 Гідроліз'],
        ['neutralization','🧪 Нейтраліз.'],['precipitation','⬇️ Осад'],['photochemical','☀️ Фото'],
        ['catalytic','⚙️ Каталіз'],['high_temp','🌡️ t°'],['complex_formation','🔗 Комплекс'],
        ['polymerization','🔄 Полімер'],['gas_release','💨 Газ↑'],
      ].map(([v,l]) => `<button class="rx-fbtn" data-axis="processes" data-val="${v}">${l}</button>`).join('')}
    </div>
  </div>

  <div style="margin-bottom:8px">
    <div style="font-size:10px;color:#7080b8;margin-bottom:5px;font-family:'Oxanium',monospace;letter-spacing:1px">🔬 ГРУПА ПС</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
      ${[
        ['alkali','Лужні'],['alkaline_earth','Лужноземельні'],['transition_fe','Fe/Co/Ni'],
        ['transition_cu','Cu/Ag/Au'],['transition_cr','Cr/Mo/W'],['transition_mn','Mn'],
        ['transition_zn','Zn/Cd/Hg'],['boron_group','B/Al'],['carbon_group','C/Si/Pb'],
        ['nitrogen_group','N/P/As'],['chalcogen','S/Se/Te'],['halogen','Галогени'],
      ].map(([v,l]) => `<button class="rx-fbtn" data-axis="groups" data-val="${v}">${l}</button>`).join('')}
    </div>
  </div>

  <div style="display:flex;align-items:center;gap:10px;margin-top:6px">
    <span id="rx-count" style="font-size:11px;color:#4FC3F7;font-family:'Oxanium',monospace"></span>
    <button id="rx-filter-clear" style="font-size:10px;padding:3px 10px;background:#1e2240;border:0.5px solid #4FC3F7;border-radius:4px;color:#4FC3F7;cursor:pointer;display:none">✕ Скинути</button>
  </div>
</div>`;

// Стилі для кнопок — вставити у <style>
const FILTER_CSS = `
.rx-fbtn {
  background: #141528;
  border: 0.5px solid #1e2240;
  border-radius: 4px;
  padding: 3px 9px;
  font-size: 11px;
  color: #c0d0f0;
  cursor: pointer;
  transition: all .15s;
  white-space: nowrap;
}
.rx-fbtn:hover { border-color: #4FC3F7; color: #fff; }
.rx-fbtn.active { background: #1a2a50; border-color: #4FC3F7; color: #4FC3F7; }
`;

// Ініціалізація фільтра (викликати після rxBuildIndex)
function rxInitFilter(renderFn) {
  // Кнопки елементів — топ-20 за частотою
  const elFreq = {};
  ALL_REACTIONS.forEach(r => (r.tags?.elements||[]).forEach(el => elFreq[el] = (elFreq[el]||0)+1));
  const topEls = Object.entries(elFreq).sort((a,b)=>b[1]-a[1]).slice(0,20).map(x=>x[0]);
  document.getElementById('rx-el-btns').innerHTML = topEls
    .map(el => `<button class="rx-fbtn" data-axis="elements" data-val="${el}">${el}</button>`)
    .join('');

  const state = { elements:[], groups:[], compounds:[], processes:[] };

  document.getElementById('rx-filter-panel').addEventListener('click', e => {
    const btn = e.target.closest('.rx-fbtn');
    if (btn) {
      const axis = btn.dataset.axis, val = btn.dataset.val;
      const arr = state[axis];
      const idx = arr.indexOf(val);
      if (idx >= 0) { arr.splice(idx,1); btn.classList.remove('active'); }
      else          { arr.push(val);     btn.classList.add('active'); }
    }
    if (e.target.id === 'rx-filter-clear') {
      Object.keys(state).forEach(k => state[k] = []);
      document.querySelectorAll('.rx-fbtn.active').forEach(b => b.classList.remove('active'));
    }
    const results = rxFilter(state);
    const hasFilter = Object.values(state).some(a => a.length);
    document.getElementById('rx-filter-count').textContent = hasFilter ? `${results.length} реакцій` : '';
    document.getElementById('rx-filter-clear').style.display = hasFilter ? '' : 'none';
    renderFn(results);
  });
}

// ============ ВИКОРИСТАННЯ ============
// fetch('reactions_tagged.json')
//   .then(r => r.json())
//   .then(data => {
//     rxBuildIndex(data);
//
//     // Вставити UI перед списком реакцій
//     document.getElementById('reactions-container').insertAdjacentHTML('beforebegin', FILTER_UI_HTML);
//
//     // Додати стилі
//     document.head.insertAdjacentHTML('beforeend', `<style>${FILTER_CSS}</style>`);
//
//     // Підключити до існуючої функції рендеру реакцій
//     rxInitFilter(renderReactionsList); // renderReactionsList — існуюча функція
//   });
