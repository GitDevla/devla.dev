import Image from "next/image";
import type { IPostToPArtist } from "@/types/postToP";
import Link from "../Atoms/Link";

export default function ArtistCard({ artist }: { artist: IPostToPArtist }) {
  const {
    artist_name,
    artist_id: ytUrl,
    artist_profile_picture_url: thumbnail_url,
  } = artist;
  console.log(artist);
  return (
    <div
      className={
        "group relative h-full w-full content-center overflow-hidden rounded-lg border border-border transition-transform hover:scale-105"
      }
    >
      <Link href={`https://music.youtube.com/channel/${ytUrl}`} external>
        <div
          style={{
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className={
            "absolute top-0 left-0 -z-10 size-full overflow-hidden bg-cover bg-center blur-xs brightness-50 filter transition-all group-hover:blur"
          }
        />
        <div
          className={
            "grid grid-cols-[1fr_3fr] content-center overflow-hidden p-2"
          }
        >
          <Image
            alt={"thumbnail"}
            src={thumbnail_url}
            className={"rounded-full"}
            width={88}
            height={88}
            sizes={
              "(min-width: 980px) 67px, (min-width: 780px) calc(6.67vw + 3px), (min-width: 440px) 88px, 20.83vw"
            }
          />
          <div className={"my-auto sm:px-6"}>
            <h3
              className={
                "line-clamp-1 text-lg leading-6 font-medium text-on-image"
              }
            >
              {artist_name.replace(" - Topic", "")}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
