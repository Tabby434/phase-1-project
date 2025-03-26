document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
});

document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
});

function fetchGalleries() {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.galleries) {
        displayGalleries(data.galleries);
      } else {
        console.error("Galleries data not found in db.json");
      }
    })
    .catch((error) => console.error("Error fetching galleries:", error));
}


document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
});

 

document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
});

function fetchGalleries() {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.galleries) {
        displayGalleries(data.galleries);
      } else {
        console.error("Galleries data not found in db.json");
      }
    })
    .catch((error) => console.error("Error fetching galleries:", error));
}

function displayGalleries(galleries) {
  const container = document.getElementById("galleries-container");
  container.innerHTML = "";
  galleries.forEach((gallery) => {
    if (gallery.id && gallery.name && gallery.images) {
      const galleryElement = document.createElement("div");
      galleryElement.classList.add("gallery-item");
      galleryElement.innerHTML = `<h3>${gallery.name}</h3>`;
      galleryElement.addEventListener("click", () => showGallery(gallery));
    }
  }),
}
    