<!-- Modal
<div class="modal fade" id="viewModal_<%= clinic.clinic_id %>" tabindex="-1" aria-labelledby="addServiceLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addServiceLabel">Clinic Data</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-view-body">

          <label for="image"></label>
          <img src="../../uploads/clinics/profile/<%= clinic.clinic_image %>" alt="<%='No Data Found'%>"><br>

          <label for="code">License Code</label>
          <object data="../../uploads/clinics/license/<%= clinic.license || 'No Data Found' %>" type="text/plain" width="100%" height="200px"></object>
        <br>

          <label for="description">Description</label>
           <p><%= clinic.description || 'No Description'%></p>

          <label for= "appointments">Appointments Today</label>
          <p><%= clinic.appointments_count || 'No Appointments Today'%></p>

           <label for="created">Created at</label>
           <p><%= clinic.createdAt || 'No Data Found'%></p>

      </div>
    </div>
  </div>
</div>

<!-- <div data-bs-toggle="modal" data-bs-target="#AcceptModal">
  <a id="acceptRequest" href="#" class="btn">
      <i class="bi action fs- bi-check-circle"></i>
  </a>
</div> -->

<div class="modal fade" id="AcceptModal" tabindex="-1" role="dialog" aria-labelledby="acceptbtnTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="acceptbtnTitle">Accept Confirmation</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to accept?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="confirm-accept-btn" class="btn btn-danger">Accept</button>
      </div>
    </div>
  </div>
</div>


<!-- <div data-bs-toggle="modal" data-bs-target="#deleteUserModal">
  <a id="deleteUser" href="#" class="btn">
      <img class="action icon-red" src="../img/icons/delete.svg" alt="">
  </a>
</div> -->

<!-- Modal -->
<div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deletebtnTitle" aria-hidden="true">
  <!-- <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title" id="deletebtnTitle">Delete Confirmation</h5>
          
      </div>
      <div class="modal-body">
          Are you sure you want to delete?
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" id="confirm-delete-btn" class="btn btn-danger">Delete</button>
      </div>
      </div>
  </div>
</div> -->
<!-- </tr> --> -->