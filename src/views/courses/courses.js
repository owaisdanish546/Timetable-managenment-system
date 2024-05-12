async function submitCourseForm() {

    let courseCode = document.getElementById('courseCode').value.trim();
    let courseName = document.getElementById('courseName').value.trim();
    let semester = document.getElementById('semester').value;
    let creditHours = document.getElementById('creditHours').value;

    let body = {
        course_code: courseCode,
        course_name: courseName,
        semester: semester,
        credit_hours: creditHours,
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
        const response = await fetch("/courses", options);
        console.log(response);
        if (response.ok) {
            alert("Course information submitted successfully");

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

document.getElementById("courseForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let result = await submitCourseForm();
    if (result) {
        let courseCode = document.getElementById('courseCode').value.trim();
        let courseName = document.getElementById('courseName').value.trim();
        let semester = document.getElementById('semester').value;
        let creditHours = document.getElementById('creditHours').value;
    
        // Add the new row to the table
        const tableBody = document.getElementById('courseTableBody');
        const row = document.createElement('tr');
        row.id = courseCode;
        row.innerHTML = `
        <td>${courseCode}</td>
        <td>${courseName}</td>
        <td>${semester}</td>
        <td>${creditHours}</td>
        <td>
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;
        tableBody.appendChild(row);

        // Clear form fields
        document.getElementById('courseCode').value = "";
        document.getElementById('courseName').value = "";
        document.getElementById('semester').value = "";
        document.getElementById('creditHours').value = "";
    }
});
// Function to handle row deletion
function deleteCourseRow(row) {
    row.remove(); // Remove the row from the table
}

// Event delegation for dynamically added buttons
document.getElementById('courseTableBody').addEventListener('click',async function (event) {
    if (event.target.classList.contains('btn-danger')) {
        const row = event.target.closest('tr');
        let course_code = row.id; 
        let user_id = localStorage.getItem("user_id")
        try{
            let response = await fetch(`/courses/${course_code}/${user_id}`,{method:'Delete'});
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
        deleteCourseRow(row);
    } else {
        console.log('Clicked element does not have the class "btn-danger"');
    }
});