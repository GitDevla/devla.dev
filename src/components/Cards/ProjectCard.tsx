import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import LinkSVG from "@/../public/svg/link.svg";
import CodeSVG from "@/../public/svg/code.svg";
import BookSVG from "@/../public/svg/book.svg";

export default async function ProjectCard({ post }: { post: any }) {
  let { metadata, content } = post;
  content = content.replace(/^#{1,6} .*$/gm, "");
  content = content
    .split("\n")
    .filter((i: string) => i !== "")
    .splice(0, 3)
    .join("\n");
  return (
    <div className="group relative mt-6 grid w-full overflow-hidden rounded-md p-4 shadow-sm md:grid-cols-[4fr_1fr] md:even:grid-cols-[1fr_4fr]">
      <div className="order-1 p-5 group-even:order-2 group-even:text-right">
        <p className="mb-1 text-sm text-secondaryText">
          {metadata.date
            ? metadata.date
            : `${metadata.fromdate} - ${metadata.todate}`}
        </p>

        <h2 className="text-xl font-bold">{metadata.title}</h2>

        <p className="mb-4 text-primaryText md:text-secondaryText">
          {metadata.subtitle}
        </p>
        <div className="mt-4 flex gap-4 text-sm font-semibold group-even:flex-row-reverse">
          <TransitionLink href={`/blog/${metadata.slug}`}>
            <div className="flex gap-2 rounded-md bg-highlight p-2 transition-colors hover:bg-opacity-100 md:bg-opacity-50">
              Read
              <Image
                src={BookSVG}
                className="p-[1px] dark:invert"
                width={16}
                height={16}
                alt="Book Icon"
                sizes="16px"
              />
            </div>
          </TransitionLink>
          {metadata.tryLink && (
            <TransitionLink href={metadata.tryLink}>
              <div className="flex gap-2 rounded-md bg-accentbackground p-2 transition-colors hover:bg-opacity-100 md:bg-opacity-50">
                Try
                <Image
                  src={LinkSVG}
                  className="dark:invert"
                  width={16}
                  height={16}
                  alt="Link Icon"
                  sizes="16px"
                />
              </div>
            </TransitionLink>
          )}
          {metadata.sourceLink && (
            <TransitionLink href={metadata.sourceLink}>
              <div className="flex gap-2 rounded-md bg-accentbackground p-2 transition-colors hover:bg-opacity-100 md:bg-opacity-50">
                Source
                <Image
                  src={CodeSVG}
                  className="dark:invert"
                  width={16}
                  height={16}
                  alt="Code Icon"
                  sizes="16px"
                />
              </div>
            </TransitionLink>
          )}
        </div>
      </div>
      <div className="order-2 group-even:order-1">
        <Image
          className={`absolute -bottom-4 right-[-5%] -z-10 aspect-video w-80 rounded-xl shadow-2xl blur-[2px] contrast-50 transition group-even:left-[-5%] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 md:z-0 md:blur-none md:contrast-100`}
          src={metadata.coverImage || "https://placehold.co/160x90"}
          width={160}
          height={90}
          sizes="(min-width: 400px) 320px, calc(65vw + 73px)"
          alt="Picture of the project"
        />
      </div>
    </div>
  );
}
