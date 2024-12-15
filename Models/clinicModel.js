const { adminconn, conn, bridgeconn } = require('../server');
const bcrypt = require('bcrypt'); 


class Clinic{
    async newServiceRequest(clinic_id, service_name, price, description){
        console.log(clinic_id, service_name, price);
        const query = `INSERT INTO add_service_requests(clinic_id, service_name, price, description) VALUES(?, ?, ?, ?)`;

        try{
            const [result] = await adminconn.execute(query, [clinic_id, service_name, price, description]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async AddServices(clinic_id, service_id, price, description){
        const query = `INSERT INTO clinics_services(clinic_id, service_id, pricing, description) VALUES(?, ?, ?, ?)`;

        try{
            const [result] = await conn.execute(query, [clinic_id, service_id, price, description]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async getServiceName(service_id){
        const query = `SELECT service_name FROM services WHERE service_id = ?`;

        try{
            const [result] = await conn.execute(query, [service_id]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async getVillages(){
        const query = `SELECT * FROM villages`;

        try{
            const [result] = await conn.execute(query);
            return result;
        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async getSpecialties(){
      const query = `SELECT * FROM specialties`;

      try{
          const [result] = await conn.execute(query);
          return result;
      }
      catch(error){
          throw new Error(error.message);
      }
  }
    async getClinicsServices(clinic_id, byVillageValue, byPostcodeValue, byAddressValue){
        const query = `SELECT s.*, c.* FROM clinics_services c JOIN services s 
        ON c.service_id = s.service_id WHERE c.clinic_id = ?`;

        try{
            const [result] = await conn.execute(query, [clinic_id]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteClinicsServices(service_id, clinic_id){
        const query = `DELETE FROM clinics_services WHERE service_id = ? AND clinic_id = ?`;

        try{
            const [result] = await conn.execute(query, [service_id, clinic_id]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteBranches(branch_id){
        const query = `DELETE FROM branches WHERE branch_id = ?`;

        try{
            const [result] = await conn.execute(query, [branch_id]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteTransactions(payment_id){
        const query = `DELETE FROM transactions WHERE payment_id = ?`;

        try{
            const [result] = await conn.execute(query, [payment_id]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }

    async getServicesCategories(){
        const query = `SELECT * FROM services`;
  
        try{
          const [result] = await conn.execute(query);
          
          return result;
        
        }catch(error){
            throw new Error(error.message);
        }

    }
    
    async getServicesCategories(){
        const query = `SELECT * FROM services`;
  
        try{
          const [result] = await conn.execute(query);
          
          return result;
        
        }catch(error){
            throw new Error(error.message);
        }

    }

    async verifyClinic(emailValue, passwordValue){
        const query = `SELECT * FROM clinics WHERE email = ?`;
        let error = { emailErr: '', passwordErr: ''};

        try{
            const [result] = await conn.execute(query, [emailValue]);

            if (result.length > 0){
              const {password} = result[0];
              const verifyPassword = await bcrypt.compare(passwordValue, password);
              
              if(!verifyPassword){
                error.passwordErr = "Sorry, your password was incorrect";
              }
            }else{
                error.emailErr = "This email does not exist";
            }

            return {result, error};

        }
        catch(error){
            throw new Error(error.message);
        }
    }     

    async getClinics(byVillageValue, byPostcodeValue, byAddressValue){
        const query = `
        SELECT * FROM clinics 
        WHERE village = ? OR postcode = ? OR clinic_address LIKE ?`;
        // const query = `
        // SELECT * FROM clinics 
        // WHERE (village = ? OR ? IS NULL) 
        // OR (postcode = ? OR ? IS NULL) 
        // OR (clinic_address LIKE ? OR ? IS NULL)`;
        // console.log('hey');

        try{
            const [result] = await conn.execute(query, [byVillageValue, byPostcodeValue, `%${byAddressValue}%`]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    // `%${byAddressValue}%`
    async getClinicProfile(clinic_id){
        const query = `SELECT * FROM clinics WHERE clinic_id = ?`;
        try{
            const [result] = await conn.execute(query, [clinic_id]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async getClinicData(){
        const query = `SELECT * FROM clinics`;
        try{
            const [result] = await conn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }

    //clinics side functions below

    async clinicRegister(license, name, email, password, phone, address, code, village, specialty){
        const query = `INSERT INTO clinic_requests(license, name, email, password, mobile_number, address, postcode, village_id, specialty_id) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        try{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const [result] = await bridgeconn.execute(query, [license, name, email, hashedPassword, phone, address, code, village, specialty]);

            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }

    async countAppointments(clinic_id){
        const query = `SELECT COUNT(a.appointment_id) as count, s.service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id WHERE a.clinic_id = ? GROUP BY s.service_name`;

        try{
            const [result] = await conn.execute(query, [ clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }

    async successfulAppointments(clinic_id){
        const query = `SELECT COUNT(a.appointment_id) as count, s.service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id WHERE a.clinic_id = ? AND a.status = 'Accepted' GROUP BY s.service_name`;

        try{
            const [result] = await conn.execute(query, [ clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async allPatients(clinic_id){
        const query = `SELECT CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name) as name,
        a.appointment_date, s.service_name, a.status FROM users u JOIN u.user_id = a.user_id
        JOIN services s ON s.service_id = a.service_id JOIN branches b ON b.branch_id = u.branch_id WHERE a.clinic_id = ?`;

        try{
            const [result] = await conn.execute(query, [ clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async pendingAppointments(clinic_id, address) {
        let query = `
            SELECT
              a.appointment_id,
              CONCAT(p.first_name, ' ', p.middle_name, ' ', p.last_name) AS name,
              a.set_time,
              s.name AS service_name, 
              a.status, b.address
            FROM 
              patients p
            JOIN 
              appointments a ON p.patient_id = a.patient_id
            JOIN 
              services s ON s.service_id = a.service_id
            JOIN 
              branches b ON b.branch_id = a.branch_id
            WHERE 
              b.clinic_id = ? AND a.status = "Pending"`;
    
        let params = [clinic_id];  
    
        if (address && address !== 'All') {
            query += ' AND b.address LIKE ?';
            params.push(`%${address}%`);
        }
    
        try {
            const [result] = await conn.execute(query, params);
    
            return result;
        } catch (error) {
            console.error('SQL Error:', error.message);
            throw new Error('An error occurred while fetching recent appointments.');
        }
    }
    async acceptedAppointments(clinic_id, address) {
        // Base query to retrieve the most recent appointments
        let query = `
            SELECT
              a.appointment_id,
              CONCAT(p.first_name, ' ', p.middle_name, ' ', p.last_name) AS name,
              a.set_time,
              s.name AS service_name, 
              a.status, b.address
            FROM 
              patients p
            JOIN 
              appointments a ON p.patient_id = a.patient_id
            JOIN 
              services s ON s.service_id = a.service_id
            JOIN 
              branches b ON b.branch_id = a.branch_id
            WHERE 
              b.clinic_id = ? AND a.status = "Accepted"`;
    
        let params = [clinic_id];  
    
        if (address && address !== 'All') {
            query += ' AND b.address LIKE ?';
            params.push(`%${address}%`);
        }
    
        try {
            const [result] = await conn.execute(query, params);
    
            return result;
        } catch (error) {
            console.error('SQL Error:', error.message);
            throw new Error('An error occurred while fetching recent appointments.');
        }
    }
    async rejectedAppointments(clinic_id, address) {
        // Base query to retrieve the most recent appointments
        let query = `
            SELECT
              a.appointment_id,
              CONCAT(p.first_name, ' ', p.middle_name, ' ', p.last_name) AS name,
              a.set_time,
              s.name AS service_name, 
              a.status, b.address
            FROM 
              patients p
            JOIN 
              appointments a ON p.patient_id = a.patient_id
            JOIN 
              services s ON s.service_id = a.service_id
            JOIN 
              branches b ON b.branch_id = a.branch_id
            WHERE 
              b.clinic_id = ? AND a.status = 'Rejected'`;
    
        let params = [clinic_id];  
    
        if (address && address !== 'All') {
            query += ' AND b.address LIKE ?';
            params.push(`%${address}%`);
        }
    
        try {
            const [result] = await conn.execute(query, params);
    
            return result;
        } catch (error) {
            console.error('SQL Error:', error.message);
            throw new Error('An error occurred while fetching recent appointments.');
        }
    }
    
    async recentAppointments(clinic_id) {
        let query = `
            SELECT
              a.appointment_id,
              CONCAT(p.first_name, ' ', p.middle_name, ' ', p.last_name) AS name,
              a.set_time,
              s.name AS service_name, 
              a.status, b.address
            FROM 
              patients p
            JOIN 
              appointments a ON p.patient_id = a.patient_id
            JOIN 
              services s ON s.service_id = a.service_id
            JOIN 
              branches b ON b.branch_id = a.branch_id
            WHERE 
              b.clinic_id = ? LIMIT 5`;
    
        try {
            const [result] = await conn.execute(query, [clinic_id]);
    
            return result;
        } catch (error) {
            console.error('SQL Error:', error.message);
            throw new Error('An error occurred while fetching recent appointments.');
        }
    }
    
     async allPatients(clinic_id){
        const query = `
        SELECT 
          CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name) AS name,
          a.appointment_date,
          s.service_name, 
          a.status
        FROM 
          users u
        JOIN 
          appointments a ON u.user_id = a.user_id
        JOIN 
          services s ON s.service_id = a.service_id
        JOIN 
          branches b ON b.branch_id = a.branch_id
        WHERE 
          a.clinic_id = ?
      `;
        try{
            const [result] = await conn.execute(query, [ clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async allReports(clinic_id){
        const query = `
        SELECT 
        CONCAT(r.patient_name) as name,
          r.report_date,
          r.report_type,
          r.status
        FROM 
          user_reports r
        JOIN
          clinics c ON r.clinic_id = c.clinic_id
        WHERE 
          r.clinic_id = ?
      `;
        try{
            const [result] = await conn.execute(query, [ clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }

    async updateProfiles(clinic_id, email){
        const query = `UPDATE clinics SET clinic_email = ? WHERE clinic_id = ?`;
        try{
            const [result] = await conn.execute(query, [ email, clinic_id]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async updateServices(clinic_id, service_id, pricing, description){
        const query = `UPDATE clinics_services SET service_id = ?, pricing = ?, description = ? WHERE clinic_id = ?`;
        try{
            const [result] = await conn.execute(query, [ service_id, pricing, description, clinic_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async updateBranches(branch_id, branch_address, mobile_number, branch_image, license){
        const query = `UPDATE branches SET branch_address = ?, mobile_number = ?, branch_image = ?, license = ? WHERE branch_id = ?`;
        try{
            const [result] = await conn.execute(query, [ branch_address, mobile_number, branch_image, license, branch_id ]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }

async changeRequest(clinic_id, new_clinic_address, new_clinic_name, new_license_code, file_id, status){
        const query = `INSERT INTO change_requests(clinic_id, new_clinic_address, new_clinic_name,
          new_license_code, file_id, status) VALUES (?, ?, ?, ?, ?, ?)`;
      
          try{
            await adminconn.execute(query, [clinic_id, new_clinic_address, new_clinic_name, new_license_code, file_id, status])
          }catch(error){
            console.error(error.message);
          }
      }
      
      async acceptAppointment(appointment_id){
        const query = `UPDATE appointments SET status = 'Accepted' WHERE appointment_id = ?`;
        
            try{
              const [result] = await conn.execute(query, [appointment_id]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
    async rejectAppointment(appointment_id){
        const query = `UPDATE appointments SET status = 'Rejected' WHERE appointment_id = ?`;
        
            try{
              const [result] = await conn.execute(query, [appointment_id]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
     async deleteAppointment(appointment_id){
        const query = `DELETE FROM appointments WHERE appointment_id = ?`;
        
            try{
              const [result] = await conn.execute(query, [appointment_id]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
    async deleteBranch(branch_id){
        const query = `DELETE FROM branches WHERE branch_id = ?`;
        
            try{
              const [result] = await conn.execute(query, [branch_id]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }

    
      async getBranches(clinic_id){
        const query = `SELECT * FROM branches WHERE clinic_id = ?`;
        
            try{
              const [result] = await conn.execute(query, [clinic_id]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
    async addBranchRequest(clinic_id, branch_address, license, branch_image, mobile_number, village, postcode, statement){
        const query = `INSERT INTO branch_requests(address, license, image, mobile_number, clinic_id, village_id, postcode, statement)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        console.log(clinic_id, branch_address, license, branch_image, mobile_number, village, postcode, statement);
        
            try{
              const [result] = await adminconn.execute(query, [ branch_address, license, 
                branch_image, mobile_number, clinic_id, village, postcode, statement]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
    async editBranchRequest(clinic_id, branch_address, license, branch_image, mobile_number, request_type){
        const query = `INSERT INTO admin_branch_requests(branch_address, license, branch_image, mobile_number, clinic_id, request_type)
        VALUES(?, ?, ?, ?, ?, ?)`;
        console.log(clinic_id, branch_address, license, branch_image, mobile_number, request_type);
        
            try{
              const [result] = await adminconn.execute(query, [ branch_address, license, branch_image, mobile_number, clinic_id, request_type ]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }
    async deleteBranchRequest(clinic_id, branch_address, license, branch_image, mobile_number, request_type){
        const query = `INSERT INTO admin_branch_requests(branch_address, license, branch_image, mobile_number, clinic_id, request_type)
        VALUES(?, ?, ?, ?, ?, ?)`;
        console.log(clinic_id, branch_address, license, branch_image, mobile_number, request_type);
        
            try{
              const [result] = await adminconn.execute(query, [ branch_address, license, branch_image, mobile_number, clinic_id, request_type ]);
              return result;
            }catch(error){
              console.error(error.message);
            }
        
    }

    async getTransactions(clinic_id, filter, search_patient){
            let query = `
            SELECT 
            t.*,
            CONCAT(p.first_name, ' ', p.last_name) as name,
            s.name AS service_name,
            b.address AS branch_address,
            CONCAT(DATEDIFF(CURDATE(), t.date), ' days ago') AS payment_date
            FROM transactions t
            JOIN services s
            ON t.service_id = s.service_id
            JOIN patients p
            ON t.patient_id = p.patient_id
            JOIN branches b
            ON t.branch_id = b.branch_id
            WHERE b.clinic_id = ?
            `;

            let params = [clinic_id];

            if (search_patient && search_patient.trim() !== '') {
              const searchPattern = `%${search_patient}%`;
              query += `
                  AND 
                      (CONCAT(p.first_name, ' ', p.last_name) LIKE ? 
                      OR s.name LIKE ?)`
      
              params.push(searchPattern, searchPattern);
            }

            if (filter && filter.trim() !== '') {
              if (filter.trim().toLowerCase() === 'all') {
              } else {
                
                  query += params.length > 0 ? ' AND ' : ' AND ';
                  query += `t.status = ?`;
      
                  // Add the mapped status value to the params array
                  params.push(filter);
              }
              console.log(params);
          }
      
            try{
              const [result] = await conn.execute(query, params.length > 0 ? params : []);
                return result;
    
            }
            catch(error){
              console.log('model');
                throw new Error(error.message);
           
    }
}
    async addTransaction(clinic_id, first_name, last_name, amount, service_id, payment_date, payment_method_id, status){
        const query = `INSERT INTO patients_payment(clinic_id, first_name, last_name, amount, service_id, payment_date, payment_method_id, payment_status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ? )`;
        console.log(clinic_id, first_name, last_name, amount, service_id, payment_date, payment_method_id, status);
        
            try{
              const [result] = await conn.execute(query, [ clinic_id, first_name, last_name, amount, service_id, payment_date, payment_method_id, status ]);
              return result;
            }catch(error){
              console.error(error.message);
            }
    }

    async confirmTransaction(payment_id){
        const query = `UPDATE transactions SET status = 'Paid' WHERE payment_id = ?`;

        try{
            const [result] = await conn.execute(query, [payment_id]);
        }catch(error){
            throw new Error(error.message);
        }
    }
    async updateTransaction(payment_id, first_name, last_name, payment_date, service_id, payment_method_id, amount){
        const query = `UPDATE patients_payment SET first_name = ?, last_name = ?, payment_date = ?, service_id = ?,
        payment_method_id = ?, amount = ? WHERE payment_id = ?`;

        try{
            const [result] = await conn.execute(query, [first_name, last_name, payment_date, service_id, payment_method_id, amount, payment_id]);
        }catch(error){
            throw new Error(error.message);
        }
    }

    async getMethods(){
        const query = `SELECT * FROM payment_method`;
        
            try{
              const [result] = await conn.execute(query);
              return result;
            }catch(error){
              console.error(error.message);
            }
    }

    //GRAPHS

    async countTodaysClinicAppointments(clinic_id){
        const query = `SELECT COUNT(*) as count, s.name AS service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id 
        JOIN branches b ON a.branch_id = b.branch_id WHERE b.clinic_id = ? AND DATE(a.appointment_date) = CURDATE() GROUP BY s.name`;

        try{
            const [result] = await conn.execute(query, [clinic_id]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async countAllSuccessfulClinicAppointments(clinic_id){
        const query = `SELECT COUNT(*) as count, s.name AS service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id 
        JOIN branches b ON a.branch_id = b.branch_id WHERE b.clinic_id = ? AND a.status = "Accepted" GROUP BY s.name`;

        try{
            const [result] = await conn.execute(query, [clinic_id]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async calculateClinicMonthlyIncome(clinic_id){
        const query = `SELECT SUM(t.amount) as income, MONTHNAME(t.date) AS month 
        FROM transactions t
        JOIN branches b
        ON b.branch_id = t.branch_id
        WHERE b.clinic_id = ? GROUP BY MONTHNAME(t.date)`;

        try{
            const [result] = await conn.execute(query, [clinic_id]);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async calculateClinicDailyIncome(clinic_id){
      const query = `SELECT SUM(t.amount) as income, DAYNAME(t.date) AS day
      FROM transactions t 
      JOIN branches b 
      ON b.branch_id = t.branch_id 
      WHERE b.clinic_id = ? GROUP BY DAYNAME(t.date)`;

      try{
          const [result] = await conn.execute(query, [clinic_id]);
          return result;

      }catch(error){
          throw new Error(error.message);
      }

  }
}

module.exports = Clinic;

