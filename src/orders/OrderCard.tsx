import { channels, customerName, money, boards, type Demo, type Order, type Product } from './model';
import { canDissolve, itemsOf, previous } from './workflow';
import { Icon } from './Controls';
import { thumbnail } from './media';

export function ProductSummary({ item, base, onOpen, expanded = false }: {
  item: Product; base: string; onOpen?: () => void; expanded?: boolean;
}) {
  const inside = <>
    {item.image && <img width={expanded ? 72 : 52} height={expanded ? 72 : 52} {...thumbnail(base, item.image)} alt={item.name}/>}
    <span className="product-lines"><span className="product-line"><strong>{item.name || 'Товар'}</strong>{!expanded && <span>— {item.quantity} шт</span>}</span>
      {expanded ? <><span>{item.quantity} шт. · {money(item.cost * item.quantity)}</span><span className="description">{item.description}</span></> :
        <>{item.url && <span className="product-line"><span className="ellipsis">{item.url}</span><Icon name="open"/></span>}<small>{money(item.cost * item.quantity)}</small></>}
    </span></>;
  return onOpen ? <button className="product" type="button" onClick={onOpen} aria-label={'Открыть товар ' + item.name}>{inside}</button> : <div className="product">{inside}</div>;
}

export function OrderCard({ order, state, base, onEdit, onCustomer, onProduct, onNext, onBack }: {
  order: Order; state: Demo; base: string; onEdit: () => void; onCustomer: () => void;
  onProduct: (product: Product) => void; onNext: () => void; onBack: () => void;
}) {
  const client = state.clients.find(c => c.id === order.clientId)!;
  const channel = order.channel;
  const back = previous(order);
  return <article className="order-card" data-card-id={order.id} aria-label={order.id + ' · ' + customerName(client)}>
    <div className="card-head"><button type="button" className="client-name" onClick={onEdit}>{customerName(client)}</button>
      {channel !== 'other' && <span className={'channel ' + channel} title={channels[channel]} aria-label={channels[channel]}>{channel === 'telegram' ? '➤' : channel === 'vk' ? 'ᴠκ' : '●'}</span>}
      <button className="contact" type="button" aria-label={'Данные клиента ' + customerName(client)} onClick={onCustomer}><Icon name="link"/></button>
    </div>
    <button className="card-info" type="button" onClick={onEdit} aria-label={'Открыть ' + order.id}>
      {order.group && <strong>Объединённая посылка · {order.group.members.length}</strong>}
      <span>{client.name || client.city || client.address || 'Данные доставки не указаны'}</span>
      <small>Дата заказа: {order.date.split('-').reverse().join('.')}</small>
      {order.track && <span>Трек: {order.track}</span>}
      {order.taxUsd > 0 && <span>Налог: {order.taxUsd} USD</span>}
      {order.notes && <span className="note">Комментарий: {order.notes}</span>}
    </button>
    <div className="products">{itemsOf(order, state).map(item => <ProductSummary key={item.id} item={item} base={base} onOpen={() => onProduct(item)}/>)}</div>
    <div className="card-actions">
      {(back || canDissolve(order) || !order.group) && <button type="button" onClick={onBack}>{back || order.group ? 'Вернуть' : 'Удалить заказ'}</button>}
      <button type="button" className="primary" disabled={order.review} onClick={onNext}>{order.review ? 'Отзыв запрошен' : boards[order.board].next[order.lane]}</button>
    </div>
  </article>;
}
