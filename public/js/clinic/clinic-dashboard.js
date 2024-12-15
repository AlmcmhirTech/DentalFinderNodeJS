document.addEventListener('DOMContentLoaded', function () {

//CLINIC DASHBOARD
calculateMonthlyClinicIncome();
fetchTodaysAppointmentsData();

const successfulCanvas = document.getElementById('successfulAppointmentsChart');
const monthlyIncomeCanvas = document.getElementById('monthlyIncomeCanvas');
const dailyIncomeCanvas = document.getElementById('dailyIncomeCanvas');
const TodaysAppointmentCanvas = document.getElementById('TodaysAppointmentServices');

    document.getElementById('showAllClinicsAppointments').addEventListener('click', function() {
        TodaysAppointmentCanvas.style.display = 'block';
        successfulCanvas.style.display = 'none';

        fetchTodaysAppointmentsData().then(data => {
            allAppointmentsChart.data = data;
            allAppointmentsChart.update();
        });   
    });  
    document.getElementById('showSuccessfulAppointments').addEventListener('click', function() {
        successfulCanvas.style.display = 'block';
        TodaysAppointmentCanvas.style.display = 'none'; 

        fetchSuccessfulAppointmentsData().then(data => {
            successfulAppointmentsChart.data = data;
            successfulAppointmentsChart.update();
        });
    });
    document.getElementById('monthlyIncome').addEventListener('click', function() {
        monthlyIncomeCanvas.style.display = 'block';
        dailyIncomeCanvas.style.display = 'none'; 

        calculateMonthlyClinicIncome().then(data => {
            monthlyIncomeChart.data = data;
            monthlyIncomeChart.update();
        });
    });
    document.getElementById('dailyIncome').addEventListener('click', function() {
        dailyIncomeCanvas.style.display = 'block';
        monthlyIncomeCanvas.style.display = 'none'; 

        calculateDailyClinicIncome().then(data => {
            dailyIncomeChart.data = data;
            dailyIncomeChart.update();
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
function calculateMonthlyClinicIncome() {
  try{
    return fetch('/clinic/monthly-incomedata')
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
  }catch(error){
    console.log(error.message);
  }
    }

function fetchTodaysAppointmentsData() {
    fetch('/clinic/clinic-appbardata')
        .then(response => response.json())
        .then(({datasets, labels}) => {

        const ctx = document.getElementById('TodaysAppointmentServices');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Appointments By Service',
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


