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

function prepareText(element) {
  if (element.hasPrepared) return;

  element.hasPrepared = true;

  const chars = element.textContent.split("");
  element.textContent = "";
  chars.forEach((char) => {
    if (char === " ") {
      element.appendChild(document.createTextNode(" "));
    } else {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      element.appendChild(span);
    }
  });
}
function animateText(element) {
  const spans = element.querySelectorAll("span");

  gsap.from(spans, {
    y: 100,
    opacity: 0,
    stagger: 0.03,
    ease: "power2.out",
    duration: 0.6,
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
        animateText(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.7,
  }
);

document.querySelectorAll(".animation-text-two").forEach((element) => {
  prepareText(element);
  observer.observe(element);
});
