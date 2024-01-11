let background = document.getElementById('background');
let hamburger = document.getElementById('hamburger-menu');

let lines = document.querySelectorAll('#content-title :nth-child(n)');
let mainHeaderLinks = document.querySelectorAll('.main-header-links');
let mainHeader = document.getElementById('main-header');

let aboutContent = document.getElementById('about-content')

let contactContent = document.getElementById('contact-content');
let footerBackTop = document.getElementById('footer-back-top');

let line_1 = document.getElementById('content-title-line-1');
let line_2 = document.getElementById('content-title-line-2');
let line_3 = document.getElementById('content-title-line-3');
let lineArray = [line_1, line_2, line_3];

let hamFirstLine = document.querySelector('.hamburger-lines:nth-child(1)');
let hamSecondLine = document.querySelector('.hamburger-lines:nth-child(2)');
let hamLineArray = [hamFirstLine, hamSecondLine];

let menuOnClick = document.getElementById('clicked-menu-container');
let clickedMenu = document.getElementById('clicked-menu');

let elements = document.querySelectorAll('.scrolling');

let loaded = false;
let scrollbutton = document.getElementById('scroll-button');
let scrollDown = document.getElementById('scroll-down');

let loadingScreen = document.getElementById('loading-screen');
let workingContent = document.getElementById('working-content');

let starArrayMenu = [];

let loader = document.querySelector('.loader');

// Changing style after delay
class styleSetterWithTransition {
    constructor(element, cstyle, value, timeout) {
        this.element = element;
        this.cstyle = cstyle;
        this.value = value;
        this.timeout = timeout;
    };

    setStyle() {
        setTimeout(() => {
            this.element.style[this.cstyle] = this.value;
        }, this.timeout);
    };
}

// Get random int between min & max
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Onclick menu link event
function scrollToSection(sectionFunction) {
    if (hamMenuClicked === true) {
        hamburgerMenuInteract();
        setTimeout(sectionFunction, 1500);
    }
}

// Go to top of the page
function scrollAtTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Move title on scroll to another section
let checkOnScroll = false;
function moveTitle() {
    const changePosX = '-5%';

    if(checkOnScroll === true) {
        lineArray.forEach(function (line) {
            line.style.transform = `translateX(${changePosX})`;
            line.style.opacity = '0';
        });
    } else {
        lineArray.forEach(function (elem){
            elem.style.opacity = '1';
            elem.style.transform = `translateX(0%)`;
        });
    }
}

// Scroll line
let scrollButtonText = document.getElementById('scroll-button-text');

function scrollButton() {
    let scrollButton = document.getElementById('scroll-button');
    let dot = document.getElementById('dot');

    const dot_size = 20;
    dot.style.width = `${dot_size}px`;
    dot.style.height = `${dot_size}px`;

    scrollButton.addEventListener('mousemove', function (x){
        const mousePosY = x.clientY;
        let dotPosY = scrollButton.offsetHeight;
        let cursorPosY = x.clientY/2;
        scrollButtonText.style.opacity = '0';
        scrollButtonText.style.filter = 'blur(2.5rem)';

        if (dotPosY >= Math.floor(cursorPosY/2.67)) {
            dot.style.transform = `translateY(-300%)`;

            scrollButton.addEventListener('click', function(){
                window.scrollBy(0, -window.innerHeight);
            });
        } else {
            dot.style.transform = `translateY(300%)`;

            scrollButton.addEventListener('click', function(){
                window.scrollBy(0, window.innerHeight);
            });
        }
    });
    scrollButton.addEventListener('mouseout', function (){
        dot.style.transform = 'translateY(0%)';
        scrollButtonText.style.opacity = '1';
        scrollButtonText.style.filter = 'blur(0)';
    })
}

// Header links on clip event
function eventHeaderLinks() {
    if (checkOnScroll === true) {
        mainHeaderLinks.forEach(function (x){
            x.style.display = 'none';
        });
    } else {
        mainHeaderLinks.forEach(function (x){
            x.style.display = 'block';
        });
    }
}

// Hamburger menu on click links animation
let hamMenuClicked = false;

