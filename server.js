// Packages Required
const inquirer = require('inquirer'); 
const mysql = require('mysql2');
const table = require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
