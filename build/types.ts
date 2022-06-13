import { Node, NodeType } from '@markdoc/markdoc';

export type Article = {
  ast: Node;
  chunkId: string;
  filename: string;
  hash: string;
  metadata: Record<string, any>;
  path: string;
};

export type MetadataPluginProps = {
  ast: Node;
  metadata: Record<string, any>;
};

export type MetadataPlugin = (props: MetadataPluginProps) => Record<string, any>;

export type MarkdocTagRegistration = {
  node?: NodeType;
  tag?: string;
  render?: string;
};
