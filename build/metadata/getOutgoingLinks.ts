import { MetadataPluginProps } from '../types';
import { findAllNodes } from '../util';

export function getOutgoingLinks({ ast }: MetadataPluginProps) {
  const outgoingLinks = findAllNodes(ast, (node) => node.type === 'link').map(
    (node) => node.attributes.href
  );

  if (outgoingLinks.length > 0) {
    return { outgoingLinks };
  }
}
