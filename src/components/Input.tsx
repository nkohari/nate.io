import {useRef} from 'react';
import cx from 'classnames';
import {Icon, IconType} from 'src/components';

export type InputProps = {
  className?: string;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  onChange?: (value: string) => unknown;
  placeholder?: string;
  value: string;
};

export const Input = ({
  className,
  icon,
  iconPosition = 'left',
  onChange,
  placeholder = undefined,
  value,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.focus();
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.currentTarget.value);
  };

  return (
    <div
      className={cx(
        'flex flex-row items-center',
        iconPosition === 'right' && 'flex-row-reverse',
        'px-2 py-0.5 rounded-md bg-white dark:bg-slate-500 border-2 border-slate-300 dark:border-slate-400 focus-within:border-blue-500',
        'transition-colors ease-in-out',
        'cursor-text',
        className
      )}
      onClick={handleClick}
    >
      {icon && <Icon type={icon} />}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        className={cx(
          'bg-transparent ml-2 focus:outline-none',
          'placeholder:italic placeholder:text-base placeholder:text-slate-300'
        )}
        onChange={handleChange}
      />
    </div>
  );
};
