import { MetadataPluginParams } from '@apocrypha/core';
import readingTime from 'reading-time';
import readability from 'text-readability';
import { Metadata } from '../../src/types';
import { getRawText } from '../util';

export function getContentStats({ ast, metadata }: MetadataPluginParams<Metadata>) {
  if (metadata.type !== 'essay') return;

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
