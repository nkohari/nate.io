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
    <section className="flex flex-col md:flex-row mb-2">
      <div className="flex flex-col">
        <div className="text-xl font-semibold">
          {job}{' '}
          {note && <span className="font-normal text-slate-600 dark:text-slate-400">({note})</span>}
        </div>
        <div className="italic mb-0.5 text-sm text-slate-600 dark:text-slate-400">
          {from} &ndash; {to}, {location}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </section>
  );
}
