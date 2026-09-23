const topics = {
  photosynthesis: {
    explanation:
      "Photosynthesis is the process by which green plants make their own food using sunlight, water, and carbon dioxide. It mainly happens in the leaves.",
    points: [
      "Plants use sunlight as energy.",
      "Roots absorb water from the soil.",
      "Leaves take in carbon dioxide from the air.",
      "Plants produce glucose as food.",
      "Oxygen is released into the air."
    ],
    question: "Which gas do plants take in during photosynthesis?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon dioxide"
  },

  gravity: {
    explanation:
      "Gravity is a force that attracts objects toward one another. On Earth, gravity pulls objects toward the ground, which is why things fall when dropped.",
    points: [
      "Gravity is a force of attraction.",
      "Earth's gravity pulls objects toward Earth.",
      "Gravity keeps us on the ground.",
      "Gravity also keeps planets in orbit."
    ],
    question: "What force pulls objects toward Earth?",
    options: ["Friction", "Magnetism", "Gravity", "Electricity"],
    answer: "Gravity"
  },

  computer: {
    explanation:
      "A computer is an electronic machine that receives information, processes it, stores it, and produces useful results.",
    points: [
      "Input gives information to the computer.",
      "The CPU processes information.",
      "Memory and storage keep information.",
      "Output shows the result to the user."
    ],
    question: "What is often called the brain of a computer?",
    options: ["Monitor", "Keyboard", "CPU", "Mouse"],
    answer: "CPU"
  }
};

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

  if (data) {
    document.getElementById("explanation").textContent =
      data.explanation;

    const pointsList = document.getElementById("keyPoints");
    pointsList.innerHTML = "";

    data.points.forEach(function(point) {
      const li = document.createElement("li");
      li.textContent = point;
      pointsList.appendChild(li);
    });

    document.getElementById("quizQuestion").textContent =
      data.question;

    const options = document.getElementById("quizOptions");
    options.innerHTML = "";

    data.options.forEach(function(option) {
      const button = document.createElement("button");

      button.textContent = option;
      button.className = "quiz-option";

      button.onclick = function() {
        checkAnswer(option, data.answer);
      };

      options.appendChild(button);
    });

    document.getElementById("quizResult").textContent = "";

  } else {
    document.getElementById("explanation").textContent =
      "I don't have a lesson for this topic yet. Try Photosynthesis, Gravity, or Computer.";

    document.getElementById("keyPoints").innerHTML =
      "<li>More topics will be added soon.</li>";

    document.getElementById("quizQuestion").textContent =
      "No quiz available for this topic yet.";

    document.getElementById("quizOptions").innerHTML = "";
    document.getElementById("quizResult").textContent = "";
  }

  result.scrollIntoView({
    behavior: "smooth"
  });
}

function checkAnswer(selected, correct) {
  const result = document.getElementById("quizResult");

  if (selected === correct) {
    result.textContent = "✅ Correct! Great job!";
  } else {
    result.textContent = "❌ Not quite. Try again!";
  }
}

document
  .getElementById("topicInput")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      teachTopic();
    }
  });
