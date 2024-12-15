const mysql = require('mysql2');


// Database connection
const conn = mysql.createPool({
    host: 'localhost', // Host where MySQL server is running
    user: 'root',      // Your MySQL username (default is 'root')
    password: '',      // Your MySQL password (empty for default on local)
    database: 'dentalfinder' // Database name we created earlier
  });

  const bridgeconn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "database_bridge"
  });

const adminconn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_dentalfinder"
});


module.exports = {
  conn: conn.promise(),
  bridgeconn: bridgeconn.promise(),
  adminconn: adminconn.promise()
};
