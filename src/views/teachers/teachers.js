async function submitTeacherForm() {
        let teacherId = document.getElementById('teacherId').value.trim();
        let teacherName = document.getElementById('teacherName').value.trim();

        let body = {
            teacher_id: teacherId,
            name: teacherName,
            user_id : localStorage.getItem("user_id")
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch("/teachers", options);
            console.log(response);
            if (response.ok) {
                alert("Teacher information submitted successfully");
        
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

document.getElementById("teacherForm").addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    let result = await submitTeacherForm(); // Call async function to handle form submission
    if (result){
        const teacherId = document.getElementById('teacherId').value;
        const teacherName = document.getElementById('teacherName').value;
        
        const tableBody = document.getElementById('teacherTableBody');
        const row = document.createElement('tr');
        row.id = teacherId;
        row.innerHTML = `
            <td>${teacherId}</td>
            <td>${teacherName}</td>
            <td>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    
       // Clear form fields
        document.getElementById('teacherId').value = '';
        document.getElementById('teacherName').value = ''; 
    
    } 
});
// Function to handle row deletion
function deleteRow(row) {
    row.remove(); // Remove the row from the table
}

// Event delegation for dynamically added buttons
document.getElementById('teacherTableBody').addEventListener('click', async function(event) {
    if (event.target.classList.contains('btn-danger')) {
        // console.log(event);
        const row = event.target.closest('tr');
        let teacherId = row.id; 
        let user_id = localStorage.getItem("user_id")
        // console.log(user_id)
        try{
            let response = await fetch(`/teachers/${teacherId}/${user_id}`,{method:'Delete'});
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


// document.getElementById('teacherForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     });
