INSERT INTO departmentChart (deptName)
    VALUES  ('Quality'),
            ('Production'),
            ('Engeneering'),
            ('Testing'),
            ('Human Resources');

INSERT INTO roleChart (title, salary, deptId)
    VALUES  ('Quality Manager', 60000, 1),
            ('Production Manager', 55000, 2),
            ('Engeneering Manager', 70000, 3),
            ('Testing Manager', 63000, 4),
            ('Human Resources', 55000, 5),
            ('Quality Lead', 40000, 1),
            ('Production Lead', 35000, 2),
            ('Engeneering Lead', 50000, 3),
            ('Testing Lead', 35000, 4),
            ('Quality Assistant', 32000, 1),
            ('Production Assistant',33000, 2),
            ('Engeneering Assistant', 43000, 3),
            ('Testing Assistant', 30000, 4); 

INSERT INTO employeeChart (roleId, firstName, lastName, managerId)
    VALUES  (1, 'Brenda', 'Martinez', 1),
            (2, 'Kevin', 'Chan', 2),
            (3, 'Tom', 'Brown', 3),
            (4, 'Jose', 'Rodriguez', 4),
            (5, 'Carlos', 'Herrera', null),
            (6, 'Ashley', 'Lourd', 4),
            (7, 'Cameron', 'Adams', 4);