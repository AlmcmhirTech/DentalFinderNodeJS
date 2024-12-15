const express = require('express');
const multer = require('multer');
const upload = multer()
const clinic_router = express.Router();


const {  renderAdminMonthlyIncome, renderAllSuccessfulAppointmentsGraph, renderAdminDailyIncome, renderAllAppointmentsGraph, renderClinicDailyIncome, renderClinicMonthlyIncome, renderAllSuccessfulClinicAppointmentsGraph, renderTodaysClinicAppointmentsGraph, deleteBranches, deleteAppointments, rejectAppointments, acceptAppointments, renderPayments, confirmTransactions, updateTransactions, DeleteTransaction, 
    AddTransactions, renderTransactions, updateBranch, 
    renderBranches, DeleteClinicService, updateService, renderServices, 
    AddClinicService, loginClinic, updateProfile, renderProfile, renderDynamicTable, 
    renderBarGraphSuccessful, renderBarGraph, renderClinic, registerClinics,
    renderClinicRequest } = require('../Controllers/clinicController');

//Login Routes
clinic_router.post('/login', loginClinic);

//Register Routes
clinic_router.get('/request', renderClinicRequest);
clinic_router.post('/sent-request', registerClinics);

//Hompage 
clinic_router.get('/admin-monthlyincome', renderAdminMonthlyIncome);
clinic_router.get('/admin-dailyincome', renderAdminDailyIncome);
clinic_router.get('/admin-appbardata', renderAllAppointmentsGraph);
clinic_router.get('/admin-successbardata', renderAllSuccessfulAppointmentsGraph);

clinic_router.get('/clinic-dailyincome', renderClinicDailyIncome);
clinic_router.get('/clinic-monthlyincome', renderClinicMonthlyIncome);
clinic_router.get('/clinic-appbardata', renderTodaysClinicAppointmentsGraph);
clinic_router.get('/clinic-successbardata', renderAllSuccessfulClinicAppointmentsGraph);
clinic_router.get('/dynamic-table/:category', renderDynamicTable);
clinic_router.get('/:section', renderClinic);
clinic_router.post('/:section?', renderClinic);
clinic_router.get('/bardata',  renderBarGraph);
clinic_router.get('/bardata2',  renderBarGraphSuccessful);

//Appointment Routes
clinic_router.patch('/accept-appointment/:appointment_id', acceptAppointments);
clinic_router.patch('/reject-appointment/:appointment_id', rejectAppointments);
clinic_router.delete('/delete-appointment/:appointment_id', deleteAppointments);
clinic_router.post('/appointments', renderClinic);

//Profile Routes
clinic_router.get('/profile', renderProfile);
clinic_router.patch('/profile/:clinic_email', upload.none(),  updateProfile);


//Add service Routes
clinic_router.get('/services', renderServices);
clinic_router.post('/addservice', AddClinicService);
clinic_router.patch('/editservices/:service_id/:price/:description', updateService);
clinic_router.delete('/deleteservice/:service_id', DeleteClinicService);

//Branches Routes
clinic_router.get('/branches', renderBranches);
clinic_router.patch('/branches/:branch_id/:branch_address/:mobile_number/:license/:branch_image', upload.none(),  updateBranch);
clinic_router.delete('/delete-branch/:appointment_id', deleteBranches);


//Transaction Routes
clinic_router.get('/table', renderPayments);
clinic_router.post('/addtransaction', AddTransactions);
clinic_router.delete('/delete-transaction/:payment_id', DeleteTransaction);
clinic_router.patch('/confirm-transaction/:payment_id', confirmTransactions);
clinic_router.patch('/edittransactions/:payment_id/:first_name/:last_name/:payment_date/:service_id/:payment_method_id/:amount', updateTransactions);

//Statistics Routes
clinic_router.get('/daily-incomedata', renderClinicDailyIncome);
clinic_router.get('/monthly-incomedata', renderClinicMonthlyIncome);

module.exports = { clinic_router };