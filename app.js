let background = document.getElementById('background');
let sliders = document.querySelectorAll('.slideDefine');

let checkOnScroll = false;
let lines = document.querySelectorAll('#content-title :nth-child(n)');
let mainHeader = document.getElementById('main-header');

let contentAbout = document.getElementById('about-content');
let aboutTitle = document.getElementById('about-title');

let line_1 = document.getElementById('content-title-line-1');
let line_2 = document.getElementById('content-title-line-2');
let line_3 = document.getElementById('content-title-line-3');
let lineArray = [line_1, line_2, line_3];

let bg_height = 100.0;
background.style.height = bg_height + 'vh';

function scrollAtTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

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
        let dotPosY = scrollButton.offsetHeight;
        let cursorPosY = x.clientY/2;
        scrollButtonText.style.opacity = '0';

        if (dotPosY >= Math.floor(cursorPosY/2.67)) {
            dot.style.transform = `translateY(-250%)`;

            scrollButton.addEventListener('click', function(){
                window.scrollBy(0, -window.innerHeight);
            });
        } else {
            dot.style.transform = `translateY(250%)`;

            scrollButton.addEventListener('click', function(){
                window.scrollBy(0, window.innerHeight);
            });
        }
    });
    scrollButton.addEventListener('mouseout', function (){
        dot.style.transform = 'translateY(0%)';
        scrollButtonText.style.opacity = '1';
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

let oneScroll = 100;
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > oneScroll*3 || document.documentElement.scrollTop > oneScroll*3) {
        sizeX = 1;
        sizeY = 1;
        checkOnScroll = true;
        moveTitle();

        aboutTitle.style.opacity = '1';
        aboutTitle.style.transform = 'rotate(0deg)';
    } else {
        sizeX = 0;
        sizeY = 0;
        checkOnScroll = false;
        moveTitle();

        aboutTitle.style.opacity = '0';
        aboutTitle.style.transform = 'rotateX(-90deg)';
    }
}

document.body.onload = function () {
    scrollButton();
    addContentTitleText();
    scrollAtTop();
}
