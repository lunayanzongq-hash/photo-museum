const photos = [
  { src: "photos/1.jpg", caption: "2020年5月，鸡", category: "动物", desc: "封城时买的第一个相机，在镜头下第一次仔细看到了鸡的羽毛和色彩也很漂亮。" },
  { src: "photos/2.jpg", caption: "2022年9月，湘湖", category: "风景", desc: "杭州萧山湘湖，环卫工人和景色融为一体。" },
  { src: "photos/3.jpg", caption: "2022年10月，自己，", category: "人物", desc: "那时训练完最大的奢侈仅仅是去吃十块一份的过桥米线。" },
  { src: "photos/4.jpg", caption: "2025年12月23日晚，房门口", category: "光影", desc: "光从门缝延伸出来。" },
  { src: "photos/5.jpg", caption: "2026年6月26日晚，书桌", category: "我的小盒子", desc: "一直没舍得吃。" },
{ src: "photos/6.jpg", caption: "2026年6月22日晚，手抄心经", category: "笔痕", desc: "写字的时候能清楚的知道自己的整体状态。" },
{ src: "photos/7.jpg", caption: "2026年6月15日晚，病房四人", category: "人物", desc: "外婆的两个女儿和我。" },
{ src: "photos/8.jpg", caption: "2026年6月15日晚，病房三人", category: "人物", desc: "外婆，母亲和我。" },


];
const categories = ["全部", ...new Set(photos.map(p => p.category))];
let current = 0;
let filtered = [...photos];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCaption = document.getElementById("lightbox-caption");
const lbDesc = document.getElementById("lightbox-desc");
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
  list.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = "<img src='" + p.src + "' alt='" + p.caption + "'><div class='label'>" + p.caption + "</div>";
    card.onclick = () => openPhoto(i, list);
    gallery.appendChild(card);
  });
}

function openPhoto(i, list) {
  current = i;
  filtered = list;
  lbImg.src = filtered[i].src;
  lbCaption.textContent = filtered[i].caption;
  lbDesc.textContent = filtered[i].desc || "";
  lightbox.classList.remove("hidden");
}
lbImg.style.transform = "scale(1)";
lbImg.dataset.scale = "1";
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