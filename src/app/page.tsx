import Image from "next/image";
import LinkCard from "@/components/Cards/LinkCard";
import CardSection from "@/components/Sections/CardSection";
import SkillSection from "@/components/Sections/SkillSection";
import { Typewriter } from "nextjs-simple-typewriter";
import { readStatic } from "@/utils/ReadJSON";
import DiscordStatusDot from "@/components/DiscordStatusDot";

export const revalidate = 60 * 60 * 9;

export default async function Home() {
  const techStack: ITechSkill[] = await readStatic("skills.json");
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
      href: `https://github.com/${process.env.GITHUB_ID}`,
    },
    {
      name: "Gitea",
      description: "Self-hosted Github for more throwaway projects",
      href: `${process.env.GITEA_URL}/${process.env.GITEA_ID}`,
    },
  ];

  return (
    <>
      <section className="flex justify-between items-center flex-col-reverse md:flex-row">
        <div className="text-lg  text-center md:text-left">
          <h1 className="text-xl">Hi, I am Devla.</h1>
          <p>
            I'm a second-year undergraduate <br />
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
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={800}
            />
            <span className="animate-blink">|</span>
          </p>
          <blockquote className="ml-2 mt-4 text-sm italic font-thin text-secondaryText">
            <p>
              "Let's fall and fall into the vortex of this hole-dwelling life."
            </p>
          </blockquote>
        </div>
        <div className="relative">
          <Image
            className="rounded-full w-44 h-44 mr-6"
            src="https://placehold.co/400"
            width={200}
            height={200}
            alt="Picture of the author"
          />
          <DiscordStatusDot className="absolute bottom-4 right-7 p-2 bg-background rounded-full"></DiscordStatusDot>
        </div>
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
