import Link from "next/link";

export default function MusicCard({
  music,
  className,
  small = false,
}: {
  music: any;
  className?: string;
  small?: boolean;
}) {
  const { title, author_name, author_url, ytUrl, times, thumbnail_url } = music;
  return (
    <div
      className={`group relative ${className} w-full h-full content-center transition-transform hover:scale-105 overflow-hidden border border-gray-800 rounded-lg`}
    >
      <Link href={ytUrl} target="_blank">
        <div className="absolute top-0 left-0 size-full -z-10 filter blur-sm group-hover:blur transition-all brightness-50 p-4 overflow-hidden">
          <div>
            <div
              style={{
                backgroundImage: `url(${thumbnail_url})`,
              }}
              className="absolute left-1/2 -top-[17%] -translate-x-1/2 bg-cover bg-center w-[124%] h-[134%] aspect-video"
            ></div>
          </div>
        </div>
        <div
          className={`overflow-hidden ${
            small && "grid grid-cols-[1fr_3fr]"
          } content-center p-4`}
        >
          <div
            className={`aspect-square  relative ${
              small ? "w-full" : "w-1/2 mb-6"
            } overflow-hidden rounded-lg m-auto `}
          >
            <div
              style={{
                backgroundImage: `url(${thumbnail_url})`,
              }}
              className="absolute left-1/2 -translate-x-1/2 bg-cover bg-center h-full w-auto aspect-video"
            ></div>
            <div className="absolute flex justify-center items-center h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-6xl">
              ▶
            </div>
          </div>
          <div className="sm:px-6 content-center">
            <h3 className="text-lg font-medium leading-6 text-primaryText-dark">
              {title}
            </h3>
            {!small && (
              <p className="mt-1 max-w-2xl text-sm text-gray-300">
                Author:{" "}
                <a href={author_url} target="_blank">
                  {author_name}
                </a>
              </p>
            )}
          </div>
          <div className="absolute bottom-1 right-1">x{times}</div>
        </div>
      </Link>
    </div>
  );
}
