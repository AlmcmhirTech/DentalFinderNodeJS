document.addEventListener('DOMContentLoaded', function () {

fetchAllAppointmentsData();

const successfulCanvas = document.getElementById('successfulAppointmentsChart');
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
    
//CLINIC GRAPHS


function calculateDailyClinicIncome() {
    return fetch('/clinic/daily-incomedata')
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

function fetchAllAppointmentsData() {
    fetch('/clinic/clinic-appbardata')
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
    fetch('/clinic/clinic-successbardata')
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
});


