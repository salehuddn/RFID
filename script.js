const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=>{

    wrapper.classList.add('active');


})


loginLink.addEventListener('click', ()=>{

    wrapper.classList.remove('active');


})

btnPopup.addEventListener('click', ()=>{

    wrapper.classList.add('active-popup');


})

iconClose.addEventListener('click', ()=>{

    wrapper.classList.remove('active-popup');


})

// Login
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let rememberCheckbox = document.getElementById("remember-checkbox");

    // Prepare the URL with query parameters
    let url = "https://api.salehuddin.tech/api/authenticate";
    url += "?email=" + encodeURIComponent(email);
    url += "&password=" + encodeURIComponent(password);

    // Make the API request
    fetch(url, {
        method: 'POST' // Specify the request method as POST
    })
        .then(function (response) {
            if (response.ok) {
                // Authentication successful
                // Redirect to dashboard.html
                response.json().then(function (data) {
                    // Store the token in localStorage for future use
                    localStorage.setItem('token', data.token);
                    window.location.href = "dashboard.html";
                });
            } else {
                // Authentication failed
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(function (error) {
            // Error occurred
            console.error(error);
            alert("An error occurred. Please try again later.");
        });
});

// Register
document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let termsCheckbox = document.getElementById("terms-checkbox");

    // Check if terms checkbox is checked
    if (!termsCheckbox.checked) {
        alert("Please agree to the terms & conditions.");
        return;
    }

    // Prepare the URL with query parameters
    let url = "https://api.salehuddin.tech/api/users";
    url += "?name=" + encodeURIComponent(name);
    url += "&email=" + encodeURIComponent(email);
    url += "&password=" + encodeURIComponent(password);


    // Make the API request
    fetch(url, {
        method: 'POST' // Specify the request method as POST
    })
        .then(function (response) {
            if (response.status === 201) {
                // Registration successful
                // Redirect to dashboard.html
                // window.location.href = "dashboard.html";

                alert("Registration successful. Please login.");
            } else {
                // Registration failed
                response.json().then(function (data) {
                    alert("Registration failed: " + data.message);
                });
            }
        })
        .catch(function (error) {
            // Error occurred
            console.error(error);
            alert("An error occurred. Please try again later.");
        });
});