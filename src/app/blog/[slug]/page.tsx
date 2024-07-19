import Markdown from "markdown-to-jsx";
import { getMDContent } from "@/utils/Markdown";
import { notFound } from "next/navigation";

export const revalidate = 60 * 60 * 9;

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
        <p className="text-secondaryText mt-2">
          {post.data.date
            ? post.data.date
            : `${post.data.fromdate} - ${post.data.todate}`}
        </p>
      </div>

      <article className="prose dark:prose-invert max-w-[80ch] text-justify mx-auto">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
}
