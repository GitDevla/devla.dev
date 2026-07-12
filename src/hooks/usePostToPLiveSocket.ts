"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SocketEvent = {
	op: number;
	d?: unknown;
};

export enum LiveVideoStatus {
	STARTED = 0,
	PLAYING = 1,
	PAUSED = 2,
	ENDED = 3,
}

export type LiveNowNER = {
	ALBUM?: string[] | null;
	ARTIST?: string[] | null;
	ORIGINAL_AUTHOR?: string[] | null;
	VOCALIST?: string[] | null;
	MODIFIER?: string[] | null;
	TITLE?: string[] | null;
	ALT_TITLE?: string[] | null;
	FEATURING?: string[] | null;
	MISC_PERSON?: string[] | null;
};

export type LiveNowVideo = {
	watchID: string;
	title: string;
	artistName: string;
	duration: number;
	coverImage?: string;
	ner?: LiveNowNER | null;
};

export type LiveNowListeningData = {
	currentTime: number;
	status: LiveVideoStatus;
	updatedAt: string;
};

export type LiveNowState = {
	userId?: number;
	video: LiveNowVideo | null;
	listeningData: LiveNowListeningData | null;
};

export type LiveNowTrack = {
	title: string;
	artist: string;
	thumbnailUrl?: string;
};

function getSocketUrl() {
	const serverUrl = process.env.NEXT_PUBLIC_SERVER;
	if (!serverUrl) return "wss://posttopserver.devla.dev";

	if (serverUrl.startsWith("https://")) {
		return serverUrl.replace("https://", "wss://");
	}

	if (serverUrl.startsWith("http://")) {
		return serverUrl.replace("http://", "ws://");
	}

	return serverUrl;
}

function normalizeAssetUrl(raw: string | undefined) {
	if (!raw) return undefined;
	if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

	const fromDiscordProxy = raw.split("/https/")[1];
	if (fromDiscordProxy) return `https://${fromDiscordProxy}`;

	return undefined;
}

function toStringArrayOrNull(value: unknown): string[] | null {
	if (!Array.isArray(value)) return null;
	const strings = value.filter(
		(item): item is string => typeof item === "string",
	);
	return strings.length > 0 ? strings : null;
}

function parseNER(value: unknown): LiveNowNER | null {
	if (!value || typeof value !== "object") return null;
	const nerRaw = value as Record<string, unknown>;

	return {
		ALBUM: toStringArrayOrNull(nerRaw.ALBUM),
		ARTIST: toStringArrayOrNull(nerRaw.ARTIST),
		ORIGINAL_AUTHOR: toStringArrayOrNull(nerRaw.ORIGINAL_AUTHOR),
		VOCALIST: toStringArrayOrNull(nerRaw.VOCALIST),
		MODIFIER: toStringArrayOrNull(nerRaw.MODIFIER),
		TITLE: toStringArrayOrNull(nerRaw.TITLE),
		ALT_TITLE: toStringArrayOrNull(nerRaw.ALT_TITLE),
		FEATURING: toStringArrayOrNull(nerRaw.FEATURING),
		MISC_PERSON: toStringArrayOrNull(nerRaw.MISC_PERSON),
	};
}

