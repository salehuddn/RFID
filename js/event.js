// Get all events
function fetchEvents() {
  fetch('https://api.salehuddin.tech/api/events')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector('#user-table tbody');
          tableBody.innerHTML = ''; // Clear previous table rows

          data.forEach((event, index) => {
              const row = document.createElement('tr');
              const indexCell = document.createElement('th');
              indexCell.classList.add('text-center');
              indexCell.scope = 'row';
              indexCell.textContent = index + 1;
              row.appendChild(indexCell);

              const nameCell = document.createElement('td');
              nameCell.textContent = event.name;
              row.appendChild(nameCell);

              const createdAtCell = document.createElement('td');
              const createdAt = new Date(event.created_at);
              const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
              createdAtCell.textContent = createdAt.toLocaleString('en-MS', options).replace(/(am|pm)/i, match => match.toUpperCase()); // Format date
              row.appendChild(createdAtCell);

              const actionCell = document.createElement('td');
              actionCell.classList.add('d-flex', 'justify-content-center', 'gap-2');

              const logButton = document.createElement('button');
              logButton.classList.add('btn', 'btn-secondary', 'btn-sm');
              logButton.innerHTML = '<ion-icon name="file-tray-full-outline"></ion-icon>';
              logButton.addEventListener('click', function() {
                  const eventID = event.id; // Assuming the event ID is available in the `event` object
                  const logUrl = `https://api.salehuddin.tech/api/log/${eventID}`;
              
                  window.location.href = `userlog.html?eventID=${eventID}`;
              });

              const editButton = document.createElement('button');
              editButton.classList.add('btn', 'btn-warning', 'btn-sm');
              editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
              editButton.addEventListener('click', function () {
                const eventID = event.id;
                window.location.href = `event-edit.html?id=${eventID}`;
              });
              
              const deleteButton = document.createElement('button');
              deleteButton.classList.add('btn', 'btn-danger', 'btn-sm'); 
              deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
              deleteButton.addEventListener('click', function() {
                  const confirmDelete = confirm('Are you sure you want to delete this event?');
                  if (confirmDelete) {
                      const eventId = event.id;
                      const deleteUrl = `https://api.salehuddin.tech/api/event/${eventId}`;
              
                      fetch(deleteUrl, {
                          method: 'DELETE'
                      })
                      .then(response => {
                          if (response.ok) {
                              // Successful deletion
                              // Perform any necessary actions (e.g., removing the row from the table)
                              fetchEvents(); // Refresh the table after successful deletion
                          } else {
                              // Error occurred during deletion
                              throw new Error('Failed to delete event.');
                          }
                      })
                      .catch(error => {
                          console.error(error);
                          alert('Failed to delete event.');
                      });
                  }
              });

              actionCell.appendChild(logButton);
              actionCell.appendChild(editButton);
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

// Create Event
function createEvent() {
    let name = document.getElementById("eventName").value;
  
    let url = new URL("https://api.salehuddin.tech/api/event/store");
    url.searchParams.append("name", name);
  
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
        if (response.ok) {
            alert("Event created successfully.");
            window.location.href = "event.html";
        } else {
            response.json().then(function (data) {
            alert("Event create failed: " + data.message);
            });
        }
        })
        .catch(function (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
        });
}

// Show Event
function showEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    const url = `https://api.salehuddin.tech/api/event/${eventId}`;

    fetch(url)
    .then(response => response.json())
    .then(event => {
        console.log(event);
        document.getElementById('eventName').value = event.name;
    })
    .catch(error => {
        console.error(error);
        alert('Failed to fetch event details.');
    });
}

// Update Event
function updateEvent() {
    let name = document.getElementById("userName").value;
  
    let url = new URL("https://api.salehuddin.tech/api/event/store");
    url.searchParams.append("name", name);
  
    fetch(url, {
        method: 'POST'
    })
        .then(function (response) {
        if (response.ok) {
            alert("Event updated successfully.");
            window.location.href = "users.html";
        } else {
            response.json().then(function (data) {
            alert("Event update failed: " + data.message);
            });
        }
        })
        .catch(function (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
        });
  }