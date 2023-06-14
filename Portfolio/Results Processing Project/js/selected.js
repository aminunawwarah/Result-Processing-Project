const selectedSubjectsList = document.querySelector('.all-selected-subjects');
const confirmSelectionButton = document.querySelector('[confirm-selection]');
const unconfirmSelectionButton = document.querySelector('[go-back-to-selection]');
const domCheckBoxes = document.querySelectorAll('[data-checkbox]');
const domCheckBoxLabel = document.querySelectorAll('[data-checkbox-label]');

//Show the preview of the selected subject
function showSelectedSubjects() {
  selectedSubjectsList.innerHTML = '';
  for (var i = 0; i < selectedSubjects.length; i++) {
    selectedSubjectsList.innerHTML += `<ul><li>${selectedSubjects[i]}</li></ul>`;
  }
}

//Move to the next section where the score of each subject can be entered
confirmSelectionButton.addEventListener('click', function() {
  $(function() {
    $('.selected-subjects').hide();
    $('.scores-input').show(600);
  })
  createTextFields();
});

//Go back to the previous section and modify the subjects selection
unconfirmSelectionButton.addEventListener('click', function() {
  $(function() {
    $('.selected-subjects').hide();
    $('.subjects-selection').show(600);
  })
});
