type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
}
