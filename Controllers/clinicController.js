const bcrypt = require('bcryptjs');
const Admin = require('../Models/adminModel');
const Clinic = require('../Models/clinicModel');
const Appointment = require('../Models/clinicModel');
const ChartJS = require('chart.js');
const moment = require('moment');

const admin = new Admin();
const clinic = new Clinic();
const appointment = new Appointment();


async function renderClinicLogin(req, res){
    res.render('clinic/clinic_login', { cssFile:'/css/clinic_login.css', error: null });
}
async function loginClinic(req,res){
    
  const { emailValue, passwordValue } = req.body;

  try{
      const { result, error } =  await clinic.verifyClinic(emailValue, passwordValue);
      req.session.isAuthenticated = true;
      req.session.clinic = result;

      if(error.emailErr?.trim()){
        res.status(400).send({message:error.emailErr});
      }else if(error.passwordErr?.trim()){
          res.status(401).send({message:error.passwordErr});
      }else{
          res.status(200).json({ success: true });
      }


  }catch(error){

      console.error(error);
      renderClinicLogin(req, res);
      
  }
}

async function renderClinicRequest(req, res){
  const villages = await clinic.getVillages();
  const specialties = await clinic.getSpecialties();

  res.render('clinic/clinic_register', { specialties, villages, cssFile:'/css/clinic_register.css', error: null });
}

  async function registerClinics(req,res){
      const { license, name, email, password, phone, address, code, village, specialty } = req.body;
       console.log(license, name, email, password, phone, address, code, village, specialty);
      
          try{
              await clinic.clinicRegister(license, name, email, password, phone, address, code, village, specialty);
              res.redirect('/clinic/login');
          }catch(error){
              res.status(500).send(error.message);
          }
      
  }

async function renderClinic(req, res){

  if(req.session.clinic && req.session.isAuthenticated){
      const section = req.params.section; 

      const {address, filter, search_patient}= req.body;

      const clinic_id = req.session.clinic[0].clinic_id;
      const rappointments = await clinic.recentAppointments(clinic_id);
      const pending_appointments = await clinic.pendingAppointments(clinic_id, address);
      const accepted_appointments = await clinic.acceptedAppointments(clinic_id, address);
      const rejected_appointments = await clinic.rejectedAppointments(clinic_id, address);
      const branches = await clinic.getBranches(clinic_id);
      const villages = await clinic.getVillages();
      const transactions = await clinic.getTransactions(clinic_id, filter, search_patient);

      let select;
      let custom;

      if (section === 'dashboard') {
          content = './dashboard';
      }else if (section === 'appointments'){
        content = './appointments';
      }else if (section === 'branches'){
        content = './branches';
      }else if (section === 'statistics'){
        content = './statistics';
      }else if (section === 'transactions'){
        content = './transactions';
        if(req.body){
          req.session.status = req.body.filter;
          req.session.custom_patient = req.body.search_patient;
        }
        select = req.session.status;
        custom = req.session.custom_patient;
      }

      res.render('clinic/clinic', { transactions, select, custom, villages, branches, rejected_appointments, accepted_appointments, pending_appointments, rappointments, body: content });
  }
}

async function acceptAppointments(req, res){
  const {appointment_id} = req.params;

  try{
    await clinic.acceptAppointment(appointment_id);
    res.status(200).send({message:'success'});

  }catch(error){
    throw new Error(error.message);
  }
}
async function rejectAppointments(req, res){
  const {appointment_id} = req.params;

  try{
    await clinic.rejectAppointment(appointment_id);
    res.status(200).send({message:'success'});

  }catch(error){
    throw new Error(error.message);
  }
}
async function deleteAppointments(req, res){
  const {appointment_id} = req.params;

  try{
    await clinic.deleteAppointment(appointment_id);
    res.status(200).send({message:'success'});

  }catch(error){
    throw new Error(error.message);
  }
}

async function deleteBranches(req, res){
  const {branch_id} = req.params;

  try{
    await clinic.deleteBranch(branch_id);
    res.status(200).send({message:'success'});

  }catch(error){
    throw new Error(error.message);
  }
}

// async function renderHomepage(req, res){

//     try {
//       if( req.session.isAuthenticated && req.session.clinic){
//         res.render('clinic/homepage', { cssFile: "/clinic.css" , categories : ['appointments', 'reports']});
//       }

//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       } 
// }

