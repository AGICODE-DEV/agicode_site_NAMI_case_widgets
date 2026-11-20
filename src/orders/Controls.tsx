import { useEffect, useId, useRef, type ReactNode } from 'react';

const shapes = {
  bag: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 5V3h10v2M8 9a4 4 0 0 0 8 0"/></>,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5"/></>,
  wallet: <><path d="M20 8V5H5a2 2 0 0 0 0 4h15v11H5a2 2 0 0 1-2-2V7"/><path d="M20 12h-5v4h5"/></>,
  truck: <><path d="M2 5h12v12H2zM14 9h4l4 5v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  search: <><circle cx="10" cy="10" r="7"/><path d="m16 16 5 5"/></>,
  reset: <><path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/></>,
  add: <path d="M12 4v16M4 12h16"/>, close: <path d="m6 6 12 12M18 6 6 18"/>,
  link: <><path d="m10 14 4-4M8.5 15.5a4 4 0 0 1 0-5.7l3-3M15.5 8.5a4 4 0 0 1 0 5.7l-3 3"/><path d="m12 6 2-2a4 4 0 0 1 6 6l-2 2M12 18l-2 2a4 4 0 0 1-6-6l2-2"/></>,
  open: <path d="M6 18 18 6M7 6h11v11"/>,
};
export type IconName = keyof typeof shapes;
export function Icon({ name }: { name: IconName }) {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>;
}

interface Tab<K extends string> { key: K; label: ReactNode }
export function Tabs<K extends string>({ tabs, value, onChange, label, base, compact }: {
  tabs: Tab<K>[]; value: K; onChange: (key: K) => void; label: string; base: string; compact?: boolean;
}) {
  return <div role="tablist" aria-label={label} className={compact ? 'form-tabs' : 'board-tabs'}>
    {tabs.map(({ key, label: text }, index) => <button type="button" role="tab" key={key} id={base + '-' + key}
      aria-controls={base + '-panel'} aria-selected={key === value} tabIndex={key === value ? 0 : -1}
      onClick={() => onChange(key)} onKeyDown={e => {
        const keys: Record<string, number> = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = keys[e.key];
        onChange(tabs[next].key);
        e.currentTarget.parentElement?.querySelectorAll('button')[next].focus();
      }}>{text}</button>)}
  </div>;
}
export function Dialog({ title, description, onClose, wide, children, footer }: {
  title: string; description?: string; onClose: () => void; wide?: boolean; children: ReactNode; footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = ref.current!;
    const root = element.getRootNode() as Document | ShadowRoot;
    const prior = root.activeElement as HTMLElement | null;
    element.showModal();
    return () => {
      element.close();
      if (prior?.isConnected) prior.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={wide ? 'wide-dialog' : ''}
    onCancel={e => { e.preventDefault(); onClose() }}
    onClick={e => {
      if (e.target !== e.currentTarget) return;
      const r = e.currentTarget.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose();
    }}>
    <header className="dialog-head"><div><h2 id={titleId}>{title}</h2>{description && <p>{description}</p>}</div>
      <button type="button" className="icon-button" aria-label="Закрыть" onClick={onClose}><Icon name="close"/></button></header>
    <div className="dialog-body">{children}</div>{footer && <footer className="dialog-foot">{footer}</footer>}
  </dialog>;
}
