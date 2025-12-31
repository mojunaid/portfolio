// ===============================================
// MAIN JAVASCRIPT - Portfolio Functionality
// ===============================================

// ===== Projects Data =====
const projectsData = [
  {
    id: 1,
    name: "AI Operating Systems Tutor",
    short: "An intelligent chatbot helping students master OS concepts through interactive learning",
    description: "Developed an AI-powered educational bot that breaks down complex operating systems concepts into digestible explanations. The bot uses conversational AI to adapt to different learning styles and provides real-time clarifications on topics like process management, memory allocation, and file systems.",
    problem: "Computer Science students often struggle with abstract OS concepts. Traditional textbooks and lectures don't always provide the interactive, personalized support needed for deep understanding.",
    features: [
      "Interactive Q&A on OS concepts",
      "Adaptive learning responses",
      "Code examples and visualizations",
      "Progress tracking",
      "24/7 availability for student queries"
    ],
    tech: ["JavaScript", "Claude API", "React", "Node.js", "LangChain", "FAISS"],
    learned: "Gained deep insights into prompt engineering and conversational AI design. Learned how to structure AI responses for educational effectiveness and handle edge cases in student queries.",
    emoji: "🤖",
    image: "assets/images/os-chatbot.png",
    link: null,
    category: "AI Development"
  },
  {
    id: 2,
    name: "Travel AI Agent",
    short: "Smart travel companion for personalized trip planning and recommendations",
    description: "Built an intelligent travel assistant that helps users plan trips by analyzing preferences, budget, and interests. The agent provides personalized recommendations for destinations, accommodations, and activities while considering real-time factors.",
    problem: "Trip planning is time-consuming and overwhelming with countless options. Travelers need personalized guidance that considers their unique preferences and constraints.",
    features: [
      "Personalized destination recommendations",
      "Budget optimization",
      "Itinerary generation",
      "Real-time travel insights",
      "Multi-destination planning"
    ],
    tech: ["JavaScript", "AI APIs", "Geolocation APIs", "React"],
    learned: "Explored AI agent architecture and learned to integrate multiple data sources. Developed skills in handling complex user inputs and generating contextual, actionable recommendations.",
    emoji: "✈️",
    image: "assets/images/visa-assistant.png",
    link: null,
    category: "AI Development"
  },
  {
    id: 3,
    name: "Database Management System with Render",
    short: "Full-stack database solution with cloud deployment",
    description: "Designed and deployed a comprehensive database management system showcasing CRUD operations, data relationships, and cloud hosting. The system demonstrates enterprise-level database practices with a focus on scalability and performance.",
    problem: "Learning database management requires hands-on experience with real deployment scenarios. Students need exposure to production-grade database hosting and management.",
    features: [
      "Complete CRUD operations",
      "Relational database design",
      "RESTful API integration",
      "Cloud deployment on Render",
      "Data validation and security"
    ],
    tech: ["PostgreSQL", "Node.js", "Express", "Render", "REST APIs"],
    learned: "Mastered database schema design, learned cloud deployment workflows, and gained experience with production database management. Understanding of backend architecture significantly improved.",
    emoji: "🗄️",
    image: "assets/images/database-render-1.jpg",
    link: null,
    category: "Backend Development"
  },
  {
    id: 4,
    name: "Nova Bank Web Application",
    short: "Modern banking interface with Next.js",
    description: "Contributed to a banking web application during my internship at Uridium Technologies. Built reusable components and implemented dynamic routing for the About Us and Contact Us sections, ensuring a seamless user experience.",
    problem: "The Nova Bank project needed a scalable, maintainable structure that could handle future feature additions while maintaining clean code organization.",
    features: [
      "Component-based architecture",
      "Dynamic routing with Next.js",
      "Responsive design",
      "SEO optimization",
      "Form validation and submission"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
    learned: "Gained professional development experience, learned to work within established codebases, and understood the importance of component reusability and documentation in team projects.",
    emoji: "🏦",
    image: "assets/images/nova-bank.jpg",
    link: null,
    category: "Frontend Development"
  }
];

// ===== State Management =====
let currentView = 'grid'; // 'grid' or 'detail'
let selectedProjectId = null;

// ===== DOM Elements =====
const progressBar = document.getElementById('progressBar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projectsGrid');
const projectDetail = document.getElementById('projectDetail');
const backToProjectsBtn = document.getElementById('backToProjects');
const projectDetailContent = document.getElementById('projectDetailContent');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollProgress();
  initSmoothScroll();
  renderProjects();
  initLucideIcons();
});

// ===== Navigation Functions =====
function initNavigation() {
  // Mobile menu toggle
  if (mobileMenuToggle) {
    const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
    const closeIcon = mobileMenuToggle.querySelector('.close-icon');

    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        mobileNav.classList.remove('active');
        const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
        const closeIcon = mobileMenuToggle.querySelector('.close-icon');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('menu-open');
      }
    });
  });

  // Active section tracking
  window.addEventListener('scroll', updateActiveSection);
}

