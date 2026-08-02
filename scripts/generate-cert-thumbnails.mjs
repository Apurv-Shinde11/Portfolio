import { pdfToPng } from "pdf-to-png-converter";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const certsDir = join(__dirname, "../public/certificates");

const certificates = [
  "Coursera__python_basics-1_.pdf",
  "Generative_AI_Certificate__Google_cloud_.pdf",
  "Data_Analytics__IBM_.pdf",
  "Coursera__Business_Intelligence_and_Data_Analytics_.pdf",
  "JavaScript__Infosys_certificate_.pdf",
  "React_Native__infosys_certificate_.pdf",
  "Python_Certificate_2.pdf",
  "Python_Certificate_3.pdf",
  "Python_Certificate_-_4.pdf",
  "Python_Certificate_-5.pdf",
  "Infosys_certificates__sem_2_.pdf",
];

for (const file of certificates) {
  const pdfPath = join(certsDir, file);
  const outputName = file.replace(".pdf", ".png");
  const outputPath = join(certsDir, outputName);

  try {
    console.log(`Converting: ${file}`);
    const pages = await pdfToPng(pdfPath, {
      disableFontFace: false,
      useSystemFonts: true,
      viewportScale: 1.5,
      pagesToProcess: [1],
      strictPagesToProcess: false,
    });

    if (pages && pages[0]) {
      writeFileSync(outputPath, pages[0].content);
      console.log(`  ✓ Saved: ${outputName}`);
    }
  } catch (err) {
    console.error(`  ✗ Failed: ${file} —`, err.message);
  }
}

console.log("\nDone.");
