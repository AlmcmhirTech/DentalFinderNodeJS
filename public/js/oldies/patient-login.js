const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('Login_button');
const email = document.getElementById('email');
const password = document.getElementById('password');

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
    fetch('/patient/verifylogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailValue, passwordValue }),
    })
    .then(res => res.json())
    .then(data => {
        if(data.message){
            document.getElementById('login-error').innerText = data.message;
        }else{
            window.location.href = '/patient/browse';
        }
    })
    }
    catch(error){
        console.log(error.message);
    }
});

