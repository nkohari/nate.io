import toSource from 'to-source';
import { RenderableTreeNode } from '@markdoc/markdoc';

type ArticleTemplateProps = {
  componentsPath: string;
  content: RenderableTreeNode;
};

export const article = ({ componentsPath, content }: ArticleTemplateProps) =>
  `import React from 'react';
  import Markdoc from '@markdoc/markdoc';
  import * as components from '${componentsPath}';

  let content = ${toSource(content)};

  export default function ArticleComponent() {
    return Markdoc.renderers.react(content, React, { components });
  }

  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      content = newModule.content;
    });
  }`;
