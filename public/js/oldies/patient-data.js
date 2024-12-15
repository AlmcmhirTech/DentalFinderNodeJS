//DELETE USER
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('button[data-user-id]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const userId = e.target.dataset.userId;
      document.getElementById('confirm-delete-btn').dataset.userId = userId;
    });
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
    const userId = e.target.dataset.userId;
    try {
      const response = await fetch(`/admin/delete-user/${userId}`, {
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