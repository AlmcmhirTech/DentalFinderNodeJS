const form = document.getElementById('edit-branch-form');

if(!form){
    console.error("Form Not Found");
}else{ 
    
    form.addEventListener('submit',  async (e) =>{
    const formData = new FormData(form);

    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    const branchId = data.branch_id;
    const branchAddress = data.branch_address;
    const branchContact = data.mobile_number;
    const branchLicense = data.license;
    const branchImage = data.branch_image;
    console.log(branchAddress,branchContact,branchId,branchLicense,branchImage);

    try{
        e.preventDefault();
        const response = await fetch(`/clinic/branches/${branchId}/${branchAddress}/${branchContact}
        /${branchLicense}/${branchImage}`
        ,{
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    
    if (response.ok) {
        window.location.reload();
        const result = await response.json();
        console.log(result);
      } else {
        console.error(await response.text());
        // Display error message
      }
    }catch (error) {
    console.error(error);
    }
})
}

document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button[data-service-id]');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const branchId = e.target.dataset.serviceId;
        document.getElementById('confirm-delete-btn').dataset.branchId = branchId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const branchId = e.target.dataset.branchId;
      try {
        const response = await fetch(`/clinic/deletebranch/${branchId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error(await response.text());
        }
      } catch (error) {
        console.error(error);
      }
    });
  });