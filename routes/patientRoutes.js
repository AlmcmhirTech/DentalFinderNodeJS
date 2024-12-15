// routes/patientRoutes.js
const express = require('express');
const router = express.Router();


const { renderAvailableClinics, userReview, renderReviewPage, rendershowAppointments, renderBookingPage, appointPatients, renderBrowsePage, renderLoginPage, loginPatients, renderRegisterPage, registerPatients } = require('../Controllers/patientController');

//Register Routes
router.get('/register', renderRegisterPage);
router.post('/registersuccess', registerPatients);  

//Login Routes
router.get('/login', renderLoginPage);
router.post('/verifylogin', loginPatients); 

//Appointment Routes
router.post('/bookingsuccess', appointPatients);
router.post('/booking', renderBookingPage);
router.get('/show_appointments', rendershowAppointments);

//Browse Routes
router.get('/browse', renderBrowsePage);
router.post('/available-clinics', renderAvailableClinics);

//Review Routes
router.get('/leave_review', renderReviewPage);
router.post('/post_review', userReview);


module.exports = { express, router };
