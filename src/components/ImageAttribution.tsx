import { Link } from 'src/components';

export type ImageAttributionProps = {
  href: string;
  name: string;
};

export function ImageAttribution({ href, name }: ImageAttributionProps) {
  return (
    <div className="py-1 italic text-xs text-right text-secondary">
      Image by{' '}
      <Link href={href} type="subtle-with-underline" className="font-semibold">
        {name}
      </Link>
    </div>
  );
}
