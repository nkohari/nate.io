import { useArticle } from '@apocrypha/core/catalog';
import cx from 'classnames';
import { DateTime, Duration } from 'luxon';
import { motion } from 'motion/react';
import { Image, Link } from 'src/components';
import { Metadata } from 'src/types';

type ArticleCardProps = {
  id: string;
};

const cardVariants = {
  visible: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
};

export function ArticleCard({ id }: ArticleCardProps) {
  const article = useArticle<Metadata>(id);
  const { thumbnailImage, title, subtitle } = article.metadata;

  let date: React.ReactNode;
  if (article.metadata.date) {
    date = (
      <time
        dateTime={article.metadata.date.toISOString()}
        className={cx('mr-1', {
          "after:content-['—'] after:ml-1": article.metadata.date && article.metadata.readingTime,
        })}
      >
        Written in {DateTime.fromJSDate(article.metadata.date).year.toString()}
      </time>
    );
  }

  let readingTime: React.ReactNode;
  if (article.metadata.readingTime) {
    const minutes = Math.round(Duration.fromMillis(article.metadata.readingTime).as('minutes'));
    readingTime = <span>a {Math.ceil(minutes)} min read</span>;
  }

  return (
    <motion.div
      initial={false}
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="h-full rounded-sm bg-background-dim"
    >
      <Link type="unstyled" href={article.path}>
        <div className="relative h-full w-full aspect-3/2 overflow-hidden rounded-sm">
          {thumbnailImage && (
            <>
              <Image
                src={thumbnailImage.src}
                metadata={thumbnailImage}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-white/30 dark:from-black/70 dark:to-black/10" />
            </>
          )}
          <div className="absolute top-0 left-0 right-0 p-3 flex flex-col gap-1 text-shadow-lg">
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            {subtitle && <p className="text-sm line-clamp-2">{subtitle}</p>}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 uppercase text-[11px] text-secondary text-shadow-lg">
            {date}
            {readingTime}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
