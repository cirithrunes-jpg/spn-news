export type PhotoRights = { kind: 'photo'; creator: string; sourceName: string; sourceUrl: string; licenseName: string; licenseUrl: string; modification?: string; permissionVerified: true };
export type IllustrationCredit = { kind: 'illustration'; creator: string; sourceName: string };
// Add a real photograph only after verifying the permission/license on its source page.
// Attribution alone is not proof of permission. Never invent an author or credit.
export const mediaCredits: Record<string, PhotoRights | IllustrationCredit> = Object.fromEntries(
  ['cinema', 'series', 'games', 'music', 'anime', 'stars', 'retro'].map(key => [key, { kind: 'illustration', creator: 'IA / SPN News', sourceName: 'Acervo demonstrativo SPN' }])
);
mediaCredits.music = { kind: 'photo', creator: 'Raph_PH', sourceName: 'Wikimedia Commons · Billie Eilish, arquivo de 2025', sourceUrl: 'https://commons.wikimedia.org/wiki/File:BillieEilishO2140725-23_-_54666638953.jpg', licenseName: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', modification: 'Enquadramento de exibição · uso ilustrativo', permissionVerified: true };
mediaCredits.stars = { kind: 'photo', creator: 'Gage Skidmore', sourceName: 'Wikimedia Commons · Ryan Reynolds, arquivo de 2024', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ryan_Reynolds_by_Gage_Skidmore_4.jpg', licenseName: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', modification: 'Enquadramento de exibição · uso ilustrativo', permissionVerified: true };
