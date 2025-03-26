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

 