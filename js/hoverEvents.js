let contentTitleHov = document.getElementById('content-title');
let clickedMenuLinks = document.querySelectorAll('#clicked-menu a');
let workingTextTitles = document.querySelectorAll('.working-text-titles');
let projectBoxos = document.querySelectorAll('.project-box');
let progressBar = document.getElementById('progress-bar');
let quotes = document.getElementById('quote');

let pointer = document.querySelector('.pointer');
let cursorCircle = document.querySelector('.circle');
let cursorDot = document.querySelector('.dot');

clickedMenuLinks.forEach(function (link) {
    link.addEventListener('mouseover', function () {
        cursorCircle.style.width = '150px';
        cursorCircle.style.height = '150px';
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    link.addEventListener('mouseout', function () {
        cursorCircle.style.width = '45px';
        cursorCircle.style.height = '45px';
        cursorCircle.style.backgroundColor = 'transparent';
    });
});

progressBar.addEventListener('mouseover', function () {
    cursorCircle.style.backgroundColor = '#D5CDC4';
});
progressBar.addEventListener('mouseout', function () {
    cursorCircle.style.backgroundColor = 'transparent';
});

quotes.addEventListener('mouseover', function () {
    cursorCircle.style.backgroundColor = '#D5CDC4';
});
quotes.addEventListener('mouseout', function () {
    cursorCircle.style.backgroundColor = 'transparent';
});

workingTextTitles.forEach(function (title) {
    title.addEventListener('mouseover', function () {
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    title.addEventListener('mouseout', function () {
        cursorCircle.style.backgroundColor = 'transparent';
    });
});

projectBoxos.forEach(function (box) {
    box.addEventListener('mouseover', function () {
        cursorCircle.innerHTML = '<b>Slide</b>';
        cursorCircle.style.width = '150px';
        cursorCircle.style.height = '150px';
        cursorCircle.style.backgroundColor = '#D5CDC4';
    });
    box.addEventListener('mouseout', function () {
        cursorCircle.style.width = '45px';
        cursorCircle.style.height = '45px';
        cursorCircle.innerHTML = '';
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
    cursorCircle.style.backgroundColor = '#D5CDC4';
});

contentTitleHov.addEventListener('mouseout', function (){
    cursorCircle.style.backgroundColor = 'transparent';
});


