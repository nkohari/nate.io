import {useState} from 'react';
import cx from 'classnames';
import {DateTime, Duration} from 'luxon';
import {Link} from 'src/components';
import {Metadata} from 'src/types';
import {ordinal} from 'src/util';

type ContentStatsProps = {
  metadata: Metadata;
};

const ContentStats = ({metadata}: ContentStatsProps) => {
  const {counts, gradeLevel, type} = metadata;

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

type BylineProps = {
  metadata: Metadata;
};

export const Byline = ({metadata}: BylineProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((currentValue) => !currentValue);

  if (!metadata.date && !metadata.readingTime) {
    return null;
  }

  let date;
  let readingTime;

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
        <Link role="button" type="subtle" onClick={toggleExpanded}>
          a {minutes} min read
        </Link>
        {expanded && <ContentStats metadata={metadata} />}
      </>
    );
  }

  return (
    <div className="flex mt-2 text-xs uppercase text-gray-600 dark:text-gray-400">
      {date}
      {readingTime}
    </div>
  );
};