function parseLiveNowState(payload: unknown): LiveNowState | null {
	if (!payload || typeof payload !== "object") return null;

	const data = payload as Record<string, unknown>;
	const hasVideoField = Object.hasOwn(data, "video");
	const hasListeningDataField = Object.hasOwn(data, "listeningData");

	let video: LiveNowVideo | null = null;
	if (hasVideoField && data.video === null) {
		video = null;
	} else {
		const videoRaw =
			typeof data.video === "object" && data.video !== null
				? (data.video as Record<string, unknown>)
				: null;
		const artistRaw =
			typeof videoRaw?.artist === "object" && videoRaw.artist !== null
				? (videoRaw.artist as Record<string, unknown>)
				: null;
		const channelRaw =
			typeof data.channel === "object" && data.channel !== null
				? (data.channel as Record<string, unknown>)
				: null;
		const assetsRaw =
			typeof data.assets === "object" && data.assets !== null
				? (data.assets as Record<string, unknown>)
				: null;

		const watchID =
			typeof videoRaw?.watchID === "string"
				? videoRaw.watchID
				: typeof data.yt_id === "string"
					? data.yt_id
					: undefined;
		const title =
			typeof videoRaw?.title === "string"
				? videoRaw.title
				: typeof data.video_title === "string"
					? data.video_title
					: typeof data.title === "string"
						? data.title
						: typeof data.details === "string"
							? data.details
							: undefined;
		const artistName =
			typeof artistRaw?.name === "string"
				? artistRaw.name
				: typeof channelRaw?.name === "string"
					? channelRaw.name
					: typeof data.artist === "string"
						? data.artist
						: typeof data.state === "string"
							? data.state
							: undefined;
		const duration =
			typeof videoRaw?.duration === "number" ? videoRaw.duration : 0;
		const ner = parseNER(videoRaw?.NER ?? data.NER);
		const coverImage =
			typeof videoRaw?.coverImage === "string"
				? videoRaw.coverImage
				: normalizeAssetUrl(
						typeof assetsRaw?.large_image === "string"
							? assetsRaw.large_image
							: undefined,
					);

		if (watchID && title && artistName) {
			video = {
				watchID,
				title,
				artistName,
				duration,
				coverImage,
				ner,
			};
		}
	}

	let listeningData: LiveNowListeningData | null = null;
	if (hasListeningDataField && data.listeningData === null) {
		listeningData = null;
	} else {
		const listeningRaw =
			typeof data.listeningData === "object" && data.listeningData !== null
				? (data.listeningData as Record<string, unknown>)
				: null;

		if (listeningRaw) {
			const currentTime =
				typeof listeningRaw.currentTime === "number"
					? listeningRaw.currentTime
					: 0;
			const status =
				typeof listeningRaw.status === "number"
					? (listeningRaw.status as LiveVideoStatus)
					: LiveVideoStatus.ENDED;
			const updatedAt =
				typeof listeningRaw.updatedAt === "string"
					? listeningRaw.updatedAt
					: new Date(0).toISOString();

			listeningData = { currentTime, status, updatedAt };
		}
	}

	return {
		userId: typeof data.userId === "number" ? data.userId : undefined,
		video,
		listeningData,
	};
}

function parseTrack(payload: unknown): LiveNowTrack | null {
	const liveState = parseLiveNowState(payload);
	if (!liveState?.video) return null;

	const thumbnailFromId = `https://i.ytimg.com/vi/${liveState.video.watchID}/mqdefault.jpg`;

	return {
		title: liveState.video.title,
		artist: liveState.video.artistName,
		thumbnailUrl: liveState.video.coverImage ?? thumbnailFromId,
	};
}

export default function usePostToPLiveSocket(handle: string) {
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const connectRef = useRef<() => void>(() => undefined);
	const reconnectAttemptsRef = useRef(0);

	const [connected, setConnected] = useState(false);
	const [liveTrack, setLiveTrack] = useState<LiveNowTrack | null>(null);
	const [liveNow, setLiveNow] = useState<LiveNowState | null>(null);

	const wsUrl = useMemo(() => getSocketUrl(), []);

	const clearReconnectTimeout = useCallback(() => {
		if (!reconnectTimeoutRef.current) return;
		clearTimeout(reconnectTimeoutRef.current);
		reconnectTimeoutRef.current = null;
	}, []);

	const scheduleReconnect = useCallback(() => {
		clearReconnectTimeout();
		const waitMs = Math.min(1000 * (reconnectAttemptsRef.current + 1), 5000);
		reconnectTimeoutRef.current = setTimeout(() => {
			reconnectAttemptsRef.current += 1;
			connectRef.current();
		}, waitMs);
	}, [clearReconnectTimeout]);

	const disconnect = useCallback(() => {
		clearReconnectTimeout();
		wsRef.current?.close();
		wsRef.current = null;
		setConnected(false);
	}, [clearReconnectTimeout]);

	const connect = useCallback(() => {
		if (!handle) return;

		disconnect();
		const ws = new WebSocket(wsUrl);
		wsRef.current = ws;

		ws.onopen = () => {
			setConnected(true);
			reconnectAttemptsRef.current = 0;
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(String(event.data)) as SocketEvent;

			if (message.op === 100) {
				ws.send(
					JSON.stringify({
						op: 2,
						d: { handle },
					}),
				);
				return;
			}

			if (message.op === 105) {
				const parsedLiveNow = parseLiveNowState(message.d);
				setLiveNow(parsedLiveNow);
				const parsedTrack = parseTrack(message.d);
				setLiveTrack(parsedTrack);
			}
		};

		ws.onclose = () => {
			setConnected(false);
			scheduleReconnect();
		};

		ws.onerror = () => {
			ws.close();
		};
	}, [disconnect, handle, scheduleReconnect, wsUrl]);

	connectRef.current = connect;

	useEffect(() => {
		connect();
		return () => disconnect();
	}, [connect, disconnect]);

	return {
		connected,
		liveNow,
		liveTrack,
		reconnect: connect,
		disconnect,
	};
}
