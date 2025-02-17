// script.js

document.addEventListener("DOMContentLoaded", () => {
  const learnMoreBtn = document.getElementById("learnMoreBtn");

  learnMoreBtn.addEventListener("click", () => {
    // Scroll smoothly to the SpacePar product section
    const productSection = document.getElementById("spacepar");
    productSection.scrollIntoView({ behavior: "smooth" });
  });

  // Example of how you might handle a language switch in the future
  // const switchLanguageBtn = document.getElementById("switch-language");
  // switchLanguageBtn.addEventListener("click", () => {
  //   // Code to switch between English and Spanish
  // });
});
