const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// 1️ Click event: Toggles the menu
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    menuBtnIcon.className = "ri-close-line";
  } else {
    menuBtnIcon.className = "ri-menu-line";
  }
});

// 2️ Click outside event: Closes the menu when clicking anywhere outside
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("open");
    menuBtnIcon.className = "ri-menu-line";
  }
});

// 3️ Keydown event: Closes menu when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navLinks.classList.remove("open");
    menuBtnIcon.className = "ri-menu-line";
  }
});
