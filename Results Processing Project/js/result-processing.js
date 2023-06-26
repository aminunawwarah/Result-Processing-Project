const studentsNamesSection = document.querySelector('.students-names');
const studentsResultsSection = document.querySelector('.result-show');

var studentsNames;
var subjectGrade;
var arrayIndex;
var tableHeadings = ['Subjects', 'Scores', 'Grades'];
var allStudents = [];
var tableRowsContent = [];
var tableDataContent = [];
var sum = 0;
var averageScore = 0;

/*Compares the value passed to it to see what grade to assign
* The grade is 'A' if the score if over 70; 'B' for score 
* between 60 and 69; 'C' for score between 50 and 59; finally
* 'F' for score less than 50.
*/
function assignGrades(score) {
    if (score < 50) subjectGrade = 'F';
      else if ((score >= 50) && (score < 60)) subjectGrade = 'C';
      else if ((score >= 60) && (score < 70)) subjectGrade = 'B';
      else subjectGrade = 'A';
}

//List all the students' names. The names are retrieved from the records.
function listNames() {
    var lists = document.createElement('ul');

    for (var i = 0; i < records.length; i++) {
        allStudents[i] = records[i].studentName;
    }

    for (var i = 0; i < allStudents.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = allStudents[i];
        lists.appendChild(listItem);
    }
    studentsNamesSection.appendChild(lists);
    studentsNames = studentsNamesSection.querySelectorAll('li');
}

//Calculates the sum and the average
function sumScores(index) {
    sum = 0;
    averageScore = 0;

    for (var i = 0; i < records[index].examinationScores.length; i++) {
      sum += records[index].examinationScores[i];
    }
    averageScore = sum / records[index].examinationScores.length;
}

//Creates a button that when clicked, the interface for computing a new result will appear
function createButton() {
    var fileDownload = document.createElement('button');

    fileDownload.innerHTML = 'Save';
    studentsResultsSection.appendChild(fileDownload);
    fileDownload.addEventListener('click', function() {
        downloadCurrentResult(arrayIndex);
    })
}  

//Creates and shows the result table when the name of the student is clicked
function createResultTable(index) {
    var resultTable = document.createElement('table');
    var tableHead = document.createElement('thead');
    var tableBody = document.createElement('tbody');
    var nameText = document.createElement('p'); 
    var tableData = [];

    resultTable.setAttribute('width', '100%');
    resultTable.setAttribute('border', '1');

    for (var i = 0; i < tableHeadings.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = tableHeadings[i];
        tableHead.appendChild(th);
    }

    for (var i = 0; i < records[index].subjectsOffered.length; i++) {
        var rows = document.createElement('tr');
        
        assignGrades(records[index].examinationScores[i]);

        for (var j = 0; j < 3; j++) {    
            tableData[j] = document.createElement('td');
            rows.appendChild(tableData[j]);
        }

        tableData[0].innerHTML = records[index].subjectsOffered[i];
        tableData[1].innerHTML = records[index].examinationScores[i];
        tableData[2].innerHTML = subjectGrade;

        tableData[1].style.textAlign = 'center';
        tableData[2].style.textAlign = 'center';

        tableBody.appendChild(rows);
    }
    nameText.innerHTML = `Student Name: ${records[index].studentName}`;
    resultTable.appendChild(tableHead);
    resultTable.appendChild(tableBody);
    studentsResultsSection.appendChild(nameText);
    studentsResultsSection.appendChild(resultTable);
    sumScores(index);
    showSum(arrayIndex);
    createButton();
}

//Shows the sum and the average of the exam score
function showSum() {
    var sumSection = document.createElement('div');
    var totalMarks = document.createElement('p');
    var averageMark = document.createElement('p');

    totalMarks.innerHTML = `Total score: ${sum}`;
    averageMark.innerHTML = `Average score: ${averageScore}`;
    sumSection.appendChild(totalMarks);
    sumSection.appendChild(averageMark);
    studentsResultsSection.appendChild(sumSection);
}

//Assigns event listener to each list. When the name of the student is clicked, the student's result
//all appear and can be downloaded.
function linkNames() {
    studentsNames.forEach((list, index) => {
        list.addEventListener('click', function(arg) {
            studentsResultsSection.innerHTML = '';
            arrayIndex = index;
            createResultTable(arrayIndex);
        })
    });
}

//Creates the table content for the use in the PDF file
function createFileTableContent(index) {
    tableRowsContent = [];
    for (var i = 0; i < records[index].subjectsOffered.length; i++) {
      tableDataContent = [];
  
      assignGrades(records[index].examinationScores[i]);
      tableDataContent[0] = records[index].subjectsOffered[i];
      tableDataContent[1] = records[index].examinationScores[i];
      tableDataContent[2] = subjectGrade;
      
      tableRowsContent[i] = tableDataContent;
    }
  }

//Download the student's result as a PDF file with the file name as the student's name
function downloadCurrentResult(index) {
    var file = new jsPDF();
    
    createFileTableContent(index);
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
    file.text(`Student Name:  ${records[index].studentName}`, 15, 70);
    file.text(`Student Class: ${records[index].studentClass}`, 15, 80);
    file.text('Examination Term: 3rd Term', 15, 90);
    file.autoTable({
        head: [['Subjects', 'Scores', 'Grades']],
        body: tableRowsContent,
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
    file.text(`Total Score: ${sum}`, 15, 240);
    file.text(`Average: ${averageScore}`, 15, 250);
    file.save(`${records[index].studentName}.pdf`);
}

listNames();
linkNames();
