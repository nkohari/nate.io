import { useCatalog } from '@apocrypha/core/catalog';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Badge, DateString, Input, Link } from 'src/components';
import { Metadata } from 'src/types';
import { search } from 'src/util';

const abstractVariants = {
  visible: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
  },
};

type AbstractProps = {
  metadata: Metadata;
  path: string;
};

function Abstract({ metadata, path }: AbstractProps) {
  return (
    <motion.div initial={false} animate="visible" whileHover="hover" variants={abstractVariants}>
      <Link
        role="listitem"
        href={path}
        type="unstyled"
        className="flex flex-col -mx-8 px-8 py-6 rounded-lg border border-transparent hover:bg-slate-50 hover:border-slate-100 dark:hover:bg-slate-700 dark:hover:border-slate-600"
      >
        <h3 className="text-xl">{metadata.title}</h3>
        <div className="flex flex-row items-center mt-1 space-x-2">
          {metadata.date && (
            <DateString
              date={metadata.date}
              className="text-sm italic text-slate-500 dark:text-slate-400"
            />
          )}
          {metadata.state !== 'live' && <Badge icon={metadata.state} text={metadata.state} />}
        </div>
        <div className="text-md mt-2">{metadata.excerpt}</div>
      </Link>
    </motion.div>
  );
}

function SadMagnifyingGlass(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="5 6 24 24">
      <title>No results</title>
      <path d="M24.71,24.29a1,1,0,0,0-1-.24l-1.9-1.91a8.52,8.52,0,1,0-.71.71l1.91,1.91a1,1,0,0,0,.24.95l2.2,2.19a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41ZM10.2,21.8a7.5,7.5,0,1,1,10.6,0A7.49,7.49,0,0,1,10.2,21.8Z" />
      <path d="M11.65,16.35a.48.48,0,0,0,.7,0l.65-.64.65.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7L13.71,15l.64-.65a.49.49,0,0,0-.7-.7l-.65.64-.65-.64a.49.49,0,0,0-.7.7l.64.65-.64.65A.48.48,0,0,0,11.65,16.35Z" />
      <path d="M16.65,16.35a.48.48,0,0,0,.7,0l.65-.64.65.64a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7L18.71,15l.64-.65a.49.49,0,1,0-.7-.7l-.65.64-.65-.64a.49.49,0,0,0-.7.7l.64.65-.64.65A.48.48,0,0,0,16.65,16.35Z" />
      <path d="M19.5,18h-8a.5.5,0,0,0,0,1H13v1.5a1.5,1.5,0,0,0,3,0V19h3.5a.5.5,0,0,0,0-1ZM15,20.5a.5.5,0,0,1-1,0V19h1Z" />
    </svg>
  );
}

function NoResults() {
  return (
    <div className="flex flex-col items-center mt-24">
      <SadMagnifyingGlass className="w-32 fill-current" />
      <div className="mt-6 font-lg">No articles matching your search were found.</div>
    </div>
  );
}

export function LibraryBrowser() {
  const articles = useCatalog<Metadata>();
  const [query, setQuery] = useState<string>('');

  const matchingArticles = useMemo(() => search(Object.values(articles), query), [articles, query]);

  let content: React.ReactNode;

  if (matchingArticles.length === 0) {
    content = <NoResults />;
  } else {
    content = matchingArticles.map(({ metadata, path }) => (
      <Abstract key={path} path={path} metadata={metadata} />
    ));
  }

  return (
    <div className="h-full">
      <div className="flex flex-row items-center mb-8">
        <Input
          placeholder="Search for articles..."
          className="flex-1"
          icon="search"
          value={query}
          onChange={setQuery}
        />
      </div>
      {content}
    </div>
  );
}
