const express = require('express');
const multer = require('multer');
const admin_router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});
const request_storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/uploads-request');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
const upload_request = multer({ request_storage });
const {  acceptClinic, acceptBranch, deleteBranchRequest, acceptService, deleteServiceRequest, deleteClinicRequest, deleteClinics, deletePatients, renderMonthlyIncome,  renderDailyIncome, renderAdminDynamicTable, renderAllSuccessfulAppointmentsGraph, 
         renderAdmin, changeRequestController } = require('../Controllers/adminController');
const { DeleteBranchRequest, EditBranchRequest, AddBranchRequest, NewClinicService } = require('../Controllers/clinicController');

//Homepage
admin_router.get('/:section/:params?', renderAdmin);
admin_router.post('/:section', renderAdmin);
admin_router.get('/admin-dailyincome', renderDailyIncome);
admin_router.get('/mincomedata', renderMonthlyIncome);
admin_router.get('/okappbardata', renderAllSuccessfulAppointmentsGraph);
admin_router.get('/admin-dynamic-table/:category', renderAdminDynamicTable);


//Patient Data
admin_router.delete('/delete-user/:patient_id', deletePatients);

//Clinic Data
admin_router.delete('/delete-clinic/:clinic_id', deleteClinics);


//REQUESTS

admin_router.patch('/confirm-branch-request/:request_id', acceptBranch);
admin_router.delete('/delete-branch-request/:request_id', deleteBranchRequest);

admin_router.patch('/confirm-account-request/:request_id', acceptClinic);
admin_router.delete('/delete-clinic-request/:request_id', deleteClinicRequest);

admin_router.post('/changerequest', changeRequestController);

admin_router.post('/addservicerequest', NewClinicService);

admin_router.post('/editbranchrequest', EditBranchRequest);
admin_router.post('/deletebranchrequest', DeleteBranchRequest);

admin_router.post('/uploads', upload.fields([{name: 'branch_image'}, {name: 'license'}]), (req, res) => {
    try {
      console.log(req.files);
      res.status(200).send({message:"success"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error uploading files!');
    }
  });

  admin_router.post('/uploads/branch-request', upload_request.fields([{name: 'branch_image'}, {name: 'license'}]), (req, res) => {
    try {
      console.log(req.files);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error uploading files!');
    }
  });
  admin_router.post('/uploads/branch-request', upload_request.fields([{name: 'branch_image'}, {name: 'license'}]), (req, res) => {
    try {
      console.log(req.files);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error uploading files!');
    }
  });



module.exports = {admin_router};