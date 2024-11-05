import { pullPostToPMusic } from "@/services/postToP";
import MusicCard from "../Cards/MusicCard";

export default async function TopMusicShowcase() {
  const musicData = await pullPostToPMusic();
  return (
    <div
      className={"grid grid-cols-1 gap-5 md:grid-cols-[5fr_4fr] md:grid-rows-3"}
    >
      <MusicCard
        music={musicData[0]}
        className={"md:row-start-1 md:row-end-4"}
      ></MusicCard>
      <MusicCard
        music={musicData[1]}
        className={"md:row-start-1 md:row-end-2"}
        small={true}
      ></MusicCard>
      <MusicCard
        music={musicData[2]}
        className={"md:row-start-2 md:row-end-3"}
        small={true}
      ></MusicCard>
      <MusicCard
        music={musicData[3]}
        className={"md:row-start-3 md:row-end-4"}
        small={true}
      ></MusicCard>
    </div>
  );
}
