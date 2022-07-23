import { Link } from 'src/components';
import { ArticleSection } from 'src/types';

type SectionListItemProps = {
  section: ArticleSection;
};

const SectionListItem = ({ section }: SectionListItemProps) => (
  <div className="mb-1">
    <Link href={`#${section.id}`}>{section.text}</Link>
  </div>
);

export type TableOfContentsProps = {
  sections: ArticleSection[];
};

export const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const items = sections
    .filter((section) => section.level === 2)
    .map((section) => <SectionListItem section={section} />);

  return (
    <div className="hidden xl:block w-60 mt-[172px] pr-16 h-full">
      <div className="leading-loose text-base font-semibold border-b border-slate-400 dark:border-slate-600">
        On this page
      </div>
      <div className="text-sm h-72 min-h-max pt-4">{items}</div>
    </div>
  );
};
