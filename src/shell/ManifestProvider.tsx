import { createContext, useContext, useEffect, useState } from 'react';

const ManifestContext = createContext<Record<string, string>>({});

type ManifestProviderProps = {
  children: React.ReactNode;
};

export function ManifestProvider({ children }: ManifestProviderProps) {
  const [manifest, setManifest] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/assets/manifest.json')
      .then((response) => response.json())
      .then((result) => setManifest(result));
  }, []);

  return <ManifestContext value={manifest}>{children}</ManifestContext>;
}

export function useManifest() {
  return useContext(ManifestContext);
}
