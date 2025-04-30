// Animation ======================================================================================================================================================================

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

// counter code here ======================================================================================================================================================================

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
