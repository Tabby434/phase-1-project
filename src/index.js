document.addEventListener("DOMContentLoaded", () => {
  fetchGalleries();
  document.getElementById("back-button").addEventListener("click", goBack);
  document
    .getElementById("home-button")
    .addEventListener("click", showCoverPage);

  const bookSession = document.getElementById("book-session");
  if (bookSession) {
    bookSession.addEventListener("click", () => {
      alert("Call us at +254 712 345 678 or +254 787 654 321 to book your session!");
    });
  }

  setupGalleryMenu();
});

function showCoverPage() {
  document.getElementById("gallery-list").classList.add("hidden");
  document.getElementById("gallery-detail").classList.add("hidden");
  document.getElementById("cover-page").classList.remove("hidden");
  document.getElementById("cover-page").innerHTML =
    "<h1 class='old-english'>Through the Shutter</h1>";
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
      galleryElement.classList.add("gallery-item", "centered-gallery");
      galleryElement.innerHTML = `<h3>${gallery.name}</h3>`;
      galleryElement.addEventListener("click", () => showGallery(gallery));
      container.appendChild(galleryElement);
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

    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.innerHTML = "🤍 0";
    heart.dataset.likes = 0;
    heart.addEventListener("click", () => likeImage(heart));

    const commentBox = document.createElement("input");
    commentBox.type = "text";
    commentBox.placeholder = "Add a comment...";

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

    const commentControls = document.createElement("div");
    commentControls.appendChild(submitComment);
    commentControls.appendChild(deleteComment);

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(heart);
    imgWrapper.appendChild(commentBox);
    imgWrapper.appendChild(commentControls);
    imgWrapper.appendChild(commentsContainer);
    imagesContainer.appendChild(imgWrapper);
  });
}

function likeImage(heart) {
  let likes = parseInt(heart.dataset.likes, 10);
  likes++;
  heart.dataset.likes = likes;
  heart.innerHTML = likes > 0 ? `❤️ ${likes}` : "🤍 0";
}

function addComment(imgWrapper, commentBox) {
  if (commentBox.value.trim() !== "") {
    const comment = document.createElement("p");
    comment.textContent = commentBox.value;
    imgWrapper.querySelector(".comments-container").appendChild(comment);
    commentBox.value = "";
  }
}

function deleteLastComment(imgWrapper) {
  const commentsContainer = imgWrapper.querySelector(".comments-container");
  if (commentsContainer.lastChild) {
    commentsContainer.removeChild(commentsContainer.lastChild);
  }
}
