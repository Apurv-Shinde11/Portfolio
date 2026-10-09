import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { pdfToPng } from "pdf-to-png-converter";
import sharp from "sharp";

// Build-time utility only; Sharp is already provided by Next.js.
const root = new URL("../", import.meta.url);
const siteSource = await readFile(new URL("data/site.ts", root), "utf8");
const pdfUrl = siteSource.match(/resumeHref:\s*"([^"]+)"/)?.[1];
if (pdfUrl !== "/certificates/Apurva_Shinde_Resume.pdf") {
  throw new Error("Verify the authoritative site.resumeHref before generating previews.");
}
const pdfPath = fileURLToPath(new URL(`public${pdfUrl}`, root));
const sourceSha256 = createHash("sha256").update(await readFile(pdfPath)).digest("hex");
const outputDir = new URL("public/resume-previews/", root);
await mkdir(outputDir, { recursive: true });
const pages = await pdfToPng(pdfPath, {
  viewportScale: 2,
  // Render embedded glyph outlines: canvas cannot use browser font-face loading.
  disableFontFace: true,
  useSystemFonts: false,
});
const previews = [];
for (const page of pages.sort((a, b) => a.pageNumber - b.pageNumber)) {
  if (!page.content) throw new Error(`Missing rendered page ${page.pageNumber}`);
  const filename = `page-${page.pageNumber}.webp`;
  // Lossless compression preserves fine print; no resize, crop or color edits.
  const content = await sharp(page.content).webp({ lossless: true, effort: 6 }).toBuffer();
  await writeFile(new URL(filename, outputDir), content);
  previews.push({ page: page.pageNumber, src: `/resume-previews/${filename}`, width: page.width, height: page.height, bytes: content.length });
}
await writeFile(new URL("data/resume-previews.json", root), JSON.stringify({ source: pdfUrl, sourceSha256, pages: previews }, null, 2) + "\n");
console.log(JSON.stringify({ sourceSha256, pages: previews }, null, 2));
