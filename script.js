// TIMER
const timer = document.querySelector('.timer-text');
let sec = 0;
let min = 0;

const intervalId = setInterval(() => {
    sec++;

    if (sec === 60) {
        sec = 0;
        min++;
    }

    let mm = min < 10 ? "0" + min : min;
    let ss = sec < 10 ? "0" + sec : sec;

    timer.textContent = `${mm}:${ss}`;
}, 1000);

// QUESTIONS DATA (ANSWER KEY INCLUDED)
const jsMCQs = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "float"],
        answer: "var"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: "//"
    },
    {
        question: "Which data type is NOT supported by JavaScript?",
        options: ["Number", "Boolean", "Character", "String"],
        answer: "Character"
    },
    {
        question: "Which method prints data in the console?",
        options: ["print()", "log()", "console.log()", "display()"],
        answer: "console.log()"
    },
    {
        question: "Which operator compares both value and type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question: "What will `typeof null` return?",
        options: ["null", "object", "undefined", "number"],
        answer: "object"
    },
    {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for", "while", "do...while", "foreach"],
        answer: "do...while"
    },
    {
        question: "Which function converts JSON to a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
        answer: "JSON.parse()"
    },
    {
        question: "Which keyword is used to define a function?",
        options: ["function", "def", "method", "func"],
        answer: "function"
    },
    {
        question: "Which array method adds an element at the end?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Which method removes the last element of an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        answer: "pop()"
    },
    {
        question: "Which keyword is used to declare a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which event occurs when a button is clicked?",
        options: ["onhover", "onload", "onclick", "onchange"],
        answer: "onclick"
    },
    {
        question: "Which method selects an element by ID?",
        options: ["querySelector()", "getElementById()", "getElementsByClassName()", "getElementsByTagName()"],
        answer: "getElementById()"
    },
    {
        question: "Which operator is used for logical AND?",
        options: ["&", "&&", "|", "||"],
        answer: "&&"
    },
    {
        question: "Which JavaScript feature allows a function to access variables outside it?",
        options: ["Scope", "Closure", "Hoisting", "Callback"],
        answer: "Closure"
    },
    {
        question: "Which keyword stops a loop?",
        options: ["stop", "exit", "break", "continue"],
        answer: "break"
    },
    {
        question: "Which method converts a JavaScript object to JSON?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
        answer: "JSON.stringify()"
    },
    {
        question: "Which symbol is used for strict NOT equal?",
        options: ["!=", "!==", "==", "="],
        answer: "!=="
    },
    {
        question: "Which statement is used to handle exceptions?",
        options: ["catch", "throw", "try...catch", "error"],
        answer: "try...catch"
    }
];


// ELEMENT SELECTION
const quesList = document.querySelector('.timeline');
const displayQue = document.querySelector('.questions');
const displayOptions = document.querySelector('.options');

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const submitBtn = document.querySelector('.submit');

const quiz = document.querySelector('.exam-shell');
const submitText = document.querySelector('.submitted h2');

// VARIABLES
let currentQuestion = 0;
const userAnswers = new Array(jsMCQs.length).fill(null);

// GENERATE LEFT QUESTION BUTTONS
jsMCQs.forEach((_, index) => {
    const step = document.createElement('div');
    step.classList.add('step');
    if (index === 0) step.classList.add('active');
    step.innerText = index + 1;

    step.addEventListener('click', () => {
        currentQuestion = index;
        loadQuestion(index);
    });

    quesList.appendChild(step);
});

// LOAD QUESTION FUNCTION
function loadQuestion(index) {
    displayQue.innerHTML = `<li>${jsMCQs[index].question}</li>`;
    displayOptions.innerHTML = "";

    jsMCQs[index].options.forEach(option => {
        const li = document.createElement('li');
        li.classList.add('answer');
        li.innerText = option;

        if (userAnswers[index] === option) {
            li.classList.add('selected');
        }

        li.addEventListener('click', () => {
            document.querySelectorAll('.answer').forEach(ans => {
                ans.classList.remove('selected');
            });

            li.classList.add('selected');
            userAnswers[index] = option;
        });

        displayOptions.appendChild(li);
    });

    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.step')[index].classList.add('active');
}

// NEXT & PREVIOUS
nextBtn.addEventListener('click', () => {
    if (currentQuestion < jsMCQs.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});

// SUBMIT & SCORE
submitBtn.addEventListener('click', () => {
    clearInterval(intervalId);

    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === jsMCQs[i].answer) {
            score++;
        }
    });

    quiz.style.display = "none";
    submitText.style.display = "block";
    submitText.innerHTML = `
        Exam Completed 🎉<br>
        Score: ${score} / ${jsMCQs.length}
    `;
});

// INITIAL LOAD
loadQuestion(0);
