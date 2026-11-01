import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const target = new URL('./dist/nami-widgets/', root);
await mkdir(fileURLToPath(target), { recursive: true });
await cp(new URL('./public/nami-widgets/', root), target, { recursive: true });
