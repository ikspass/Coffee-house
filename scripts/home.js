let offset = 0;
let slideWidth = document.getElementById('slide').offsetWidth;
let maxSlideWidth = slideWidth * 2;

const sliderLine = document.querySelector('.slides');


window.addEventListener('resize', function(){
    slideWidth = document.getElementById('slide').offsetWidth;
    maxSlideWidth = slideWidth * 2;
    offset = 0;
    sliderLine.style.left = -offset + 'px';
    makeTimer();
    changeControls();
});


var timer = 0;

makeTimer();
changeControls();

function makeTimer(){
    clearInterval(timer);
    timer = setInterval(function(){
        offset += slideWidth;
        if(offset > maxSlideWidth){
            offset = 0;
        }
        sliderLine.style.left = -offset + 'px';
        changeControls();
    },7000);
}

function changeControls(){
    if(offset == 0){
        document.getElementById('control1').className = 'control active'
        document.getElementById('control2').className = 'control'
        document.getElementById('control3').className = 'control'
    }
    if(offset == slideWidth){
        document.getElementById('control1').className = 'control'
        document.getElementById('control2').className = 'control active'
        document.getElementById('control3').className = 'control'
    }
    if(offset == maxSlideWidth){
        document.getElementById('control1').className = 'control'
        document.getElementById('control2').className = 'control'
        document.getElementById('control3').className = 'control active'
    }
}

if (window.matchMedia("(min-width: 769px) and (max-width: 1440px)").matches){
    document.addEventListener('DOMContentLoaded', function() {
        var elements = document.querySelectorAll('.image-about');
        
        elements.forEach(function(element) {
        var img = new Image();
    
        img.src = window.getComputedStyle(element).backgroundImage.slice(4, -1).replace(/"/g, "");
        img.width = img.width * 1.1;
        img.height = img.height * 1.1;


        img.onload = function() {
            var width = this.width;
            var height = this.height;
    
            element.style.backgroundSize = width + 'px ' + height + 'px';
        }
        element.style.transition = 'background-size 0.5s ease';

        element.addEventListener('mouseover', function() {
            var hoverWidth = img.width * 0.9;
            var hoverHeight = img.height * 0.9;
            element.style.backgroundSize = hoverWidth + 'px ' + hoverHeight + 'px';
        });
    
        element.addEventListener('mouseout', function() {
            element.style.backgroundSize = img.width + 'px ' + img.height + 'px';
        });
        });
    });

    document.querySelector('#buttonRight').addEventListener('click', function(){
        offset += slideWidth;
        makeTimer();
        if (offset > maxSlideWidth) offset = 0;
        sliderLine.style.left = -offset + 'px';
        changeControls();
    });
    document.querySelector('#buttonLeft').addEventListener('click', function(){
        offset -= slideWidth;
        makeTimer();
        if (offset < 0) offset = maxSlideWidth;
        sliderLine.style.left = -offset + 'px';
        changeControls();
    });
}

if (window.matchMedia("(max-width: 380px)").matches){
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    console.log('aboba')

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event){
        const firstTouch = event.touches[0];

        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }

    const sliderLine = document.querySelector('.slides');

    function handleTouchMove(event){
        if(!x1 || !y1) return false;
        makeTimer();

        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;

        let xDiff = x2 - x1;
        let yDiff = y2 - y1;

        if(Math.abs(xDiff)>Math.abs(yDiff)){
            if(xDiff > 0){
                //двигать слайдер влево
                offset -= slideWidth;
                if (offset < 0) offset = maxSlideWidth;
                sliderLine.style.left = -offset + 'px';
                changeControls();
            }
            else {
                // двигать слайдер вправо
                offset += slideWidth;
                if (offset > maxSlideWidth) offset = 0;
                sliderLine.style.left = -offset + 'px';
                changeControls();
            }
        }
        x1 = null;
        y1 = null;
    }
}

let burgerButton = document.getElementById('burger-button');
let burgerMenu = document.getElementById('burger-menu');

burgerButton.addEventListener('click', function(){
    burgerMenu.classList.toggle('active');
    burgerButton.classList.toggle('active')
});

let links = document.querySelectorAll(".nav > .nav-item");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(){
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior:"smooth"});
    }
}

let burgerLinks = document.querySelectorAll(".burger-nav > .burger-link");
for (let i = 0; i < burgerLinks.length; i++) {
    burgerLinks[i].onclick = function(){
        document.getElementById(burgerLinks[i].getAttribute("data-link")).scrollIntoView({behavior:"smooth"});
        burgerButton.className = 'header-button';
        burgerMenu.className = 'burger-container';
    }
}