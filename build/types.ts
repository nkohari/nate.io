import {
  MarkdocConfigWithMetadata,
  MarkdocDeclaration as BaseMarkdocDeclaration,
} from '@nkohari/apocrypha';
import {Metadata} from '../src/types';

export type MarkdocConfig = MarkdocConfigWithMetadata<Metadata>;
export type MarkdocDeclaration = BaseMarkdocDeclaration<Metadata>;
