import Image from "next/image";
import LinkCard from "@/components/Cards/LinkCard";
import SkillSection from "@/components/Sections/SkillSection";
import { Typewriter } from "nextjs-simple-typewriter";
import { readStatic } from "@/utils/ReadJSON";
import DiscordStatusDot from "@/components/DiscordStatusDot";
import TechCarusel from "@/components/TechCarusel";

export const revalidate = 60 * 60 * 9;

export default async function Home() {
  const techStack: ITechSkill[] = await readStatic("skills.json");
  const pages = [
    {
      group: "Pages",
      pages: [
        {
          name: "About Me",
          href: "/about",
          description: "Learn more about my background and experiences.",
        },
        {
          name: "Projects",
          href: "/projects",
          description: "Explore the projects I've developed.",
        },
        {
          name: "Music",
          href: "/music",
          description: "Discover my most listened songs.",
        },
        {
          name: "Repos",
          href: "/repos",
          description: "Access my published repositories.",
        },
        // { name: "Donate", href: "/donate", description: "todo" },
        // { name: "Blog", href: "/blog", description: "todo" },
        {
          name: "Contact",
          href: "/about#contact",
          description: "Get in touch with me.",
        },
      ],
    },
    {
      group: "Links",
      pages: [
        {
          name: "Github",
          description: "Visit my personal GitHub page.",
          href: `https://github.com/${process.env.GITHUB_ID}`,
        },
        {
          name: "Gitea",
          description:
            "Check out my self-hosted Git repositories for additional projects.",
          href: `${process.env.GITEA_URL}/${process.env.GITEA_ID}`,
        },
      ],
    },
  ];

  return (
    <>
      <section className="flex flex-col-reverse items-center justify-between md:flex-row md:items-stretch md:px-4">
        <div className="flex flex-col justify-between text-center text-lg md:text-left">
          <div className="mt-8">
            <h1 className="text-2xl font-bold">Hi, I am Devla.</h1>
            <p className="break-all text-sm md:text-base">
              I'm a second-year undergraduate
              <br />
              whom enjoys{" "}
              <Typewriter
                words={[
                  "coding",
                  "designing frontends",
                  "developing backends",
                  "writing scripts",
                  "managing my home server",
                  "breaking stuff",
                  "listening to music",
                ]}
                loop={0}
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={800}
              />
              <span className="relative -left-1 inline-block w-0 animate-blink">
                |
              </span>
              .
            </p>
          </div>
          <blockquote className="mt-4 text-xs font-thin italic text-secondaryText md:ml-2 md:text-sm">
            "Let's fall and fall into the vortex of this hole-dwelling life."
          </blockquote>
        </div>
        <div className="relative">
          <Image
            className="h-44 w-44 rounded-full"
            src="https://placehold.co/400"
            width={200}
            height={200}
            alt="Picture of the author"
            priority
          />
          <DiscordStatusDot className="absolute bottom-3 right-1 rounded-full bg-background p-2" />
        </div>
      </section>

      {pages.map((group, i) => (
        <section key={i}>
          <h2 className="subheader">{group.group}</h2>
          <div className="grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2">
            {group.pages.map((page, i) => (
              <LinkCard key={i} {...page}></LinkCard>
            ))}
          </div>
        </section>
      ))}

      <SkillSection techStack={techStack}>
        <TechCarusel tech={techStack}></TechCarusel>
      </SkillSection>
    </>
  );
}
