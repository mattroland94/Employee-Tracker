const db = require('./db/connection');
const inquirer = require('inquirer');
const conTable = require('console.table');

let depNameList = [];
let depIdList = [];
let roleNameList = [];
let empNameList = [];
let depid;
let roleid;
let mangid;

db.connect(function(err){
    if (err) {
        console.log('Connection Error')
    }
    console.log('db connected')
    console.log('Welcome to the Employee Tracker')
    mainpage();
})

function mainpage() {
    updateDepList();
    updateRoleList();
    updateEmpList();

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
                    viewADepartments();
                    break;
                case 'View roles':
                    viewARoles();
                    break;
                case 'View employees':
                    viewAEmployees();
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
                        let manSelect = answer.selectDepartment;
                        viewEmpByMan(manSelect);
                    })
                    break;
                case 'View employees by Dept.':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'selectDepartment',
                            message: "What deparment's employees would you like to see?",
                            choices: empNameList
                        }
                    ])
                    .then(answer => {
                        let manSelect = answer.selectDepartment;
                        viewEmpByMan(manSelect);
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
                        addDep(depName);
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
                            choices: depNameList
                        }
                    ])
                    .then(answer => {
                        let title = answer.roleName;
                        let salary = answer.roleSalary;
                        let deptName = answer.roleDept;
                        addRole(title, deptName, salary);
                    });
                    break;
                case 'Add an employee':
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
                            chocies: empNameList
                        }
                    ])
                    .then(answer => {
                        let firstn = answer.fName;
                        let lastn = answer.lName;
                        let rolen = answer.empRole;
                        let mang = answer.givenManager;
                        addEmployee(firstn, lastn, rolen, mang);
                    })
                    break;
                case 'Employee role update':
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
                        updateEployeeRole(eName, eRole);
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
                        updateEmployeeManagers(employName, manageName);
                    })
                    break;
                case 'Delete Dept':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'deleteDept',
                            message: 'Department to delete?',
                            choices: depNameList
                        }
                    ])
                    .then(answer => {
                        let deptDelete = answer.deleteDept;
                        deleteDepartment(deptDelete);
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
                        deleteEmployees(empDelete);
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