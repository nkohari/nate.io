import { Suspense } from 'react';
import { Body, SiteFooter, SiteHeader } from 'src/shell';

export type ShellProps = {
  path: string;
};

export function Shell({ path }: ShellProps) {
  return (
    <>
      <div className="flex flex-col items-center leading-relaxed text-primary min-h-[90vh] bg-background transition-colors">
        <div className="flex-1 flex flex-col w-full max-w-[900px] pt-1 px-4">
          <SiteHeader />
          <Suspense fallback={<div className="flex-1 min-h-screen" />}>
            <Body path={path} />
          </Suspense>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
