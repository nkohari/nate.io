import { Input } from 'src/components';
import { useArticles } from 'src/shell/ArticleSearchProvider';

type ArticleSearchProps = {
  placeholder?: string;
};

export function ArticleSearch({ placeholder = 'Type to match articles...' }: ArticleSearchProps) {
  const { query, setQuery } = useArticles();

  return (
    <Input
      icon="search"
      placeholder={placeholder}
      value={query}
      onChange={setQuery}
      className="w-full mb-6"
    />
  );
}
