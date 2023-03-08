import { Link, useLocation } from 'react-router-dom';
import { NestedMenuItem } from 'types';

interface IProps {
  menuItems: NestedMenuItem[];
}

function Breadcrumb(props: IProps) {
  const { menuItems } = props;
  const { pathname } = useLocation();
  const parts = ['/', ...pathname.split('/').filter((x) => x !== '')];

  return (
    <div className="flex items-center h-12 px-4">
      <ul className="flex gap-2">
        {parts.map((part, i) => {
          const item = menuItems.find((x) => x.pathPart === part);
          if (!item) return;
          const url = item?.path;
          const isLastItem = parts.length - 1 === i;
          return (
            <li key={i} className="flex gap-2 items-center">
              <Link to={url} className="hover:underline">
                {item.name}
              </Link>
              {!isLastItem && '/'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
