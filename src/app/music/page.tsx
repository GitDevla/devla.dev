import ArtistCard from "@/components/Cards/ArtistCard";
import MusicCard from "@/components/Cards/MusicCard";
import TransitionLink from "@/components/TransitionLink";
import {
  pullPostToPMusic,
  pullPostToPArtists,
  pullPostToPGenres,
} from "@/services/postToP";
import { generateRandomDarkColor } from "@/utils/color";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60 * 60 * 24 * 1;
// cron.schedule("0 5 * * 1", async () => {
//   revalidatePath("/music");
// });

export const metadata: Metadata = {
  title: "Music",
};

function genreToPercentages(data: IPostToPGenre[]) {
  const total = data.reduce((acc, curr) => acc + curr.times, 0);
  return data.map((genre) => {
    return {
      genre: genre.genre,
      percentage: Math.round((genre.times / total) * 100),
    };
  });
}

export default async function MusicPage() {
  const [musicData, artistData, genreData] = await Promise.all([
    pullPostToPMusic(),
    pullPostToPArtists(),
    pullPostToPGenres(),
  ]);
  const genrePercentages = genreToPercentages(genreData);
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
      <section>
        <h2 className="subheader">Genres of the week</h2>
        <div className="mt-6 flex w-full rounded-lg">
          {genrePercentages.map((genre, i) => (
            <div
              key={i}
              className="group relative cursor-pointer p-2 transition-all hover:z-10 hover:!w-[90%] dark:backdrop-invert"
              style={{
                width: `${genre.percentage}%`,
                backgroundColor: generateRandomDarkColor(),
                borderRadius:
                  i == 0
                    ? "0.5rem 0 0 0.5rem"
                    : i == genrePercentages.length - 1
                      ? "0 0.5rem 0.5rem 0"
                      : "0",
                borderRight:
                  i != genrePercentages.length - 1
                    ? "1px solid rgb(var(--secondaryText))"
                    : "none",
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 translate-y-full truncate text-center opacity-30 transition-opacity group-hover:opacity-100">
                {genre.percentage}%
              </div>
              <div className="absolute left-0 right-0 top-0 -translate-y-full truncate text-center opacity-30 transition-opacity group-hover:opacity-100">
                {genre.genre}
              </div>
            </div>
          ))}
        </div>
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
