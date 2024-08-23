import Link from "next/link";
import Image from "next/image";

export default function ArtistCard({ artist }: { artist: any }) {
  const { name, ytUrl, thumbnail_url } = artist;
  return (
    <div className="group relative h-full w-full content-center overflow-hidden rounded-lg border border-gray-800 transition-transform hover:scale-105">
      <Link href={ytUrl} target="_blank">
        <div
          style={{
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className="absolute left-0 top-0 -z-10 size-full overflow-hidden bg-cover bg-center blur-sm brightness-50 filter transition-all group-hover:blur"
        ></div>
        <div className="grid grid-cols-[1fr_3fr] content-center overflow-hidden p-2">
          <Image
            alt="thumbnail"
            src={thumbnail_url}
            className="rounded-full"
            width={88}
            height={88}
            sizes="(min-width: 980px) 67px, (min-width: 780px) calc(6.67vw + 3px), (min-width: 440px) 88px, 20.83vw"
          />
          <div className="my-auto sm:px-6">
            <h3 className="line-clamp-1 text-lg font-medium leading-6 text-white">
              {name.replace(" - Topic", "")}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
