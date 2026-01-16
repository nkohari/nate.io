import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Icon, Link } from 'src/components';

const FLASH_DURATION = 1000;

export type NoteProps = {
  children: React.ReactNode;
  id: string;
};

export function Note({ children, id }: NoteProps) {
  const [shouldFlash, setShouldFlash] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === `#note-${id}` || window.location.hash === `#note-ref-${id}`) {
        setShouldFlash(true);
        setTimeout(() => setShouldFlash(false), FLASH_DURATION);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => window.removeEventListener('hashchange', checkHash);
  }, [id]);

  if (!children) {
    return (
      <Link
        id={`note-ref-${id}`}
        href={`#note-${id}`}
        type="block"
        className={cx(
          'font-semibold text-[11px] mx-[3px] px-[6px] py-[3px] rounded-xs transition-colors duration-250',
          shouldFlash ? 'bg-link-hover' : 'bg-link',
        )}
      >
        {id}
      </Link>
    );
  }

  return (
    <div
      className={cx(
        'flex flex-row text-sm mb-4 rounded-lg px-2 -mx-2 transition-colors duration-250',
        shouldFlash ? 'bg-background-alt' : 'bg-transparent',
      )}
    >
      <span id={`note-${id}`} className="block mr-1 w-6">
        {id}.
      </span>
      <p className="flex-1">
        {children}
        <Link href={`#note-ref-${id}`} className="inline-flex items-center ml-1" type="subtle">
          <Icon type="jumpBack" size="small" />
        </Link>
      </p>
    </div>
  );
}
