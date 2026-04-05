/*  immage slider */
function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".s-dot");
  if (!slides.length) return;
  let cur = 0,
    timer;

  // go to slide n
  function go(n) {
    slides[cur].classList.remove("active");
    dots[cur] && dots[cur].classList.remove("active");
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add("active");
    dots[cur] && dots[cur].classList.add("active");
  }

  // auto go to next slide every 4.5s
  function start() {
    timer = setInterval(() => go(cur + 1), 4500);
  }

  // reset timer when user clicks prev/next/dot
  function reset() {
    clearInterval(timer);
    start();
  }

  // initialization
  go(0);
  start();
  // event listeners for prev/next buttons and dots
  document.querySelector(".s-btn.prev")?.addEventListener("click", () => {
    go(cur - 1);
    reset();
  });
  document.querySelector(".s-btn.next")?.addEventListener("click", () => {
    go(cur + 1);
    reset();
  });
  // add click event to dots
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      go(i);
      reset();
    }),
  );
}

async function loadHeader() {
  const res = await fetch("/header.html");
  const html = await res.text();
  document.getElementById("header-placeholder").outerHTML = html;

  // Highlight the active nav link
  const links = document.querySelectorAll(".nav-menu a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}

async function loadFooter() {
  const res = await fetch("/footer.html");
  const html = await res.text();
  document.getElementById("footer-placeholder").outerHTML = html;
}

loadHeader();
loadFooter();

/*  init all  */
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
});
