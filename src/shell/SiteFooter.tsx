import { DateTime } from 'luxon';
import { Icon, IconType, Link } from 'src/components';

type SiteFooterLinkProps = {
  href: string;
  icon?: IconType;
  text: string;
};

const SiteFooterLink = ({ href, icon, text }: SiteFooterLinkProps) => (
  <li className="flex items-center mb-1.5">
    {icon && <Icon type={icon} className="mr-2" />}
    <Link href={href} type="subtle">
      {text}
    </Link>
  </li>
);

export const SiteFooter = () => {
  return (
    <div className="flex flex-col sm:flex-row text-sm border-t border-slate-300 dark:border-slate-600 mt-24 py-6 text-slate-500 dark:text-slate-400">
      <div className="flex-1">
        <div>Copyright &copy; 2006-{DateTime.now().year} Nate Kohari.</div>
        <div>
          Licensed under{' '}
          <Link
            className="hidden sm:inline"
            href="http://creativecommons.org/licenses/by/4.0/"
            type="subtle"
          >
            Creative Commons Attribution (CC-BY) 4.0
          </Link>
          <Link
            className="sm:hidden"
            href="http://creativecommons.org/licenses/by/4.0/"
            type="subtle"
          >
            CC-BY 4.0
          </Link>
          .
        </div>
        <div>
          <Link href="https://github.com/nkohari/nate.io" type="subtle">
            Open-source
          </Link>
          , and powered by{' '}
          <Link href="https://markdoc.io" type="subtle">
            Markdoc
          </Link>
          .{' '}
        </div>
      </div>
      <div className="flex-none w-48 mt-4 sm:mt-0 grid grid-cols-2">
        <ul>
          <SiteFooterLink href="/" text="About" />
          <SiteFooterLink href="/now" text="Now" />
          <SiteFooterLink href="/work" text="Work" />
          <SiteFooterLink href="/writing" text="Writing" />
        </ul>
        <ul>
          <SiteFooterLink icon="twitter" href="https://twitter.com/nkohari" text="Twitter" />
          <SiteFooterLink icon="github" href="https://github.com/nkohari" text="GitHub" />
          <SiteFooterLink icon="linkedin" href="https://linkedin.com/in/nkohari" text="LinkedIn" />
          <SiteFooterLink icon="email" href="mailto:nkohari@gmail.com" text="Email" />
        </ul>
      </div>
    </div>
  );
};
