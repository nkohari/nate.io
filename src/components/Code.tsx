export type CodeProps = {
  content: string;
  language: string;
};

export const Code = ({content, language}: CodeProps) => {
  return (
    <code className="font-mono font-semibold text-base" data-language={language}>
      {content}
    </code>
  );
};
