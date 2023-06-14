//Some basic variables are created here
const nameField = document.querySelector('[name-field]');
const classField = document.querySelector('[class-field]');
const radioButtons = document.querySelectorAll('[term]');
const saveInfoButton = document.querySelector('[save-information]');
const termLabels = document.querySelectorAll('[term-label]');
const basicInformation = document.querySelector('.basic-information');
const subjectsSelection = document.querySelector('.subjects-selection');

var studentName;
var studentClass;
var examinationTerm;

//Each radio button is attached to an event listener.
//The examination term is saved when any of the radio buttons is clicked.
radioButtons.forEach(function(button, index) {
  button.addEventListener('click', function() {
    examinationTerm = termLabels[index].textContent;
  })
});

//This button will save all the information entered from the section
saveInfoButton.addEventListener('click', function() {
  studentName = nameField.value;
  studentClass = classField.value;

  //Ensures student name is entered, the class is selected, and the examination term is selected
  if (!studentName || !studentClass || !examinationTerm) {
    alert("Please fill in all the fields and select the examination term.");
  }
  //Moves to the next section
  else {
    $(function() {
      $('.basic-information').hide();
      $('.subjects-selection').show(600);
      nameField.value = '';
    })
  }
})
