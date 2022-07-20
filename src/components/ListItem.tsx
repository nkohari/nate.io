export type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = ({ children }: ListItemProps) => {
  return <li className="pl-2 mb-4">{children}</li>;
};
