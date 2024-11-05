interface ILanyardResponse {
  data: {
    kv: {};
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      clan: any;
      avatar_decoration_data: any;
      bot: boolean;
      global_name: string;
      display_name: string;
      public_flags: number;
    };
    activities: Array<{
      flags: number;
      id: string;
      name: string;
      type: number;
      state: string;
      session_id: string;
      details: string;
      application_id: string;
      timestamps: {
        start: number;
      };
      assets: {
        large_image: string;
        large_text: string;
        small_image: string;
        small_text: string;
      };
      created_at: number;
    }>;
    discord_status: string;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    spotify: any;
  };
  success: boolean;
}
