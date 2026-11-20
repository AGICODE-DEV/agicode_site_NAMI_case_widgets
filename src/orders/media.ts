import { imageProps } from '../shared/imageProps';

type CatalogImage = Parameters<typeof imageProps>[1];
export function thumbnail(base: string, key: string) {
  if (key.startsWith('data:')) return { src: key };
  return imageProps(base, key as CatalogImage);
}
export function original(base: string, key: string) {
  return key.startsWith('data:') ? key : base.replace(/\/$/, '') + '/' + key;
}
