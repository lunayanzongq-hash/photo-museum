const photos = [
  { src: "photos/1.jpg", caption: "2025年12月23日晚", category: "2025", desc: "蓝白色的光从门缝延伸出来，作为页面的背景图刚好合适。" },
  { src: "photos/2.jpg", caption: "2016年10月3日，表哥结婚", category: "山的这头", desc: "那时大伯还在，姑父看着也年轻的多。" },
  { src: "photos/3.jpg", caption: "2016年10月6日，每个人都有自己的孤独时刻", category: "山的这头", desc: "奶奶在门口坐着。" },
{ src: "photos/4.jpg", caption: "2017年5月19日，奶奶对着镜头笑", category: "山的这头", desc: "那时对她来说手机拍照还很新奇，很喜欢这张照片。" },
{ src: "photos/5.jpg", caption: "2020年5月4日，奶奶卧床几年了", category: "山的这头", desc: "那几年照顾的都很辛苦，面对生老病死有太多无奈，尽力而为。" },
{ src: "photos/6.jpg", caption: "2013年，唯一的合照", category: "山的这头", desc: "涛涛哥哥结婚时，可能是雷雷哥哥拿出相机提议拍个合照，所以照片里少了他，还少了大伯。" },
{ src: "photos/7.jpg", caption: "2017年，武当山和店主小孩一起吃饭", category: "2015-2019", desc: "晚上没有下山直接住的山里民宿。" },
{ src: "photos/8.jpg", caption: "2017年，下着小雨的武当山", category: "2015-2019", desc: "武当山很大，里面的生活用品只能人力挑上去。" },
{ src: "photos/9.jpg", caption: "2017年1月1日，和莎莎一起吃饭", category: "2015-2019", desc: "那时节假日如果不回武汉会约着一起吃这家，实惠好吃。" },
{ src: "photos/10.jpg", caption: "2016年，医学之父庇佑你们", category: "2015-2019", desc: "去五号楼上课总是看到这几只狗在这里晒太阳。" },
{ src: "photos/11.jpg", caption: "2016年，医学生的期末", category: "2015-2019", desc: "宿舍复习。" },
{ src: "photos/12.jpg", caption: "2017年，十堰人民公园", category: "2015-2019", desc: "" },
{ src: "photos/13.jpg", caption: "2017年，夜间硬座", category: "2015-2019", desc: "腰坐累了，起来活动身体的时候看到背后的乘客在看余华的书。" },
{ src: "photos/14.jpg", caption: "2017年，火车站", category: "2015-2019", desc: "在外地上学，不知道看了多少次火车站这场景。" },
{ src: "photos/15.jpg", caption: "火车上的爷孙", category: "2015-2019", desc: "小孩好像是身体有什么疾病，爷爷带着出来玩还是看病，说了很多。" },
{ src: "photos/16.jpg", caption: "2018年，莎莎", category: "2015-2019", desc: "随州校区宿舍里，第二天的志愿者活动我主动报名做摄像拿到了相机，其实那还是我第一次用相机，先给莎莎拍了。" },
{ src: "photos/17.jpg", caption: "2018年，腾波", category: "2015-2019", desc: "借着志愿活动摄像的名义，自己到处跑到处拍。" },
{ src: "photos/18.jpg", caption: "2017年12月，莎莎", category: "2015-2019", desc: "回十堰校区考六级，和莎莎碰面，公园爬山 ，那时我已经去随州校区了，难得回一次十堰。" },
{ src: "photos/19.jpg", caption: "2018年，手抓饼阿姨的朋友圈", category: "2015-2019", desc: "想不起来怎么加的阿姨的微信，只有这张截图一直留着，备注着。" },
{ src: "photos/20.jpg", caption: "2018年，实习宿舍", category: "2015-2019", desc: "小小一块空间，看到这张桌子就想起了一个人关在里面的一段时间。" },
{ src: "photos/21.jpg", caption: "2018年，我和芳芳老师", category: "2015-2019", desc: "那时总跟着芳芳老师去病房，做完床边治疗等仪器的时候我们就坐着看病房的电视。" },
{ src: "photos/22.jpg", caption: "2018年，门诊实习", category: "2015-2019", desc: "一位职业是艺术绘画相关的小姐姐总是来门诊理疗，那时还加了微信，休息的时候玩游戏被偷拍。" },


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