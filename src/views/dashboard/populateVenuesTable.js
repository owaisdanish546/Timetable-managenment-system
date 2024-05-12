async function populateVenuesTable() {
  
    const user_id = localStorage.getItem("user_id");
    try {
        let response = await fetch(`/venues/All/${user_id}`)
        if (response.ok) {
            let data = await response.json();
            if (data) {
                const tableBody = document.getElementById('venueTableBody');
                data.data.forEach(record => {
                    const row = document.createElement('tr');
                    row.id = record.venue_name;
                    row.innerHTML = `
                    <td>${record.venue_name}</td>
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