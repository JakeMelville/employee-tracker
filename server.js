const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./db/connection');
const cTable = require('console.table');

function userSelect() {
    const dataChoice = inquirer.prompt(
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
            const remEmployee = addDept();
            break;
        case 'Add Role':
            const remEmployee = addRole();
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
        console.logtable(res);
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
 
// const deptData = inquirer.prompt(
//     {
//         type: 'list',
//         name: 'dataByDept',
//         message: 'View employees by department',
//         choices: ['Sales', 'Finance', 'Engineering']
//     }
// )
// switch (deptData.dataByDept) {
//     case 'Sales':
//         let query = 'SELECT employee.first_name, employee.last_name, employee.role_id, department.name, department.id';
//         query += 'FROM department.name INNER JOIN employee ON ('



//         break;
//     case 'Finance':
//         break;
//     case 'Engineering':
//         break;
// };
// connection.query('SELECT * FROM department', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     userSelect();
// })


// let depInfo = await connection.query('SELECT * FROM department')
// console.table(depInfo);
// userSelect();
// return depInfo;


//tried creating a function to show employees by department 

// async function viewAllEmpDept() {
//     console.log("viewAllEmpDept");
//     let depInfo = await connection.query('SELECT * FROM department')
//     // console.table(depInfo);
//     const deptChoice = await inquirer.prompt(
//         {
//             type: 'list',
//             name: 'department',
//             message: 'Which department?',
//             choices: ['Sales', 'Engineering', 'Finance']
//         }
//     )
//     switch (deptChoice.department) {
//         case 'Sales':
//             const salesDept = depInfo.find(department => department.name = "Sales");
//             const roles = await connection.query('SELECT * FROM roles WHERE department_id = ?', salesDept.id)
//             console.log("roles", roles)
//             connection.query('SELECT * FROM employee WHERE role_id = ?', salesDept.id) //pass role id in
//             break;
//         case 'Engineering':

//             break;
//         case 'Finance':

//             break;
//     }
// }
// connection.query('SELECT * FROM department', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     userSelect();
// })


// let depInfo = await connection.query('SELECT * FROM department')
// console.table(depInfo);
// userSelect();
// return depInfo;


//tried creating a function to show employees by department 

// async function viewAllEmpDept() {
//     console.log("viewAllEmpDept");
//     let depInfo = await connection.query('SELECT * FROM department')
//     // console.table(depInfo);
//     const deptChoice = await inquirer.prompt(
//         {
//             type: 'list',
//             name: 'department',
//             message: 'Which department?',
//             choices: ['Sales', 'Engineering', 'Finance']
//         }
//     )
//     switch (deptChoice.department) {
//         case 'Sales':
//             const salesDept = depInfo.find(department => department.name = "Sales");
//             const roles = await connection.query('SELECT * FROM roles WHERE department_id = ?', salesDept.id)
//             console.log("roles", roles)
//             connection.query('SELECT * FROM employee WHERE role_id = ?', salesDept.id) //pass role id in
//             break;
//         case 'Engineering':

//             break;
//         case 'Finance':

//             break;
//     }
// 