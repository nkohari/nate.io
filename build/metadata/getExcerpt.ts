import { AstWalker, MetadataPluginParams } from '@apocrypha/core';
import { Metadata } from '../../src/types';
import { getRawText } from '../util';

export function getExcerpt({ ast }: MetadataPluginParams<Metadata>) {
  const firstParagraph = AstWalker.findNode(ast, 'paragraph');

  if (firstParagraph) {
    return { excerpt: getRawText(firstParagraph) };
  }
}
