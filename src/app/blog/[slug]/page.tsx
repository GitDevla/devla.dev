import Markdown from "markdown-to-jsx";
import { fetchMarkdownPosts, getMDContent } from "@/utils/Markdown";
import { notFound } from "next/navigation";

export const revalidate = 60 * 60 * 9;

export async function generateStaticParams() {
  const postMetadata = await fetchMarkdownPosts();
  return postMetadata
    .filter((i) => i.tags.includes("project"))
    .map((i) => {
      const slug = i.slug;
      return { slug };
    });
}

export default async function BlogPage(props: any) {
  const slug = props.params.slug;
  const post = await getMDContent(slug);
  if (!post) {
    return notFound();
  }
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-3xl font-bold text-primaryText">
          {post.data.title}
        </h1>
        <p className="mt-2 text-secondaryText">
          {post.data.date
            ? post.data.date
            : `${post.data.fromdate} - ${post.data.todate}`}
        </p>
      </div>

      <article className="prose mx-auto max-w-[80ch] text-justify dark:prose-invert">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
}
