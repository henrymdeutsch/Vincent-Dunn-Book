let containerQsection = document.getElementById("containerQsection");
let mainNavQsection = document.getElementById("mainNavQsection");
let sp1Qsection = document.getElementById("spacer1Qsection");
let sp2Qsection = document.getElementById("spacer2Qsection");
let chaptersQuestionsQsection = document.getElementById("chaptersQuestionsQsection");

let chapQsection = document.getElementById('chapter1Qsection');
chapQsection.style.display = "block";

// none of this is used

// all of this is a duplicate of flexNav in script.js but with different id's so that the id refs of the Qsection do not interfere with the real chapter.
function flexNavQsection() {
    // for testing purposes
    //replace.innerHTML = currentlyToggled;

    // make horizontal nav that toggles between chapters and questions responsive
    let widthOfChaptersQuestions = chaptersQuestionsQsection.clientWidth;

    if (widthOfChaptersQuestions > 455) {
        chaptersQuestionsQsection.style.paddingLeft = "60px";
        chaptersQuestionsQsection.style.textAlign = "left";
    }
    else if (widthOfChaptersQuestions > 270) {
        chaptersQuestionsQsection.style.paddingLeft = "0px";
        chaptersQuestionsQsection.style.textAlign = "center";
        chaptersQuestionsQsection.style.margin = "15px 50px 55px 50px";
    }

    if (window.innerWidth < 500) {
        chaptersQuestionsQsection.style.paddingLeft = "0px";
        chaptersQuestionsQsection.style.textAlign = "center";
        chaptersQuestionsQsection.style.margin = "15px 0px 55px 0px";
        chaptersQuestionsQsection.style.minWidth = "270px";

        let spacer = document.getElementById("spacerQsection");
        if (window.innerWidth < 420) {
            spacer.style.display = "inline-block";
        }
        else {
            spacer.style.display = "none";
        }
    }
    else {

    }
    // make it disappear so there is no momentary weirdness in the fraction of a second before the javascript runs

    chaptersQuestionsQsection.style.visibility = "visible";

    /* makes the main header and vertical nav responsive */
    if (window.innerWidth >= 1200) {
        containerQsection.style.top = "5px";
        sp1Qsection.style.height = "50px";
        sp2Qsection.style.height = "50px";
    }
    else if (window.innerWidth >= 992) {
        container.style.top = "5px";
        sp1Qsection.style.height = "40px";
        sp2Qsection.style.height = "40px";
    }
    else if (window.innerWidth >= 769) {
        containerQsection.style.top = "0px";
        sp1Qsection.style.height = "40px";
        sp2Qsection.style.height = "40px";
    }
    else if (window.innerWidth >= 295) {
        containerQsection.style.top = "0px";
        sp1Qsection.style.height = "40px";
        sp2Qsection.style.height = "40px";
    }
    else {
        containerQsection.style.bottom = "5px";
        sp1Qsection.style.height = "40px";
        sp2Qsection.style.height = "40px";
    }
}
window.onresize = flexNavQsection;

function switchBodies() {
    if (body1.style.display === "none") {
        body1.style.display = "block";
        body2.style.display = "none";
    }
    else {
        body1.style.display = "none";
        body2.style.display = "block";
    }
}


function goToChapter(chNum, stopNum) {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent && false)) {
        let chapterList = document.getElementsByClassName('tabcontentQsection');
        for (let i = 0; i < chapterList.length; i++) {
            chapterList[i].style.display = "none";
        }

        let chap = document.getElementById('chapter' + chNum + 'Qsection');
        chap.style.display = "block";

        document.getElementById('ch' + chNum + 'stop' + stopNum).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

        // on phones, there needs to be a _parent level window that has a link at the top of the page back here.
        //let myWindow = window.open('chaptersOnMobile.html', '_parent', 'height=9999, width=550, left=9999', true);

        /*setTimeout(function() {
            //myWindow.scrollTo(0,1150);

            myWindow.openChapter('active' + chNum, 'chapter' + chNum);
            myWindow.document.getElementById('ch' + chNum + 'stop' + stopNum).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            myWindow.document.getElementById('content').style.backgroundColor = "#eeede2";

            // format chXstopY where X is chapter, Y is stop #.
        }, 1000); */
    }
    else {

        // on laptops and desktops, a new window should open to the right.
        let myWindow = window.open('book2Chapters.html', '_blank', 'height=9999, width=550, left=9999', true);

        // click on chapter number, and then find a way to scroll to Id reference.

        //document.write(el.innerHTML);
        setTimeout(function() {
            //myWindow.scrollTo(0,1150);

            /*myWindow.openChapter('active' + chNum, 'chapter' + chNum);
            myWindow.document.getElementById('ch' + chNum + 'stop' + stopNum).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            myWindow.document.getElementById('content').style.backgroundColor = "#eeede2"; */

            //myWindow.openChapter('active' + chNum, 'chapter' + chNum);
            myWindow.openChapter('active2', 'chapter2'); //myWindow.changeBodyTextOnToggle();
            myWindow.document.write("testing2");
            myWindow.document.getElementById('ch' + chNum + 'stop' + stopNum).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            myWindow.document.getElementById('content').style.backgroundColor = '#eeede2';


            // format chXstopY where X is chapter, Y is stop #.
        }, 1000);

    }
}