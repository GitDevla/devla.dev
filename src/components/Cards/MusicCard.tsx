import type { IPostToPMusic } from "@/types/postToP";
import Link from "../Atoms/Link";
import YoutubeThumbnail from "../Image/YoutubeThumbnail";

export default function MusicCard({
  music,
  className,
  small = false,
}: {
  music: IPostToPMusic;
  className?: string;
  small?: boolean;
}) {
  const { yt_id: video_id, video_title: title, channel, listen_count } = music;
  const artist = channel.name;
  const ytUrl = `https://music.youtube.com/watch?v=${video_id}`;
  const thumbnail_url = `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`;
  return (
    <div
      className={`group relative ${className} h-full w-full content-center overflow-hidden rounded-lg border border-border transition-transform hover:scale-105`}
    >
      <Link href={ytUrl} external>
        <YoutubeThumbnail
          thumbnail_url={thumbnail_url}
          className={
            "-z-10 blur-xs brightness-50 filter transition-all group-hover:blur"
          }
          lowRes
        />
        <div
          className={`overflow-hidden ${
            small && "grid grid-cols-[1fr_3fr] gap-4"
          } content-center p-4`}
        >
          <div
            className={`relative aspect-square ${
              small ? "w-full" : "mb-6 w-1/2"
            } m-auto overflow-hidden rounded-lg`}
          >
            <YoutubeThumbnail thumbnail_url={thumbnail_url} lowRes={small} />
            <div
              className={
                "absolute flex h-full w-full items-center justify-center text-6xl text-on-image opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              }
            >
              ▶
            </div>
          </div>
          <div className={"flex flex-col justify-center break-words"}>
            <h3
              className={`line-clamp-2 font-medium text-on-image ${
                small ? "text-base" : "text-lg"
              }`}
            >
              {title}
            </h3>
            <p className={"mt-1 line-clamp-1 text-sm text-muted"}>
              by {artist.replace(" - Topic", "")}
            </p>
          </div>
          <div className={"absolute right-1 bottom-1 text-on-image"}>
            x{listen_count}
          </div>
        </div>
      </Link>
    </div>
  );
}
