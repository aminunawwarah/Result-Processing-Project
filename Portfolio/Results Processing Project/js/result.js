const resultSection = document.querySelector('.result-preview');
const downloadButton = document.querySelector('[data-download]');
const finishButton= document.querySelector('[data-finish]');
const resultTable = document.querySelector('table');
const resultDetail = document.querySelector('.the-result');

var headings = ['Subjects', 'Scores', 'Grades'];
var data = [];
var tableRows = [];
var tableData = [];
var total = 0;
var average;
var grade;

//Download the result 
function download() {
  alert('Still under development...');
}
//Calculate the total score and the average
function calculate() {
  total = 0;
  average = 0;
  for (var i = 0; i < selectedSubjects.length; i++) {
    total += scores[i];
  }
  average = total / selectedSubjects.length;
}

function createTableContent() {
  tableRows = [];
  for (var i = 0; i < selectedSubjects.length; i++) {
    tableData = [];

    assignGrade(i);
    tableData[0] = selectedSubjects[i];
    tableData[1] = scores[i];
    tableData[2] = grade;
    
    tableRows[i] = tableData;
  }
}

function assignGrade(index) {
  if (scores[index] < 50) grade = 'F';
    else if ((scores[index] >= 50) && (scores[index] < 60)) grade = 'C';
    else if ((scores[index] >= 60) && (scores[index] < 70)) grade = 'B';
    else grade = 'A';
}

//Create a table showing the selected subjects with their scores and some other information
function showResult() {
  document.querySelector('table').innerHTML = '';
  var tableHead = document.createElement('thead');
  var tableBody = document.createElement('tbody');

  for (var i = 0; i < headings.length; i++) {
    var thead = document.createElement('th');
    thead.innerHTML = headings[i];
    tableHead.appendChild(thead);
  }

  for (var i = 0; i < selectedSubjects.length; i++) {
    var rows = document.createElement('tr');

    for (var j = 0; j < headings.length; j++) {
      data[j] = document.createElement('td');
      rows.appendChild(data[j]);
    }

    assignGrade(i);
    data[0].innerHTML = selectedSubjects[i];
    data[1].innerHTML = scores[i];
    data[2].innerHTML = grade;

    data[1].style.textAlign = 'center';
    data[2].style.textAlign = 'center';

    tableBody.appendChild(rows);
  }
  resultTable.appendChild(tableHead);
  resultTable.appendChild(tableBody);
  calculate();
}

function retrieveInformation() {
  document.querySelector('.student-name').innerHTML = `${studentName}`;
  document.querySelector('.student-class').innerHTML = `${studentClass}`;
  document.querySelector('.examination-term').innerHTML = `${examinationTerm}`;
  document.querySelector('.total-score').innerHTML = total;
  document.querySelector('.average').innerHTML = average;
}

finishButton.addEventListener('click', function() {
  $(function() {
    $('.result-preview').hide();
    $('.basic-information').show(600);
  })
});

downloadButton.addEventListener('click', function() {
  createTableContent();
  download();
})
