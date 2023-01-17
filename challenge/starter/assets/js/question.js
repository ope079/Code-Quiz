questions = [
    {
        title: " Javascript is an _______ language?",
        choices: ["Object Oriented", "Procedural", "Object Based"],
        answer: "Object Oriented"
    },

    {
        title: " Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "var and let"],
        answer: "var and let"
    },
    {
        title: " Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementById", "getElementByClassName", "getElementById and getElementByClassName", "None of the above"],
        answer: "getElementById and getElementByClassName"
    },
    {
        title: " Upon encountering empty statements, what does the Javascript Interpreter do?",
        choices: ["throws an error", "ignores statements", "gives a warning", "None of the above"],
        answer: "ignores statements"
    },
]

questions = JSON.stringify(questions)
localStorage.setItem('questions', questions)