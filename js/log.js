function fetchEventLogs() {
  // Get the eventID from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const eventID = urlParams.get('eventID');

  // Fetch the logs based on the event ID
  fetch(`https://api.salehuddin.tech/api/log/${eventID}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#user-table tbody');
      tableBody.innerHTML = ''; // Clear previous table rows

      data.forEach((log, index) => {
        const row = document.createElement('tr');
        const indexCell = document.createElement('th');
        indexCell.classList.add('text-center');
        indexCell.scope = 'row';
        indexCell.textContent = index + 1;
        row.appendChild(indexCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = log.name  || 'N/A';
        row.appendChild(nameCell);

        const studentIdCell = document.createElement('td');
        studentIdCell.textContent = log.uid;
        row.appendChild(studentIdCell);

        const dateCell = document.createElement('td');
        const date = new Date(log.created_at);
        const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
        dateCell.textContent = date.toLocaleDateString('en-GB', optionsDate); // Format date
        row.appendChild(dateCell);

        const timeCell = document.createElement('td');
        const time = new Date(log.created_at);
        const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        timeCell.textContent = time.toLocaleTimeString('en-US', optionsTime); // Format time
        row.appendChild(timeCell); 

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error(error);
      alert('Failed to fetch user log data.');
    });
}