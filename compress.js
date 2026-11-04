const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "photos";
const THUMB = path.join(SRC, "thumb");
const BACKUP = path.join("..", "photos_original_backup");
fs.mkdirSync(THUMB, { recursive: true });
fs.mkdirSync(BACKUP, { recursive: true });

const kb = (file) => Math.round(fs.statSync(file).size / 1024);

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
  let count = 0;

  for (const f of files) {
    const outFull = path.join(SRC, f);
    const outThumb = path.join(THUMB, f);
    if (fs.existsSync(outThumb)) continue; // 已处理过的跳过

    const backupFile = path.join(BACKUP, f);
    if (!fs.existsSync(backupFile)) fs.copyFileSync(outFull, backupFile); // 先备份原图
    const input = fs.readFileSync(backupFile);

    await sharp(input).rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(outFull);

    await sharp(input).rotate()
      .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(outThumb);

    console.log(`${f}: ${Math.round(input.length / 1024)}KB -> 大图 ${kb(outFull)}KB / 缩略图 ${kb(outThumb)}KB`);
    count++;
  }
  console.log(count ? `完成，新处理 ${count} 张` : "没有新照片需要处理");
})();