const photos = [
  { src: "photos/1.jpg", date: "2025年12月23日", caption: "光从门缝延伸出来", category: "2023-2025", desc: "作为页面的背景图刚好合适。" },
  { src: "photos/2.jpg", date: "2013年11月", caption: "那时大伯还在", category: "山的这头", desc: "姑父看着也年轻的多。" },
  { src: "photos/3.jpg", date: "2016年", caption: "每个人都有自己的孤独时刻", category: "山的这头", desc: "奶奶在门口坐着。" },
  { src: "photos/4.jpg", date: "2017年", caption: "奶奶对着镜头笑", category: "山的这头", desc: "对她来说用手机拍照还很新奇，她也没用过手机。" },
  { src: "photos/5.jpg", date: "2020年5月4日", caption: "奶奶卧床几年了", category: "山的这头", desc: "找了一个栏杆防止奶奶摔下床，我却每次觉得像牢笼。没想到的是，仅仅三个月后，奶奶去世了。卧床那几年她常觉痛苦，意志几乎清醒，肉体却无法掌控。生老病死面前，有太多无奈。好在最后是安详的离开。" },
  { src: "photos/6.jpg", date: "2013年11月10日", caption: "唯一的合照", category: "山的这头", desc: "涛涛哥哥结婚时，可能是雷雷哥哥拿出相机提议拍个合照，所以照片里少了他，还少了大伯。" },
    { src: "photos/7.jpg", date: "2025年", caption: "玩偶", category: "2023-2025", desc: "好可爱。" },
  { src: "photos/8.jpg", date: "2017年", caption: "下着小雨的武当山", category: "2015-2019", desc: "喜欢这个颜色冲突。" },
  { src: "photos/9.jpg", date: "2013年11月11日", caption: "四代同堂", category: "山的这头", desc: "照片从左往右分别是奶奶，姑姑，姑姑的小孙子，姑姑的婆婆。" },
    { src: "photos/10.jpg", date: "2018年4月24日", caption: "等火车也要很销魂", category: "2015-2019", desc: "汉口火车站最边缘洗手间出来看到这一幕，疲惫一扫而空。" },
  { src: "photos/11.jpg", date: "2017年", caption: "宿舍四人", category: "2015-2019", desc: "有两位已经是伟大的母亲啦。" },
  { src: "photos/12.jpg", date: "2016年9月21日", caption: "五号教学楼和十堰的蓝天", category: "2015-2019", desc: "很喜欢十堰的蓝天，常一个人去这栋楼复习。" },
  { src: "photos/13.jpg", date: "2017年7月", caption: "夜间硬座", category: "2015-2019", desc: "腰坐累了，起来活动身体的时候看到背后的乘客在看余华的书。" },
  { src: "photos/14.jpg", date: "2017年7月", caption: "火车站", category: "2015-2019", desc: "不知道看了多少次这场景。" },
  { src: "photos/15.jpg", date: "2023年2月14日", caption: "和莎莎在龟山", category: "2023-2025", desc: "今年只见了两次面，上次已经是半年前了。" },
  { src: "photos/16.jpg", date: "2018年3月底", caption: "莎莎", category: "2015-2019", desc: "随州校区宿舍里，第二天的志愿者活动我主动报名做摄像拿到了相机，其实那还是我第一次用相机，先给莎莎拍了。" },
  { src: "photos/17.jpg", date: "2023年1月29日", caption: "我和莎莎", category: "2023-2025", desc: "刚回武汉，邀请莎莎来我家住了一段时间，那些天好开心，每天到处看风景逗猫玩狗。" },
  { src: "photos/18.jpg", date: "2017年12月", caption: "背影", category: "2015-2019", desc: "回十堰考六级，考完和莎莎逛公园爬山。喜欢这张背影，曾经还找了很久照片里的背包和乌龟挂饰，我们俩都没找到。" },
   { src: "photos/19.jpg", date: "2025年12月25日", caption: "梧桐山两人", category: "2023-2025", desc: "深圳梧桐山，下山时遇到的一对人儿。" },
  { src: "photos/20.jpg", date: "2023年11月15日", caption: "和老李在西西弗", category: "2023-2025", desc: "在西西弗上班时，老李住的近，常来玩。" },
  { src: "photos/21.jpg", date: "2018年9月", caption: "我和芳芳老师", category: "2015-2019", desc: "那时总跟着芳芳老师去病房，做完治疗等仪器的时候我们就坐着看病房的电视休息会。" },
  { src: "photos/22.jpg", date: "2014年", caption: "高中课桌", category: "山的这头", desc: "整齐" },
  { src: "photos/23.jpg", date: "2026年10月24日", caption: "无人机拍摄湖里的鸬鹚", category: "2026", desc: "今年拍的照片里目前最喜欢的一张，自由，治愈。" },
  { src: "photos/24.jpg", date: "2023年6月9日", caption: "补过生日", category: "2023-2025", desc: "回武汉的第一年，我们都刚找到工作后的一个休息日，在摩尔城豪客来下馆子。" },
  { src: "photos/25.jpg", date: "2018年7月28日", caption: "眼睛", category: "山的这头", desc: "回看时，有些照片是不忍多看的，但是仅有的几张照片了。" },
  { src: "photos/26.jpg", date: "2017年1月1日", caption: "和莎莎一起下馆子的日子", category: "2015-2019", desc: "学校离武汉很远我们就很少回去，这家店美味还实惠，过节时总去吃。" },
  { src: "photos/27.jpg", date: "2023年9月21日", caption: "西西弗书店", category: "2023-2025", desc: "老李拍的我。" },
  { src: "photos/28.jpg", date: "2019年5月2日", caption: "西山水坑里的蝌蚪", category: "2019-2022", desc: "哈哈，单纯觉得我拍得好。" },
  { src: "photos/29.jpg", date: "2021年5月26日", caption: "上身肌肉", category: "2019-2022", desc: "无他，纯展示。" },
  { src: "photos/30.jpg", date: "2022年3月18日", caption: "深蹲", category: "2019-2022", desc: "动作质量很满意，我这该死的完美。" },
  { src: "photos/31.jpg", date: "2020年10月2日", caption: "sadness", category: "2019-2022", desc: "我走后，狗都没了。" },
  { src: "photos/32.jpg", date: "2020年7月7日", caption: "高杠深蹲", category: "2019-2022", desc: "下身肌肉明显练出来了，很少穿紧身的衣服，记得这是迪卡侬的童装短裤。" },
  { src: "photos/33.jpg", date: "2021年4月29日", caption: "下身肌肉", category: "2019-2022", desc: "无他，纯展示。" },
  { src: "photos/34.jpg", date: "2020年7月7日", caption: "相扑硬拉", category: "2019-2022", desc: "最喜欢的一套衣服和相扑硬拉的动作。" },
  { src: "photos/35.jpg", date: "2023年10月13日", caption: "曾经也是一位咖啡师", category: "2023-2025", desc: "背面。" },
  { src: "photos/36.jpg", date: "2025年12月28日", caption: "南丫岛码头", category: "2023-2025", desc: "即将坐船离开。" },
  { src: "photos/37.jpg", date: "2025年12月27日", caption: "伤心小熊", category: "2023-2025", desc: "南丫岛垃圾桶旁捡到的小熊。" },
  { src: "photos/38.jpg", date: "2025年12月27日", caption: "清晨绿屋", category: "2023-2025", desc: "南丫岛住宿，平静的早晨。" },










];

