INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, department_id, salary)
VALUES
    ('Lawyer', 4, 190000),
    ('Legal Team Lead', 4, 250000),
    ('Accountant', 3, 125000),
    ('Account Manager', 3, 140000),
    ('Software Engineer', 2, 120000),
    ('Lead Engineer', 2, 150000),
    ('Salesperson', 1, 80000),
    ('Sales Lead', 1, 100000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Matt', 'Roland', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);