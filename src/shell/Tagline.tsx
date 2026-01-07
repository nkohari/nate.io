import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

const PHRASES = [
  'an organic bitshift operator',
  'a comparatively small language model',
  'science + art = engineering',
  'just teaching rocks to think',
  'patiently async/await-ing the singularity',
  'probably off by one somewhere',
  'scope creep enthusiast',
  'the only constant is O(1)',
  "i'm NaN% sure this will work",
  'carefully refactoring the ship of Theseus',
  'a temperature=2.0 kind of guy',
  'hallucinating with 100% confidence',
  'attention is all you need (and 80GB of VRAM)',
  "it's all just spicy linear algebra",
];

const ROTATION_DELAY = 10000;

const variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export function Tagline() {
  const startingIndex = useMemo(() => Math.floor(Math.random() * PHRASES.length), []);
  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
    }, ROTATION_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[15px] whitespace-pre relative h-[22px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {PHRASES[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
