import { useArticle } from '@apocrypha/core/catalog';
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
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export function ArticleCard({ id }: ArticleCardProps) {
  const article = useArticle<Metadata>(id);
  const { thumbnailImage, title, subtitle } = article.metadata;

  let readingTime: React.ReactNode;
  if (article.metadata.readingTime) {
    const minutes = Math.round(Duration.fromMillis(article.metadata.readingTime).as('minutes'));
    readingTime = (
      <p className="uppercase text-[11px] text-muted mt-1">{Math.ceil(minutes)} min read</p>
    );
  }

  return (
    <motion.div initial={false} animate="visible" whileHover="hover" variants={cardVariants}>
      <Link type="unstyled" href={article.path}>
        <div className="flex flex-col gap-3">
          <div className="w-full aspect-3/2 overflow-hidden rounded-sm">
            {thumbnailImage && (
              <Image
                src={thumbnailImage.src}
                metadata={thumbnailImage}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
            {readingTime}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
