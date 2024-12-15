const appointmentCanvas = document.getElementById('AppointmentServices');
const successfulCanvas = document.getElementById('successfulAppointmentsChart');

          document.getElementById('showAllAppointments').addEventListener('click', function() {
                appointmentCanvas.style.display = 'block';
                successfulCanvas.style.display = 'none';
        fetchAllAppointmentsData().then(data => {
            allAppointmentsChart.data = data;
            allAppointmentsChart.update();
        });   
    });  
    document.getElementById('showSuccessfulAppointments').addEventListener('click', function() {
        successfulCanvas.style.display = 'block';
        appointmentCanvas.style.display = 'none'; 

        fetchSuccessfulAppointmentsData().then(data => {
            successfulAppointmentsChart.data = data;
            successfulAppointmentsChart.update();
        });
    });  

    document.addEventListener('DOMContentLoaded', () => {
console.log('Document loaded');

const categorySelect = document.getElementById('categorySelect');
const tableHeaders = document.getElementById('tableHeaders');
const tableBody = document.getElementById('tableBody');

console.log('Elements:', categorySelect, tableHeaders, tableBody);

categorySelect.addEventListener('change', async (e) => {
console.log('Category changed:', e.target.value);
const selectedCategory = e.target.value;
try {
  const response = await fetch(`/clinic/dynamic-table/${selectedCategory}`);
  console.log('Response:', response);
  const tableData = await response.json();
  console.log('Table data:', tableData);

  tableHeaders.innerHTML = '';
  tableBody.innerHTML = '';

  if (selectedCategory === 'appointments') {
    const headerNames = ['Patient', 'Appointment Date', 'Service', 'Status'];
  
    // Clear existing headers
    tableHeaders.innerHTML = '';
  
    headerNames.forEach((name) => {
      const th = document.createElement('th');
      th.textContent = name;
      tableHeaders.appendChild(th);
    });
  
    tableData.forEach((row) => {
        const rowElement = document.createElement('tr');
        headerNames.forEach((name, index) => {
          const td = document.createElement('td');
          const properties = Object.values(row);
          td.textContent = properties[index] || '-';
          rowElement.appendChild(td);
        });
        tableBody.appendChild(rowElement);
      });
  }
  if (selectedCategory === 'reports') {
    const headerNames = ['Patient', 'Report Date', 'Report Type', 'Status'];
  
    // Clear existing headers
    tableHeaders.innerHTML = '';
  
    headerNames.forEach((name) => {
      const th = document.createElement('th');
      th.textContent = name;
      tableHeaders.appendChild(th);
    });
  
    tableData.forEach((row) => {
        const rowElement = document.createElement('tr');
        headerNames.forEach((name, index) => {
          const td = document.createElement('td');
          const properties = Object.values(row);
          td.textContent = properties[index] || '-';
          rowElement.appendChild(td);
        });
        tableBody.appendChild(rowElement);
      });
  }
  
} catch (error) {
  console.error('Error:', error);
}
});

// Initialize table with default category
fetch('/clinic/dynamic-table/appointments')
.then((response) => {
  console.log('Response:', response);
  return response.json();
})
.then((tableData) => {
  console.log('Table data:', tableData);
  const headerNames = ['Patient', 'Appointment Date', 'Service', 'Status'];
  
    // Clear existing headers
    tableHeaders.innerHTML = '';
  
    headerNames.forEach((name) => {
      const th = document.createElement('th');
      th.textContent = name;
      tableHeaders.appendChild(th);
    });
  
    tableData.forEach((row) => {
        const rowElement = document.createElement('tr');
        headerNames.forEach((name, index) => {
          const td = document.createElement('td');
          const properties = Object.values(row);
          td.textContent = properties[index] || '-';
          rowElement.appendChild(td);
        });
        tableBody.appendChild(rowElement);
      });
})
.catch((error) => {
  console.error('Error:', error);
});
});





//Graphs

function fetchAllAppointmentsData() {
    fetch('/clinic/bardata')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('AppointmentServices');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Appointments',
              data: datasets[0].data,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    })
    }
    fetchAllAppointmentsData();
    function fetchSuccessfulAppointmentsData(){
    fetch('/clinic/bardata2')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('successfulAppointmentsChart');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Successful Appointments',
              data: datasets[0].data,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    })
    }
