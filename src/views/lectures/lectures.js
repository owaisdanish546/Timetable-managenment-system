// Function to show the spinner
function showSpinner() {
    document.getElementById('spinner').style.display = 'inline-block';
}

// Function to hide the spinner
function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}
function hideGenerateTimetableBtn() {
    const generateTimetableBtn = document.getElementById('generateTimetableBtn');
    generateTimetableBtn.style.display = 'none'
    const download = document.getElementById('download');
    download.style.display = 'inline-block'
}
function showGenerateTimetableBtn() {
    const download = document.getElementById('download');
    download.style.display = 'none'
    const generateTimetableBtn = document.getElementById('generateTimetableBtn');
    generateTimetableBtn.style.display = "inline-block"
}
// Function to handle generating timetable
async function generateTimetable() {
    hideGenerateTimetableBtn()
    // Show spinner when generating timetable
    showSpinner();
    const user_id = localStorage.getItem('user_id');
    try {
        const response = await fetch(`/generateTimetable/${user_id}`);
        console.log(response);

        if (response.ok) {
            // Get the file name from the response headers
            const fileName = response.headers.get('Content-Disposition').split('filename=')[1];
            const blob = await response.blob();
            hideSpinner(); // Hide spinner after successful response

            // Create a temporary link element
            const link = document.getElementById('download');
            link.innerHTML = "click here to download excel file"
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName; // Specify the downloaded file name
        } else if (response.status === 404) {
            const error = await response.json();
            console.error(error.message, response.status);
            hideSpinner(); // Hide spinner on error
            alert(error.message, response.status);
            showGenerateTimetableBtn();
        }
        else {
            const error = await response.json();
            console.error(error.message, response.status);
            hideSpinner(); // Hide spinner on error
            alert(error.message, response.status);
            showGenerateTimetableBtn();
        }
    } catch (error) {
        console.error('Error generating timetable:', error);
        alert('An error occurred while generating timetable. Please try again later.');
        hideSpinner(); // Hide spinner on error
        showGenerateTimetableBtn();
    }
}
document.getElementById("lectureForm").addEventListener('submit', async (event) => { //calls sumbmit lecture and populate table
    event.preventDefault(); // Prevent default form submission behavior
    let result = await submitLectureForm(); // Call async function to handle form submission
    if (result) {
        const teacherName = document.getElementById('teacherName').value.trim().split('-')[1];
        const teacherId = document.getElementById('teacherName').value.trim().split('-')[0];
        const course_code = document.getElementById('course').value.split('-')[0];
        const section = document.getElementById('section').value;
        const semester = await getCourseSemester(course_code)
        const tableBody = document.getElementById('lectureTableBody');
        const row = document.createElement('tr');
        row.setAttribute('course_code', course_code); // Set custom attribute 'data-course'
        row.setAttribute('section', section); // Set custom attribute 'data-section'
        row.innerHTML = `
            <td>${teacherId}</td>
            <td>${teacherName}</td>
            <td>${course_code}</td>
            <td>${semester.toString()}${section.toString()}</td>
            <td>
                  <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Clear form fields
        document.getElementById('teacherName').value = '';
        document.getElementById('course').value = '';
        document.getElementById('section').value = '';
    }
});

document.getElementById('generateTimetableBtn').addEventListener('click', generateTimetable);
document.getElementById('download').addEventListener('click', showGenerateTimetableBtn);



// submit data and add table row
async function getCourseSemester(courseId) {
    const user_id = localStorage.getItem("user_id")
    try {
        let response = await fetch(`/courses/${courseId}/${user_id}`);
        // console.log(response)
        if (response.ok) {

            const data = await response.json();
            return data.data.semester;
        } else {
            const error = await response.json(); // Read error message from response
            alert(error.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
    }
    return 0;
}
async function submitLectureForm() {
    let teacherId = document.getElementById('teacherName').value.trim().split('-')[0]; // Extracting teacher ID from the selected teacher name
    let courseId = document.getElementById('course').value.trim().split('-')[0];
    let section = document.getElementById('section').value.trim();
    let semester = await getCourseSemester(courseId);

    if (semester) {
        let body = {
            // lecture_id: lectureId, // Assuming lectureId is not used or generated on the client side
            teacher_id: teacherId,
            course_code: courseId,
            section: semester.toString() + section.toString(),
            user_id: localStorage.getItem("user_id")
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch("/lectures", options);
            console.log(response);
            if (response.ok) {
                alert("Lecture information submitted successfully");

                // Optionally, redirect or perform any additional actions after successful submission
            } else {
                const error = await response.json();
                alert(error.message);
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");
            return false;
        }
        return true;
    }
}






//Function to handle row deletion
function deleteRow(row) {
    row.remove(); // Remove the row from the table
}

// Event delegation for dynamically added buttons
document.getElementById('lectureTableBody').addEventListener('click',async function (event) {
    if (event.target.classList.contains('btn-danger')) {
        
        const row = event.target.closest('tr');
        let course_code =  row.getAttribute( "course_code") ;
        let section =  row.getAttribute( "section") ;
        console.log(row.course)
        let user_id = localStorage.getItem("user_id")
        try{
            let response = await fetch(`/lectures/${course_code}/${section}/${user_id}`,{method:'Delete'});
            if (response.ok){
                const data = await response.json();
                alert(data.message);
            }
            else{
                const error = await response.json();
                alert(error.message);
            }
        }catch(error){
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");    
        }
        // console.log(row); // Check if the correct row is selected
        deleteRow(row);
    } else {
        console.log('Clicked element does not have the class "btn-danger"');
    }
});

