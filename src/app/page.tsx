import { promises as fs } from "fs";
import Image from "next/image";
import LinkCard from "@/components/Cards/LinkCard";
import CardSection from "@/components/Sections/CardSection";
import SkillSection from "@/components/Sections/SkillSection";
import { Typewriter } from "nextjs-simple-typewriter";
import readJSON from "@/utils/ReadJSON";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const techStack: ITechSkill[] = await readJSON("src/app/skills.json");

  const pages = [
    {
      name: "About Me",
      href: "/about",
      description: "In case you want to learn more about me",
    },
    {
      name: "Projects",
      href: "/projects",
      description: "Projects I put some elbow grease into",
    },
    { name: "Music", href: "/music", description: "Mind of a weeb" },
    {
      name: "Repos",
      href: "/repos",
      description: "All my published repositories",
    },
    // { name: "Donate", href: "/donate", description: "todo" },
    // { name: "Blog", href: "/blog", description: "todo" },
    {
      name: "Contact",
      href: "/contact",
      description: "If you are interested in contacting me",
    },
  ];

  const links = [
    {
      name: "Github",
      description: "Personal Github page",
      href: "https://github.com/GitDevla",
    },
    {
      name: "Gitea",
      description: "Self-hosted Github for more throwaway projects",
      href: "https://hira.devla.dev",
    },
  ];

  return (
    <>
      <section className="flex justify-between items-center">
        <div className="text-lg">
          <h1 className="text-xl">Hi, I am Devla.</h1>
          <p>
            I&apos;m a second-year undergraduate <br />
            whom enjoys{" "}
            <Typewriter
              words={[
                "Coding",
                "Frontend",
                "developing Backends",
                "writing Scripts",
                "managing my Home Server",
                "breaking stuff",
                "listening to music",
                "watching anime",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={800}
            />
          </p>
        </div>
        <Image
          className="rounded-full w-44 h-44 mr-6"
          src="https://placehold.co/400"
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </section>
      <CardSection title="Pages">
        {pages.map((page, i) => (
          <LinkCard key={i} {...page}></LinkCard>
        ))}
      </CardSection>

      <CardSection title="Links">
        {links.map((page, i) => (
          <LinkCard key={i} {...page}></LinkCard>
        ))}
      </CardSection>

      <SkillSection techStack={techStack}></SkillSection>
    </>
  );
}
