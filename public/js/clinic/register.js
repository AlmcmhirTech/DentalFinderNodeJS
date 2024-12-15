document.addEventListener('DOMContentLoaded', function () {
const requestForm = document.getElementById('clinic-request');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const License = document.querySelector('#license');
const clinicName = document.querySelector('#name');
const clinicSpecialty = document.querySelector('#specialty');
const clinicEmail = document.querySelector('#email');
const Password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const clinicPhone = document.querySelector('#phone');
const clinicAddress = document.querySelector('#address');
const clinicPostCode = document.querySelector('#code');
const clinicVillage = document.querySelector('#village');

requestForm.addEventListener('submit', (e) => {
  let errors = [];

  if (!License.files[0]) {
    errors.push('License File');
    document.getElementById('license-err').innerText = "Required."
  }else{
    document.getElementById('license-err').innerText = ""
  }
  if (clinicName.value === '') {
    errors.push('Name');
    document.getElementById('name-err').innerText = "Required."
  }else{
    document.getElementById('name-err').innerText = ""
  }
   if (clinicSpecialty.value === '') {
    errors.push('Specialty');
    document.getElementById('specialty-err').innerText = "Required."
  }else{
    document.getElementById('specialty-err').innerText = ""
  }
  if(clinicEmail.value === ''){
    errors.push('Email');
    document.getElementById('email-err').innerText = 'Required.';
  }else if(!emailRegex.test(clinicEmail.value)){
    errors.push('Email');
    document.getElementById('email-err').innerText = 'Invalid Email.';
  }else{
    document.getElementById('email-err').innerText = '';
  }
  if(Password.value === ''){
    errors.push('Password');
    document.getElementById('password-err').innerText = 'Required.';
  }else if(Password.value < 11){
    errors.push('Password');
    document.getElementById('password-err').innerText = 'Password must be at least 8 characters.';
  }else{
    document.getElementById('password-err').innerText = '';
  }
  if(confirmPassword.value === ''){
    errors.push('Confirm');
    document.getElementById('confirm-err').innerText = 'Required.';
  }else if(confirmPassword.value !== Password.value){
    errors.push('Confirm');
    document.getElementById('confirm-err').innerText = 'Does not match the password.'; 
  }else{
    document.getElementById('confirm-err').innerText = '';
  }
  if(clinicPhone.value === '+63'){
    errors.push('Phone');
    document.getElementById('phone-err').innerText = 'Required.'; 
  }else{
    document.getElementById('phone-err').innerText = '';
  }
  if(clinicAddress.value === ''){
    errors.push('Address');
    document.getElementById('address-err').innerText = 'Required.'; 
  }else{
    document.getElementById('address-err').innerText = '';
  }
  if(clinicPostCode.value === ''){
    errors.push('Code');
    document.getElementById('code-err').innerText = 'Required.'; 
  }else{
    document.getElementById('code-err').innerText = '';
  }
  if(clinicVillage.value === ''){
    errors.push('Village');
    document.getElementById('village-err').innerText = 'Required.'; 
  }else{
    document.getElementById('village-err').innerText = '';
  }

    if(errors.length > 0){
        e.preventDefault();
        return;
    }
 });

});