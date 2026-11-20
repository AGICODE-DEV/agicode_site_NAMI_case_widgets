export const boards = {
  orders: { name: 'Заказы', lanes: ['Новый', 'Выкуплен', 'Ожидает отправки'], hints: ['Рассчитайте стоимость', 'Проверьте, подтвердили ли', 'Выберите страну и укажите трек'], next: ['Выкуплен', 'Ожидаем отправки', 'Заказ отправлен'] },
  japan: { name: 'Склад Японии', lanes: ['Едет на склад', 'На складе посредника', 'Ожидает отправки'], hints: ['Следите за треком', 'Соберите оплату за доставку', 'Вставьте трек-номер из ЛК'], next: ['Прибыл на склад', 'Доставка оплачена', 'Заказ отправлен'] },
  thailand: { name: 'Склад Таиланда', lanes: ['В пути в Таиланд', 'На складе посредника', 'Ожидает отправки'], hints: ['Следите за треком', 'Проверьте габариты посылки', 'Вставьте трек-номер из ЛК'], next: ['Прибыл на склад', 'Ожидаем отправки', 'Заказ отправлен'] },
  kazakhstan: { name: 'Склад Казахстана', lanes: ['Едет на склад', 'На складе посредника', 'Ожидает отправки'], hints: ['Следите за треком', 'Проверьте состав посылки', 'Вставьте трек-номер из ЛК'], next: ['Прибыл на склад', 'Ожидаем отправки', 'Заказ отправлен'] },
  russia: { name: 'Россия', lanes: ['В пути в Россию', 'В пункте выдачи', 'Получено клиентом'], hints: ['Следите за треком', 'Можно забирать заказ', 'Запросите отзыв'], next: ['В пункте выдачи', 'Получено клиентом', 'Запросить отзыв'] },
} as const;
export type BoardId = keyof typeof boards;
export const boardIds = Object.keys(boards) as BoardId[];
export type Lane = 0 | 1 | 2;
export const channels = { telegram: 'Telegram', vk: 'ВКонтакте', avito: 'Авито', other: 'Другое' } as const;
export type Channel = keyof typeof channels;

export interface Customer {
  id: string;
  name: string;
  phone: string;
  telegram: string;
  telegramName: string;
  vk: string;
  vkName: string;
  avito: string;
  avitoName: string;
  region: string;
  city: string;
  address: string;
  notes: string;
  primaryChannel: Channel;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  cost: number;
  sale: number;
  url: string;
  image: string;
}
export interface Location { board: BoardId; lane: Lane; track: string }
export interface Order extends Location {
  id: string;
  clientId: string;
  date: string;
  channel: Channel;
  purchaseNumber: string;
  shop: string;
  notes: string;
  products: Product[];
  history: Location[];
  taxUsd: number;
  localTrack: string;
  review: boolean;
  group?: { origin: BoardId; members: string[] };
}
export interface Demo { orders: Order[]; clients: Customer[]; sequence: number }
export const customerName = (c: Customer) => (c.primaryChannel === 'other' ? '' : c[c.primaryChannel + 'Name' as 'telegramName' | 'vkName' | 'avitoName']) || c.name || c.telegramName || c.vkName || c.avitoName || c.phone;
export function emptyClient(): Customer {
  return { id: '', name: '', phone: '', telegram: '', telegramName: '', vk: '', vkName: '', avito: '', avitoName: '', region: '', city: '', address: '', notes: '', primaryChannel: 'other' };
}
export function emptyProduct(): Product {
  return { id: crypto.randomUUID(), name: '', description: '', quantity: 1, cost: 0, sale: 0, url: '', image: '' };
}
export function emptyOrder(id: string, date: string): Order {
  return { id, date, board: 'orders', lane: 0, track: '', clientId: '', channel: 'other', purchaseNumber: '', shop: '', notes: '', products: [], history: [], taxUsd: 0, localTrack: '', review: false };
}
const currency = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 });
export const money = (kopecks: number) => currency.format(kopecks / 100) + ' ₽';
