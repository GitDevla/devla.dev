import ProjectCard from "@/components/Cards/ProjectCard";
import { fetchProjects } from "@/utils/Markdown";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 9;

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const postMetadata = await fetchProjects();
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
