const Clinic = require('../Models/clinicModel');
const Admin = require('../Models/adminModel');
const ChartJS = require('chart.js');
const admin = new Admin();
const clinic = new Clinic();

async function changeRequestController(req, res){
    const {clinic_id, new_clinic_address, new_clinic_name, new_license_code, file_id} = req.body;
  
    try{
      clinic.changeRequest(clinic_id, new_clinic_address, new_clinic_name, new_license_code, file_id, status = 'Pending');
      
    }catch(error){
        console.error(error.message);
    }
  }
async function renderAdmin(req, res){
  const section = req.params.section; 
  const { search_patient, filter, search_clinic } = req.body;
  const patients = await admin.getAllPatientsData(search_patient, filter);
  const clinics = await admin.getAllClinicData(search_clinic, filter);
  const accounts = await admin.allAccountsRequest();
  const rbranches = await admin.allBranchesRequest();
  const dashrbranches = await admin.recentBranchesRequest();
  const dashaccounts = await admin.recentAccountsRequest();
  
  let select;
  let custom;
  let category = [];
  const categories = ['Branch', 'Accounts'];
  
  if (section === 'dashboard') {
    content = './dashboard';
    if(req.params.category){
      req.session.dashboard = req.params.category;
    }
    category = req.session.dashboard;
  }else if (section === 'patients'){
    content = './patients';
     if(req.body){
      req.session.filter_patient = req.body.filter;
      req.session.custom_patient = req.body.search_patient;
    }
    select = req.session.filter_patient;
    custom = req.session.custom_patient;
  }else if (section === 'clinics'){
    content = './clinics';
    if(req.body){
      req.session.filter_clinic = req.body.filter;
      req.session.custom_clinic = req.body.search_clinic;
    }
    select = req.session.filter_clinic;
    custom = req.session.custom_clinic;
  }else if (section === 'requests'){
    content = './requests';
    if(req.params.params){
      req.session.request = JSON.parse(req.params.params);
     [selectedCategory] = req.session.request;
    }
    category.push(req.session.request);
  }else if (section === 'statistics'){
    content = './statistics';
  }

  if(section !== 'requests'){
    req.session.request = null; 
  }
  if(section !== 'dashboard'){
    req.session.dashboard = null; 
  } 
  if(section !== 'patients'){
    req.session.filter_patient = null; 
    req.session.custom_patient = null; 
  } 
  if(section !== 'clinics'){
    req.session.filter_clinic = null; 
    req.session.custom_clinic = null; 
  } 


  res.render('admin/admin', { select, custom, categories, category, dashrbranches, dashaccounts, rbranches, accounts, clinics, patients , body: content });
}  // res.render('admin/dashboard', { cssFile: "/style.css", categories : ['Branches', 'Services', 'Accounts']});


