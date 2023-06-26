/*
* A text animation showing some text
*/
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navigationLinks = document.querySelector('nav');
const links = document.querySelectorAll('.link');
var typeAnimation = new Typed('.dynamic-text', {
    strings: ['a student at ALX.', 'proud of ALX.', 'learning how to code.', 
    'learning Front-end technologies.'],
    loop: true,
    typeSpeed: 50,
    backSpeed: 130,
    backDelay: 0.9
});

var hiddenElements = document.querySelectorAll('.hidden');
var listeners = new IntersectionObserver((items) => {
    items.forEach((item) => {
        if (item.isIntersecting) {
            item.target.classList.add('show');
        } else {
            item.target.classList.remove('show');
        }
    })
});

hiddenElements.forEach((element) => {
    listeners.observe(element);
});

menuIcon.addEventListener('click', function() {
    navigationLinks.style.transform = 'translateY(0)';

});

closeIcon.addEventListener('click', function() {
    navigationLinks.style.transform = 'translateY(-150%)';
});

links.forEach(link => {
    link.addEventListener('click', function() {
        navigationLinks.style.transform = 'translateY(-150%)';
    })
})