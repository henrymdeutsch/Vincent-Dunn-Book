// this is solely dedicated to making the quiz section work.
// my plan - the button options update 2 variables in a 2D array - [0] for the option they picked, and [1] for true or false. When you press next, that array spot is added to a tally.
// arr - ["question", "your answer", "correct answer", 0/1]
// 0/1 if you got it right or not. Updates a variable which is added to total on Next button press.

let dataPage = document.getElementById("dataPage");
let currQuestion, currYourAnswer, currCorrectAnswer, currPoints;
let thisChoiceId = "";
let correctChoiceId = "";
let optionSelected = false;
let firstQuestion = true;
let totalPoints = 0;
let totalQuestions = 0;
let ansArray = [];
let lastTabPressed = 1;
let allButtons = document.getElementsByClassName("option");
let allowSelection = true;
let allButns = document.getElementsByClassName("option");
let allNexts = document.getElementsByClassName("next");
let allSubmits = document.getElementsByClassName("submit");
let relevantParagraphs = document.getElementsByClassName("relevantParagraph");
let butn;


let submitArr = document.getElementsByClassName("submit");
let nextArr = document.getElementsByClassName("next");
let redo = document.getElementById("retake");

// adds onclick addOnclickEnlarge function so I don't have to do it by hand. Important.
let relevantParagraphButtons = Array.from(document.getElementsByClassName('fullContext'));

let skips = document.getElementsByClassName('skip');

for (let i = 0; i < relevantParagraphButtons.length; i++) {
    let currOnclick = relevantParagraphButtons[i].getAttribute('onclick');
    relevantParagraphButtons[i].setAttribute("onclick", currOnclick + "addOnclickEnlarge();");
}

adjustStuff();
function adjustStuff() {
    if (window.innerWidth < 500) {
        /*for (let i = 0; i < skips.length; i++) {
            skips[i].style.margin = "0";
        }
        for (let i = 0; i < allSubmits.length; i++) {
            allSubmits[i].style.margin = "0";
        } */

        // on load, make sure that the "Relevant paragraph" text has less padding around it
        for (let i = 0; i < relevantParagraphs.length; i++) {
            relevantParagraphs[i].style.padding = "25px 20px 10px 20px"; // original was 25px 20px 25px 20px
            relevantParagraphs[i].style.animationName = "squeezeOutMobile";
        }

        // make it so that next button and redo button have less padding
        for (let i = 0; i < nextArr.length; i++) {
            nextArr[i].style.margin = "15px 0 0 25px";
        }
        for (let i = 0; i < submitArr.length; i++) {
            submitArr[i].style.margin = "15px 0 0 25px";
        }
        for (let i = 0; i < skips.length; i++) {
            skips[i].style.margin = "15px 25px 0 0";
        }
        redo.style.margin = "50px 0 0 25px"; // henry deutsch

    }
    else {

        // revert
        for (let i = 0; i < relevantParagraphs.length; i++) {
            relevantParagraphs[i].style.padding = "48px 48px 35px 48px"; // original was 48px
        }

        // revert
        for (let i = 0; i < nextArr.length; i++) {
            nextArr[i].style.margin = "15px 0 0 60px";
        }
        for (let i = 0; i < nextArr.length; i++) {
            submitArr[i].style.margin = "15px 0 0 60px";
        }
    }
}
window.onresize = adjustStuff;


// to style the buttons in the form, in QUESTIONS tab.
function styleButton(buttonId) {
    if (allowSelection) {
        butn = document.getElementById(buttonId);
        for (let i = 0; i < allButns.length; i++) {
            allButns[i].children[0].children[0].classList = "fas fa-circle fa-inverse";
            allButns[i].style.backgroundColor = "#f1f1f1";
            allButns[i].style.background = "#f1f1f1";
            allButns[i].style.border = "none";
        }
        // original color #ccc
        //butn.style.background = "radial-gradient(#92F19C, 80%, green)";
        butn.style.backgroundColor = "#ccc";
        butn.style.border = "none";
        butn.children[0].children[0].classList = "fas fa-dot-circle fa-inverse";
    }
}

