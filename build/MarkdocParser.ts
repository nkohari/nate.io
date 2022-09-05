import Markdoc, { transformer, Config, Node, Tokenizer } from '@markdoc/markdoc';
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
    const document = Markdoc.parse(this.tokenizer.tokenize(text));

    const callMutators = (node: Node) => {
      if (node.children) {
        for (const child of node.children) {
          callMutators(child);
        }
      }

      const schema = transformer.findSchema(node, this.config) as MarkdocTagRegistration;

      if (schema && schema.mutators) {
        for (const mutator of schema.mutators) {
          mutator({ node, schema });
        }
      }
    };

    callMutators(document);

    return document;
  }

  transform(ast: Node, metadata: ArticleMetadata) {
    return Markdoc.transform(ast, { ...this.config, metadata });
  }
}
