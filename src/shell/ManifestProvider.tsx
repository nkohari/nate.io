import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Manifest = Record<string, ManifestEntry>;
export type ManifestEntry = {
  assets?: string[];
  file: string;
  imports?: string[];
  src: string;
};

export type ManifestContextData = {
  getManifestEntry: (filename: string) => ManifestEntry | null;
};

const ManifestContext = createContext<ManifestContextData>({
  getManifestEntry: () => null,
});

type ManifestProviderProps = {
  children: React.ReactNode;
};

export const ManifestProvider = ({ children }: ManifestProviderProps) => {
  const [manifest, setManifest] = useState<Manifest>({});

  useEffect(() => {
    const fetchManifest = async () => {
      const result = await fetch('/manifest.json');
      if (!result.ok) {
        setManifest({});
      } else {
        const data = await result.json();
        setManifest(data);
      }
    };
    fetchManifest().catch((error) => {
      console.error(error);
    });
  }, []);

  const getManifestEntry = useCallback(
    (filename: string) => manifest[filename] || null,
    [manifest]
  );

  const context = {
    getManifestEntry,
  };

  return <ManifestContext.Provider value={context}>{children}</ManifestContext.Provider>;
};

export const useManifest = () => {
  return useContext(ManifestContext);
};