// initialize questions, and re-initialize questions when user switches tabs.
let questions = Array.from(document.getElementsByClassName("ch1Question")); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
let allQuestions = Array.from(document.getElementsByClassName("ch1Question")); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.

function initializeQuestions(className, chapterNumber) {
    questions = Array.from(document.getElementsByClassName(className)); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
    allQuestions = Array.from(document.getElementsByClassName(className)); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
    ansArray = [];
    firstQuestion = true;
    totalQuestions = 0;
    totalPoints = 0;
    dataPage.style.display = "none";
    for (let i = 0; i < allSubmits.length; i++) {
        allSubmits[i].style.display = "inline-block";
    }
    for (let i = 0; i < skips.length; i++) {
        skips[i].style.display = "inline-block";
    }
    displayNextQuestion();
    lastTabPressed = chapterNumber;
    allowSelection = true;

    // reset timer
    seconds = -1;
    minutes = 0;
    hours = 0;
    window.clearInterval(stopTimer);
    increment();
    stopTimer = setInterval(increment, 1000);

    // set all buttons back to default color
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].children[0].children[0].classList = "fas fa-circle fa-inverse";
        allButtons[i].style.backgroundColor = "#f1f1f1";
        allButtons[i].style.border = "none";
        allButtons[i].children[0].children[0].style.color = "#fff";
    }

    // remove all relevant Chapter things
    for (let i = 0; i < relevantParagraphs.length; i++) {
        relevantParagraphs[i].style.display = "none";
    }

    // make sure all submit buttons are showing
    submitShow();
}

let randQuestionNum;
let saved;
let savedIndex = 999;
displayNextQuestion();

