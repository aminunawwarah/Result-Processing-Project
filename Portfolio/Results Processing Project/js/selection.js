const subjectSelectionSection = document.querySelector('.checkboxes');
const saveSelectionButton = document.querySelector('[save-selected-subjects]');

//The 'subjecst' array is an array of the subjects that the user can select.
var subjects = ['Agricultural Science', 'Arabic Language', 'Basic Science','Business Studies', 'Basic Technology',
                'Computer Studies', 'English Language', 'Cultural and Creative Arts','Home Economics',
                'Mathematics', 'Physical and Health Education', 'Social Studies', 'Introductory Technology'];

var selectedSubjects = [];
var checkboxes = [];
var labels = [];
var numberOfSubjects = subjects.length;

//Checkboxes will be created, each containing a label with the subjects available for selection
function createCheckBoxes() {
  for (var i = 0; i < numberOfSubjects; i++) {
    subjectSelectionSection.innerHTML += `<input data-checkbox type="checkbox" id="${i}">
                                          <label data-checkbox-label for="${i}">${subjects[i]}</label><br>`;
  }

  checkboxes = subjectSelectionSection.querySelectorAll('input');
  labels = subjectSelectionSection.querySelectorAll('label');
}

//Save the selected subjects.
//Before proceeding to the scores part, a preview of the selected subjects will be shown
function saveSelectedSubjects() {
  selectedSubjects = [];
  for (var i = 0; i < numberOfSubjects; i++) {
    if (checkboxes[i].checked) {
      selectedSubjects[i] = labels[i].innerHTML;
    }
  }
  //Filter out only the selected subjects
  selectedSubjects = selectedSubjects.filter(subject => {
    return (subject != undefined)
  });
}

createCheckBoxes();

saveSelectionButton.addEventListener('click', function() {
  saveSelectedSubjects();
  //Ensure that 10 subjects are selected
  if (selectedSubjects.length !== 10) {
    alert('Please select 10 subjects.');
  } else {
    $(function() {
      $('.subjects-selection').hide();
      $('.selected-subjects').show(600);
    })
    showSelectedSubjects();
  }
});
