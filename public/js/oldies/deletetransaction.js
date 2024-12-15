
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