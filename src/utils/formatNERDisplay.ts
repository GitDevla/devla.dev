import type { LiveNowNER } from "@/hooks/usePostToPLiveSocket";

function firstText(values?: string[] | null) {
	return values?.find((value) => value.trim().length > 0);
}

export function normalizeArtist(artist: string) {
	return artist.replace(/\s*-\s*Topic$/i, "").trim();
}

export default function formatNERDisplay(
	ner: LiveNowNER | null | undefined,
	defaultTitle: string,
	defaultArtist: string,
) {
	let title = defaultTitle.trim();
	let subtitle = normalizeArtist(defaultArtist);

	if (!ner) {
		return { title, subtitle };
	}

	const nerTitle = firstText(ner.TITLE) ?? firstText(ner.ALT_TITLE);
	const nerArtist =
		firstText(ner.ARTIST) ??
		firstText(ner.ORIGINAL_AUTHOR) ??
		firstText(ner.VOCALIST) ??
		firstText(ner.MISC_PERSON);
	const modifiers = (ner.MODIFIER ?? [])
		.map((item) => item.trim())
		.filter(Boolean);
	const featuring = (ner.FEATURING ?? [])
		.map((item) => item.trim())
		.filter(Boolean);

	if (nerTitle) title = nerTitle;
	if (nerArtist) subtitle = normalizeArtist(nerArtist);

	if (modifiers.length > 0) {
		const modifierText = modifiers.join(", ");
		if (!title.toLowerCase().includes(modifierText.toLowerCase())) {
			title = `${title} (${modifierText})`;
		}
	}

	if (featuring.length > 0) {
		subtitle = `${subtitle} feat. ${featuring.join(", ")}`;
	}

	return { title, subtitle };
}
