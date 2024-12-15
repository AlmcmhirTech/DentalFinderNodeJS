//ADD TRANSACTION
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const paymentDate = document.querySelector('#payment-date');
const serviceCategory = document.querySelector('#category');
const paymentMethod = document.querySelector('#method');
const Amount = document.querySelector('#amount');

const Addform = document.getElementById('add-transaction-form');
const errorDiv = document.getElementById('error_message');

if (!Addform) {
  console.error("Form Not Found!");
} else {

  Addform.addEventListener('submit', (e) => {
 
    let errors = [];

    if (firstName.value === '') {
      errors.push('First Name');
      document.getElementById('first_name_error').innerText = "First Name is required";
    }else{
      document.getElementById('first_name_error').innerText = "";
    }

    if (lastName.value === '') {
        errors.push('Last Name');
        document.getElementById('last_name_error').innerText = "Last Name is required";
    }else{
      document.getElementById('last_name_error').innerText = "";
    }

    if (paymentDate.value === '') {
        errors.push('Payment Date');
        document.getElementById('date_error').innerText = "Payment Date is required";
    }else{
      document.getElementById('date_error').innerText = "";
    }

    if (serviceCategory.value === '') {
        errors.push('Service Category');
        document.getElementById('date_error').innerText = "Services required";
    }else{
      document.getElementById('category_error').innerText = "";
    }

    if (paymentMethod.value === '') {
        errors.push('Payment Method');
        document.getElementById('method_error').innerText = "Payment Method is required";
    }else{
      document.getElementById('method_error').innerText = "";
    }
    if (Amount.value === '') {
        errors.push('Amount');
        document.getElementById('amount_error').innerText = "Payment Amount is required";
    }else{
      document.getElementById('amount_error').innerText = "";
    }

    if (errors.length > 0) {
      e.preventDefault();
      return;
    }else{
      if(res){
      window.location.reload();
      }
    }
  });

}

//CONFIRM SERVICE
const confirmForms = document.querySelectorAll(".confirm-form");

    if(!confirmForms){
      console.error("Form Not Found");
    }else{ 
      confirmForms.forEach((form) => { 
        form.addEventListener('submit',  async (e) =>{
          const formData = new FormData(form);

          const data = [];

          formData.forEach((value, key) => {
            data[key] = value;
          });

          const paymentId = data.payment_id;
          const firstName = data.first_name;
          const lastName = data.last_name;
          const paymentDate = data.payment_date;
          const serviceId = data.service_id;
          const paymentMethod = data.payment_method;
          const Amount = data.amount;
          
        try{
          e.preventDefault();
          const response = await fetch(`/clinic/confirmtransactions/${paymentId}/${firstName}/${lastName}/${paymentDate}
          /${serviceId}/${paymentMethod}/${Amount}`
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

        });
    });
  }

//EDIT SERVICE
  const updateForms = document.querySelectorAll(".edit-form");

  if(!updateForms){
    console.error("Form Not Found");
  }else{ 

    updateForms.forEach((form) => { 

      const currentValue = form.querySelector('#currentValue');
      const selectValue = form.querySelectorAll('.selectValue');
      
      try{
      selectValue.forEach((value) =>{
        if(currentValue.text == value.text){
          value.remove();
        }
      });
      }catch(error){
        console.error(error.message);
      }
      form.addEventListener('submit',  async (e) =>{
        e.preventDefault();
        const formData = new FormData(form);

        const data = [];

        formData.forEach((value, key) => {
          data[key] = value;
        });

        const paymentId = data.payment_id;
        const firstName = data.first_name;
        const lastName = data.last_name;
        const paymentDate = data.payment_date;
        const serviceId = data.service_id;
        const paymentMethod = data.payment_method;
        const Amount = data.amount;
        
      try{
        const res = await fetch(`/clinic/edittransactions/${paymentId}/${firstName}/${lastName}/${paymentDate}
        /${serviceId}/${paymentMethod}/${Amount}`
        ,{
            method: 'PATCH',
            body: JSON.stringify(data)
        });
      
        if (res.ok) {
          window.location.reload();
          const result = await res.json();
          console.log(result);
        } else {
          console.error(await res.text());
          // Display error message
        }
      }catch (error) {
      console.error(error);
      }

      });
  });
}


document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button[data-payment-id]');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const paymentId = e.target.dataset.paymentId;
        document.getElementById('confirm-delete-btn').dataset.paymentId = paymentId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const paymentId = e.target.dataset.paymentId;
      try {
        const response = await fetch(`/clinic/deletetransaction/${paymentId}`, {
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

//DELETE TRANSACTION
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('button[data-payment-id]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const paymentId = e.target.dataset.paymentId;
      document.getElementById('confirm-delete-btn').dataset.paymentId = paymentId;
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
    const paymentId = e.target.dataset.paymentId;
    try {
      const response = await fetch(`/clinic/deletetransaction/${paymentId}`, {
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