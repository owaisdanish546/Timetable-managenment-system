function togglePassword() {
    var passwordInput = document.getElementById('password');
    var icon = document.querySelector('#togglePassword i');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
async function login(event) {
    event.preventDefault()
    const body = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim()
    }
    // console.log(body.email+" " + body.password); 
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    // const response = await fetch('http://localhost:3000/navbar')
    try {
        // Redirect to the new page on the server when the button is clicked
        // console.log(options)
        const response = await fetch('/validateLogin', options)
        if (response.ok) {
            let data = await response.json();
            alert("welcome" + " " + data.data.first_name + " " + data.data.surname + "!");
            localStorage.clear()
            localStorage.setItem("user_id", data.data.user_id); // set user_id for the session
            // alert(JSON.stringify(data.data))
            window.location.href = "/view/dashboard"

            //    setTimeout(() => window.location.href('/dashboard'),15000)
        }
        else {
            let error = await response.json();
            alert(error.message);
        }
    }
    catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request. Please try again later.");
    }

}

document.getElementById('togglePassword').addEventListener('click', togglePassword);
// document.getElementById('loginButton').addEventListener('click', function (event) {
// Fetch navbar.html when the login button is clicked