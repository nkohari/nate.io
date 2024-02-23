import {useMemo} from 'react';
import {randomArrayElement} from 'src/util';

const PHRASES = [
  'an organic bitshift operator',
  'a fairly small language model',
  'science + art = engineering',
  'just teaching rocks to think',
];

export const Tagline = () => {
  const phrase = useMemo(() => randomArrayElement(PHRASES), []);
  return <div className="text-[15px] whitespace-pre">{phrase}</div>;
};
