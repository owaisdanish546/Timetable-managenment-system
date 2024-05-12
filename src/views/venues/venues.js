async function postVenue() {
    const body = {
        name: document.getElementById("venueName").value.trim(),
        user_id: localStorage.getItem("user_id")
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Specify content type as JSON
        },
        body: JSON.stringify(body) // Convert body to JSON string
    }
    try {
        let response = await fetch("/venues", options);
        if (response.ok) {
            alert("venue information submitted successfully");
        }
        else {
            const error = await response.json();
            alert(error.message);
            return false;
        }

    }
    catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
        return false;
    }
    return true;
}

document.getElementById("venueForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let result = await postVenue();
    if (result) {
        let venueName = document.getElementById("venueName").value.trim();

        // Add the new row to the table

        const tableBody = document.getElementById('venueTableBody');

        const row = document.createElement('tr');
        row.id = venueName;
        row.innerHTML = `
        <td>${venueName}</td>
        <td>
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;
        tableBody.appendChild(row);
        document.getElementById('venueName').value = ""

    }

})
function deleteRow(row) {
    row.remove(); // Remove the row from the table
}

// Event delegation for dynamically added buttons
document.getElementById('venueTableBody').addEventListener('click', async function (event) {
    if (event.target.classList.contains('btn-danger')) {
        const row = event.target.closest('tr');
        let venueName = row.id
        let user_id = localStorage.getItem("user_id")
        try {
            let response = await fetch(`/venues/${venueName}/${user_id}`, { method: 'Delete' });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");
        }
        // console.log(row); // Check if the correct row is selected
        deleteRow(row);
    } else {
        console.log('Clicked element does not have the class "btn-danger"');
    }
});
