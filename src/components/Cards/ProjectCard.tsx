import Markdown from "markdown-to-jsx";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";

export default async function ProjectCard({ post }: { post: any }) {
  let { metadata, content } = post;
  content = content.replace(/^#{1,6} .*$/gm, "");
  return (
    <div className="group mt-6 grid grid-cols-[4fr_1fr] rounded-md p-4 shadow-sm even:grid-cols-[1fr_4fr]">
      <div className="order-1 p-5 group-even:order-2">
        <p className="mb-1 text-sm text-secondaryText">
          {metadata.date
            ? metadata.date
            : `${metadata.fromdate} - ${metadata.todate}`}
        </p>

        <TransitionLink href={`/blog/${metadata.slug}`}>
          <h2 className="text-lg font-bold text-highlight hover:underline">
            {metadata.title}
          </h2>
        </TransitionLink>
        <p className="mb-4 text-secondaryText">{metadata.subtitle}</p>
        <div className="line-clamp-5">
          <Markdown>{content}</Markdown>
        </div>
        <TransitionLink
          href={`/blog/${metadata.slug}`}
          className="mt-4 text-highlight hover:underline"
        >
          <span>Read more...</span>
        </TransitionLink>
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
