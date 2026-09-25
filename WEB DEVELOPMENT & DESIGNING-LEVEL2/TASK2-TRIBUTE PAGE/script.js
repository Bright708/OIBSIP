/**
 * Pan-African Historical Archive
 * Scroll Navigation Observer & Archival Utilities
 */

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // ScrollSpy for Header Navigation Links
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          updateActiveNavLink(currentId);
        }
      });
    },
    {
      rootMargin: "-20% 0px -60% 0px", // Trigger when section reaches top viewport
      threshold: 0.1,
    },
  );

  sections.forEach((section) => scrollObserver.observe(section));

  function updateActiveNavLink(id) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }

  // Smooth Scroll Behavior for Navigation Anchors
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
