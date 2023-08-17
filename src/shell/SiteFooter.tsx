import {DateTime} from 'luxon';
import {IconType, Link} from 'src/components';

type SiteFooterLinkProps = {
  href: string;
  icon?: IconType;
  text: string;
};

const SiteFooterLink = ({href, icon, text}: SiteFooterLinkProps) => (
  <li className="flex items-center mb-1">
    <Link href={href} type="subtle" icon={icon} iconSpacing={2}>
      {text}
    </Link>
  </li>
);

export const SiteFooter = () => {
  return (
    <div className="relative w-full mt-8 md:mt-12 overflow-hidden">
      <div className="z-10 relative flex flex-row justify-center pt-12 md:pt-24 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row w-[900px] px-8 pb-12">
          <div className="flex-1">
            <div>Copyright &copy; 2006-{DateTime.now().year} Nate Kohari.</div>
            <div>
              Licensed under{' '}
              <Link
                className="hidden sm:inline"
                href="http://creativecommons.org/licenses/by/4.0/"
                type="subtle-with-underline"
              >
                Creative Commons Attribution (CC-BY) 4.0
              </Link>
              <Link
                className="sm:hidden"
                href="http://creativecommons.org/licenses/by/4.0/"
                type="subtle-with-underline"
              >
                CC-BY 4.0
              </Link>
              .
            </div>
            <div>
              <Link href="https://github.com/nkohari/nate.io" type="subtle-with-underline">
                Open-source
              </Link>
              , and powered by{' '}
              <Link href="https://markdoc.io" type="subtle-with-underline">
                Markdoc
              </Link>
              .{' '}
            </div>
          </div>
          <div className="flex-none w-60 mt-8 sm:mt-0 grid grid-cols-3">
            <ul>
              <SiteFooterLink href="/" text="About" />
              <SiteFooterLink href="/now" text="Now" />
              <SiteFooterLink href="/work" text="Work" />
            </ul>
            <ul>
              <SiteFooterLink href="/biking" text="Biking" />
              <SiteFooterLink href="/writing" text="Writing" />
              <SiteFooterLink href="/music" text="Music" />
              <SiteFooterLink href="/art" text="Art" />
            </ul>
            <ul>
              <SiteFooterLink icon="twitter" href="https://twitter.com/nkohari" text="Twitter" />
              <SiteFooterLink icon="github" href="https://github.com/nkohari" text="GitHub" />
              <SiteFooterLink
                icon="linkedin"
                href="https://linkedin.com/in/nkohari"
                text="LinkedIn"
              />
              <SiteFooterLink icon="email" href="mailto:nkohari@gmail.com" text="Email" />
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute top-0 h-full w-full border-t border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 origin-bottom-right -skew-y-2"></div>
    </div>
  );
};
