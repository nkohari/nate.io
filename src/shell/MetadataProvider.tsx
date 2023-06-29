import {createContext, useContext} from 'react';
import {Metadata} from 'src/types';

const MetadataContext = createContext<Metadata>({} as Metadata);

type MetadataProviderProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export const MetadataProvider = ({children, metadata}: MetadataProviderProps) => {
  return <MetadataContext.Provider value={metadata}>{children}</MetadataContext.Provider>;
};

export const useMetadata = () => {
  return useContext(MetadataContext);
};
