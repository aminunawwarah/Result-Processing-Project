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
  var file = new jsPDF();
    
  file.addImage(logo, 10, 10, 50, 50);
  file.setFont('Nunito-Bold');
  file.setFontSize(30);
  file.text('NAWWARAH ACADEMY', 66, 20);
  file.setFontSize(23);
  file.text('The Right Environment for Learning', 66, 35);
  file.setFontSize(10);
  file.setFont('Nunito-Regular');
  file.text('Phone: 123-456-789', 66, 45);
  file.text('Email: nawwarahacademy@edu.ln', 66, 50);
  file.setFontSize(15);
  file.text(`Student Name:  ${studentName}`, 15, 70);
  file.text(`Student Class: ${studentClass}`, 15, 80);
  file.text(`Examination Term: ${examinationTerm}`, 15, 90);
  file.autoTable({
    head: [['Subjects', 'Scores', 'Grades']],
    body: tableRows,
    startY: 110,
    theme: 'grid',
    styles: {
      font: 'Poppins-Regular',
      fontStyle: 'normal',
      fontSize: 16
    },
    headStyles: {
      fillColor: [155, 100, 170],
      halign: 'center'
    },
    columnStyles: {
      0: {
          halign: 'left'
      },
      1: {
          halign: 'center'
      },
      2: {
          halign: 'center'
      }
    }
  });
  file.text(`Total Score: ${total}`, 15, 240);
  file.text(`Average: ${average}`, 15, 250);
  file.save(`${studentName}.pdf`);
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

//Create the content of the table for the PDF file
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

//Assign grades based on the value passed to the function
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

//Retrive some information to be used in the result preview and the  PDF file
function retrieveInformation() {
  document.querySelector('.student-name').innerHTML = `${studentName}`;
  document.querySelector('.student-class').innerHTML = `${studentClass}`;
  document.querySelector('.examination-term').innerHTML = `${examinationTerm}`;
  document.querySelector('.total-score').innerHTML = total;
  document.querySelector('.average').innerHTML = average;
}

//Go back process a new result 
finishButton.addEventListener('click', function() {
  $(function() {
    $('.result-preview').hide();
    $('.basic-information').show(600);
  })
});

//Download the file
downloadButton.addEventListener('click', function() {
  createTableContent();
  download();
})
