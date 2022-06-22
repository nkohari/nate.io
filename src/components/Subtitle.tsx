type SubtitleProps = {
  children: React.ReactNode;
};

export const Subtitle = ({ children }: SubtitleProps) => (
  <h2 className="text-lg text-gray-600 dark:text-gray-400">{children}</h2>
);
