import classNames from 'classnames';
import './CodeBlock.css';

export type CodeBlockTokenProps = {
  children: React.ReactNode;
  content?: React.ReactNode;
  type: string;
};

export const CodeBlockToken = ({ children, content, type }: CodeBlockTokenProps) => {
  return <span className={classNames('token', type)}>{content || children}</span>;
};

export type CodeBlockLineProps = {
  children: React.ReactNode;
  number: number;
};

export const CodeBlockLine = ({ children, number }: CodeBlockLineProps) => {
  const classes = `h-5 line-numbers first:h-7 first:before:pt-2 last:h-7 last:before:pb-2 before:inline-block before:w-8 before:px-1 before:mr-4 before:text-right before:text-slate-300 before:bg-slate-600`;
  return (
    <div data-line-number={number} className={classes}>
      {children}
    </div>
  );
};

export type CodeBlockProps = {
  content: string;
  children: React.ReactNode;
  language: string;
};

export const CodeBlock = ({ content, children, language }: CodeBlockProps) => {
  return (
    <pre
      data-language={language}
      className="font-mono text-white text-sm mb-6 border-2 min-h-[40px] border-slate-600 bg-slate-700 bg-clip-border rounded-md line-numbers-group overflow-x-auto"
    >
      {children}
    </pre>
  );
};
