import type { Metadata } from "next";

export default function createMetadata(data: {
  title: string;
  description: string;
  keywords?: string | Array<string> | null;
}): Metadata {
  const { title, description, keywords } = data;
  const metadata: Metadata = {
    title,
    description,
    keywords,
    authors: [{ name: "David Pataki", url: "https://devla.dev" }],
    metadataBase: new URL("https://devla.dev"),
  };
  return metadata;
}
