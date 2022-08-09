import { Node } from '@markdoc/markdoc';
import { MarkdocTagRegistration } from '../types';
import { getRawText } from '../util';

export function generateId(node: Node, schema: MarkdocTagRegistration) {
  if (!node.attributes.id) {
    node.attributes.id = getRawText(node)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
