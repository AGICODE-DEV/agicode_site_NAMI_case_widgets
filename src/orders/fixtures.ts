import { boardIds, emptyOrder, type Customer, type Demo, type Lane, type Order, type Product } from './model';

const customers: Customer[] = [
  {
    "id": "c00",
    "name": "",
    "phone": "",
    "telegram": "https://t.me/nami_demo_polina",
    "telegramName": "Полина Лесная",
    "vk": "",
    "vkName": "",
    "avito": "https://www.avito.ru/user/nami-demo-polina/profile",
    "avitoName": "Полина Лесная",
    "region": "",
    "city": "",
    "address": "",
    "notes": "",
    "primaryChannel": "telegram"
  },
  {
    "id": "c01",
    "name": "Ветров Артём Александрович",
    "phone": "",
    "telegram": "",
    "telegramName": "",
    "vk": "",
    "vkName": "",
    "avito": "https://www.avito.ru/user/nami-demo-artem/profile",
    "avitoName": "Артём Ветров",
    "region": "Томская область",
    "city": "Томск",
    "address": "634000, Томская область, г. Томск, ул. Примерная, д. 14, кв. 26",
    "notes": "",
    "primaryChannel": "avito"
  },
  {
    "id": "c10",
    "name": "",
    "phone": "",
    "telegram": "https://t.me/nami_demo_sofia",
    "telegramName": "София Соколова",
    "vk": "",
    "vkName": "",
    "avito": "",
    "avitoName": "",
    "region": "",
    "city": "",
    "address": "",
    "notes": "",
    "primaryChannel": "telegram"
  },
  {
    "id": "c11",
    "name": "Белозёров Марк Александрович",
    "phone": "",
    "telegram": "",
    "telegramName": "",
    "vk": "https://vk.com/nami_demo_mark",
    "vkName": "Марк Белозёров",
    "avito": "",
    "avitoName": "",
    "region": "Тюменская область",
    "city": "Тюмень",
    "address": "625000, Тюменская область, г. Тюмень, ул. Примерная, д. 8, кв. 19",
    "notes": "",
    "primaryChannel": "vk"
  },
  {
    "id": "c20",
    "name": "Ясная Алиса Алексеевна",
    "phone": "",
    "telegram": "https://t.me/nami_demo_alisa",
    "telegramName": "Алиса Ясная",
    "vk": "",
    "vkName": "",
    "avito": "https://www.avito.ru/user/nami-demo-alisa/profile",
    "avitoName": "Алиса Ясная",
    "region": "Пермский край",
    "city": "Пермь",
    "address": "614000, Пермский край, г. Пермь, ул. Примерная, д. 21, кв. 45",
    "notes": "",
    "primaryChannel": "avito"
  },
  {
    "id": "c21",
    "name": "Озёрный Даниил Александрович",
    "phone": "",
    "telegram": "https://t.me/nami_demo_daniil",
    "telegramName": "Даниил Озёрный",
    "vk": "",
    "vkName": "",
    "avito": "",
    "avitoName": "",
    "region": "Свердловская область",
    "city": "Екатеринбург",
    "address": "620000, Свердловская область, г. Екатеринбург, ул. Примерная, д. 16, кв. 32",
    "notes": "",
    "primaryChannel": "telegram"
  },
  {
    "id": "c30",
    "name": "Луговая Вера Алексеевна",
    "phone": "",
    "telegram": "https://t.me/nami_demo_vera",
    "telegramName": "Вера Луговая",
    "vk": "",
    "vkName": "",
    "avito": "",
    "avitoName": "",
    "region": "Тульская область",
    "city": "Тула",
    "address": "300000, Тульская область, г. Тула, ул. Примерная, д. 9, кв. 17",
    "notes": "",
    "primaryChannel": "telegram"
  },
  {
    "id": "c31",
    "name": "Северный Лев Александрович",
    "phone": "",
    "telegram": "",
    "telegramName": "",
    "vk": "https://vk.com/nami_demo_lev",
    "vkName": "Лев Северный",
    "avito": "",
    "avitoName": "",
    "region": "Ярославская область",
    "city": "Ярославль",
    "address": "150000, Ярославская область, г. Ярославль, ул. Примерная, д. 25, кв. 38",
    "notes": "",
    "primaryChannel": "vk"
  },
  {
    "id": "c40",
    "name": "Зорина Мия Алексеевна",
    "phone": "",
    "telegram": "https://t.me/nami_demo_miya",
    "telegramName": "Мия Зорина",
    "vk": "",
    "vkName": "",
    "avito": "https://www.avito.ru/user/nami-demo-miya/profile",
    "avitoName": "Мия Зорина",
    "region": "Омская область",
    "city": "Омск",
    "address": "644000, Омская область, г. Омск, ул. Примерная, д. 11, кв. 24",
    "notes": "",
    "primaryChannel": "avito"
  },
  {
    "id": "c41",
    "name": "Речной Никита Александрович",
    "phone": "",
    "telegram": "https://t.me/nami_demo_nikita",
    "telegramName": "Никита Речной",
    "vk": "",
    "vkName": "",
    "avito": "",
    "avitoName": "",
    "region": "Новосибирская область",
    "city": "Новосибирск",
    "address": "630000, Новосибирская область, г. Новосибирск, ул. Примерная, д. 18, кв. 41",
    "notes": "",
    "primaryChannel": "telegram"
  }
];

