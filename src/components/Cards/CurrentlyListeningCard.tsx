/** biome-ignore-all lint/performance/noImgElement: External image URLs are dynamic */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
	LiveVideoStatus,
	default as usePostToPLiveSocket,
} from "@/hooks/usePostToPLiveSocket";
import formatNERDisplay from "@/utils/formatNERDisplay";
import Link from "../Atoms/Link";
import YoutubeThumbnail from "../Image/YoutubeThumbnail";

function formatTime(seconds: number) {
	const safeSeconds = Math.max(0, Math.floor(seconds));
	const mins = Math.floor(safeSeconds / 60);
	const secs = safeSeconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function CurrentlyListeningCard() {
	const handle = process.env.NEXT_PUBLIC_POSTTOP_HANDLE ?? "devla";
	const { connected, liveNow } = usePostToPLiveSocket(handle);
	const [elapsedSinceUpdate, setElapsedSinceUpdate] = useState(0);

	const video = liveNow?.video ?? null;
	const listeningData = liveNow?.listeningData ?? null;

	useEffect(() => {
		if (!listeningData) {
			setElapsedSinceUpdate(0);
			return;
		}

		const diffSeconds = Math.max(
			0,
			Math.floor(
				(Date.now() - new Date(listeningData.updatedAt).getTime()) / 1000,
			),
		);
		setElapsedSinceUpdate(diffSeconds);
	}, [listeningData]);

	useEffect(() => {
		if (!video || !listeningData) return;
		if (
			listeningData.status !== LiveVideoStatus.PLAYING &&
			listeningData.status !== LiveVideoStatus.STARTED
		) {
			return;
		}

		const timer = setInterval(() => {
			setElapsedSinceUpdate((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [video, listeningData]);

	const nowSeconds = useMemo(() => {
		if (!video || !listeningData) return 0;
		return Math.min(
			video.duration,
			listeningData.currentTime + elapsedSinceUpdate,
		);
	}, [video, listeningData, elapsedSinceUpdate]);

	if (!video || !listeningData) {
		return (
			<div
				className={
					"card flex items-center justify-center py-8 text-secondaryText"
				}
			>
				{connected
					? "Currently not listening to anything."
					: "Connecting to live playback..."}
			</div>
		);
	}

	const isPaused = listeningData.status === LiveVideoStatus.PAUSED;
	const isPlaying =
		listeningData.status === LiveVideoStatus.PLAYING ||
		listeningData.status === LiveVideoStatus.STARTED;
	const progress =
		video.duration > 0 ? Math.min(100, (nowSeconds / video.duration) * 100) : 0;
	const thumbnailUrl =
		video.coverImage ?? `https://i.ytimg.com/vi/${video.watchID}/hqdefault.jpg`;
	const videoUrl = `https://music.youtube.com/watch?v=${video.watchID}`;
	const display = formatNERDisplay(video.ner, video.title, video.artistName);

	return (
		<div className={"card"}>
			<div
				className={"grid grid-cols-1 gap-3 md:grid-cols-[120px_1fr] md:gap-4"}
			>
				<Link href={videoUrl} external className={"group"}>
					<div
						className={
							"relative aspect-square w-full overflow-hidden rounded-lg border border-border"
						}
					>
						<YoutubeThumbnail thumbnail_url={thumbnailUrl} className={"p-0"} />
						<div
							className={
								"absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
							}
						/>
					</div>
				</Link>

				<div className={"flex flex-col justify-between gap-2"}>
					<div className={"flex items-center justify-between gap-2"}>
						<p className={"text-sm text-secondaryText"}>Currently Playing</p>
						<div
							className={`rounded-full px-2 py-1 text-xs font-semibold ${
								isPlaying
									? "bg-highlight bg-opacity-20 text-highlight"
									: "bg-border text-secondaryText"
							}`}
						>
							{isPaused ? "Paused" : "Playing"}
						</div>
					</div>

					<div>
						<p className={"line-clamp-2 font-semibold"}>{display.title}</p>
						<p className={"line-clamp-1 text-sm text-secondaryText"}>
							by {display.subtitle}
						</p>
					</div>

					<div className={"space-y-1"}>
						<div
							className={"h-1.5 w-full overflow-hidden rounded-full bg-border"}
						>
							<div
								className={`h-full rounded-full transition-all duration-500 ${
									isPaused ? "bg-secondaryText" : "bg-highlight"
								}`}
								style={{ width: `${progress}%` }}
							/>
						</div>
						<div className={"flex justify-between text-xs text-secondaryText"}>
							<span>{formatTime(nowSeconds)}</span>
							<span>{formatTime(video.duration)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
