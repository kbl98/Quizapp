

let quizlength;
let currentQuestion;
let rightAnswers;
let processStep;

let processActual;
let buttonAktiv;
let currentQuiz;
let testEnded;
let currentId;
let AUDIO_success=new Audio("sounds/erfolg.mp3")
let AUDIO_Fail=new Audio("sounds/default.mp3")

function loadQuestions(currentQuiz, currentId) {
  processBar();
  buttonAktiv = true;
  testEnded = false;
  let contentQuiz = document.getElementById("maincard");
  contentQuiz.innerHTML = "";
  contentQuiz.innerHTML = `
    <div class="card-body flex-sb-c-ac " ">
      <h2 class="card-title m-5">${currentQuiz[currentQuestion]["question"]}</h2>
      <div class="question-container">
      <div class="card m-3 rad-none answer" id="answer1" onclick="select('answer1','btn-choice1')">
        
            <div type="button" id="btn-choice1" class="btn btn-choice rad-none" >A</div>
          <span>${currentQuiz[currentQuestion]["answer1"]}</span>
       
      </div>
      <div class="card m-3 rad-none answer" id="answer2" onclick="select('answer2','btn-choice2')">
        
            <div type="button" id="btn-choice2"class="btn btn-choice rad-none" >B</div>
            <span>${currentQuiz[currentQuestion]["answer2"]}</span>
       
      </div>
      <div class="card m-3  rad-none answer" id="answer3" onclick="select('answer3','btn-choice3')">
       
            <div type="button" id="btn-choice3" class="btn  btn-choice rad-none" >C</div>
            <span>${currentQuiz[currentQuestion]["answer3"]}</span>
       
      </div>
      <div class="card m-3  rad-none answer" id="answer4" onclick="select('answer4','btn-choice4')">
       
            <div type="button" id="btn-choice4" class="btn  btn-choice rad-none" >D</div>
            <span>${currentQuiz[currentQuestion]["answer4"]}</span>
       
      </div>
    </div>
      <div class="link-bar">
      <div>Frage ${1+currentQuestion} von ${quizlength}</div>
      <a href="#" class="btn-direction center rounded-circle" onclick="nextQuestion()">></a>
     
      </div>
    </div>`;
}

function select(id, idBtn) {
  if (buttonAktiv) {
    let selection = id;
    selectedAnswer = document.getElementById(id);
    selectedAnswerBT = document.getElementById(idBtn);
    let numberAnswer = selection.slice(-1);
    colorAnswer(selectedAnswer,selectedAnswerBT,numberAnswer);
    colorRightAnswer();
  }
  buttonAktiv = false;
  testEnd();
}

function colorAnswer(selectedAnswer,selectedAnswerBT,numberAnswer){
    if (numberAnswer == currentQuiz[currentQuestion]["solution"]) {
    selectedAnswer.classList.add("bg-success");
    selectedAnswerBT.classList.add("bg-greener");
    AUDIO_success.play();
    rightAnswers++;
  } else {
    selectedAnswer.classList.add("bg-danger");
    selectedAnswerBT.classList.add("bg-redder");
    AUDIO_Fail.play();
  }

}

function colorRightAnswer(){
  let solution = currentQuiz[currentQuestion]["solution"];
    let idRight = document.getElementById("answer" + solution);
    idRight.classList.add("bg-success");
    document
      .getElementById("btn-choice" + solution)
      .classList.add("bg-greener");

}

function nextQuestion() {
  testEnd();
  if (!testEnded) {
    currentQuestion++;
    buttonAktiv = true;
    processBar();
    loadQuestions(currentQuiz, currentId);
  } else {
    setTimeout(showScore, 1000);
  }
}

function showScore() {
  processBar();
  loadResult();
  document.getElementById(
    "score"
  ).innerHTML = `${rightAnswers} von ${quizlength}`;
  document.getElementById("progress-bar").style.width = "100%";
}

function testEnd() {
  let end = quizlength - 1;
  if (currentQuestion == end) {
    testEnded = true;
  }
  if(testEnded){
    showScore()
  }
}

function loadResult() {
  let content = document.getElementById("maincard");
  content.innerHTML = "";
  content.innerHTML = `
    <div class="result-container">
        <div class="bg-circle">
            <img class="logo-end" src="img/Group 5.png">
            <h1>Quizauswertung</h1>
            <div color="blue"class="score-container">
                <h2><b></b>Your Score</b></h2>
                <span id="score"></span>
            </div>
            <button class="result-btn "id="end" onclick="startpage()">Ende</button>
            <button class="result-btn" id="replay" onclick="reloadQuiz()">Replay</button>
         </div>
    </div>`;
}

function reloadQuiz() {
  reset();
  loadQuestions(currentQuiz, currentId);
}

function startpage() {
  let contentQuiz = document.getElementById("maincard");
  contentQuiz.innerHTML = "";
  contentQuiz.innerHTML = ` 
    <div class="head-container">
    <h1>Willkommen beim Superquiz!</h1>
    </div>`;
    let navitems = document.getElementsByClassName("nav-item");
    for (let i = 0; i < navitems.length; i++) {
      navitems[i].classList.remove("bd-col");}
  reset();
}

function reset() {
    
  buttonAktiv = true;
  testEnded = false;
  rightAnswers = 0;
  currentQuestion = 0;
  processBar();
}

function processBar() {
  processActual = +currentQuestion * processStep;
  document.getElementById("progress-bar").style.width = processActual + "%";
}

function setQuiz(quiz, id) {
  let navitems = document.getElementsByClassName("nav-item");
  for (let i = 0; i < navitems.length; i++) {
    navitems[i].classList.remove("bd-col");
  }

  currentId = id;
  currentQuiz = JSON.parse(JSON.stringify(quiz));
  quizlength = currentQuiz.length;
  processStep = 100 / quizlength;
  buttonAktiv = true;
  testEnded = false;
  document.getElementById(currentId).classList.add("bd-col");
  reset();
  loadQuestions(currentQuiz, currentId);
}

function showNav(){
    document.getElementById("navbar").classList.toggle("responsiv-nav");
    document.getElementById("links").classList.toggle("hide");
    
   
    
}

