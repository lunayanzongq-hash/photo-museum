
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// =====================================
// 1. 目录
// =====================================

const SRC = path.join(__dirname, "photos");
const THUMB = path.join(SRC, "thumb");
const BACKUP = path.join(__dirname, "..", "photos_original_backup");

const MANIFEST = path.join(__dirname, ".compression-manifest.json");

// =====================================
// 2. 图片优化参数
// =====================================

const CONFIG = {
  full: {
    width: 2000,
    height: 2000,
    quality: 90
  },

  thumb: {
    width: 900,
    height: 900,
    quality: 85
  },

  format: "jpeg",
  progressive: true,
  mozjpeg: true,
  chromaSubsampling: "4:4:4"
};

// 自动生成参数版本
const PARAM_VERSION = crypto
  .createHash("sha256")
  .update(JSON.stringify(CONFIG))
  .digest("hex")
  .slice(0, 16);

// =====================================
// 3. 初始化
// =====================================

fs.mkdirSync(THUMB, { recursive: true });
fs.mkdirSync(BACKUP, { recursive: true });

function exists(file) {
  return fs.existsSync(file) &&
    fs.statSync(file).isFile();
}

function hash(buffer) {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
}

function fileHash(file) {
  return hash(fs.readFileSync(file));
}

function size(file) {
  return (fs.statSync(file).size / 1024).toFixed(1);
}

// =====================================
// 4. 压缩记录
// =====================================

function loadManifest() {
  if (!exists(MANIFEST)) {
    return { version: 1, files: {} };
  }

  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    throw new Error("压缩记录损坏，请勿删除备份，请先检查记录文件。");
  }
}

function saveManifest(data) {
  const temp = MANIFEST + ".tmp";

  fs.writeFileSync(
    temp,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  if (exists(MANIFEST)) {
    fs.unlinkSync(MANIFEST);
  }

  fs.renameSync(temp, MANIFEST);
}

// =====================================
// 5. 原图备份
// =====================================

function createBackup(file, source) {
  const sourceHash = fileHash(source);

  const backupName =
    file + "." + sourceHash + ".original";

  const backup = path.join(BACKUP, backupName);

  if (!exists(backup)) {
    fs.copyFileSync(source, backup);
  }

  if (fileHash(backup) !== sourceHash) {
    throw new Error("原图备份校验失败");
  }

  return backup;
}

function getOriginal(file, current, entry) {

  // 上一次处理未完成，继续使用原备份
  if (entry?.status === "pending") {
    const backup = path.join(BACKUP, entry.backupFile);

    if (!exists(backup)) {
      throw new Error("找不到中断任务的原图备份");
    }

    return backup;
  }

  // 已处理过，当前大图仍与上次输出一致
  if (entry?.status === "done") {
    if (fileHash(current) === entry.outputHash) {
      const backup = path.join(BACKUP, entry.backupFile);

      if (!exists(backup)) {
        throw new Error("原始备份丢失");
      }

      return backup;
    }

    // 大图被替换，视为新的原图
    return createBackup(file, current);
  }

  // 兼容之前脚本创建的旧备份
  const oldBackup = path.join(BACKUP, file);

  if (exists(oldBackup)) {
    return createBackup(file, oldBackup);
  }

  // 第一次处理，备份当前原图
  return createBackup(file, current);
}

// =====================================
// 6. 生成优化图片
// =====================================

async function generate(input, output, settings) {
  await sharp(input)
    .rotate()
    .resize({
      width: settings.width,
      height: settings.height,
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: settings.quality,
      progressive: CONFIG.progressive,
      mozjpeg: CONFIG.mozjpeg,
      chromaSubsampling: CONFIG.chromaSubsampling
    })
    .toFile(output);
}

// =====================================
// 7. 替换正式文件
// =====================================

function replace(temp, target) {
  if (exists(target)) {
    fs.unlinkSync(target);
  }

  fs.renameSync(temp, target);
}

// =====================================
// 8. 主程序
// =====================================

async function main() {
  const manifest = loadManifest();

  const files = fs.readdirSync(SRC).filter(file => {
    const full = path.join(SRC, file);

    return /\.(jpg|jpeg)$/i.test(file) &&
      fs.statSync(full).isFile();
  });

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  console.log("\n========== 图片智能优化 ==========");
  console.log("照片数量：", files.length);
  console.log("参数版本：", PARAM_VERSION);
  console.log("大图：2000px / quality 90");
  console.log("缩略图：900px / quality 85");
  console.log("==================================\n");

  for (const file of files) {
    const current = path.join(SRC, file);
    const thumb = path.join(THUMB, file);

    const fullTemp = current + ".tmp.jpg";
    const thumbTemp = thumb + ".tmp.jpg";

    const entry = manifest.files[file];

    try {
      // 获取真正的原图
      const backup = getOriginal(file, current, entry);
      const sourceHash = fileHash(backup);

      const fullExists = exists(current);
      const thumbExists = exists(thumb);

      // 检查是否需要处理
      let needsProcess =
        !entry ||
        entry.status !== "done" ||
        entry.sourceHash !== sourceHash ||
        entry.paramVersion !== PARAM_VERSION ||
        !fullExists ||
        !thumbExists;

      // 检查大图和缩略图是否被外部修改
      if (!needsProcess &&
          fileHash(current) !== entry.outputHash) {
        needsProcess = true;
      }

      if (!needsProcess &&
          fileHash(thumb) !== entry.thumbHash) {
        needsProcess = true;
      }

      if (!needsProcess) {
        skipped++;
        console.log("跳过：", file);
        continue;
      }

      console.log("优化：", file);

      // 先保存处理中状态
      manifest.files[file] = {
        status: "pending",
        sourceHash,
        backupFile: path.basename(backup),
        paramVersion: PARAM_VERSION
      };

      saveManifest(manifest);

      // 从原始备份读取，不读取已经压缩的大图
      const input = fs.readFileSync(backup);

      // 两种尺寸分别生成
      await generate(input, fullTemp, CONFIG.full);
      await generate(input, thumbTemp, CONFIG.thumb);

      // 检查生成文件
      if (!exists(fullTemp) || !exists(thumbTemp)) {
        throw new Error("图片生成失败");
      }

      // 替换正式图片
      replace(fullTemp, current);
      replace(thumbTemp, thumb);

      // 记录输出校验值
      manifest.files[file] = {
        status: "done",
        sourceHash,
        backupFile: path.basename(backup),
        paramVersion: PARAM_VERSION,
        outputHash: fileHash(current),
        thumbHash: fileHash(thumb)
      };

      saveManifest(manifest);

      console.log(
        `完成：${file} | 原图 ${size(backup)}KB | 大图 ${size(current)}KB | 缩略图 ${size(thumb)}KB`
      );

      processed++;

    } catch (error) {
      failed++;
      console.error(`失败：${file} | ${error.message}`);

    } finally {
      for (const temp of [fullTemp, thumbTemp]) {
        if (exists(temp)) {
          fs.unlinkSync(temp);
        }
      }
    }
  }

  console.log("\n========== 优化完成 ==========");
  console.log("扫描：", files.length);
  console.log("重新优化：", processed);
  console.log("跳过：", skipped);
  console.log("失败：", failed);
  console.log("参数版本：", PARAM_VERSION);
  console.log("==============================\n");
}

main().catch(error => {
  console.error("运行错误：", error);
  process.exitCode = 1;
});
