import { Icon } from 'src/components';

type WorkProps = {
  children: React.ReactNode;
  from: string;
  location: string;
  job: string;
  note?: string;
  to: string;
};

export function Work({ children, from, job, note, location, to }: WorkProps) {
  return (
    <section className="flex flex-col md:flex-row my-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <Icon type="cube" />
          {job} {note && <span className="font-normal text-secondary">({note})</span>}
        </div>
        <div className="text-sm text-secondary">
          {from} &ndash; {to}, {location}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </section>
  );
}
