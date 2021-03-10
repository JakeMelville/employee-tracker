const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./db/connection');

async function inputData() {
    const dataChoice = await inquirer.prompt(
        {
            type: 'list',
            name: 'addingInfo',
            message: 'What would you like to do?',
            choices: ['Add', 'View', 'Update']
        }
    )
    switch(dataChoice.addingInfo) {
        case 'Add':
            const add = await addInfo();
            break;
        case 'View':
            const view = await viewInfo();
            break;
        case 'Update':
            const update = await updateInfo();
            break;
    }
}
async function addInfo() {
    const addChoices = await inquirer.prompt(
        {
            type: 'list',
            name: 'addOptions',
            message: 'Would you like to add a department, role, or employee?',
            choices: ['Department', 'Role', 'Employee']
        }
    )
    switch (addChoices.addOptions) {
        case 'Department':
            console.log("add department");
            break;
        case 'Role':
            console.log("add role");
            break;
        case 'Employee':
            console.log("add employee");
            break;
    }
}
async function viewInfo() {
    const viewChoices = await inquirer.prompt(
        {
            type: 'list',
            name: 'viewOptions',
            message: 'Would you like to view departments, roles, or employees?',
            choices: ['Departments', 'Roles', 'Employees']
        }
    )
    switch (viewChoices.viewOptions) {
        case 'Departments':
            console.log("view departments");
            break;
        case 'Roles':
            console.log("view roles");
            break;
        case 'Employees':
            console.log("view employees");
            break;
    }
}
async function updateInfo() {
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

inputData();