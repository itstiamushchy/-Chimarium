window._CALC_ENGINES = window._CALC_ENGINES || {};
Object.assign(window._CALC_ENGINES, {
  '1-1-atom_V':({Z})=>{Z=Math.round(Z);if(Z<1||Z>118)throw new Error('Z 1-118');const c=_buildConfig(Z);return{result:c,label:'Електронна конфігурація',steps:[`Z=${Z}`,`Порядок (Aufbau): 1s→2s→2p→3s→...`,`Конфігурація: ${c}`]};},
  '1-1-atom_P':({Z})=>{Z=Math.round(Z);if(Z<1||Z>118)throw new Error('Z 1-118');const{n,l,ml,ms}=_lastElectron(Z);const lN=['s','p','d','f'];return{result:`n=${n}, l=${l}(${lN[l]}), ml=${ml}, ms=${ms>0?'+½':'−½'}`,label:'Квантові числа останнього e⁻',steps:[`Конфігурація: ${_buildConfig(Z)}`,`n=${n}, l=${l}(${lN[l]}), ml=${ml}, ms=${ms>0?'+½':'−½'}`]};},
  '1-1-atom_n':({Z})=>{Z=Math.round(Z);if(Z<1||Z>118)throw new Error('Z 1-118');const v=_valenceElectrons(Z);return{result:v,label:'Валентні електрони',steps:[`Конфігурація: ${_buildConfig(Z)}`,`Валентні e⁻: ${v}`]};},
  '1-2-periodic_V':({Z})=>{Z=Math.round(Z);const r=EL_RADIUS[Z];if(!r)throw new Error(`Радіус для Z=${Z} відсутній`);return{result:`${r} пм`,label:'Атомний радіус',steps:[`r(Z=${Z}) = ${r} пм`]};},
  '1-2-periodic_P':({Z})=>{Z=Math.round(Z);const en=_getEN(Z);if(en===null)throw new Error(`ЕН для Z=${Z} відсутня`);return{result:en.toFixed(2),label:'Електронегативність (Полінг)',steps:[`ЕН(Z=${Z}) = ${en}`]};},
  '1-2-periodic_n':({Z})=>{Z=Math.round(Z);const ei=EL_IE[Z];if(!ei)throw new Error(`EI для Z=${Z} відсутня`);return{result:`${ei} кДж/моль`,label:'Перша енергія іонізації',steps:[`EI₁(Z=${Z}) = ${ei} кДж/моль`]};},
  '1-3-bond_V':({EN_A,EN_B})=>{const d=Math.abs(EN_A-EN_B);const t=d<0.5?'Неполярний ковалентний':d<=1.7?'Полярний ковалентний':'Іонний';return{result:`ΔEN=${_fmt(d)} → ${t}`,label:"Тип хімічного зв'язку",steps:[`ΔEN=|${EN_A}−${EN_B}|=${_fmt(d)}`,`Тип: ${t}`]};},
  '1-3-bond_P':({BP,LP})=>{BP=Math.round(BP);LP=Math.round(LP);const g={'2_0':'Лінійна (180°)','3_0':'Плоский трикутник (120°)','3_1':'Кутова (~119°)','4_0':'Тетраедр (109.5°)','4_1':'Тригональна піраміда (~107°)','4_2':'Кутова (~104.5°)','5_0':'Тригональна біпіраміда','6_0':'Октаедр (90°)'}[`${BP+LP}_${LP}`]||'Невизначено';return{result:g,label:'Геометрія (VSEPR)',steps:[`BP=${BP}, LP=${LP}, сума=${BP+LP}`,`Геометрія: ${g}`]};},
  '1-3-bond_n':({BP,LP})=>{BP=Math.round(BP);LP=Math.round(LP);const h={2:'sp',3:'sp²',4:'sp³',5:'sp³d',6:'sp³d²'}[BP+LP]||'?';return{result:h,label:'Гібридизація',steps:[`BP+LP=${BP+LP} → ${h}`]};},
  '1-4-states_V':({m,lambda})=>{const Q=m*lambda;return{result:`${_fmt(Q)} кДж`,label:'Q плавлення',steps:[`Q=m×λ=${m}×${lambda}=${_fmt(Q)} кДж`]};},
  '1-4-states_P':({m,r})=>{const Q=m*r;return{result:`${_fmt(Q)} кДж`,label:'Q пароутворення',steps:[`Q=m×r=${m}×${r}=${_fmt(Q)} кДж`]};},
  '1-4-states_n':({n_mol,dH})=>{const Q=n_mol*dH;return{result:`${_fmt(Q)} кДж`,label:'Молярна теплота Q',steps:[`Q=n×ΔH=${n_mol}×${dH}=${_fmt(Q)} кДж`]};},
  '1-5-gases_dalton':({n_i,n_total,P_total})=>{const x=n_i/n_total,Pi=x*P_total;return{result:`x=${_fmt(x)}, P_i=${_fmt(Pi)} атм`,label:'Закон Дальтона',steps:[`x_i=${n_i}/${n_total}=${_fmt(x)}`,`P_i=${_fmt(x)}×${P_total}=${_fmt(Pi)} атм`]};},
  '1-5-gases_density':({M,T_C,P})=>{const T=T_C+273.15,rho=P*M/(R*T);return{result:`${_fmt(rho)} г/л`,label:'Густина газу',steps:[`T=${T.toFixed(2)} K`,`ρ=PM/(RT)=${_fmt(rho)} г/л`]};},
  '1-5-gases_rel_density':({M_A,M_B})=>{const D=M_A/M_B;return{result:`D=${_fmt(D)}${Math.abs(M_B-29)<0.5?' (відносно повітря)':''}`,label:'Відносна щільність',steps:[`D=M_A/M_B=${M_A}/${M_B}=${_fmt(D)}`]};},
});
