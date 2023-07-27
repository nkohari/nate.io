import {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {shuffleArray} from 'src/util';

const SWITCH_INTERVAL = 10000;

const PHRASES = [
  'an organic bitshift operator',
  'a fairly small language model',
  'building things from thoughts',
  'science + art = engineering',
  'just teaching rocks to think',
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
  const shuffledPhrases = useMemo(() => shuffleArray(PHRASES), []);
  const [phrase, setPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase((prev) => {
        return prev === shuffledPhrases.length - 1 ? 0 : prev + 1;
      });
    }, SWITCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const letters = shuffledPhrases[phrase].split('').map((letter, index) => (
    <motion.span key={letter + index} variants={letterVariants} className="inline-block">
      {letter}
    </motion.span>
  ));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`phrase${phrase}`}
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
