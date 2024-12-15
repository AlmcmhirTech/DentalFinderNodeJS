document.addEventListener('DOMContentLoaded', () => {
  //DELETE ACCOUNT REQUEST
  const deleteAccountButtons = document.querySelectorAll('div[data-deleteaccount-id]');
  const confirmDeleteButton =  document.querySelectorAll('.confirm-delete-account-btn');
  
    deleteAccountButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const accountId = e.currentTarget.dataset.deleteaccountId;
        console.log(accountId);
    
        confirmDeleteButton.forEach((btn)=>{
          btn.addEventListener('click', async() =>{
            const requestId = accountId;
            console.log(requestId);
            try {
              const res = await fetch(`/admin/delete-clinic-request/${requestId}`, {
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
          })
        })
      });
    });
  
   
    //CONFIRM CLINIC REQUEST

    const acceptClinicButtons = document.querySelectorAll('div[data-acceptaccount-id]');
    const confirmAcceptButton =  document.querySelectorAll('.confirm-accept-account-btn');
  
    acceptClinicButtons.forEach((button) =>{
      button.addEventListener('click', (e) =>{
        const accountId = e.currentTarget.dataset.acceptaccountId;
        console.log(accountId);
        confirmAcceptButton.forEach((btn) => {
          btn.addEventListener('click', async (e) => {

            const requestId = accountId;
            console.log(requestId);

            try {
              const res = await fetch(`/admin/confirm-account-request/${requestId}`, {
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