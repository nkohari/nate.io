import { Link } from 'src/components';

export type ImageAttributionProps = {
  href: string;
  name: string;
};

export const ImageAttribution = ({ href, name }: ImageAttributionProps) => (
  <div className="py-1 italic text-xs text-right text-slate-500">
    Image by{' '}
    <Link href={href} type="subtle" className="font-semibold">
      {name}
    </Link>
  </div>
);
