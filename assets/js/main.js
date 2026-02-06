(function () {
  // year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // scroll to top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      scrollBtn.style.display = (window.scrollY > 200) ? 'block' : 'none';
    };
    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn();
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // sidebar mobile nav
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navSidebar = document.getElementById('navSidebar');
  const navSidebarBg = document.getElementById('navSidebarBg');
  const navSidebarClose = document.getElementById('navSidebarClose');
  const navSidebarLinks = navSidebar ? navSidebar.querySelectorAll('.nav__link') : [];
  let lastFocused = null;
  function openSidebar() {
    lastFocused = document.activeElement;
    navSidebar.classList.add('active');
    navSidebarBg.classList.add('active');
    document.body.classList.add('menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navSidebar.setAttribute('aria-hidden', 'false');
    if (navSidebarLinks.length) {
      setTimeout(() => navSidebarLinks[0].focus(), 0);
    }
  }
  function closeSidebar() {
    navSidebar.classList.remove('active');
    navSidebarBg.classList.remove('active');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navSidebar.setAttribute('aria-hidden', 'true');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }
  if (navToggle && navSidebar && navSidebarBg && navSidebarClose) {
    navToggle.setAttribute('aria-controls', 'navSidebar');
    navSidebar.setAttribute('aria-hidden', 'true');
    navToggle.addEventListener('click', openSidebar);
    navSidebarClose.addEventListener('click', closeSidebar);
    navSidebarBg.addEventListener('click', closeSidebar);
    navSidebar.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navSidebar.classList.contains('active')) {
        closeSidebar();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeSidebar();
    });
  }

  // reveal animations
  const items = document.querySelectorAll(".fadeUp");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
})();
