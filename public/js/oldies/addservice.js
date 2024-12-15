document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-service-form');
  const errorDiv = document.getElementById('error_message');
  
  const chooseServices = document.getElementById('category');
  const addNewService = document.getElementById('service-name');
  const Price = document.getElementById('minPrice');
  const Description = document.getElementById('description');
  
  form.addEventListener('input', () => {

    if(addNewService.value !== ''){
      chooseServices.value = '';
      chooseServices.disabled = true;
    }else{
      chooseServices.disabled = false;
    }

  });

  form.addEventListener('submit', () => {
    let errors = [];

    if (addNewService.value === ''){

        if (chooseServices.value === '') {
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
      return;
    }

    fetch('/admin/addservicerequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_name: addNewService.value,
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
});

const editForm = document.querySelectorAll(".edit-service-form");
if(!editForm){
  console.error("Form Not Found");
}else{
  console.log("Found");
editForm.forEach((form) => {
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
  form.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const formData = new FormData(form);
    const data = [];

    formData.forEach((value,key) => {
      data[key] = value;
    });
    console.log(data.service_id);

    const chooseServices = data.service_id;
    const Price = data.price;
    const Description = data.description;
    console.log(Price, chooseServices, Description);

    try{
      const res=  await fetch(`/clinic/editservices/${chooseServices}/${Price}/${Description}`,{
        method: 'PATCH',
        body: JSON.stringify(data)
      });
      if(res.ok){
        window.location.reload();
        const result = await res.json();
        console.log(result);

      }else {
        console.error(await res.text());

      }
    }catch(error){
      console.error(error);
    }

  });
});
}