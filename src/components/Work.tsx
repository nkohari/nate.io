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
          {job} {note && <span className="font-normal text-secondary">({note})</span>}
        </div>
        <div className="mb-1 text-sm text-secondary">
          {from} &ndash; {to}, {location}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </section>
  );
}
