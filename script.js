let questionNumber = 0;
let quizScore = 0;

function generateQuestion(question, answers) {
  const answersTemplate = answers
    .map((answer, index) => {
      return `<div class="js-radio-button">
  <input type="radio" class="radio-button" id="answer-${index}" name="answer" value="${answer}">
  <label for="answer-${index}">${answer}</label>
</div>`;
    })
    .join(" ");
  return `<form class="questionAnswerForm"><h2>${question}</h2>
  ${answersTemplate}</form>
  `;
}

function handleScore(questionAndAnswer, chosenAnswer) {
  if (questionAndAnswer.correctAnswer === chosenAnswer) {
    quizScore += 1;
    return true;
  }
  return false;
}

function startQuiz() {
  quizScore = 0;
  questionNumber = 0;
  $(".startButton").hide();
  renderQuestion(STORE[0]);
  renderSubmitButton();
  handleSubmitButton();
}

function renderQuestion(questionAndAnswer) {
  const spot = $(".quiz");
  const template = generateQuestion(
    questionAndAnswer.question,
    questionAndAnswer.answers
  );
  spot.html(template);
  updateQuestionCount();
}

function renderSubmitButton() {
  const spot = $(".questionAnswerForm");
  spot.append('<button id="submitButton" role="submit">submit</button>');
}

function renderRightAnswer() {
  const spot = $(".questionAnswerForm");
  spot.html(`Far out! You got it right.
  <button id="nextButton">next</button>`);
  const nextButton = $("#nextButton");
  nextButton.on("click", handleNextButton);
}

function renderWrongAnswer(questionAndAnswer) {
  const spot = $(".questionAnswerForm");
  spot.html(`What a drag, you got it wrong. Correct answer is ${questionAndAnswer.correctAnswer}
  <button id="nextButton">next</button>`);
  const nextButton = $("#nextButton");
  nextButton.on("click", handleNextButton);
}

function renderResults() {
  const spot = $(".quiz");
  spot.html(
    `results: you got ${quizScore}/10 <button id="restart">restart quiz</button>`
  );
  const restartButton = $("#restart");
  restartButton.on("click", startQuiz);
}

function handleNextButton() {
  questionNumber++;
  if (questionNumber === STORE.length) {
    renderResults();
  } else {
    renderQuestion(STORE[questionNumber]);
    renderSubmitButton();
    handleSubmitButton();
  }
}

function updateScore() {
  $(".score").text(quizScore);
}

function updateQuestionCount() {
  $(".questNum").html(`${questionNumber + 1}/10`);
}

function handleSubmitButton() {
  const form = $(".questionAnswerForm");
  form.on("submit", function(event) {
    event.preventDefault();
    const checkedValue = form.find("input[name='answer']:checked");
    let correct = handleScore(STORE[questionNumber], checkedValue.val());
    if (correct) {
      renderRightAnswer();
    } else {
      renderWrongAnswer(STORE[questionNumber]);
    }
    updateScore();
  });
}

$(() => {
  $(".startButton").click(function(event) {
    startQuiz();
  });
});
