// Animation
const text = document.querySelector(".animate-text");
const chars = text.textContent.split("");
text.textContent = "";
chars.forEach((char) => {
  if (char === " ") {
    text.appendChild(document.createTextNode(" "));
  } else {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    text.appendChild(span);
  }
});
const spans = text.querySelectorAll("span");

gsap.from(spans, {
  y: 100,
  opacity: 0,
  stagger: 0.03,
  ease: "power2.out",
  duration: 0.6,
});
