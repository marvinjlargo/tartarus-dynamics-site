/**
 * Tartarus Dynamics Website JavaScript
 * Author: Tartarus Dynamics Team
 * Version: 1.0.0
 * Description: Handles all interactive functionality for the Tartarus Dynamics website
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeTabNavigation();
  initializeSmoothScroll();
  initializeFadeInAnimations();
});

/**
 * Mobile Navigation Functionality
 * Handles the mobile menu toggle and accessibility
 */
function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  
  // Toggle mobile menu
  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('active');
    
    // Update ARIA attributes
    if (!isExpanded) {
      menuToggle.setAttribute('aria-label', 'Close Navigation');
    } else {
      menuToggle.setAttribute('aria-label', 'Open Navigation');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open Navigation');
    }
  });
}

/**
 * Founders Tab Navigation
 * Handles the interactive tabs in the founders section
 */
function initializeTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetId = button.getAttribute('data-founder');
      document.getElementById(targetId)?.classList.add('active');
    });

    // Add keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}

/**
 * Smooth Scrolling
 * Enables smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, '', targetId);
      }
    });
  });
}

/**
 * Fade-In Animations
 * Handles the fade-in animations for sections as they become visible
 */
function initializeFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slight offset for better timing
  });

  // Start observing fade-in elements
  fadeElements.forEach(element => observer.observe(element));
}

/**
 * Add ARIA Labels
 * Enhances accessibility by adding ARIA labels to interactive elements
 */
function addAriaLabels() {
  // Add ARIA labels to navigation
  const nav = document.getElementById('siteNav');
  nav?.setAttribute('aria-label', 'Main navigation');

  // Add ARIA labels to sections
  document.querySelectorAll('section').forEach(section => {
    const headingText = section.querySelector('h2')?.textContent;
    if (headingText) {
      section.setAttribute('aria-label', headingText);
    }
  });

  // Add ARIA labels to tabs
  const tabList = document.querySelector('.tabs');
  tabList?.setAttribute('role', 'tablist');
  
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', tab.classList.contains('active'));
  });
}