// displays next question at the start, and when next is pressed
function displayNextQuestion() {
    allowSelection = true;

    if (questions.length === 0) {
        // make all questions hidden
        for (let i = 0; i < allQuestions.length; i++) {
            allQuestions[i].style.display = "none";
        }

        // then display data page
        displayData();
        let finalScore = Math.round(totalPoints/totalQuestions * 1000)/10;
        document.getElementById('score').innerHTML = 'Your Score: ' + finalScore + "%";
    }
    else {

        // set all buttons back to default color and allow hover highlight
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].className = "option hover";
        }

        if (optionSelected || firstQuestion) {

            // make all questions hidden
            for (let i = 0; i < allQuestions.length; i++) {
                allQuestions[i].style.display = "none";
            }

            // display random question
            randQuestionNum = Math.floor(Math.random() * questions.length);
            savedIndex = randQuestionNum;
            questions[randQuestionNum].style.display = "block";

            // randomize answer choices
            let buttonOptions = Array.from(questions[randQuestionNum].children[3].children);
            let copyOfButtonOptions = new Array(buttonOptions.length);
            let optionsFilled = [999, 999, 999, 999];

            for (let i = 0; i < buttonOptions.length; i++) {

                // initialize a random index 0-3, but not if that number has already been given.
                let randIndex;
                do {
                    randIndex = Math.floor(Math.random() * buttonOptions.length);
                }
                while (randIndex === optionsFilled[0] || randIndex === optionsFilled[1] || randIndex === optionsFilled[2] || randIndex === optionsFilled[3] || randIndex === saved);
                optionsFilled[i] = randIndex;

                // copy as random index filled with the next index from buttonOptions.
                copyOfButtonOptions[randIndex] = ""+ buttonOptions[i].innerHTML;
            }

            // turns the array into the copy.
            for (let i = 0; i < buttonOptions.length; i++) {
                buttonOptions[i].innerHTML = copyOfButtonOptions[i];
            }

            // update question # to user
            questions[randQuestionNum].children[1].innerHTML = "Question " + (totalQuestions + 1) + " of " + allQuestions.length;

            // re-initialize questions to remove displayed index
            saved = questions[randQuestionNum];
            questions.splice(randQuestionNum, 1);

            /*let replace = document.getElementById(("replace"));
            replace.innerHTML = "" +  questions.length; */

            firstQuestion = false;
            optionSelected = false;
        }
    }
}
function skip() {

    // only skip if there is more than one question left
    if (questions.length < 1) {
        alert('There is only 1 question left in this test');
    }
    else {
        // set all buttons back to default background-color and unchecked and allow hover highlight
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].style = "background-color: #f1f1f1;";
            allButtons[i].children[0].children[0].classList = "fas fa-circle fa-inverse";
            allButtons[i].className = "option hover";
        }

        // make all questions hidden
        for (let i = 0; i < allQuestions.length; i++) {
            allQuestions[i].style.display = "none";
        }

        questions.splice(randQuestionNum, 0, saved);

        optionSelected = true;

        //copy and pasted

        if (optionSelected || firstQuestion) {

            // make all questions hidden
            for (let i = 0; i < allQuestions.length; i++) {
                allQuestions[i].style.display = "none";
            }

            // display random question as long as it isn't the last question that was displayed
            do {
                randQuestionNum = Math.floor(Math.random() * questions.length);
            } while(randQuestionNum === savedIndex);
            savedIndex = randQuestionNum;

            questions[randQuestionNum].style.display = "block";

            // randomize answer choices
            let buttonOptions = Array.from(questions[randQuestionNum].children[3].children);
            let copyOfButtonOptions = new Array(buttonOptions.length);
            let optionsFilled = [999, 999, 999, 999];

            for (let i = 0; i < buttonOptions.length; i++) {

                // initialize a random index 0-3, but not if that number has already been given.
                let randIndex;
                do {
                    randIndex = Math.floor(Math.random() * buttonOptions.length);
                }
                while (randIndex === optionsFilled[0] || randIndex === optionsFilled[1] || randIndex === optionsFilled[2] || randIndex === optionsFilled[3] || randIndex === saved);
                optionsFilled[i] = randIndex;

                // copy as random index filled with the next index from buttonOptions.
                copyOfButtonOptions[randIndex] = ""+ buttonOptions[i].innerHTML;
            }

            // turns the array into the copy.
            for (let i = 0; i < buttonOptions.length; i++) {
                buttonOptions[i].innerHTML = copyOfButtonOptions[i];
            }

            // update question # to user
            questions[randQuestionNum].children[1].innerHTML = "Question " + (totalQuestions + 1) + " of " + allQuestions.length;

            // re-initialize questions to remove displayed index
            saved = questions[randQuestionNum];
            questions.splice(randQuestionNum, 1);

            /*let replace = document.getElementById(("replace"));
            replace.innerHTML = "" +  questions.length; */

            firstQuestion = false;
            optionSelected = false;
        }
        //displayNextQuestion();
    }
}

function openLastChapter() {

    //openChapter('active2', 'chapter2'); initializeQuestions('ch2Question', 2);

    let listNum = 'active' + lastTabPressed;
    let chapter = 'chapter' + lastTabPressed;
    //document.write(listNum + "&nbsp;&nbsp;&nbsp;&nbsp;" + chapter);
    openChapter(listNum, chapter);
    //openChapter('active2', 'chapter2');

    let thisField = 'ch' + lastTabPressed + 'Question';
    initializeQuestions(thisField, lastTabPressed);


}

/* DATA */

