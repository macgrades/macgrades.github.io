document.getElementById('submitBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('transcriptFile');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('pdfFile', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                data.reverse();
                data.forEach(course => {
                    course.id = crypto.randomUUID();
                    courseList.push(course);
                })
                displayCourses();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    fileInput.value = '';
});

//add courses individually
document.getElementById('addCourseBtn').addEventListener('click', function() {
   const courseNameInput = document.getElementById("courseName");
   const gradeInput = document.getElementById("grade");
   const unitsInput = document.getElementById("units");
   const errorContainer = document.getElementById("inputError");

   let courseName = courseNameInput.value;
   const grade = gradeInput.value;
   const units = unitsInput.value;

   if (grade && units && !isNaN(units)) {
       errorContainer.innerHTML = '';
       if (!courseName) {
           courseName = `Course ${courseList.length+1}`;
       }
       let course= {
           code: courseName,
           units: units,
           grade: grade,
           built: true,
           id: crypto.randomUUID()
       };
       courseList.push(course);
       displayCourses();
       courseNameInput.value = '';
   } else {
       errorContainer.innerHTML = 'Enter valid course info';
       errorContainer.style.color = 'red';
   }
});

//Clear courses and clear gpa calculation
document.getElementById("clearCourses").addEventListener('click', function() {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';
    courseList = [];
    const gpaContainer = document.getElementById("GPA");
    gpaContainer.innerHTML = '';
});

let courseList = [];

function displayCourses() {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';
    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        const courseTitle = document.createElement('h3');
        courseTitle.textContent = course.code;
        courseCard.append(courseTitle);

        const gradeInfo = document.createElement('p');
        gradeInfo.innerHTML = `<span class="grade-label">Grade:</span> <span class="grade-value">${course.grade}</span>`;
        courseCard.append(gradeInfo);

        const unitsInfo = document.createElement('p');
        unitsInfo.innerHTML = `<span class="units-label">Units:</span> ${course.units}`;
        courseCard.append(unitsInfo);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteCourse(course.id);
        });

        courseCard.append(deleteButton);

        container.prepend(courseCard);
    });
    console.log(courseList);
    displayGPA();
}

const macGrades = {"A+": 12, "A": 11, "A-": 10,
                        "B+": 9, "B": 8, "B-": 7,
                        "C+": 6, "C": 5, "C-": 4,
                        "D+": 3, "D": 2, "D-": 1,
                        "F": 0};
const standardGrades = {"A+": 4, "A": 3.9, "A-": 3.7,
                            "B+": 3.3, "B": 3, "B-": 2.7,
                            "C+": 2.3, "C": 2, "C-": 1.7,
                            "D+": 1.3, "D": 1, "D-": 0.7,
                            "F": 0};

function calculateGPA(gradeConversion) {
    let pointsAttm = 0.0;
    let pointsEarned = 0.0;

    courseList.forEach(course => {
        let grade = parseFloat(gradeConversion[course.grade]);
        let units = parseFloat(course.units)
        pointsEarned += units*grade;
        pointsAttm += units;
    });
    return pointsEarned/pointsAttm;
}

function displayGPA() {
    const macGPA = calculateGPA(macGrades);
    const standardGPA = calculateGPA(standardGrades);
    const gpaContainer = document.getElementById("GPA");
    gpaContainer.innerHTML = '';
    const macGPAText = document.createElement('p');
    macGPAText.textContent = `McMaster GPA: ${macGPA.toFixed(1)}`;
    const standardGPAText = document.createElement('p');
    standardGPAText.textContent = `4.0 Scale GPA: ${standardGPA.toFixed(2)}`;
    gpaContainer.append(standardGPAText);
    gpaContainer.append(macGPAText);
}

function deleteCourse(courseID) {
    const index = courseList.findIndex(course => course.id === courseID);

    if (index !== -1) {
        courseList.splice(index, 1);
        console.log(`Course with ID ${courseID} deleted.`);
        displayCourses();
        if (courseList.length === 0) {
            const gpaContainer = document.getElementById("GPA");
            gpaContainer.innerHTML = '';
        }
    }
}


