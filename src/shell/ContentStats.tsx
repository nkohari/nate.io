import { ArticleMetadata } from '../types';
import { ordinal } from '../util';

type ContentStatsProps = {
  metadata: ArticleMetadata;
};

export const ContentStats = ({ metadata }: ContentStatsProps) => {
  const { counts, gradeLevel, type } = metadata;

  if (!counts || !gradeLevel) {
    return null;
  }

  return (
    <span className="ml-1 before:content-['—'] before:mr-1">
      {counts.words.toLocaleString()} words, written in {type} style, at the{' '}
      {gradeLevel > 12 ? 'college' : `${ordinal(gradeLevel)} grade`} reading level
    </span>
  );
};
