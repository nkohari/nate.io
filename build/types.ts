import { Node, NodeType } from '@markdoc/markdoc';
import { ArticleMetadata } from '../src/types';

export type ArticleBuildInfo = {
  ast: Node;
  chunkId: string;
  filename: string;
  hash: string;
  metadata: ArticleMetadata;
  path: string;
};

export type MetadataPluginProps = {
  ast: Node;
  metadata: Partial<ArticleMetadata>;
};

export type MetadataPlugin = (props: MetadataPluginProps) => Partial<ArticleMetadata>;

export type MarkdocTagRegistration = {
  node?: NodeType;
  tag?: string;
  render?: string;
};

export type NodePredicate = (node: Node) => boolean;
export type NodeReducer<T> = (state: T, node: Node) => T;
