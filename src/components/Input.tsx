import cx from 'classnames';
import { useRef } from 'react';
import { Icon, IconType } from 'src/components';

export type InputProps = {
  className?: string;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  onChange?: (value: string) => unknown;
  placeholder?: string;
  value: string;
};

export function Input({
  className,
  icon,
  iconPosition = 'left',
  onChange,
  placeholder = undefined,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.focus();
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.currentTarget.value);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: I need to replace this with the component from headless ui anyway.
    <div
      className={cx(
        'flex flex-row items-center',
        iconPosition === 'right' && 'flex-row-reverse',
        'px-2 py-0.5 rounded-md bg-background-alt border-2 border-divider focus-within:border-blue-500',
        'transition-colors ease-in-out',
        'cursor-text',
        className,
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
          'placeholder:italic placeholder:text-base placeholder:text-secondary',
        )}
        onChange={handleChange}
      />
    </div>
  );
}
