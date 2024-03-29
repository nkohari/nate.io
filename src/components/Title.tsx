type TitleProps = {
  children: React.ReactNode;
};

export const Title = ({children}: TitleProps) => <h1 className="text-4xl font-bold">{children}</h1>;
