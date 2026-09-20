import type { Metadata } from "next";
import Image from "next/image";
import Hover from "@/components/Atoms/Hover";
import JsonLD from "@/components/Atoms/JsonLD";
import Link from "@/components/Atoms/Link";
import EmailForm from "@/components/Forms/EmailForm";
import SimpleIcon from "@/components/Image/SimpleIcon";
import Timeline from "@/components/Timeline";
import createMetadata from "@/utils/Metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "David Pataki's personal page. Get to know more about me.",
  keywords: ["about", "personal", "profile", "bio", "contact"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: new Date("2003-12-31").toISOString(),
  dateModified: new Date().toISOString(),
  mainEntity: {
    "@id": "#main-author",
    "@type": "Person",
    name: "David Pataki",
    alternateName: ["devla", "davidpataki", "patakidavid", "gitdevla"],
    description:
      "Computer Science MSc student and backend-focused software developer from Hungary",
    sameAs: ["https://github.com/GitDevla"],
  },
};

export default function AboutPage() {
  return (
    <>
      <h1 className={"header"}>About Me</h1>
      <div className={"relative"}>
        <section className={"max-w-[65ch] space-y-4"}>
          <div>
            <span className={"inline-block scale-125"}>👋</span> Hi, I'm{" "}
            <Hover hoverText={"(just a nickname)"}>
              <span>Devla</span>
            </Hover>
            - real name is David. I'm a Computer Science MSc student at the{" "}
            <a
              className={"link"}
              href={"https://inf.unideb.hu/"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              University of Debrecen
            </a>{" "}
            in{" "}
            <a
              className={"link"}
              href={"https://www.google.com/maps/place/Hungary/"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Hungary
            </a>
            , and alongside my studies I work as a{" "}
            <b className={"font-semibold"}>C# / Blazor developer</b> at Digital
            Solutions Kft., where we build web-based ERP systems for other
            businesses.
          </div>
          <div>
            <Image
              className={
                "top-8 right-0 mx-auto my-auto w-1/2 rounded-lg shadow-lg md:absolute md:w-1/4"
              }
              src={"/aislop.png"}
              alt={"Picture of the author"}
              width={400}
              height={600}
            />
          </div>
          <p>
            <span className={"inline-block scale-125"}>🐣</span> I have been
            interested in computers and how they work from an early age, and I
            have been writing code since 2017. Most of it started as self-taught
            tinkering, and school and work built on top of that.
          </p>
          <p>
            <span className={"inline-block scale-125"}>🛠️</span> I'm more of a{" "}
            <span className={"text-muted italic quote"}>
              Jack of all trades, master of <s>none</s>
              <span className={"relative w-0"}>
                <span
                  className={
                    "absolute -top-[0.3rem] -left-[calc(4ch_+0.1rem)] box-border inline-block scale-90 -rotate-[10deg] bg-text px-1 py-[1px] font-medium text-canvas"
                  }
                >
                  some
                </span>
              </span>
            </span>
            .
            <br />
            In my own projects I like working with{" "}
            <b className={"font-semibold"}>
              TypeScript, Next.js, Docker and Linux
            </b>
            , and I enjoy wandering into networking, security and automation. At
            work I write{" "}
            <b className={"font-semibold"}>C#, .NET, Blazor and SQL</b> day to
            day.
          </p>
          <p>
            <span className={"inline-block scale-125"}>⚙️</span> I enjoy the
            backend side the most: data models, APIs and the business logic
            behind the screen, where the work is about solving the problem
            rather than getting the pixels right. I am happy to take on frontend
            work as well when a project needs it.
          </p>
          <p>
            <span className={"inline-block scale-125"}>🤖</span> On the AI side,
            I build small, task-specific models for language problems that plain
            rules cannot cover, like the one in my{" "}
            <Link href={"/blog/postToP"} className={"link"}>
              postToP
            </Link>{" "}
            project, where a general purpose LLM would be slower and heavier
            than the task needs. Writing the code myself is still the part I
            enjoy most, and LLM tooling is part of how software is built today,
            so I work with that as well.
          </p>
          <p>
            {/* resume */}
            <span className={"inline-block scale-125"}>📄</span> You can check
            out my
            <a
              href={"/resume.pdf"}
              className={"link"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              {" "}
              resume
            </a>{" "}
            for a more detailed overview of my skills and experience.
          </p>
        </section>
      </div>
      <section>
        <div className={"grid gap-8 md:grid-cols-2"}>
          <div>
            <h2 className={"subheader"}>Education</h2>
            <Timeline source={"education.json"} />
          </div>
          <div>
            <h2 className={"subheader"}>Experience</h2>
            <Timeline source={"experience.json"} />
          </div>
        </div>
      </section>
      <section className={"mt-16"}>
        <h2 id={"contact"} className={"subheader"}>
          Contact Me
        </h2>
        <div>
          You can reach me via email at{" "}
          <a href={`mailto:${process.env.MAIL}`} className={"link"}>
            {process.env.MAIL}
            <SimpleIcon name={"Gmail"} className={"mb-2 inline-block size-2"} />
          </a>
          , on Discord as{" "}
          <a
            href={`https://discordredirect.discordsafe.com/users/${process.env.NEXT_PUBLIC_DISCORD_ID}`}
            className={"link"}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            @Devla
            <SimpleIcon
              name={"Discord"}
              className={"mb-2 inline-block size-2"}
            />
          </a>
          , or by filling out the form below.
          <p className={"font-bold text-primary"}>
            I'm not associated with the{" "}
            <a
              href={"https://www.linkedin.com/company/devla"}
              target={"_blank"}
              className={"underline underline-offset-[0.2em]"}
              rel={"noopener noreferrer"}
            >
              Devla
            </a>{" "}
            German company, and not involved in NFT, crypto, or blockchain work,
            so please don't contact me about those topics.
          </p>
        </div>

        <EmailForm />
      </section>
      <JsonLD json={jsonLd} />
    </>
  );
}
