import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  getAvatarUrls,
  randomArrayElement,
  randomInteger,
  useInterval,
  useReducedMotion,
} from 'src/util';

const MIN_FLIP_TIME = 7500;
const MAX_FLIP_TIME = 15000;

type AvatarImageProps = {
  flip?: boolean;
  src: string;
};

const AvatarImage = ({ flip = false, src }: AvatarImageProps) => {
  const classes = classNames(
    'absolute shadow shadow-md shadow-slate-300 dark:shadow-none backface-hidden',
    flip && 'rotate-y-180'
  );
  return (
    <img
      src={src}
      className={classes}
      height={280}
      width={280}
      draggable={false}
      alt="A picture of me (Nate)"
    />
  );
};

type AvatarCardProps = {
  position: number;
  urls: string[];
};

const AvatarCard = ({ position, urls }: AvatarCardProps) => {
  const [visibleFace, setVisibleFace] = useState('front');
  const [frontUrl, setFrontUrl] = useState(randomArrayElement(urls));
  const [backUrl, setBackUrl] = useState(randomArrayElement(urls));
  const reducedMotion = useReducedMotion();

  const flipCard = () => {
    if (visibleFace === 'front') setVisibleFace('back');
    else setVisibleFace('front');
  };

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
  }, [visibleFace]);

  useInterval(
    randomInteger(MIN_FLIP_TIME, MAX_FLIP_TIME),
    () => {
      if (!reducedMotion) flipCard();
    },
    [reducedMotion]
  );

  const classes = classNames(
    'block relative flex-none w-full aspect-square three-d transition-transform duration-500',
    {
      'rotate-y-180': visibleFace === 'back',
    }
  );

  return (
    <a role="button" aria-roledescription="avatar card" onClick={flipCard} className={classes}>
      <AvatarImage src={frontUrl} />
      <AvatarImage src={backUrl} flip />
    </a>
  );
};

export type AvatarCardsProps = {
  count?: number;
};

export const AvatarCards = ({ count = 1 }: AvatarCardsProps) => {
  const urls = getAvatarUrls().sort(() => Math.random());

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 mb-8 bg-checkerboard">
      {[...Array(count).keys()].map((index) => (
        <AvatarCard key={index} position={index + 1} urls={urls} />
      ))}
    </div>
  );
};
