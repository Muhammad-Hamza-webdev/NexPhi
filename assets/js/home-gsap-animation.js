document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".hero-section h1");
  const chars = title.textContent.split("");
  title.innerHTML = chars.map((char) => `<span>${char}</span>`).join("");

  gsap.fromTo(
    title.querySelectorAll("span"),
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out",
    }
  );
});
