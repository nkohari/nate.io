export type LeadInProps = {
  children: React.ReactNode;
};

export const LeadIn = ({ children }: LeadInProps) => <span className="font-bold">{children}</span>;
