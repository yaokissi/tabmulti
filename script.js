class Quiz {
    constructor() {
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.incorrectQuestions = []; // Tableau pour stocker les questions incorrectes
      this.questionElement = document.getElementById("question");
      this.optionsElement = document.getElementById("options");
      this.scoreElement = document.getElementById("score");
      this.checkButton = document.getElementById("check-button");
  
      this.checkButton.addEventListener("click", () => {
        this.checkAnswer();
      });
    }
  
    generateQuestions() {
      const tables = [2, 3, 4, 5, 6, 7, 8, 9];
      const totalQuestions = 10;
  
      while (this.questions.length < totalQuestions) {
        const randomTableIndex = Math.floor(Math.random() * tables.length);
        const table = tables[randomTableIndex];
        const randomNum = Math.floor(Math.random() * 10) + 1;
  
        const question = {
          num1: table,
          num2: randomNum,
          answer: table * randomNum
        };
  
        this.questions.push(question);
      }
    }
  
    displayQuestion() {
  const questionNumber = this.currentQuestionIndex + 1;
  const totalQuestions = this.questions.length;

  // Crée un élément span pour afficher le numéro de la question
  const questionNumberElement = document.createElement("span");
  questionNumberElement.textContent = `Question ${questionNumber} / ${totalQuestions}`;

  // Crée un élément br pour passer à la ligne
  const lineBreakElement = document.createElement("br");

  // Efface le contenu existant
  this.questionElement.innerHTML = "";

  // Ajoute le numéro de la question suivi d'un saut de ligne
  this.questionElement.appendChild(questionNumberElement);
  this.questionElement.appendChild(lineBreakElement);

  // Ajoute la question actuelle
  const questionText = document.createElement("span");
  const { num1, num2 } = this.questions[this.currentQuestionIndex];
  questionText.textContent = `${num1} x ${num2} = ?`;
  this.questionElement.appendChild(questionText);
}

  
    displayOptions() {
      this.optionsElement.innerHTML = "";
  
      const answer = this.questions[this.currentQuestionIndex].answer;
      const options = [answer];
      while (options.length < 3) {
        const randomNum = Math.floor(Math.random() * 81) + 1;
        if (!options.includes(randomNum)) {
          options.push(randomNum);
        }
      }
      options.sort(() => Math.random() - 0.5);
  
      options.forEach(option => {
        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = "answer";
        optionElement.value = option;
        this.optionsElement.appendChild(optionElement);
  
        const labelElement = document.createElement("label");
        labelElement.textContent = option;
        this.optionsElement.appendChild(labelElement);
  
        this.optionsElement.appendChild(document.createElement("br"));
      });
    }
  
    checkAnswer() {
      const selectedOption = document.querySelector("input[name='answer']:checked");
      if (selectedOption) {
        const userAnswer = parseInt(selectedOption.value);
        const correctAnswer = this.questions[this.currentQuestionIndex].answer;
  
        if (userAnswer === correctAnswer) {
          this.score++;
        } else {
          this.incorrectQuestions.push({
            question: this.questions[this.currentQuestionIndex],
            userAnswer: userAnswer,
            correctAnswer: correctAnswer
          });
        }
  
        this.currentQuestionIndex++;
  
        if (this.currentQuestionIndex < this.questions.length) {
          this.displayQuestion();
          this.displayOptions();
        } else {
          this.endQuiz();
        }
      }
    }
  
    endQuiz() {
      this.questionElement.style.display = "none";
      this.optionsElement.style.display = "none";
      this.checkButton.style.display = "none";
  
      // Affiche le score final avec le numéro de la question en cours
      this.scoreElement.textContent = `Votre score : ${this.score}/${this.questions.length} (${this.currentQuestionIndex} / ${this.questions.length})`;
      this.scoreElement.style.display = "block";
  
      if (this.incorrectQuestions.length > 0) {
        const incorrectQuestionsElement = document.getElementById("incorrect-questions");
  
        // Affiche les questions incorrectes
        this.incorrectQuestions.forEach((incorrectQuestion, index) => {
          const questionElement = document.createElement("p");
          const questionNumber = index + 1;
          const { num1, num2 } = incorrectQuestion.question;
          const { userAnswer, correctAnswer } = incorrectQuestion;
          questionElement.textContent = `Question ${questionNumber}: ${num1} x ${num2} = ${userAnswer} (Réponse correcte : ${correctAnswer})`;
          incorrectQuestionsElement.appendChild(questionElement);
        });
      }
    }
  
    startQuiz() {
      this.generateQuestions();
      this.displayQuestion();
      this.displayOptions();
    }
  }
  
  window.addEventListener("load", () => {
    const quiz = new Quiz();
    quiz.startQuiz();
  });
  