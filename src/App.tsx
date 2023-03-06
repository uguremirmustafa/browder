import MainContent from 'components/layout/main-content';
import { RouteObject, useRoutes } from 'react-router-dom';
import { buildMenuItems } from 'utils/helper-functions/makeTree';
import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';
import menu from './menu.json';

function App() {
  const routes: RouteObject[] = buildMenuItems(menu).map((x) => {
    return {
      path: x.path,
      element: <MainContent />,
    };
  });

  const route = useRoutes(routes);
  return (
    <AppContainer>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-3">
          <Sidebar menu={menu} />
        </div>
        <div className="col-span-9 p-2">{route}</div>
      </div>
    </AppContainer>
  );
}

export default App;
