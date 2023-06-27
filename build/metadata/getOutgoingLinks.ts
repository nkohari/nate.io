import {AstWalker, MetadataPluginParams} from '@nkohari/apocrypha';
import {Metadata} from '../../src/types';

export function getOutgoingLinks({ast}: MetadataPluginParams<Metadata>) {
  const outgoingLinks: string[] = AstWalker.findNodes(ast, 'link').map(
    (node) => node.attributes.href
  );

  if (outgoingLinks.length > 0) {
    return {outgoingLinks};
  }
}
