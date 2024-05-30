import cx from 'classnames';
import './CodeBlock.css';

export type CodeBlockTokenProps = {
  children: React.ReactNode;
  content?: React.ReactNode;
  type: string;
};

export function CodeBlockToken({ children, content, type }: CodeBlockTokenProps) {
  return <span className={cx('token', type)}>{content || children}</span>;
}

export type CodeBlockLineProps = {
  children: React.ReactNode;
  number: number;
};

export function CodeBlockLine({ children, number }: CodeBlockLineProps) {
  return (
    <div
      data-line-number={number}
      className={cx(
        'h-5 line-numbers',
        'first:h-7 first:before:pt-2',
        'last:h-7 last:before:pb-2',
        'before:inline-block before:w-8 before:px-1 before:mr-4 before:text-right before:text-slate-300 before:bg-slate-600',
      )}
    >
      {children}
    </div>
  );
}

export type CodeBlockProps = {
  children: React.ReactNode;
  language: string;
};

export function CodeBlock({ children, language }: CodeBlockProps) {
  return (
    <pre
      data-language={language}
      className={cx(
        'overflow-x-auto min-h-[40px] mb-6 bg-slate-700 bg-clip-border border-2 border-slate-600 rounded-md',
        'font-mono text-white text-sm line-numbers-group',
      )}
    >
      {children}
    </pre>
  );
}
