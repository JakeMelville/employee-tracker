const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./db/connection');

async function addData() {
    const dataChoice = await inquirer.prompt(
        {
            type: 'list',
            name: 'addingInfo',
            message: 'What would you like to add?',
            choices: ['Department', 'Role', 'Employee']
        }
    )
    switch(dataChoice.addingInfo) {
        case 'Department':
            const departmentInfo = await department();
            break;
        case 'Role':
            const roleInfo = await role();
            break;
        case 'Employee':
            const employeeInfo = await employee();
            break;
    }
}
async function department() {
    const depChoices = await inquirer.prompt(
        {
            type: 'list',
            name: 'depOptions',
            message: 'Would you like to add, update, or view current departments?',
            choices: ['Add', 'Update', 'View']
        }
    )
    switch (depChoices.depOptions) {
        case 'Add':
            console.log("choice add selected");
            break;

    }
}
addData();