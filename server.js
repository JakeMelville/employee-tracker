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
            choices: ['View all Employees', 'View all Employees by Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Exit']
        }
    )
    switch (dataChoice.addingInfo) {
        case 'View all Employees':
            const viewAll = viewAllEmp();
            break;
        case 'View all Employees by Department':
            const viewAllDept = viewAllEmpDept();
            break;
        case 'Add Employee':
            const addEmployee = addEmp();
            break;
        case 'Remove Employee':
            const remEmployee = remEmp();
            break;
        case 'Update Employee Role':
            const update = updateEmp();
            break;
        default:
            connection.end();
    }
}
function viewAllEmp() {
    console.log("viewAllEmp");
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        userSelect();
    });

}
async function viewAllEmpDept() {
 
}
async function addEmp() {
    const updateChoices = await inquirer.prompt(
        {
            type: 'list',
            name: 'updateOptions',
            message: 'Would you like to update employees or roles?',
            choices: ['Employees', 'Roles']
        }
    )
    switch (updateChoices.updateOptions) {
        case 'Employees':
            console.log("update employees");
            break;
        case 'Roles':
            console.log("update roles");
            break;
    }
}

userSelect();



//old inquirer
// const addChoices = await inquirer.prompt(
//     {
//         type: 'list',
//         name: 'addOptions',
//         message: 'Would you like to add a department, role, or employee?',
//         choices: ['Department', 'Role', 'Employee']
//     }
// )
// switch (addChoices.addOptions) {
//     case 'Department':
//         console.log("add department");
//         break;
//     case 'Role':
//         console.log("add role");
//         break;
//     case 'Employee':
//         console.log("add employee");
//         break;
// }

// const viewChoices = await inquirer.prompt(
//     {
//         type: 'list',
//         name: 'viewOptions',
//         message: 'Would you like to view departments, roles, or employees?',
//         choices: ['Departments', 'Roles', 'Employees']
//     }
// )
// switch (viewChoices.viewOptions) {
//     case 'Departments':
//         console.log("view departments", connection.query('SELECT name FROM department'))
//         connection.query('SELECT name FROM department', (err, res) => {
//             if (err) throw err
//         });
//         break;
//     case 'Roles':
//         console.log("view roles");
//         break;
//     case 'Employees':
//         console.log("view employees");
//         break;
// }