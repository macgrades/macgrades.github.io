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
                console.log(data);
                displayCourses(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

function displayCourses(courses) {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';
    courses.forEach(course => {
        const courseText = document.createElement('p');
        courseText.textContent = `Course Name: ${course.code}, Grade: ${course.grade}, Credits: ${course.units}`;
        container.appendChild(courseText);
    });
}
