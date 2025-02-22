const quizData = {
    "1": [ // Level 1 Questions
        { question: "What is the capital of Nepal?", options: ["Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur"], answer: "Kathmandu" },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" }
    ],
    "2": [ // Level 2 Questions
        { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Hawking"], answer: "Newton" },
        { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" }
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
                <label>
                    <input type="radio" name="q${index}" value="${option}"> ${option}
                </label><br>
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
        const questionElements = document.querySelectorAll(`input[name="q${index}"]`);

        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
                selectedOption.parentElement.style.color = "green"; // ✅ Correct answer (Green)
                selectedOption.parentElement.innerHTML += " ✅";
            } else {
                selectedOption.parentElement.style.color = "red"; // ❌ Wrong answer (Red)
                selectedOption.parentElement.innerHTML += " ❌";

                // सही उत्तरलाई हरियो बनाउने
                questionElements.forEach(option => {
                    if (option.value === q.answer) {
                        option.parentElement.style.color = "green";
                        option.parentElement.innerHTML += " ✅ (Correct Answer)";
                    }
                });
            }
        }
    });

    resultContainer.innerHTML = `Your Score: ${score} / ${quizData[selectedLevel].length}`;
    saveScore(selectedLevel, score);
}

function saveScore(level, score) {
    localStorage.setItem(`quiz-score-level-${level}`, score);
}

submitButton.addEventListener('click', checkAnswers);
