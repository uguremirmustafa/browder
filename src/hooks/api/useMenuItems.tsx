import { useLiveQuery } from 'dexie-react-hooks';
import { menuItemTable } from 'lib/db';
import { IMenuItem } from 'types';

// export interface UseMenuItemsResponse {
//   colorSettings: Record<ColorSettingName, Setting<ColorName>>;
// }

function useMenuItems() {
  const menuItemsData = useLiveQuery(
    async () => {
      const data = await menuItemTable.toArray();
      return data;
    },
    [],
    [] as IMenuItem[]
  );

  return menuItemsData;
}

export default useMenuItems;
