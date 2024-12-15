calculateDailyIncome();
fetchAllAppointmentsData();

const successfulCanvas = document.getElementById('successfulAppointmentsChart');
const monthlyIncomeCanvas = document.getElementById('monthlyIncomeCanvas');
const dailyIncomeCanvas = document.getElementById('dailyIncomeCanvas');
const allAppointmentCanvas = document.getElementById('AllAppointmentServices');

    document.getElementById('showAllClinicsAppointments').addEventListener('click', function() {
        allAppointmentCanvas.style.display = 'block';
        successfulCanvas.style.display = 'none';

        fetchAllAppointmentsData().then(data => {
            allAppointmentsChart.data = data;
            allAppointmentsChart.update();
        });   
    });  
    document.getElementById('showSuccessfulAppointments').addEventListener('click', function() {
        successfulCanvas.style.display = 'block';
        allAppointmentCanvas.style.display = 'none'; 

        fetchSuccessfulAppointmentsData().then(data => {
            successfulAppointmentsChart.data = data;
            successfulAppointmentsChart.update();
        });
    });
    document.getElementById('monthlyIncome').addEventListener('click', function() {
        monthlyIncomeCanvas.style.display = 'block';
        dailyIncomeCanvas.style.display = 'none'; 

        calculateMonthlyIncome().then(data => {
            monthlyIncomeChart.data = data;
            monthlyIncomeChart.update();
        });
    });
    document.getElementById('dailyIncome').addEventListener('click', function() {
        dailyIncomeCanvas.style.display = 'block';
        monthlyIncomeCanvas.style.display = 'none'; 

        calculateDailyIncome().then(data => {
            dailyIncomeChart.data = data;
            dailyIncomeChart.update();
        });
    });
    
    
//Graphs


