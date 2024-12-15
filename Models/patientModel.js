const { conn } = require('../server');
const bcrypt = require('bcryptjs');

class Patient{


    constructor(first_name, middle_name, last_name, email, password, mobile_number, 
      clinic_id, rating, quality = [], review_comment) {
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.mobile_number = mobile_number;
        this.clinic_id = clinic_id;
        this.rating = rating;
        this.quality = quality;
        this.review_comment = review_comment;
    }

    async reviewClinic(){
      console.log("Inserting data:", this.clinic_id, this.rating, this.quality, this.review_comment);
      const query = `INSERT INTO user_reviews(clinic_id, review, review_comment)
      VALUES(?, ?, ?)`;

      try{
        const [result] = await conn.execute(query, [this.clinic_id, JSON.stringify(this.quality), this.review_comment])
        
        return result;
      }catch(error){
        throw new Error(error.message);
      }
    }

    async verifyPatient(emailValue, passwordValue){
        const query = `SELECT * FROM clinics WHERE email = ?`;
        let error = { emailErr: '', passwordErr: ''};
        try{
            const [result] = await conn.execute(query, [emailValue]);
            if (result.length > 0){
              const {hashed_password} = result[0];
              const verifyPassword = await bcrypt.compare(passwordValue, hashed_password);

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

    async registerPatient(first_name, middle_name, last_name, email, hashedPassword, mobile_number, registered_id) {
        const query = `
          INSERT INTO users 
          (first_name, middle_name, last_name, email, password, mobile_number, registered_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
    
        try {
          // Execute the query
          const [result] = await conn.execute(query, [
            first_name, 
            middle_name, 
            last_name, 
            email, 
            hashedPassword, 
            mobile_number,
            registered_id
          ]);
          
          return result;

        } catch (error) {
          throw new Error('Database error while registering patient: ' + error.message);
        }
      }
}
module.exports = Patient;