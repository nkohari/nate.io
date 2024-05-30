type SubtitleProps = {
  children: React.ReactNode;
};

export function Subtitle({ children }: SubtitleProps) {
  return <h2 className="text-lg text-gray-600 dark:text-gray-400">{children}</h2>;
}
