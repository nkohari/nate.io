export type BlockquoteProps = {
  children: React.ReactNode;
};

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="pl-4 italic border-l-4 text-slate-600 border-slate-300 dark:text-slate-400 dark:border-slate-600">
      {children}
    </blockquote>
  );
}
