document.addEventListener('DOMContentLoaded', () => {
    //ACCEPT APPOINTMENT REQUEST
    const acceptAppointmentButtons = document.querySelectorAll('div[data-appointment-id]');
    
    acceptAppointmentButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const appointmentId = e.currentTarget.dataset.appointmentId;
        console.log(appointmentId);
        document.getElementById('confirm-accept-btn').dataset.appointmentId = appointmentId;
      });
    });
  
    document.getElementById('confirm-accept-btn').addEventListener('click', async (e) => {
      const appointmentId = e.currentTarget.dataset.appointmentId;
      try {
        const res = await fetch(`/clinic/accept-appointment/${appointmentId}`, {
          method: 'PATCH',
           headers: {
                'Content-Type': 'application/json',
            }
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

    //REJECT APPOINTMENT REQUEST
    const rejectAppointmentButtons = document.querySelectorAll('div[data-appointment-id]');
    
    rejectAppointmentButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const appointmentId = e.currentTarget.dataset.appointmentId;
        console.log(appointmentId);
        document.getElementById('confirm-reject-btn').dataset.appointmentId = appointmentId;
      });
    });
  
    document.getElementById('confirm-reject-btn').addEventListener('click', async (e) => {
      const appointmentId = e.currentTarget.dataset.appointmentId;
      try {
        const res = await fetch(`/clinic/reject-appointment/${appointmentId}`, {
          method: 'PATCH',
           headers: {
                'Content-Type': 'application/json',
            }
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

    //DELETE APPOINTMENT REQUEST
    const deleteAppointmentButtons = document.querySelectorAll('div[data-appointment-id]');
    
    deleteAppointmentButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const appointmentId = e.currentTarget.dataset.appointmentId;
        console.log(appointmentId);
        document.getElementById('confirm-delete-btn').dataset.appointmentId = appointmentId;
      });
    });
  
    document.getElementById('confirm-delete-btn').addEventListener('click', async (e) => {
      const appointmentId = e.currentTarget.dataset.appointmentId;
      try {
        const res = await fetch(`/clinic/delete-appointment/${appointmentId}`, {
          method: 'DELETE',
           headers: {
                'Content-Type': 'application/json',
            }
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