import { MetadataPluginParams } from '@apocrypha/core';
import { DataArray, FeatureExtractionPipeline, pipeline } from '@huggingface/transformers';
import { Metadata } from '../../src/types';
import { getRawText } from '../util';

const EMBEDDING_MODEL = 'Xenova/bge-small-en-v1.5';

let generatorPromise: Promise<FeatureExtractionPipeline> | undefined;

async function getGenerator() {
  if (!generatorPromise) {
    generatorPromise = pipeline<'feature-extraction'>('feature-extraction', EMBEDDING_MODEL, {
      dtype: 'fp32',
    });
  }

  return generatorPromise;
}

function quantizeAndEncode(data: DataArray) {
  const floats = new Float32Array(Array.from(data));
  const int8Array = new Int8Array(floats.map((value) => Math.round(value * 127)));
  const bytes = new Uint8Array(int8Array.buffer);
  return btoa(String.fromCharCode(...bytes));
}

export async function getEmbeddings({ ast, metadata }: MetadataPluginParams<Metadata>) {
  if (metadata.type !== 'essay' && metadata.type !== 'belief') return;

  const text = [metadata.title, metadata.subtitle, metadata.excerpt, getRawText(ast)].join('\n\n');
  const generator = await getGenerator();

  const tensor = await generator(text, {
    pooling: 'mean',
    normalize: true,
  });

  return {
    embeddings: quantizeAndEncode(tensor.data),
  };
}
