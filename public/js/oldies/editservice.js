const form = document.getElementById('edit-service-form');
if(!form){
    console.error("Form Not Found");
}else{
form.addEventListener('submit',  async (e) =>{
  
    const formData = new FormData(form);

    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    const serviceId = data.service_id;
    const servicePrice = data.price;  
    const serviceDesc = data.description;  

    console.log(serviceId);
    console.log(servicePrice);

    
    try {
      e.preventDefault();
      const response = await fetch(`/clinic/services/${serviceId}/${servicePrice}/${serviceDesc}`, {
        method: 'PATCH',
        body: JSON.stringify(data)  // Send the converted object as JSON
      });

      if (response.ok) {
        window.location.reload();
        const result = await response.json();
        console.log(result);
      } else {
        console.error(await response.text());
        // Display error message
      }
    } catch (error) {
      console.error(error);
    }
})
}
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('button[data-service-id]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const serviceId = e.target.dataset.serviceId;
      document.getElementById('delete-service-btn').dataset.serviceId = serviceId;
    });
  });

  document.getElementById('delete-service-btn').addEventListener('click', async (e) => {
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