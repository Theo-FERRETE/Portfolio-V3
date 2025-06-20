const questions = [
  // Facile
  { question: "Qui chante 'Shape of You' ?", options: ["Ed Sheeran", "Justin Bieber", "Shawn Mendes", "Sam Smith"], answer: "Ed Sheeran" },
  { question: "Quel duo français a sorti 'One More Time' ?", options: ["Daft Punk", "Justice", "Air", "Phoenix"], answer: "Daft Punk" },
  { question: "Qui chante 'Bad Guy' ?", options: ["Billie Eilish", "Ariana Grande", "Dua Lipa", "Rihanna"], answer: "Billie Eilish" },
  { question: "Qui chante 'Blinding Lights' ?", options: ["The Weeknd", "Drake", "Post Malone", "Travis Scott"], answer: "The Weeknd" },
  { question: "Qui a interprété 'Rolling in the Deep' ?", options: ["Adele", "Sia", "Lorde", "Amy Winehouse"], answer: "Adele" },
  { question: "Qui chante 'Happy' ?", options: ["Pharrell Williams", "Bruno Mars", "Usher", "John Legend"], answer: "Pharrell Williams" },
  { question: "Qui chante 'Uptown Funk' ?", options: ["Mark Ronson & Bruno Mars", "Bruno Mars", "Justin Timberlake", "Pharrell Williams"], answer: "Mark Ronson & Bruno Mars" },
  { question: "Qui chante 'Someone Like You' ?", options: ["Adele", "Taylor Swift", "Lana Del Rey", "Billie Eilish"], answer: "Adele" },
  // Moyen
  { question: "Qui interprète 'Take Me To Church' ?", options: ["Hozier", "Sam Smith", "George Ezra", "James Bay"], answer: "Hozier" },
  { question: "Quel groupe chante 'Viva la Vida' ?", options: ["Coldplay", "Muse", "U2", "Imagine Dragons"], answer: "Coldplay" },
  { question: "Qui a sorti 'Can't Feel My Face' ?", options: ["The Weeknd", "Bruno Mars", "Drake", "Post Malone"], answer: "The Weeknd" },
  { question: "Qui chante 'Chandelier' ?", options: ["Sia", "Lorde", "Adele", "Lady Gaga"], answer: "Sia" },
  { question: "Qui chante 'Royals' ?", options: ["Lorde", "Adele", "Sia", "Katy Perry"], answer: "Lorde" },
  { question: "Qui chante 'Radioactive' ?", options: ["Imagine Dragons", "Muse", "Coldplay", "Linkin Park"], answer: "Imagine Dragons" },
  { question: "Qui chante 'Counting Stars' ?", options: ["OneRepublic", "Maroon 5", "Coldplay", "Imagine Dragons"], answer: "OneRepublic" },
  { question: "Qui chante 'Locked Out of Heaven' ?", options: ["Bruno Mars", "The Weeknd", "Justin Timberlake", "Usher"], answer: "Bruno Mars" },
  // Difficile
  { question: "Qui chante 'Breezeblocks' ?", options: ["alt-J", "Arctic Monkeys", "Foals", "Tame Impala"], answer: "alt-J" },
  { question: "Qui a remporté l'Eurovision 2019 ?", options: ["Duncan Laurence", "Netta", "Salvador Sobral", "Måneskin"], answer: "Duncan Laurence" },
  { question: "Quel rappeur a sorti l’album 'DAMN.' en 2017 ?", options: ["Kendrick Lamar", "J. Cole", "Travis Scott", "Drake"], answer: "Kendrick Lamar" },
  { question: "Qui chante 'Stolen Dance' ?", options: ["Milky Chance", "Kaleo", "Alt-J", "The Lumineers"], answer: "Milky Chance" },
  { question: "Qui chante 'Electric Feel' ?", options: ["MGMT", "Tame Impala", "Justice", "Phoenix"], answer: "MGMT" },
  { question: "Qui chante 'Do I Wanna Know?' ?", options: ["Arctic Monkeys", "The Strokes", "The Kooks", "Franz Ferdinand"], answer: "Arctic Monkeys" },
  { question: "Qui chante 'Instant Crush' ?", options: ["Daft Punk & Julian Casablancas", "Phoenix", "Justice", "MGMT"], answer: "Daft Punk & Julian Casablancas" },
  { question: "Qui chante 'Take Me Out' ?", options: ["Franz Ferdinand", "Arctic Monkeys", "Muse", "The Killers"], answer: "Franz Ferdinand" }
];

let score = 0;
let total = 0;
let currentQ = null;
let availableQuestions = [];

// Mélange le tableau
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function refillQuestions() {
  availableQuestions = shuffle([...questions]);
}

function getRandomQuestion() {
  if (availableQuestions.length === 0) refillQuestions();
  const idx = Math.floor(Math.random() * availableQuestions.length);
  const q = availableQuestions.splice(idx, 1)[0];
  return q;
}

function showQuestion() {
  currentQ = getRandomQuestion();
  document.getElementById("question").textContent = currentQ.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // Mélange les options à chaque question
  const shuffledOptions = shuffle([...currentQ.options]);

  if (currentQ.audio) {
    document.getElementById("audio").innerHTML = `<audio controls src="${currentQ.audio}"></audio>`;
  } else {
    document.getElementById("audio").innerHTML = "";
  }
  shuffledOptions.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "answer-btn";
    btn.onclick = () => checkAnswer(opt);
    answersDiv.appendChild(btn);
  });
  document.getElementById("next").style.display = "none";
  document.getElementById("score").style.display = "block";
  document.getElementById("score").innerHTML = `Score : <strong>${score} / ${total}</strong>`;
}


function checkAnswer(selected) {
  const answerBtns = document.querySelectorAll(".answer-btn");
  answerBtns.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === currentQ.answer) btn.style.background = "#28a745";
    if (btn.textContent === selected && selected !== currentQ.answer) btn.style.background = "#E63946";
  });
  if (selected === currentQ.answer) score++;
  total++;
  document.getElementById("next").style.display = "inline-block";
}

function nextQuestion() {
  showQuestion();
}

function restartQuiz() {
  score = 0;
  total = 0;
  refillQuestions();
  document.getElementById("quiz").style.display = "block";
  document.getElementById("restart").style.display = "none";
  showQuestion();
}

// Initialisation
document.getElementById("next").onclick = nextQuestion;
document.getElementById("restart").onclick = restartQuiz;
restartQuiz();
