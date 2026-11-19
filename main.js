(() => {
  'use strict';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let stored;
  try { stored = localStorage.getItem('tk-theme'); } catch (_) {}
  if (stored === 'dark' || stored === 'light') root.dataset.theme = stored;
  const current = () => root.dataset.theme || (system.matches ? 'dark' : 'light');
  const sync = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    toggle.title = 'Switch to ' + next + ' theme';
  };
  toggle.hidden = false;
  sync();
  toggle.addEventListener('click', () => {
    root.dataset.theme = current() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tk-theme', root.dataset.theme); } catch (_) {}
    sync();
  });
  if (system.addEventListener) system.addEventListener('change', sync);
})();
