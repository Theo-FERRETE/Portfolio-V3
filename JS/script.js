// Animation texte type machine à écrire
const words = [
  "Développeur Web",
  "Passionné de Tech",
  "Créatif",
  "Sérieux",
];
let i = 0, j = 0, isDeleting = false, txt = '', speed = 120;
function type() {
  const typed = document.querySelector('.typed');
  if (!typed) return;
  if (i < words.length) {
    if (!isDeleting && j <= words[i].length) {
      txt = words[i].slice(0, j++);
      typed.textContent = txt;
      setTimeout(type, speed);
    } else if (isDeleting && j >= 0) {
      txt = words[i].slice(0, j--);
      typed.textContent = txt;
      setTimeout(type, speed / 2);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        i = (i + 1) % words.length;
      }
      setTimeout(type, 800);
    }
  }
}
type();

// Dark mode toggle
document.querySelector('.toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
