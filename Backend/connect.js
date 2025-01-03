import mysql from 'mysql2'

export const db = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"Mooka@0208",
   database: "users"
});
db.connect();
