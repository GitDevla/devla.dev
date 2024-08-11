import ProjectCard from "@/components/Project";
import { fetchMarkdownPosts } from "@/utils/Markdown";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 9;

export const metadata: Metadata = {
  title: "Projects",
};

async function fetchProjectMD() {
  const postMetadata = await fetchMarkdownPosts();
  return postMetadata.filter((i) => i?.metadata.tags.includes("project"));
}

export default async function ProjectsPage() {
  const postMetadata = await fetchProjectMD();
  return (
    <>
      <h1 className="header">Projects</h1>
      <div>
        {postMetadata.length === 0 && (
          <p className="text-center text-secondaryText">No projects found</p>
        )}
        {postMetadata.map((post, i) => (
          <ProjectCard post={post} key={i}></ProjectCard>
        ))}
      </div>
    </>
  );
}
