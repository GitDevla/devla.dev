import ProjectCard from "@/components/Project";
import { fetchMarkdownPosts } from "@/utils/Markdown";

const revalidate = 60 * 60 * 24;

async function fetchProjectMD() {
  const postMetadata = await fetchMarkdownPosts();
  return postMetadata.filter((i) => i.tags.includes("project"));
}

export default async function ProjectsPage() {
  const postMetadata = await fetchProjectMD();
  return (
    <>
      <h1 className="mb-3 text-2xl font-bold uppercase">Projects</h1>
      <div>
        {postMetadata.map((post, i) => (
          <ProjectCard post={post} key={i}></ProjectCard>
        ))}
      </div>
    </>
  );
}
