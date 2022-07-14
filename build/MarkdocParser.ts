import Markdoc, { Config, Node, Tokenizer } from '@markdoc/markdoc';
import { ArticleMetadata } from '../src/types';
import { MarkdocTagRegistration } from './types';

export type MarkdocParserProps = {
  tags: MarkdocTagRegistration[];
};

export class MarkdocParser {
  config: Config;
  tokenizer: Tokenizer;

  constructor({ tags }: MarkdocParserProps) {
    this.tokenizer = new Markdoc.Tokenizer({ typographer: true });

    this.config = {
      tags: {},
      nodes: {},
      partials: {},
    };

    for (const tag of tags) {
      this.register(tag);
    }
  }

  register(registration: MarkdocTagRegistration) {
    const { node, tag, ...schema } = registration;
    if (node) {
      this.config.nodes![node] = schema;
    }
    if (tag) {
      this.config.tags![tag] = schema;
    }
  }

  parse(text: string) {
    return Markdoc.parse(this.tokenizer.tokenize(text));
  }

  transform(ast: Node, metadata: ArticleMetadata) {
    return Markdoc.transform(ast, { ...this.config, metadata });
  }
}
