import { RightGutter, Subtitle, Title } from 'src/components';
import { Metadata } from 'src/types';

type PageLayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export function PageLayout({ children, metadata }: PageLayoutProps) {
  const { title, subtitle } = metadata;

  let header: React.ReactNode;

  if (title) {
    header = (
      <header className="mb-8">
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </header>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col">
        {header}
        {children}
      </div>
      <RightGutter />
    </>
  );
}
