type Asset = {
  [key: string]: string;
};

export type Assets = {
  entrypoints: string[];
  files: Asset;
};

export async function fetchAssets<T>(host: string): Promise<T> {
  const response = await fetch(`${host}/asset-manifest.json`, {
    headers: { cache: "no-store" },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch assets.json from " + host);
}