const products: Product[] = [
  {
    "id": "p1",
    "name": "Daily Care Gentle Shampoo, 500 ml",
    "description": "Salon batch of 12 pump bottles, 500 ml each. Price is per bottle.",
    "quantity": 12,
    "cost": 139000,
    "sale": 0,
    "url": "https://example.invalid/products/shampoo",
    "image": "images/03c8c086a22c7e6d.jpg"
  },
  {
    "id": "p2",
    "name": "14-inch Ultrabook, 16 GB / 512 GB SSD",
    "description": "Lightweight silver laptop with a 14-inch display, 16 GB memory and a 512 GB SSD. Power adapter included.",
    "quantity": 1,
    "cost": 12490000,
    "sale": 0,
    "url": "https://example.invalid/products/laptop",
    "image": "images/4efe3d65a8f16968.jpg"
  },
  {
    "id": "p3",
    "name": "Summer Car Tire 205/55 R16",
    "description": "Set of four summer tires, size 205/55 R16. Rims not included. Price is per tire.",
    "quantity": 4,
    "cost": 5259000,
    "sale": 0,
    "url": "https://example.invalid/products/tire",
    "image": "images/6fb76ae1cf85e030.jpg"
  },
  {
    "id": "p4",
    "name": "Women's Linen Shirt, Size M",
    "description": "Relaxed white linen shirt with long sleeves and a button front. Size M, breathable fabric for everyday wear.",
    "quantity": 1,
    "cost": 1159000,
    "sale": 0,
    "url": "https://example.invalid/products/shirt",
    "image": "images/ff9fd69408823c92.jpg"
  },
  {
    "id": "p5",
    "name": "Women's Pleated Midi Skirt, Size M",
    "description": "Dusty rose pleated midi skirt with a fitted waistband. Size M, lightweight flowing fabric.",
    "quantity": 1,
    "cost": 1189000,
    "sale": 0,
    "url": "https://example.invalid/products/skirt",
    "image": "images/087586dd5c20c7ca.jpg"
  },
  {
    "id": "p6",
    "name": "2.4 m Spinning Rod & Reel Set",
    "description": "Two-piece graphite spinning rod with a 10–30 g casting weight. Includes a size 3000 spinning reel.",
    "quantity": 1,
    "cost": 3249000,
    "sale": 0,
    "url": "https://example.invalid/products/rod",
    "image": "images/0a6240dad3b265f5.jpg"
  },
  {
    "id": "p7",
    "name": "Women's Leather Shoulder Bag",
    "description": "Structured tan leather shoulder bag with a top handle, adjustable strap and gold-tone hardware.",
    "quantity": 1,
    "cost": 4349000,
    "sale": 0,
    "url": "https://example.invalid/products/handbag",
    "image": "images/dbe5acca698f658f.jpg"
  },
  {
    "id": "p8",
    "name": "Silk Twill Scarf, 90 × 90 cm",
    "description": "Silk twill scarf with a cream, navy and gold geometric print. Square shape, 90 × 90 cm.",
    "quantity": 1,
    "cost": 1129000,
    "sale": 0,
    "url": "https://example.invalid/products/scarf",
    "image": "images/2bf1936c32f1baec.jpg"
  },
  {
    "id": "p9",
    "name": "18 V Cordless Drill Driver",
    "description": "Two-speed cordless drill driver for home projects. Includes a battery and charger.",
    "quantity": 1,
    "cost": 2329000,
    "sale": 0,
    "url": "https://example.invalid/products/drill",
    "image": "images/71a6d53ee9f356a1.jpg"
  },
  {
    "id": "p10",
    "name": "Hydrating Face Cream, 50 ml",
    "description": "Daily moisturizing face cream in a 50 ml glass jar. Original sealed packaging.",
    "quantity": 1,
    "cost": 169000,
    "sale": 0,
    "url": "https://example.invalid/products/face-cream",
    "image": "images/063c71cb5294e62f.jpg"
  },
  {
    "id": "p11",
    "name": "Professional Makeup Brush Set",
    "description": "Eight soft synthetic brushes for face and eyes, supplied with a reusable beige cosmetic pouch.",
    "quantity": 1,
    "cost": 179000,
    "sale": 0,
    "url": "https://example.invalid/products/brush-set",
    "image": "images/b5b59bbe03a5a75f.jpg"
  },
  {
    "id": "p12",
    "name": "Men's Eau de Parfum, 50 ml",
    "description": "A warm woody eau de parfum in a 50 ml glass bottle. Supplied in its original packaging.",
    "quantity": 1,
    "cost": 1219000,
    "sale": 0,
    "url": "https://example.invalid/products/perfume",
    "image": "images/0fe447aeebf610ac.jpg"
  },
  {
    "id": "p13",
    "name": "Women's Leather Loafers, EU 38",
    "description": "A pair of cream leather loafers with gold-tone detailing. EU size 38, suitable for everyday wear.",
    "quantity": 1,
    "cost": 1249000,
    "sale": 0,
    "url": "https://example.invalid/products/loafers",
    "image": "images/38723632010f7f27.jpg"
  },
  {
    "id": "p14",
    "name": "Gold-Tone Hoop Earrings",
    "description": "A matching pair of polished gold-tone hoop earrings with secure clasps for everyday wear.",
    "quantity": 1,
    "cost": 189000,
    "sale": 0,
    "url": "https://example.invalid/products/earrings",
    "image": "images/5caa458c8684adbc.jpg"
  },
  {
    "id": "p15",
    "name": "Compact Espresso Machine",
    "description": "Compact stainless steel espresso machine with a portafilter, removable drip tray and steam wand for milk frothing.",
    "quantity": 1,
    "cost": 18899000,
    "sale": 0,
    "url": "https://example.invalid/products/coffee",
    "image": "images/3394d5a7b20a49fa.jpg"
  }
];

export function seedDemo(): Demo {
  const orders: Order[] = [];
  for (const [index, board] of boardIds.entries()) {
    for (let offset = 0; offset < 3; offset++) {
      const number = index * 3 + offset + 1;
      if (number === 14) continue;
      const client = customers[index * 2 + (offset === 2 ? 1 : 0)];
      const lanes: Lane[] = board === 'orders' ? [0, 1, 1] : board === 'russia' ? [0, 0, 1] : [1, 1, 0];
      orders.push({
        ...emptyOrder('N' + number, '2026-10-' + (29 - offset)),
        board, lane: lanes[offset], clientId: client.id, channel: client.primaryChannel,
        products: structuredClone(number === 13 ? products.slice(12, 14) : [products[number - 1]]),
        notes: ['Проверьте упаковку перед отправкой.', '', 'Отправить вместе с остальными покупками.'][offset],
        purchaseNumber: 'DEMO-' + (index + 1) + (offset + 1),
        shop: 'example.invalid',
        track: index ? 'DEMO-' + board.toUpperCase() + '-' + (101 + offset) : '',
        taxUsd: number === 7 ? 20 : 0,
      });
    }
  }
  return { orders, clients: structuredClone(customers), sequence: 16 };
}
