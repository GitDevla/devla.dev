import { pullPostToPGenres } from "@/services/postToP";
import { generateRandomDarkColor } from "@/utils/color";

function genreToPercentages(data: IPostToPGenre[]) {
  const total = data.reduce((acc, curr) => acc + curr.times, 0);
  return data.map((genre) => {
    return {
      genre: genre.genre,
      percentage: Math.round((genre.times / total) * 100),
    };
  });
}

export default async function TopGenreShowcase() {
  const genreData = await pullPostToPGenres();

  const genrePercentages = genreToPercentages(genreData);
  return (
    <div className={"mt-6 flex w-full rounded-lg"}>
      {genrePercentages.map((genre, i) => (
        <div
          key={i}
          className={
            "group relative cursor-pointer p-2 transition-all hover:z-10 hover:!w-[90%] dark:backdrop-invert"
          }
          style={{
            width: `${genre.percentage}%`,
            backgroundColor: generateRandomDarkColor(),
            borderRadius:
              i == 0
                ? "0.5rem 0 0 0.5rem"
                : i == genrePercentages.length - 1
                  ? "0 0.5rem 0.5rem 0"
                  : "0",
            borderRight:
              i != genrePercentages.length - 1
                ? "1px solid rgb(var(--secondaryText))"
                : "none",
          }}
        >
          <div
            className={
              "absolute bottom-0 left-0 right-0 translate-y-full truncate text-center opacity-30 transition-opacity group-hover:opacity-100"
            }
          >
            {genre.percentage}%
          </div>
          <div
            className={
              "absolute left-0 right-0 top-0 -translate-y-full truncate text-center opacity-30 transition-opacity group-hover:opacity-100"
            }
          >
            {genre.genre}
          </div>
        </div>
      ))}
    </div>
  );
}
