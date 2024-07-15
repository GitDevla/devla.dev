import { promises as fs } from "fs";
import path from "path";

export default async function readJSON(relativePath: string) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const file = await fs.readFile(absolutePath, "utf8");
  const content = JSON.parse(file);
  return content;
}
