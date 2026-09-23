const topics = {
  photosynthesis: {
    explanation: "Photosynthesis is the process by which green plants make food using sunlight, water, and carbon dioxide.",
    points: [
      "Plants use sunlight as energy.",
      "Roots absorb water from the soil.",
      "Leaves take in carbon dioxide.",
      "Plants make glucose as food.",
      "Oxygen is released."
    ],
    quizzes: [
      {
        question: "Which gas do plants take in during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon dioxide"
      },
      {
        question: "Where does photosynthesis mainly take place?",
        options: ["Roots", "Flowers", "Leaves", "Seeds"],
        answer: "Leaves"
      },
      {
        question: "What provides energy for photosynthesis?",
        options: ["Moonlight", "Sunlight", "Wind", "Soil"],
        answer: "Sunlight"
      },
      {
        question: "What gas is released during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: "Oxygen"
      },
      {
        question: "What do plants produce as food during photosynthesis?",
        options: ["Glucose", "Salt", "Protein", "Oxygen"],
        answer: "Glucose"
      }
    ]
  },

  gravity: {
    explanation: "Gravity is a force that attracts objects toward one another. Earth's gravity pulls objects toward the ground.",
    points: [
      "Gravity is a force of attraction.",
      "Earth's gravity pulls objects toward Earth.",
      "Gravity keeps us on the ground.",
      "Gravity affects planets and moons.",
      "Gravity causes objects to fall."
    ],
    quizzes: [
      {
        question: "What force pulls objects toward Earth?",
        options: ["Friction", "Magnetism", "Gravity", "Electricity"],
        answer: "Gravity"
      },
      {
        question: "Why does a ball fall when you drop it?",
        options: ["Wind", "Gravity", "Light", "Sound"],
        answer: "Gravity"
      },
      {
        question: "What keeps planets in orbit around the Sun?",
        options: ["Gravity", "Sound", "Friction", "Heat"],
        answer: "Gravity"
      },
      {
        question: "Which object has gravity?",
        options: ["Only Earth", "Only the Sun", "All objects with mass", "Only humans"],
        answer: "All objects with mass"
      },
      {
        question: "What happens to your weight on the Moon compared with Earth?",
        options: [
          "It becomes greater",
          "It becomes smaller",
          "It becomes zero",
          "It stays exactly the same"
        ],
        answer: "It becomes smaller"
      }
    ]
  },

  computer: {
    explanation: "A computer is an electronic machine that receives information, processes it, stores it, and produces useful results.",
    points: [
      "Input gives information to the computer.",
      "The CPU processes information.",
      "Memory stores information temporarily.",
      "Storage keeps information for later.",
      "Output shows results to the user."
    ],
    quizzes: [
      {
        question: "What is often called the brain of a computer?",
        options: ["Monitor", "Keyboard", "CPU", "Mouse"],
        answer: "CPU"
      },
      {
        question: "Which device is mainly used to type text?",
        options: ["Monitor", "Keyboard", "Speaker", "Printer"],
        answer: "Keyboard"
      },
      {
        question: "Which device displays information?",
        options: ["Monitor", "Mouse", "Keyboard", "Microphone"],
        answer: "Monitor"
      },
      {
        question: "Which device is used to move the pointer?",
        options: ["Printer", "Mouse", "Speaker", "Monitor"],
        answer: "Mouse"
      },
      {
        question: "Which part stores files for long-term use?",
        options: ["Storage", "Monitor", "Keyboard", "Speaker"],
        answer: "Storage"
      }
    ]
  }
};

let currentQuiz = 0;
let score = 0;
let currentQuizzes = [];

function teachTopic() {
  const input = document.getElementById("topicInput");
  const topic = input.value.trim().toLowerCase();

  if (topic === "") {
    alert("Please enter a topic first!");
    return;
  }

  const result = document.getElementById("result");
  result.classList.remove("hidden");

  document.getElementById("topicTitle").textContent =
    "📚 " + input.value;

  const data = topics[topic];

  if (!data) {
    document.getElementById("explanation").textContent =
      "I don't have a lesson for this topic yet. Try Photosynthesis, Gravity, or Computer.";

    document.getElementById("keyPoints").innerHTML =
      "<li>More topics will be added soon.</li>";

    document.getElementById("quizQuestion").textContent =
      "No quiz available for this topic yet.";

    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("quizResult").textContent = "";

    return;
  }

  document.getElementById("explanation").textContent =
    data.explanation;

  const pointsList = document.getElementById("keyPoints");
  pointsList.innerHTML = "";

  data.points.forEach(function(point) {
    const li = document.createElement("li");
    li.textContent = point;
    pointsList.appendChild(li);
  });

  currentQuizzes = data.quizzes;
  currentQuiz = 0;
  score = 0;

  showQuiz();

  result.scrollIntoView({
    behavior: "smooth"
  });
}

function showQuiz() {
  const quiz = currentQuizzes[currentQuiz];

  document.getElementById("quizQuestion").textContent =
    "Question " + (currentQuiz + 1) + " of " +
    currentQuizzes.length + ": " + quiz.question;

  const options = document.getElementById("quizOptions");
  options.innerHTML = "";

  document.getElementById("quizResult").textContent = "";

  quiz.options.forEach(function(option) {
    const button = document.createElement("button");

    button.textContent = option;
    button.className = "quiz-option";

    button.onclick = function() {
      checkAnswer(option, quiz.answer);
    };

    options.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  const result = document.getElementById("quizResult");
  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach(function(button) {
    button.disabled = true;
  });

  if (selected === correct) {
    score++;
    result.textContent = "✅ Correct! Great job!";
  } else {
    result.textContent =
      "❌ The correct answer is: " + correct;
  }

  setTimeout(function() {
    currentQuiz++;

    if (currentQuiz < currentQuizzes.length) {
      showQuiz();
    } else {
      showFinalScore();
    }
  }, 1200);
}

function showFinalScore() {
  document.getElementById("quizQuestion").textContent =
    "🎉 Quiz Complete!";

  document.getElementById("quizOptions").innerHTML = "";

  document.getElementById("quizResult").textContent =
    "You scored " + score + " out of " +
    currentQuizzes.length + "!";

  const restartButton = document.createElement("button");

  restartButton.textContent = "🔄 Try Again";
  restartButton.className = "quiz-option";

  restartButton.onclick = function() {
    currentQuiz = 0;
    score = 0;
    showQuiz();
  };

  document.getElementById("quizOptions").appendChild(restartButton);
}

document
  .getElementById("topicInput")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      teachTopic();
    }
  });
