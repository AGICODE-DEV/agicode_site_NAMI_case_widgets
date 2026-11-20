import { useId, useRef, useState } from 'react';
import { boards, channels, customerName, emptyClient, emptyProduct, type Channel, type Customer, type Demo, type Lane, type Order, type Product } from './model';
import { Dialog, Icon, Tabs } from './Controls';
import { original } from './media';

type EditorTab = 'info' | 'products' | 'customer' | 'delivery';
const contacts = ['telegram', 'vk', 'avito'] as const;
const addressFields = { name: 'ФИО получателя', phone: 'Телефон', region: 'Регион', city: 'Город', address: 'Адрес доставки' } as const;
function ClientFields({ client, update }: { client: Customer; update: (c: Customer) => void }) {
  function input(key: keyof Customer, label: string) {
    return <label key={key}>{label}<input value={client[key]} onChange={e => update({ ...client, [key]: e.target.value })}/></label>;
  }
  return <div className="fields"><div className="row">{(Object.keys(addressFields) as (keyof typeof addressFields)[]).map(k => input(k, addressFields[k]))}</div>
    <label>Основной канал<select value={client.primaryChannel} onChange={e => update({ ...client, primaryChannel: e.target.value as Channel })}>{Object.entries(channels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
    {contacts.map(key => <div className="row" key={key}>{input((key + 'Name') as keyof Customer, 'Имя в ' + channels[key])}{input(key, 'Ссылка ' + channels[key])}</div>)}
    <label>Заметка о клиенте<textarea value={client.notes} onChange={e => update({ ...client, notes: e.target.value })}/></label>
  </div>;
}

function ProductEditor({ item, index, base, change, remove, onPending }: { item: Product; index: number; base: string; change: (patch: Partial<Product>) => void; remove: () => void; onPending: (pending: boolean) => void }) {
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const [reading, setReading] = useState(false);
  const activeRead = useRef(0);
  async function upload(files: FileList | null) {
    if (!files?.length || reading) return;
    setError('');
    const file = files[0];
    if (files.length !== 1 || !['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Выберите одно изображение до 5 МБ в формате JPEG, PNG, WebP, GIF или AVIF.'); return;
    }
    setReading(true); onPending(true);
    const token = ++activeRead.current;
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
      });
      const image = new Image(); image.src = data; await image.decode();
      if (token === activeRead.current) change({ image: data });
    } catch { setError('Не удалось прочитать изображение.'); }
    finally { setReading(false); onPending(false); }
  }
  return <section className="item-editor fields" aria-label={'Товар ' + (index + 1)}>
    <div className="row"><strong className="grow">Товар {index + 1}</strong><button type="button" disabled={reading} onClick={remove}>Удалить товар</button></div>
    <label>Название товара *<input value={item.name} maxLength={250} onChange={e => change({ name: e.target.value })}/></label>
    <label>Описание<textarea value={item.description} onChange={e => change({ description: e.target.value })}/></label>
    <div className="row"><label>Ссылка на товар<input type="url" placeholder="https://" value={item.url} onChange={e => { change({ url: e.target.value }); setPreview(false) }}/></label>
      <button type="button" onClick={() => {
        if (!validLink(item.url)) { setError('Введите ссылку HTTP или HTTPS.'); return }
        setPreview(true); setError('');
      }}>Предпросмотр ссылки</button></div>
    {preview && <p className="muted" role="status">{item.name || 'Товар'} · {new URL(item.url).hostname} · Локальный предпросмотр</p>}
    <div className="row"><label>Количество *<input type="number" min="1" step="1" value={item.quantity || ''} onChange={e => change({ quantity: Number(e.target.value) })}/></label>
      {(['cost', 'sale'] as const).map(field => <label key={field}>{field === 'cost' ? 'Цена за единицу, ₽' : 'Цена продажи, ₽'}<input type="number" min="0" step="0.01" value={Number.isFinite(item[field]) ? item[field] / 100 : ''} onChange={e => change({ [field]: Math.round(Number(e.target.value) * 100) })}/></label>)}</div>
    <div className="drop" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); void upload(e.dataTransfer.files) }}>
      <label>Фото товара · до 5 МБ<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={reading}
        onChange={e => { void upload(e.target.files); e.target.value = '' }}/></label>
      {reading && <span role="status">Загрузка фото…</span>}
      {item.image && <><img className="photo" width="100" src={original(base, item.image)} alt={item.name || 'Фото товара'}/><button type="button" onClick={() => change({ image: '' })}>Удалить фото</button></>}
    </div>{error && <p className="error" role="alert">{error}</p>}
  </section>;
}
function validLink(value: string) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}
export function OrderEditor({ initial, state, creating, initialTab = 'info', base, locked = false, onClose, onSave }: {
  initial: Order; state: Demo; creating: boolean; initialTab?: EditorTab; base: string; locked?: boolean; onClose: () => void; onSave: (order: Order, client: Customer) => void;
}) {
  const [order, setOrder] = useState(initial);
  const [client, setClient] = useState<Customer>(() => state.clients.find(c => c.id === initial.clientId) ?? emptyClient());
  const [tab, setTab] = useState<EditorTab>(initialTab);
  const [picker, setPicker] = useState(false);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [uploads, setUploads] = useState(0);
  const tabId = useId();
  const tabs: {key: EditorTab; label: string}[] = [{ key: 'info', label: 'Информация о заказе' }, { key: 'products', label: 'Товары' }, { key: 'customer', label: 'Данные клиента' }];
  if (order.board !== 'orders') tabs.push({ key: 'delivery', label: 'Доставка' });
  const patch = (fields: Partial<Order>) => setOrder(current => ({ ...current, ...fields }));
  function selectClient(c: Customer) { setClient(c); patch({ clientId: c.id, channel: c.primaryChannel }); setPicker(false) }
  function save() {
    if (!customerName(client).trim()) { setError('Укажите имя или телефон клиента.'); setTab('customer'); return }
    if (!order.date) { setError('Укажите дату заказа.'); setTab('info'); return }
    if (!order.products.length || order.products.some(p => !p.name.trim() || !Number.isSafeInteger(p.quantity) || p.quantity < 1 ||
      ![p.cost, p.sale].every(v => Number.isSafeInteger(v) && v >= 0) || (p.url && !validLink(p.url)))) {
      setError('Добавьте товар с названием, целым количеством от 1 и корректной ценой. Для ссылки используйте HTTP или HTTPS.'); setTab('products'); return;
    }
    if (!Number.isFinite(order.taxUsd) || order.taxUsd < 0) { setTab('delivery'); setError('Укажите корректный налог.'); return }
    const savedClient = { ...client, id: client.id || crypto.randomUUID() };
    onSave({ ...order, clientId: savedClient.id }, savedClient);
  }
  return <Dialog title={creating ? 'Новый заказ' : 'Заказ ' + order.id}
    description="Информация о заказе, товары и данные клиента — в отдельных вкладках." onClose={onClose}
    footer={<><button onClick={onClose}>Отмена</button><button className="primary" disabled={!!uploads} onClick={save}>{creating ? 'Создать заказ' : 'Сохранить изменения'}</button></>}>
    <Tabs compact tabs={tabs} value={tab} base={tabId} label="Разделы заказа" onChange={setTab}/>
    {error && <p role="alert" className="error">{error}</p>}
    <div className="fields" role="tabpanel" id={tabId + '-panel'} aria-labelledby={tabId + '-' + tab}>
      {tab === 'info' && <>
        <div className="row"><button type="button" disabled={locked} aria-label="Новый клиент" onClick={() => { selectClient(emptyClient()); setTab('customer') }}><Icon name="add"/></button>
          <div className="field grow">Клиент *<button type="button" disabled={locked} aria-expanded={picker} onClick={() => setPicker(!picker)}>{customerName(client) || 'Выбрать клиента'} <Icon name="search"/></button></div>
          <label>Откуда пришёл заказ<select value={order.channel} onChange={e => patch({ channel: e.target.value as Channel })}>{Object.entries(channels).map(([key,name]) => <option key={key} value={key}>{name}</option>)}</select></label></div>
        {picker && <div className="customer-picker"><label>Поиск клиента<input autoFocus value={filter} onChange={e => setFilter(e.target.value)}/></label>
          {state.clients.filter(c => [customerName(c),c.name,c.phone,c.telegramName,c.avitoName,c.vkName].join(' ').toLowerCase().includes(filter.toLowerCase())).map(c => <button key={c.id} onClick={() => selectClient(c)}>{customerName(c)}</button>)}</div>}
        <div className="row"><label>Дата заказа *<input type="date" value={order.date} onChange={e => patch({ date: e.target.value })}/></label>
          <label>Этап выкупа<select disabled={locked || order.board !== 'orders'} value={order.board === 'orders' && order.lane === 0 ? 0 : 1} onChange={e => patch({ lane: Number(e.target.value) as Lane, history: [] })}>
            {boards.orders.lanes.slice(0, 2).map((label,i) => <option key={label} value={i}>{label}</option>)}</select></label>
          <label>Номер заказа на сайте<input placeholder="Номер покупки в магазине" value={order.purchaseNumber} onChange={e => patch({ purchaseNumber: e.target.value })}/></label></div>
        <label>Заметка к заказу<textarea placeholder="Особенности заказа, договорённости с клиентом…" value={order.notes} onChange={e => patch({ notes: e.target.value })}/></label>
      </>}
      {tab === 'products' && <>
        <label>Магазин<input value={order.shop} disabled={locked} placeholder="Название или домен магазина" onChange={e => patch({ shop: e.target.value })}/></label>
        {order.products.map((item, index) => <ProductEditor key={item.id} item={item} index={index} base={base}
          change={fields => setOrder(current => ({ ...current, products: current.products.map(p => p.id === item.id ? { ...p, ...fields } : p) }))}
          remove={() => setOrder(current => ({ ...current, products: current.products.filter(p => p.id !== item.id) }))}
          onPending={pending => setUploads(n => n + (pending ? 1 : -1))}/>)}
        <div className="row"><button disabled={order.products.length >= 50} onClick={() => patch({ products: [...order.products, emptyProduct()] })}>Добавить товар</button>
          <button onClick={() => setError('Импорт из магазина недоступен в демоверсии.')}>Импорт из магазина</button></div>
      </>}
      {tab === 'customer' && <ClientFields client={client} update={setClient}/>}
      {tab === 'delivery' && <><label>Трек-номер<input value={order.track} onChange={e => patch({ track: e.target.value })}/></label>
        <label>Локальный трек-номер<input value={order.localTrack} onChange={e => patch({ localTrack: e.target.value })}/></label>
        <label>Налог, USD<input type="number" min="0" step="0.01" value={order.taxUsd} onChange={e => patch({ taxUsd: Number(e.target.value) })}/></label></>}
    </div>
  </Dialog>;
}
