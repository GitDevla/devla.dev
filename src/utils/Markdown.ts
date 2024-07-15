import { promises as fs } from "fs";
import matter from "gray-matter";

const folder = process.env.STATIC_PATH + "/blogs/";

export async function fetchMarkdownPosts() {
  const files = await fs.readdir(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(markdownPosts.map(getMDMetadata));
  return posts;
}

export async function getMDMetadata(fileName: string) {
  const fileContents = await fs.readFile(`${folder}${fileName}`, "utf8");
  const matterResult = matter(fileContents);
  return {
    title: matterResult.data.title,
    date: matterResult.data.date || null,
    subtitle: matterResult.data.subtitle,
    tags: matterResult.data.tags || [],
    fromdate: matterResult.data.fromdate || null,
    todate: matterResult.data.todate || null,
    slug: fileName.replace(".md", ""),
  };
}

export async function getMDContent(filename: string) {
  const file = `${folder}${filename}.md`;
  const content = await fs.readFile(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
}
