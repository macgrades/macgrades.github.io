function getCourses() {
    fetch('/upload')
        .then(response => response.json())
        .then(data => {
            // Parse the JSON response into a list of course objects
            const courseList = JSON.parse(data);

            // Display the course list on the screen
            courseList.forEach(course => {
                // Create HTML elements to display each course
                const courseElement = document.createElement('div');
                courseElement.innerHTML = `<p>Course Name: ${course.code}</p>
                                 <p>Grade: ${course.grade}</p>
                                 <p>Credits: ${course.units}</p>`;
                document.getElementById('courseList').appendChild(courseElement);
            });

            // Implement functionality to add/delete courses as needed
            // ...
        })
        .catch(error => {
            // Handle error if the API call fails
            console.error('Error:', error);
        });
}
