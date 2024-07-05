import { promises as fs } from "fs";
import path from 'path';

export default async function readJSON(relativePath: string) {
  // Ensure a safer way to handle paths
  const absolutePath = path.resolve(process.cwd(), relativePath);
  
  // Read the file at the resolved path
  const file = await fs.readFile(absolutePath, 'utf8');
  
  // Parse the JSON content of the file
  const content = JSON.parse(file);
  
  return content;
}