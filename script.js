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
let points = 0; //Gibt an wie viele Fragen man richtig beantwortet hat.
let AUDIO_SUCCESS = new Audio('sound/right.mp3');
let AUDIO_FAIL = new Audio('sound/wrong.mp3');


function init() {
    document.getElementById('length').innerHTML = `${questions.length}`;
    showQuestion();
}



function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateToNextQuestion();

    }
}

function gameIsOver() {
    return currentQuestion >= questions.length; // Wenn currentquestion größer oder gleich der Länge der Fragen ist
}

function showEndScreen() {
    document.getElementById('endScreen').style = ''; //Das display: none; vom jeweiligen Container wird entfernt und der endscreeen angezeigt.
    document.getElementById('questionBody').style = 'display: none'; // Die Container mit den jeweiligen Antworten und der Frage werden ausgeblendet.
    document.getElementById('length2').innerHTML = `${questions.length}`; //Es wurde ...
    document.getElementById('right-answers').innerHTML = `${points}`;     //von ... Fragen richtig beantwortet.
    document.getElementById('header-image').src = `img/cup.png`;
}

function updateToNextQuestion() { //Diese Funktion ist da um uns die aktuelle Frage anzeigen zu lassen
    
    let question = questions[currentQuestion]; //Wir lagern die gesammte Frage in question ein.
    // Dadurch dass wir immer currentQuestion++ machen updaten wir also immer die akltuelle Frage.

    document.getElementById('addLength').innerHTML = currentQuestion + 1; //Hier wird die aktuelle Zahl "1 von 5" geändert.
    document.getElementById('questiontext').innerHTML = question['question']; //Hier wird die aktuelle Frage geändert.
    document.getElementById('answer_1').innerHTML = question['answer_1']; //Hier werden die aktuellen Antworten geändert. 
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length; // Wir lagen den Fortschritt in Prozente in percent ein um den Fortschritt der Progressbar korrekt anzeigen zu lassen.
    percent = percent * 100; // Es wird mal 100 gerechnet damit wir keine Komma-Zahl haben.
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function answer(selection) {    //Hier bekommen wir als Parameter, "selection", die jeweilige Antwort die uns vom onclick-listener übergeben wurde.
   
    let question = questions[currentQuestion];
    console.log('The selected answer is ', selection);
    let selectedQuestionNumber = selection.slice(-1); //Hier bekommen wir durch, "selection.slice(-1)" den letzten Buchstaben/Zahl aus einem String.   
    let idOfRightAnswer = `answer_${question['right_answer']}`; //Benötigen wir um auf die ID zugreifen zu können. Die jewilige Zahl aus einem Objekt wird hier eingelagert.


    if (rightAnswerSelected(selectedQuestionNumber)) {
        console.log('Richtige Antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-success'); //Dadurch wird der Container der richtigen ID zu grün.
                                                                                   //Durch parentNode können wir in dem Fall die css Klasse dem übergeordneten DIV übergeben.
        AUDIO_SUCCESS.play();
        points++; // Hier werden die Points vergeben 
        document.getElementById('button1').classList.add('prevent');
        document.getElementById('button2').classList.add('prevent');
        document.getElementById('button3').classList.add('prevent');
        document.getElementById('button4').classList.add('prevent');
    } else {
        console.log('Falsche Antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // Die falsche Antwort wird hier grün angezeigt.
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); //Gleichzeitig wird zu der falschen Antwort die richtige gleich mit angezeigt mit Hilfe von IdofRightAnswer.
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false; // Der Button wird enabled und wieder anklickbar sein, was zuvor im HTML disbaled wurde.

    document.getElementById('button1').classList.add('prevent');
    document.getElementById('button2').classList.add('prevent');
    document.getElementById('button3').classList.add('prevent');
    document.getElementById('button4').classList.add('prevent');
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == questions[currentQuestion]['right_answer'];
}

function nextQuestion() {

    updateProgressBar();

    currentQuestion++;
    showQuestion();
    document.getElementById('next-button').disabled = true; // Diese Zeile lässt den Button wieder disbaled, also nicht anklickbar.
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger'); // Die nächsten Zeilen entfernen die Farben von den verschiedenen answer containern.
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');

    document.getElementById('button1').classList.remove('prevent');
    document.getElementById('button2').classList.remove('prevent');
    document.getElementById('button3').classList.remove('prevent');
    document.getElementById('button4').classList.remove('prevent');

}


function restart() {

    document.getElementById('header-image').src = `img/pencil.jpg`;
    document.getElementById('progress-bar').style = `width: 0%;`;
    currentQuestion = 0;
    points = 0;
    init();
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden.
    document.getElementById('questionBody').style = ''; // Questionbody wieder anzeigen.
}