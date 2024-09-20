import isProduction from "@/utils/isProd";

export default async function pullDiscordStatus() {
  if (!isProduction) return await mockData();

  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${process.env.NEXT_PUBLIC_DISCORD_ID}`,
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
        id: "363301732836704257",
        username: "devla",
        avatar: "70635fbb6b52084d30314f40558c08f5",
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
          state: "a",
          timestamps: {
            end: 1726437600000,
          },
          created_at: 1726399261405,
        },
        {
          flags: 1,
          id: "5018c9159fe7dea1",
          name: "postToP",
          type: 2,
          state: "ゆよゆっぺ",
          session_id: "2fbc22319e5cdc4428c4dc02056f6291",
          details: "【巡音ルカ】Misery【オリジナル】",
          application_id: "1281566483838668872",
          assets: {
            large_image:
              "mp:external/SK-GCMq4ucXgwuaJv5S6UlvZvJSTmMzV7OGb_wrbF9o/%3Fsqp%3D-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D%26rs%3DAOn4CLAuxwQ9idxmRPkG6MqjgG47MztCHg/https/i.ytimg.com/vi/mkkCadgzUfk/mqdefault.jpg",
            large_text: "00:20⠀◉一一一一一一一一⠀03:43",
            small_image: "1282080591076130919",
            small_text: "Playing",
          },
          created_at: 1726399272251,
          buttons: ["Listen"],
        },
        {
          flags: 1,
          id: "67f2517e6c39365d",
          name: "Code",
          type: 0,
          state: "Working on DiscordContext.tsx:6:68",
          session_id: "2fbc22319e5cdc4428c4dc02056f6291",
          details: "In devla.dev  ​​",
          timestamps: {
            start: 1726399019468,
          },
          application_id: "810516608442695700",
          assets: {
            large_image:
              "mp:external/ledVVfR9-gwyjYvoVaqZjX0LJmFiM51gyQ3hlIhUyK0/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/tsx.png",
            large_text: "Editing a TSX file",
            small_image:
              "mp:external/Joitre7BBxO-F2IaS7R300AaAcixAvPu3WD1YchRgdc/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/vscode.png",
            small_text: "Visual Studio Code",
          },
          created_at: 1726399244139,
        },
      ],
      discord_status: "idle",
      active_on_discord_web: false,
      active_on_discord_desktop: true,
      active_on_discord_mobile: false,
      listening_to_spotify: false,
    },
    success: true,
  };
}
