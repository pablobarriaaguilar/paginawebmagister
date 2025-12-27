// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  mobileNav.classList.toggle('active', isMenuOpen);
  menuIcon.style.display = isMenuOpen ? 'none' : 'block';
  closeIcon.style.display = isMenuOpen ? 'block' : 'none';
});

// Close mobile menu when clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    mobileNav.classList.remove('active');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = 'Enviando...';
  submitBtn.disabled = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Show toast
  showToast('Mensaje enviado', 'Gracias por contactarme. Te responderé pronto.');
  
  // Reset form
  contactForm.reset();
  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
});

// Toast notification
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = toast.querySelector('.toast-title');
  const toastMessage = toast.querySelector('.toast-message');
  
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill cards with staggered delay
document.querySelectorAll('.skill-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.05}s`;
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});

// Observe cards with staggered delay
document.querySelectorAll('.card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});
