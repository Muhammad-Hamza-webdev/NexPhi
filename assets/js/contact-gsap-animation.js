// New animation ======================================================================================================================================================================

function prepareText(element) {
  if (element.hasPrepared) return;
  element.hasPrepared = true;

  // Split by words (keeping spaces)
  const words = element.textContent.split(/(\s+)/);
  element.textContent = "";

  words.forEach((word) => {
    if (word.trim() === "") {
      // Handle multiple spaces
      element.appendChild(document.createTextNode(word));
    } else {
      // Create word container
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap"; // Prevent word breaking

      // Split word into characters
      const chars = word.split("");
      chars.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.style.display = "inline-block";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
    }
  });
}

function animateText(element) {
  // Get all character spans (nested inside word spans)
  const charSpans = element.querySelectorAll("span span");

  gsap.from(charSpans, {
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
  { threshold: 0.7 }
);

document.querySelectorAll(".animation-text-two").forEach((element) => {
  prepareText(element);
  observer.observe(element);
});
