import fs from 'fs';
import path from 'path';

export async function getImagesFromFolder(folderPath: string) {
 const fullPath = path.join(process.cwd(), 'public', folderPath);

 try {
  const files = fs.readdirSync(fullPath);

  // Filter for common image extensions and sort numerically/alphabetically
  const imageFiles = files
   .filter(file => /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(file))
   .sort((a, b) => {
    // Nature sort to handle 1.jpg, 2.jpg, 10.jpg correctly
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
   });

  return imageFiles.map(file => path.join(folderPath, file).replace(/\\/g, '/'));
 } catch (error) {
  console.error(`Error reading directory ${fullPath}:`, error);
  return [];
 }
}
