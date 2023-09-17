const date = new Date();
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-bar");
const searchIcon = document.getElementById("search-icon");
const arrayOfSeasons = ["winter", "spring", "summer", "autumn"];
const season = arrayOfSeasons[getSeason()];
const myUrl =
  "https://api.unsplash.com/photos/?client_id=588sChbD4XYfVMX6oxBTVOtqczMXoFRFt2eYmCEkglk";
const seasonUrl = '';
const url =
  "https://api.unsplash.com/photos?client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";
const testUrl = 'https://api.unsplash.com/photos?&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  gallery.innerHTML = "";
  data.forEach((img) => {
    console.log(img.urls.regular);
    gallery.innerHTML += `<div class="picture" style="background: url(${img.urls.small})" data-link="${img.urls.raw}"></div>`;
  });
  setListener();
}
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
    document.documentElement.style.setProperty('--main', 'black');
    document.documentElement.style.setProperty('--second', 'white');
  } else {
    document.documentElement.style.setProperty('--main', 'white');
    document.documentElement.style.setProperty('--second', 'black');
  }
}
function getSeason() {
  return Math.round((date.getMonth() / 12) * 4) % 4;
}
function findImages(keyword) {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  console.log(`finding images... by ${keyword}`);
  getData(url);
}

searchIcon.addEventListener("click", () => {
  searchInput.value && findImages(searchInput.value);
});
searchInput.addEventListener("keypress", (e) => {
  searchInput.value && e.key === "Enter" && findImages(searchInput.value);
});

setColorPalette(date.getHours());
getData(testUrl);
