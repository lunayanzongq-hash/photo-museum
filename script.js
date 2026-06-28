const photos = [
  { src: "photos/1.jpg", caption: "照片一" },
  { src: "photos/2.jpg", caption: "照片二" },
  { src: "photos/3.jpg", caption: "照片三" },
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCaption = document.getElementById("lightbox-caption");
let current = 0;

function render(list) {
  gallery.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = "<img src='" + p.src + "' alt='" + p.caption + "'><div class='label'>" + p.caption + "</div>";
    card.onclick = () => openPhoto(i);
    gallery.appendChild(card);
  });
}

function openPhoto(i) {
  current = i;
  lbImg.src = photos[i].src;
  lbCaption.textContent = photos[i].caption;
  lightbox.classList.remove("hidden");
}

document.getElementById("close").onclick = () => lightbox.classList.add("hidden");
document.getElementById("prev").onclick = () => openPhoto((current - 1 + photos.length) % photos.length);
document.getElementById("next").onclick = () => openPhoto((current + 1) % photos.length);
document.getElementById("search").oninput = e => render(photos.filter(p => p.caption.includes(e.target.value)));

render(photos);
