import {useCallback, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {shuffleArray, useInterval, useReducedMotion} from 'src/util';

const SWITCH_INTERVAL = 15000;

const PHRASES = [
  'an organic bitshift operator',
  'a fairly small language model',
  'building things from thoughts',
  'science + art = engineering',
  'just teaching rocks to think',
  "it's discord & rhyme",
];

const letterVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.1},
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: {duration: 0.1},
  },
};

export const Tagline = () => {
  const reducedMotion = useReducedMotion();
  const shuffledPhrases = useMemo(() => shuffleArray(PHRASES), []);
  const [phrase, setPhrase] = useState(0);

  const changePhrase = useCallback(() => {
    if (!reducedMotion) {
      setPhrase((prev) => {
        const next = prev === shuffledPhrases.length - 1 ? 0 : prev + 1;
        console.log({prev, next});
        return next;
      });
    }
  }, [reducedMotion, setPhrase, shuffledPhrases.length]);

  useInterval(SWITCH_INTERVAL, changePhrase);

  const letters = shuffledPhrases[phrase].split('').map((letter, index) => (
    <motion.span
      key={`letter.${phrase}.${index}`}
      variants={letterVariants}
      className="inline-block"
    >
      {letter}
    </motion.span>
  ));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`phrase.${phrase}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{staggerChildren: 0.015}}
        className="text-[15px] whitespace-pre"
      >
        {letters}
      </motion.div>
    </AnimatePresence>
  );
};
