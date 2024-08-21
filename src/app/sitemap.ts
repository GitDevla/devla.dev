import { fetchMarkdownPosts } from "@/utils/Markdown";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const postMetadata = await fetchMarkdownPosts();
  let domain = process.env.NEXT_PUBLIC_DOMAIN;

  const posts: MetadataRoute.Sitemap = postMetadata.map((i) => ({
    url: domain + "/blog/" + i?.metadata.slug,
  }));
  return [
    {
      url: `${domain}`,
    },
    {
      url: `${domain}/projects`,
    },
    {
      url: `${domain}/repos`,
    },
    {
      url: `${domain}/about`,
    },
    {
      url: `${domain}/music`,
      changeFrequency: "weekly",
    },
    ...posts,
  ];
}
