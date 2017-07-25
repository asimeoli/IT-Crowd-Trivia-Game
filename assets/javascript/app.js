//Global Variables
var questions = [
    new question("What is Jen's job title at Reynholm Industries?", ["VP of Sales", "Relationship Manager", "Executive Assistant"], 1, "./assets/images/jen.gif", "./assets/images/jen2.gif"),
    new question("Quick there's a fire! What is the number for emergency services?", ["911", "999", "0118 999 881 99 9119 725...3"], 2, "./assets/images/fire1.gif", "./assets/images/fire2.gif"),
    new question("What lays beyond The Red Door?", ["Hell", "Toilet", "Richmond", "Spacious Pantry"], 2, "./assets/images/reddoor1.jpg", "./assets/images/reddoor.gif"),
    new question("Morris Moss has a hidden talent for what popular British game show?", ["Countdown", "8 out of 10 cats", "Wheel of Fortune "], 0, "./assets/images/milk.gif", "./assets/images/milk1.gif"),
    new question("After some creative accounting is uncovered at Reynholm Industries, Denholm Reynholm comes to untimely death. How does this happen?", ["STRESS", "Fall", "Gunshot"], 1, "./assets/images/DR.png", "./assets/images/DR1.gif"),
    new question("When he's caught using the 'Handicapped Toilets' Roy comes up with a brilliant plan... pretending to be disabled. What's his 'disability?'", ["Cancer", "Muscular Dystrophy", "Leg"], 2, "./assets/images/roy1.gif", "./assets/images/roy2.gif"),
    new question("After getting dragged to a football match, Moss decides he wants to go 'back to being weird.' Because it's all he has, except for what other thing?", ["Paper clip collection", "His sweet style", "A Spitfire"], 1, "./assets/images/mr1.gif", "./assets/images/mr2.gif"),
    new question("If your computer is broken: 'turn it off and on again:'", ["true", "false"], 0, "./assets/images/off.gif", "./assets/images/on.gif"),

];
var nextQuestion = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var questionTime = 0;
var intervalId = 0;
var currentQuestion = 0;

//Question object generator
function question(prompt, answers, correctAnswer, picture, GIF) {
    this.prompt = prompt;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.picture = picture;
    this.GIF = GIF;
}


//Load Question
function loadQuestion(n) {
    currentQuestion = n;
    $('#answerPanel').empty();
    var q = questions[n];
    $('#questionPanel').html('<p>' + q.prompt + '</p>');
    $('#imagePanel').html('<img src="' + q.picture + '">');
    //buttons added on each round	
    for (var i = 0; i < q.answers.length; i++) {
        var buttonID = "button" + i.toString();
        $('#answerPanel').append('<button class="btn-primary" id=' + buttonID + ' > ' + q.answers[i] + '</button>');
        if (i === q.correctAnswer) {
            $('#' + buttonID).on("click", rightAnswer);
        } else {
            $('#' + buttonID).on("click", wrongAnswer);
        }
    }

    console.log(questions[n]);
    //TODO: display question on HTML
}

//Loading next question
function loadNextQuestion() {
    if (nextQuestion >= questions.length) {
        gameOver();
    } else {
        loadQuestion(nextQuestion);
        startQuestionTimer();
        nextQuestion++;
    }
}

//Answer to question
function startQuestionTimer() {
    if (intervalId != 0) {
        clearInterval(intervalId);
    }
    questionTime = 15;
    $('#display').html('<p>' + questionTime.toString() + '</p>');
    intervalId = setInterval(tick, 1000);
}

function stopQuestionTimer() {
    clearInterval(intervalId);
    intervalId = 0;
    $('#display').html('<p> Get Ready </p>');
}
//
function rightAnswer() {
    stopQuestionTimer();
    $('#answerPanel').empty();
    $('#answerPanel').html('<p> Correct! </p>');
    $('#imagePanel').html('<img src="' + questions[currentQuestion].GIF + '">');
    rightAnswers++;
    $('#correct').html('<p> Correct: ' + rightAnswers.toString() + '</p>');
    setTimeout(loadNextQuestion, 1000 * 6);
}

//
function wrongAnswer() {
    stopQuestionTimer();
    $('#answerPanel').empty();
    $('#answerPanel').html('<p> Wrong! </p>');
    wrongAnswers++;
    $('#wrong').html('<p> Wrong: ' + wrongAnswers.toString() + '</p>');
    setTimeout(loadNextQuestion, 1000 * 3);
}

function gameOver() {
    $('#answerPanel').empty();
    $('#questionPanel').empty();
    $('#display').empty();
    $('#imagePanel').empty();
    $('#answerPanel').append('<button class="btn-primary" id="restartButton"> Restart Game! </button>');
    $("#restartButton").on("click", startGame);
}

function startGame() {
    rightAnswers = 0;
    wrongAnswers = 0;
    nextQuestion = 0;
    $('#correct').html('<p> Correct: ' + rightAnswers.toString() + '</p>');
    $('#wrong').html('<p> Wrong: ' + wrongAnswers.toString() + '</p>');
    loadNextQuestion();
}

//timer
function tick() {
    questionTime--;
    $('#display').html('<p>' + questionTime.toString() + '</p>');
    if (questionTime === 0) {
        clearInterval(intervalId);
        intervalId = 0;
        wrongAnswer();
    }
}

//beginning game
window.onload = function() {
    $("#startButton").on("click", startGame);
};