import { Metadata } from "next";
import ProjectCard from "@/components/Cards/ProjectCard";
import { fetchProjects } from "@/utils/Markdown";
import createMetadata from "@/utils/Metadata";

export let revalidate = 60 * 60 * 24;

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Projects by David Pataki. Get to know the projects I'm most proud of.",
  keywords: ["projects", "portfolio", "open-source", "software", "development"],
});

export default async function ProjectsPage() {
  const postMetadata = await fetchProjects();
  return (
    <>
      <h1 className={"header"}>Projects</h1>
      <div>
        {postMetadata.length === 0 && (
          <p className={"text-center text-secondaryText"}>No projects found</p>
        )}
        {postMetadata.map((post, i) => (
          <ProjectCard post={post} key={i} />
        ))}
      </div>
    </>
  );
}
