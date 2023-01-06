
function toggle() {
    $('#sidebar, #content').toggleClass('active');
};

//let htmlAndBody = document.getElementsByClassName("disableScrollingMaybe");

// for testing purposes; make sure to replace its innerHTML in the flexNav function.
//let replace = document.getElementById("replace");
let currentlyToggled = false;

function changeBodyTextOnToggle() {
    // switch the variable currentlyToggled
    currentlyToggled = !currentlyToggled;
    //replace.innerHTML = currentlyToggled;

}

/* adjust spacer height and toggle icon visibility with screen width */
let sp1 = document.getElementById("spacer1");
let sp2 = document.getElementById("spacer2");
let tog = document.getElementById("toggle");
let mainNav = document.getElementById("mainNav");
let proBooks = document.getElementById("proBooks");
let container = document.getElementById("container");
let menuAndLogo = document.getElementById("menuAndLogo");
let chapters = document.getElementsByClassName("toggleOnMobile");
let chaptersQuestions = document.getElementById("chaptersQuestions");
let toggleHasBeenAdded = false;
let onclickHasBeenAddedToBody2Images = false;

/*on page load, make other tabs dissapear */
let tabcontent = document.getElementsByClassName("tabcontent");
/*for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
} Henry Deutsch */

let chap = document.getElementById('chapter1');
chap.style.display = "block";

/* if user is on a mobile phone, make the font smaller & timer farther away */
let bigText = document.getElementsByClassName("style1-big");
let smallText = document.getElementsByClassName("style1-small");

let chapterHeaders = Array.from(document.getElementsByClassName('paragraph-header'));

// adjusts paragraph indentation on chapter headers
function adjustParagraphIndentation() {

    if (window.innerWidth < 500) {
        for (let i = 0; i < chapterHeaders.length; i++) {
            chapterHeaders[i].style.textIndent = '0';
        }
    }
    else if (window.innerWidth > 500) {
        for (let i = 0; i < chapterHeaders.length; i++) {
            chapterHeaders[i].style.textIndent = '40px';
        }
    }
}
window.onresize = adjustParagraphIndentation;

// adds onclick popupImage function so I don't have to do it by hand. Important.
addOnclickEnlarge();
function addOnclickEnlarge() {
    // this adds the onclick to all the images so I don't have to manually. Just give it the class chapter-image and vuala.
    let images = Array.from(document.getElementsByClassName('chapter-image'));
    let imageURL;
    let fullURL;
    for (let i = 0; i < images.length; i++) {
        fullURL = ""+images[i].src;
        imageURL = fullURL.substring(fullURL.indexOf("images"));
        images[i].setAttribute("onclick", "popupImage('"+ imageURL +"')"); // images/ch1/ch1p2.png   popupImage(imageURL)
    }
}

adjustParagraphIndentation();
function adjustParagraphIndentation() {

    if (window.innerWidth < 500) {
        for (i = 0; i < chapterHeaders.length; i++) {
            chapterHeaders[i].style.textIndent = '7px';
        }
    }
    else {
        for (i = 0; i < chapterHeaders.length; i++) {
            chapterHeaders[i].style.textIndent = '40px';
        }
    }
}
window.onresize = adjustParagraphIndentation;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    for (let x = 0; x < bigText.length; x++) {
        //bigText[x].style.className = "style2-big";
        /*bigText[x].style.fontWeight = "400";
        bigText[x].style.fontWeight = "40px";
        bigText[x].style.lineHeight = "50px"; */

        if (bigText[x].classList.contains("relative")) {
            bigText[x].style.position = "relative";
            bigText[x].style.bottom = "20px";
        }
        if (bigText[x].classList.contains("chapterSpecific")) {
            bigText[x].style.fontSize = "45px";
            bigText[x].style.lineHeight = "45px";
        }
    }
    for (let z = 0; z < smallText.length; z++) {
        //smallText[z].className = "style2-small";
        bigText[x].style.fontWeight = "600";
        bigText[x].style.fontWeight = "25px";
    }
}
else {

}

