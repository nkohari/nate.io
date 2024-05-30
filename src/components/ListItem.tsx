export type ListItemProps = {
  children: React.ReactNode;
};

export function ListItem({ children }: ListItemProps) {
  return <li className="pl-2">{children}</li>;
}
