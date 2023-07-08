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
            if (response.status === 200) {
                // Authentication successful
                // Redirect to dashboard.html
                response.json().then(function (data) {
                    // Store the token in localStorage for future use
                    localStorage.setItem('token', data.token);
                    window.location.href = "admins.html";
                    alert("You have logged in successfully.");
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
    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPassword").value;
    let termsCheckbox = document.getElementById("terms-checkbox");

    // Check if terms checkbox is checked
    if (!termsCheckbox.checked) {
        alert("Please agree to the terms & conditions.");
        return;
    }

    // Prepare the URL with query parameters
    let url = new URL("https://api.salehuddin.tech/api/admin/register");
    url.searchParams.append("name", name);
    url.searchParams.append("email", email);
    url.searchParams.append("password", password);

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



// Logout
function logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = "index.html";
    alert("You have logged out successfully.");
}

// Get all users
function fetchAdmins() {
    fetch('https://api.salehuddin.tech/api/admin')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#user-table tbody');
            tableBody.innerHTML = ''; // Clear previous table rows

            data.forEach((user, index) => {
                const row = document.createElement('tr');
                const indexCell = document.createElement('th');
                indexCell.classList.add('text-center');
                indexCell.scope = 'row';
                indexCell.textContent = index + 1;
                row.appendChild(indexCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = user.name;
                row.appendChild(nameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                const createdAtCell = document.createElement('td');
                const createdAt = new Date(user.created_at);
                const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
                createdAtCell.textContent = createdAt.toLocaleString('en-MS', options).replace(/(am|pm)/i, match => match.toUpperCase()); // Format date
                row.appendChild(createdAtCell);

                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm'); // Add Bootstrap classes for button styling
                deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
                deleteButton.addEventListener('click', function() {
                    const confirmDelete = confirm('Are you sure you want to delete this admin?');
                    if (confirmDelete) {
                        const adminId = user.id;
                        const deleteUrl = `https://api.salehuddin.tech/api/admin/${adminId}`;
                
                        fetch(deleteUrl, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                // Successful deletion
                                // Perform any necessary actions (e.g., removing the row from the table)
                                fetchAdmins(); // Refresh the table after successful deletion
                            } else {
                                // Error occurred during deletion
                                throw new Error('Failed to delete admin.');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            alert('Failed to delete admin.');
                        });
                    }
                });
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);


                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Failed to fetch user data.');
        });
}