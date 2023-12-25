let background = document.getElementById('background');
let hamburger = document.getElementById('hamburger-menu');

let lines = document.querySelectorAll('#content-title :nth-child(n)');
let mainHeaderLinks = document.querySelectorAll('.main-header-links');
let menuLinks = document.getElementById('menu-links');
let mainHeader = document.getElementById('main-header');

let aboutContent = document.getElementById('about-content')
let aboutBoxPortrait = document.getElementById('about-box-img');
let aboutTitle = document.getElementById('about-title');
let aboutSubtitle = document.getElementById('about-subtitle');
let aboutText = document.getElementById('about-text-title');
let aboutArray = [aboutBoxPortrait, aboutTitle, aboutSubtitle, aboutText];

let mainContent = document.getElementById('main-content');
let contentTitle = document.getElementById('content-title');

let projectContent = document.getElementById('projects-content');
let projectsFirst = document.getElementById('projects-first');
let projectsSecond = document.getElementById('projects-second');
let projectsThird = document.getElementById('projects-third');
let projectsFourth = document.getElementById('projects-fourth');
let projectsImgArray = [projectsFirst, projectsSecond, projectsThird, projectsFourth];

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

let rocketLaunch = document.getElementById('rocketLaunch');

let loaded = false;

let starArray = [];
let starArrayMenu = [];

