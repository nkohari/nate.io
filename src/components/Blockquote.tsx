export type BlockquoteProps = {
  children: React.ReactNode;
};

export const Blockquote = ({ children }: BlockquoteProps) => (
  <p className="pl-4 border-l-4 border-slate-400">{children}</p>
);
