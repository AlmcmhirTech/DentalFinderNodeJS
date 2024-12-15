const { adminconn, bridgeconn, conn } = require('../server');
class Admin{
    //GRAPHS
    async calculateDailyIncome(){
        const query = `SELECT SUM(amount * 0.10) as income, DAYNAME(date) AS day 
        FROM transactions WHERE status = 'Paid' GROUP BY DAYNAME(date)`;

        try{
            const [result] = await conn.execute(query);
            console.log(result);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async calculateMonthlyIncome(){
        const query = `SELECT SUM(amount * 0.10) as income, MONTHNAME(date) AS month 
        FROM transactions WHERE status = 'Paid' GROUP BY MONTHNAME(date)`;

        try{
            const [result] = await conn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async countAllAppointments(){
        const query = `SELECT COUNT(*) as count, s.name AS service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id GROUP BY s.name`;

        try{
            const [result] = await conn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    async allSuccessfulAppointments(){
        const query = `SELECT COUNT(*) as count, s.name AS service_name FROM services s JOIN appointments a 
        ON s.service_id = a.service_id AND a.status = 'Accepted' GROUP BY s.name`;

        try{
            const [result] = await conn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }
    }
    //DATA
    async getAllPatientsData(search_patient, filter) {
        // Base query without the WHERE clause
        let query = `
            SELECT 
                p.patient_id,  
                CASE 
                    WHEN p.is_registered = 0 THEN 'Registered' 
                    ELSE 'Not Registered' 
                END AS is_registered, 
                CONCAT(p.first_name, ' ', p.last_name) AS name, 
                p.email, 
                p.mobile_number,
                CAST(a.appointment_date AS CHAR(255)) AS appointment_date_str, 
                CONCAT(DATEDIFF(CURDATE(), a.appointment_date), ' days ago') AS appointment_date, 
                CONCAT(DATEDIFF(CURDATE(), pp.payment_date), ' days ago') AS payment_date
            FROM patients p
            LEFT JOIN (
                SELECT patient_id, MAX(appointment_date) AS appointment_date
                FROM appointments
                GROUP BY patient_id
            ) a ON p.patient_id = a.patient_id 
            LEFT JOIN (
                SELECT patient_id, MAX(date) AS payment_date 
                FROM transactions 
                GROUP BY patient_id
            ) pp ON p.patient_id = pp.patient_id`;
    
        // Define params as an empty array initially
        let params = [];
    
        // If search_patient is provided and not an empty string
        if (search_patient && search_patient.trim() !== '') {
            // Prepare the search pattern by adding wildcards to the search string
            const searchPattern = `%${search_patient}%`;
    
            // Add WHERE clause to the query to filter by name, email, or mobile number
            query += `
                WHERE 
                    (CONCAT(p.first_name, ' ', p.last_name) LIKE ? 
                    OR p.email LIKE ? 
                    OR p.mobile_number LIKE ?)`;
    
            // Add the search parameters to the params array
            params = [searchPattern, searchPattern, searchPattern];
        }
    
        // If status is provided, handle the status filter
        if (filter && filter.trim() !== '') {
            if (filter.trim().toLowerCase() === 'all') {
                // If "All" is selected, don't add any filter for is_registered
                // Just proceed with the query as it is, without modifying the WHERE clause for status
            } else {
                // Map 'Registered' to 1 and 'Not Registered' to 0
                let statusValue = filter.trim().toLowerCase() === 'registered' ? 0 : 1;
    
                // Add an additional filter to the WHERE clause for 'status' (is_registered)
                query += params.length > 0 ? ' AND ' : ' WHERE ';
                query += `p.is_registered = ?`;
    
                // Add the mapped status value to the params array
                params.push(statusValue);
            }
        }
    
        try {
            // Execute the query with the appropriate parameters
            const [result] = await conn.execute(query, params.length > 0 ? params : []);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
    async getAllClinicData(search_clinic, filter){
        let query =`SELECT 
        c.*, 
        v.name AS village_name,
        s.name AS specialty,
        CASE
            WHEN COUNT(a.appointment_id) = 0 THEN NULL
            ELSE COUNT(a.appointment_id)
        END AS appointments_count
        FROM 
            clinics c
        LEFT JOIN 
            branches b ON c.clinic_id = b.clinic_id
        LEFT JOIN 
            appointments a ON b.branch_id = a.branch_id
        JOIN 
            specialties s ON c.specialty_id = s.specialty_id
        JOIN
            villages v ON c.village_id = v.village_id`;
        
        let params = [];

        if(search_clinic && search_clinic.trim() !== ''){
            const searchPattern = `%${search_clinic}%`;

            query += `
            WHERE 
                (c.name LIKE ? 
                OR v.name LIKE ? 
                OR c.address LIKE ?)`;
            params = [searchPattern, searchPattern, searchPattern];
        }

        if (filter && filter.trim() !== '') {
            if (filter.trim().toLowerCase() === 'all') {
        
            } else {
                
                query += params.length > 0 ? ' AND ' : ' WHERE ';
                query += `s.name = ?`; 
                console.log(JSON.stringify(query));
    
                params.push(filter);
            }
        }

        query += ` GROUP BY c.clinic_id`;

        try{
            const [result] = await conn.execute(query, params.length > 0 ? params : []);
            return result;
        }catch(error){
            throw new Error(error.message);
        }
    }
    //REQUESTS
    async allBranchesRequest(){
        const query = `SELECT br.*, c.name AS clinic,
        br.statement, CONCAT(DATEDIFF(CURDATE(), br.date), ' days ago') AS request_date
        FROM branch_requests br JOIN clinics c ON br.clinic_id = c.clinic_id`;
        try{
            const [result] = await bridgeconn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }
    async recentBranchesRequest(){
        const query = `SELECT br.*, c.name AS clinic,
        CONCAT(DATEDIFF(CURDATE(), br.date), ' days ago') AS request_date
        FROM branch_requests br JOIN clinics c ON br.clinic_id = c.clinic_id LIMIT 5`;
        try{
            const [result] = await bridgeconn.execute(query);
            return result;

        }catch(error){
            throw new Error(error.message);
        }

    }

    async addToLogs(){
        
    }
    // async  allServicesRequest(){
    //     const query = `SELECT request_id, clinic_id, specialty,
    //     name, statement, CONCAT(DATEDIFF(CURDATE(), date), ' days ago') AS request_date
    //     FROM service_requests`;
    //     try{
    //         const [result] = await adminconn.execute(query);
    //         return result;
    //     }catch(error){
    //         throw new Error(error.message);
    //     }
    // }
    async  recentAccountsRequest(){
        const query = `SELECT *, CONCAT(DATEDIFF(CURDATE(), date), ' days ago') AS request_date
        FROM clinic_requests LIMIT 5`;
        try{
            const [result] = await bridgeconn.execute(query);
            return result;
        }catch(error){
            throw new Error(error.message);
        }
    }
    async  allAccountsRequest(){
        const query = `SELECT *,
        CONCAT(DATEDIFF(CURDATE(), date), ' days ago') AS request_date
        FROM clinic_requests`;
        try{
            const [result] = await bridgeconn.execute(query);
            return result;
        }catch(error){
            throw new Error(error.message);
        }
    }
    //CRUD
    async deletePatient(patient_id){
        const query = `DELETE FROM patients WHERE patient_id = ?`;
        try{
            const [result] = await conn.execute(query, [patient_id]);
            return result;
        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteClinic(clinic_id){
        const query = `DELETE FROM clinics WHERE clinic_id = ?`;

        try{
            const [result] = await conn.execute(query, [clinic_id]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteClinicRequest(request_id){
        const query = `DELETE FROM clinic_requests WHERE request_id = ?`;

        try{
            const [result] = await bridgeconn.execute(query, [request_id]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteServiceRequest(pendingId){
        const query = `DELETE FROM add_service_requests WHERE pending_id = ?`;

        try{
            const [result] = await adminconn.execute(query, [pendingId]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async acceptServices(serviceName, Price){
        const query = `INSERT INTO services(service_name, pricing)
        VALUES(?, ?)`;

        try{
            const [result] = await conn.execute(query, [serviceName, Price]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async deleteBranchRequest(request_id){
        const query = `DELETE FROM branch_requests WHERE request_id = ?`;

        try{
            const [result] = await bridgeconn.execute(query, [request_id]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async AddBranchRequest(branch_address, village, postcode, mobile_number, image, license, statement){
        const query = `INSERT INTO branch_requests(address, village, postcode, mobile_number, image, license, statement)
        VALUES(?, ?, ?, ?, ?, ?, ?)`;

        try{
            const [result] = await bridgeconn.execute(query, [branch_address, village, postcode, mobile_number, image, license, statement]);
            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async acceptBranch(request_id){

        const updatequery = `UPDATE branch_requests SET status = 'Accepted' WHERE request_id = ?`;
        const request = `SELECT clinic_id, address, village_id, postcode, mobile_number, license
        FROM branch_requests WHERE request_id = ?`;
        const query = `INSERT INTO branches(clinic_id, address, village_id, postcode, mobile_number, license)
        VALUES(?, ?, ?, ?, ?, ?)`;

        try{
            const [update] = await bridgeconn.execute(updatequery, [request_id]);
            const [data] = await bridgeconn.execute(request, [request_id]);
            const [result] = await conn.execute(query, [data[0].clinic_id, data[0].address, data[0].village_id, data[0].postcode
            , data[0].mobile_number, data[0].license]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async acceptClinic(request_id){

        const updatequery = `UPDATE clinic_requests SET status = 'Accepted' WHERE request_id = ?`;
        const request = `SELECT license, specialty_id, name, email, password, mobile_number, address, village_id, postcode
        FROM clinic_requests WHERE request_id = ?`;
        const query = `INSERT INTO clinics(license, specialty_id, name, email, password, mobile_number, address, village_id, postcode)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        try{
            const [update] = await bridgeconn.execute(updatequery, [request_id]);
            const [data] = await bridgeconn.execute(request, [request_id]);
            const [result] = await conn.execute(query, [data[0].license, data[0].specialty_id, data[0].name, data[0].email,
            data[0].password, data[0].mobile_number,  data[0].address, data[0].village_id, data[0].postcode]);

            return result;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = Admin;