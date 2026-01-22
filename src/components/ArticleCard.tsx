import cx from 'classnames';
import { DateTime, Duration } from 'luxon';
import { motion } from 'motion/react';
import { Gauge, Icon, Image, Link } from 'src/components';
import { Article } from 'src/types';

type ArticleCardProps = {
  article: Article;
  caption?: React.ReactNode;
  score?: number;
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

export function ArticleCard({ article, caption, score }: ArticleCardProps) {
  const { thumbnailImage, title, subtitle } = article.metadata;

  let date: React.ReactNode;
  if (article.metadata.date) {
    date = (
      <time
        dateTime={article.metadata.date.toISOString()}
        className={cx({
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

  let scoreDisplay: React.ReactNode;
  if (score !== undefined) {
    scoreDisplay = <Gauge value={score} max={1} />;
  }

  let icon: React.ReactNode;
  if (article.metadata.state === 'archived') {
    icon = <Icon type="archived" size="16px" />;
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
              <div className="absolute inset-0 bg-linear-to-t from-white/50 to-white/30 dark:from-black/70 dark:to-black/10" />
            </>
          )}
          <div className="absolute top-0 left-0 right-0 p-3 flex flex-col gap-1 dark:text-shadow-sm">
            <h3
              className={cx(
                'font-semibold text-lg leading-tight',
                score !== undefined ? 'line-clamp-1' : 'line-clamp-2',
              )}
            >
              {title}
            </h3>
            {subtitle && <p className="text-sm line-clamp-3">{subtitle}</p>}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 uppercase text-[11px] text-secondary dark:text-shadow-sm">
            <div className="flex flex-row items-center gap-1">
              {icon}
              {date}
              {readingTime}
            </div>
            {scoreDisplay && <div className="flex flex-row mt-1">{scoreDisplay}</div>}
            {caption && <div className="flex flex-row">{caption}</div>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
