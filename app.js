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

let line_1 = document.getElementById('content-title-line-1');
let line_2 = document.getElementById('content-title-line-2');
let line_3 = document.getElementById('content-title-line-3');
let lineArray = [line_1, line_2, line_3];

let hamFirstLine = document.querySelector('.hamburger-lines:nth-child(1)');
let hamSecondLine = document.querySelector('.hamburger-lines:nth-child(2)');
let hamThirdLine = document.querySelector('.hamburger-lines:nth-child(3)');
let hamLineArray = [hamFirstLine, hamSecondLine, hamThirdLine];

let menuOnClick = document.getElementById('clicked-menu-container');

let loaded = false;

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

function scrollAtTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let checkOnScroll = false;
function moveTitle() {
    const changePosX1 = '-50%';
    const changePosX2 = '50%';

    const changeAngleX1 = '90deg';
    const changeAngleX2 = '-90deg';

    if(checkOnScroll === false) {
        lineArray.forEach(function (elem){
            elem.style.opacity = '1';
            elem.style.transform = `translateX(0%) rotateX(0deg)`;
        });
    } else if (checkOnScroll === true) {
        lineArray.forEach(function (elem){
            elem.style.opacity = '0';
        });
        line_1.style.transform = `translateX(${changePosX2}) rotateX(${changeAngleX2})`;
        line_2.style.transform = `translateX(${changePosX1}) rotateX(${changeAngleX1})`;
        line_3.style.transform = `translateX(${changePosX2}) rotateX(${changeAngleX2})`;
    }
}

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

    hamFirstLine.style.transform = `rotate(-47.5deg) translateY(${lineWidth/1.75}px)`;
    hamFirstLine.style.width = '100%';

    hamThirdLine.style.transform = `rotate(47.5deg) translateY(-${lineWidth/1.75}px)`;
    hamThirdLine.style.width = '100%';
}

function hamburgerMenuInteract() {
    const widthIncrement = 45;
    const unit = 'svw';
    let clickedMenu = document.getElementById('clicked-menu');
    let clickedMenuLinks = document.querySelectorAll('.clicked-menu-links');

    if (hamMenuClicked === false) {
        let clickedMenuShow = new styleSetterWithTransition(clickedMenu, 'opacity', 1, 1);
        let clickedMenuWidth = new styleSetterWithTransition(clickedMenu, 'width', '100%', 550);
        clickedMenuShow.setStyle();
        clickedMenuWidth.setStyle();
        clickedMenu.style.display = 'flex';

        clickedMenuLinks.forEach(function (elem){
            elem = new styleSetterWithTransition(elem, 'opacity', 1, 1000);
            elem.setStyle();
        })

        onClickLinesAnimation();
        menuOnClick.style.width = `${widthIncrement}${unit}`;
        hamMenuClicked = true;
    } else {
        let clickedContainerHide = new styleSetterWithTransition(menuOnClick, 'width', 0, 700);
        let clickedMenuHideDisplay = new styleSetterWithTransition(clickedMenu, 'display', 'none', 1000);
        let clickedMenuHide = new styleSetterWithTransition(clickedMenu, 'width', '0%', 350);

        hamLineArray.forEach(function (elem){
            elem.style.transform = 'none'
            elem.style.opacity = '1';
            elem.style.width = '100%';
        });
        clickedMenuLinks.forEach(function (elem) {
            elem.style.opacity = '0';
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

function scrollFunction() {
    if (document.body.scrollTop > oneScroll*3 || document.documentElement.scrollTop > oneScroll*3) {
        checkOnScroll = true;

        let aboutImageShow = new styleSetterWithTransition(aboutBoxPortrait, 'opacity', 1, 200);
        let aboutTitleShow = new styleSetterWithTransition(aboutTitle, 'opacity', 1, 500);
        let aboutSubtitleShow = new styleSetterWithTransition(aboutSubtitle, 'opacity', 1, 750);
        let aboutTextShow = new styleSetterWithTransition(aboutText, 'opacity', 1, 1000);
        let hamburgerShow = new styleSetterWithTransition(hamburger, 'opacity', 1, 250);

        moveTitle();
        eventHeaderLinks();
        aboutImageShow.setStyle();
        aboutTitleShow.setStyle();
        aboutSubtitleShow.setStyle();
        aboutTextShow.setStyle();
        hamburgerShow.setStyle();

        hamburger.style.display = 'flex';
    } else {
        checkOnScroll = false;

        moveTitle();
        eventHeaderLinks();

        hamburger.style.opacity = '0';
        hamburger.style.display = 'none';
    }
}

function createBackgroundAnimation() {
    let squaresArray = [];
    const countOfSquares = 264;
    const size = '50px';

    for (let i = 1; i <= countOfSquares; i++) {
        let square = document.createElement('div');
        square.style.width = size;
        square.style.height = size;

        background.appendChild(square);
        squaresArray.push(square);
    }

    function cursorEvent(e) {
        if(checkOnScroll === false) {
            const { clientX, clientY } = e;

            squaresArray.forEach(function (elem) {
                const rect = elem.getBoundingClientRect();
                const elemX = rect.left + rect.width / 2;
                const elemY = rect.top + rect.height / 2;

                const distance = Math.sqrt(Math.pow(clientX - elemX, 2) + Math.pow(clientY - elemY, 2));
                const maxDistance = Math.sqrt(Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2));

                let fillPercentage = 90 -(distance / maxDistance) * 100;
                fillPercentage = Math.max(fillPercentage, 0);
                fillPercentage = Math.min(fillPercentage, 85);

                const angle = Math.atan2(clientY - elemY, clientX - elemX);
                const angleDegrees = angle * (180 / Math.PI);

                elem.style.backgroundImage = `linear-gradient(${angleDegrees}deg, rgba(51, 51, 51, 0.5) ${fillPercentage}%, transparent ${fillPercentage}%)`;
            });
        }
    }

    document.addEventListener('mousemove', cursorEvent);
}

function aboutSection() {aboutContent.scrollIntoView({block: 'center', behavior: 'smooth'});};

// Hamburger events
hamburger.addEventListener('mouseover', function(){
    const width = Math.abs(66.6);
    if (hamMenuClicked === false) {
        hamLineArray.forEach(function (elem){
            elem.style.width = `${width}%`;
        });
    }
});

hamburger.addEventListener('mouseout', function(){
    hamLineArray.forEach(function (elem){
        elem.style.width = '100%';
    });
});

hamburger.addEventListener('click', hamburgerMenuInteract);

document.body.onload = function () {
    scrollButton();
    addContentTitleText();
    scrollAtTop();
    createBackgroundAnimation();
}
