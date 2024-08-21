import { promises as fs } from "fs";
import matter from "gray-matter";

const folder = process.env.STATIC_PATH + "/blogs/";

export async function fetchMarkdownPosts() {
  const files = await fs.readdir(folder);
  const markdownPosts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
  const posts = (await Promise.all(markdownPosts.map(getMD))).filter(
    (i) => i?.metadata.visible,
  );

  return posts;
}

export async function getMD(slug: string) {
  const file = `${folder}${slug}.md`;
  const fileExists = await fs
    .access(file)
    .then(() => true)
    .catch(() => false);
  if (!fileExists) {
    return null;
  }
  const stats = await fs.stat(file);
  const fileContents = await fs.readFile(file, "utf8");
  const matterResult = matter(fileContents);
  return {
    metadata: {
      title: matterResult.data.title,
      date: matterResult.data.date || null,
      subtitle: matterResult.data.subtitle,
      tags: matterResult.data.tags || [],
      fromdate: matterResult.data.fromdate || null,
      todate: matterResult.data.todate || null,
      slug: slug,
      lastUpdated: stats.mtime,
      created: stats.birthtime,
      visible: matterResult.data.visible || false,
    },
    content: matterResult.content,
  };
}
