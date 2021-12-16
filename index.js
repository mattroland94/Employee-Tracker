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
                    .prompt(
                        {
                            ca
                        }
                    )
            }
        })
}