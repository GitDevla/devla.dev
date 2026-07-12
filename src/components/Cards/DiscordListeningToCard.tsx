/** biome-ignore-all lint/performance/noImgElement: External image URLs come from live payloads */
"use client";

import usePostToPLiveSocket from "@/hooks/usePostToPLiveSocket";
import formatNERDisplay from "@/utils/formatNERDisplay";

export default function DiscordListeningToCard({
	className,
}: {
	className?: string;
}) {
	const handle = process.env.NEXT_PUBLIC_POSTTOP_HANDLE ?? "devla";
	const { liveNow } = usePostToPLiveSocket(handle);
	const video = liveNow?.video ?? null;

	const title = video?.title;
	const artist = video?.artistName;
	const imageUrl =
		video?.coverImage ??
		(video
			? `https://i.ytimg.com/vi/${video.watchID}/mqdefault.jpg`
			: undefined);
	const display =
		title && artist
			? formatNERDisplay(video?.ner, title, artist)
			: { title: title ?? "", subtitle: artist ?? "" };

	return (
		title &&
		artist && (
			<div
				className={`flex max-w-48 items-center overflow-hidden rounded-md bg-accentbackground bg-opacity-90 ${className}`}
			>
				{imageUrl && (
					<img
						src={imageUrl}
						alt={"Activity"}
						className={"aspect-square h-full rounded-md object-cover"}
					/>
				)}
				<div className={"w-full overflow-hidden p-2"}>
					<p className={"truncate text-sm font-semibold"}>Listening to</p>
					<p className={"truncate text-xs font-semibold"} title={display.title}>
						{display.title}
					</p>
					<p
						className={"truncate text-xs text-gray-400"}
						title={display.subtitle}
					>
						by {display.subtitle}
					</p>
				</div>
			</div>
		)
	);
}
