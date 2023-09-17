const date = new Date();
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
const seasonBtn = document.getElementById("season-suggestion");
const eraseBtn = document.getElementById('search-close');
const arrayOfSeasons = ["winter", "spring", "summer", "autumn"];
const url =
  "https://api.unsplash.com/photos?&per_page=30&client_id=588sChbD4XYfVMX6oxBTVOtqczMXoFRFt2eYmCEkglk";

// GET INFO FUNCTIONS
async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  gallery.innerHTML = "";
  data.forEach((img) => {
    gallery.innerHTML += `<div class="picture" style="background: url(${img.urls.small})" data-link="${img.urls.raw}"></div>`;
  });
  setListener();
}
async function getFindingImages(url) {
  const res = await fetch(url);
  const data = await res.json();
  gallery.innerHTML = "";
  data.results.forEach((img) => {
    gallery.innerHTML += `<div class="picture" style="background: url(${img.urls.small})" data-link="${img.urls.raw}"></div>`;
  });
  setListener();
}
function getSeason() {
  return Math.round((date.getMonth() / 12) * 4) % 4;
}

// SET FUNCTIONS
function setListener() {
  const listOfPic = document.querySelectorAll(".picture");
  listOfPic.forEach((picture) => {
    picture.addEventListener("dblclick", () => {
      window.open(picture.dataset.link, "_blank");
    });
  });
}
function setColorPalette(time) {
  if (time >= 5 && time <= 18) {
    document.documentElement.style.setProperty("--main", "black");
    document.documentElement.style.setProperty("--second", "white");
  } else {
    document.documentElement.style.setProperty("--main", "white");
    document.documentElement.style.setProperty("--second", "black");
  }
}

function findImages(keyword) {
  const url = `https://api.unsplash.com/search/photos?&per_page=30&query=${keyword}&client_id=588sChbD4XYfVMX6oxBTVOtqczMXoFRFt2eYmCEkglk`;
  getFindingImages(url);
}
function eraseInput() {
  searchInput.value = '';
}

// LISTENERS
searchIcon.addEventListener("click", () => {
  !searchInput.value ? getData(url) : findImages(searchInput.value);
});
searchInput.addEventListener("keypress", (e) => {
  !searchInput.value
    ? e.key === "Enter" && getData(url)
    : e.key === "Enter" && findImages(searchInput.value);
});
seasonBtn.addEventListener("click", () => {
  const season = arrayOfSeasons[getSeason()];
  const url = `https://api.unsplash.com/search/photos?&per_page=30&query=${season}&client_id=588sChbD4XYfVMX6oxBTVOtqczMXoFRFt2eYmCEkglk`;
  getFindingImages(url);
});
eraseBtn.addEventListener('click', () => eraseInput())

searchInput.focus();
setColorPalette(date.getHours());
getData(url);
