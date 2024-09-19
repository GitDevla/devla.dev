import EmailForm from "@/components/EmailForm";
import Hover from "@/components/Hover";
import SimpleIcon from "@/components/SimpleIcon";
import Timeline from "@/components/Timeline";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="header">About Me</h1>
      <div className="relative">
        <section className="max-w-[65ch] space-y-4">
          <p>
            <span className="inline-block scale-125">👋</span> Hi, I'm{" "}
            <Hover hoverText="(just a nickname)">
              <span>Devla</span>
            </Hover>
            - real name is David. I'm a self-taught developer from{" "}
            <a
              className="link"
              href="https://www.google.com/maps/place/Hungary/"
            >
              Hungary
            </a>
            , currently studying computer science as a second-year undergraduate
            at the{" "}
            <a className="link" href="https://inf.unideb.hu/">
              University of Debrecen
            </a>
            .
          </p>
          <Image
            className="right-0 top-1/2 mx-auto my-auto w-1/2 md:absolute md:w-1/4 md:-translate-y-1/2"
            src="https://placehold.co/400x600"
            alt="Picture of the author"
            width={400}
            height={600}
          />
          <p>
            <span className="inline-block scale-125">🐣</span> I have been
            interested in the world of computers and it's workings from an early
            age, as of now I have about{" "}
            <b className="font-semibold">
              {new Date().getFullYear() - 2017}+ years of combined experience
            </b>{" "}
            in the field.
          </p>
          <p>
            <span className="inline-block scale-125">🛠️</span> I'm more of a{" "}
            <span className="quote italic text-secondaryText">
              Jack of all trades, master of <s>none</s>
              <span className="relative w-0">
                <span className="absolute -left-[calc(4ch_+_0.4rem)] -top-[0.2rem] box-border inline-block -rotate-[10deg] scale-90 bg-primaryText px-1 py-[1px] font-medium text-background">
                  some
                </span>
              </span>
            </span>
            .
            <br />
            In the ocean, that is software development, I have experience with a
            wide range of technologies and fields such as:{" "}
            <b className="font-semibold">
              frontend web design, backend & APIs, networking & security,
              automation,
            </b>{" "}
            and more.
          </p>
          <p>
            <span className="inline-block scale-125">⚙️</span> I mainly enjoy
            working on the backend side, as I like to solve problems and create
            efficient solutions rather then focusing on the nitty-gritty design
            aspect of a user interface. But I'm not afraid to get my hands dirty
            with frontend development if I have to.
          </p>
        </section>
      </div>
      <section>
        <h2 className="subheader">Education</h2>
        <Timeline></Timeline>
      </section>
      <section className="mt-16">
        <h2 id="contact" className="subheader">
          Contact Me
        </h2>
        <div>
          You can reach me via email at{" "}
          <a href={`mailto:${process.env.MAIL}`} className="link">
            {process.env.MAIL}
            <SimpleIcon name="Gmail" className="mb-2 inline-block size-2" />
          </a>
          , on Discord as{" "}
          <a href="https://discord.com/" className="link">
            @Devla
            <SimpleIcon name="Discord" className="mb-2 inline-block size-2" />
          </a>
          , or by filling out the form below.
        </div>

        <EmailForm />
      </section>
    </>
  );
}
