document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
  document.getElementById("back-button").addEventListener("click", goBack);
  setupGalleryMenu();
});

function fetchGalleries() {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.galleries) {
        displayGalleries(data.galleries);
        populateGalleryMenu(data.galleries);
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
      container.appendChild(galleryElement);
    }
  });
}

function populateGalleryMenu(galleries) {
  const menu = document.getElementById("gallery-menu");
  menu.innerHTML = "";
  galleries.forEach((gallery) => {
    if (gallery.id && gallery.name) {
      const option = document.createElement("option");
      option.value = gallery.id;
      option.textContent = gallery.name;
      menu.appendChild(option);
    }
  });
  menu.addEventListener("change", (event) => {
    const selectedGallery = galleries.find(
      (gallery) => gallery.id === event.target.value
    );
    if (selectedGallery) {
      showGallery(selectedGallery);
    }
  });
}

function showGallery(gallery) {
  document.getElementById("gallery-list").classList.add("hidden");
  document.getElementById("gallery-detail").classList.remove("hidden");

  const imagesContainer = document.getElementById("images-container");
  imagesContainer.innerHTML = "";
  gallery.images.forEach((imageUrl) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("image-wrapper");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Gallery Image";

    const heart = document.createElement("button");
    heart.classList.add("heart");
    heart.innerHTML = "♡";
    heart.addEventListener("click", () => toggleLike(heart, gallery));

    const commentBox = document.createElement("input");
    commentBox.type = "text";
    commentBox.placeholder = "Leave a comment...";
    commentBox.classList.add("comment-box");

    const submitComment = document.createElement("button");
    submitComment.textContent = "Comment";
    submitComment.addEventListener("click", () =>
      addComment(commentBox.value, imgWrapper)
    );

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(heart);
    imgWrapper.appendChild(commentBox);
    imgWrapper.appendChild(submitComment);
    imagesContainer.appendChild(imgWrapper);
  });
}

function toggleLike(heartElement, gallery) {
  const isLiked = heartElement.classList.toggle("liked");
  heartElement.innerHTML = isLiked ? "❤️" : "♡";
  heartElement.style.color = isLiked ? "red" : "black";
  gallery.likes += isLiked ? 1 : -1;
  updateLikes(gallery);
}

function updateLikes(gallery) {
  fetch(`http://localhost:3000/galleries/${gallery.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: gallery.likes }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Likes updated:", data))
    .catch((error) => console.error("Error updating likes:", error));
}

function addComment(comment, imgWrapper) {
  if (comment.trim() !== "") {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = comment;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-comment");
    deleteButton.addEventListener("click", () => commentElement.remove());

    commentElement.appendChild(deleteButton);
    imgWrapper.appendChild(commentElement);
  }
}

function goBack() {
  document.getElementById("gallery-list").classList.remove("hidden");
  document.getElementById("gallery-detail").classList.add("hidden");
}

function setupGalleryMenu() {
  const nav = document.getElementById("nav-menu");
  nav.innerHTML = `
        <select id="gallery-menu">
            <option value="" disabled selected>Select a Gallery</option>
        </select>
    `;
}
