// partner scroll animation ======================================================================================================================================================================

const sliderContainer = document.querySelector(".slider-track");
const logoItems = Array.from(sliderContainer.children);
const logoCount = logoItems.length;

// Clone each logo image once
logoItems.forEach((logo) => {
  const duplicatedLogo = logo.cloneNode(true);
  sliderContainer.appendChild(duplicatedLogo);
});

// Wait for DOM to load fully before calculating scroll width
window.addEventListener("load", () => {
  const originalTrackWidth = sliderContainer.scrollWidth / 2;

  gsap.to(sliderContainer, {
    x: `-=${originalTrackWidth}`,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((value) => parseFloat(value) % originalTrackWidth),
    },
  });
});

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

// New Counter 250======================================================================================================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const triggerScrollPercentage = 30;
  const animationDuration = 3000;

  const counterElements = document.querySelectorAll("[data-counter]");

  function animateCounter(element, target, prefix = "", suffix = "") {
    let start = 0;
    const increment = target / (animationDuration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent =
          prefix + Math.floor(start).toLocaleString() + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target.toLocaleString() + suffix;
      }
    };

    updateCounter();
  }

  function checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const pageHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollPosition / pageHeight) * 100;

    if (
      scrollPercent >= triggerScrollPercentage &&
      !document.body.classList.contains("counters-animated")
    ) {
      document.body.classList.add("counters-animated");

      counterElements.forEach((element) => {
        const rawValue = element.getAttribute("data-counter");
        const isCurrency = element.hasAttribute("data-currency");
        const suffix = element.getAttribute("data-suffix") || "";
        const prefix = isCurrency ? "$" : "";

        const target = parseFloat(rawValue.replace(/[^0-9.-]/g, ""));

        animateCounter(element, target, prefix, suffix);
      });

      window.removeEventListener("scroll", checkScroll);
    }
  }

  window.addEventListener("scroll", checkScroll);

  checkScroll();
});
