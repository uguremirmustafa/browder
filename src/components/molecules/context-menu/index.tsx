import { useRightClick } from 'context/right-click-context';
import useOutsideClick from 'hooks/useOutsideClick';
import { useRef } from 'react';

function ContextMenu() {
  const { ctxMenu, close } = useRightClick();
  const { isOpen, x, y, children } = ctxMenu;

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick([ref], close);

  if (!isOpen || !children) {
    return null;
  }

  return (
    <div ref={ref} className="absolute bg-blue-900 rounded" style={{ top: y, left: x }}>
      {children}
    </div>
  );
}

export default ContextMenu;
