import { createRoot } from 'react-dom/client';
import { OrdersWidget } from '../orders';

const host = document.getElementById('orders')!;
createRoot(host).render(<OrdersWidget assetBasePath="."/>);
if (window.parent !== window) {
  const report = () => parent.postMessage({ type: 'nami-preview-height', height: Math.ceil(host.getBoundingClientRect().height) }, '*');
  new ResizeObserver(report).observe(host);
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.data?.type !== 'nami-visible-viewport') return;
    const { top, height } = event.data;
    if (!Number.isFinite(top) || !Number.isFinite(height) || top < 0 || height <= 0) return;
    host.style.setProperty('--nami-visible-top', top + 'px');
    host.style.setProperty('--nami-visible-height', height + 'px');
  });
}
