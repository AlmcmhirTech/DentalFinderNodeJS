//ADD SERVICE
const serviceId = document.getElementById('service');
const serviceName = document.getElementById('service-name');
const Price = document.getElementById('minPrice');
const Description = document.getElementById('description');

const Addform = document.getElementById('add-service-form');
const errorDiv = document.getElementById('error_message');

Addform.addEventListener('input', () => {

    if(serviceName.value !== ''){
        serviceId.value = '';
        serviceId.disabled = true;
    }else{
        serviceId.disabled = false;
    }

});

Addform.addEventListener('submit', (e) => {
    let errors = [];

    if (serviceName.value === ''){

        if (serviceId.value === '') {
          errors.push('Services');
          document.getElementById('service_category_error').innerText = 'Services is required.';
        }
        else {
          document.getElementById('service_category_error').innerText = '';
        }

        if (Price.value === '') {
          errors.push('Price');
          document.getElementById('price_error').innerText = 'Price is required.';
        } else {
          document.getElementById('price_error').innerText = '';
        }
        if (errors.length > 0) {
          e.preventDefault();
          return;
        }else{
          window.location.reload();
        }
  }else{
    document.getElementById('service_category_error').innerText = '';
    document.getElementById('price_error').innerText = '';

    if (Price.value === '') {
      errors.push('Price');
      document.getElementById('price_error').innerText = 'Price is required.';
    } else {
      document.getElementById('price_error').innerText = '';
    }

    if (errors.length > 0) {
      e.preventDefault();
      return;
    }

    fetch('/admin/addservicerequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_name: serviceName.value,
        price: Price.value,
        description: Description.value
      }),
    })
      .then((res) => {
        res.json()
        window.location.reload();
        return;
      })
      .catch((err) => {
        errorDiv.innerText = err.message;
        console.error(err);
        return;
      });
  }
});
    
//UPDATE SERVICEs
  const updateForms = document.querySelectorAll(".edit-service-form");

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

        const serviceId = data.service_id;
        const Price = data.price;
        const Description = data.description;
        console.log(serviceId);
        
      try{
        const res = await fetch(`/clinic/editservices/${serviceId}/${Price}/${Description}`
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
        }
      }catch (error) {
      console.error(error);
      }
      });
  });
}

//DELETE SERVICE
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button[data-service-id]');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const serviceId = e.target.dataset.serviceId;
        document.getElementById('confirm-delete-btn').dataset.serviceId = serviceId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const serviceId = e.target.dataset.serviceId;
      try {
        const response = await fetch(`/clinic/deleteservice/${serviceId}`, {
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