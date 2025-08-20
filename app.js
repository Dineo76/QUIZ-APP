var quiz = {
    // (A) PROPERTIES
    data: [
      {
        q: "What is the standard distance between the target and archer in Olympics?",
        o: ["50 meters", "70 meters", "100 meters", "120 meters"],
        a: 1 // arrays start with 0, so answer is "70 meters"
      },
      {
        q: "Which is the highest number on a standard roulette wheel?",
        o: ["22", "24", "32", "36"],
        a: 3
      },
      {
        q: "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
        o: ["400 pounds", "550 pounds", "700 pounds", "750 pounds"],
        a: 2
      },
      {
        q: "Which is the seventh planet from the sun?",
        o: ["Uranus", "Earth", "Pluto", "Mars"],
        a: 0
      },
      {
        q: "Which is the largest ocean on Earth?",
        o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        a: 3
      }
    ],
  
    // (A2) HTML ELEMENTS
    hWrap: null,
    hQn: null,
    hAns: null,
  
    // (A3) GAME FLAGS
    now: 0,
    score: 0,
  
    // (B) INIT QUIZ HTML
    init: () => {
      quiz.hWrap = document.getElementById("quizWrap");
  
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      quiz.draw();
    },
  
    // (C) DRAW QUESTION
    draw: () => {
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
  
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => quiz.select(label));
        quiz.hAns.appendChild(label);
      }
    },
  
    // (D) SELECT ANSWER
    select: (option) => {
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.replaceWith(label.cloneNode(true)); // removes events
      }
  
      let correct = option.dataset.idx == quiz.data[quiz.now].a;
      if (correct) {
        quiz.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
  
      quiz.now++;
      setTimeout(() => {
        if (quiz.now < quiz.data.length) {
          quiz.draw();
        } else {
          quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
          quiz.hAns.innerHTML = "";
        }
      }, 1000);
    },
  
    // (E) RESTART QUIZ
    reset: () => {
      quiz.now = 0;
      quiz.score = 0;
      quiz.draw();
    }
  };
  
  window.addEventListener("load", quiz.init);