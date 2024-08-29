import TopArtistShowcase from "@/components/Showcase/TopArtistShowcase";
import TopGenreShowcase from "@/components/Showcase/TopGenreShowcase";
import TopMusicShowcase from "@/components/Showcase/TopMusicShowcase";
import TransitionLink from "@/components/TransitionLink";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60 * 60 * 24 * 8; // Actual revalidation is ran using instrumentation.ts
// cron.schedule("0 5 * * 1", async () => {
//   revalidatePath("/music");
// });

export const metadata: Metadata = {
  title: "Music",
};

export default async function MusicPage() {
  return (
    <>
      <section>
        <h1 className="header">Music</h1>
        <p>
          Collection of my most played songs and artists on{" "}
          <Link href={"https://www.youtube.com/"} className="link">
            Youtube
          </Link>{" "}
          &{" "}
          <Link href={"https://music.youtube.com/"} className="link">
            Youtube Music
          </Link>
          .
        </p>
      </section>
      <section className="mb-4">
        <h2 className="subheader">Currently Listening to</h2>
        <div>Soon...</div>
      </section>
      <section className="mb-4">
        <h2 className="subheader">TOP 4 songs of the week</h2>
        <TopMusicShowcase />
      </section>
      <section>
        <h2 className="subheader">TOP 3 artists of the week</h2>
        <TopArtistShowcase />
      </section>
      <section>
        <h2 className="subheader">Genres of the week</h2>
        <TopGenreShowcase />
      </section>
      <p className="float-end">
        by{" "}
        <TransitionLink href={"/blog/postToP"} className="link">
          postToP
        </TransitionLink>
      </p>
    </>
  );
}
