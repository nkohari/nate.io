import {MetadataPluginParams} from '@nkohari/apocrypha';
import readingTime from 'reading-time';
// @ts-ignore
import readability from 'text-readability';
import {Metadata} from '../../src/types';
import {getRawText} from '../util';

export function getContentStats({ast, metadata}: MetadataPluginParams<Metadata>) {
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
