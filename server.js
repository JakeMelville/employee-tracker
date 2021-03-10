const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./db/connection');

async function addData() {
    const dataChoice = await inquirer.prompt(
        {
            type: 'list',
            name: 'addingInfo',
            message: 'What would you like to add?',
            choices: ['Department', 'Role', 'Employee'],
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least once character";
            }
        }
    )
}
addData();