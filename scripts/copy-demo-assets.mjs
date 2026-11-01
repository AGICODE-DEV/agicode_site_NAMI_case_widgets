import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const target = new URL('./dist/nami-widgets/', root);
await mkdir(fileURLToPath(target), { recursive: true });
await Promise.all(['telegram.html', 'automation.html', 'mini.js'].map(name => rm(new URL(name, target), { force: true }))); 
await cp(new URL('./public/nami-widgets/orders.html', root), new URL('./orders.html', target));
await cp(new URL('./public/nami-widgets/images/', root), new URL('./images/', target), { recursive: true });
