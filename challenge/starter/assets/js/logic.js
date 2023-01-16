// Create a code quiz that contains the following requirements:
// A start button that when clicked a timer starts and the first question appears.
// Questions contain buttons for each answer.
// When answer is clicked, the next question appears
// If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.
// When the game ends, it should display their score and give the user the ability to save their initials and their score

// Prepare the questions in question.js file
var questions = localStorage.getItem('questions')
var score = 0;
var currentQuestion = 0;
var counter;
var timer;
var correct = new Audio('./assets/sfx/correct.wav');
var incorrect = new Audio('./assets/sfx/incorrect.wav');

// Prepare all selector that we might need to point to the html element
var startButton = document.querySelector('#start');
var startScreenElement = document.querySelector('#start-screen')

var questions = localStorage.getItem("questions")
questions = JSON.parse(questions)

var questionsContainer = document.querySelector("#questions")
var questionTitle = document.querySelector("#question-title")
var choicesContainer = document.querySelector("#choices")
var timerContainer = document.querySelector("#time")
var finalScore = document.getElementById('#final-score')
var initialInput = document.getElementById('#initials')
var submitContainer = document.getElementById("#submit")
// ....

function populateQuestion(question) {
    var question_val = question.title;
    var choices = question.choices;
    console.log(question)
    console.log(choices)

    choicesContainer.innerHTML = '';
    questionTitle.textContent = question_val;
    var choicesList = document.createElement('ul');
    for (let i = 0; i < choices.length; i++) {
        var choice = document.createElement('li');
        choice.textContent = choices[i];
        choicesList.appendChild(choice);
    }
     choicesContainer.appendChild(choicesList)
}

function endGame() {
    // When the game ends, it should display their score and give the user the ability to save their initials and their score
    finalScore.textContent = score
    // hide questions container
    // show endScreen container
    // assign score to finalScore container
    // reset the timer clearInterval(timer);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        populateQuestion(questions[currentQuestion]);
    } else {
        endGame();
    }
}

startButton.addEventListener('click', function() {
    startScreenElement.setAttribute('class', 'hide');
    questionsContainer.setAttribute('class', 'visible');

    // show the first question
    currentQuestion = 0;
    populateQuestion(questions[currentQuestion]);


    counter = 100;
    timer = setInterval(function() {
        counter--;
        // set timerContainer text to counter
        if (counter <= 0) {
            // endGame()
            clearInterval(timer);
        }
    }, 1000);
});

function saveHighscore(initial) {
    // get the current highscores value from localstorage
    // json parse current highscores from localstorage, this will be an array of object
    // push initial + score to the array
    // order the array from highest score to lowest
    // json stringify then save back to localstorage
}

// Another click event listener for choices
//    Check answer
//        if correct, add 1 to score, call nextQuestion()
//        if wrong, remove 10 seconds from the interval, call nextQuestion()
   
    var liElement = choicesContainer.children[0].children
    console.log(liElement)

    choicesContainer.addEventListener('click', function(event){
    for(var i = 0; i < liElement.length; i++)
    
    var answer = event.currentTarget
    var question = questions[currentQuestion]    


    var questionAnswer = question.answer
    console.log(questionAnswer)
        if (answer === questionAnswer && answer === liElement[i]) {
            score++;
            correct.play();
            nextQuestion()
        } else {
            score--;
            incorrect.play();
            nextQuestion();
        }
    })
// Click event listener to submit button
submitContainer.addEventListener('click', function(){
    var initial = initialInput.value.trim()
   saveHighscore(initial)
//    redirect to highscore page
})
   