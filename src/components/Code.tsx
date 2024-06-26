export type CodeProps = {
  content: string;
  language: string;
};

export function Code({ content, language }: CodeProps) {
  return (
    <code className="font-mono font-semibold text-base" data-language={language}>
      {content}
    </code>
  );
}
