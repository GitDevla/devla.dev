import { getMDContent } from "@/utils/Markdown";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";

export default async function ProjectCard({ post }: { post: any }) {
  let { content } = (await getMDContent(
    post.slug
  )) as matter.GrayMatterFile<string>;

  return (
    <div className="group p-4 mt-6 rounded-md shadow-sm grid grid-cols-[4fr_1fr] even:grid-cols-[1fr_4fr]">
      <div className="order-1 group-even:order-2 p-5">
        <p className="text-sm text-secondaryText  mb-1">
          {post.date ? post.date : `${post.fromdate} - ${post.todate}`}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-highlight hover:underline">{post.title}</h2>
        </Link>
        <p className="text-secondaryText  mb-4">{post.subtitle}</p>
        <div className="line-clamp-5">
          <Markdown>{content}</Markdown>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-highlight hover:underline mt-4"
        >
          <span>Read more...</span>
        </Link>
      </div>
      <div className="order-2 group-even:order-1">
        <Image
          className="w-full h-full object-cover rounded-md"
          src="https://placehold.co/400"
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
