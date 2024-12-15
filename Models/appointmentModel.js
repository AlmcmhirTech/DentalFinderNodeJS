const { conn } = require('../server');

class Appointment{


    constructor(clinic_id = '', user_id = '', appointment_date = '', set_time = '', branch_id = '', service_id = '', status = 'Pending') {
        this.clinic_id = clinic_id;
        this.user_id = user_id;
        this.appointment_date = appointment_date;
        this.set_time = set_time;
        this.branch_id = branch_id;
        this.service_id = service_id;
        this.status = status;
    }

    async showAppointments(){
        const query = `SELECT * FROM appointments WHERE user_id = ?`;
  
        try{
          const [result] = await conn.execute(query,[this.user_id]);
  
          return result;
          
        }catch(error){
          throw new Error(error.message);
        }
      }

    async getBookingCategories(){
        const query = `SELECT c.*, s.* FROM clinics_services c 
        JOIN services s ON c.service_id = s.service_id WHERE c.clinic_id = ?`;
  
        try{
          const [result] = await conn.execute(query, [this.clinic_id]);
          
          return result;
        
        }catch(error){
            throw new Error(error.message);
        }

    }
    async getBranches(){
        const query = `SELECT * FROM branches WHERE clinic_id = ?`;
  
        try{
          const [result] = await conn.execute(query, [this.clinic_id]);
          
          return result;
        
        }catch(error){
            throw new Error(error.message);
        }

    }

    async appointmentRequest(){
        const query = `INSERT INTO 
        appointments(clinic_id, user_id, appointment_date, set_time, branch_id, service_id, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        try{
            const [result] = await conn.execute(query, [this.clinic_id, this.user_id, this.appointment_date,
                this.set_time,
                this.branch_id, this.service_id, this.status]);

            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }

}
module.exports = Appointment;