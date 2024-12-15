document.addEventListener('DOMContentLoaded', () => {
    //DELETE APPOINTMENT REQUEST
    const deleteBranchButtons = document.querySelectorAll('div[data-branch-id]');
    
    deleteBranchButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const branchId = e.currentTarget.dataset.branchId;
        console.log(branchId);
        document.getElementById('confirm-delete-btn').dataset.branchId = branchId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const branchId = e.currentTarget.dataset.branchId;
      try {
        const res = await fetch(`/clinic/delete-branch/${branchId}`, {
          method: 'DELETE',
           headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
          window.location.reload();
        } else {
          console.error(await response.text());
        }
      } catch (error) {
        console.error(error);
      }
    });

    //ADD BRANCH VERIFICATION

    //ADD BRANCH
const branchAddressInput = document.querySelector('#branch_address');
const villageSelect = document.querySelector('#villageSelect');
const postCode = document.querySelector('#postcode');
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

    if (villageSelect.value === '') {
      errors.push('Village');
      document.getElementById('village_error').innerText = "Village is required."
    } else {
      document.getElementById('village_error').innerText = "";
    }

    if (postCode.value === '') {
      // Check if postcode is empty
      errors.push('Post Code');
      document.getElementById('code_error').innerText = "Post Code is required.";
  } else if (!/^\d{4}$/.test(postCode.value)) {
      // Check if postcode is not exactly 4 digits
      errors.push('Post Code');
      document.getElementById('code_error').innerText = "Post Code must be exactly 4 digits.";
  } else {
      // Clear error if valid
      document.getElementById('code_error').innerText = "";
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
      document.getElementById('license_error').innerText = "License File/s are/is required."
    }else{
      document.getElementById('license_error').innerText = ""
    }
    if (errors.length > 0) {
      e.preventDefault();
       return;
    }else{
    formData.append('branch_image', branchImage);
    formData.append('license', branchLicense);

    fetch('/admin/branch-requests', {
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

  
  
  });