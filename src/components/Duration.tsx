import { DateTime } from 'luxon';

type DurationProps = {
  since: string;
};

export const Duration = ({ since }: DurationProps) => {
  const now = DateTime.now();
  const then = DateTime.fromISO(since);
  const duration = now.diff(then);

  const years = Math.floor(duration.as('years'));
  const months = Math.floor(duration.as('months'));

  let content;
  if (years < 1) {
    content = `${months} month${months === 1 ? '' : 's'}`;
  } else {
    content = `${years} year${years === 1 ? '' : 's'}`;
  }

  return <span>{content}</span>;
};
