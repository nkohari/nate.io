import { Node, NodeType, Schema } from '@markdoc/markdoc';
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

export type MetadataPlugin = (props: MetadataPluginProps) => Partial<ArticleMetadata> | undefined;

export type MarkdocTagRegistration = Schema & {
  node?: NodeType;
  tag?: string;
};

export type NodePredicate = (node: Node) => boolean;
export type NodeReducer<T> = (state: T, node: Node) => T;
