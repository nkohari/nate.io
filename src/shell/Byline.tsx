import React, { useState } from 'react';
import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';
import { Link } from '../components';
import { ArticleMetadata } from '../types';
import { ContentStats } from './ContentStats';

type BylineProps = {
  metadata: ArticleMetadata;
};

export const Byline = ({ metadata }: BylineProps) => {
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
        {expanded && <ContentStats metadata={metadata} />}
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
