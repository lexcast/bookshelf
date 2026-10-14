const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

// URL of a file in public/, respecting the deploy base path
export const assetUrl = (path) => `${baseUrl}/${path}`;
