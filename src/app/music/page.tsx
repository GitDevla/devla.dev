import ArtistCard from "@/components/Cards/ArtistCard";
import MusicCard from "@/components/Cards/MusicCard";
import pullPostToPArtists, { pullPostToPMusic } from "@/services/postToP";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 9;

export const metadata: Metadata = {
  title: "Music",
};

async function fetchData() {
  let today = new Date();
  let lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  let response = await fetch(
    `http://192.168.1.5:8000/music?from=${today.toISOString()}&to=${lastWeek.toISOString()}&limit=4`
  );
  let data = await response.json();
  return data;
}

export default async function MusicPage() {
  const data = await pullPostToPMusic();
  const artistData = await pullPostToPArtists();
  const currentTime = new Date();
  return (
    <>
      <h1 className="mb-3 text-2xl font-bold uppercase">Music</h1>
      <p>
        Collection of my most played songs and artists on Youtube & Youtube
        Music.
      </p>
      <p>
        If you are intrested in the inner workings check out my postToP project.
      </p>
      <h2 className="mb-3 text-1xl font-bold uppercase mt-5">
        Currently Listening to
      </h2>
      <div>Soon...</div>
      <h2 className="mb-3 text-1xl font-bold uppercase mt-5">
        TOP 4 songs of the week
      </h2>
      <div>
        <div className="grid grid-cols-1 lg:grid-rows-3 gap-5 mt-6 lg:grid-cols-[5fr_4fr] w-full">
          <MusicCard
            music={data[0]}
            className="lg:row-start-1 lg:row-end-4"
          ></MusicCard>
          <MusicCard
            music={data[1]}
            className="lg:row-start-1 lg:row-end-2"
            small={true}
          ></MusicCard>
          <MusicCard
            music={data[2]}
            className="lg:row-start-2 lg:row-end-3"
            small={true}
          ></MusicCard>
          <MusicCard
            music={data[3]}
            className="lg:row-start-3 lg:row-end-4"
            small={true}
          ></MusicCard>
        </div>
      </div>
      <h2 className="mb-3 text-1xl font-bold uppercase mt-5">
        TOP 3 artists of the week
      </h2>
      <div className="grid md:grid-cols-3 gap-5 justify-items-center">
        {artistData.map((artist, i) => (
          <ArtistCard key={i} artist={artist} />
        ))}
      </div>
      <p className="float-end">
        Last Updated: {`${currentTime.getMonth()}/${currentTime.getDate()}`}
      </p>
    </>
  );
}
