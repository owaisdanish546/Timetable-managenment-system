// function validateForm() {
//     document.getElementById('errorMessage').innerText = "";
//     let firstName = document.getElementById('firstName').value.trim();
//     let surname = document.getElementById('surname').value.trim();
//     let email = document.getElementById('email').value.trim();
//     let password = document.getElementById('password').value;
//     let confirmPassword = document.getElementById('confirmPassword').value;
//     // Check if any field is empty
//     if (!firstName || !surname || !email || !password || !confirmPassword) {
//         document.getElementById('errorMessage').innerText = "Please fill in all fields.";
//         // flag2 = 0;
//         return false;
//     }
//     // Email validation
//     let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         document.getElementById('errorMessage').innerText = "Please enter a valid email address.";
//         // flag2 = 0;
//         return false;
//     }
//     // If all validations pass, form is valid
//     // flag2 = 1;
//     return true;
// }
function validatePassword() { // Check if passwords match
    document.getElementById('errorMessage').innerText = "";
 
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword || password) { // to work for password and confrim password fields
        if (password !== confirmPassword) {
            if (!confirmPassword || !password) { // if confirm password is not set it should not display password not matched
                document.getElementById('passwordError').innerText = "";
                // flag1 = 0;
                return false;
            }
            document.getElementById('passwordError').style.color = "red";
            document.getElementById('passwordError').innerText = `Passwords do not match!`;
            // flag1 = 0;
            return false;
        }
        else {
            document.getElementById('passwordError').style.color = "green"
            document.getElementById('passwordError').innerText = "Passwords matched!";
            // flag1 = 1;
            return true;
        }
    }
}
async function postSignUpForm(event) {
    event.preventDefault()

    if (validatePassword()) { // form validation and password validation is passed 

        let firstName = document.getElementById('firstName').value.trim();
        let surname = document.getElementById('surname').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value;

        let body = {
            first_name: firstName,
            surname: surname,
            email: email,
            password: password
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Specify content type as JSON
            },
            body: JSON.stringify(body) // Convert body to JSON string
        };

        try {
            const response = await fetch("/users", options); // Pass options object as the second argument
            console.log(response)
            if (response.ok) {
                alert("Account created successfully");
                window.location.href = '/';
            } else {
                const error = await response.json(); // Read error message from response
                alert(error.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing your request. Please try again later.");
        }
    }
    else{
        document.getElementById('errorMessage').innerText = "Cannot Proceed! Passwords do not match!";
    }
}

document.getElementById("signupForm").addEventListener('submit', postSignUpForm);
// var flag1 = 0;
// var flag2 = 0;