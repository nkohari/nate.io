import cx from 'classnames';

export type RideGraphSwitchOption<T> = {
  label: string;
  value: T;
};

type RideGraphSwitchProps<T> = {
  onChange: (value: T) => unknown;
  options: RideGraphSwitchOption<T>[];
  value: T;
};

export function RideGraphSwitch<T>({ onChange, options, value }: RideGraphSwitchProps<T>) {
  const firstLabel = options[0].label;

  let items: React.ReactNode;
  if (options.every((op) => op.label === firstLabel)) {
    items = (
      <button
        key={firstLabel}
        type="button"
        className={cx('text-xs px-2 py-1 rounded-full cursor-pointer bg-background-alt')}
      >
        {firstLabel}
      </button>
    );
  } else {
    items = options.map((option) => (
      <button
        key={option.label}
        type="button"
        className={cx(
          'text-xs px-2 py-1 rounded-full cursor-pointer',
          option.value === value ? 'font-medium bg-background-alt' : null,
        )}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ));
  }

  return <div className="flex flex-row">{items}</div>;
}