// After clicked menu event
const mainHeaderHome = document.getElementById('main-header-home');
let spamTimer = 1500;
let spamChecker = false;
function hamburgerMenuInteract() {
    const widthIncrement = 100;
    const unit = 'svw';
    let clickedMenu = document.getElementById('clicked-menu');
    let clickedMenuLinks = document.querySelectorAll('.clicked-menu-links');

    if (hamMenuClicked === false) {
        if (spamChecker === false) {
            spamChecker = true;
            setTimeout(function () {
                spamChecker = false;
            }, spamTimer)

            let clickedMenuShow = new styleSetterWithTransition(clickedMenu, 'opacity', 1, 1);
            let clickedMenuWidth = new styleSetterWithTransition(clickedMenu, 'width', '100%', 600);
            clickedMenuShow.setStyle();
            clickedMenuWidth.setStyle();
            clickedMenu.style.display = 'flex';

            mainHeader.style.backgroundColor = 'transparent';
            mainHeaderHome.style.opacity = '0';

            clickedMenuLinks.forEach(function (elem){
                elem = new styleSetterWithTransition(elem, 'opacity', 1, 1100);
                elem.setStyle();
            });
            starArrayMenu.forEach(function(star){
                star = new styleSetterWithTransition(star, 'opacity', 1, 1300);
                star.setStyle();
            });

            menuOnClick.style.width = `${widthIncrement}${unit}`;
            hamMenuClicked = true;
        }
    } else {
        if (spamChecker === false) {
            spamChecker = true;
            setTimeout(function () {
                spamChecker = false;
            }, spamTimer)

            let clickedContainerHide = new styleSetterWithTransition(menuOnClick, 'width', 0, 850);
            let clickedMenuHideDisplay = new styleSetterWithTransition(clickedMenu, 'display', 'none', 1200);
            let clickedMenuHide = new styleSetterWithTransition(clickedMenu, 'width', '0%', 350);

            mainHeaderHome.style.opacity = '1';

            clickedMenuLinks.forEach(function (elem) {
                elem.style.opacity = '0';
            });
            starArrayMenu.forEach(function(star){
                star.style.opacity = '0';
            });

            clickedMenuHide.setStyle();
            clickedContainerHide.setStyle();
            clickedMenuHideDisplay.setStyle();
            hamMenuClicked = false;
        }
    }
}

function mainContentOnLoad() {
    if(load === true) {
        moveTitle();
    }
}

// On scroll event
let oneScroll = 100;
window.onscroll = function() {scrollFunction()};

// On scroll about section etc
function scrollFunction() {
    if (document.body.scrollTop > oneScroll*5 || document.documentElement.scrollTop > oneScroll*5) {
        checkOnScroll = true;

        scrollbutton.style.opacity = '1';

        moveTitle();
        eventHeaderLinks();

        hamburger.style.display = 'flex';
    } else {
        scrollbutton.style.opacity = '0';
        checkOnScroll = false;
        moveTitle();
    }
}

