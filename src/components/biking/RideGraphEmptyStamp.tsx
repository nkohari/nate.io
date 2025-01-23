import { motion } from 'motion/react';

const stampVariants = {
  hidden: {
    opacity: 0,
    scale: 1.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 0.25, bounce: 0 },
  },
};

export function RideGraphEmptyStamp() {
  return (
    <motion.div
      variants={stampVariants}
      className="absolute w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className="text-lg leading-none font-bold rounded-md p-3 -rotate-6 border-4 text-red-600 border-red-600 dark:text-red-400 dark:border-red-400">
        No recent rides &mdash; I am being lazy :(
      </div>
    </motion.div>
  );
}
