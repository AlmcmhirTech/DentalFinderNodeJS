document.addEventListener('DOMContentLoaded', () => {
  // DELETE BRANCH REQUEST
  const deleteBranchButtons = document.querySelectorAll('div[data-branch-id]');
  const confirmDeleteButton =  document.querySelectorAll('.confirm-delete-branch-btn');

  deleteBranchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const branchId = e.currentTarget.dataset.branchId;
      confirmDeleteButton.forEach((btn)=>{
        btn.addEventListener('click', async (e) => {
          const requestId = branchId;
          console.log(requestId);
          try {
            const res = await fetch(`/admin/delete-branch-request/${requestId}`, {
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
  //ACCEPT BRANCH REQUEST

  const acceptBranchButtons = document.querySelectorAll('div[data-confirm-id]');
  const confirmAcceptButton =  document.querySelectorAll('.confirm-accept-branch-btn');

  acceptBranchButtons.forEach((button) =>{
    button.addEventListener('click', (e) =>{
      const branchId = e.currentTarget.dataset.confirmId;
      confirmAcceptButton.forEach((btn) => {
        btn.addEventListener('click', async (e) => {

          const requestId = branchId;
          console.log(requestId);
          try {
            const res = await fetch(`/admin/confirm-branch-request/${requestId}`, {
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