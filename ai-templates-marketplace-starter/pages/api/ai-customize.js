import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { templateId, brand, primaryColor } = req.body;
  try {
    const templatesDir = path.join(process.cwd(), 'public', 'templates');
    const demoZip = path.join(templatesDir, 'demo-template.zip');

    const tmpDir = path.join(process.cwd(), 'tmp', `${templateId}-${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });

    const personalizedHtml = `/* generated theme */\n:root { --primary: ${primaryColor}; }\n/* brand: ${brand} */\n`;
    fs.writeFileSync(path.join(tmpDir, 'theme.css'), personalizedHtml);

    const outZipPath = path.join(tmpDir, 'personalized.zip');
    const output = fs.createWriteStream(outZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);
    archive.file(demoZip, { name: 'original-template.zip' });
    archive.file(path.join(tmpDir, 'theme.css'), { name: 'theme.css' });
    await archive.finalize();

    res.json({ downloadUrl: `/api/serve-temp?file=${encodeURIComponent(outZipPath)}` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
