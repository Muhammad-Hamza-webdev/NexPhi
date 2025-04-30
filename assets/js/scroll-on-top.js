const scrollButton = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const triggerPoint = window.innerHeight * 0.2;

  if (scrollY > triggerPoint) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});
