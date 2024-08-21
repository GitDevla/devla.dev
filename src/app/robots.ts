import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: process.env.NEXT_PUBLIC_DOMAIN + "/sitemap.xml",
  };
}
