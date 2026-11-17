// Accessible photo lightbox built on the native <dialog> element.
(() => {
  const dialog = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  const cap = document.getElementById("lb-cap");
  const buttons = [...document.querySelectorAll("#gallery [data-full]")];
  let index = 0;

  function show(i) {
    index = (i + buttons.length) % buttons.length;
    const b = buttons[index];
    img.src = b.dataset.full;
    img.alt = b.dataset.alt;
    cap.textContent = `${b.dataset.alt} (${index + 1} of ${buttons.length})`;
  }

  buttons.forEach((b, i) => b.addEventListener("click", () => { show(i); dialog.showModal(); }));
  document.getElementById("lb-prev").addEventListener("click", () => show(index - 1));
  document.getElementById("lb-next").addEventListener("click", () => show(index + 1));
  document.getElementById("lb-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => e.target === dialog && dialog.close());
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
