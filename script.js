const startTimeMinutes = 1;
let time = startTimeMinutes * 60;

const countdownEl = document.getElementById('countdown-timer');

setInterval(startCountdown, 1000);

function startCountdown(){
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownEl.innerHTML = `${minutes}:${seconds}`;
  time--;
}

const startButton = document.getElementById('startBtn')
const questionBox = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerBtns')
const nextButton = document.getElementById('nextBtn')
const questions = [
    {
        question: 'Which of the following are true about JavaScript?',
        answers: [
            {text: 'It is only a server-side language', correct: false},
            {text: 'It is only a client-side language', correct: false},
            {text: 'It is neither a server-side or client-side language', correct: false},
            {text: 'It is both a server-side and client-side language', correct: true}
        ]
    },
    {
        question: 'What can you use JavaScript to do?',
        answers: [
            {text: 'You can use it to make web pages interactive', correct: true},
            {text: 'You can use it to make breakfast', correct: false},
            {text: 'You can put it in your coffee', correct: false},
            {text: 'You can use it to fuel your car', correct: false}
        ]
    },
    {
        question: 'With arrays in Javascript you can do the following:',
        answers: [
            {text: 'Store other arrays', correct: false},
            {text: 'Store strings and numbers', correct: false},
            {text: 'Store booleans', correct: false},
            {text: 'All of the above', correct: true}
        ]
    },
    {
        question: 'Which of the following are NOT a common data type in JavaScript?',
        answers: [
            {text: 'Booleans', correct: false},
            {text: 'Prompts', correct: true},
            {text: 'Strings', correct: false},
            {text: 'Numbers', correct: false}
        ]
    }
]

let randomQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    nextQuestion()
})

function startQuiz (){
    startButton.classList.add('hide')
    randomQuestions = questions.sort(() => Math.random()- .5)
    questionBox.classList.remove('hide')
    currentQuestionIndex = 0
    nextQuestion()

}

function nextQuestion(){
    resetQuestions()
    displayQuestion(randomQuestions[currentQuestionIndex])
}

function displayQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
      })
}

function resetQuestions() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('incorrect')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
  }
