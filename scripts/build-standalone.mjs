import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const root = new URL('../', import.meta.url);
const output = new URL('public/nami-widgets/', root);
await mkdir(output, { recursive: true });
const result = await build({
  configFile: false, root: fileURLToPath(root), publicDir: false, plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: { write: false, minify: true, lib: { entry: fileURLToPath(new URL('src/demo/standalone.tsx', root)), name: 'NamiOrdersDemo', formats: ['iife'] } },
});
const chunk = [result].flat().flatMap(bundle => bundle.output).find(file => file.type === 'chunk' && file.isEntry);
if (!chunk) throw new Error('Missing standalone orders bundle.');
// Inline the production bundle so the opaque compatibility frame needs no module requests.
const script = chunk.code.replace(/<\/script/gi, '<\\/script');
const hash = createHash('sha256').update(script).digest('base64');
const template = await readFile(new URL('src/demo/orders.html', root), 'utf8');
await writeFile(new URL('orders.html', output), template.replace('{{SCRIPT_HASH}}', hash).replace('{{ORDERS_SCRIPT}}', () => script));
