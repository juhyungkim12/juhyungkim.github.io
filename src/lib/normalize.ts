/** CMS JSON is untrusted input: omitted, null and blank values are all valid drafts. */
export const object = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
export const text = (value: unknown): string => typeof value === 'string' && value.trim() ? value : '';
export const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const strings = (value: unknown): string[] => list(value).map(text).filter(s => s.trim().length > 0);
const number = (value: unknown): number | undefined => typeof value === 'number' && Number.isFinite(value) ? value : undefined;
const fields = <K extends string>(value: unknown, keys: readonly K[]): Record<K, string> => {
  const source = object(value);
  return Object.fromEntries(keys.map(key => [key, text(source[key])])) as Record<K, string>;
};
export function normalizeProfile(value: unknown) {
  return { ...fields(value, ['name', 'affiliation', 'introduction', 'portrait', 'portraitAlt', 'video', 'poster', 'caption']), interests: strings(object(value).interests) };
}
export const normalizeContact = (value: unknown) => fields(value, ['email', 'scholar', 'orcid']);
export const normalizeCV = (value: unknown) => fields(value, ['file']);
export const normalizeMedia = (value: unknown) => fields(value, ['image', 'video', 'alt', 'caption']);
export type Media = ReturnType<typeof normalizeMedia>;
const mediaList = (value: unknown) => list(value).map(normalizeMedia).filter(m => m.image.trim() || m.video.trim());
const entries = (value: unknown) => list(object(value).entries).map(object);
const byOrder = (a: {order?: number}, b: {order?: number}) => (a.order ?? 999) - (b.order ?? 999);
// Missing IDs use a rendering-only fallback; CMS files are never rewritten.
function withIds<T extends {id: string}>(rows: T[], prefix: string): T[] {
  const used = new Set(rows.map(row => row.id).filter(Boolean));
  return rows.map((row, index) => {
    if (row.id.trim()) return row;
    let id = `${prefix}-${index + 1}`;
    while (used.has(id)) id += '-draft';
    used.add(id);
    return {...row, id};
  });
}
export function normalizePublications(value: unknown) {
  return withIds(entries(value).map(p => ({
    ...fields(p, ['id','title','authors','journal','details','doi','pdf','image','alt','status']),
    type: text(p.type).trim() || 'Other publications',
    year: number(p.year), order: number(p.order), demo: p.demo === true, featured: p.featured === true,
  })).filter(p => p.title.trim()), 'publication')
    .sort((a,b) => (b.year ?? 0) - (a.year ?? 0) || byOrder(a,b));
}
export function normalizeResearch(value: unknown) {
  return withIds(entries(value).map(p => ({
    ...fields(p, ['id','title','summary','approach','results']), ...normalizeMedia(p),
    order: number(p.order), placeholder: p.placeholder === true,
    media: mediaList(p.media), related: strings(p.related),
  })).filter(p => p.title.trim()), 'research').sort(byOrder);
}
export function normalizeSkills(value: unknown) {
  return entries(value).map(p => ({
    ...fields(p, ['name','description']), ...normalizeMedia(p),
    category: text(p.category).trim() || 'Other skills',
    order: number(p.order), placeholder: p.placeholder === true, media: mediaList(p.media),
  })).filter(p => p.name.trim()).sort(byOrder);
}
export function normalizeEntries(value: unknown) {
  return { entries: entries(value).map(p => fields(p, ['title','institution','date','description'])).filter(p => p.title.trim()) };
}
export type Publication = ReturnType<typeof normalizePublications>[number];
export type Research = ReturnType<typeof normalizeResearch>[number];
export type Skill = ReturnType<typeof normalizeSkills>[number];
export type Entry = ReturnType<typeof normalizeEntries>['entries'][number];
