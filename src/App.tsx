import MainContent from 'components/layout/main-content';
import ContextMenu from 'components/molecules/context-menu';
import AppModal from 'components/molecules/modal';
import { Navigate, useRoutes } from 'react-router-dom';
import AppContainer from './components/layout/app-container';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/directory/1" />,
    },
    {
      path: '/directory/:directoryId',
      element: <MainContent />,
    },
    {
      path: '/file/:fileId',
      element: <MainContent />,
    },
  ]);
  return (
    <>
      <ContextMenu />
      <AppModal />
      <AppContainer>{routes}</AppContainer>
    </>
  );
}

export default App;
