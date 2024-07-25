import Link from "next/link";

export default function ArtistCard({ artist }: { artist: any }) {
  const { name, ytUrl, thumbnail_url } = artist;
  return (
    <div
      className={`group relative w-full h-full content-center transition-transform hover:scale-105 overflow-hidden border border-gray-800 rounded-lg`}
    >
      <Link href={ytUrl} target="_blank">
        <div
          style={{
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className="absolute -z-10 filter blur-sm group-hover:blur transition-all brightness-50 overflow-hidden bg-cover bg-center size-full"
        ></div>
        <div
          className={`overflow-hidden grid grid-cols-[1fr_3fr] content-center p-2`}
        >
          <img src={thumbnail_url} className="rounded-full" />
          <div className="sm:px-6 content-center">
            <h3
              className={`text-lg font-medium leading-6 text-white line-clamp-1 `}
            >
              {name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
