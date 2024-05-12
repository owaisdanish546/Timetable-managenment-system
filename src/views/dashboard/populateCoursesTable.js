async function populateCoursesTable() {
    const user_id = localStorage.getItem("user_id");
    try {
        let response = await fetch(`/courses/All/${user_id}`);
        if (response.ok) {
            let data = await response.json();
            if (data) {
                const tableBody = document.getElementById('courseTableBody');
                data.data.forEach(record => {
                    const row = document.createElement('tr');
                    row.id = record.course_code;
                    row.innerHTML = `
                        <td>${record.course_code}</td>
                        <td>${record.course_name}</td>
                        <td>${record.semester}</td>
                        <td>${record.credit_hours}</td>
                        <td>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        } 
        else if(response.status === 404){
            const error = await response.json(); // Read error message from response
            console.log(error.message);
        }
        else {
            const error = await response.json(); // Read error message from response
            alert(error.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
    }
}
