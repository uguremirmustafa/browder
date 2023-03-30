import { Link } from 'react-router-dom';

interface IProps {
  items: {
    name: string;
    id: number;
    isFolder: boolean;
  }[];
}
function Breadcrumb(props: IProps) {
  const { items } = props;

  return (
    <nav className="flex items-center h-12 px-4">
      <ol className="flex gap-2">
        {items.map((item, index) => {
          return (
            <li key={index} className="flex gap-2 items-center">
              <Link
                className="hover:bg-orange-500 px-1 rounded"
                to={`/${item.isFolder ? 'directory' : 'file'}/${item.id}`}
              >
                {item.name}
              </Link>
              {index === items.length - 1 ? '' : <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
