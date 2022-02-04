const menuBtn = document.getElementById("menu-toggle");
const menuLinksContainer = document.getElementById("menu-links-container");
let menuIsOpen = false;

menuBtn.addEventListener("click", () => {
  if (menuIsOpen) {
    menuLinksContainer.style.display = "none";
    document.body.style.overflow = "auto";
  } else {
    menuLinksContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  menuIsOpen = !menuIsOpen;
});
