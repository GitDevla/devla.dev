import Link from "next/link";
import YoutubeThumbnail from "../YoutubeThumbnail";

export default function MusicCard({
  music,
  className,
  small = false,
}: {
  music: IPostToPMusic;
  className?: string;
  small?: boolean;
}) {
  const { title, author_name, ytUrl, times, thumbnail_url } = music;
  return (
    <div
      className={`group relative ${className} h-full w-full content-center overflow-hidden rounded-lg border border-gray-800 transition-transform hover:scale-105`}
    >
      <Link href={ytUrl} target="_blank">
        <YoutubeThumbnail
          thumbnail_url={thumbnail_url}
          className="-z-10 blur-sm brightness-50 filter transition-all group-hover:blur"
          lowRes
        />
        <div
          className={`overflow-hidden ${
            small && "grid grid-cols-[1fr_3fr] gap-3"
          } content-center p-4`}
        >
          <div
            className={`relative aspect-square ${
              small ? "w-full" : "mb-6 w-1/2"
            } m-auto overflow-hidden rounded-lg`}
          >
            <YoutubeThumbnail thumbnail_url={thumbnail_url} lowRes={small} />
            <div className="absolute flex h-full w-full items-center justify-center text-6xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ▶
            </div>
          </div>
          <div className="flex flex-col justify-center break-all">
            <h3
              className={`line-clamp-2 font-medium text-white ${
                small ? "text-base" : "text-lg"
              }`}
            >
              {title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-gray-400">
              by {author_name.replace(" - Topic", "")}
            </p>
          </div>
          <div className="absolute bottom-1 right-1 text-white">x{times}</div>
        </div>
      </Link>
    </div>
  );
}