function calculateDailyIncome() {
    fetch('/admin/dailyincomedata')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('dailyIncomeCanvas');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Daily Income',
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
function calculateMonthlyIncome() {
    fetch('/admin/monthlyincomedata')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('monthlyIncomeCanvas');
        new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Income',
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

function fetchAllAppointmentsData() {
    fetch('/admin/appbardata')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('AllAppointmentServices');
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
    function fetchSuccessfulAppointmentsData(){
    fetch('/admin/okappbardata')
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
  const response = await fetch(`/admin/admin-dynamic-table/${selectedCategory}`);
  console.log('Response:', response);
  const tableData = await response.json();
  console.log('Table data:', tableData);

  tableHeaders.innerHTML = '';
  tableBody.innerHTML = '';

  if (selectedCategory === 'Branches') {
    const headerNames = ['Pending ID', 'Branch Address', 'Clinic', 'Contact', 'License', 'Description', 'Request Date', 'Type', 'Action'];

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

          if (name === 'Action') {
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Accept';
            acceptBtn.id = 'accept-btn'; 
            acceptBtn.classList.add('accept-branch-btn');
            acceptBtn.dataset.branchpendingId = row.pending_id;
            acceptBtn.dataset.branchAddress = row.branch_address;
            acceptBtn.dataset.mobileNumber = row.mobile_number;
            acceptBtn.dataset.license = row.license;
            acceptBtn.dataset.clinicName = row.clinic_name;
      
            acceptBtn.addEventListener('click', () => {
              const modal = document.getElementById('AcceptClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-branch-btn');
            deleteBtn.dataset.branchpendingId = row.pending_id;

            deleteBtn.addEventListener('click', () => {
              const modal = document.getElementById('DeleteClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            td.appendChild(acceptBtn);
            td.appendChild(deleteBtn);
          } else {
            td.textContent = properties[index] || '-';
          }

          rowElement.appendChild(td);
        });
        tableBody.appendChild(rowElement);
      });
  }
  if (selectedCategory === 'Services') {
    const headerNames = ['Pending ID', 'Service Name', 'Clinic', 'Price', 'Description', 'Request Date', 'Action'];
  
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
          
          if (name === 'Action') {
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Accept';
            acceptBtn.id = 'accept-btn'; 
            acceptBtn.classList.add('accept-service-btn');
            acceptBtn.dataset.servicependingId = row.pending_id;
            acceptBtn.dataset.serviceName = row.service_name;
            acceptBtn.dataset.Price = row.price;
      
            acceptBtn.addEventListener('click', () => {
              const modal = document.getElementById('AcceptClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-service-btn');
            deleteBtn.dataset.servicependingId = row.pending_id;

            deleteBtn.addEventListener('click', () => {
              const modal = document.getElementById('DeleteClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            td.appendChild(acceptBtn);
            td.appendChild(deleteBtn);
          } else {
            td.textContent = properties[index] || '-';
          }
          rowElement.appendChild(td);
        });
        tableBody.appendChild(rowElement);
      });
  }
  if (selectedCategory === 'Accounts') {
    const headerNames = ['Pending ID', 'Clinic Name', 'Email', 'Contact', 'Address', 'Village', 'Postcode', 'Request Date', 'Action'];
  
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

          if (name === 'Action') {
            const acceptBtn = document.createElement('button');
            acceptBtn.textContent = 'Accept';
            acceptBtn.id = 'accept-btn'; 
            acceptBtn.classList.add('accept-clinic-btn');
            acceptBtn.dataset.pendingId = row.pending_id;
            acceptBtn.dataset.clinicName = row.clinic_name;
            acceptBtn.dataset.clinicEmail = row.clinic_email;
            acceptBtn.dataset.clinicAddress = row.clinic_address;
            acceptBtn.dataset.village = row.village;
            acceptBtn.dataset.postcode = row.postcode;
            acceptBtn.dataset.mobileNumber = row.mobile_number;
            acceptBtn.dataset.password = row.password;
            
            acceptBtn.addEventListener('click', () => {
              const modal = document.getElementById('AcceptClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-clinic-btn');
            deleteBtn.dataset.pendingId = row.pending_id;

            deleteBtn.addEventListener('click', () => {
              const modal = document.getElementById('DeleteClinicModal');
              const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
              modalToggle.show();
            });
    
            td.appendChild(acceptBtn);
            td.appendChild(deleteBtn);
          } else {
            td.textContent = properties[index] || '-';
          }
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
fetch('/admin/admin-dynamic-table/Branches')
.then((response) => {
  console.log('Response:', response);
  return response.json();
})
.then((tableData) => {
  console.log('Table data:', tableData);
  const headerNames = ['Pending ID', 'Branch Address', 'Clinic', 'Contact', 'License', 'Description','Request Date',  'Type', 'Action'];
  
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

        if (name === 'Action') {
          const acceptBtn = document.createElement('button');
          acceptBtn.textContent = 'Accept';
          acceptBtn.id = 'accept-btn'; 
          acceptBtn.classList.add('accept-branch-btn');
          acceptBtn.dataset.branchpendingId = row.pending_id;
          acceptBtn.dataset.branchAddress = row.branch_address;
          acceptBtn.dataset.mobileNumber = row.mobile_number;
          acceptBtn.dataset.license = row.license;
          acceptBtn.dataset.clinicName = row.clinic_name;
    
          acceptBtn.addEventListener('click', () => {
            const modal = document.getElementById('AcceptClinicModal');
            const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
            modalToggle.show();
          });
  
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.classList.add('delete-branch-btn');
          deleteBtn.dataset.branchpendingId = row.pending_id;

          deleteBtn.addEventListener('click', () => {
            const modal = document.getElementById('DeleteClinicModal');
            const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
            modalToggle.show();
          });
  
          td.appendChild(acceptBtn);
          td.appendChild(deleteBtn);
        } else {
          td.textContent = properties[index] || '-';
        }

        rowElement.appendChild(td);
      });
      tableBody.appendChild(rowElement);
    });
//ACCEPT ACOUNT PENDING
    document.getElementById('confirm-accept-btn').addEventListener('click', async () => {
      const acceptBtn = document.querySelector('.accept-clinic-btn');
      if(acceptBtn){
      const data = {
        pendingId: acceptBtn.dataset.pendingId,
        clinicName: acceptBtn.dataset.clinicName,
        clinicEmail: acceptBtn.dataset.clinicEmail,
        clinicAddress: acceptBtn.dataset.clinicAddress,
        village: acceptBtn.dataset.village,
        postcode: acceptBtn.dataset.postcode,
        password: acceptBtn.dataset.password,
        mobileNumber:  acceptBtn.dataset.mobileNumber
      };
    
    
      
    
        const modal = document.getElementById('AcceptClinicModal');
        const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
        modalToggle.show();
    
        try {
          const response = await fetch(`/admin/accept-clinic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (response.ok) {
            window.location.reload();
          } else {
            console.error(await response.text());
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
//DELETE ACCOUNT PENDING

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
      const deleteBtn = document.querySelector('.delete-clinic-btn');
      if(deleteBtn){
      const data = {
        pendingId: deleteBtn.dataset.pendingId,
      };
    
        console.log(data);
    
        const modal = document.getElementById('DeleteClinicModal');
        const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
        modalToggle.show();
    
        try {
          const response = await fetch(`/admin/delete-clinic-request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (response.ok) {
            window.location.reload();
          } else {
            console.error(await response.text());
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    //ACCEPT SERVICE PENDING
    document.getElementById('confirm-accept-btn').addEventListener('click', async () => {
      const acceptBtn = document.querySelector('.accept-service-btn');
      const data = {
        pendingId: acceptBtn.dataset.servicependingId,
        serviceName: acceptBtn.dataset.serviceName,
        Price: acceptBtn.dataset.Price,
      };
    
        console.log(data);
    
        const modal = document.getElementById('AcceptClinicModal');
        const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
        modalToggle.show();
    
        try {
          const response = await fetch(`/admin/accept-service`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (response.ok) {
            window.location.reload();
          } else {
            console.error(await response.text());
          }
        } catch (error) {
          console.error(error);
        }
    });
//DELETE ACCOUNT PENDING

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
      const deleteBtn = document.querySelector('.delete-service-btn');
      const data = {
        pendingId: deleteBtn.dataset.servicependingId,
      };
    
    
        const modal = document.getElementById('DeleteClinicModal');
        const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
        modalToggle.show();
    
        try {
          const response = await fetch(`/admin/delete-service-request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (response.ok) {
            window.location.reload();
          } else {
            console.error(await response.text());
          }
        } catch (error) {
          console.error(error);
        }
    });
    
      //ACCEPT BRANCH PENDING
      document.getElementById('confirm-accept-btn').addEventListener('click', async () => {
        const acceptBtn = document.querySelector('.accept-branch-btn');
        const data = {
          pendingId: acceptBtn.dataset.branchpendingId,
          branchAddress: acceptBtn.dataset.branchAddress,
          mobileNumber: acceptBtn.dataset.mobileNumber,
          license: acceptBtn.dataset.license, 
          clinicName: acceptBtn.dataset.clinicName,
        };
      
          console.log(data);
      
          const modal = document.getElementById('AcceptClinicModal');
          const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
          modalToggle.show();
      
          try {
            const response = await fetch(`/admin/accept-branch`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (response.ok) {
              window.location.reload();
            } else {
              console.error(await response.text());
            }
          } catch (error) {
            console.error(error);
          }
      });
  //DELETE BRANCH PENDING
  
      document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        const deleteBtn = document.querySelector('.delete-branch-btn');
        const data = {
          pendingId: deleteBtn.dataset.branchpendingId,
        };
      
      
          const modal = document.getElementById('DeleteClinicModal');
          const modalToggle = new bootstrap.Modal(modal, { keyboard: false });
          modalToggle.show();
      
          try {
            const response = await fetch(`/admin/delete-branch-request`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (response.ok) {
              window.location.reload();
            } else {
              console.error(await response.text());
            }
          } catch (error) {
            console.error(error);
          }
      });

    
})
.catch((error) => {
  console.error('Error:', error);
});

});



