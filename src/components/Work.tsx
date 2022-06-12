type WorkProps = {
  children: React.ReactNode;
  from: string;
  location: string;
  job: string;
  to: string;
};

export const Work = ({ children, from, job, location, to }: WorkProps) => (
  <section className="flex flex-col md:flex-row">
    <div className="flex-none italic w-28 mb-0.5 md:mb-0 md:mr-6">
      {from}&mdash;{to}
    </div>
    <div className="flex flex-col">
      <div className="font-bold">{job}</div>
      <div className="italic text-sm text-slate-600 dark:text-slate-400">{location}</div>
      <div className="mt-3">{children}</div>
    </div>
  </section>
);