/* ═══════════════════════════════════════════════
   NAVIGATION — shrink on scroll
═══════════════════════════════════════════════ */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }
})();


/* ═══════════════════════════════════════════════
   TYPEWRITER EFFECT
═══════════════════════════════════════════════ */
(function () {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const words = ['Robotics', 'Machine Learning', 'Distributed Systems', 'Embedded Systems', 'Neural Networks', 'Backend Architecture', 'Computer Vision'];
  let wIndex = 0;
  let cIndex = 0;
  let deleting = false;
  let pause = false;

  function type() {
    const word = words[wIndex];

    if (pause) {
      pause = false;
      setTimeout(type, 1200);
      return;
    }

    if (!deleting) {
      el.textContent = word.slice(0, cIndex + 1);
      cIndex++;
      if (cIndex === word.length) {
        deleting = true;
        pause = true;
        setTimeout(type, 80);
      } else {
        setTimeout(type, 80);
      }
    } else {
      el.textContent = word.slice(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, 45);
      }
    }
  }

  setTimeout(type, 800);
})();


/* ═══════════════════════════════════════════════
   HERO CANVAS — subtle dot grid
═══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const ACCENT = '#00aaff';
  const SPACING = 36;
  const BASE_RADIUS = 1;
  const HOVER_RADIUS = 3.5;
  const HOVER_DIST = 120;

  let W, H, dots;
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: c * SPACING, y: r * SPACING });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const d of dots) {
      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, 1 - dist / HOVER_DIST);
      const r = BASE_RADIUS + t * (HOVER_RADIUS - BASE_RADIUS);
      const alpha = 0.12 + t * 0.55;

      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  canvas.closest('.hero').addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.closest('.hero').addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  draw();
})();


/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger cards in the grid
        const card = entry.target;
        const delay = card.dataset.index ? card.dataset.index * 60 : 0;
        setTimeout(() => card.classList.add('visible'), delay);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el, i) => {
    if (el.closest('.projects-grid')) {
      el.dataset.index = i;
    }
    observer.observe(el);
  });
})();


/* ═══════════════════════════════════════════════
   PROJECT FILTER
═══════════════════════════════════════════════ */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        // Re-trigger reveal animation for newly shown cards
        if (match) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        }
      });
    });
  });
})();
