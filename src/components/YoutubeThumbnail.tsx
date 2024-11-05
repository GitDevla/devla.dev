import { getImageProps } from "next/image";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function YoutubeThumbnail({
  thumbnail_url,
  className,
  lowRes = false,
}: {
  thumbnail_url: string;
  className?: string;
  lowRes?: boolean;
}) {
  if (lowRes) {
    thumbnail_url = thumbnail_url.replace("hqdefault", "mqdefault");
  }
  const blackBars = thumbnail_url.includes("hqdefault");
  const [width, height] = blackBars ? [480, 360] : [320, 180];
  const {
    props: { srcSet },
  } = getImageProps({ alt: "", width, height, src: thumbnail_url });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { backgroundImage };
  return (
    <div
      className={`absolute left-0 top-0 size-full overflow-hidden p-4 ${className}`}
    >
      <div
        style={style}
        className={`absolute left-1/2 aspect-video -translate-x-1/2 bg-cover bg-center ${blackBars ? "-top-[18%] h-[135%] w-[185%]" : "top-0 h-full w-[185%]"}`}
      />
    </div>
  );
}
