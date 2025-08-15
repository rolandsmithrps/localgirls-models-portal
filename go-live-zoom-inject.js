
(function(){
  function inject(){
    const toolbar = document.querySelector('#toolbar, header, .topbar, body');
    const btn = document.createElement('button');
    btn.textContent = 'Go Live (Zoom) — v10';
    btn.style.cssText = 'margin:8px;padding:8px 12px;border-radius:8px;border:1px solid #3a1b73;background:#6d28d9;color:#fff;cursor:pointer';
    btn.onclick = () => { window.open('/zoom-host.html', '_blank'); };
    toolbar.prepend(btn);
    const badge = document.createElement('div'); badge.textContent='v10';
    badge.style.cssText='position:fixed;right:10px;top:10px;background:#4c1d95;color:#fff;padding:4px 8px;border-radius:999px;font:600 12px/1 system-ui;z-index:2147483647';
    document.body.appendChild(badge);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();
