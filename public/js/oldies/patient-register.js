const registerForm = document.getElementById('register-form');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const firstName = document.getElementById('fname');
const middleName = document.getElementById('mname');
const lastName = document.getElementById('lname');
const Email = document.getElementById('email');
const Password = document.getElementById('password');
const conPassword = document.getElementById('conpassword');
const mobileNumber = document.getElementById('mobile_number');

registerForm.addEventListener('submit', (e) => {
  let errors = [];

    if(firstName.value === ''){
      errors.push('firstName');
      document.getElementById('fname_error').innerText = 'First Name is required.';
    }else{
      document.getElementById('fname_error').innerText = '';
    }
    if(middleName.value === ''){
      errors.push('middleName');
      document.getElementById('mname_error').innerText = 'Middle Name is required.';
    }else{
      document.getElementById('mname_error').innerText = '';
    }
    if(lastName.value === ''){
      errors.push('lastName');
      document.getElementById('lname_error').innerText = 'Last Name is required.';
    }else{
      document.getElementById('lname_error').innerText = '';
    }
    if(Email.value === ''){
      errors.push('Email');
      document.getElementById('email_error').innerText = 'Email is required.';
    }else if(!emailRegex.test(Email.value)){
      errors.push('Email');
      document.getElementById('email_error').innerText = 'Invalid Email.';
    }  
    else{
      document.getElementById('email_error').innerText = '';
    }
    if(Password.value === ''){
      errors.push('Password');
      document.getElementById('password_error').innerText = 'Password is required.';
    }else if(Password.value < 8){
      errors.push('Password');
      document.getElementById('password_error').innerText = 'Password must be at least 8 characters.';
    }else{
      document.getElementById('password_error').innerText = '';
    }
    if(conPassword.value === ''){
      errors.push('conPassword');
      document.getElementById('conpassword_error').innerText = 'Please Confirm Password.';
    }else if(conPassword.value !== Password.value){
      errors.push('conPassword');
      document.getElementById('conpassword_error').innerText = 'Confirm Password must be the same as Password.'; 
    }else{
      document.getElementById('conpassword_error').innerText = '';
    }
    if(mobileNumber.value === '+63'){
      errors.push('Phone');
      document.getElementById('number_error').innerText = 'Mobile Number is required.'; 
    }else{
      document.getElementById('number_error').innerText = '';
    }
  
    if(errors.length > 0){
      e.preventDefault();
      return;
    }
 });