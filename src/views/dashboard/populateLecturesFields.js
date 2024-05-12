async function populateTeachers(user_id) {
    try {
        let response = await fetch(`/teachers/All/${user_id}`);
        // console.log(response)
        if (response.ok) {

            const data = await response.json();
            // console.log(data)
            let teacherDropdown = document.getElementById("teacherName")

            data.data.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.teacher_id + `-` + teacher.teacher_name; // Assuming each teacher object has an 'id' property

                option.textContent = teacher.teacher_id + `-` + teacher.teacher_name; // Assuming each teacher object has a 'name' property
                teacherDropdown.appendChild(option);
                // localStorage.setItem("teachers"  )
            })
        } else if (response.status === 404) {
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
async function populateCourses(user_id) {
    try {
        let response = await fetch(`/courses/All/${user_id}`);
        // console.log(response)
        if (response.ok) {

            const data = await response.json();
            // console.log(data)
            let coursesDropDown = document.getElementById("course")

            data.data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.course_code + `-` + course.course_name; // Assuming each teacher object has an 'id' property

                option.textContent = course.course_code + `-` + course.course_name; // Assuming each teacher object has a 'name' property
                coursesDropDown.appendChild(option);
                // localStorage.setItem("teachers"  )
            })
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
}
// async function populateVenues(user_id) {
//     try {
//         let response = await fetch(`/venues/All/${user_id}`);
//         // console.log(response)
//         if (response.ok) {
//             // alert("venues")
//             const data = await response.json();
//             console.log(data)
//             let venuesDropDown = document.getElementById("venue")

//             data.data.forEach(venues => {
//                 const option = document.createElement('option');
//                 option.value = venues.name; // Assuming each teacher object has an 'id' property

//                 option.textContent = venues.name; // Assuming each teacher object has a 'name' property
//                 venuesDropDown.appendChild(option);
//                 // localStorage.setItem("teachers"  )
//             })
//         } else {
//             const error = await response.json(); // Read error message from response
//             alert(error.message);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred while processing your request. Please try again later.");
//     }
// }

function populateSections() {
    let sectionDropDown = document.getElementById("section")
    for (let section = 'A'; section <= "Z"; section = String.fromCharCode(section.charCodeAt(0) + 1)) {
        //       console.log(section)
        const option = document.createElement('option');
        option.value = section; // semester along section e.g 2A,8B etc

        option.textContent = section // inner values
        sectionDropDown.appendChild(option);
    }
}
// function to populate dropdowns
function populate() {
    // alert("populate method")
    const user_id = localStorage.getItem("user_id");
    populateTeachers(user_id);
    populateCourses(user_id);
    populateSections();
    // populateVenues(user_id);  
}
