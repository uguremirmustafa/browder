import { Dexie } from 'dexie';
import { IMenuItem } from 'types';
import menu from '../menu.json';

class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  menuItem!: Dexie.Table<IMenuItem, number>; // number = type of the primkey

  constructor() {
    super('MyAppDatabase');
    this.version(1).stores({
      menuItem: '++id,name,path,parentId',

      //...other tables goes here...
    });
  }
}

export const db = new MyAppDatabase();

export const menuItemTable = db.menuItem;
menuItemTable.bulkAdd(menu);
