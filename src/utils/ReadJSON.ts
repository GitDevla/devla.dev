import { promises as fs } from "fs";
import path from "path";

export async function readJSON(relativePath: string) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const file = await fs.readFile(absolutePath, "utf8");
  const content = JSON.parse(file);
  return content;
}

export async function readStatic(filename: string) {
  const absolutePath = path.resolve(
    process.env.STATIC_PATH as string,
    filename,
  );
  const file = await fs.readFile(absolutePath, "utf8");
  const content = JSON.parse(file);
  return content;
}
