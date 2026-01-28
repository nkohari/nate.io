import cx from 'classnames';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { randomInteger, useInterval } from 'src/util';
import { AvatarImage } from './AvatarImage';

const MIN_FLIP_TIME = 7500;
const MAX_FLIP_TIME = 15000;

const cardVariants = {
  front: {
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 100, mass: 0.5 },
  },
  back: {
    scale: 1,
    rotateY: 180,
    transition: { type: 'spring', stiffness: 100, mass: 0.5 },
  },
  hover: (position: number) => ({
    scale: 1.15,
    rotate: position % 2 === 0 ? 3 : -3,
    transition: { type: 'spring', stiffness: 120, damping: 10, mass: 0.5 },
  }),
};

type AvatarCardProps = {
  position: number;
  visibleFace: 'front' | 'back';
  frontUrl: string;
  backUrl: string;
  onFlip: () => void;
};

export function AvatarCard({ position, visibleFace, frontUrl, backUrl, onFlip }: AvatarCardProps) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    controls.start(visibleFace);
  }, [controls, visibleFace]);

  useEffect(() => {
    const handleKeypress = (event: KeyboardEvent) => {
      if (event.code === `Digit${position}`) {
        onFlip();
      }
    };
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  });

  useInterval(randomInteger(MIN_FLIP_TIME, MAX_FLIP_TIME), () => {
    if (!reducedMotion) onFlip();
  });

  const classes = cx(
    'relative aspect-square w-1/3 sm:w-1/4 transform-3d z-1 hover:z-10 rounded-lg shadow-md outline-1 outline-background-alt',
    position > 3 && 'hidden sm:block',
  );

  return (
    <motion.div
      role="button"
      aria-roledescription="avatar card"
      onClick={onFlip}
      className={classes}
      initial={false}
      animate={visibleFace}
      whileHover="hover"
      variants={cardVariants}
      custom={position}
    >
      <AvatarImage src={frontUrl} />
      <AvatarImage src={backUrl} flip />
    </motion.div>
  );
}