function homeSection() {window.scrollTo(0, 0);}
function aboutSection() {aboutContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function experienceSection() {workingContent.scrollIntoView({block: 'start', behavior: 'smooth'});}
function projectsSection() {projectContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function contactSection() {contactContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function homeSectionFromHamMenu() {
    scrollToSection(homeSection);
}

function aboutSectionFromHamMenu() {
    scrollToSection(aboutSection);
}
function workingSectionFromHamMenu() {
    scrollToSection(experienceSection);
}

function projectsSectionFromHamMenu() {
    scrollToSection(projectsSection);
}

function contactSectionFromHamMenu() {
    scrollToSection(contactSection);
}

// Listeners
hamburger.addEventListener('mouseover', function(){
    if (hamMenuClicked === false) {
        hamFirstLine.style.transform = 'translateX(25%)';
        hamSecondLine.style.transform = 'translatex(-25%)';
    }
});
hamburger.addEventListener('mouseout', function(){
    if (hamMenuClicked === false) {
        hamFirstLine.style.transform = `translateY(0)`;
        hamSecondLine.style.transform = `translateY(0)`;
    }
});

// scroll event
document.addEventListener('scroll', function(){
    const breakpoints = [1800, 2100, 2400, 2700, 3000, 3400, 3600];
    const workingTitles = document.querySelectorAll('.working-text-titles');
    const workingSubTitles = document.querySelectorAll('.working-text-subtitles');
    let scrolled = window.scrollY;

    if(scrolled <= 0) {
        mainHeader.style.backgroundColor = 'transparent';

    } else {
        for (let i = 0; i < workingTitles.length; i++) {
            if (scrolled >= breakpoints[i]) {
                workingTitles[i].style.backgroundPosition = '50% 50%';
                workingSubTitles[i].style.transform = 'translateX(0)';
                workingSubTitles[i].style.opacity = '1';
            } else {
                workingSubTitles[i].style.opacity = '0';

                if(i % 2 === 0) {
                    workingTitles[i].style.backgroundPosition = '325% 50%';
                    workingSubTitles[i].style.transform = 'translateX(-50%)';
                } else {
                    workingTitles[i].style.backgroundPosition = '-325% 50%';
                    workingSubTitles[i].style.transform = 'translateX(50%)';
                }
            }
        }

        document.getElementById('photo').style.transform = `translateY(${-scrolled * 0.3}px)`;
        mainHeader.style.backgroundColor = ' var(--patterin-darker)';
    }
});

let loadBar = document.getElementById('progress-bar');
let loadBarPercent = document.getElementById('progress-bar-content');
let quoteCon = document.getElementById('quote');
let startWidth = 0;
let load = false;
function loadingBar() {
    frame = setInterval(frame, 45);
    function frame() {
        if (startWidth >= 100) {
            load = true;
            let line1Delay = new styleSetterWithTransition(line_1, 'opacity', '1', 1500);
            let line2Delay = new styleSetterWithTransition(line_2, 'opacity', '1', 1700);
            let line3Delay = new styleSetterWithTransition(line_3, 'opacity', '1', 1900);

            let line1TransformDelay = new styleSetterWithTransition(line_1, 'transform', 'none', 1550);
            let line2TransformDelay = new styleSetterWithTransition(line_2, 'transform', 'none', 1750);
            let line3TransformDelay = new styleSetterWithTransition(line_3, 'transform', 'none', 1950);

            let loadBarDelay = new styleSetterWithTransition(loadBar, 'opacity', '0', 600);
            let quoteDelay = new styleSetterWithTransition(quoteCon, 'opacity', '0', 300);
            loadBarDelay.setStyle();
            quoteDelay.setStyle();

            line1Delay.setStyle();
            line2Delay.setStyle();
            line3Delay.setStyle();

            line1TransformDelay.setStyle();
            line2TransformDelay.setStyle();
            line3TransformDelay.setStyle();

            clearInterval(frame);
        } else {
            startWidth++;
            loadBar.style.width = `${startWidth}%`;
            loadBarPercent.innerHTML = `${startWidth}%`;
        }
    }
}

function randomQuote() {
    const quote1 = 'Przemądrzała mowa i wyszukane maniery rzadko towarzyszą człowiekowi spolegliwemu.';
    const quote2 = 'Zachowanie wiedzione zyskiem to powód do wielkich skarg.';
    const quote3 = 'Mierzyć się z ostatecznościami jest zaiste boleśnie.';
    const quote4 = 'Ucz się, jakby wszystko było przed tobą, i ciągle obawiaj się stracić to, czegoś się nauczył.'
    const quoteArray =[quote1, quote2, quote3, quote4];

    const randInt = getRandomBetween(0, quoteArray.length);
    quoteCon.innerHTML =
        `<div>
            <i>"</i><span>${quoteArray[randInt]}</span><i>"</i>
        </div><br>
        <h6> - Konfucjusz, Dialogi</h6>`;
}

function loadingScreens() {
    const duration = 5500;
    document.body.style.overflow = 'hidden';

    let bodyDelay =
        new styleSetterWithTransition(document.body, 'overflow', 'visible', duration);
    let loaderDelay =
        new styleSetterWithTransition(document.querySelector('.loader-load'), 'opacity', '0', duration - 750);
    let loaderTextDelay =
        new styleSetterWithTransition(document.getElementById('loading-screen-title'), 'opacity', '0', duration - 500);
    let loadingScreenDelay = new styleSetterWithTransition(loadingScreen, 'width', '0%', duration);

    bodyDelay.setStyle();
    loaderDelay.setStyle();
    loaderTextDelay.setStyle();
    loadingScreenDelay.setStyle();
}

const projectParent = document.getElementById('projects-parent');
const projectContent = document.getElementById('project-content');
let projectBoxes = document.querySelectorAll('.project-box');
projectParent.addEventListener('mousedown', function (event) {
    projectContent.dataset.mouseDownAt = event.clientX;
});
projectParent.addEventListener('mouseup', function () {
    projectContent.dataset.mouseDownAt = "0";
    projectContent.dataset.prevPercentage = projectContent.dataset.percentage;
});
projectParent.addEventListener('mousemove', function (event) {
    if (projectContent.dataset.mouseDownAt === "0") return;

    const mousePos = parseFloat(projectContent.dataset.mouseDownAt) - event.clientX;
    const mouseFinal = window.innerWidth / 2;

    const percentage = (mousePos / mouseFinal) * -50;
    const percentageFinal = parseFloat(projectContent.dataset.prevPercentage) + percentage;

    projectContent.dataset.percentage = percentageFinal;

    projectBoxes.forEach(function (con) {
        con.animate({
            backgroundPosition: `clamp(50%, ${Math.abs(50 - percentageFinal)}%, 100%) 50%`
        }, {duration: 1200, fill: 'forwards'});
    });
    projectContent.animate({
        transform: `translateX(clamp(-50%, ${percentageFinal}%, 0%))`
    }, {duration: 1200, fill: 'forwards'});
});

hamburger.addEventListener('click', hamburgerMenuInteract);
scrollDown.addEventListener('click', function () {
    aboutSection();
});

footerBackTop.addEventListener('click', homeSection);

document.body.onload = function () {
    scrollButton();
    scrollAtTop();
    loadingScreens();
    loadingBar();
    randomQuote()
}