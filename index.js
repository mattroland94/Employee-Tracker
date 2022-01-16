const db = require('./db/connection');
const inquirer = require('inquirer');
const conTable = require('console.table');

let deptNameList = [];
let deptIdList = [];
let roleNameList = [];
let empNameList = [];
let department_id;
let role_id;
let manager_id;

db.connect(function(err){
    if (err) {
        console.log('Connection Error')
    }
    console.log('db connected')
    console.log('Welcome to the Employee Tracker')
    mainMenu();
})

function mainMenu() {
    updateDeptLists();
    updateRoleLists();
    updateEmpLists();

    inquirer
        .prompt(
            {
                type: 'list',
                name: 'choice',
                message: 'Choose your action',
                choices: ['View departments',
                   'View roles',
                    'View employees',
                    'View employees by management',
                    'View employees by Dept.',
                    'Add dept',
                    'Add role',
                    'Add employee',
                    'Update employee role',
                    'Update employee manager',
                    'Delete Dept',
                    'Delete role',
                    'Delete employees',
                    'Exit'
                 ]
            }
        )
        .then(answer => {
            console.clear();
            switch(answer.choice){
                case 'View departments':
                    viewAllDepts();
                    break;
                case 'View roles':
                    viewAllRoles();
                    break;
                case 'View employees':
                    viewAllEmps();
                    break;
                case 'View employees by management':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'selectManager',
                            message: "Which Manager's employees would you like to see?",
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let manSelect = answer.selectManager;
                        viewEmpsByManager(manSelect);
                    })
                    break;
                case 'View employees by Dept.':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'selectDepartment',
                            message: "What department's employees would you like to see?",
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let manSelect = answer.selectDepartment;
                        viewEmpsByDept(manSelect);
                    })
                    break;
                case 'Add dept':
                    inquirer
                    .prompt(
                        {
                            type: 'input',
                            name: 'deptName',
                            message: 'What is the department name?',
                            validate: nameIn => {
                                if (nameIn) {
                                    return true;
                                }
                                else {
                                    console.log('Enter Dept that you would like to create.');
                                }
                            }
                        }
                    )
                    .then(answer => {
                        let depName = answer.deptName;
                        addDept(depName);
                    });
                    break;
                case 'Add role':
                    inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What is the name of the role?',
                            validate: nameIn => {
                                if (nameIn) {
                                    return true;
                                }
                                else {
                                    console.log('Enter role');
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'roleSalary',
                            message: 'What is the Salary?',
                            validate: nameIn => {
                                if (nameIn) {
                                    return true;
                                }
                                else {
                                    console.log('Enter Salary');
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'roleDept',
                            message: 'What Dept. is this role?',
                            choices: deptNameList
                        }
                    ])
                    .then(answer => {
                        let title = answer.roleName;
                        let salary = answer.roleSalary;
                        let deptName = answer.roleDept;
                        addRole(title, deptName, salary);
                    });
                    break;
                case 'Add employee':
                    inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'fName',
                            message: 'Employees first name?',
                            validate: nameIn => {
                                if (nameIn) {
                                    return true;
                                }
                                else {
                                    console.log('Enter employees fname');
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'lName',
                            message: 'Employees last name?',
                            validate: nameIn => {
                                if (nameIn) {
                                    return true;
                                }
                                else {
                                    console.log('Enter employeese lname');
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'empRole',
                            message: 'Employee Role?',
                            choices: roleNameList
                        },
                        {
                            type: 'list',
                            name: 'givenManager',
                            message: 'Employees manager?',
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let first_name = answer.fName;
                        let last_name = answer.lName;
                        let roleName = answer.empRole;
                        let manager = answer.givenManager;
                        addEmp(first_name, last_name, roleName, manager);
                    })
                    break;
                case 'Update employee role':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'empRoleUpdate',
                            message: 'Employee to update role?',
                            choices: empNameList
                        },
                        {
                            type: 'list',
                            name: 'nRole',
                            message: 'Employees new role?',
                            choices: roleNameList
                        }
                    ])
                    .then(answer => {
                        let eName = answer.empRoleUpdate;
                        let eRole = answer.nRole;
                        updateEmpRole(eName, eRole);
                    })
                    break;
                case 'Update employee manager':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'empName',
                            message: 'What employees manager do you want to update?',
                            choices: empNameList
                        },
                        {
                            type: 'list',
                            name: 'mangName',
                            message: 'Name of employees new manager?',
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let employName = answer.empName;
                        let manageName = answer.mangName;
                        updateEmpManagers(employName, manageName);
                    })
                    break;
                case 'Delete Dept':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteDept',
                            message: 'Department to delete?',
                            choices: deptNameList
                        }
                    ])
                    .then(answer => {
                        let deptDelete = answer.deleteDept;
                        deleteDept(deptDelete);
                    })
                    break;
                case 'Delete role':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteRole',
                            message: 'What role are you going to delete?',
                            choices: roleNameList
                        }
                    ])
                    .then(answer => {
                        let roleDelete = answer.deleteRole;
                        deleteRoles(roleDelete);
                    })
                    break;
                case 'Delete employees':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteEmployee',
                            message: 'What employee do you want to delete?',
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let empDelete = answer.deleteEmployee;
                        deleteEmps(empDelete);
                    })
                    break;
                case 'Exit':
                    db.destroy();
                    process.exit(0);
                default:
                    mainMenu();
            }
        })
}
function viewAllDepts() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`VIEWING DEPARTMENTS`);
        console.log('\n');
        console.log(rows);
        console.log('\n');
        mainMenu();
    })
}
function viewAllRoles() {
    const sql = `SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEWING ROLES');
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}

function viewAllEmps() {
    const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS role, departments.name as department, roles.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles
                ON e.role_id = roles.id
                LEFT JOIN departments
                ON roles.department_id = departments.id
                LEFT JOIN employees m
                ON m.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEWING EMPLOYEES');
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}

function viewEmpsByManager(selectManager) {
    manager_id = empNameList.indexOf(selectManager) + 1;
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title 
                FROM employees 
                LEFT JOIN roles on roles.id = employees.role_id 
                LEFT JOIN departments ON departments.id = roles.department_id 
                WHERE manager_id = ${manager_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`VIEWING EMPLOYEES UNDER ${selectManager}`);
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}

function viewEmpsByDept(deptName) {
    department_id = deptNameList.indexOf(deptName) + 1;

    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title
                FROM employees
                LEFT JOIN roles on roles.id = employees.role_id
                LEFT JOIN departments ON departments.id = roles.department_id
                WHERE department_id = ${department_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`VIEWING EMPLOYEES IN ${deptName} DEPARTMENT`);
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}

function addDept(deptName) {
    const sql = `INSERT INTO departments (name)
                VALUES ('${deptName}')`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`ADDING ${deptName}`);
        console.log('\n');
        mainMenu();
    })
}

function addRole(title, deptName, salary) {
    department_id = deptNameList.indexOf(deptName) + 1;

    const sql = `INSERT INTO roles (title, department_id, salary)
                VALUES ('${title}', ${department_id}, '${salary}')`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`ADDING ${title} TO ROLES LIST`);
        console.log('\n');
        mainMenu();
    })
}

function addEmp(fName, lName, roleName, mang) {
    role_id = roleNameList.indexOf(roleName) + 1;
    manager_id = empNameList.indexOf(mang) + 1;

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ('${fName}', '${lName}', ${role_id}, ${manager_id})`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`ADDING ${fName} ${lName} TO EMPLOYEES`);
        console.log('\n');
        mainMenu();
    })
}
function updateEmpRole(empName, empRole) {
    employee_id = empNameList.indexOf(empName) + 1;
    role_id = roleNameList.indexOf(empRole) + 1;

    const sql = `UPDATE employees
                SET role_id = ${role_id}
                WHERE employees.id = ${employee_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`UPDATING ${empName}'s ROLE TO ${empRole}`);
        console.log('\n');
        mainMenu();
    })
}
function updateEmpManagers(empName, managerName) {
    employee_id = empNameList.indexOf(empName) + 1;
    manager_id = empNameList.indexOf(managerName);

    const sql = `UPDATE employees
                SET manager_id = ${manager_id}
                WHERE employees.id = ${employee_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`UPDATE ${empName}'s MANAGER TO ${managerName}`);
        console.log('\n');
        mainMenu();
    })
}
function deleteDept(deptDelete) {
    department_id = deptNameList.indexOf(deptDelete) + 1;

    const sql = `DELETE FROM departments
                WHERE departments.id = ${department_id}`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`DEPARTMENT ${deptDelete} DELETED`);
        console.log('\n');
        mainMenu();
    })
}
function deleteRoles(roleDelete) {
    role_id = roleNameList.indexOf(roleDelete) + 1;

    const sql = `DELETE FROM roles
                WHERE roles.id = ${role_id}`;
    
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`DELETING ROLE ${roleDelete}`);
        console.log('\n');
        mainMenu();
    })
}
function deleteEmps(empDelete) {
    employee_id = empNameList.indexOf(empDelete) + 1;
    
    const sql = `DELETE FROM employees
                WHERE employees.id = ${employee_id}`;
    
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`DELETING EMPLOYEE ${empDelete}`);
        console.log('\n');
        mainMenu();
    })
}
function updateDeptLists() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        deptNameList.length = 0;
        deptIdList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let {id, name} = rows[i];
            let actual_id = id;
            let actual_name = name;
            deptNameList.push(actual_name);
            deptIdList.push(actual_id);
        }
    })
}
function updateRoleLists() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        roleNameList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let {title} = rows[i];
            let actual_role = title;
            roleNameList.push(actual_role);
        }
    })
}
function updateEmpLists() {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        empNameList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let {first_name, last_name} = rows[i];
            let actual_full_name = `${first_name} ${last_name}`;
            empNameList.push(actual_full_name);
        }
    })
}