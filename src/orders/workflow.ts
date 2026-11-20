import { customerName, type BoardId, type Demo, type Lane, type Location, type Order, type Product } from './model';

export function visibleOrders(state: Demo) {
  const grouped = new Set(state.orders.flatMap(order => order.group?.members ?? []));
  return state.orders.filter(order => !grouped.has(order.id));
}
export function itemsOf(order: Order, state: Demo): Product[] {
  if (!order.group) return order.products;
  return order.group.members.flatMap(id => {
    const member = state.orders.find(entry => entry.id === id);
    return member ? itemsOf(member, state) : [];
  });
}
export function matches(order: Order, state: Demo, query: string): boolean {
  const search = query.trim().toLocaleLowerCase('ru');
  if (!search) return true;
  const customer = state.clients.find(c => c.id === order.clientId);
  const fields = [order.id, order.track, order.localTrack, order.purchaseNumber, order.shop, order.notes,
    ...(customer ? [customerName(customer), customer.name, customer.phone, customer.vkName, customer.avitoName, customer.telegramName] : []),
    ...itemsOf(order, state).flatMap(p => [p.name, p.url])];
  return fields.some(field => field.toLocaleLowerCase('ru').includes(search))
    || Boolean(order.group?.members.some(id => state.orders.some(member => member.id === id && matches(member, state, search))));
}
export function replaceOrder(state: Demo, edited: Order): Demo {
  return { ...state, orders: state.orders.map(order => order.id === edited.id ? edited : order) };
}
export function destinations(order: Order): BoardId[] {
  switch (order.board) {
    case 'orders': return ['japan', 'thailand', 'kazakhstan'];
    case 'japan': return order.group?.origin === 'japan' ? ['thailand', 'kazakhstan'] : ['thailand', 'kazakhstan', 'russia'];
    case 'thailand': case 'kazakhstan': return ['russia'];
    default: return [];
  }
}
export function advance(order: Order, destination?: BoardId, track = ''): Order {
  if (order.board === 'russia' && order.lane === 2) return { ...order, review: true };
  let next: Location = { board: order.board, lane: order.lane, track: order.track };
  if (order.lane < 2) next.lane = (order.lane + 1) as Lane;
  else {
    if (!destination || !destinations(order).includes(destination) || !track.trim()) return order;
    next = { board: destination, lane: 0, track: track.trim() };
  }
  const prior: Location = { board: order.board, lane: order.lane, track: order.track };
  return { ...order, ...next, history: [...order.history, prior] };
}
export function previous(order: Order): Order | undefined {
  if (order.review) return { ...order, review: false };
  const prior = order.history.at(-1);
  if (prior) return { ...order, ...prior, history: order.history.slice(0, -1) };
  if (canDissolve(order)) return;
  if (order.lane) return { ...order, lane: (order.lane - 1) as Lane };
  const inbound = { japan: 'orders', thailand: 'japan', kazakhstan: 'japan', russia: 'thailand' } as const;
  if (order.board !== 'orders') return { ...order, board: inbound[order.board], lane: 2, track: '' };
}
export function groupKey(order: Order): string {
  if (order.board !== 'orders') return order.clientId;
  const hosts = new Set(order.products.flatMap(p => {
    try { return [new URL(p.url).hostname.toLowerCase().replace(/^www\./, '')] } catch { return [] }
  }));
  const supplier = order.shop.trim().toLowerCase() || (hosts.size === 1 ? [...hosts][0] : '');
  return supplier ? order.clientId + '|' + supplier : '';
}
export function groupCandidates(state: Demo, board: BoardId, editing?: Order) {
  const included = new Set(editing?.group?.members);
  const pool = [...visibleOrders(state), ...state.orders.filter(order => included.has(order.id))];
  const available = pool.filter(order => order.board === board && board !== 'russia' && order.lane === 1 && order.group?.origin !== board && groupKey(order));
  return available.filter(order => available.some(other => other.id !== order.id && groupKey(other) === groupKey(order)));
}
export function combine(state: Demo, board: BoardId, ids: string[], notes = '', editing?: Order): Demo {
  if (editing && (!canDissolve(editing) || !visibleOrders(state).some(order => order.id === editing.id))) return state;
  const members = groupCandidates(state, board, editing).filter(order => ids.includes(order.id));
  if (members.length < 2 || members.length !== ids.length || new Set(members.map(groupKey)).size !== 1) return state;
  const group: Order = { ...members[0], id: editing?.id ?? 'G' + state.sequence, lane: board === 'orders' ? 1 : 2,
    products: [], notes, review: false, history: [], track: '', localTrack: '', group: { origin: board, members: members.map(m => m.id) } };
  if (editing) return replaceOrder(state, group);
  return { ...state, sequence: state.sequence + 1, orders: [...state.orders, group] };
}
export function canDissolve(order: Order): boolean {
  return Boolean(order.group && order.board === order.group.origin && order.lane === (order.board === 'orders' ? 1 : 2) && order.history.length === 0);
}
export function removeMember(state: Demo, group: Order, memberId?: string): Demo {
  if (!canDissolve(group) || !group.group || !visibleOrders(state).some(order => order.id === group.id)) return state;
  const remaining = memberId ? group.group.members.filter(id => id !== memberId) : [];
  if (remaining.length >= 2) return replaceOrder(state, { ...group, group: { ...group.group, members: remaining } });
  return { ...state, orders: state.orders.filter(order => order.id !== group.id) };
}
