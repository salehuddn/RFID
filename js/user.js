// Get all users
function fetchUsers() {
  fetch('https://api.salehuddin.tech/api/users')
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

              const uidCell = document.createElement('td');
              uidCell.textContent = user.uid;
              row.appendChild(uidCell);

              const createdAtCell = document.createElement('td');
              const createdAt = new Date(user.created_at);
              const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
              createdAtCell.textContent = createdAt.toLocaleString('en-MS', options).replace(/(am|pm)/i, match => match.toUpperCase()); // Format date
              row.appendChild(createdAtCell);

              const actionCell = document.createElement('td');
              actionCell.classList.add('d-flex', 'justify-content-center', 'gap-2');

              const editButton = document.createElement('button');
              editButton.classList.add('btn', 'btn-warning', 'btn-sm');
              editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
              editButton.addEventListener('click', function () {
                const userUid = user.uid;
                window.location.href = `user-edit.html?uid=${userUid}`;
              });
              actionCell.appendChild(editButton);
              row.appendChild(actionCell);

              const deleteButton = document.createElement('button');
              deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
              deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
              deleteButton.addEventListener('click', function() {
                  const confirmDelete = confirm('Are you sure you want to delete this admin?');
                  if (confirmDelete) {
                      const userId = user.id;
                      const deleteUrl = `https://api.salehuddin.tech/api/user/${userId}`;
              
                      fetch(deleteUrl, {
                          method: 'DELETE'
                      })
                      .then(response => {
                          if (response.ok) {
                              // Successful deletion
                              // Perform any necessary actions (e.g., removing the row from the table)
                              fetchUsers(); // Refresh the table after successful deletion
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
              actionCell.appendChild(deleteButton);
              row.appendChild(actionCell);


              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error(error);
          alert('Failed to fetch user data.');
      });
}

// Create User
function createUser() {
  // Get form values
  let name = document.getElementById("userName").value;
  let uid = document.getElementById("userUid").value;

  // Prepare the URL with query parameters
  let url = new URL("https://api.salehuddin.tech/api/user/store");
  url.searchParams.append("name", name);
  url.searchParams.append("uid", uid);

  // Make the API request
  fetch(url, {
      method: 'POST' // Specify the request method as POST
  })
      .then(function (response) {
      if (response.ok) {
          alert("User created successfully.");
          window.location.href = "users.html";
      } else {
          response.json().then(function (data) {
          alert("User create failed: " + data.message);
          });
      }
      })
      .catch(function (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
      });
}

// Show User
function showUser() {
    // Get the UID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userUid = urlParams.get('uid');

    // Prepare the URL to fetch the user details based on the UID
    const url = `https://api.salehuddin.tech/api/user/${userUid}`;

    // Fetch the user details
    fetch(url)
    .then(response => response.json())
    .then(user => {
        // Populate the form fields with the user details
        console.log(user);
        document.getElementById('userName').value = user.name;
        document.getElementById('userUid').value = user.uid;
    })
    .catch(error => {
        console.error(error);
        alert('Failed to fetch user details.');
    });
}

// Update User
function updateUser() {
  // Get form values
  let name = document.getElementById("userName").value;
  let uid = document.getElementById("userUid").value;

  // Prepare the URL with query parameters
  let url = new URL("https://api.salehuddin.tech/api/user/store");
  url.searchParams.append("name", name);
  url.searchParams.append("uid", uid);

  // Make the API request
  fetch(url, {
      method: 'POST' // Specify the request method as POST
  })
      .then(function (response) {
      if (response.ok) {
          alert("User updated successfully.");
          window.location.href = "users.html";
      } else {
          response.json().then(function (data) {
          alert("User update failed: " + data.message);
          });
      }
      })
      .catch(function (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
      });
}