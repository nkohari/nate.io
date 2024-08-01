import {
  MarkdocConfigWithMetadata,
  MarkdocDeclaration as BaseMarkdocDeclaration,
} from '@apocrypha/core';
import { Metadata } from '../src/types';

export type MarkdocConfig = MarkdocConfigWithMetadata<Metadata>;
export type MarkdocDeclaration = BaseMarkdocDeclaration<Metadata>;
