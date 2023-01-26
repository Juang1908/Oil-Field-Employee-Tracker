// Packages Required
const inquirer = require('inquirer'); 
const mysql = require('mysql2');
const table = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'p@ssw0rd',
  database: 'employee_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the employee_db database!');
    init();
});

const questions = [
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
        'View all departments', 
        'View all roles', 
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employy role',
        'Quit'
    ],
  }
];

function init(){
    inquirer.prompt(questions).then(answer => {
        switch (answer.choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update employy role':
                updateEmployeeRole();
                break;
            case 'Quit':
                console.log("Exiting the program..");
                db.end();
                break;
            default:
                console.log("Invalid option. Please select a valid option from the list.");
                init();
        }
    });
}

function viewDepartments() {
  let query = "SELECT * FROM departmentChart";
  db.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
  });
}
function viewRoles() {
  let query = "SELECT * FROM roleChart";
  db.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employeeChart";
  db.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
  });
}

function addDepartment() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the department name:',
          name: 'deptName'
      }
  ]).then(answer => {
      let query = "INSERT INTO departmentChart (deptName) VALUES (?)";
      db.query(query, [answer.deptName], (err, results) => {
          if (err) throw err;
          console.log(`Successfully added ${answer.deptName} department to the database.`);
          init();
      });
  });
}

function addRole() {
  inquirer.prompt([
      {
          type: 'input',
          message: 'Enter the department ID:',
          name: 'deptId'
      },
      {
          type: 'input',
          message: 'Enter the role title:',
          name: 'title'
      },
      {
          type: 'input',
          message: 'Enter the role salary:',
          name: 'salary'
      }
  ]).then(answer => {
      let query = "INSERT INTO roleChart (deptId, title, salary) VALUES (?, ?, ?)";
      db.query(query, [answer.deptId, answer.title, answer.salary], (err, results) => {
          if (err) throw err;
          console.log(`Successfully added ${answer.title} role to the database.`);
          init();
      });
  });
}

function addEmployee() {
  inquirer
      .prompt([
          {
              type: 'input',
              message: 'Enter the first name of the employee:',
              name: 'firstName'
          },
          {
              type: 'input',
              message: 'Enter the last name of the employee:',
              name: 'lastName'
          },
          {
              type: 'list',
              message: 'Select the role for the employee:',
              name: 'roleId',
              choices: [
                  // retrieve all roles from the database to list as choices
              ]
          },
          {
              type: 'list',
              message: 'Select the manager for the employee:',
              name: 'managerId',
              choices: [
                  // retrieve all employees from the database to list as choices
              ]
          }
      ])
      .then(answer => {
          // insert the new employee into the database using the answers provided
      });
}

function updateEmployeeRole() {
  inquirer
      .prompt([
          {
              name: "employeeId",
              type: "input",
              message: "Enter the ID of the employee whose role you want to update:",
              validate: (input) => {
                  return !isNaN(input) ? true : "Please enter a valid ID number.";
              }
          },
          {
              name: "newRoleId",
              type: "input",
              message: "Enter the ID of the new role for this employee:",
              validate: (input) => {
                  return !isNaN(input) ? true : "Please enter a valid ID number.";
              }
          }
      ])
      .then(answers => {
          let query = `UPDATE employeeChart SET roleId = ${answers.newRoleId} WHERE id = ${answers.employeeId}`;
          db.query(query, (err, results) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              init();
          });
      });
}
