const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./db/connection');
const cTable = require('console.table');

async function userSelect() {
    const dataChoice = await inquirer.prompt(
        {
            type: 'list',
            name: 'addingInfo',
            message: 'What would you like to do?',
            choices: ['View all Employees', 'View all Departments', 'View all Roles', 'Add Employee', 'Add Deparment', 'Add role', 'Update Employee Role', 'Exit']
        }
    )
    switch (dataChoice.addingInfo) {
        case 'View all Employees':
            const viewAll = viewAllEmp();
            break;
        case 'View all Departments':
            const viewDept = viewAllDept();
            break;
        case 'View all Roles':
            const empByDept = viewAllRoles();
            break;
        case 'Add Employee':
            const addEmployee = addEmp();
            break;
        case 'Add Department':
            const addDept = addDept();
            break;
        case 'Add Role':
            const addRole = addRole();
            break;
        case 'Update Employee Role':
            const update = updateEmp();
            break;
        default:
            connection.end();
    }
}
//view all employees function
function viewAllEmp() {
    console.log("viewAllEmp");
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        userSelect();
    });

}
//view all department function--- 
function viewAllDept() {
    console.log('viewAllDept');
    connection.query('SELECT * FROM department', (err,res) => {
        if(err) throw err;
        console.table(res);
        userSelect()
    })
}
//view all roles
function viewAllRoles() {
    console.log('viewAllDept');
    connection.query('SELECT * FROM role', (err,res) => {
        if(err) throw err;
        console.table(res);
        userSelect()
    })
}

//add employees function
async function addEmp() {
    const addEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the new employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the new employees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the new employees role id?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the new employees manager id number?'
        }
    ])


    let first = addEmployee.firstName;
    let last = addEmployee.lastName;
    let role = addEmployee.roleId;
    let manager = addEmployee.managerId;


    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: `${first}`,
            last_name: `${last}`,
            role_id: `${role}`,
            manager_id: `${manager}`
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${first} has been added!`);
        })
    userSelect();
}




userSelect();
