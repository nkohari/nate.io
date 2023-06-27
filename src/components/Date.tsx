import {DateTime} from 'luxon';

const FORMATS = {
  'full-date': DateTime.DATE_FULL,
};

export type DateFormat = keyof typeof FORMATS;

export type DateProps = {
  className?: string;
  date: Date;
  format?: DateFormat;
};

export const Date = ({className, date, format = 'full-date'}: DateProps) => {
  return (
    <time dateTime={date.toISOString()} className={className}>
      {DateTime.fromJSDate(date).toLocaleString(FORMATS[format])}
    </time>
  );
};
