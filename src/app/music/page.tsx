import MusicCard from "@/components/Cards/MusicCard";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 9;

export const metadata: Metadata = {
  title: "Music",
};

async function fetchData() {
  let response = await fetch("http://192.168.1.5:8000/?type=music");
  let data = await response.json();
  return data;
}

async function fetchMusic() {
  const data = await fetchData();
  const ytData = await Promise.all(
    data.map(async (music: any) => {
      const [ytid, times] = music;
      const ytData = await fetch(
        `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${ytid}&format=json`
      );
      const ytJson = await ytData.json();
      const { title, author_name, author_url, thumbnail_url } = ytJson;
      const ytUrl = `https://music.youtube.com/watch?v=${ytid}`;
      return { title, author_name, author_url, ytUrl, thumbnail_url, times };
    })
  );
  return ytData;
}

export default async function MusicPage() {
  const data = await fetchMusic();
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
      <div>Soon...</div>
      <p className="float-end">
        Last Updated: {`${currentTime.getMonth()}/${currentTime.getDate()}`}
      </p>
    </>
  );
}
