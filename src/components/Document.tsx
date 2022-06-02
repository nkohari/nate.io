export type DocumentProps = {
  children: React.ReactNode;
};

export const Document = ({ children }: DocumentProps) => (
  <article className="flex-1 w-full">{children}</article>
);
