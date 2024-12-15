document.addEventListener('DOMContentLoaded', () => {

    const previousStatus = document.getElementById('status-filter');
    const currentStatus = document.getElementById('currentStatus');
  
    if(currentStatus.value){
      previousStatus.value = currentStatus.value;
    }
  
      // DELETE TRANSACTION
      const deleteTransactionButtons = document.querySelectorAll('div[data-transaction-id]');
      const confirmDeleteButton =  document.querySelectorAll('.confirm-delete-transaction-btn');
    
      deleteTransactionButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const transactionId = e.currentTarget.dataset.transactionId;
          confirmDeleteButton.forEach((btn)=>{
            btn.addEventListener('click', async (e) => {
              const paymentId = transactionId;
              console.log(paymentId);
              try {
                const res = await fetch(`/clinic/delete-transaction/${paymentId}`, {
                  method: 'DELETE',
                });
                if (res.ok) {
                  window.location.reload();
                } else {
                  console.error(await response.text());
                }
              } catch (error) {
                console.error(error);
              }
            });
          })
        });
      });
      //CONFIRM TRANSACTION
    
      const acceptTransactionButtons = document.querySelectorAll('div[data-confirm-id]');
      const confirmAcceptButton =  document.querySelectorAll('.confirm-accept-transaction-btn');
    
      acceptTransactionButtons.forEach((button) =>{
        button.addEventListener('click', (e) =>{
          const transactionId = e.currentTarget.dataset.confirmId;
          confirmAcceptButton.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
              const paymentId = transactionId;
              console.log(paymentId);
              try {
                const res = await fetch(`/clinic/confirm-transaction/${paymentId}`, {
                  method: 'PATCH',
                });
                if (res.ok) {
                  window.location.reload();
                } else {
                  console.error(await response.text());
                }
              } catch (error) {
                console.error(error);
              }
    
            });
        });
        })
      })
  });