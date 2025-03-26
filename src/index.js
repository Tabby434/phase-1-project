document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
  document.getElementById("back-button").addEventListener("click", goBack);
  document
    .getElementById("home-button")
    .addEventListener("click", showCoverPage);
  setupGalleryMenu();
});

function showCoverPage() {
  document.getElementById("gallery-list").classList.add("hidden");
  document.getElementById("gallery-detail").classList.add("hidden");
  document.getElementById("cover-page").classList.remove("hidden");
}

function goBack() {
  document.getElementById("gallery-list").classList.remove("hidden");
  document.getElementById("gallery-detail").classList.add("hidden");
  document.getElementById("cover-page").classList.add("hidden");
}

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
  imagesContainer.style.display = "flex";
  imagesContainer.style.flexWrap = "wrap";
  imagesContainer.style.justifyContent = "space-around";
  imagesContainer.style.gap = "20px";
  imagesContainer.style.padding = "10px";

  gallery.images.forEach((imageUrl) => {
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("image-wrapper");
    imgWrapper.style.display = "flex";
    imgWrapper.style.flexDirection = "column";
    imgWrapper.style.alignItems = "center";
    imgWrapper.style.width = "200px";
    imgWrapper.style.padding = "10px";
    imgWrapper.style.background = "#fff";
    imgWrapper.style.borderRadius = "10px";
    imgWrapper.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Gallery Image";
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "10px";

    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.innerHTML = "🤍 0";
    heart.style.cursor = "pointer";
    heart.dataset.likes = 0;
    heart.addEventListener("click", () => likeImage(heart));

    const commentBox = document.createElement("input");
    commentBox.type = "text";
    commentBox.placeholder = "Add a comment...";
    commentBox.classList.add("comment-box");

    const submitComment = document.createElement("button");
    submitComment.textContent = "Post";
    submitComment.addEventListener("click", () =>
      addComment(imgWrapper, commentBox)
    );

    const deleteComment = document.createElement("button");
    deleteComment.textContent = "Delete Comment";
    deleteComment.addEventListener("click", () =>
      deleteLastComment(imgWrapper)
    );

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(heart);
    imgWrapper.appendChild(commentBox);
    imgWrapper.appendChild(submitComment);
    imgWrapper.appendChild(deleteComment);
    imgWrapper.appendChild(commentsContainer);
    imagesContainer.appendChild(imgWrapper);
  });
}

function likeImage(heartElement) {
  let likes = parseInt(heartElement.dataset.likes);
  likes++;
  heartElement.dataset.likes = likes;
  heartElement.innerHTML = `❤️ ${likes}`;
  if (likes === 1) {
    heartElement.style.color = "red";
  }
}

function addComment(imageWrapper, commentBox) {
  if (commentBox.value.trim() !== "") {
    const comment = document.createElement("span");
    comment.classList.add("comment");
    comment.textContent = commentBox.value;

    imageWrapper.querySelector(".comments-container").appendChild(comment);
    commentBox.value = "";
  }
}

function deleteLastComment(imageWrapper) {
  const commentsContainer = imageWrapper.querySelector(".comments-container");
  if (commentsContainer.lastChild) {
    commentsContainer.removeChild(commentsContainer.lastChild);
  }
}

function setupGalleryMenu() {
  const nav = document.getElementById("nav-menu");
  nav.innerHTML = `
        <select id="gallery-menu">
            <option value="" disabled selected>Select a Gallery</option>
        </select>
    `;
}
