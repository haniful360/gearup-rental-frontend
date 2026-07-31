const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=900&q=80";

const CATEGORY_IMAGES: Record<string, string> = {
  camping: "photo-1478131143081-80f7f84ca84d",
  camp: "photo-1504280390367-361c6d9f38f4",
  tent: "photo-1478131143081-80f7f84ca84d",
  hiking: "photo-1551632811-561732d1e306",
  trekking: "photo-1551632811-561732d1e306",
  backpack: "photo-1551632811-561732d1e306",
  cycling: "photo-1505705694340-019e1e3359a0",
  bike: "photo-1505705694340-019e1e3359a0",
  water: "photo-1551504734-5ee1c4a1479b",
  kayak: "photo-1551504734-5ee1c4a1479b",
  surf: "photo-1502680390469-be75c86b636f",
  winter: "photo-1521747116042-5a810fda9664",
  snow: "photo-1521747116042-5a810fda9664",
  ski: "photo-1521747116042-5a810fda9664",
  climbing: "photo-1522163182402-834f871fd851",
  rock: "photo-1522163182402-834f871fd851",
};

const FALLBACK_IMAGES = [
  "photo-1478131143081-80f7f84ca84d",
  "photo-1505705694340-019e1e3359a0",
  "photo-1551504734-5ee1c4a1479b",
  "photo-1521747116042-5a810fda9664",
  "photo-1522163182402-834f871fd851",
  "photo-1551632811-561732d1e306",
  "photo-1502680390469-be75c86b636f",
  "photo-1504280390367-361c6d9f38f4",
];

export function getGearImage(
  categoryName: string | undefined,
  index: number,
): string {
  const key = categoryName?.toLowerCase() ?? "";
  const match = Object.keys(CATEGORY_IMAGES).find((k) => key.includes(k));
  const id = match
    ? CATEGORY_IMAGES[match]
    : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  return `https://images.unsplash.com/${id}${UNSPLASH_PARAMS}`;
}
