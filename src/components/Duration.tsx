import { DateTime } from 'luxon';

const WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

function formatNumber(value: number) {
  return value <= 10 ? WORDS[value] : value;
}

type DurationProps = {
  since: string;
  pluralize?: boolean;
};

export function Duration({ since, pluralize = true }: DurationProps) {
  const now = DateTime.now();
  const then = DateTime.fromISO(since);
  const duration = now.diff(then);

  const years = Math.floor(duration.as('years'));
  const months = Math.floor(duration.as('months'));

  let content: React.ReactNode;

  if (years < 1) {
    content = `${formatNumber(months)} month${months === 1 || !pluralize ? '' : 's'}`;
  } else {
    content = `${formatNumber(years)} year${years === 1 || !pluralize ? '' : 's'}`;
  }

  return <span>{content}</span>;
}
