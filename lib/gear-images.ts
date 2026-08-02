const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=900&q=80";

const CATEGORY_IMAGE_SETS: Record<string, string[]> = {
  camping: [
    "photo-1478131143081-80f7f84ca84d",
    "photo-1504280390367-361c6d9f38f4",
    "photo-1526772662000-3f88f10405ff",
    "photo-1510312305653-8ed496efae75",
  ],
  camp: [
    "photo-1504280390367-361c6d9f38f4",
    "photo-1478131143081-80f7f84ca84d",
    "photo-1526772662000-3f88f10405ff",
  ],
  tent: [
    "photo-1478131143081-80f7f84ca84d",
    "photo-1504280390367-361c6d9f38f4",
    "photo-1510312305653-8ed496efae75",
  ],
  hiking: [
    "photo-1551632811-561732d1e306",
    "photo-1464822759023-fed622ff2c3b",
    "photo-1483728008300-a8777ed21e1b",
    "photo-1501555088652-021faa106b9b",
  ],
  trekking: [
    "photo-1551632811-561732d1e306",
    "photo-1464822759023-fed622ff2c3b",
    "photo-1501555088652-021faa106b9b",
  ],
  backpack: [
    "photo-1551632811-561732d1e306",
    "photo-1544816155-12df9643f363",
    "photo-1622560480605-d83c853bc5c3",
  ],
  cycling: [
    "photo-1505705694340-019e1e3359a0",
    "photo-1485965120184-e220f721d03e",
    "photo-1532298229144-0ec0c57515c7",
  ],
  bike: [
    "photo-1505705694340-019e1e3359a0",
    "photo-1485965120184-e220f721d03e",
    "photo-1532298229144-0ec0c57515c7",
  ],
  water: [
    "photo-1551504734-5ee1c4a1479b",
    "photo-1544551763-46a013bb70d5",
    "photo-1502680390469-be75c86b636f",
  ],
  kayak: [
    "photo-1551504734-5ee1c4a1479b",
    "photo-1544551763-46a013bb70d5",
    "photo-1507525428034-b723cf961d3e",
  ],
  surf: [
    "photo-1502680390469-be75c86b636f",
    "photo-1507525428034-b723cf961d3e",
    "photo-1459749411175-04bf5292ceea",
  ],
  winter: [
    "photo-1521747116042-5a810fda9664",
    "photo-1486915309851-b0cc1f8a0084",
    "photo-1517048676732-d65bc937f952",
  ],
  snow: [
    "photo-1521747116042-5a810fda9664",
    "photo-1486915309851-b0cc1f8a0084",
  ],
  ski: [
    "photo-1521747116042-5a810fda9664",
    "photo-1517048676732-d65bc937f952",
  ],
  climbing: [
    "photo-1522163182402-834f871fd851",
    "photo-1564769625905-50e93615e769",
    "photo-1516592673884-4a382d77249a",
  ],
  rock: [
    "photo-1522163182402-834f871fd851",
    "photo-1564769625905-50e93615e769",
  ],
};

const FALLBACK_SETS = [
  ["photo-1478131143081-80f7f84ca84d", "photo-1504280390367-361c6d9f38f4", "photo-1526772662000-3f88f10405ff"],
  ["photo-1505705694340-019e1e3359a0", "photo-1485965120184-e220f721d03e", "photo-1532298229144-0ec0c57515c7"],
  ["photo-1551504734-5ee1c4a1479b", "photo-1544551763-46a013bb70d5", "photo-1502680390469-be75c86b636f"],
  ["photo-1521747116042-5a810fda9664", "photo-1486915309851-b0cc1f8a0084", "photo-1517048676732-d65bc937f952"],
  ["photo-1522163182402-834f871fd851", "photo-1564769625905-50e93615e769", "photo-1516592673884-4a382d77249a"],
  ["photo-1551632811-561732d1e306", "photo-1464822759023-fed622ff2c3b", "photo-1501555088652-021faa106b9b"],
];

export function getGearImage(
  categoryName: string | undefined,
  index: number,
): string {
  const key = categoryName?.toLowerCase() ?? "";
  const match = Object.keys(CATEGORY_IMAGE_SETS).find((k) => key.includes(k));
  const set = match
    ? CATEGORY_IMAGE_SETS[match]
    : FALLBACK_SETS[index % FALLBACK_SETS.length];
  const id = set[0];
  return `https://images.unsplash.com/${id}${UNSPLASH_PARAMS}`;
}

export function getGearImagesList(
  categoryName: string | undefined,
  uploadedImages: string[] | undefined,
  index: number = 0,
): string[] {
  if (uploadedImages && uploadedImages.length > 1) {
    return uploadedImages;
  }

  const key = categoryName?.toLowerCase() ?? "";
  const match = Object.keys(CATEGORY_IMAGE_SETS).find((k) => key.includes(k));
  const set = match
    ? CATEGORY_IMAGE_SETS[match]
    : FALLBACK_SETS[index % FALLBACK_SETS.length];
  const fallbackUrls = set.map((id) => `https://images.unsplash.com/${id}${UNSPLASH_PARAMS}`);

  if (uploadedImages && uploadedImages.length === 1) {
    return [uploadedImages[0], ...fallbackUrls.slice(0, 2)];
  }

  return fallbackUrls;
}

