import isProduction from "@/utils/isProd";
import { readJSON } from "@/utils/ReadJSON";
import moment from "moment";

// I fucking love timezones & notations
function LastWeekSunday() {
  return moment()
    .utcOffset(0)
    .subtract(1, "weeks")
    .isoWeekday(7)
    .endOf("day")
    .toDate();
}

function LastWeekMonday() {
  return moment()
    .utcOffset(0)
    .subtract(1, "weeks")
    .isoWeekday(1)
    .startOf("day")
    .toDate();
}

export default async function pullPostToPArtists(): Promise<IPostToPArtist[]> {
  if (!isProduction) return await mockDataArtist();

  let lastWeekSunday = LastWeekSunday();
  let lastWeekMonday = LastWeekMonday();
  let response = await fetch(
    `${
      process.env.postToP_URL
    }artist?from=${lastWeekSunday.toUTCString()}&to=${lastWeekMonday.toUTCString()}&limit=3`,
  );
  let data = await response.json();
  const ytData = await Promise.all(
    data.map(async (artist: any) => {
      const { artistID } = artist;
      let ytData;
      if ((artistID as String).startsWith("@")) {
        ytData = await fetch(
          `https://yt.lemnoslife.com/noKey/channels?part=snippet&forHandle=${artistID.slice(
            1,
          )}`,
        );
      } else {
        ytData = await fetch(
          `https://yt.lemnoslife.com/noKey/channels?part=snippet&id=${artistID}`,
        );
      }
      const data = (await ytData.json()) as IYTArtistResponse;
      const { id, snippet } = data.items[0];
      const { title: name, thumbnails } = snippet;
      const { url: thumbnail_url } = thumbnails.default;
      const ytUrl = `https://music.youtube.com/channel/${id}`;
      return { name, ytUrl, thumbnail_url };
    }),
  );
  return ytData;
}

export async function pullPostToPMusic(): Promise<IPostToPMusic[]> {
  if (!isProduction) return await mockDataMusic();

  let lastWeekSunday = LastWeekSunday();
  let lastWeekMonday = LastWeekMonday();
  let response = await fetch(
    `${
      process.env.postToP_URL
    }music?from=${lastWeekSunday.toUTCString()}&to=${lastWeekMonday.toUTCString()}&limit=4`,
  );
  let data = await response.json();
  const ytData = await Promise.all(
    data.map(async (music: any) => {
      const { musicID, times } = music;
      const ytData = await fetch(
        `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${musicID}&format=json`,
      );
      const data = (await ytData.json()) as IYTVideoResponse;
      const { title, author_name, author_url, thumbnail_url } = data;
      const ytUrl = `https://music.youtube.com/watch?v=${musicID}`;
      return { title, author_name, author_url, ytUrl, thumbnail_url, times };
    }),
  );
  return ytData;
}

async function mockDataMusic() {
  const data = (await readJSON(
    "src/services/mockData/fakePostToPMusic.json",
  )) as IPostToPMusic[];
  return data;
}

async function mockDataArtist() {
  const data = (await readJSON(
    "src/services/mockData/fakePostToPArtists.json",
  )) as IPostToPArtist[];
  return data;
}
