// Animation ======================================================================================================================================================================

const text = document.querySelector(".animate-text");
const words = text.textContent.split(/(\s+)/);
text.textContent = "";

words.forEach((word) => {
  if (word.trim() === "") {
    text.appendChild(document.createTextNode(word));
  } else {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";

    const chars = word.split("");
    chars.forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.style.display = "inline-block";
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    text.appendChild(wordSpan);
  }
});

const charSpans = text.querySelectorAll("span span");

gsap.from(charSpans, {
  y: 100,
  opacity: 0,
  stagger: 0.03,
  ease: "power2.out",
  duration: 0.6,
});

// fade up animation ======================================================================================================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.2) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
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
// counter 150K ======================================================================================================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.querySelector(".counter");
  const target = parseInt(counterElement.getAttribute("data-target"));
  const duration = 2000; // Animation duration in ms
  const increment = target / (duration / 16); // Roughly 60fps

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          // When 70% visible
          animateCounter();
          observer.unobserve(entry.target); // Stop observing after triggering
        }
      });
    },
    {
      threshold: [0.7], // Trigger at 70% visibility
    }
  );

  observer.observe(counterElement);

  function animateCounter() {
    let current = 0;
    counterElement.classList.add("animated");

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
        counterElement.classList.remove("animated");
      }
      counterElement.textContent = Math.floor(current).toLocaleString() + " K";
    }, 16); // Roughly 60fps
  }
});

// partner scroll animation ======================================================================================================================================================================

const track = document.querySelector(".slider-track");
const images = Array.from(track.children);
const totalImages = images.length;

// Clone each image once
images.forEach((img) => {
  const clone = img.cloneNode(true);
  track.appendChild(clone);
});

// Wait for DOM paint to ensure scrollWidth is accurate
window.addEventListener("load", () => {
  const totalWidth = track.scrollWidth / 2; // Only original set

  gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });
});

const sliderContainer = document.querySelector(".slider-track-2");
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

// New Counter 250 here ======================================================================================================================================================================

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

// prevent to get list of menu
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// marquee code one
document.addEventListener("DOMContentLoaded", function () {
  // Calculate the width of one text element
  const textWidth = document.getElementById("marquee-text-1").offsetWidth;
  const marquee = document.querySelector(".inner-marquee-section");

  // Set the total width (same as before)
  marquee.style.width = `${textWidth * 2 + 50}px`;

  // Set INITIAL POSITION to the left (negative of one text width)
  gsap.set(".inner-marquee-section", { x: -textWidth - 50 });

  // Animate TO the right (positive movement)
  gsap.to(".inner-marquee-section", {
    x: 0, // Move right to original position
    duration: 20,
    ease: "none",
    repeat: -1, // Infinite repeat
  });
});

// marquee code tow
document.addEventListener("DOMContentLoaded", function () {
  // Calculate the width of one text element
  const textWidth = document.getElementById("scrolling-text-1").offsetWidth;

  // Set the total width of the scroller container to twice the text width
  document.querySelector(".scroller-container").style.width = `${
    textWidth * 2 + 50
  }px`;

  // GSAP animation
  gsap.to(".scroller-container", {
    x: -textWidth - 50, // Move left by the width of one text element plus padding
    duration: 20,
    ease: "none",
    repeat: -1, // Infinite repeat
  });
});
