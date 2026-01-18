import { motion } from 'motion/react';

type GaugeProps = {
  value: number;
  max?: number;
  label?: string;
};

const variants = {
  initial: {
    width: 0,
  },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  }),
};

export function Gauge({ value, max = 1 }: GaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="relative flex flex-col gap-1 w-full py-[1px] px-[8px]">
      <div className="z-10 text-[10px] tabular-nums">{percentage.toFixed(0)}% match</div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-background-dim rounded-full border border-background-alt shadow-md overflow-hidden">
        <motion.div
          className="h-full bg-background-alt"
          variants={variants}
          initial="initial"
          animate="animate"
          custom={percentage}
        />
      </div>
    </div>
  );
}
