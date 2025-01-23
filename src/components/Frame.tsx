type FrameProps = {
  children: React.ReactNode;
};

export function Frame({ children }: FrameProps) {
  return <div className="px-6 py-4 -mx-6 my-6 bg-background-dim rounded-lg">{children}</div>;
}