function updateActiveSection() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  let currentSection = 'home';

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = sectionId;
      }
    }
  });

  // Update nav links
  navLinks.forEach(link => {
    const section = link.getAttribute('data-section');
    if (section === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== Scroll Progress Bar =====
function initScrollProgress() {
  window.addEventListener('scroll', updateProgressBar);
}

function updateProgressBar() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  if (progressBar) {
    progressBar.style.width = `${scrollPercentage}%`;
  }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  // Scroll to section buttons
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');
  scrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Nav link smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== Projects Rendering =====
function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projectsData.map(project => `
    <div class="project-card card-hover" data-project-id="${project.id}">
      <div class="project-emoji">${project.emoji}</div>
      <span class="project-category">${project.category}</span>
      <h3 class="project-name">${project.name}</h3>
      <p class="project-short">${project.short}</p>
      <div class="project-tech-tags">
        ${project.tech.slice(0, 3).map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('')}
      </div>
      <a href="#" class="project-link">
        View Case Study
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
      </a>
    </div>
  `).join('');

  // Add click handlers to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = parseInt(card.getAttribute('data-project-id'));
      showProjectDetail(projectId);
    });
  });
}

function showProjectDetail(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  selectedProjectId = projectId;
  currentView = 'detail';

  // Hide grid, show detail
  projectsGrid.style.display = 'none';
  projectDetail.classList.remove('hidden');

  // Render project detail
  projectDetailContent.innerHTML = `
    <div class="project-detail-card">
      <div class="project-emoji">${project.emoji}</div>
      <span class="project-category">${project.category}</span>
      <h2 class="project-detail-title gradient-text">${project.name}</h2>
      
      <div class="detail-section">
        <h3 class="detail-title">Overview</h3>
        <p class="detail-text">${project.description}</p>
      </div>

      <div class="detail-section">
        <h3 class="detail-title">Problem Statement</h3>
        <p class="detail-text">${project.problem}</p>
      </div>

      <div class="detail-section-with-image">
        <div class="detail-content">
          <div class="detail-section">
            <h3 class="detail-title">Key Features</h3>
            <ul class="detail-list">
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>

          <div class="detail-section">
            <h3 class="detail-title">Technologies Used</h3>
            <div class="skill-tags">
              ${project.tech.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
        
        <div class="detail-image">
          <img src="${project.image}" alt="${project.name} screenshot" />
        </div>
      </div>

      <div class="detail-section">
        <h3 class="detail-title">What I Learned</h3>
        <p class="detail-text">${project.learned}</p>
      </div>
    </div>
  `;

  // Scroll to top of projects section
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Reinitialize Lucide icons
  initLucideIcons();
}

function showProjectsGrid() {
  currentView = 'grid';
  selectedProjectId = null;

  // Show grid, hide detail
  projectsGrid.style.display = 'grid';
  projectDetail.classList.add('hidden');
}

// Back to projects button
if (backToProjectsBtn) {
  backToProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showProjectsGrid();
  });
}

// ===== Lucide Icons Initialization =====
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// ===== Utility Functions =====

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(updateProgressBar, 10));
window.addEventListener('scroll', debounce(updateActiveSection, 100));

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  // ESC key to close project detail
  if (e.key === 'Escape' && currentView === 'detail') {
    showProjectsGrid();
  }

  // Arrow keys for project navigation
  if (currentView === 'detail') {
    if (e.key === 'ArrowLeft') {
      navigateToPreviousProject();
    } else if (e.key === 'ArrowRight') {
      navigateToNextProject();
    }
  }
});

function navigateToPreviousProject() {
  const currentIndex = projectsData.findIndex(p => p.id === selectedProjectId);
  if (currentIndex > 0) {
    showProjectDetail(projectsData[currentIndex - 1].id);
  }
}

function navigateToNextProject() {
  const currentIndex = projectsData.findIndex(p => p.id === selectedProjectId);
  if (currentIndex < projectsData.length - 1) {
    showProjectDetail(projectsData[currentIndex + 1].id);
  }
}

// ===== Analytics (Optional) =====
function trackEvent(category, action, label) {
  // Add your analytics tracking here
  console.log('Event:', category, action, label);
}

// Track project views
function trackProjectView(projectName) {
  trackEvent('Projects', 'View', projectName);
}

// Track CTA clicks
const ctaButtons = document.querySelectorAll('.btn, .contact-card');
ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    const label = button.textContent.trim();
    trackEvent('CTA', 'Click', label);
  });
});

// ===== Performance Optimization =====
// Lazy load images if you add any
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Console Message =====
console.log('%c👩‍💻 Welcome to My Portfolio! ', 'background: #ec4899; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%cBuilt with ❤️ by Moyosore Junaid', 'color: #f472b6; font-size: 12px;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #9ca3af; font-size: 12px;');