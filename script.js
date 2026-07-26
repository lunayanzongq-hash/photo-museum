const photos = [
  { src: "photos/1.jpg", caption: "2025年12月23日晚，我的背景图", category: "光影", desc: "蓝白色的光从门缝延伸出来，作为页面的背景图刚好合适" },
  { src: "photos/4.jpg", caption: "2016年10月3日，表哥结婚", category: "人物", desc: "那时大伯还在，姑父看着也年轻" },
  { src: "photos/5.jpg", caption: "2016年10月6日，奶奶在门口坐着", category: "人物", desc: "每个人都有自己的孤独时刻" },
{ src: "photos/6.jpg", caption: "2017年5月19日，奶奶对着镜头笑", category: "人物", desc: "那时对她来说手机拍照还很新奇" },
{ src: "photos/9.jpg", caption: "2020年5月4日，奶奶卧床几年了", category: "人物", desc: "那几年都很辛苦，面对生老病死有太多无奈，尽力而为" },


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