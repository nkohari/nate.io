import { createContext, useContext } from 'react';
import { ArticleMetadata } from 'src/types';

const MetadataContext = createContext<ArticleMetadata>({} as any);

type MetadataProviderProps = {
  children: React.ReactNode;
  metadata: ArticleMetadata;
};

export const MetadataProvider = ({ children, metadata }: MetadataProviderProps) => {
  return <MetadataContext.Provider value={metadata}>{children}</MetadataContext.Provider>;
};

export const useMetadata = () => {
  return useContext(MetadataContext);
};
