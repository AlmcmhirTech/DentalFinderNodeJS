document.addEventListener('DOMContentLoaded', () => {

  const statusFilter = document.getElementById('status-filter');
  const currentFilter = document.getElementById('currentFilter');


  if(currentFilter.value){
    statusFilter.value = currentFilter.value;
  }

  const deleteButtons = document.querySelectorAll('div[data-patient-id]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const patientId = e.currentTarget.dataset.patientId;
      console.log(patientId);
      document.getElementById('confirm-delete-btn').dataset.patientId = patientId;
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
    const patientId = e.currentTarget.dataset.patientId;
    try {
      const response = await fetch(`/admin/delete-user/${patientId}`, {
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