import { SvgFilter } from './SvgFilter';

export const FILTER_PREFIX = 'avatar-filter-';

export const FILTERS = [
  { red: '0.27 0.86 1.00', green: '0.01 0.31 0.95', blue: '0.02 0.02 0.02' },
  { red: '0.27 0.86 0.97', green: '0.01 0.08 0.81', blue: '0.02 0.24 0.05' },
  { red: '0.01 0.52 0.97', green: '0.00 0.05 0.81', blue: '0.02 0.29 0.61' },
  { red: '0.02 0.13 0.80', green: '0.02 0.47 0.97', blue: '0.26 0.52 0.48' },
  { red: '0.75 0.53', green: '0.25 0.97', blue: '0.64 0.77' },
  { red: '0.03 0.80', green: '0.57 1.00', blue: '0.49 0.53' },
  { red: '0.29 0.15 0.97', green: '0.04 0.39 0.93', blue: '0.32 0.52 0.73' },
];

export function AvatarFilters() {
  return (
    <svg aria-hidden="true" className="hidden">
      {FILTERS.map((filter, index) => (
        <SvgFilter key={index} id={`${FILTER_PREFIX}${index}`} {...filter} />
      ))}
    </svg>
  );
}
