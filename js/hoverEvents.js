let mainHeaderLinksHov = document.querySelectorAll('.main-header-links');
let contentTitleHov = document.getElementById('content-title');
let clickedMenuLinks = document.querySelectorAll('#clicked-menu a');
let projectsTexts = document.querySelectorAll('.projects-hover-text');

let workingText1 = document.querySelector('#working-con h1:nth-child(1)');
let workingText2 = document.querySelector('#working-con h1:nth-child(2)');
let workingText3 = document.querySelector('#working-con h1:nth-child(3)');
let workingText4 = document.querySelector('#working-con h1:nth-child(4)');
let workingText5 = document.querySelector('#working-con h1:nth-child(5)');
let workingTextsArray = [workingText1, workingText2, workingText3, workingText4, workingText5];
let imageOnHover = document.getElementById('image-tracker');

let pointer = document.querySelector('.pointer');
let cursorCircle = document.querySelector('.circle');
let cursorDot = document.querySelector('.dot');
mainHeaderLinksHov.forEach(function (link) {
    link.addEventListener('mouseover', function () {
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    link.addEventListener('mouseout', function () {
        cursorCircle.style.backgroundColor = 'transparent';
    });
});

clickedMenuLinks.forEach(function (link) {
    link.addEventListener('mouseover', function () {
        cursorCircle.style.width = '150px';
        cursorCircle.style.height = '150px';
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    link.addEventListener('mouseout', function () {
        cursorCircle.style.width = '75px';
        cursorCircle.style.height = '75px';
        cursorCircle.style.backgroundColor = 'transparent';
    });
});

projectsTexts.forEach(function (text) {
    text.addEventListener('mouseover', function () {
        cursorCircle.style.width = '150px';
        cursorCircle.style.height = '150px';
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    text.addEventListener('mouseout', function () {
        cursorCircle.style.width = '75px';
        cursorCircle.style.height = '75px';
        cursorCircle.style.backgroundColor = 'transparent';
    });
});

document.addEventListener('mousemove', function (p) {
    const pX = p.clientX;
    const pY = p.clientY;

    cursorCircle.style.transform = `translate(${pX - cursorCircle.offsetWidth / 2}px, ${pY - cursorCircle.offsetHeight / 2}px)`;
    cursorDot.style.transform = `translate(${pX}px, ${pY}px)`;
});

contentTitleHov.addEventListener('mouseover', function (){
    cursorCircle.style.width = '150px';
    cursorCircle.style.height = '150px';
    cursorCircle.style.backgroundColor = '#D5CDC4';
});

contentTitleHov.addEventListener('mouseout', function (){
    cursorCircle.style.width = '75px';
    cursorCircle.style.height = '75px';
    cursorCircle.style.backgroundColor = 'transparent';
});

workingText1.addEventListener('mousemove', function () {
    imageOnHover.style.backgroundImage = 'url("image/working1.jpg")';
});
workingText2.addEventListener('mousemove', function () {
    imageOnHover.style.backgroundImage = 'url("image/working2.png")';
});
workingText3.addEventListener('mousemove', function () {
    imageOnHover.style.backgroundImage = 'url("image/working3.jpg")';
});
workingText4.addEventListener('mousemove', function () {
    imageOnHover.style.backgroundImage = 'url("image/working4.png")';
});
workingText5.addEventListener('mousemove', function () {
    imageOnHover.style.backgroundImage = 'url("image/working5.jpg")';
});

workingTextsArray.forEach(function (elem) {
    elem.addEventListener('mousemove', function (p) {
        const pX = p.clientX;
        const pY = p.clientY;
        const centerCursorX = pX - (imageOnHover.offsetHeight/2);
        const centerCursorY = pY - (imageOnHover.offsetHeight/2);

        imageOnHover.style.opacity = '1';
        imageOnHover.style.width = '350px';
        imageOnHover.style.top = `${centerCursorY}px`;
        imageOnHover.style.left = `${centerCursorX}px`;

        cursorCircle.style.display = 'none';
    });
    elem.addEventListener('mouseout', function () {
        imageOnHover.style.opacity = '0';
        imageOnHover.style.width = '0px';
        imageOnHover.style.backgroundImage = 'url("image/working1.jpg")';
        workingText1.style.transform = `translate(0, 0)`;

        cursorCircle.style.display = 'block';
    });
});


