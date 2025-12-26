type GridProps = {
  children: React.ReactNode;
  cols: number;
  gap?: number;
};

export function Grid({ children, cols, gap = 1 }: GridProps) {
  return <div className={`grid grid-cols-${cols} gap-${gap}`}>{children}</div>;
}
