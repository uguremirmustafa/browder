import { IMenuItem } from 'types';

export function getPathFromName(name: IMenuItem['name']): string {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '');
}