function flexNav() {

    // Was used to make shorter horizontal nav that toggles between chapters and questions responsive. In the end I used a css media query instead, but kept this code just in case.

    let widthOfChaptersQuestions = chaptersQuestions.clientWidth;

    if (widthOfChaptersQuestions > 455) {
        chaptersQuestions.style.paddingLeft = "60px";
        chaptersQuestions.style.textAlign = "left";
    }
    else if (widthOfChaptersQuestions > 270) {
        chaptersQuestions.style.paddingLeft = "0px";
        chaptersQuestions.style.textAlign = "center";
        chaptersQuestions.style.margin = "15px 50px 55px 50px";
    }

    if (window.innerWidth < 500) {
        chaptersQuestions.style.paddingLeft = "0px";
        chaptersQuestions.style.textAlign = "center";
        chaptersQuestions.style.margin = "15px 0px 55px 0px";
        chaptersQuestions.style.minWidth = "270px";

        let spacer = document.getElementById("spacer");
        if (window.innerWidth < 420) {
            spacer.style.display = "inline-block";
        }
        else {
            spacer.style.display = "none";
        }
    }
    chaptersQuestions.style.visibility = "visible";         // Make it disappear so there is no momentary weirdness in the fraction of a second before the javascript runs


    /* makes the main header and vertical nav responsive. Mostly re-written with css. */


    if (window.innerWidth >= 769) {
        if (toggleHasBeenAdded) {
            for (let i = 0; i < chapters.length; i++) {
                chapters[i].removeEventListener('click', toggle);
            }
            toggleHasBeenAdded = false;
        }
    }
    else if (window.innerWidth >= 295) {
        for (let i = 0; i < chapters.length; i++) {
            //chapters[i].setAttribute("onclick", "toggle()");
            chapters[i].addEventListener('click', toggle);
        }
        toggleHasBeenAdded = true;

        if (!(proBooks.hasAttribute("class"))) {
            proBooks.setAttribute("src", "../Home/images/proBooks.png");
            proBooks.setAttribute("class", "min");
            proBooks.setAttribute("id", "proBooks");
            proBooks.setAttribute("height", "20%");
            proBooks.style.position = "static";
            proBooks.style.left = "0px";
            proBooks.style.top = "0px";
            proBooks.style.width = "150px";
            menuAndLogo.style.width = "187px";
            menuAndLogo.style.position = "static";
            menuAndLogo.style.bottom = "0px";
        }
    }
    else {
        proBooks.setAttribute("src", "images/proBooksMini.png");
        proBooks.removeAttribute("class");
        proBooks.removeAttribute("id");
        proBooks.removeAttribute("height");
    }
}
window.onresize = flexNav;

/* make sure right chapter is shown */
function openChapter(listNum, chapter) {

    // Get all elements with class="tabcontent" and hide them, then show the right one.
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let chap = document.getElementById(chapter);
    chap.style.display = "block";

    // Get all elements with class="tablinks" and remove the class "active", then add it on the right one.
    let tablinks = document.getElementsByClassName("list-item-li");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    let listItem = document.getElementById(listNum);
    listItem.className += " active";

    // Show the current tab, and add an "active" class to the link that opened the tab
    //document.getElementById(chapter).style.display = "block";
    //
}
//let myWindow;

function switchBodies() {
    let body1 = document.getElementById('body1');
    let body2 = document.getElementById('body2');

    if (body1.style.display === "none") {
        body1.style.display = "block"; body1.style.visibility = "visible"; body1.style.position = "static"; body1.style.top = "0"; body1.style.opacity = "100%";
        // I didn't use display = "none" because then the javascript can't access the elements that were set to no display, which will mean the pictures can't full screen.
        body2.style.visibility = "hidden"; body2.style.position = "absolute"; body2.style.top = "-999999px"; body2.style.opacity = "0";

    }
    else {
        // it's fine to set body 1 to no display because its contents will be read at the beginning of the program, so no worries there.
        body1.style.display = "none";
        body2.style.visibility = "visible"; body2.style.position = "static"; body2.style.top = "0"; body2.style.opacity = "100%";
    }

    if (!onclickHasBeenAddedToBody2Images) {
        addOnclickEnlarge();
        onclickHasBeenAddedToBody2Images = true;
    }
}

