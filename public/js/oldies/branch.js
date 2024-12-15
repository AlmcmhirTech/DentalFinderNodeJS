//ADD BRANCH
const branchAddressInput = document.querySelector('#branch_address');
const mobileNumberInput = document.querySelector('#branch_contact');
const branchImage = document.querySelector('#branch_image');
const branchLicense = document.querySelector('#license');
const Addform = document.getElementById('branch-request-form');
const errorDiv = document.getElementById('error_message');

if (!Addform) {
  console.error("Form Not Found!");
} else {

  Addform.addEventListener('submit', (e) => {
    const formData = new FormData(Addform);

    let errors = [];

    if (branchAddressInput.value === '') {
      errors.push('Branch Address');
      document.getElementById('branch_error').innerText = "Address is required."
    } else {
      document.getElementById('branch_error').innerText = "";
    }

    if (mobileNumberInput.value === '' || isNaN(mobileNumberInput.value)) {
      errors.push('Mobile Number');
      document.getElementById('phone_error').innerText = "Mobile Number is required."
    }else{
      document.getElementById('phone_error').innerText = ""
    }

    if (!branchImage.files[0]) {
      errors.push('Branch Image');
      document.getElementById('image_error').innerText = "Branch Image is required."
    }else{
      document.getElementById('image_error').innerText = ""
    }

    if (!branchLicense.files[0]) {
      errors.push('License File');
      document.getElementById('code_error').innerText = "License File/s are/is required."
    }else{
      document.getElementById('code_error').innerText = ""
    }

    if (errors.length > 0) {
      e.preventDefault();
       return;
    }
    else{

    formData.append('branch_image', branchImage);
    formData.append('license', branchLicense);

    fetch('/admin/uploads', {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        errorDiv.innerText = err.message;
        console.error(err);
      });
    }
  });
}


//EDIT BRANCH
if (!Addform) {
  console.error("Form Not Found!");
} else {

  Addform.addEventListener('submit', (e) => {
    const formData = new FormData(Addform);

    let errors = [];

    if (branchAddressInput.value === '') {
      errors.push('Branch Address');
      document.getElementById('branch_error').innerText = "Address is required."
    } else {
      document.getElementById('branch_error').innerText = "";
    }

    if (mobileNumberInput.value === '' || isNaN(mobileNumberInput.value)) {
      errors.push('Mobile Number');
      document.getElementById('phone_error').innerText = "Mobile Number is required."
    }else{
      document.getElementById('phone_error').innerText = ""
    }

    if (!branchImage.files[0]) {
      errors.push('Branch Image');
      document.getElementById('image_error').innerText = "Branch Image is required."
    }else{
      document.getElementById('image_error').innerText = ""
    }

    if (!branchLicense.files[0]) {
      errors.push('License File');
      document.getElementById('code_error').innerText = "License File/s are/is required."
    }else{
      document.getElementById('code_error').innerText = ""
    }

    if (errors.length > 0) {
      e.preventDefault();
       return;
    }
    else{

    formData.append('branch_image', branchImage);
    formData.append('license', branchLicense);

    fetch('/admin/uploads/uploads-request', {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        errorDiv.innerText = err.message;
        console.error(err);
      });
    }
  });
}

//DELETE BRANCH

if (!Addform) {
  console.error("Form Not Found!");
} else {

  Addform.addEventListener('submit', (e) => {
    const formData = new FormData(Addform);

    let errors = [];

    if (branchAddressInput.value === '') {
      errors.push('Branch Address');
      document.getElementById('branch_error').innerText = "Address is required."
    } else {
      document.getElementById('branch_error').innerText = "";
    }

    if (mobileNumberInput.value === '' || isNaN(mobileNumberInput.value)) {
      errors.push('Mobile Number');
      document.getElementById('phone_error').innerText = "Mobile Number is required."
    }else{
      document.getElementById('phone_error').innerText = ""
    }

    if (!branchImage.files[0]) {
      errors.push('Branch Image');
      document.getElementById('image_error').innerText = "Branch Image is required."
    }else{
      document.getElementById('image_error').innerText = ""
    }

    if (!branchLicense.files[0]) {
      errors.push('License File');
      document.getElementById('code_error').innerText = "License File/s are/is required."
    }else{
      document.getElementById('code_error').innerText = ""
    }

    if (errors.length > 0) {
      e.preventDefault();
       return;
    }
    else{

    formData.append('branch_image', branchImage);
    formData.append('license', branchLicense);

    fetch('/admin/uploads/uploads-request', {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        errorDiv.innerText = err.message;
        console.error(err);
      });
    }
  });
}
