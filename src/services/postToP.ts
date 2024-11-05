import moment from "moment";
import isProduction from "@/utils/isProd";
import { readJSON } from "@/utils/ReadJSON";

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

function getChannelURL(channelID: string) {
  return `https://music.youtube.com/channel/${channelID}`;
}

function getVideoURL(videoID: string) {
  return `https://music.youtube.com/watch?v=${videoID}`;
}

export async function pullPostToPArtists(): Promise<IPostToPArtist[]> {
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
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${artistID.slice(
            1,
          )}&key=${process.env.YOUTUBE_API_KEY}`,
        );
      } else {
        ytData = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${artistID}&key=${process.env.YOUTUBE_API_KEY}`,
        );
      }
      const data = (await ytData.json()) as IYTArtistResponse;
      const { id, snippet } = data.items[0];
      const { title: name, thumbnails } = snippet;
      const { url: thumbnail_url } = thumbnails.high;
      const ytUrl = getChannelURL(id);
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
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${musicID}&key=${process.env.YOUTUBE_API_KEY}`,
      );
      const data = (await ytData.json()) as IYTVideoResponse;
      const {
        title,
        channelTitle: author_name,
        channelId,
      } = data.items[0].snippet;
      const { url: thumbnail_url } = data.items[0].snippet.thumbnails.high;
      const author_url = getChannelURL(channelId);
      const ytUrl = getVideoURL(musicID);
      return { title, author_name, author_url, ytUrl, thumbnail_url, times };
    }),
  );
  return ytData;
}

export async function pullPostToPGenres(): Promise<IPostToPGenre[]> {
  if (!isProduction) return await mockDataGenre();

  let lastWeekSunday = LastWeekSunday();
  let lastWeekMonday = LastWeekMonday();
  let response = await fetch(
    `${
      process.env.postToP_URL
    }genre?from=${lastWeekSunday.toUTCString()}&to=${lastWeekMonday.toUTCString()}&limit=10`,
  );
  let data = await response.json();
  data = data.map((i: IPostToPGenre) => {
    let { genre, times } = i;
    genre = genre.replace("_", " ");
    return { genre, times };
  });
  return data;
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

async function mockDataGenre() {
  const data = [
    { genre: "Pop music", times: 75 },
    { genre: "Music of Asia", times: 51 },
    { genre: "Electronic music", times: 45 },
    { genre: "Rock music", times: 24 },
    { genre: "Independent music", times: 14 },
    { genre: "Hip hop music", times: 5 },
  ];
  return data;
}
