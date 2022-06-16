import { Icon, IconType, Link } from 'src/components';

type FooterLinkProps = {
  href: string;
  icon?: IconType;
  text: string;
};

const FooterLink = ({ href, icon, text }: FooterLinkProps) => (
  <li className="flex items-center mb-1.5">
    {icon && <Icon type={icon} size="medium" className="mr-2" />}
    <Link href={href} type="subtle">
      {text}
    </Link>
  </li>
);

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row text-sm border-t border-slate-300 dark:border-slate-600 mt-24 py-6 text-slate-500 dark:text-slate-400">
      <div className="flex-1">
        <div>Copyright &copy; 2006-2022 Nate Kohari.</div>
        <div>
          Licensed under{' '}
          <Link href="http://creativecommons.org/licenses/by/4.0/" type="subtle">
            Creative Commons Attribution (CC-BY) 4.0.
          </Link>
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
      <div className="flex-none w-48 mt-4 md:mt-0 grid grid-cols-2">
        <ul>
          <FooterLink href="/" text="About" />
          <FooterLink href="/now" text="Now" />
          <FooterLink href="/work" text="Work" />
          <FooterLink href="/writing" text="Writing" />
        </ul>
        <ul>
          <FooterLink icon="twitter" href="https://twitter.com/nkohari" text="Twitter" />
          <FooterLink icon="github" href="https://github.com/nkohari" text="GitHub" />
          <FooterLink icon="linkedin" href="https://linkedin.com/in/nkohari" text="LinkedIn" />
          <FooterLink icon="email" href="mailto:nkohari@gmail.com" text="Email" />
        </ul>
      </div>
    </div>
  );
};
