import { pullPostToPArtists } from "@/services/postToP";
import ArtistCard from "../Cards/ArtistCard";

export default async function TopArtistShowcase() {
  const artistData = await pullPostToPArtists();

  return (
    <div className={"grid gap-5 md:grid-cols-3"}>
      {artistData.map((artist, i) => (
        <ArtistCard key={i} artist={artist} />
      ))}
    </div>
  );
}
