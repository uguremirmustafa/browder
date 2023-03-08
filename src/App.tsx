import MainContent from 'components/layout/main-content';
import Breadcrumb from 'components/molecules/breadcrumb';
import ContextMenu from 'components/molecules/context-menu';
import { RouteObject, useRoutes } from 'react-router-dom';
import { buildMenuItems, createSidebarMenuTree } from 'utils/helper-functions/makeTree';
import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';
import menu from './menu.json';

function App() {
  const tree = createSidebarMenuTree(menu);
  const menuItems = buildMenuItems(menu);

  const routes: RouteObject[] = menuItems.map((x) => {
    return {
      path: x.path,
      element: <MainContent />,
    };
  });

  const route = useRoutes(routes);
  return (
    <>
      <ContextMenu />
      <AppContainer>
        <div className="border-b border-b-slate-700">
          <Breadcrumb menuItems={menuItems} />
        </div>
        <div className="grid grid-cols-12 h-[calc(100vh-7rem)]">
          <div className="col-span-3 border-r border-r-slate-700 h-full">
            <Sidebar tree={tree} />
          </div>
          <div className="col-span-9 p-2">{route}</div>
        </div>
      </AppContainer>
    </>
  );
}

export default App;
