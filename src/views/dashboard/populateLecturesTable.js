async function getTeacherName(teacher_id) {
    const user_id = localStorage.getItem("user_id");
    try {
        let response = await fetch(`/teachers/${teacher_id}/${user_id}`)
        if (response.ok) {
            const data = await response.json();
            return data.data.teacher_name;
        }   else if(response.status === 404){
            const error = await response.json(); // Read error message from response
            console.log(error.message);
        }else {
            const error = await response.json(); // Read error message from response
            alert(error.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
    }
    return null;
}
async function populateLecturesTable() {
    const user_id = localStorage.getItem("user_id");
    try {
        let response = await fetch(`/lectures/All/${user_id}`);
        if (response.ok) {
            let data = await response.json();
            // console.log(data)
            if (data) {
                const tableBody = document.getElementById('lectureTableBody');
                data.data.forEach(async record => {
                    let teacher_name = await getTeacherName(record.teacher_id)
                    if (teacher_name) {
                        const row = document.createElement('tr');
                        row.setAttribute('course_code', record.course_code); // Set custom attribute 'data-course'
                        row.setAttribute('section', record.section); // Set custom attribute 'data-section'
                        row.innerHTML = `
                        <td>${record.teacher_id}</td>
                        <td>${teacher_name}</td>
                        <td>${record.course_code}</td>  
                        <td>${record.section}</td>
                        <td>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    `;
                        tableBody.appendChild(row);
                    }
                });
            }
        }  else if(response.status === 404){
            const error = await response.json(); // Read error message from response
            console.log(error.message);
        } else {
            const error = await response.json(); // Read error message from response
            alert(error.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
    }
}
