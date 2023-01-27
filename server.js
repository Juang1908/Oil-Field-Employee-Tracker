// Packages Required
const inquirer = require('inquirer'); 
const mysql = require('mysql2');
const table = require('console.table');
//  Connection
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
// Questions
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
        'Update employee role',
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
// View Dept. Role and Employees
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
// Add Department
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
// Add Role
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
      let query = "INSERT INTO roleChart (title, salary, deptId) VALUES (?, ?, ?)";
      db.query(query, [answer.title, answer.salary, answer.deptId], (err, results) => {
          if (err) throw err;
          console.log(`Successfully added ${answer.title} role to the database.`);
          init();
      });
  });
}
// Add Employee
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
                'Quality Manager',
                'Production Manager',
                'Engeneering Manager', 
                'Testing Manager', 
                'Human Resources', 
                'Quality Lead', 
                'Production Lead', 
                'Engeneering Lead',
                'Testing Lead',
                'Quality Assistant',
                'Production Assistant',
                'Engeneering Assistant',
                'Testing Assistant',
              ]
          },
          {
              type: 'list',
              message: 'Select the manager for the employee:',
              name: 'managerId',
              choices: [
                1,
                2,
                3, 
                4, 
            
              ]
          }
      ])
      .then(answer => {
        // Insert the new employee into the database using the answers provided
        let query = "INSERT INTO employeeChart (roleId, firstName, lastName, managerId) VALUES (?,?,?,?)";
        db.query(query, [answer.roleId, answer.firstName, answer.lastName, answer.managerId], (err, results) =>{
            if (err) throw err;
            console.log("Employee added successfully!");
            init();
        });
    });
}
// Update Employee
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
