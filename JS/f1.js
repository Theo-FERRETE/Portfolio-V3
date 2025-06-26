// Menu burger
document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const script = document.createElement('script');
  script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
  script.onload = () => AOS.init();
  document.body.appendChild(script);
});
