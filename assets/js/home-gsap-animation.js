// document.addEventListener("DOMContentLoaded", () => {
//   const title = document.querySelector(".hero-section h1");
//   const chars = title.textContent.split("");
//   title.innerHTML = chars.map((char) => `<span>${char}</span>`).join("");

//   gsap.fromTo(
//     title.querySelectorAll("span"),
//     { opacity: 0, y: 50 },
//     {
//       opacity: 1,
//       y: 0,
//       stagger: 0.05,
//       duration: 0.6,
//       ease: "power3.out",
//     }
//   );
// });

// Select the h1 element
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
