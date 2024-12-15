document.addEventListener('DOMContentLoaded', () => {

  const statusSpecialty = document.getElementById('specialty-filter');
  const currentSpecialty = document.getElementById('currentSpecialty');

  if(currentSpecialty.value){
    statusSpecialty.value = currentSpecialty.value;
  }

  const deleteButtons = document.querySelectorAll('div[data-clinic-id]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const clinicId = e.currentTarget.dataset.clinicId;
      console.log(clinicId);
      document.getElementById('confirm-delete-btn').dataset.clinicId = clinicId;
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
    const clinicId = e.currentTarget.dataset.clinicId;
    try {
      const response = await fetch(`/admin/delete-clinic/${clinicId}`, {
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