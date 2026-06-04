document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const typingText = document.getElementById('typingText');
  const cursorGlow = document.querySelector('.cursor-glow');

  let savedTheme = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i><span>Light</span>';
    } else {
      document.body.classList.remove('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i><span>Dark</span>';
    }

    localStorage.setItem('theme', theme);
  }

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });

  const words = [
    'modern websites.',
    'clean user interfaces.',
    'student projects.',
    'future-ready skills.'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    typingText.textContent = isDeleting
      ? currentWord.substring(0, charIndex - 1)
      : currentWord.substring(0, charIndex + 1);

    charIndex += isDeleting ? -1 : 1;

    let speed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1300;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 250;
    }

    setTimeout(typeEffect, speed);
  }

  if (typingText) {
    typeEffect();
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

  if (cursorGlow) {
    window.addEventListener('mousemove', event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }
});