// 缩略图路径：photos/1.jpg -> photos/thumb/1.jpg
photos.forEach(p => { p.thumb = p.src.replace("photos/", "photos/thumb/"); });

// 显示用的完整说明：日期 + 文案（供时间轴卡片和开场图使用）
function fullCaption(p) {
  return p.date ? p.date + "，" + p.caption : p.caption;
}

// 从日期文字里解析日期，用于按时间顺序排列。
// 只有年份的，月/日默认取年中（6月15日），避免总是排在最前面。
// 解析不出日期的，沿用前一张有日期照片的日期，作为近似排序依据。
function parseCaptionDate(text) {
  const m = text.match(/(\d{4})年(?:(\d{1,2})月)?(?:(\d{1,2})日)?/);
  if (!m) return null;
  const year = parseInt(m[1], 10);
  const month = m[2] ? parseInt(m[2], 10) - 1 : 5;
  const day = m[3] ? parseInt(m[3], 10) : 15;
  return new Date(year, month, day);
}
(function attachDates() {
  let lastKnown = null;
  photos.forEach(p => {
    let d = parseCaptionDate(p.date || p.caption);
    if (!d) d = lastKnown;
    if (d) lastKnown = d;
    p._date = d;
  });
})();

const categoryOrder = [
"2026",
"2023-2025",
  "2019-2022",
  "2015-2019",
  "山的这头",
  
  
];
const allCategories = [...new Set(photos.map(p => p.category))];
const categories = [
  "全部",
  ...categoryOrder.filter(c => allCategories.includes(c)),
  ...allCategories.filter(c => !categoryOrder.includes(c))
];
let current = 0;
let filtered = [...photos];
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const nav = document.getElementById("nav");
function renderNav() {
  nav.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll("#nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtered = cat === "全部" ? [...photos] : photos.filter(p => p.category === cat);
      render(filtered);
    };
    nav.appendChild(btn);
  });
  nav.firstChild.classList.add("active");
}
function render(list) {
  gallery.innerHTML = "";
  // 按时间顺序排列（当前：新 -> 旧，从上往下延伸）
  const sorted = list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (b.p._date || 0) - (a.p._date || 0));
  filtered = sorted.map(x => x.p); // openPhoto 的上一张/下一张也按时间顺序走
  const timeline = document.createElement("div");
  timeline.className = "timeline";
  let lastYear = null;
  let side = "left";
  sorted.forEach(({ p }, sortedIndex) => {
    const year = p._date ? p._date.getFullYear() : null;
    if (year !== null && year !== lastYear) {
      const yearMarker = document.createElement("div");
      yearMarker.className = "tl-year";
      yearMarker.innerHTML = "<span>" + year + "</span>";
      timeline.appendChild(yearMarker);
      lastYear = year;
    }

    const item = document.createElement("div");
    item.className = "tl-item " + side;
    const hasDesc = p.desc && p.desc.trim().length > 0;
    item.innerHTML =
      "<div class='tl-card'>" +
        "<img src='" + p.thumb + "' alt='" + fullCaption(p) + "' loading='lazy' decoding='async'>" +
        "<div class='label'>" + fullCaption(p) + "</div>" +
        (hasDesc
          ? "<div class='tl-toggle'>展开 ▾</div><div class='tl-desc'>" + p.desc + "</div>"
          : "") +
      "</div>";

    item.querySelector("img").onclick = () => openPhoto(sortedIndex, filtered);

    if (hasDesc) {
      const toggle = item.querySelector(".tl-toggle");
      const descEl = item.querySelector(".tl-desc");
      toggle.onclick = (e) => {
        e.stopPropagation();
        const open = descEl.classList.toggle("open");
        toggle.textContent = open ? "收起 ▴" : "展开 ▾";
      };
    }

    timeline.appendChild(item);

    side = side === "left" ? "right" : "left"; // 左右交替分支
  });

  gallery.appendChild(timeline);
}

function openPhoto(i, list) {
  current = i;
  filtered = list;
  lbImg.src = filtered[i].src;
  const next = new Image();
  next.src = filtered[(i + 1) % filtered.length].src;
  lbImg.style.transform = "scale(1)";
  lbImg.dataset.scale = "1";
  lightbox.classList.remove("hidden");
}
document.getElementById("close").onclick = () => lightbox.classList.add("hidden");
document.getElementById("prev").onclick = () => openPhoto((current - 1 + filtered.length) % filtered.length, filtered);
document.getElementById("next").onclick = () => openPhoto((current + 1) % filtered.length, filtered);

renderNav();
lightbox.addEventListener("wheel", (e) => {
  e.preventDefault();
  let scale = parseFloat(lbImg.dataset.scale) || 1;
  scale += e.deltaY < 0 ? 0.1 : -0.1;
  scale = Math.min(Math.max(scale, 0.5), 4);
  lbImg.dataset.scale = scale;
  lbImg.style.transform = "scale(" + scale + ")";
}, { passive: false });
render(photos);