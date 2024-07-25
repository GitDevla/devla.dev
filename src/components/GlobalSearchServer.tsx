import { glob } from "glob";
import GlobalSearchClient from "./GlobalSearchClient";
import { fetchMarkdownPosts } from "@/utils/Markdown";

async function getAllStaticPages() {
  let pages = await glob("src/app/**/page.tsx");
  let staticSites = pages
    .filter((p) => !p.includes("[slug]"))
    .map((page) => {
      const parts = page.split("/");
      let title = parts[parts.length - 2];
      if (title === "app") title = "Home";
      const path = "/" + parts.slice(2, parts.length - 1).join("/");
      return { title: title, href: path };
    });
  return staticSites;
}

async function getAllBlogs() {
  const allBlogs = await fetchMarkdownPosts();
  return allBlogs.map((post) => {
    return { title: post.title, href: `/blog/${post.slug}` };
  });
}

export default async function GlobalSearchServer() {
  const pages = await getAllStaticPages();
  const blogs = await getAllBlogs();
  pages.push(...blogs);
  return <GlobalSearchClient pages={pages} />;
}
