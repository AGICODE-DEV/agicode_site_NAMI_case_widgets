import catalog from '../../public/nami-widgets/media/catalog.json';

type ImageKey = keyof typeof catalog.images;
type Variant = { src: string; width: number };
type Entry = { src: string; variants?: Variant[] };

export function imageProps(assetBasePath: string, key: ImageKey) {
  const base = assetBasePath.replace(/\/$/, '') + '/';
  const image: Entry = catalog.images[key];
  if (!image.variants) return { src: base + image.src };
  return {
    src: base + image.src,
    srcSet: image.variants.map(variant => base + variant.src + ' ' + variant.width + 'w').join(', '),
    sizes: '52px',
  };
}
