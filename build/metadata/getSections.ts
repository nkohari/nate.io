import { AstWalker, MetadataPluginParams } from '@nkohari/apocrypha';
import { ArticleSection, Metadata } from '../../src/types';
import { getRawText } from '../util';

export function getSections({ ast }: MetadataPluginParams<Metadata>) {
  const sections = AstWalker.findNodes(ast, 'heading').map((node) => {
    const text = getRawText(node);
    const level = node.attributes.level;
    const id = node.attributes.id;
    return { id, level, text } as ArticleSection;
  });

  return { sections };
}
