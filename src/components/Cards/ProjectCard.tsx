import Image from "next/image";
import BookSVG from "@/../public/svg/book.svg";
import CodeSVG from "@/../public/svg/code.svg";
import LinkSVG from "@/../public/svg/link.svg";
import TransitionLink from "@/components/Atoms/TransitionLink";
import Hover from "../Atoms/Hover";
import SimpleIcon from "../Image/SimpleIcon";
import Link from "../Atoms/Link";

export default async function ProjectCard({ post }: { post: any }) {
  let { metadata } = post;
  return (
    <div
      className={
        "group relative mt-6 grid w-full overflow-hidden rounded-md p-4 shadow-sm sm:grid-cols-[4fr_1fr] sm:even:grid-cols-[1fr_4fr]"
      }
    >
      <div
        className={
          "order-2 flex flex-col p-5 group-even:items-end sm:order-1 sm:group-even:order-2"
        }
      >
        <p className={"mb-1 text-sm text-secondaryText"}>
          {metadata.date
            ? metadata.date
            : `${metadata.fromdate} - ${metadata.todate}`}
        </p>
        <div
          className={
            "flex flex-col justify-end gap-2 md:flex-row-reverse md:group-even:flex-row"
          }
        >
          <div className={"flex flex-wrap items-center gap-2"}>
            {metadata.tags.map((tag: string, i: number) => (
              <Hover hoverText={tag} key={i}>
                <SimpleIcon
                  height={20}
                  width={20}
                  className={"size-5"}
                  name={tag}
                  useDefaultColor
                />
              </Hover>
            ))}
          </div>
          <h2 className={"whitespace-nowrap text-xl font-bold"}>
            {metadata.title}
          </h2>
        </div>
        <p className={"mb-4 text-primaryText sm:text-secondaryText"}>
          {metadata.subtitle}
        </p>
        <div
          className={
            "mt-4 flex gap-4 text-sm font-semibold group-even:flex-row-reverse"
          }
        >
          <Link href={`/blog/${metadata.slug}`}>
            <div
              className={
                "flex gap-2 rounded-md bg-highlight p-2 transition-colors hover:bg-opacity-100 sm:bg-opacity-50"
              }
            >
              Read
              <Image
                src={BookSVG}
                className={"p-[1px] dark:invert"}
                width={16}
                height={16}
                alt={"Book Icon"}
                sizes={"16px"}
              />
            </div>
          </Link>
          {metadata.tryLink && (
            <Link href={metadata.tryLink}>
              <div
                className={
                  "flex gap-2 rounded-md bg-accentbackground p-2 transition-colors hover:bg-opacity-100 sm:bg-opacity-50"
                }
              >
                Try
                <Image
                  src={LinkSVG}
                  className={"dark:invert"}
                  width={16}
                  height={16}
                  alt={"Link Icon"}
                  sizes={"16px"}
                />
              </div>
            </Link>
          )}
          {metadata.sourceLink && (
            <Link href={metadata.sourceLink}>
              <div
                className={
                  "flex gap-2 rounded-md bg-accentbackground p-2 transition-colors hover:bg-opacity-100 sm:bg-opacity-50"
                }
              >
                Source
                <Image
                  src={CodeSVG}
                  className={"dark:invert"}
                  width={16}
                  height={16}
                  alt={"Code Icon"}
                  sizes={"16px"}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className={"order-1 sm:order-2 sm:group-even:order-1"}>
        <Image
          className={
            "-bottom-4 right-[-5%] aspect-video h-24 w-full rounded-t-xl object-cover object-top shadow-2xl transition sm:absolute sm:h-auto sm:w-80 sm:rounded-xl sm:group-even:left-[-5%] sm:group-hover:-translate-x-3 sm:group-hover:translate-y-3 sm:group-hover:-rotate-2 sm:group-even:group-hover:translate-x-3 sm:group-even:group-hover:translate-y-3 sm:group-even:group-hover:rotate-2"
          }
          src={metadata.coverImage || "https://placehold.co/160x90"}
          width={160}
          height={90}
          sizes={"(min-width: 400px) 320px, calc(65vw + 73px)"}
          alt={"Picture of the project"}
        />
      </div>
    </div>
  );
}
