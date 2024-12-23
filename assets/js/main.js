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
