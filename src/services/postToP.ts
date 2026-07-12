import moment from "moment";
import type {
	IPostToPArtist,
	IPostToPGenre,
	IPostToPMusic,
} from "@/types/postToP";
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
	// if (!isProduction) return await mockDataArtist();

	const lastWeekSunday = LastWeekSunday();
	const lastWeekMonday = LastWeekMonday();
	const response = await fetch(
		`${
			process.env.postToP_URL
		}user/${process.env.POSTTOP_HANDLE}/top?endDate=${lastWeekSunday.toUTCString()}&startDate=${lastWeekMonday.toUTCString()}&limit=3&type=artist`,
	);
	const data = (await response.json()) as IPostToPArtist[];
	return data;
}

export async function pullPostToPMusic(): Promise<IPostToPMusic[]> {
	// if (!isProduction) return await mockDataMusic();

	const lastWeekSunday = LastWeekSunday();
	const lastWeekMonday = LastWeekMonday();
	const response = await fetch(
		`${
			process.env.postToP_URL
		}user/${process.env.POSTTOP_HANDLE}/top?endDate=${lastWeekSunday.toUTCString()}&startDate=${lastWeekMonday.toUTCString()}&limit=4&type=music`,
	);
	const data = (await response.json()) as IPostToPMusic[];

	return data;
}

export async function pullPostToPGenres(): Promise<IPostToPGenre[]> {
	// if (!isProduction) return await mockDataGenre();

	const lastWeekSunday = LastWeekSunday();
	const lastWeekMonday = LastWeekMonday();
	const response = await fetch(
		`${
			process.env.postToP_URL
		}user/${process.env.POSTTOP_HANDLE}/top?endDate=${lastWeekSunday.toUTCString()}&startDate=${lastWeekMonday.toUTCString()}&limit=10&type=genre`,
	);
	let data = await response.json();
	console.log("Raw genre data from postToP:", data);
	data = data.map((i: IPostToPGenre) => {
		let { genre_name: genre, listen_count: times } = i;
		genre = genre.replace("https://en.wikipedia.org/wiki/", "").trim();
		genre = genre.replaceAll("_", " ");
		times = Number(times);
		return { genre, times };
	});
	data = data.filter((i: any) => i.genre !== "Music");
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
