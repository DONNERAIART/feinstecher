import "../styles/main.css";
import { initVideoScroll } from "./video-scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  initVideoScroll();

  // Mobile Menu Logic
  const menuBtn = document.querySelector(".md\\:hidden");
  const navLinks = document.querySelector(".md\\:flex");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      // Toggle logic for mobile menu (to be implemented with better UI)
      console.log("Mobile menu toggled");
    });
  }
});
