export type LeadInProps = {
  children: React.ReactNode;
};

export function LeadIn({ children }: LeadInProps) {
  return <span className="text-xl italic font-bold">{children}</span>;
}
