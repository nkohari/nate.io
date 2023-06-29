import {Node} from '@markdoc/markdoc';
import {AstWalker} from '@nkohari/apocrypha';

// This is a very naïve implementation, but it works well enough for what we need.
// Find all text nodes, extract their content chunks, join the chunks with spaces,
// and then remove any spaces before punctuation (which will be created by the
// join when non-text nodes like links are adjacent to a period).
export function getRawText(ast: Node): string {
  return AstWalker.findNodes(ast, 'text')
    .map((node) => node.attributes.content)
    .join(' ')
    .replaceAll(/\s+([^\w\s]+)/g, '$1');
}
