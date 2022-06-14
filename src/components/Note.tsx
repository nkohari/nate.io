import { Icon, Link } from 'src/components';

export type NoteProps = {
  children: React.ReactNode;
  id: string;
};

export const Note = ({ children, id }: NoteProps) => {
  if (!children) {
    return (
      <span className="group text-slate-500">
        [
        <Link id={`note-ref-${id}`} href={`#note-${id}`} type="subtle">
          {id}
        </Link>
        ]
      </span>
    );
  }

  return (
    <div className="flex flex-row text-base mb-2">
      <a id={`note-${id}`} className="block mr-1 w-6">
        {id}.
      </a>
      <p className="flex-1">
        {children}
        <Link href={`#note-ref-${id}`} className="ml-1" type="subtle">
          <Icon type="jumpBack" size="small" />
        </Link>
      </p>
    </div>
  );
};
