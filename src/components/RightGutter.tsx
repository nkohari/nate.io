import cx from 'classnames';
import debounce from 'lodash/debounce';
import {useEffect} from 'react';
import {motion, useAnimationControls} from 'framer-motion';
import {Link} from 'src/components';

const SCROLL_DISTANCE_PIXELS = 200;
const SCROLL_DEBOUNCE_DELAY_MS = 50;

const backVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    transition: {type: 'spring', duration: 0.5},
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {type: 'spring', duration: 0.5},
  },
};

const BackToTop = () => {
  const controls = useAnimationControls();

  const handleBackClicked = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleWindowScroll = debounce(() => {
    if (window.scrollY > SCROLL_DISTANCE_PIXELS) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, SCROLL_DEBOUNCE_DELAY_MS);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <motion.div
      className="mx-16 my-8 text-sm cursor-pointer"
      initial="hidden"
      animate={controls}
      variants={backVariants}
    >
      <Link icon="backUp" onClick={handleBackClicked}>
        Back to top
      </Link>
    </motion.div>
  );
};

export const RightGutter = () => (
  <div className="fixed top-0 right-0 hidden xl:block h-full">
    <BackToTop />
  </div>
);
