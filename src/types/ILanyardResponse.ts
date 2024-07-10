interface ILanyardResponse {
  data: {
    discord_status: "online" | "dnd" | "idle";
    discord_user: {
      username: string;
      avatar: string;
      id: string;
    };
    spotify: {
      track_id: string;
      song: string;
      artist: string;
      album_art: string;
    };
  };
}
