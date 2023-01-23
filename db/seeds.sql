INSERT INTO departmentChart (deptName)
    VALUES  ('Quality'),
            ('Production'),
            ('Engeneering'),
            ('Testing'),
            ('Human Resources');

INSERT INTO roleChart (deptId, title, salary)
    VALUES  (0001, 'Quality Manager', 60000),
            (0002, 'Production Manager', 55000),
            (0003, 'Engeneering Manager', 70000),
            (0004, 'Testing Manager', 63000),
            (0005, 'Human Resources', 55000),
            (0006, 'Quality Lead', 40000),
            (0007, 'Production Lead', 35000),
            (0008, 'Engeneering Lead', 50000),
            (0009, 'Testing Lead', 35000),
            (0010, 'Quality Assistant' 32000),
            (0011, 'Production Assistant',33000),
            (0012, 'Engeneering Assistant', 43000),
            (0013, 'Testing Assistant', 30000); 


INSERT INTO employeeChart (roleId, firstName, lastName, roleTitle, managerId);
    VALUES  (001, 'Brenda', 'Martinez', 'Quality Lead', 0001),
            (002, 'Kevin', 'Chan', 'Production Lead', 0002),
            (003, 'Tom', 'Brown', 'Engineering Assistant', 0003),
            (004, 'Jose', 'Rodriguez', 'Testing Manager', null),
            (005, 'Carlos', 'Herrera', 'Human Resources', null),
            (006, 'Ashley', 'Lourd', 'Testing Lead', 0004),
            (007, 'Cameron', 'Adams', 'Testing Assistant' 0004);
