const loginForm = document.getElementById('clinic-login-form');
const loginButton = document.getElementById('clinic-login-button');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
console.log(loginForm);

loginButton.disabled = true;
loginButton.style.opacity = '0.5';
loginButton.style.cursor = 'not-allowed';

loginForm.addEventListener('input', (e) =>{
    e.preventDefault();
    if(email.value && password.value){
        loginButton.disabled = false;
        loginButton.style.opacity = '1';
        loginButton.style.cursor = 'pointer';
    }else{
        loginButton.disabled = true;
        loginButton.style.opacity = '0.5';
        loginButton.style.cursor = 'not-allowed';
    }
});

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;
    try{
    fetch('/clinic/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailValue, passwordValue }),
    })
    .then(res => res.json())
    .then(data => {
        if(data.message){
            document.getElementById('login-error').innerText = data.message;
        }else{
            window.location.href = '/clinic/dashboard';
        }
    })
    }
    catch(error){
        console.log(error.message);
    }
});

