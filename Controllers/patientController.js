// controllers/patientController.js
const bcrypt = require('bcryptjs');
const Patient =  require('../Models/patientModel');
const Appointment = require('../Models/appointmentModel');
const Clinic = require('../Models/clinicModel');

const clinic = new Clinic();
const patient = new Patient();

async function renderReviewPage(req, res){
    if( req.session.isAuthenticated && req.session.patient){
    res.render('patient/leave_review', { cssFile: '/leave_review.css', error: null });
    }
}

async function userReview(req, res){
    const { quality, review_comment } = req.body;

    try{
        const patient = new Patient(first_name = '', middle_name = '', last_name = '', email = '', password = '', mobile_number = '', 
            clinic_id = 1, rating = '', quality, review_comment);
        await patient.reviewClinic();
    }catch(error){
        res.status(400).send(error.message);
    }

}


async function rendershowAppointments(req, res){

    const user_id = req.session.patient[0].user_id;

    try{
        if( req.session.isAuthenticated && req.session.patient){
        const appointment = new Appointment(clinic_id = '', user_id, appointment_date = '', set_time = '', branch_id = '', service_id = '', status = '');
        const showRequests = await appointment.showAppointments();

        res.render('patient/show_appointments', { showRequests });
        }
    }catch(error){
        res.status(400).send(error.message);
    }

}
async function renderBrowsePage(req, res){
    try{  
        let clinics; 
        if( req.session.isAuthenticated && req.session.patient){
            const clinicdata = await clinic.getClinicData();
            if(req.session.clinic_results){
                clinics = req.session.clinic_results;
            }else{
                clinics =[];
            }
            res.render('patient/browse', { cssFile:'/browse.css', clinicdata, clinics});
        }

    }catch(error){
       res.status(500).send(error.message);
    }

}

async function renderAvailableClinics(req, res){
    let byVillageValue, byPostcodeValue, byAddressValue;
    if(req.body){
        ({byVillageValue, byPostcodeValue, byAddressValue} = req.body);
    }
    console.log(byVillageValue, byPostcodeValue, byAddressValue, 'hey');
    try{  
        if( req.session.isAuthenticated && req.session.patient ){
            if(byVillageValue || byPostcodeValue || byAddressValue){
                const clinic_results = await clinic.getClinics(byVillageValue, byPostcodeValue, byAddressValue);
                req.session.clinic_results = clinic_results;
                res.status(200).send({message:'success'});
            }else{
                req.session.clinic_results = null;
                res.status(200).send({message:'fail'});
            }

        }

    }catch(error){
       res.status(500).send(error.message);
    }

}

async function renderBookingPage(req, res){
    try{
        req.session.clinic_id = req.body.clinic_id;

        if( req.session.isAuthenticated && req.session.patient){
        const appointment = new Appointment(req.session.clinic_id);
        const categories = await appointment.getBookingCategories();
        const branches = await appointment.getBranches();

        res.render('patient/booking', { cssFile: '/single_booking.css', categories, branches });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function appointPatients(req,res){

    const clinic_id = req.session.clinic_id;
    const user_id = req.session.patient[0].user_id;
    const { appointment_date, set_time, branch_id, service_id } = req.body;
    console.log(clinic_id);

    try{
        const appointment = new Appointment(clinic_id, user_id, appointment_date, set_time, branch_id, service_id, status = 'Pending');
        await appointment.appointmentRequest();
        rendershowAppointments(req, res);
    }catch(error){
            console.error(error.message);
    }

}

function renderLoginPage(req, res){
    res.render('patient/patient_login', { cssFile: '/patient_login.css'});
}

async function loginPatients(req,res){
    
    const { emailValue, passwordValue } = req.body;

    try{
        const { result, error } = await patient.verifyPatient(emailValue, passwordValue);
        req.session.isAuthenticated = true;
        req.session.patient = result;
        console.log(req.session.patient[0].user_id)

        if(error.emailErr?.trim()){
            res.status(400).send({message:error.emailErr});
        }else if(error.passwordErr?.trim()){
            res.status(401).send({message:error.passwordErr});
        }else{ 
            res.status(200).send({success: true});
        }

    }catch(error){

        console.error(error);
        res.render('patient/patient_login', { cssFile: '/patient_login.css', error: 'Email or Password not found.' });
        
    }
}

function renderRegisterPage(req, res) {
    res.render('patient/patient_register', { cssFile: '/patient_register.css', error: null, success: null});  // Render registration page with no error
}

// Controller function to handle registration logic
async function registerPatients(req, res) {
    const { first_name, middle_name, last_name, email, password, mobile_number } = req.body;
   

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await patient.registerPatient(first_name, middle_name, last_name, email, hashedPassword, mobile_number, registered_id = 1);

        res.redirect('/patient/login');

    } catch (error) {
        console.error(error);
        res.redirect('/patient/register', { error: 'Registration failed. Please try again.' });

}
}
// Export the controller functions
module.exports = { renderAvailableClinics, userReview, renderReviewPage, rendershowAppointments, renderBookingPage, appointPatients, renderBrowsePage, renderLoginPage, loginPatients, renderRegisterPage, registerPatients };
