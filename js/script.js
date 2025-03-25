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
  initializeLanguageToggle();
  addAriaLabels();
});

/**
 * Mobile Navigation Functionality
 * Handles the mobile menu toggle and accessibility
 */
function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const body = document.body;
  
  if (!menuToggle || !siteNav) return;

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu state
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    siteNav.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Update menu icon and ARIA label
    menuToggle.innerHTML = isExpanded ? '☰' : '✕';
    menuToggle.setAttribute('aria-label', isExpanded ? 'Open Navigation' : 'Close Navigation');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('active')) {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
      menuToggle.setAttribute('aria-label', 'Open Navigation');
      body.classList.remove('menu-open');
    }
  });

  // Close menu when clicking on a nav link
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
      menuToggle.setAttribute('aria-label', 'Open Navigation');
      body.classList.remove('menu-open');
    });
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
/**
 * Language Switching
 * Handles switching between English and Spanish versions of the site
 * with smooth transitions and visual feedback
 */
function initializeLanguageToggle() {
  const languageToggle = document.getElementById('languageToggle');
  const mainContent = document.querySelector('body');
  
  if (!languageToggle || !mainContent) return;

  // Add transition overlay to the body if it doesn't exist
  let transitionOverlay = document.getElementById('languageTransitionOverlay');
  if (!transitionOverlay) {
    transitionOverlay = document.createElement('div');
    transitionOverlay.id = 'languageTransitionOverlay';
    document.body.appendChild(transitionOverlay);
  }

  languageToggle.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Prevent double-clicks
    if (languageToggle.classList.contains('switching')) return;
    
    // Get current state
    const currentScroll = window.scrollY;
    const currentHash = window.location.hash;
    const currentPath = window.location.pathname;
    const isSpanish = currentPath.includes('index-es.html');
    
    // Store current state
    sessionStorage.setItem('scrollPosition', currentScroll);
    if (currentHash) {
      sessionStorage.setItem('activeSection', currentHash);
    }

    // Store active founder
    const activeFounder = document.querySelector('.tab-btn.active');
    if (activeFounder) {
      sessionStorage.setItem('activeFounder', activeFounder.getAttribute('data-founder'));
    }
    
    // Prepare target URL
    let targetUrl;
    if (isSpanish) {
      targetUrl = currentPath.replace('index-es.html', 'index.html');
    } else {
      targetUrl = currentPath.replace('index.html', 'index-es.html');
    }
    
    if (currentPath === '/' || currentPath === '') {
      targetUrl = isSpanish ? 'index.html' : 'index-es.html';
    }

    if (currentHash) {
      targetUrl += currentHash;
    }

    // Start button animation
    languageToggle.classList.add('switching');
    
    // Trigger a subtle scale effect on the page
    mainContent.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    mainContent.style.transform = 'scale(0.98)';
    
    // Start overlay transition
    transitionOverlay.style.display = 'block';
    await new Promise(resolve => requestAnimationFrame(resolve));
    transitionOverlay.classList.add('active');
    
    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate to new page
    window.location.href = targetUrl;
  });

  // Handle page load transitions
  window.addEventListener('load', async () => {
    const savedScroll = sessionStorage.getItem('scrollPosition');
    const savedSection = sessionStorage.getItem('activeSection');
    const savedFounder = sessionStorage.getItem('activeFounder');
    
    // Start with overlay and scale effect if coming from language switch
    if (savedScroll || savedSection || savedFounder) {
      transitionOverlay.style.display = 'block';
      transitionOverlay.classList.add('active');
      mainContent.style.transform = 'scale(0.98)';
    }

    // Restore active founder
    if (savedFounder) {
      const founderBtn = document.querySelector(`.tab-btn[data-founder="${savedFounder}"]`);
      const founderContent = document.getElementById(savedFounder);
      
      if (founderBtn && founderContent) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        founderBtn.classList.add('active');
        founderContent.classList.add('active');
      }
    }
    
    // Restore scroll position
    if (savedSection) {
      const targetElement = document.querySelector(savedSection);
      if (targetElement) {
        const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'instant'
        });
      }
    } else if (savedScroll) {
      window.scrollTo({
        top: parseInt(savedScroll),
        behavior: 'instant'
      });
    }

    // Smooth transition out
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Reset scale with animation
    mainContent.style.transform = 'scale(1)';
    transitionOverlay.classList.remove('active');
    
    // Final cleanup after animations
    await new Promise(resolve => setTimeout(resolve, 500));
    transitionOverlay.style.display = 'none';
    mainContent.style.transition = '';
    
    // Clear storage
    sessionStorage.removeItem('scrollPosition');
    sessionStorage.removeItem('activeSection');
    sessionStorage.removeItem('activeFounder');
  });
}

