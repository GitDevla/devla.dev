import { fetchMarkdownPosts } from "@/utils/Markdown";
import GlobalSearchClient from "./GlobalSearchClient";

async function getAllStaticPages() {
  return [
    { title: "Home", href: "/", type: "page" },
    { title: "About Me", href: "/about", type: "page" },
    { title: "Music", href: "/music", type: "page" },
    { title: "Repositories", href: "/repos", type: "page" },
    { title: "Projects", href: "/projects", type: "page" },
  ];
  // let pages = await glob("src/app/**/page.tsx");
  // let staticSites = pages
  //   .filter((p) => !p.includes("[slug]"))
  //   .map((page) => {
  //     const parts = page.split("/");
  //     let title = parts[parts.length - 2];
  //     if (title === "app") title = "Home";
  //     const path = "/" + parts.slice(2, parts.length - 1).join("/");
  //     return { title: title, href: path, type: "page" };
  //   });
  // return staticSites;
}

async function getAllBlogs() {
  const allBlogs = await fetchMarkdownPosts();
  return allBlogs.map((post) => {
    return {
      title: post?.metadata.title ?? "",
      href: `/blog/${post?.metadata.slug ?? ""}`,
      type: "blog",
    };
  });
}

export default async function GlobalSearchServer() {
  const [pages, blogs] = await Promise.all([
    getAllStaticPages(),
    getAllBlogs(),
  ]);
  pages.push(...blogs);
  return <GlobalSearchClient pages={pages} />;
}
