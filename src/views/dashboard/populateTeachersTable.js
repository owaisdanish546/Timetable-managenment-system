async function populateTeachersTable() {
  
    const user_id = localStorage.getItem("user_id");
    try {
        let response = await fetch(`/teachers/All/${user_id}`)
        if (response.ok) {
            let data = await response.json();
            if (data) {
                const tableBody = document.getElementById('teacherTableBody');
                data.data.forEach(record => {
                    const row = document.createElement('tr');
                    row.id =record.teacher_id;
                    row.innerHTML = `
                    <td>${record.teacher_id}</td>
                    <td>${record.teacher_name}</td>
                    <td>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                `;
                    tableBody.appendChild(row);
                });
            }
        }  else if(response.status === 404){
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