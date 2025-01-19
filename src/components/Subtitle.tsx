type SubtitleProps = {
  children: React.ReactNode;
};

export function Subtitle({ children }: SubtitleProps) {
  return <h2 className="text-xl text-secondary">{children}</h2>;
}