const maxMovement = 30;
const maxMovementEx = 100;

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
    const changePosX1 = '-5%';
    const changePosX2 = '5%';

    const changeAngleX1 = '90deg';
    const changeAngleX2 = '-90deg';

    if(checkOnScroll === true) {
        line_1.style.transform = `translateX(${changePosX2}) rotateX(${changeAngleX2})`;
        line_1.style.opacity = '0';
       //line_2.style.transform = `translateX(${changePosX1}) rotateX(${changeAngleX1})`;
        line_3.style.transform = `translateX(${changePosX2}) rotateX(${changeAngleX2})`;
        line_3.style.opacity = '0';
    } else {
        lineArray.forEach(function (elem){
            elem.style.opacity = '1';
            elem.style.transform = `translateX(0%) rotateX(0deg)`;
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

// Content title change text event
function addContentTitleText() {
    let getTitleText = document.getElementById('makeTitle');

    let indicatorValue = 0;
    const duration = 3500;
    const durationInSec = duration/1000;

    let rotationSet;
    const rotationAngle = 'toTop';

    switch (rotationAngle) {
        case 'toTop':
            rotationSet = 'rotateX(90deg)';
            break;
        case 'toDown':
            rotationSet = 'rotateX(-90deg)';
            break;
    }

    const keyframes = [
        {transform: `rotateX(0)`, filter: 'blur(50px)'},
        {transform: `${rotationSet}`, filter: 'blur(15px)', offset: 0.5},
        {transform: `rotateX(0)`, filter: 'blur(0)'},
    ]
    const options = {
        duration: 500,
        iterations: 1,
    }

    getTitleText.style.animationDelay = `${durationInSec}s`;

    setInterval(function (){
        switch (indicatorValue) {
            case 0:
                getTitleText.animate(keyframes, options);
                getTitleText.innerHTML = 'freelancers';
                indicatorValue++;
                break;
            case  1:
                getTitleText.animate(keyframes, options);
                getTitleText.innerHTML = 'personal';
                indicatorValue++;
                break;
            case 2:
                getTitleText.animate(keyframes, options);
                getTitleText.innerHTML = 'business';
                indicatorValue = 0;
                break;
        }
    }, duration);
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
function onClickLinesAnimation() {
    const lineWidth = hamFirstLine.offsetWidth;

    hamSecondLine.style.transform = 'translateX(2.5rem)';
    hamSecondLine.style.opacity = '0';

    hamFirstLine.style.transform = `translateY(${lineWidth/1.75}px)`;
    hamFirstLine.style.width = '100%';
}

// After clicked menu event
function hamburgerMenuInteract() {
    const widthIncrement = 100;
    const unit = 'svw';
    let clickedMenu = document.getElementById('clicked-menu');
    let clickedMenuLinks = document.querySelectorAll('.clicked-menu-links');

    if (hamMenuClicked === false) {
        let clickedMenuShow = new styleSetterWithTransition(clickedMenu, 'opacity', 1, 1);
        let clickedMenuWidth = new styleSetterWithTransition(clickedMenu, 'width', '100%', 600);
        clickedMenuShow.setStyle();
        clickedMenuWidth.setStyle();
        clickedMenu.style.display = 'flex';

        clickedMenuLinks.forEach(function (elem){
            elem = new styleSetterWithTransition(elem, 'opacity', 1, 1100);
            elem.setStyle();
        });
        starArrayMenu.forEach(function(star){
            star = new styleSetterWithTransition(star, 'opacity', 1, 1300);
            star.setStyle();
        });

        onClickLinesAnimation();
        menuOnClick.style.width = `${widthIncrement}${unit}`;
        hamMenuClicked = true;
    } else {
        let clickedContainerHide = new styleSetterWithTransition(menuOnClick, 'width', 0, 850);
        let clickedMenuHideDisplay = new styleSetterWithTransition(clickedMenu, 'display', 'none', 1200);
        let clickedMenuHide = new styleSetterWithTransition(clickedMenu, 'width', '0%', 350);

        hamLineArray.forEach(function (elem){
            elem.style.transform = 'none'
            elem.style.opacity = '1';
            elem.style.width = '100%';
        });
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

// On scroll event
let oneScroll = 100;
window.onscroll = function() {scrollFunction()};

// On scroll about section etc
function scrollFunction() {
    if (document.body.scrollTop > oneScroll*5 || document.documentElement.scrollTop > oneScroll*5) {
        checkOnScroll = true;

        let aboutImageShow = new styleSetterWithTransition(aboutBoxPortrait, 'opacity', 1, 200);
        let aboutTitleShow = new styleSetterWithTransition(aboutTitle, 'opacity', 1, 500);
        let aboutSubtitleShow = new styleSetterWithTransition(aboutSubtitle, 'opacity', 1, 750);
        let aboutTextShow = new styleSetterWithTransition(aboutText, 'opacity', 1, 1000);

        moveTitle();
        eventHeaderLinks();
        aboutImageShow.setStyle();
        aboutTitleShow.setStyle();
        aboutSubtitleShow.setStyle();
        aboutTextShow.setStyle();

        hamburger.style.display = 'flex';
    } else {
        checkOnScroll = false;
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            let hamburgerShow = new styleSetterWithTransition(hamburger, 'opacity', 1, 250);

            hamburgerShow.setStyle();

            mainHeaderLinks.forEach(function (x){
                x.style.display = 'none';
            });

            hamburger.style.display = 'flex';
        } else {
            mainHeaderLinks.forEach(function (x){
                x.style.display = 'block';
            });

            hamburger.style.opacity = '0';
            hamburger.style.display = 'none';
        }
        moveTitle();
    }
    let scrolled = window.scrollY;

    if (scrolled > oneScroll * 14) {
        projectsFirst.style.width = `clamp(0%, 100%, 100%)`;
    } else if(scrolled < oneScroll * 16) {
        projectsFirst.style.width = `clamp(0%, 0%, 100%)`;
    }

    if (scrolled > oneScroll * 14 + window.innerHeight) {
        projectsSecond.style.width = `clamp(0%, 75%, 100%)`;
    } else if(scrolled < oneScroll * 16 + window.innerHeight) {
        projectsSecond.style.width = `clamp(0%, 0%, 100%)`;
    }

    if (scrolled > (oneScroll * 14) + (window.innerHeight*2)) {
        projectsThird.style.width = `clamp(0%, 75%, 100%)`;
    } else if(scrolled < (oneScroll * 16) + (window.innerHeight*2)) {
        projectsThird.style.width = `clamp(0%, 0%, 100%)`;
    }

    if (scrolled > (oneScroll * 14) + (window.innerHeight*3)) {
        projectsFourth.style.width = `clamp(0%, 75%, 100%)`;
    } else if(scrolled < (oneScroll * 16) + (window.innerHeight*3)) {
        projectsFourth.style.width = `clamp(0%, 0%, 100%)`;
    }
}

// Background stars
function createBackgroundFigures() {
    const getBgX = background.offsetWidth;
    const getBgY = background.offsetHeight;
    const stars_count = 500;

   for(let i = 1; i <= stars_count; i++) {
       let star = document.createElement('div');
       const randomPosX = getRandomBetween(50, getBgX-50);
       const randomPosY = getRandomBetween(50, getBgY-50);

       star.style.top = `${randomPosY}px`;
       star.style.left = `${randomPosX}px`;
       starArray.push(star);
       background.appendChild(star);
   }
    for(let i = 1; i <= stars_count/2; i++) {
        let star = document.createElement('div');
        const randomPosX = getRandomBetween(100, getBgX-100);
        const randomPosY = getRandomBetween(100, getBgY-100);

        star.style.top = `${randomPosY}px`;
        star.style.left = `${randomPosX}px`;
        starArrayMenu.push(star);
        clickedMenu.appendChild(star);
    }
}

function backgroundAnimation(event) {
    const cX = event.clientX;
    const cY = event.clientY;

    const offsetXe = Math.min(maxMovementEx, Math.max(-maxMovementEx, (cX - window.innerWidth / 2) / window.innerWidth * maxMovementEx));
    const offsetYe = Math.min(maxMovementEx, Math.max(-maxMovementEx, (cY - window.innerHeight / 2) / window.innerHeight * maxMovementEx));

    const offsetX = Math.min(maxMovement, Math.max(-maxMovement, (cX - window.innerWidth / 2) / window.innerWidth * maxMovement));
    const offsetY = Math.min(maxMovement, Math.max(-maxMovement, (cY - window.innerHeight / 2) / window.innerHeight * maxMovement));

    starArrayMenu.forEach(function(star, index, array) {
        if (index <= array.length/2) {
            star.style.transform = `translate(${offsetXe}px, ${offsetYe}px)`;
        } else {
            star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });
}

function homeSection() {window.scrollTo(0, 0);}
function aboutSection() {aboutContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function projectsSection() {projectContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function contactSection() {contactContent.scrollIntoView({block: 'center', behavior: 'smooth'});}
function homeSectionFromHamMenu() {
    scrollToSection(homeSection);
}

function aboutSectionFromHamMenu() {
    scrollToSection(aboutSection);
}

function projectsSectionFromHamMenu() {
    scrollToSection(projectsSection);
}

function contactSectionFromHamMenu() {
    scrollToSection(contactSection);
}

// Listeners
hamburger.addEventListener('mouseover', function(){
    const width = Math.abs(66.6);
    if (hamMenuClicked === false) {
        hamFirstLine.style.width = `${width}%`;
        hamSecondLine.style.width = `${width}%`;
    }
});

hamburger.addEventListener('mouseout', function(){
    hamLineArray.forEach(function (elem){
        hamFirstLine.style.width = `100%`;
        hamSecondLine.style.width = `100%`;
    });
});

hamburger.addEventListener('click', hamburgerMenuInteract);

footerBackTop.addEventListener('click', homeSection);

document.addEventListener('mousemove', backgroundAnimation);
mainHeader.addEventListener('mousemove', backgroundAnimation);
clickedMenu.addEventListener('mousemove', backgroundAnimation);

let imgScrollScale = 0.3;
document.addEventListener('scroll', function(x){
    let elements = document.querySelectorAll('.scrolling');
    let rocketFire = document.querySelector('.loader-rocket-fire');
    let scrolled = window.scrollY;

    rocketFire.style.boxShadow = `clamp(1px, ${scrolled/75}px, 15px) clamp(1px, ${scrolled/75}px, 15px) clamp(15px, ${scrolled/50}px, 25px) clamp(1px, ${scrolled/100}px, 5px) #ffc65c`;

    elements.forEach(function (elem) {
        elem.style.transform = `scale(clamp(0, ${1 - scrolled/250}, 1))`;
    });

    if(scrolled <= 0) {
        rocketLaunch.style.transition = 'transform 0.3s ease-in-out';
        rocketLaunch.style.transform = 'rotate(0deg)';
    } else {
        rocketLaunch.style.transition = 'transform 0.05s linear';
        rocketLaunch.style.transform = `rotate(${180 - scrolled/565}deg) translate(${-scrolled * 0.05}px, ${-scrolled}px)`;
    }

    starArray.forEach(function(star, index, array) {
        if (index <= array.length/2) {
            star.style.transform = `translateY(${-scrolled * 0.25}px)`;
        } else {
            star.style.transform = `translateY(${-scrolled * 0.35}px)`;
            star.style.backgroundColor = '#606060';
        }
    });
});

document.body.onload = function () {
    scrollButton();
    addContentTitleText();
    scrollAtTop();
    createBackgroundFigures();
}