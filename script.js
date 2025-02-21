const quizData = {
    "1": [ // Level 1 Questions
        { question: "What is the capital of Nepal?", options: ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur"], answer: "Kathmandu" },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "Who wrote 'Muna Madan'?", options: ["Devkota", "Bhanu Bhakta", "Krishna Shah", "Laxmi Pd. Devkota"], answer: "Laxmi Pd. Devkota" },
        { question: "Which planet is closest to the Sun?", options: ["Mars", "Venus", "Mercury", "Earth"], answer: "Mercury" },
        { question: "Which gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" }
    ],
    "2": [ // Level 2 Questions
        { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Hawking"], answer: "Newton" },
        { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" },
        { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: "8" },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "120°C", "80°C"], answer: "100°C" },
        { question: "Which country has the most population?", options: ["USA", "India", "China", "Russia"], answer: "China" }
    ]
};

let timer;
let timeLeft = 30;

const levelSelect = document.getElementById('level-select');
const startButton = document.getElementById('start-quiz');
const quizSection = document.getElementById('quiz-section');
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', () => {
    const selectedLevel = levelSelect.value;
    loadQuiz(selectedLevel);
});

function loadQuiz(level) {
    quizSection.style.display = "block";
    quizContainer.innerHTML = "";
    timeLeft = 30;
    startTimer();

    quizData[level].forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

        q.options.forEach(option => {
            questionDiv.innerHTML += `
                <input type="radio" name="q${index}" value="${option}"> ${option}<br>
            `;
        });

        quizContainer.appendChild(questionDiv);
    });
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswers();
        }
    }, 1000);
}

function checkAnswers() {
    clearInterval(timer);
    let score = 0;
    const selectedLevel = levelSelect.value;

    quizData[selectedLevel].forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    resultContainer.innerHTML = `Your Score: ${score} / ${quizData[selectedLevel].length}`;
    saveScore(selectedLevel, score);
}

function saveScore(level, score) {
    localStorage.setItem(`quiz-score-level-${level}`, score);
}

submitButton.addEventListener('click', checkAnswers);
