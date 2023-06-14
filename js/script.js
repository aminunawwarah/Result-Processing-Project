/*
* A text animation showing some text
*/
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
