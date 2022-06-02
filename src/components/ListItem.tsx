export type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = ({ children }: ListItemProps) => {
  return <li className="ml-4 pl-2 mb-4">{children}</li>;
};
