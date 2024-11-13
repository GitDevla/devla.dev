import { Metadata } from "next";
import Link from "@/components/Atoms/Link";
import TopArtistShowcase from "@/components/Showcase/TopArtistShowcase";
import TopGenreShowcase from "@/components/Showcase/TopGenreShowcase";
import TopMusicShowcase from "@/components/Showcase/TopMusicShowcase";
import createMetadata from "@/utils/Metadata";

export let revalidate = 60 * 60 * 24 * 8; // Actual revalidation is ran using instrumentation.ts

export const metadata: Metadata = createMetadata({
  title: "Music",
  description: "Collection of my most played songs and artists on Youtube & Youtube Music.",
  keywords: ["music", "songs", "artists", "youtube", "youtube music"],
});

export default async function MusicPage() {
  return (
    <>
      <section>
        <h1 className={"header"}>Music</h1>
        <p>
          Collection of my most played songs and artists on{" "}
          <Link href={"https://www.youtube.com/"} className={"link"} external>
            Youtube
          </Link>{" "}
          &{" "}
          <Link href={"https://music.youtube.com/"} className={"link"} external>
            Youtube Music
          </Link>
          .
        </p>
      </section>
      <section className={"mb-4"}>
        <h2 className={"subheader"}>Currently Listening to</h2>
        <div>Soon...</div>
      </section>
      <section className={"mb-4"}>
        <h2 className={"subheader"}>TOP 4 songs of the week</h2>
        <TopMusicShowcase />
      </section>
      <section>
        <h2 className={"subheader"}>TOP 3 artists of the week</h2>
        <TopArtistShowcase />
      </section>
      <section>
        <h2 className={"subheader"}>Genres of the week</h2>
        <TopGenreShowcase />
      </section>
      <p className={"float-end"}>
        by{" "}
        <Link href={"/blog/postToP"} className={"link"}>
          postToP
        </Link>
      </p>
    </>
  );
}
