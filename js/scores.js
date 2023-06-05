const scoresSection = document.querySelector('.scores');
const confirmScoresButton = document.querySelector('[confirm-scores]');
const changeScoresButton = document.querySelector('[go-back-to-fields]');

//Show the subjects with their scores
function showSubjectsScores() {
  scoresSection.innerHTML = '';
  scoresSection.innerHTML += `<span class="bold">Subjects</span>
                              <span class="bold">Scores</span>`
  for (var i = 0; i < selectedSubjects.length; i++) {
    scoresSection.innerHTML += `<span>${selectedSubjects[i]}</span>
                                <span>${scores[i]}</span>`;
  }
}

//Proceed to the next section if no correction is needed
confirmScoresButton.addEventListener('click', function() {
  $(function() {
    $('.subjects-scores').hide();
    $('.result-preview').show(600);
  })
  showResult();
  retrieveInformation();
});

//Go back if some corrections are needed before proceeding the next section
changeScoresButton.addEventListener('click', function() {
  $(function() {
    $('.subjects-scores').hide();
    $('.scores-input').show(600);
  })
});
