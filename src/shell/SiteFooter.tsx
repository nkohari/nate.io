import { DateTime } from 'luxon';
import { Ascii, Aurora, Liquify, Shader } from 'shaders/react';
import { IconType, Link } from 'src/components';

type SiteFooterLinkProps = {
  href: string;
  icon?: IconType;
  text: string;
};

function SiteFooterLink({ href, icon, text }: SiteFooterLinkProps) {
  return (
    <li className="flex items-center">
      <Link href={href} type="subtle" icon={icon} iconSpacing={2}>
        {text}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <div className="relative flex flex-col justify-end items-center min-h-[400px] w-full text-primary">
      <div className="absolute inset-0">
        <Shader className="h-full w-full">
          <Ascii cellSize={20} gamma={0.1} fontFamily="IBM Plex Mono">
            <Liquify intensity={3} radius={3}>
              <Aurora
                intensity={100}
                speed={20}
                colorA="#a533f8"
                colorB="#2922ee"
                colorC="#1694e8"
              />
            </Liquify>
          </Ascii>
        </Shader>
      </div>
      <div className="relative flex flex-col sm:flex-row h-full w-full sm:w-[900px] px-8 pb-12 z-10">
        <div className="flex-1 text-xs">
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
        <div className="flex-none w-60 mt-8 sm:mt-0 grid grid-cols-3 text-xs">
          <ul className="flex flex-col gap-1.5">
            <SiteFooterLink href="/" text="About" />
            <SiteFooterLink href="/now" text="Now" />
            <SiteFooterLink href="/work" text="Work" />
            <SiteFooterLink href="/writing" text="Writing" />
          </ul>
          <ul className="flex flex-col gap-1.5">
            <SiteFooterLink href="/uses" text="Uses" />
            <SiteFooterLink href="/music" text="Music" />
            <SiteFooterLink href="/biking" text="Biking" />
          </ul>
          <ul className="flex flex-col gap-1.5">
            <SiteFooterLink icon="twitter" href="https://twitter.com/nkohari" text="Twitter" />
            <SiteFooterLink icon="github" href="https://github.com/nkohari" text="GitHub" />
            <SiteFooterLink
              icon="linkedin"
              href="https://linkedin.com/in/nkohari"
              text="LinkedIn"
            />
            <SiteFooterLink icon="email" href="mailto:hello@nate.io" text="Email" />
          </ul>
        </div>
      </div>
    </div>
  );
}
