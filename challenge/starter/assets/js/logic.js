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
var correct = new Audio('challenge/starter/assets/sfx/correct.wav');
var incorrect = new Audio('challenge/starter/assets/sfx/incorrect.wav');

// Prepare all selector that we might need to point to the html element
var startButton = document.querySelector('#start');
var startScreenElement = document.querySelector('#start-screen')

var questions = localStorage.getItem("questions")
questions = JSON.parse(questions)

var questionsContainer = document.querySelector("#questions")
var questionTitle = document.querySelector("#question-title")
var choicesContainer = document.querySelector("#choices")
var timerContainer = document.querySelector("#time")
var finalScore = document.getElementById('final-score')
var initialInput = document.getElementById('initials')
var submitContainer = document.getElementById("submit")

var endScreenContainer = document.getElementById('end-screen')

var highScore = []



// ....

function populateQuestion(question) {
    var question_val = question.title;
    var choices = question.choices;

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
    
    // hide questions container
    questionsContainer.setAttribute('class', 'hide');
    // show endScreen container
    endScreenContainer.setAttribute('class', 'visible')
    // assign score to finalScore container
    finalScore.textContent = score
    // reset the timer clearInterval(timer);
    clearInterval(timer)
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
        timerContainer.textContent = counter
        if (counter <= 0) {
            endGame()
            clearInterval(timer);
        }
    }, 1000);
});

function saveHighscore(initial) {
    // get the current highscores value from localstorage
    highScore = localStorage.getItem("highScore")
    

    if(highScore === null){
        highScore = []
        highScore.push({initials: initial, scores: score })
        highScore = JSON.stringify(highScore)
        localStorage.setItem("highScore", highScore)
    }
    else{
    highScore = localStorage.getItem("highScore")
    // json parse current highscores from localstorage, this will be an array of object
    
    highScore = JSON.parse(highScore)
    // push initial + score to the array
    highScore.push({initials: initial, scores: score })

    highScore = JSON.stringify(highScore)
    localStorage.setItem("highScore", highScore)
    // order the array from highest score to lowest
    
    // json stringify then save back to localstorage
    }
}

// Another click event listener for choices
//    Check answer
//        if correct, add 1 to score, call nextQuestion()
//        if wrong, remove 10 seconds from the interval, call nextQuestion()   
choicesContainer.addEventListener('click', function(event){
    
    var answer = event.target.textContent

    var question = questions[currentQuestion]    

    var questionAnswer = question.answer
    
        if (answer == questionAnswer) {
            score++;
            correct.play();
            nextQuestion()
        } else {
            score--;
            counter -= 10
            incorrect.play();
            nextQuestion();
        }
    })
    
// Click event listener to submit button
submitContainer.addEventListener('click', function(){
    var initial = initialInput.value.trim()
   saveHighscore(initial)
//    redirect to highscore page
window.location.href = "highscores.html"
})
   