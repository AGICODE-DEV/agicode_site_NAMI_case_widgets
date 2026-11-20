import { useState } from 'react';
import { boards, customerName, type BoardId, type Demo, type Order } from './model';
import { canDissolve, destinations, groupCandidates, groupKey, itemsOf } from './workflow';
import { Dialog } from './Controls';
import { ProductSummary } from './OrderCard';

const places = { orders: 'в магазине', japan: 'на складе Японии', thailand: 'на складе Таиланда', kazakhstan: 'на складе Казахстана', russia: 'в России' };
export function CombineDialog({ state, board, base, close, commit, editing }: { state: Demo; board: BoardId; base: string; close: () => void; editing?: Order; commit: (ids: string[], notes: string) => void }) {
  const choices = groupCandidates(state, board, editing);
  const [ids, setIds] = useState<string[]>(editing?.group?.members ?? []);
  const [notes, setNotes] = useState(editing?.notes || '');
  const first = choices.find(o => ids.includes(o.id));
  const keys = [...new Set(choices.map(groupKey))];
  const action = board === 'orders' ? 'Объединить' : 'Консолидировать';
  return <Dialog wide onClose={close} title={action + ' ' + places[board]}
    description={board === 'orders' ? 'Выберите минимум два выкупленных заказа одного клиента в одном магазине.' : 'Выберите минимум две посылки одного клиента, уже принятые этим складом.'}
    footer={<><button onClick={close}>Отмена</button><button className="primary" disabled={ids.length < 2} onClick={() => commit(ids, notes)}>{editing ? 'Сохранить состав' : action}</button></>}>
    {keys.map(key => { const candidates = choices.filter(o => groupKey(o) === key);
      const name = customerName(state.clients.find(c => c.id === candidates[0].clientId)!);
      return <section key={key}><h3>{name}{board === 'orders' && ' · ' + (candidates[0].shop || key.split('|')[1])}</h3>
        <div className="selection">{candidates.map(order => <div className="candidate" key={order.id}><strong>{name}</strong>
          {order.track && <span>Трек: <b>{order.track}</b></span>}<small>{order.id}</small>
          {itemsOf(order,state).map(item => <ProductSummary key={item.id} item={item} expanded base={base}/>)}
          <label className="select"><input type="checkbox" aria-label={'Выбрать ' + order.id} checked={ids.includes(order.id)} disabled={!!first && groupKey(first) !== key}
            onChange={e => setIds(e.target.checked ? [...ids, order.id] : ids.filter(id => id !== order.id))}/>Выбрать</label></div>)}</div></section>;
    })}
    {ids.length >= 2 && <label className="field">Заметка к посылке<input value={notes} onChange={e => setNotes(e.target.value)}/></label>}
    <p className="muted">{choices.length ? 'Выберите минимум два отправления одного клиента.' : 'Подходящих отправлений пока нет.'}</p>
  </Dialog>;
}
export function GroupDetails({ order, state, base, close, edit, remove, saveNotes, editMembers, ship, nested }: { nested: boolean; order: Order; state: Demo; base: string; close: () => void;
  edit: (id: string) => void; editMembers: () => void; ship: () => void; remove: (id?: string) => void; saveNotes: (notes: string) => void }) {
  const [notes, setNotes] = useState(order.notes);
  return <Dialog wide title={'Объединённая посылка ' + order.id} description={order.track ? 'Общий трек: ' + order.track : 'Исходные заказы и трек-номера'} onClose={close}
    footer={<>{!nested && canDissolve(order) && <><button onClick={editMembers}>Изменить состав</button><button onClick={() => remove()}>Расформировать</button></>}{!nested && order.lane === 2 && destinations(order).length > 0 && <button onClick={ship}>Отправить общую посылку</button>}<button onClick={close}>Закрыть</button><button className="primary" onClick={() => saveNotes(notes)}>Сохранить</button></>}>
    <div className="fields">{order.group!.members.map(id => {
      const member = state.orders.find(o => o.id === id)!;
      return <section className="candidate" key={id}><div className="group-source"><strong>{id}</strong><span>{member.track}</span>
        <button onClick={() => edit(id)}>Открыть {id}</button>{!nested && canDissolve(order) && <button onClick={() => remove(id)}>Исключить {id}</button>}</div>
        {itemsOf(member,state).map(item => <ProductSummary key={item.id} item={item} expanded base={base}/>)}</section>;
    })}<label>Заметка к посылке<textarea value={notes} onChange={e => setNotes(e.target.value)}/></label></div>
  </Dialog>;
}
export function MoveDialog({ order, close, submit }: { order: Order; close: () => void; submit: (dest?: BoardId, track?: string) => void }) {
  const shipping = order.lane === 2 && order.board !== 'russia';
  const choices = destinations(order);
  const [dest, setDest] = useState<BoardId>(choices[0]);
  const [track, setTrack] = useState('');
  const [paid, setPaid] = useState(false);
  const needPaid = order.group?.origin === 'japan' && order.board === 'japan' && dest === 'thailand';
  const title = boards[order.board].next[order.lane];
  return <Dialog title={title} onClose={close} footer={<><button onClick={close}>Отмена</button>
    <button className="primary" disabled={shipping && (!track.trim() || (needPaid && !paid))} onClick={() => submit(dest, track)}>Подтвердить</button></>}>
    {shipping ? <div className="fields"><label>Страна назначения<select value={dest} onChange={e => setDest(e.target.value as BoardId)}>{choices.map(d => <option key={d} value={d}>{boards[d].name}</option>)}</select></label>
      <label>Трек-номер *<input autoFocus value={track} onChange={e => setTrack(e.target.value)}/></label>
      {needPaid && <label><span><input type="checkbox" checked={paid} onChange={e => setPaid(e.target.checked)}/> Доставка в Таиланд оплачена</span></label>}</div> :
      <p>Подтвердите действие для {order.id}.</p>}
  </Dialog>;
}
