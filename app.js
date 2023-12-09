let background = document.getElementById('background');
let sliders = document.querySelectorAll('.slideDefine');

let checkOnScroll = false;
let lines = document.querySelectorAll('#content-title :nth-child(n)');
let contentTitle = document.getElementById('content-title');
let mainHeader = document.getElementById('main-header');

let contentAbout = document.getElementById('about-content');
let aboutTitle = document.getElementById('about-title');

let bg_height = 100.0;
background.style.height = bg_height + 'vh';

let scrolled = false;
function scrollAtOnce() {
    if (scrolled === false) {
        contentAbout.scrollIntoView({behavior: "instant", block: "center"});
        scrolled = true;
    }
}

function moveTitle() {
    const changePosX1 = '-50%';
    const changePosX2 = '50%';

    const changeAngleX1 = '90deg';
    const changeAngleX2 = '-90deg';

    for (let i = 1; i <= lines.length; i++) {
        let line = document.querySelector(`#content-title :nth-child(${i})`);

        if(checkOnScroll === false) {
            if (i % 2 === 0) {
                line.style.opacity = '1';
                line.style.transform = `translateX(0%) rotateX(0deg)`;
            } else {
                line.style.opacity = '1';
                line.style.transform = `translateX(0%) rotateX(0deg)`;
            }
        } else if (checkOnScroll === true) {
            if (i % 2 === 0) {
                line.style.opacity = '0';
                line.style.transform = `translateX(${changePosX2}) rotateX(${changeAngleX2})`;
            } else {
                line.style.opacity = '0';
                line.style.transform = `translateX(${changePosX1}) rotateX(${changeAngleX1})`;
            }
        }
    }
}

function scrollButton() {
    let scrollButton = document.getElementById('scroll-button');
    let dot = document.getElementById('dot');

    const dot_size = 25;
    dot.style.width = `${dot_size}px`;
    dot.style.height = `${dot_size}px`;

    scrollButton.addEventListener('mousemove', function (x){
        let dotPosY = scrollButton.offsetHeight;
        let cursorPosY = x.clientY/2;

        if (dotPosY >= Math.floor(cursorPosY/2.65)) {
            dot.style.transform = `translateY(-200%)`;

            scrollButton.addEventListener('click', function(){
                mainHeader.scrollIntoView({behavior: "instant", block: "start"});
            });
        } else {
            dot.style.transform = `translateY(200%)`;

            scrollButton.addEventListener('click', function(){
                contentAbout.scrollIntoView({behavior: "instant", block: "center"});
            });
        }

        console.log(cursorPosY/2.7);
    });
    scrollButton.addEventListener('mouseout', function (){
        dot.style.transform = 'translateY(0%)';
    })
}

let oneScroll = 100;
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > oneScroll*3 || document.documentElement.scrollTop > oneScroll*3) {
        checkOnScroll = true;
        moveTitle();
        bg_height = 0;

        aboutTitle.style.opacity = '1';
        aboutTitle.style.transform = 'rotate(0deg)';
        background.style.borderRadius = '50% 50% 50% 50% / 0% 0% 100% 100%';
        sliders.forEach(function (element){
            element.style.height = bg_height + 'vh';
            element.style.borderRadius = '50% 50% 50% 50% / 0% 0% 100% 100%';
        })
    } else {
        checkOnScroll = false;
        moveTitle();
        bg_height = 100;

        aboutTitle.style.opacity = '0';
        aboutTitle.style.transform = 'rotateX(-90deg)';
        background.style.borderRadius = '0%';
        sliders.forEach(function (element){
            element.style.height = bg_height + 'vh';
            element.style.borderRadius = '0%';
        })
    }

    background.style.height = bg_height + 'vh';
}

document.body.onload = function () {
    scrollButton();
}