async function renderBarGraph(req, res){
  const  clinic_id  = req.session.clinic[0].clinic_id;
    try{
        // const { clinic_id } = req.session.clinic_id;
        const clinic = new Clinic();
        const rows = await clinic.countAppointments(clinic_id);

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
async function renderBarGraphSuccessful(req, res){
  const  clinic_id  = req.session.clinic[0].clinic_id;
    try{
        // const { clinic_id } = req.session.clinic_id;
        const clinic = new Clinic();
        const rows = await clinic.successfulAppointments(clinic_id);
  

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
async function renderAdminDailyIncome(req, res){
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
          throw error; 
      }
}
async function renderAdminMonthlyIncome(req, res){
  try{
      const rows = await admin.calculateMonthlyIncome();
      const chartData = {
          labels: rows.map(row => row.month),
          datasets: [{
            label: 'Monttly Income',
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
async function renderClinicDailyIncome(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  try{
      const rows = await clinic.calculateClinicDailyIncome(clinic_id);
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
          throw error; 
      }
}
async function renderClinicMonthlyIncome(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  try{
      const rows = await clinic.calculateClinicMonthlyIncome(clinic_id);

      const chartData = {
          labels: rows.map(row => row.month),
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
          throw error; 
      }
}
async function renderDynamicTable(req, res){
  const categories = req.params.category;
  const  clinic_id  = req.session.clinic[0].clinic_id;
  let tableData;
  const clinic = new Clinic();
  switch(categories){
    case 'appointments':
      tableData = await clinic.allPatients(clinic_id);
      break;
    case 'reports':
      tableData = await clinic.allReports(clinic_id);
      break;
    default:
      tableData = [];
  }
  res.json(tableData);
}

async function renderProfile(req,res){
  const  clinic_id  = req.session.clinic[0].clinic_id;
  try{
    if( req.session.isAuthenticated && req.session.clinic){
    const clinic = new Clinic();
    const clinics = await clinic.getClinicProfile(clinic_id);
  

    res.render('clinic/profile', { clinics, cssFile: "/clinic.css"});
    }

  }catch(error){
    res.status(500).send(error.message);
 }
}
async function updateProfile(req,res){
  
  const { clinic_email } = req.params;
  console.log(clinic_email);
  const  clinic_id  = req.session.clinic[0].clinic_id;

  try{

     await clinic.updateProfiles(clinic_id, clinic_email);

  }catch(error){
    res.status(500).send(error.message);
 }
}
async function updateService(req,res){
  
  const { service_id, price, description } = req.params;
  const  clinic_id  = req.session.clinic[0].clinic_id;

  try{
    await clinic.updateServices(clinic_id, service_id, price, description);
    renderServices(req,res);

  }catch(error){
    res.status(500).send(error.message);
 }
}



async function renderServices(req, res){

  const clinic_id = req.session.clinic[0].clinic_id;
  const categories = await clinic.getServicesCategories();
  const services = await clinic.getClinicsServices(clinic_id);

  if( req.session.isAuthenticated && req.session.clinic){
  try{
  res.render('clinic/services', { cssFile: '/tables.css', services, categories, error: null });
  }
  catch(error){
    console.error(error.message);
  }
}

}
async function DeleteClinicService(req, res){
  const { service_id } = req.params;
  const  clinic_id  = req.session.clinic[0].clinic_id;
  console.log(service_id);

  try{
    await clinic.deleteClinicsServices(service_id, clinic_id);
    renderServices(req,res);

  }catch(error){
    console.error(error.message);
  }
}
async function DeleteTransaction(req, res){
  const { payment_id } = req.params;
  console.log(payment_id);

  try{
    await clinic.deleteTransactions(payment_id);
    res.status(200).send({success:true});

  }catch(error){
    console.error(error.message);
  }
}

async function AddClinicService(req, res){
  const { service_id, price, description } = req.body;
  const  clinic_id  = req.session.clinic[0].clinic_id;
  try{
    await clinic.AddServices(clinic_id, service_id, price, description);
    res.redirect('/clinic/services');
  }catch(error){
    console.error(error.message);
  }
}
async function NewClinicService(req, res) {
  const { service_name, price, description } = req.body;
  const  clinic_id  = req.session.clinic[0].clinic_id;
  try{
    await clinic.newServiceRequest(clinic_id, service_name, price, description);
    res.redirect('/clinic/services');

  }catch(error){
    console.error(error.message);
  }
}
async function renderBranches(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;

  const branches = await clinic.getBranches(clinic_id);
  if( req.session.isAuthenticated && req.session.clinic){
  try{
  res.render('clinic/branches', { cssFile: '/tables.css', branches, error: null  });
  }
  catch(error){
    console.error(error.message);
  }
}
}
async function renderTransactions(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  const payments = await clinic.getPayments(clinic_id);
  const payment_date = moment(payments.payment_date).format('YYYY-MM-DD');
  const methods = await clinic.getMethods();
  const clinics_categories = await clinic.getServicesCategories();

  if( req.session.isAuthenticated && req.session.clinic){
  try{
  res.render('clinic/transactions', { cssFile: '/tables.css', clinics_categories, payment_date, payments, methods, error: null  });
  }
  catch(error){
    console.error(error.message);
  }
}
}
async function renderPayments(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  const payments = await clinic.getPayments(clinic_id);
  res.json(payments);
}

async function confirmTransactions(req, res){
  const { payment_id } = req.params;

  try{
    await clinic.confirmTransaction(payment_id);
    res.status(200).send({success:true});
  }catch(error){
    console.error(error.message);
  }

}
async function updateTransactions(req, res){
  const { payment_id, first_name, last_name, payment_date, service_id, payment_method_id, amount } = req.params;

  try{
    await clinic.updateTransaction(payment_id, first_name, last_name, payment_date, service_id, payment_method_id, amount);
    renderTransactions(req, res);
  }catch(error){
    console.error(error.message);
  }

}
async function AddTransactions(req, res) {

  const clinic_id = req.session.clinic[0].clinic_id;
  const { first_name, last_name, amount, service_id, payment_date, payment_id } = req.body;

  try {
    await clinic.addTransaction(clinic_id, first_name, last_name, amount, service_id, payment_date, payment_id, status = 'Pending');
    res.redirect('/clinic/transactions');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error:   'Failed to add branch request' });
  }
}
async function AddBranchRequest(req, res) {
  const { branch_address, license, branch_image, mobile_number, village, postcode, statement } = req.body;
  console.log(village);
  try {
    await clinic.addBranchRequest(1, branch_address, license, branch_image, mobile_number, village, postcode, statement);
    res.status(200).send({message:'success'});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error:   'Failed to add branch request' });
  }
}

async function DeleteBranchRequest(req, res) {
  const { branch_address, license, branch_image, mobile_number } = req.body;
  const clinic_id = req.session.clinic[0].clinic_id;
  const request_type = 'Delete';

  try {
    await clinic.deleteBranchRequest(clinic_id, branch_address, license, branch_image, mobile_number, request_type);
    res.redirect('/clinic/branches');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error:   'Failed to add branch request' });
  }
}

async function EditBranchRequest(req, res) {
  const { branch_address, license, branch_image, mobile_number } = req.body;
  const clinic_id = req.session.clinic[0].clinic_id;
  const request_type = 'Change';

  try {
    await clinic.editBranchRequest(clinic_id, branch_address, license, branch_image, mobile_number,  request_type);
    res.redirect('/clinic/branches');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error:   'Failed to add branch request' });
  }
}
async function updateBranch(req,res){
  
  const { branch_id, branch_image, branch_address, mobile_number, license  } = req.params;

  try{

    await clinic.updateBranches(branch_id, branch_address, mobile_number, branch_image, license);
    res.redirect('/clinic/branches');

  }catch(error){
    res.status(500).send(error.message);
 }
}

//GRAPHS

async function renderAllAppointmentsGraph(req, res){
  try{
      const rows = await admin.countAllAppointments();

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
            label: 'Total Successful Appointments',
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

async function renderTodaysClinicAppointmentsGraph(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  try{
      const rows = await clinic.countTodaysClinicAppointments(clinic_id);

      const chartData = {
          labels: rows.map(row => row.service_name),
          datasets: [{
            label: 'Total Appointments Today',
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

async function renderAllSuccessfulClinicAppointmentsGraph(req, res){
  const clinic_id = req.session.clinic[0].clinic_id;
  try{
      const rows = await clinic.countAllSuccessfulClinicAppointments(clinic_id);

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







module.exports = {renderAllSuccessfulAppointmentsGraph, renderAdminMonthlyIncome, renderAdminDailyIncome, renderAllAppointmentsGraph, renderClinicMonthlyIncome, renderClinicDailyIncome, renderAllSuccessfulClinicAppointmentsGraph, renderTodaysClinicAppointmentsGraph, deleteBranches, deleteAppointments, rejectAppointments, acceptAppointments, EditBranchRequest, renderPayments, confirmTransactions, updateTransactions, DeleteTransaction, AddTransactions, renderTransactions,
  DeleteBranchRequest, updateBranch, AddBranchRequest, renderBranches, 
  DeleteClinicService, updateService, NewClinicService, AddClinicService, renderServices, 
  loginClinic, updateProfile, renderProfile, renderDynamicTable, renderBarGraphSuccessful, 
  renderBarGraph, renderClinic, registerClinics, renderClinicLogin, renderClinicRequest };