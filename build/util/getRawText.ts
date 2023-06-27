import {Node} from '@markdoc/markdoc';
import {AstWalker} from '@nkohari/apocrypha';

export function getRawText(ast: Node): string {
  return AstWalker.findNodes(ast, 'text')
    .map((node) => node.attributes.content)
    .join(' ');
}