// updates data temporarily when answer choice is selected
function updateDataTemporarily(thisChoiceIdd, correctChoiceIdd) {
    currQuestion = Array.from(document.getElementById(""+thisChoiceIdd).parentElement.parentElement.parentElement.children)[2].innerHTML;
    let tempYourAns = document.getElementById(""+thisChoiceIdd).innerHTML;
    currYourAnswer = tempYourAns.substring(tempYourAns.indexOf('</div>'));
    let tempCorrectAns = document.getElementById(""+correctChoiceIdd).innerHTML;
    currCorrectAnswer =  tempCorrectAns.substring(tempCorrectAns.indexOf('</div>'));
    currPoints = 0;
    if (thisChoiceIdd === correctChoiceIdd) {
        currPoints++;
    }
    optionSelected = true;
    thisChoiceId = thisChoiceIdd;
    correctChoiceId = correctChoiceIdd;

    // disallow future hover highlights for a given question after first answer choice is selected
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].className = "option";
    }
}

// finalizes answer choice when next is selected
function updateDataOfficially() {
    if (optionSelected) {
        nextsShow();

        // update data for results page
        ansArray.push([currQuestion, currYourAnswer, currCorrectAnswer, currPoints]);
        totalPoints += currPoints;
        totalQuestions++;

        // visually display the correct answer, and wrong user choice if necessary.

        let thisButton = document.getElementById(thisChoiceId);
        let correctButton = document.getElementById(correctChoiceId);

        // make this styling blink in and out so that only correct answer is left.
        correctButton.style.backgroundColor = "#e1f8cf";
        thisButton.children[0].children[0].style.color = "grey";
        correctButton.style.border = "3px solid #d1f8cf";
        correctButton.style.padding = "5px 7px 5px 47px";

        // disallow future selections and hovers.
        allowSelection = false;

        /*if (questions.length === 0) {
            displayData();
        } */
    }
    else {
        //tell user to select an option
        submitShow();
        alert("Select an answer choice to move on");


    }
}

function repeatAnimation() {
    if (currPoints === 0) {
        let el = document.getElementById(thisChoiceId);
        el.classList.add("animate");

        setTimeout(function(){
            el.classList.remove("animate");
        }, 200);
    }
}

function submitShow() {
    for (let i = 0; i < allNexts.length; i++) {
        allNexts[i].style.display = "none";
    }
    for (let i = 0; i < allSubmits.length; i++) {
        allSubmits[i].style.display = "inline-block"; // changed here Henry Deutsch
    }

    // hide relevant paragraph while you're at it.
    for(let i = 0; i < relevantParagraphs.length; i++) {
        relevantParagraphs[i].style.display = "none";
    }

    //show skips
    for (let i = 0; i < skips.length; i++) {
        skips[i].style.display = "inline-block";
    }
}

function nextsShow() {
    for (let i = 0; i < allNexts.length; i++) {
        allNexts[i].style.display = "inline-block";
    }
    for (let i = 0; i < allSubmits.length; i++) {
        allSubmits[i].style.display = "none";
    }

    // display relevant paragraph while you're at it.
    for(let i = 0; i < relevantParagraphs.length; i++) {
        relevantParagraphs[i].style.display = "block";
    }
    // don't show skips
    for (let i = 0; i < skips.length; i++) {
        skips[i].style.display = "none";
    }

}


function displayData() {
    dataPage.style.display = "block";
    window.clearInterval(stopTimer);

    // make all feedback chunks hidden
    let feedbackChunks = Array.from(document.getElementsByClassName("questionFeedbackChunk"));
    for (let i = 0; i < feedbackChunks.length; i++) {
        feedbackChunks[i].style.display = "none";
    }

    // show and style the correct amount.
    for (let i = 0; i < allQuestions.length; i++) {
        feedbackChunks[i].style.display = "block";
        feedbackChunks[i].children[0].innerHTML = ansArray[i][0];
        feedbackChunks[i].children[2].innerHTML = ansArray[i][1] + "<br>";
        feedbackChunks[i].children[4].innerHTML = ansArray[i][2];

        // if users answer was incorrect on given question
        if (ansArray[i][3] === 0) {
            feedbackChunks[i].className = "questionFeedbackChunk incorrect";
            feedbackChunks[i].children[1].style.display = "inline";
            feedbackChunks[i].children[2].style.display = "inline";
        }
        // if user was correct
        else {
            feedbackChunks[i].className = "questionFeedbackChunk correct";
            feedbackChunks[i].children[1].style.display = "none";
            feedbackChunks[i].children[2].style.display = "none";
        }
    }
    for (let i = 0; i < allSubmits.length; i++) {
        allSubmits[i].style.display = "none";
    }
    for (let i = 0; i < submitArr.length; i++) {
        submitArr[i].style.display = "none";
    }
    for (let i = 0; i < skips.length; i++) {
        skips[i].style.display = "none";
    }
}

