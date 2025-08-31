import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

export default async function handler(req, res) {
  const file = req.query.file;
  if (!file) return res.status(400).send('file required');
  // Only allow files under the project tmp directory to be served
  const allowedPrefix = path.join(process.cwd(), 'tmp') + path.sep;
  const decoded = decodeURIComponent(file);
  if (!decoded.startsWith(allowedPrefix)) {
    return res.status(403).send('forbidden');
  }
  if (!fs.existsSync(decoded)) return res.status(404).send('not found');
  res.setHeader('Content-Type', 'application/zip');
  const stream = fs.createReadStream(decoded);
  stream.pipe(res);
}
