import { Icon, IconType } from './Icon';
import { Link } from './Link';

export type ChipProps = {
  href: string;
  icon: IconType;
  text: string;
};

export const Chip = ({ href, icon, text }: ChipProps) => {
  let iconElement;
  if (icon) {
    iconElement = <Icon type={icon} size="small" className="mr-1" />;
  }

  return (
    <Link
      type="button"
      className="inline-flex flex-row items-center mx-1 px-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors"
      href={href}
    >
      {iconElement}
      {text}
    </Link>
  );
};
