//DELETE USER
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button[data-clinic-id]');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const clinicId = e.target.dataset.clinicId;
        document.getElementById('confirm-delete-btn').dataset.clinicId = clinicId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const clinicId = e.target.dataset.clinicId;
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