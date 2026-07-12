interface IPostToPMusic {
	yt_id: string;
	video_title: string;
	listen_count: string;
	channel: Channel;
}

export interface Channel {
	yt_id: string;
	name: string;
}

interface IPostToPArtist {
	artist_id: string;
	artist_name: string;
	listen_count: string;
	artist_profile_picture_url: string;
}

interface IPostToPGenre {
	genre_name: string;
	listen_count: number;
}