async function renderDailyIncome(req, res){
  try{
      const rows = await admin.calculateDailyIncome();

      const chartData = {
          labels: rows.map(row => row.day),
          datasets: [{
            label: 'Daily Income',
            data: rows.map(row => row.income),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        };
        
        res.json(chartData);
      }catch(error){
          console.error(error.message);
      }
}
async function renderMonthlyIncome(req, res){
  try{
      const rows = await admin.calculateMonthlyIncome();

      const chartData = {
          labels: rows.map(row => row.month),
          datasets: [{
            label: 'Monthly Income',
            data: rows.map(row => row.income),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        };
        
        res.json(chartData);
      }catch(error){
          console.error(error.message);
          throw error; 
      }
}
async function renderAllAppointmentsGraph(req, res){
    console.log('renderdailyincome');
    try{
        const rows = await admin.countAllAppointments();
        console.log(rows);

        const chartData = {
            labels: rows.map(row => row.service_name),
            datasets: [{
              label: 'Total Appointments',
              data: rows.map(row => row.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          };
          
          res.json(chartData);
        }catch(error){
            console.error(error.message);
            throw error; 
        }
}
async function renderAllSuccessfulAppointmentsGraph(req, res){
    try{
        const rows = await admin.allSuccessfulAppointments();
  
        const chartData = {
            labels: rows.map(row => row.service_name),
            datasets: [{
              label: 'Total Appointments',
              data: rows.map(row => row.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          };
          
          res.json(chartData);
        }catch(error){
            console.error(error.message);
            throw error; 
        }
}
async function renderAdminDynamicTable(req, res){
  const categories = req.params.category;
  let tableData;
  switch(categories){
    case 'Branches':
      tableData = await admin.allBranchesRequest();
      break;
    case 'Accounts':
    tableData = await admin.allAccountsRequest();
    break;
    default:
      tableData = [];
  }
  res.json(tableData);
}

// async function renderClinicData(req, res){

//   const clinics = await admin.getAllClinicData();
  
//   res.render('admin/clinic_data', { cssFile: '/tables.css', clinics});

// }

// async function renderPatientData(req, res){

//   const patients = await admin.getAllPatientsData();
  
//   res.render('admin/patient_data', { cssFile: '/tables.css', patients});

// }

async function deletePatients(req, res){
  const { patient_id } = req.params;
  try{
    await admin.deletePatient(patient_id);
    res.status(200).send({message:'success'});

  }catch(error){
    console.error(error.message);
  }
}

async function deleteClinics(req, res){
  const { clinic_id } = req.params;
  try{
    await admin.deleteClinic(clinic_id);

  }catch(error){
    console.error(error.message);
  }
}
async function acceptClinic(req, res){
  const { request_id } = req.params;
  console.log(request_id);

  try{
    await admin.acceptClinic(request_id);
    res.status(200).send({message:'success'});
  }catch(error){
    console.error(error.message);
  }
}
async function acceptBranch(req, res){
  const { request_id } = req.params;
  console.log(request_id);

  try{
    await admin.acceptBranch(request_id);
    res.status(200).send({message:'success'});
  }catch(error){
    console.error(error.message);
  }
}
async function deleteBranchRequest(req, res){
  const { request_id } = req.params;
  console.log(request_id);
  try{
    await admin.deleteBranchRequest(request_id);
    res.status(200).send({message:'success'});

  }catch(error){
    console.error(error.message);
  }
}
async function AddBranchRequest(req, res){
  const { branch_address, village, postcode, mobile_number, image, license, statement } = req.body;
  console.log(req.body);
  try{
    await admin.AddBranchRequest(branch_address, village, postcode, mobile_number, image, license, statement);
    res.redirect('/clinic/branches');

  }catch(error){
    console.error(error.message);
  }
}

async function acceptService(req, res){
  const { pendingId, serviceName, Price } = req.body;

  console.log(pendingId, serviceName, Price);
  try{
    await admin.deleteServiceRequest(pendingId);
    await admin.acceptServices(serviceName, Price);
    res.redirect('/admin/homepage');

  }catch(error){
    console.error(error.message);
  }
}async function deleteServiceRequest(req, res){
  const { pendingId } = req.body;
  console.log(pendingId);
  try{
    await admin.deleteServiceRequest(pendingId);
    res.redirect('/admin/homepage')

  }catch(error){
    console.error(error.message);
  }
}
// async function acceptClinic(req, res){
//   const {  } = req.body;
//   console.log( pendingId, clinicName, clinicEmail, clinicAddress, village, postcode, password, mobileNumber);
//   try{
//     await admin.deleteClinicRequest(pendingId);
//     await admin.acceptClinics(clinicName, clinicEmail, clinicAddress, village, postcode, password, mobileNumber);
//     res.redirect('/admin/homepage')

//   }catch(error){
//     console.error(error.message);
//   }
// }
async function deleteClinicRequest(req, res){
  const { request_id } = req.params;
  console.log(request_id);
  try{
    await admin.deleteClinicRequest(request_id);
    res.status(200).send({message:"success"});
  }catch(error){
    console.error(error.message);
  }
}



  module.exports = { acceptClinic, acceptBranch, deleteBranchRequest, acceptService, deleteServiceRequest, 
    deleteClinicRequest, deleteClinics,
    deletePatients, renderDailyIncome,  renderMonthlyIncome, 
    renderAdminDynamicTable, renderAllSuccessfulAppointmentsGraph, renderAllAppointmentsGraph, 
    renderAdmin, changeRequestController, AddBranchRequest };