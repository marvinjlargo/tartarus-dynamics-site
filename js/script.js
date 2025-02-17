// script.js

document.addEventListener("DOMContentLoaded", () => {
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  // Smooth scroll to SpacePar product section on button click
  learnMoreBtn.addEventListener("click", () => {
    const productSection = document.getElementById("spacepar");
    productSection.scrollIntoView({ behavior: "smooth" });
  });

  // Toggle mobile navigation menu
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });
});
