import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const template = await readFile(new URL('src/demo/orders.html', root), 'utf8');
const catalog = JSON.parse(await readFile(new URL('public/nami-widgets/media/catalog.json', root), 'utf8'));
const products = Object.fromEntries(Object.entries(catalog.images).filter(([, entry]) => entry.variants).map(([key, entry]) => [key, {
  src: entry.src,
  srcSet: entry.variants.map(image => image.src + ' ' + image.width + 'w').join(', '),
}]));
const marker = '/* NAMI_PRODUCT_THUMBNAILS */ {}';
if (template.split(marker).length !== 2) throw new Error('The orders demo must contain one thumbnail catalog.');
const html = template.replace(marker, () => JSON.stringify(products).replaceAll('<', '\\u003c'));
const destination = new URL('public/nami-widgets/orders.html', root);
if (process.argv.includes('--check')) {
  if (await readFile(destination, 'utf8') !== html) throw new Error('Stale orders demo; run npm run media:build.');
} else {
  await writeFile(destination, html);
}
