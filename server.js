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
      password: 'p@ssw0rd',
      database: 'employee_db'
    })

    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to the employee_db database!');
        init();
    });

    const questions = [
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 
                  'View all roles', 
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update employy role'
                ],
      }

    ]
