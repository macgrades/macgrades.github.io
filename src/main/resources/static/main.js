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
   let courseName = courseNameInput.value;
   const gradeInput = document.getElementById("grade");
   const grade = gradeInput.value;
   const unitsInput = document.getElementById("units");
   const units = unitsInput.value;
   if (grade && units) {
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
        const courseText = document.createElement('p');
        courseText.textContent = `Course Name: ${course.code}, Grade: ${course.grade}, Credits: ${course.units}`;
        courseText.style.display = 'inline-block';

        const delButton = document.createElement('button');
        delButton.id = course.id;
        delButton.innerHTML='X';
        delButton.style.display = 'inline-block';
        delButton.addEventListener('click', function() {
            deleteCourse(course.id);
        });

        const wrapper = document.createElement('div');
        wrapper.appendChild(courseText);
        wrapper.appendChild(delButton);

        container.prepend(wrapper);
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