function openChaptersWindow(chNum, stopNum) {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        switchBodies();
        // on phones, there needs to be a _parent level window that has a link at the top of the page back here.
        let chapterList = document.getElementsByClassName('tabcontentQsection');
        /*for (let i = 0; i < chapterList.length; i++) {
            chapterList[i].style.display = "none";
        }  will prob have to set this back Henry Deutsch*/

        // make sure each chapter is closed
        for (let i= 1; i <= 27; i++) {
            let eachChap = document.getElementById('chapter' + i + 'Qsection');
            eachChap.style.display = "none";
        }

        // then open the right one
        let chap = document.getElementById('chapter' + chNum + 'Qsection');
        chap.style.display = "block";

        // there's no need for a timer on mobile because you're not loading a new page.
        //                                        'ch' + chNum + 'page' + stopNum
        let el = document.getElementById('page' + stopNum);
        el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        /*for (let i = 0; i < Array.from(el.children).length; i++) {
            el.children[i].innerHTML = "<span class='highlight'>" + el.children[i].innerHTML + "</span>";
        } */
    }
    else {

        // on laptops and desktops, a new window should open to the right.
        let myWindow = window.open('chapters.html', '_blank', 'height=9999, width=550, left=9999', true);


        setTimeout(load, 500);
        setTimeout(load, 1000);
        setTimeout(load, 2000);
        setTimeout(load, 3000);
        setTimeout(load, 4000);
        setTimeout(load, 4500);

        function load() {
            //myWindow.scrollTo(0,1150);
            /*
            let el = myWindow.document.getElementById('ch' + chNum + 'stop' + stopNum);
            for (let i = 0; i < Array.from(el.children).length; i++) {
                el.children[i].innerHTML = "<span class='highlight'>" + el.children[i].innerHTML + "</span>";
            }
            */
            //                                                  'ch' + chNum + 'page' + stopNum
            let el = myWindow.document.getElementById('page' + stopNum);

            myWindow.openChapter('active' + chNum, 'chapter' + chNum);
            el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

            myWindow.document.getElementById('content').style.backgroundColor = "#eeede2";

            // format chXstopY where X is chapter, Y is stop #.
        }

    }
}

function hide(idRef) {
    document.getElementById(idRef).style.posision = 'absolute';
    document.getElementById(idRef).style.bottom = '9999px';
    document.getElementById(idRef).style.right = '9999px';
}

function popupImage(imgURL) {
    document.getElementById('body3').style.display = "flex";
    document.getElementById('body3').style.position = "fixed";
    document.getElementById('body3').style.bottom = "0";
    document.getElementById('body3').style.right = "0";


    document.getElementById('body3Companion').style.display = "flex";
    document.getElementById('body3Companion').style.position = "fixed";
    document.getElementById('body3Companion').style.bottom = "0";
    document.getElementById('body3Companion').style.right = "0";


    let pictureHolder = document.getElementsByClassName('pictureHolder')[0];
    pictureHolder.removeChild(pictureHolder.childNodes[0]);
    pictureHolder.innerHTML = "<img class='pictureZoomUp' src="+imgURL+" />";
}




/* all good background color candidates. Chosen color was capitalized.
"#eeebe0"
"#eceee9"
"#eee8e5"
"#e0e9ee"
"#EEEDE2"
"#c5d8cc"
 */




/* nav is 73px tall when screen >=1200px; 66px >=992 (or is it 769?) and shorter. */
/* proBooks is 222px wide when screen >=1200px; 186px >=992px; 150px for 991px and shorter. */

/*
document.write("this hopefully fills space so that I can see the rest tttttttttttttttttttttttttt")
document.write("your device's screen width is "+window.screen.width);
document.write("your device's screen height is "+window.screen.height);
*/

/* screen widths of my devices (width x height):

iPhone 6: 375 x 667
iPad: 768 x 1024
Mom's 15" computer: 1680 x 1050

 */