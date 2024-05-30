export type LeadInProps = {
  children: React.ReactNode;
};

export function LeadIn({ children }: LeadInProps) {
  return <span className="font-bold">{children}</span>;
}
