const express = require('express');
const access_router = express.Router();


const {  renderClinicLogin } = require('../Controllers/clinicController');

//Login Routes
access_router.get('/clinic-login', renderClinicLogin);


module.exports = { access_router };
