import Markdoc, { Config, Node, Tokenizer } from '@markdoc/markdoc';
import { ArticleMetadata } from '../src/types';
import { MarkdocTagRegistration, ParserPlugin } from './types';

export type MarkdocParserProps = {
  plugins?: ParserPlugin[];
  tags: MarkdocTagRegistration[];
};

export class MarkdocParser {
  config: Config;
  plugins: ParserPlugin[];
  tokenizer: Tokenizer;

  constructor({ plugins, tags }: MarkdocParserProps) {
    this.plugins = plugins || [];
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
    const node = Markdoc.parse(this.tokenizer.tokenize(text));
    return this.plugins.reduce((ast, plugin) => plugin({ ast }), node);
  }

  transform(ast: Node, metadata: ArticleMetadata) {
    return Markdoc.transform(ast, { ...this.config, metadata });
  }
}
