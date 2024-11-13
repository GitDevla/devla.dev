import JsonLD from "@/components/Atoms/JsonLD";
import LinkCard from "@/components/Cards/LinkCard";
import DiscordStatusDot from "@/components/DiscordStatusDot";
import SkillSection from "@/components/Sections/SkillSection";
import TechSkillShowcase from "@/components/Showcase/TechSkillShowcase";
import { readStatic } from "@/utils/ReadJSON";
import RenderProfileCard from "./RenderProfileCard";
import TypewriterIntro from "../../components/Typewriter";

export let revalidate = 60 * 60 * 9;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Pataki",
  url: "https://devla.dev",
  image: "https://devla.dev/favicon.ico",
  sameAs: ["https://devla.dev/about"],
  email: "contact@devla.dev",
  description: "Passionate and creative full-stack software engineer from Hungary",
  foundingDate: new Date("2003-12-31").toISOString(),
};

export default async function Home() {
  const { categories, idk: techStack } = await readStatic("skills.json");
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
          name: "Repositories",
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
      <section
        className={
          "flex flex-col-reverse items-center justify-between md:flex-row md:items-stretch md:px-4"
        }
      >
        <div
          className={
            "flex flex-col items-center justify-between text-center text-lg md:items-start md:text-left"
          }
        >
          <div className={"mt-12 flex flex-col items-center md:items-start"}>
            <div className={"flex items-center gap-2"}>
              <h1 className={"text-2xl font-bold"}>Hi, I am Devla.</h1>
              <DiscordStatusDot
                className={"inline-block size-4 rounded-full bg-background"}
              />
            </div>
            <p className={"break-all text-sm md:text-base"}>
              I'm a second-year undergraduate
              <br />
              whom enjoys{" "}
              <TypewriterIntro sentences={[
                "coding",
                "designing frontends",
                "developing backends",
                "writing scripts",
                "managing my home server",
                "breaking stuff",
                "listening to music",
              ]}
                typeSpeed={60} delaySpeed={800} deleteSpeed={40} />
              .
            </p>
          </div>
          <blockquote
            className={
              "mt-4 text-xs italic text-secondaryText md:ml-2 md:text-sm"
            }
          >
            Let's fall and fall into the vortex of this hole-dwelling life.
          </blockquote>
        </div>
        <RenderProfileCard />
      </section>

      {pages.map((group, i) => (
        <section key={i}>
          <h2 className={"subheader"}>{group.group}</h2>
          <div className={"grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2"}>
            {group.pages.map((page, i) => (
              <LinkCard key={i} {...page} />
            ))}
          </div>
        </section>
      ))}
      <SkillSection techStack={techStack} categories={categories}>
        <TechSkillShowcase tech={techStack} />
      </SkillSection>
      <JsonLD json={jsonLd} />
    </>
  );
}

