var highScore = localStorage.getItem("highScore")

var highScoresContainer = document.querySelector("#highscores")

var clearContainer = document.querySelector("#clear")

highScore = JSON.parse(highScore)



function display(){
    
    highScore.sort(function(a, b){
        a.scores - b.scores
    })

    var liList = []    
    highScore.forEach(element => {
        var liVar = document.createElement("li")
        liVar.textContent = element.initials + " : " + element.scores 
        
        highScoresContainer.appendChild(liVar)
    });
    
}

display()

clearContainer.addEventListener('click', function(){
    highScore = []
    JSON.stringify(highScore)
    localStorage.setItem("highScore", highScore)
    window.location.href = "highscores.html"
})