import Image from "next/image";
import DiscordGenericActivityCard from "@/components/Cards/DiscordGenericActivityCard";
import DiscordListeningToCard from "@/components/Cards/DiscordListeningToCard";

export default function RenderProfileCard() {
    return <div className={"relative"}>
        <div
            className={"peer relative rotate-6 transition-transform hover:-rotate-6 hover:scale-110"}
        >
            <Image
                className={"h-52 w-52 rounded-xl"}
                src={"/xqc-despair.gif"}
                width={176}
                height={176}
                alt={"Picture of the author"}
                priority
                unoptimized />
        </div>
        <DiscordListeningToCard
            className={"absolute -top-5 left-0 h-16 -translate-x-1/4 transition-all peer-hover:-z-10 peer-hover:brightness-75"} />
        <DiscordGenericActivityCard
            className={"absolute -bottom-5 right-0 h-16 translate-x-1/4 transition-all peer-hover:-z-10 peer-hover:brightness-75"} />
    </div>;
}
