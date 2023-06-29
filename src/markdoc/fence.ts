import Markdoc, {Node, Tag, RenderableTreeNode} from '@markdoc/markdoc';
import {MarkdocDeclaration} from 'build/types';
import Prism from 'prismjs';
import {MarkdocConfig} from 'build/types';

// NB: This is a (still pretty-hacky) experiment in pulling Prism tokens out and treating
// them more like Markdoc nodes. I wouldn't recommend this approach, at least until I can
// get some more bugs shaken out.

const WHITESPACE_REGEXP = /^\s+$/;

function createStringTag(content: string): Tag {
  const type = content.match(WHITESPACE_REGEXP) ? 'whitespace' : 'string';
  return new Markdoc.Tag('CodeBlockToken', {content, type});
}

function* transformPrismTokens(tokens: (Prism.Token | string)[]): Generator<Tag | 'newline'> {
  for (const token of tokens) {
    yield* transformPrismToken(token);
  }
}

function* transformPrismToken(token: Prism.Token | string): Generator<Tag | 'newline'> {
  if (typeof token === 'string') {
    if (token === '\n') {
      yield 'newline';
    } else if (token.indexOf('\n') < 0) {
      yield createStringTag(token);
    } else {
      const substrings = token.split('\n');
      for (let idx = 0; idx < substrings.length; idx++) {
        if (substrings[idx].length > 0) {
          yield createStringTag(substrings[idx]);
        }
        if (idx !== substrings.length - 1) {
          yield 'newline';
        }
      }
    }
  } else {
    if (Array.isArray(token.content)) {
      const children = [...transformPrismTokens(token.content)];
      yield new Markdoc.Tag('CodeBlockToken', {type: token.type}, children);
    } else {
      yield new Markdoc.Tag('CodeBlockToken', {content: token.content, type: token.type});
    }
  }
}

export const fence: MarkdocDeclaration = {
  node: 'fence',
  render: 'CodeBlock',
  attributes: {
    content: {type: String},
    language: {type: String},
  },
  transform(node: Node, config: MarkdocConfig) {
    const attributes = node.transformAttributes(config);

    // TODO: language
    const tokens = Prism.tokenize(attributes.content, Prism.languages.javascript);

    const lines: Tag[] = [];
    let currentLineChildren: RenderableTreeNode[] = [];

    for (const item of transformPrismTokens(tokens)) {
      if (item === 'newline') {
        lines.push(
          new Markdoc.Tag('CodeBlockLine', {number: lines.length + 1}, currentLineChildren),
        );
        currentLineChildren = [];
      } else {
        currentLineChildren.push(item);
      }
    }

    return new Markdoc.Tag(this.render, attributes, lines);
  },
};
