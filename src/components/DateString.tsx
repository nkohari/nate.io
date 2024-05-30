import { DateTime } from 'luxon';

const FORMATS = {
  'full-date': DateTime.DATE_FULL,
};

export type DateFormat = keyof typeof FORMATS;

export type DateStringProps = {
  className?: string;
  date: Date;
  format?: DateFormat;
};

export function DateString({ className, date, format = 'full-date' }: DateStringProps) {
  return (
    <time dateTime={date.toISOString()} className={className}>
      {DateTime.fromJSDate(date).toLocaleString(FORMATS[format])}
    </time>
  );
}
