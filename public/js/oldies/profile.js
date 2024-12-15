const form = document.getElementById('editProfile');

if (!form) {
  console.error("Form not found");
} else {
  form.addEventListener('submit', async () => {
    const formData = new FormData(form);
    
    // Convert FormData to a plain JavaScript object
    const data = {};
    formData.forEach((key, value) => {
      data[key] = value;
    });

    const clinicEmail = data.clinic_email;  // Assuming clinic_email is part of the form data
    console.log(clinicEmail);

    try {
      const response = await fetch(`/clinic/profile/${clinicEmail}`, {
        method: 'PATCH',
        body: JSON.stringify(data),  // Send the converted object as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error(await response.text());
        // Display error message
      }
    } catch (error) {
      console.error(error);
    }
  });
}
