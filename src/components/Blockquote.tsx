export type BlockquoteProps = {
  children: React.ReactNode;
};

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="pl-4 italic border-l-4 text-secondary border-background-alt">
      {children}
    </blockquote>
  );
}
