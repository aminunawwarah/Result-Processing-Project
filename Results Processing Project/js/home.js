const nameField = document.querySelector('[user-name]');
const passwordField = document.querySelector('[user-password]');
const pageBody = document.querySelector('body');
const mainContent = document.querySelector('.main-content');
const homeSection = document.querySelector('.home');
const processButton = document.querySelector(".compute-new");
const processLink = document.querySelector('.processing-link')
const cardContent = document.querySelectorAll('.card-content');
const galleryText = document.querySelectorAll('.gallery-text');
const galleryContent = document.querySelectorAll('.gallery-content');

//When clicked, the user can process a new result and download it as PDF file.
processButton.addEventListener('click', function() {
    processLink.click();
});

/*Iterate each cards created from the HTML. Each card will assigned to an event listener.
* When you hover over a card, its size will occupy its current container with a box shadow.
* When the mouse pointer is taken away from the card, then it returns to its original size 
* and the box shadow disappears.
*/
cardContent.forEach(card => {
    card.addEventListener('mouseover', function() {
        card.style.width = card.style.height = '100%';
        card.style.boxShadow = '0 0 15px #1A1A1A';
    })
    card.addEventListener('mouseout', function() {
        card.style.width = card.style.height = '95%';
        card.style.boxShadow = 'none';
    })
});

/*Iterate each gallery item.
* Each gallery item is containing a background image with some texts.
* On mouse hover event, the gallery element increases in size and the texts will appear.
* On mouse out event, the gallery element returns to its original size and the text disappears.
*/
galleryContent.forEach((gallery, index) => {
    gallery.addEventListener('mouseover', function() {
        gallery.style.width = gallery.style.height = '100%';
        galleryText[index].style.display = 'block';

    })
    gallery.addEventListener('mouseout', function() {
        gallery.style.width = gallery.style.height = '93%';
        galleryText[index].style.display = 'none';
    })
});
