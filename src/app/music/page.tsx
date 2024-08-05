import ArtistCard from "@/components/Cards/ArtistCard";
import MusicCard from "@/components/Cards/MusicCard";
import pullPostToPArtists, { pullPostToPMusic } from "@/services/postToP";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import cron from "node-cron";

// export const revalidate = 60 * 60 * 24 * 3;
cron.schedule("0 5 * * 1", async () => {
  revalidatePath("/music");
});

export const metadata: Metadata = {
  title: "Music",
};

export default async function MusicPage() {
  const [musicData, artistData] = await Promise.all([
    pullPostToPMusic(),
    pullPostToPArtists(),
  ]);
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
        <div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[5fr_4fr] md:grid-rows-3">
            <MusicCard
              music={musicData[0]}
              className="md:row-start-1 md:row-end-4"
            ></MusicCard>
            <MusicCard
              music={musicData[1]}
              className="md:row-start-1 md:row-end-2"
              small={true}
            ></MusicCard>
            <MusicCard
              music={musicData[2]}
              className="md:row-start-2 md:row-end-3"
              small={true}
            ></MusicCard>
            <MusicCard
              music={musicData[3]}
              className="md:row-start-3 md:row-end-4"
              small={true}
            ></MusicCard>
          </div>
        </div>
      </section>
      <section>
        <h2 className="subheader">TOP 3 artists of the week</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {artistData.map((artist, i) => (
            <ArtistCard key={i} artist={artist} />
          ))}
        </div>
      </section>
      <p className="float-end">
        by{" "}
        <Link href={"/blog/postToP"} className="link">
          postToP
        </Link>
      </p>
    </>
  );
}
