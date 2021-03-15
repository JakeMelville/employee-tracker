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
            choices: ['View all Employees', 'View all Departments', 'View all Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'Exit']
        }
    )
    switch (dataChoice.addingInfo) {
        case 'View all Employees':
            viewAllEmp();
            break;
        case 'View all Departments':
            viewAllDept();
            break;
        case 'View all Roles':
            viewAllRoles();
            break;
        case 'Add Employee':
            addEmp();
            break;
        case 'Add Department':
            addDept();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Update Employee Role':
            updateEmp();
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
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        userSelect()
    })
}
//view all roles
function viewAllRoles() {
    console.log('viewAllDept');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
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
//add department function
async function addDept() {
    const deptAdd = await inquirer.prompt(
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the new department name?'
        }
    )

    let departmentName = deptAdd.deptName;


    connection.query(
        'INSERT INTO department SET ?',
        {
            name: `${departmentName}`,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${departmentName} has been added!`);
        })
    userSelect();
}

async function addRole() {
    const roleAdd = await inquirer.prompt([
        {
            type: 'input',
            name: 'deptId',
            message: 'What is the new roles id number?'
        },
        {
            type: 'input',
            name: 'roleTitle',
            messgae: 'What is the new role name?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the new role salary?'
        }
    ])
    let roleId = roleAdd.deptId;
    let title = roleAdd.roleTitle;
    let roleSal = roleAdd.salary;


    connection.query(
        'INSERT INTO role SET ?',
        {
            department_id: `${roleId}`,
            title: `${title}`,
            salary: `${roleSal}`

        },
        (err, res) => {
            if (err) throw err;
            console.log(`${title} has been added!`);
        })
    userSelect();
}
async function updateEmp() {
    const updateEmpRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id number of the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: "What would you like this employee's new role id to be?"
        }
    ])
    let employeeId = updateEmpRole.id;
    let newRoleId = updateEmpRole.roleId;

    connection.query(`UPDATE employee SET role_id = ${newRoleId} WHERE id = ${employeeId}`)
    // console.log(updateEmpRole)
    userSelect();
}
userSelect();
