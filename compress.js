
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SRC = "photos";
const THUMB = path.join(SRC, "thumb");
const BACKUP = path.join("..", "photos_original_backup");
const MANIFEST = path.join(SRC, ".compress-manifest.json");

const CONFIG = {
  fullWidth: 2000,
  fullQuality: 82,
  thumbWidth: 900,
  thumbQuality: 78
};

const CONFIG_ID = JSON.stringify(CONFIG);

const PARAM_VERSION = crypto
  .createHash("sha256")
  .update(CONFIG_ID)
  .digest("hex")
  .slice(0, 16);

fs.mkdirSync(THUMB, { recursive: true });
fs.mkdirSync(BACKUP, { recursive: true });

function hash(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function makeFull(input) {
  return sharp(input)
    .rotate()
    .resize({
      width: CONFIG.fullWidth,
      height: CONFIG.fullWidth,
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: CONFIG.fullQuality,
      progressive: true,
      mozjpeg: true
    })
    .toBuffer();
}

async function makeThumb(input) {
  return sharp(input)
    .rotate()
    .resize({
      width: CONFIG.thumbWidth,
      height: CONFIG.thumbWidth,
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: CONFIG.thumbQuality,
      progressive: true,
      mozjpeg: true
    })
    .toBuffer();
}

function saveFile(file, buffer) {
  fs.writeFileSync(file, buffer);
}

async function main() {
  let manifest = {
    version: 1,
    config: CONFIG_ID,
    files: {}
  };

  if (fs.existsSync(MANIFEST)) {
    manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  }

  const oldFiles = manifest.files || {};
  const sameConfig = manifest.config === CONFIG_ID;

  const files = fs.readdirSync(SRC)
    .filter(f => /\.(jpe?g)$/i.test(f));

  const newFiles = {};
  let processed = 0;
  let skipped = 0;
  let thumbOnly = 0;

  for (const f of files) {
    const currentFile = path.join(SRC, f);
    const thumbFile = path.join(THUMB, f);
    const oldRecord = oldFiles[f];

    const current = fs.readFileSync(currentFile);
    const currentHash = hash(current);

    const backupName = oldRecord?.backupFile
      ? path.basename(oldRecord.backupFile)
      : f;

    const backupFile = path.join(BACKUP, backupName);

    let input;
    let rebuildFull = false;
    let isReplacement = false;

    // 情况一：网站大图与上次处理结果一致
    if (oldRecord && currentHash === oldRecord.outputHash) {
      // 优先使用之前保存的处理源文件
      if (fs.existsSync(backupFile)) {
        const backup = fs.readFileSync(backupFile);

        // 确认备份内容确实与 manifest 记录一致
        if (hash(backup) === oldRecord.sourceHash) {
          input = backup;
        }
      }

      // 备份缺失或不匹配时，保留当前满意的大图
      if (!input) {
        input = current;
        saveFile(backupFile, current);

        console.warn(
          `${f}：原备份缺失或不匹配，已用当前大图重新建立备份`
        );
      }

      // 只有压缩参数变化时，才重新生成网站大图
      if (
        !sameConfig ||
        oldRecord.paramVersion !== PARAM_VERSION
      ) {
        rebuildFull = true;
      }
    } else {
      // 情况二：新照片，或同名照片被替换
      input = current;
      saveFile(backupFile, current);

      rebuildFull = true;
      isReplacement = !!oldRecord;
    }

    const oldThumbHash = oldRecord?.thumbHash;
    const thumbExists = fs.existsSync(thumbFile);

    const thumbValid =
      thumbExists &&
      oldThumbHash &&
      hash(fs.readFileSync(thumbFile)) === oldThumbHash;

    // 大图不需要重做，缩略图也正常：完全跳过
    if (!rebuildFull && thumbValid) {
      newFiles[f] = {
        ...oldRecord,
        backupFile: backupName
      };

      skipped++;
      continue;
    }

    let fullBuffer;
    let thumbBuffer;

    if (rebuildFull) {
      // 新照片、同名替换，或压缩参数发生变化
      fullBuffer = await makeFull(input);
      thumbBuffer = await makeThumb(input);

      saveFile(currentFile, fullBuffer);
      saveFile(thumbFile, thumbBuffer);

      processed++;
    } else {
      // 大图保持不动，只重建缩略图
      thumbBuffer = await makeThumb(input);
      saveFile(thumbFile, thumbBuffer);

      // 保留原有大图，不再压缩一次
      fullBuffer = current;
      thumbOnly++;
    }

    newFiles[f] = {
      status: "done",
      sourceHash: hash(input),
      backupFile: backupName,
      paramVersion: PARAM_VERSION,
      outputHash: hash(fullBuffer),
      thumbHash: hash(thumbBuffer)
    };

    console.log(
      `${f}: ` +
      (isReplacement ? "同名照片已替换并重新处理" :
        rebuildFull ? "已处理" : "仅重建缩略图")
    );
  }

  // 只清理没有对应大图的缩略图，不删除任何备份
  const activeNames = new Set(
    files.map(f => f.toLowerCase())
  );

  for (const f of fs.readdirSync(THUMB)) {
    if (!/\.(jpe?g)$/i.test(f)) continue;

    if (!activeNames.has(f.toLowerCase())) {
      fs.unlinkSync(path.join(THUMB, f));
      console.log(`清理旧缩略图：${f}`);
    }
  }

  const finalManifest = {
    version: 1,
    config: CONFIG_ID,
    files: newFiles
  };

  fs.writeFileSync(
    MANIFEST,
    JSON.stringify(finalManifest, null, 2),
    "utf8"
  );

  console.log("----------------------------");
  console.log(`重新处理：${processed} 张`);
  console.log(`仅重建缩略图：${thumbOnly} 张`);
  console.log(`跳过未变化：${skipped} 张`);
  console.log("备份文件没有被自动清理");
  console.log("全部完成！");
}

main().catch(err => {
  console.error("压缩失败：", err);
});
