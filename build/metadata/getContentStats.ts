import readingTime from 'reading-time';
import readability from 'text-readability';
import { MetadataPluginProps } from '../types';
import { getRawText } from '../util';

export function getContentStats({ metadata, ast }: MetadataPluginProps) {
  if (metadata.type === 'music') return;

  const text = getRawText(ast);
  const stats = readingTime(text);
  const sentences = readability.sentenceCount(text);
  const gradeLevel = readability.textStandard(text, true);

  return {
    gradeLevel,
    readingTime: stats.time,
    counts: {
      words: stats.words,
      sentences,
    },
  };
}
