import { MarkdocTagRegistration } from './types';
import Markdoc, { Config, Node, Tokenizer } from '@markdoc/markdoc';

export class MarkdocParser {
  config: Config;
  tokenizer: Tokenizer;

  constructor(tags: Record<string, MarkdocTagRegistration>) {
    this.config = this.buildMarkdocConfig(tags);
    this.tokenizer = new Markdoc.Tokenizer({ typographer: true });
  }

  parse(text: string) {
    return Markdoc.parse(this.tokenizer.tokenize(text));
  }

  transform(ast: Node) {
    return Markdoc.transform(ast, this.config);
  }

  private buildMarkdocConfig(tags: Record<string, MarkdocTagRegistration>): Config {
    const config: Config = {
      tags: {},
      nodes: {},
      partials: {},
    };

    for (const name in tags) {
      const { node, tag, ...schema } = tags[name];

      if (node) {
        config.nodes![node] = schema;
      }

      config.tags![tag || name] = schema;
    }

    return config;
  }
}