/* TIMER */

let htmlTimers = document.getElementsByClassName("timer");
let seconds = 0;
let minutes = 0;
let hours = 0;

let secondsCorrectedForTens;
let minutesCorrectedForTens;
let hoursCorrectedForZero;

let stopTimer = setInterval(increment, 1000);
function increment() {

    // increment seconds, and maybe minutes & hours
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    // correct for 0s in front of seconds and minutes. Don't show hours if minutes < 60.
    secondsCorrectedForTens = seconds.toString();
    minutesCorrectedForTens = minutes.toString();
    hoursCorrectedForZero = hours.toString() + ":";
    if (seconds < 10) {
        secondsCorrectedForTens = "0" + seconds.toString();
    }
    if (minutes < 10 && hours > 0) {
        minutesCorrectedForTens = "0" + minutes.toString();
    }
    if (hours === 0) {
        hoursCorrectedForZero = "";
    }
    for (let i = 0; i < htmlTimers.length; i++) {
        htmlTimers[i].innerHTML = hoursCorrectedForZero + minutesCorrectedForTens + ":" + secondsCorrectedForTens;
    }

}

// Relevant Chapters, within the Questions section.

let rotations = 0;
let bars = document.getElementsByClassName("animateOnClick");
setTimeout(function() {
    for (let i = 0; i < bars.length; i++) {
        bars[i].className = "absolutePos animateOnClick";
        bars[i].classList.add("animateMe");
        setTimeout(function() {
            bars[i].click();
        }, 1000);
    }
}, 1000);

let secondSetBars = document.getElementsByClassName("animateOnclickV3");
setTimeout(function() {
    for (let i = 0; i < bars.length; i++) {
        secondSetBars[i].className = "absolutePos animateOnclickV3";
        secondSetBars[i].classList.add("animateMeV3");
        setTimeout(function() {
            secondSetBars[i].click();
        }, 1000);
    }
}, 1000);



function rotateMe() {
    if (rotations % 2 === 0) {
        for (let i = 0; i < bars.length; i++) {
            bars[i].className = "absolutePos animateOnClick";
            bars[i].classList.add("animateMe");
        }
        for (let i = 0; i < secondSetBars.length; i++) {
            secondSetBars[i].className = "absolutePos animateOnClickV3";
            secondSetBars[i].classList.add("animateMeV3");
        }
    }
    else {
        for (let i = 0; i < bars.length; i++) {
            bars[i].className = "absolutePos animateOnClick";
            bars[i].classList.add("animateMeV2");
        }
        for (let i = 0; i < secondSetBars.length; i++) {
            secondSetBars[i].className = "absolutePos animateOnClickV3";
            secondSetBars[i].classList.add("animateMeV4");
        }
    }
    rotations++;
}
rotateMe();

let containersThing = document.getElementsByClassName("relevantParagraph");
for (let i = 0; i < containersThing.length; i++) {
    containersThing[i].className = 'relevantParagraph';
}

let contracted = true;
function extendLength() {
    if(contracted) {
        for (let i = 0; i < containersThing.length; i++) {
            containersThing[i].className = 'relevantParagraph';
            containersThing[i].classList.add('extendLength');
        }
    }
    else {
        for (let i = 0; i < containersThing.length; i++) {
            containersThing[i].className = 'relevantParagraph';
            containersThing[i].classList.add('reduceLength');
        }
    }
    contracted = !contracted;
}