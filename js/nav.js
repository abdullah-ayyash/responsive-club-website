// Sticky header state, mobile menu and active-section highlighting.
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  const links = new Map([...nav.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      links.get(entry.target.id)?.setAttribute("aria-current", "true");
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
})();
