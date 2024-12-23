document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in-right");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element enters viewport -> Add .show
            entry.target.classList.add("show");
          } else {
            // Element leaves viewport -> Remove .show
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% is visible
      }
    );
  
    fadeInElements.forEach((el) => {
      observer.observe(el);
    });
  });


document.addEventListener("scroll", function() {
const navbar = document.querySelector(".navbar");

if (window.scrollY >= 400) {
    navbar.classList.add("show");
} else {
    navbar.classList.remove("show");
}
});

document.addEventListener("DOMContentLoaded", function() {
  // Select the footer with the slide-in-up class
  const footer = document.querySelector(".footer.slide-in-up");

  // Ensure we found the footer before observing
  if (footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the .show class to trigger animation
            footer.classList.add("show");
          } else {
            // Remove .show if you want it to hide again when scrolling away
            footer.classList.remove("show");
          }
        });
      },
      {
        // Trigger when 10% of the footer is visible
        threshold: 0.1,
      }
    );

    observer.observe(footer);
  }
});

