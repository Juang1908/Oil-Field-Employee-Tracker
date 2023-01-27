DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS departmentChart;
DROP TABLE IF EXISTS roleChart;
DROP TABLE IF EXISTS employeeChart;

CREATE TABLE departmentChart (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(50) NOT NULL 
);

CREATE TABLE roleChart (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary  DECIMAL NOT NULL,
    deptId INT,
    FOREIGN KEY (deptId) REFERENCES departmentChart(id) ON DELETE SET NULL
);

CREATE TABLE employeeChart (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    roleId INT,
    managerId INT,
    FOREIGN KEY (roleId) REFERENCES roleChart(id) ON DELETE SET NULL,
    FOREIGN KEY (managerId) REFERENCES roleChart(id) ON DELETE SET NULL
);

