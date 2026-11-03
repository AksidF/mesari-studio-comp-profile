// Google Drive gallery (no database, no extra hosting).
// The site reads ONE public Drive folder. Every sub-folder inside it = one event/customer gallery.
//   Folder name: "Putu & Ayu - Wedding"  →  title "Putu & Ayu", type "Wedding"
//   Cover photo: a file whose name starts with "cover" (e.g. cover.jpg), otherwise the first photo.
//   Order: newest folder first.
const API = "https://www.googleapis.com/drive/v3/files";
const KEY = process.env.GOOGLE_API_KEY;
const ROOT = process.env.GOOGLE_DRIVE_FOLDER_ID;
// How long Drive results are cached (seconds). Keep in sync with `revalidate` in app/page.tsx.
const REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 300;

export const galleryEnabled = Boolean(KEY && ROOT);

export type Gallery = { id: string; title: string; type: string; date: string; cover: string | null; url: string };
type DriveFile = Record<string, string>;

async function listPage(q: string, fields: string, orderBy: string, pageSize: number, pageToken?: string) {
  const params = new URLSearchParams({ q, fields: `nextPageToken,files(${fields})`, orderBy, pageSize: String(pageSize), key: KEY! });
  if (pageToken) params.set("pageToken", pageToken);
  const res = await fetch(`${API}?${params}`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`Drive API ${res.status}`);
  return (await res.json()) as { files?: DriveFile[]; nextPageToken?: string };
}

// All event folders, newest first (follows Drive's paging so there is no 100-folder ceiling)
async function allFolders() {
  const q = `'${ROOT}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const out: DriveFile[] = [];
  let token: string | undefined;
  do {
    const r = await listPage(q, "id,name,createdTime", "createdTime desc", 1000, token);
    out.push(...(r.files ?? []));
    token = r.nextPageToken;
  } while (token && out.length < 5000);
  return out;
}

async function getCover(folderId: string) {
  try {
    const r = await listPage(`'${folderId}' in parents and mimeType contains 'image/' and trashed=false`, "id,name", "name", 20);
    const photos = r.files ?? [];
    const pick = photos.find((p) => /^cover/i.test(p.name)) ?? photos[0];
    return pick ? `https://drive.google.com/thumbnail?id=${pick.id}&sz=w640` : null;
  } catch {
    return null; // one broken folder should not break the whole gallery
  }
}

function toGallery(f: DriveFile, cover: string | null): Gallery {
  const [title, ...rest] = f.name.split(" - ");
  return {
    id: f.id,
    title: title.trim(),
    type: rest.join(" - ").trim(),
    date: new Date(f.createdTime).toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
    cover,
    url: `https://drive.google.com/drive/folders/${f.id}`,
  };
}

// One page of galleries, optionally filtered by a search word. Covers are only fetched for the folders on that page.
export async function getGalleryPage({ q = "", page = 1, perPage = 12 }: { q?: string; page?: number; perPage?: number } = {}) {
  const empty = { items: [] as Gallery[], total: 0, pages: 1, page: 1 };
  if (!galleryEnabled) return empty;
  try {
    const needle = q.trim().toLowerCase();
    const folders = (await allFolders()).filter((f) => !needle || f.name.toLowerCase().includes(needle));
    const pages = Math.max(1, Math.ceil(folders.length / perPage));
    const current = Math.min(Math.max(1, page), pages);
    const slice = folders.slice((current - 1) * perPage, current * perPage);
    const items = await Promise.all(slice.map(async (f) => toGallery(f, await getCover(f.id))));
    return { items, total: folders.length, pages, page: current };
  } catch (err) {
    console.error("[gallery]", err);
    return empty; // sections hide themselves if Drive can't be reached
  }
}
