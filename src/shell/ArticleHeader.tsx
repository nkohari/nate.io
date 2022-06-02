import React, { useState } from 'react';
import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';
import { Link } from '../components';
import { ArticleMetadata } from '../types';
import { ordinal } from '../util';

type ArticleContentStatsProps = {
  metadata: ArticleMetadata;
};

const ArticleContentStats = ({ metadata }: ArticleContentStatsProps) => {
  const { counts, gradeLevel, type } = metadata;

  if (!counts || !gradeLevel) {
    return null;
  }

  return (
    <span className="ml-1 before:content-['—'] before:mr-1">
      {counts.words.toLocaleString()} words, written in {type} style, at the{' '}
      {gradeLevel > 12 ? 'college' : `${ordinal(gradeLevel)} grade`} reading level
    </span>
  );
};

type ArticleBylineProps = {
  metadata: ArticleMetadata;
};

const ArticleByline = ({ metadata }: ArticleBylineProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((currentValue) => !currentValue);

  if (!metadata.date && !metadata.readingTime) {
    return null;
  }

  let date;
  let readingTime;

  if (metadata.date) {
    const dateClasses = classNames('mr-1', {
      "after:content-['—'] after:ml-1": metadata.date && metadata.readingTime,
    });
    date = (
      <time dateTime={metadata.date.toISOString()} className={dateClasses}>
        {DateTime.fromJSDate(metadata.date).toLocaleString(DateTime.DATE_FULL)}
      </time>
    );
  }

  if (metadata.readingTime) {
    const minutes = Math.round(Duration.fromMillis(metadata.readingTime).as('minutes'));
    readingTime = (
      <React.Fragment>
        <Link role="button" type="subtle" onClick={toggleExpanded}>
          a {minutes} min read
        </Link>
        {expanded && <ArticleContentStats metadata={metadata} />}
      </React.Fragment>
    );
  }

  return (
    <div className="flex italic text-sm text-gray-600 dark:text-gray-400 mt-4">
      {date}
      {readingTime}
    </div>
  );
};

type ArticleHeaderProps = {
  metadata: ArticleMetadata;
};

export const ArticleHeader = ({ metadata }: ArticleHeaderProps) => {
  const { title, subtitle, type } = metadata;

  if (!title) {
    return null;
  }

  return (
    <header className="mb-6">
      {title && <h1 className="text-3xl font-extrabold">{title}</h1>}
      {subtitle && <h2 className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</h2>}
      {type !== 'page' && <ArticleByline metadata={metadata} />}
    </header>
  );
};
