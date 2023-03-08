import { useLocation } from 'react-router-dom';

function MainContent() {
  const location = useLocation();
  return (
    <div>
      <div>
        <pre>{JSON.stringify(location, null, 2)}</pre>
		hello world
      </div>
    </div>
  );
}

export default MainContent;
