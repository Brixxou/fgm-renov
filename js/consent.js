/* FGM RENOV — Mesure d'audience Google Analytics, uniquement après consentement.
   La CNIL impose l'accord préalable pour les cookies de mesure d'audience non exemptés,
   ce qui est le cas de Google Analytics. Sans réponse ou en cas de refus : aucun script
   Google n'est chargé et aucun cookie n'est déposé. */
(function () {
  'use strict';

  var GA_ID = 'G-VM3X3ERXL8';
  var KEY = 'fgm-consent';
  var VALIDITY = 1000 * 60 * 60 * 24 * 182;   // choix conservé 6 mois (recommandation CNIL)
  var COOKIE_MAX_AGE = 60 * 60 * 24 * 395;    // cookies _ga : 13 mois maximum (CNIL)
  var loaded = false;
  var banner;

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && (c.v === 'granted' || c.v === 'denied') && Date.now() - c.t < VALIDITY) return c.v;
    } catch (e) {}
    return null;
  }

  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  function loadGA() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { cookie_expires: COOKIE_MAX_AGE });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Retrait du consentement : on coupe la mesure et on efface les cookies _ga déjà posés
  function clearGA() {
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;
      ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + d;
      });
    });
  }

  // fromUser : ouvert par un clic sur « Cookies » → on y place le focus clavier.
  // À l'arrivée sur la page, on ne vole pas le focus.
  function show(fromUser) {
    if (banner) {
      banner.hidden = false;
      if (fromUser) banner.querySelector('button').focus();
      return;
    }
    banner = document.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<p>Nous utilisons Google Analytics pour mesurer la fréquentation du site, uniquement avec votre accord. ' +
      '<a href="/confidentialite.html#cookies">En savoir plus</a></p>' +
      '<div class="consent-actions">' +
        '<button type="button" data-consent="denied">Refuser</button>' +
        '<button type="button" data-consent="granted">Accepter</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!v) return;
      save(v);
      banner.hidden = true;
      if (v === 'granted') loadGA(); else clearGA();
    });
    document.body.appendChild(banner);
    if (fromUser) banner.querySelector('button').focus();
  }

  // Liens « Cookies » / « Modifier mon choix » : rouvrent le bandeau
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-consent-open]');
    if (!a) return;
    e.preventDefault();
    show(true);
  });

  // Clics sur un numéro de téléphone : la première source de contacts de l'artisan.
  // Comptés seulement si la mesure d'audience est acceptée (et toujours acceptée).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!a || !loaded || read() !== 'granted') return;
    window.gtag('event', 'click_to_call', {
      link_location: (a.className || 'lien').split(' ')[0],
      page_path: location.pathname
    });
  });

  var choice = read();
  if (choice === 'granted') loadGA();
  else if (choice === null) show();
})();
