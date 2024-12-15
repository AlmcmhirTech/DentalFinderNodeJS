document.addEventListener('DOMContentLoaded', function () {

fetchAllAppointmentsData();
dailyIncome();

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

        monthlyIncome().then(data => {
            monthlyIncomeChart.data = data;
            monthlyIncomeChart.update();
        });
    });
    document.getElementById('dailyIncome').addEventListener('click', function() {
        dailyIncomeCanvas.style.display = 'block';
        monthlyIncomeCanvas.style.display = 'none'; 

        dailyIncome().then(data => {
            dailyIncomeChart.data = data;
            dailyIncomeChart.update();
        });
    });
//CLINIC GRAPHS
function monthlyIncome() {
  fetch('/clinic/admin-monthlyincome')
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
    
function dailyIncome() {
  fetch('/clinic/admin-dailyincome')
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
    fetch('/clinic/admin-appbardata')
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
    fetch('/clinic/admin-successbardata')
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


