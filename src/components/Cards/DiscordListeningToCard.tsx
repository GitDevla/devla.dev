/** biome-ignore-all lint/performance/noImgElement: External image URLs come from live payloads */
"use client";

import usePostToPLiveSocket from "@/hooks/usePostToPLiveSocket";
import formatNERDisplay from "@/utils/formatNERDisplay";
import YoutubeThumbnail from "../Image/YoutubeThumbnail";

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
				className={`flex max-w-48 items-center overflow-hidden rounded-md bg-surface/90 ${className}`}
			>
				{imageUrl && (
					<div className="relative aspect-square h-full rounded-md object-cover">
						<YoutubeThumbnail thumbnail_url={imageUrl} lowRes />
					</div>
				)}
				<div className={"w-full overflow-hidden p-2"}>
					<p className={"truncate text-sm font-semibold"}>Listening to</p>
					<p className={"truncate text-xs font-semibold"} title={display.title}>
						{display.title}
					</p>
					<p
						className={"truncate text-xs text-muted"}
						title={display.subtitle}
					>
						by {display.subtitle}
					</p>
				</div>
			</div>
		)
	);
}
