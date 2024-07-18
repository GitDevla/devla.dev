const isDevelopment = process.env.NODE_ENV === "development";

export default async function pullDiscordStatus() {
  if (isDevelopment) {
    return await mockData();
  }
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${process.env.NEXT_PUBLIC_DISCORD_ID}`
  );
  const data = (await response.json()) as ILanyardResponse;
  return data;
}

async function mockData() {
  return {
    data: {
      kv: {},
      spotify: null,
      discord_user: {
        id: "123456789012345678",
        username: "devla",
        avatar: "123456789012345678",
        discriminator: "0",
        bot: false,
        clan: null,
        global_name: "Devla",
        avatar_decoration_data: null,
        display_name: "Devla",
        public_flags: 256,
      },
      activities: [
        {
          id: "custom",
          name: "Custom Status",
          type: 4,
          state: "Checking resource integrity...",
          created_at: 1721299863725,
        },
      ],
      discord_status: "online",
      active_on_discord_web: false,
      active_on_discord_desktop: true,
      active_on_discord_mobile: false,
      listening_to_spotify: false,
    },
    success: true,
  };
}
