import { getMDContent } from "@/utils/Markdown";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";

export default async function ProjectCard({ post }: { post: any }) {
  let { content } = (await getMDContent(
    post.slug,
  )) as matter.GrayMatterFile<string>;

  return (
    <div className="group mt-6 grid grid-cols-[4fr_1fr] rounded-md p-4 shadow-sm even:grid-cols-[1fr_4fr]">
      <div className="order-1 p-5 group-even:order-2">
        <p className="mb-1 text-sm text-secondaryText">
          {post.date ? post.date : `${post.fromdate} - ${post.todate}`}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-highlight hover:underline">{post.title}</h2>
        </Link>
        <p className="mb-4 text-secondaryText">{post.subtitle}</p>
        <div className="line-clamp-5">
          <Markdown>{content}</Markdown>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 text-highlight hover:underline"
        >
          <span>Read more...</span>
        </Link>
      </div>
      <div className="order-2 group-even:order-1">
        <Image
          className="h-full w-full rounded-md object-cover"
          src="https://placehold.co/400"
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
