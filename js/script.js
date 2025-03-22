// script.js

document.addEventListener("DOMContentLoaded", () => {
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const body = document.body;

  // Smooth scroll to SpacePar product section on "Learn More" button click
  learnMoreBtn.addEventListener("click", () => {
    const productSection = document.getElementById("Ñutag");
    productSection.scrollIntoView({ behavior: "smooth" });
  });

  // Toggle mobile navigation menu with slide animation
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
    body.classList.toggle("menu-open");
    
    // Update ARIA attributes
    const isExpanded = siteNav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (siteNav.classList.contains('active') && 
        !siteNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      siteNav.classList.remove('active');
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        siteNav.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(element);
  });

  // Tab Navigation for Founders Section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const founder = button.getAttribute('data-founder');
      
      // Update active states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(founder)?.classList.add('active');
    });
  });

  // Handle keyboard navigation for tabs
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
      let targetButton = null;

      switch(e.key) {
        case 'ArrowLeft':
          targetButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
          break;
        case 'ArrowRight':
          targetButton = tabButtons[index + 1] || tabButtons[0];
          break;
      }

      if (targetButton) {
        e.preventDefault();
        targetButton.click();
        targetButton.focus();
      }
    });
  });

  // Add ARIA labels and roles
  const addAccessibilityAttributes = () => {
    // Navigation
    const nav = document.querySelector('nav');
    nav?.setAttribute('role', 'navigation');
    nav?.setAttribute('aria-label', 'Main navigation');

    // Tabs
    const tabList = document.querySelector('.tabs');
    tabList?.setAttribute('role', 'tablist');
    
    tabButtons.forEach(button => {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', button.classList.contains('active').toString());
    });

    tabContents.forEach(content => {
      content.setAttribute('role', 'tabpanel');
      content.setAttribute('aria-hidden', (!content.classList.contains('active')).toString());
    });
  };

  addAccessibilityAttributes();
});
