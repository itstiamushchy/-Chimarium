// Хімарій v1.4.4 — Service Worker
// Кеш: офлайн-доступ до всіх ресурсів

const CACHE_NAME = 'khimariy-v1.4.4';
const CACHE_STATIC = [
  './',
  './index.html',
  './manifest.json',
  // БАГ №16 ВИПРАВЛЕНО: reactions.json не існує окремо (тільки rx_flat/rx_index для synthesis)
  // БАГ №17 ВИПРАВЛЕНО: synthesis.html та pobut-khimiya.html додано для PWA офлайн
  './synthesis.html',
  './pobut-khimiya.html',
  './reactions_filter.js',
  './reactions_tagged.json',
  './formulas.json',
  './glossary.json',
  // Калькулятори
  './data/calcs/formula_configs.js',
  './data/calcs/group_1_atom.js',
  './data/calcs/group_2_inorganic.js',
  './data/calcs/group_3_thermo.js',
  './data/calcs/group_4_solutions.js',
  './data/calcs/group_5_organic.js',
  './data/calcs/group_6_analytical.js',
  './data/calcs/new_calcs_1.js',
  './data/calcs/new_calcs_2.js',
  './data/calcs/new_calcs_3.js',
  './data/calcs/new_calcs_4.js',
  // Теми
  './data/1-1-atom.json',
  './data/1-2-periodic.json',
  './data/1-3-bond.json',
  './data/1-4-states.json',
  './data/1-5-gases.json',
  './data/2-1-inorganic-classes.json',
  './data/2-2-s-elements.json',
  './data/2-3-p-elements.json',
  './data/2-4-d-f-elements.json',
  './data/3-1-thermodynamics.json',
  './data/3-2-kinetics.json',
  './data/3-3-equilibrium.json',
  './data/3-4-electrochemistry.json',
  './data/3-5-phase.json',
  './data/4-1-dissolving.json',
  './data/4-2-concentration.json',
  './data/4-3-electrolytes.json',
  './data/4-4-colligative.json',
  './data/4-5-colloids.json',
  './data/5-1-organic-basics.json',
  './data/5-2-hydrocarbons.json',
  './data/5-3-aromatics.json',
  './data/5-4-oxygen-compounds.json',
  './data/5-5-nitrogen-compounds.json',
  './data/5-6-polymers.json',
  './data/6-1-qualitative.json',
  './data/6-2-titrimetry.json',
  './data/6-3-instrumental.json',
];

// Зовнішні шрифти (Google Fonts) — стратегія: cache-first з fallback
const FONT_CACHE = 'khimariy-fonts-v1';

// ===== INSTALL =====
self.addEventListener('install', event => {
  console.log('[SW] Installing Хімарій v1.4.4...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache only files that are likely to exist — ignore 404s
      return Promise.allSettled(
        CACHE_STATIC.map(url =>
          cache.add(url).catch(err => {
            // Silently skip missing files (topics may not all be present)
            console.log('[SW] Skipped (not found):', url);
          })
        )
      );
    }).then(() => {
      console.log('[SW] Install complete');
      return self.skipWaiting();
    })
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== FONT_CACHE)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH =====
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts — стратегія: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(res => {
            if (res && res.status === 200) cache.put(event.request, res.clone());
            return res;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // Для всіх інших запитів — стратегія: Network First з fallback на cache
  // Це гарантує свіжі дані при з'єднанні, але офлайн-доступ при відсутності мережі
  event.respondWith(
    fetch(event.request)
      .then(res => {
        // Кешуємо успішні відповіді (тільки GET, не POST)
        if (
          event.request.method === 'GET' &&
          res && res.status === 200 &&
          res.type !== 'opaque'
        ) {
          const cloned = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return res;
      })
      .catch(() => {
        // Офлайн — повертаємо з кешу
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Якщо навіть в кеші немає — для навігації повертаємо головну
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Офлайн. Ресурс недоступний.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        });
      })
  );
});

// ===== MESSAGE: FORCE UPDATE =====
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
