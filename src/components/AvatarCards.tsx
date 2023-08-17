import {useEffect, useState} from 'react';
import cx from 'classnames';
import {motion, useAnimationControls, useReducedMotion} from 'framer-motion';
import {
  getAllImagesInFolder,
  randomArrayElement,
  randomInteger,
  shuffleArray,
  useInterval,
} from 'src/util';

const MIN_FLIP_TIME = 7500;
const MAX_FLIP_TIME = 15000;

const cardVariants = {
  front: {
    scale: 1,
    rotateY: 0,
    transition: {type: 'spring', stiffness: 100, mass: 0.5},
  },
  back: {
    scale: 1,
    rotateY: 180,
    transition: {type: 'spring', stiffness: 100, mass: 0.5},
  },
  hover: (position: number) => ({
    scale: 1.15,
    rotate: position % 2 === 0 ? 3 : -3,
    transition: {type: 'spring', stiffness: 120, damping: 10, mass: 0.5},
  }),
};

type AvatarImageProps = {
  src: string;
  flip?: boolean;
};

const AvatarImage = ({flip = false, src}: AvatarImageProps) => (
  <img
    src={src}
    className={cx(
      'absolute rounded-lg shadow-md backface-hidden aspect-square',
      flip && 'rotate-y-180',
    )}
    height={280}
    width={280}
    draggable={false}
    alt="A picture of me (Nate)"
  />
);

type AvatarCardProps = {
  position: number;
  urls: string[];
};

const AvatarCard = ({position, urls}: AvatarCardProps) => {
  const controls = useAnimationControls();
  const [visibleFace, setVisibleFace] = useState('front');
  const [frontUrl, setFrontUrl] = useState(randomArrayElement(urls));
  const [backUrl, setBackUrl] = useState(randomArrayElement(urls));
  const reducedMotion = useReducedMotion();

  const flipCard = () => {
    if (visibleFace === 'front') setVisibleFace('back');
    else setVisibleFace('front');
  };

  useEffect(() => {
    controls.start(visibleFace);
  }, [controls, visibleFace]);

  useEffect(() => {
    const handleKeypress = (event: KeyboardEvent) => {
      if (event.code === `Digit${position}`) {
        flipCard();
      }
    };
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  });

  useEffect(() => {
    setTimeout(() => {
      if (visibleFace === 'front') setBackUrl(randomArrayElement(urls));
      else setFrontUrl(randomArrayElement(urls));
    }, 500);
  }, [setBackUrl, setFrontUrl, urls, visibleFace]);

  useInterval(
    randomInteger(MIN_FLIP_TIME, MAX_FLIP_TIME),
    () => {
      if (!reducedMotion) flipCard();
    },
    [reducedMotion],
  );

  return (
    <motion.div
      role="button"
      aria-roledescription="avatar card"
      onClick={flipCard}
      className="relative aspect-square w-1/4 three-d z-1 hover:z-10"
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
};

export type AvatarCardsProps = {
  count?: number;
};

export const AvatarCards = ({count = 1}: AvatarCardsProps) => {
  const items = [...Array(count).keys()].map((index) => {
    const urls = shuffleArray(getAllImagesInFolder('avatars'));
    return <AvatarCard key={index} position={index + 1} urls={urls} />;
  });

  return <div className="flex flex-row space-x-4 mb-8">{items}</div>;
};
