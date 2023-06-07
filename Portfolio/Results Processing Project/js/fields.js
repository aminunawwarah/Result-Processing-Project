const fieldsSection = document.querySelector('.text-fields');
const saveScoresButton = document.querySelector('[save-scores]');
var scoresFields = [];
var scores = [];

//Number fields are created where the user can input the score of each subject
//To prevent bugs, only numbers are allowed.
function createTextFields() {
  fieldsSection.innerHTML = '';

  for (var i = 0; i < selectedSubjects.length; i++) {
    fieldsSection.innerHTML += `<label for="${selectedSubjects[i]}">${selectedSubjects[i]}</label>
                                <input type="number" id="${selectedSubjects[i]}" min="0" max="100">`;
  }
}

//Retrieves all the scores entered in the number fields
function retrieveScores() {
  scoresFields = fieldsSection.querySelectorAll('input');
  for (var i = 0; i < scoresFields.length; i++) {
    scores[i] = Number(scoresFields[i].value);
  }
}

//Save the scores but will be checked to ensure that no score is over 100
saveScoresButton.addEventListener('click', function(){
  retrieveScores();

  //Checks to see if there is any score over 100
  var response = scores.some(function(score) {
    return score > 100;
  });
  //Prompt the user to ensure that no score is over 100
  if (response) alert('Please make sure that no score is greater than 100.');
  else {
    $(function() {
      $('.scores-input').hide();
      $('.subjects-scores').show(600);
    })
    showSubjectsScores();
  }
});
