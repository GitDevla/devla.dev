import { MetadataRoute } from "next";

const public_domain = process.env.NEXT_PUBLIC_DOMAIN;

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${public_domain}/sitemap.xml`,
  };
}
