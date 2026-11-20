'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { NamiWidgetProps } from '../NamiDemoFrame';
import { boards, boardIds, emptyOrder, money, type BoardId, type Order, type Product } from './model';
import { seedDemo } from './fixtures';
import { advance, combine, matches, previous, removeMember, replaceOrder, visibleOrders } from './workflow';
import { Dialog, Icon, Tabs, type IconName } from './Controls';
import { OrderCard } from './OrderCard';
import { OrderEditor } from './OrderEditor';
import { CombineDialog, GroupDetails, MoveDialog } from './ShipmentDialogs';
import { original } from './media';
import styles from './orders.css?inline';

type View =
  | { kind: 'create' | 'reset' }
  | { kind: 'combine'; editing?: string }
  | { kind: 'edit'; id: string; customer?: boolean; parents?: string[] }
  | { kind: 'next' | 'back'; id: string }
  | { kind: 'product'; item: Product };

const icons: Record<BoardId, IconName> = { orders: 'bag', japan: 'box', thailand: 'wallet', kazakhstan: 'wallet', russia: 'truck' };

function Board({ base }: { base: string }) {
  const [state, setState] = useState(seedDemo);
  const [board, setBoard] = useState<BoardId>('orders');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<View | null>(null);
  const [notice, setNotice] = useState('');
  const baseId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const all = visibleOrders(state);
  const counts = boardIds.map(key => all.filter(o => o.board === key).length);
  const cards = all.filter(order => order.board === board && matches(order, state, search));
  const active = view && 'id' in view ? state.orders.find(o => o.id === view.id) : undefined;
  const groupLabel = board === 'orders' ? 'Объединить в магазине' : 'Консолидировать';

  function close() {
    if (view?.kind === 'edit' && view.parents?.length) {
      setView({ kind: 'edit', id: view.parents.at(-1)!, parents: view.parents.slice(0, -1) });
    } else setView(null);
  }
  function changeStage(next: Order) {
    setState(current => replaceOrder(current, next));
    setNotice(next.id + ' · ' + boards[next.board].name + ' · ' + boards[next.board].lanes[next.lane]);
    setView(null);
    if (next.board !== board || next.lane !== active?.lane) {
      requestAnimationFrame(() => tabsRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus({ preventScroll: true }));
    }
  }
  return <section className="workspace" aria-label="Демонстрационная система заказов NAMI">
    <div ref={tabsRef}><Tabs tabs={boardIds.map((key,index) => ({ key, label: <><Icon name={icons[key]}/>{boards[key].name}<span className="count">{counts[index]}</span></> }))}
      value={board} onChange={key => { setBoard(key); setSearch(''); setNotice('') }} base={baseId} label="Доски заказов"/></div>
    <label className="search"><Icon name="search"/><input type="search" aria-label="Поиск заказов" placeholder="Клиент, товар или номер..." value={search} onChange={e => setSearch(e.target.value)}/></label>
    <div className="toolbar"><button className="reset" onClick={() => setView({ kind: 'reset' })}><Icon name="reset"/>Обновить демо</button>
      <p className="edition">Ознакомительная версия с базовым функционалом.<br/>Полная индивидуальная версия защищена NDA.</p>
      <div className="toolbar-actions">{board === 'orders' && <button className="primary" onClick={() => setView({ kind: 'create' })}><Icon name="add"/>Новый заказ</button>}
        {board !== 'russia' && <button className="primary" onClick={() => setView({ kind: 'combine' })}>{groupLabel}</button>}</div></div>
    <div className="kanban-scroll" id={baseId + '-panel'} role="tabpanel" aria-labelledby={baseId + '-' + board}>
      <div className="kanban">{boards[board].lanes.map((title, index) => {
        const lane = cards.filter(order => order.lane === index);
        const create = board === 'orders' && index === 0;
        return <section className="lane" key={index} data-lane={index} aria-label={title}><header><span className="dot"/><h2>{title}</h2><small>{lane.length}</small></header>
          <p className="hint">{boards[board].hints[index]}</p>
          <div className="card-list">{create && <button className="new-in-lane" onClick={() => setView({ kind: 'create' })}><Icon name="add"/>Создать заказ</button>}
            {lane.map(order => <OrderCard key={order.id} order={order} state={state} base={base}
              onEdit={() => setView({ kind: 'edit', id: order.id })} onCustomer={() => setView({ kind: 'edit', id: order.id, customer: true })}
              onProduct={item => setView({ kind: 'product', item })} onNext={() => setView({ kind: 'next', id: order.id })}
              onBack={() => setView({ kind: 'back', id: order.id })}/>)}
            {!lane.length && !create && <div className="empty">{search ? 'Ничего не найдено' : 'Пока пусто'}</div>}
          </div></section>;
      })}</div></div>
    <span className="sr-only" role="status">{notice}</span>
    {(view?.kind === 'create' || (view?.kind === 'edit' && active && !active.group)) &&
      <OrderEditor key={active?.id ?? 'new'} initial={active ?? emptyOrder('N' + state.sequence, '2026-10-29')} creating={!active} state={state}
        initialTab={view.kind === 'edit' && view.customer ? 'customer' : 'info'} locked={view.kind === 'edit' && !!view.parents?.length}
        base={base} onClose={close} onSave={(order, client) => {
          setState(current => ({ ...current, clients: current.clients.some(c => c.id === client.id) ? current.clients.map(c => c.id === client.id ? client : c) : [...current.clients,client],
            orders: active ? replaceOrder(current, order).orders : [...current.orders, order], sequence: current.sequence + (active ? 0 : 1) }));
          setNotice('Заказ ' + order.id + ' сохранён'); close();
        }}/>}
    {view?.kind === 'edit' && active?.group && <GroupDetails nested={!!view.parents?.length} key={active.id} order={active} state={state} base={base} close={close}
      edit={id => setView({ kind: 'edit', id, parents: [...(view.parents ?? []), active.id] })}
      editMembers={() => setView({ kind: 'combine', editing: active.id })} ship={() => setView({ kind: 'next', id: active.id })}
      remove={id => { setState(current => removeMember(current, active, id)); close() }}
      saveNotes={notes => { setState(current => replaceOrder(current, { ...active, notes })); close() }}/>}
    {view?.kind === 'next' && active && <MoveDialog order={active} close={close} submit={(dest, track) => changeStage(advance(active, dest, track))}/>}
    {view?.kind === 'back' && active && <Dialog title={previous(active) ? 'Вернуть заказ' : active.group ? 'Вернуть исходные отправления' : 'Удалить заказ'} onClose={close}
      footer={<><button onClick={close}>Отмена</button><button className="primary" onClick={() => {
        const prior = previous(active);
        if (prior) changeStage(prior);
        else if (active.group) { setState(current => removeMember(current, active)); close() }
        else { setState(current => ({ ...current, orders: current.orders.filter(o => o.id !== active.id) })); setView(null) }
      }}>Подтвердить</button></>}><p>{active.id} · {previous(active) ? 'Вернуть на предыдущий этап?' : active.group ? 'Расформировать посылку и вернуть исходные заказы?' : 'Удалить этот заказ из демоверсии?'}</p></Dialog>}
    {view?.kind === 'combine' && <CombineDialog board={board} state={state} base={base} close={close} editing={state.orders.find(o => o.id === view.editing)} commit={(ids, notes) => {
      setState(current => combine(current, board, ids, notes, current.orders.find(o => o.id === view.editing))); close();
    }}/>}
    {view?.kind === 'product' && <Dialog title={view.item.name} onClose={close} footer={<>{view.item.image && <a className="button" href={original(base, view.item.image)} download>Скачать оригинал</a>}<button onClick={close}>Закрыть</button></>}>
      {view.item.image && <img className="photo" src={original(base, view.item.image)} alt={view.item.name}/>}
      <p>{view.item.description}</p><p>{view.item.quantity} шт. · {money(view.item.cost * view.item.quantity)}</p>{view.item.url && <p className="muted">{view.item.url}</p>}</Dialog>}
    {view?.kind === 'reset' && <Dialog title="Обновить демо" onClose={close}
      footer={<><button onClick={close}>Отмена</button><button className="primary" onClick={() => { setState(seedDemo()); setBoard('orders'); setSearch(''); setNotice('Демо обновлено'); close() }}>Обновить</button></>}>
      <p>Восстановить исходные заказы и данные клиентов?</p></Dialog>}
  </section>;
}

export function OrdersWidget({ assetBasePath = '/nami-widgets', className, style }: NamiWidgetProps) {
  const [shadow, setShadow] = useState<ShadowRoot | null>(null);
  const attach = useCallback((host: HTMLDivElement | null) => {
    if (host) setShadow(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
  }, []);
  return <div ref={attach} data-nami-orders="" className={className} style={style}>
    {shadow && createPortal(<><style>{styles}</style><Board base={assetBasePath}/></>, shadow)}
  </div>;
}
