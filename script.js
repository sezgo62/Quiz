let questions = [
    {
"question": "Wer oder was ist eine Mimose?",
"answer_1": "Eine Hautkrankheit",
"answer_2": "Eine tropische Pflanze",
"answer_3": "Ein biochemischer Vorgang",
"answer_4": "Ein Südseefisch",
"right_answer": 2
},

{
"question": "Wie viele Zähne kann ein Hai im Lauf seines Lebens haben?",
"answer_1": "20000",
"answer_2": "10000",
"answer_3": "2000",
"answer_4": "300",
"right_answer": 1
},

{
    "question": "Welches der folgenden Nagetiere hält keinen Winterschlaf?",
    "answer_1": "Murmeltier",
    "answer_2": "Siebenschläfer",
    "answer_3": "Lemming",
    "answer_4": "Bieber",
    "right_answer": 3
    },

    {
        "question": "Wie nennt man ein männliches Schaf?",
        "answer_1": "Lamm",
        "answer_2": "Hammel",
        "answer_3": "Widder",
        "answer_4": "Mufflon",
        "right_answer": 3
        },

        {
            "question": "Welches Tier kann sein Geschlecht wechseln?",
            "answer_1": "Hai",
            "answer_2": "Oktopus",
            "answer_3": "Muräne",
            "answer_4": "Clownfisch",
            "right_answer": 4
            },

];

let currentQuestion = 0;
let points = 0;
let AUDIO_SUCCESS = new Audio('sound/right.mp3');
let AUDIO_FAIL = new Audio('sound/wrong.mp3');


function init() {
document.getElementById('length').innerHTML =`${questions.length}`;
showQuestion();
}



function showQuestion() {
if (gameIsOver()) {
   showEndScreen();
} else {
updateToNextQuestion();
updateProgressBar();
}
}

function gameIsOver(){
return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('length2').innerHTML = `${questions.length}`;
    document.getElementById('right-answers').innerHTML =`${points}`;
    document.getElementById('header-image').src =`img/cup.png`;
}

function updateToNextQuestion() { 
    
    let question = questions[currentQuestion];
    
    document.getElementById('addLength').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent= percent * 100;
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function answer(selection) {
    let question = questions[currentQuestion];
console.log('The selected answer is ', selection);
let selectedQuestionNumber = selection.slice(-1);
let idOfRightAnswer = `answer_${question['right_answer']}`;

if(rightAnswerSelected(selectedQuestionNumber)) {
console.log('Richtige Antwort!!');
document.getElementById(selection).parentNode.classList.add('bg-success');
AUDIO_SUCCESS.play();
points++;
} else {
    console.log('Falsche Antwort!!');
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}
document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
return selectedQuestionNumber == questions[currentQuestion]['right_answer'];
}

function nextQuestion() {

currentQuestion++;
showQuestion();
document.getElementById('next-button').disabled = true;
document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
document.getElementById('answer_1').parentNode.classList.remove('bg-success');
document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
document.getElementById('answer_2').parentNode.classList.remove('bg-success');
document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
document.getElementById('answer_3').parentNode.classList.remove('bg-success');
document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restart() {

    document.getElementById('header-image').src =`img/pencil.jpg`;

currentQuestion = 0;
points = 0;
init();
document.getElementById('endScreen').style = 'display: none';
document.getElementById('questionBody').style = '';
}