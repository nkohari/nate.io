import cx from 'classnames';
import { DateTime, Duration } from 'luxon';
import { useState } from 'react';
import { Link } from 'src/components';
import { Metadata } from 'src/types';
import { ordinal } from 'src/util';

type ContentStatsProps = {
  metadata: Metadata;
};

function ContentStats({ metadata }: ContentStatsProps) {
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
}

type BylineProps = {
  metadata: Metadata;
};

export function Byline({ metadata }: BylineProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((currentValue) => !currentValue);

  if (!metadata.date && !metadata.readingTime) {
    return null;
  }

  let date: React.ReactNode;
  let readingTime: React.ReactNode;

  if (metadata.date) {
    date = (
      <time
        dateTime={metadata.date.toISOString()}
        className={cx('mr-1', {
          "after:content-['—'] after:ml-1": metadata.date && metadata.readingTime,
        })}
      >
        {DateTime.fromJSDate(metadata.date).toLocaleString(DateTime.DATE_FULL)}
      </time>
    );
  }

  if (metadata.readingTime) {
    const minutes = Math.round(Duration.fromMillis(metadata.readingTime).as('minutes'));
    readingTime = (
      <>
        <Link role="button" type="subtle" className="cursor-pointer" onClick={toggleExpanded}>
          a {minutes} min read
        </Link>
        {expanded && <ContentStats metadata={metadata} />}
      </>
    );
  }

  return (
    <div className="mt-2 text-[11px] uppercase text-muted tracking-wide">
      Written {date} {readingTime}
    </div>
  );
}
