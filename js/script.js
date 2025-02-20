// script.js

document.addEventListener("DOMContentLoaded", () => {
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  // Smooth scroll to SpacePar product section on "Learn More" button click
  learnMoreBtn.addEventListener("click", () => {
    const productSection = document.getElementById("Ñutag");
    productSection.scrollIntoView({ behavior: "smooth" });
  });

  // Toggle mobile navigation menu with slide animation
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
    // Switch icon between ☰ and ✕ for clarity
    menuToggle.textContent = siteNav.classList.contains("active") ? "✕" : "☰";
  });

  // Close mobile menu after clicking any navigation link
  // and revert the toggle icon back to "☰"
  const navLinks = siteNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (siteNav.classList.contains("active")) {
        siteNav.classList.remove("active");
        menuToggle.textContent = "☰";
      }
    });
  });
});
