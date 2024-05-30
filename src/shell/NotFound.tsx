import cx from 'classnames';
import { motion } from 'framer-motion';
import { Link } from 'src/components';

const variants = {
  initial: {
    rotate: -7,
  },
  boing: (index: number) => ({
    x: index * 12,
    y: 10 + index * -16,
    rotate: -7,
    transition: { type: 'spring', stiffness: 100, damping: 2, mass: 1, delay: 0.75 },
  }),
};

type SadComputerProps = {
  className: string;
  index: number;
};

function SadComputer({ index, className }: SadComputerProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      variants={variants}
      className={cx('absolute h-full', className)}
      initial="initial"
      animate="boing"
      custom={index}
    >
      <title>Sad computer</title>
      <circle cx="14.5" cy="21.2" r="2.5" />
      <circle cx="21.8" cy="21.2" r="2.5" />
      <circle cx="29" cy="21.2" r="2.5" />
      <path d="M90.9,9.5H9.1c-3.6,0-6.6,2.9-6.6,6.6v67.9c0,3.6,2.9,6.6,6.6,6.6h81.9c3.6,0,6.6-2.9,6.6-6.6V16.1     C97.5,12.5,94.6,9.5,90.9,9.5z M9.1,14.6h81.9c0.8,0,1.5,0.7,1.5,1.5v11.7H7.6V16.1C7.6,15.3,8.3,14.6,9.1,14.6z M90.9,85.4H9.1     c-0.8,0-1.5-0.7-1.5-1.5V32.8h84.8v51.1C92.4,84.7,91.7,85.4,90.9,85.4z" />
      <path d="M32.8,54.8c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7l2.8-2.8l2.8,2.8c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7     c1-1,1-2.6,0-3.6l-2.8-2.8l2.8-2.8c1-1,1-2.6,0-3.6s-2.6-1-3.6,0l-2.8,2.8l-2.8-2.8c-1-1-2.6-1-3.6,0c-1,1-1,2.6,0,3.6l2.8,2.8     l-2.8,2.8C31.8,52.2,31.8,53.8,32.8,54.8z" />
      <path d="M67.2,42.1c-1-1-2.6-1-3.6,0l-2.8,2.8l-2.8-2.8c-1-1-2.6-1-3.6,0s-1,2.6,0,3.6l2.8,2.8l-2.8,2.8c-1,1-1,2.6,0,3.6     c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7l2.8-2.8l2.8,2.8c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7c1-1,1-2.6,0-3.6l-2.8-2.8     l2.8-2.8C68.2,44.7,68.2,43.1,67.2,42.1z" />
      <path d="M64.9,62.4H35.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5h14.1v5.1c0,3.7,3,6.6,6.6,6.6s6.6-3,6.6-6.6v-5.1h2.4     c1.4,0,2.5-1.1,2.5-2.5C67.4,63.5,66.3,62.4,64.9,62.4z M57.4,72.6c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6v-5.1h3.1V72.6z     " />
    </motion.svg>
  );
}

export function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <SadComputer index={0} className="fill-blue-300" />
          <SadComputer index={1} className="fill-emerald-300" />
          <SadComputer index={2} className="fill-rose-300" />
          <SadComputer index={3} className="fill-black dark:fill-white" />
        </div>
        <div className="flex-1 text-center md:text-left md:pl-28 pt-8 md:pt-0">
          <div className="pb-4 text-5xl font-extrabold">HTTP 404</div>
          <p>I can't find what you're looking for!</p>
          <p>
            You should go back <Link href="/">home</Link>, or{' '}
            <Link href="/writing">search the library</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
