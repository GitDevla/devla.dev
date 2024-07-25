import { readJSON } from "@/utils/ReadJSON";

const isDevelopment = process.env.NODE_ENV === "development";

function LastWeekSunday() {
  let today = new Date();
  return today;
}

function LastWeekMonday() {
  let today = new Date();
  let lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return lastWeek;
}

export default async function pullPostToPArtists(): Promise<IPostToPArtist[]> {
  if (isDevelopment) {
    return await mockDataArtist();
  }
  let today = LastWeekSunday();
  let lastWeek = LastWeekMonday();
  let response = await fetch(
    `${
      process.env.postToP_URL
    }artist?from=${today.toISOString()}&to=${lastWeek.toISOString()}&limit=3`
  );
  let data = await response.json();
  const ytData = await Promise.all(
    data.map(async (artist: any) => {
      const [ytid] = artist;
      let ytData;
      if ((ytid as String).startsWith("@")) {
        ytData = await fetch(
          `https://yt.lemnoslife.com/noKey/channels?part=snippet&forHandle=${ytid.slice(
            1
          )}`
        );
      } else {
        ytData = await fetch(
          `https://yt.lemnoslife.com/noKey/channels?part=snippet&id=${ytid}`
        );
      }
      const data = (await ytData.json()) as IYTArtistResponse;
      const { id, snippet } = data.items[0];
      const { title: name, thumbnails } = snippet;
      const { url: thumbnail_url } = thumbnails.default;
      const ytUrl = `https://music.youtube.com/channel/${id}`;
      return { name, ytUrl, thumbnail_url };
    })
  );
  return ytData;
}

export async function pullPostToPMusic(): Promise<IPostToPMusic[]> {
  if (isDevelopment) {
    return await mockDataMusic();
  }
  let today = LastWeekSunday();
  let lastWeek = LastWeekMonday();
  let response = await fetch(
    `${
      process.env.postToP_URL
    }music?from=${today.toISOString()}&to=${lastWeek.toISOString()}&limit=4`
  );
  let data = await response.json();
  const ytData = await Promise.all(
    data.map(async (music: any) => {
      const [ytid, times] = music;
      const ytData = await fetch(
        `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${ytid}&format=json`
      );
      const data = (await ytData.json()) as IYTVideoResponse;
      const { title, author_name, author_url, thumbnail_url } = data;
      const ytUrl = `https://www.youtube.com/watch?v=${ytid}`;
      return { title, author_name, author_url, ytUrl, thumbnail_url, times };
    })
  );
  return ytData;
}

async function mockDataMusic() {
  const data = (await readJSON(
    "src/services/mockData/fakePostToPMusic.json"
  )) as IPostToPMusic[];
  return data;
}

async function mockDataArtist() {
  const data = (await readJSON(
    "src/services/mockData/fakePostToPArtists.json"
  )) as IPostToPArtist[];
  return data;
}
