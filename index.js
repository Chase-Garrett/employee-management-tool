// import inquirer
const inquirer = require('inquirer');

// import db connection
const db = require('./db/connection').mysql();

//view all departments function
const viewAllDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        menu();
    });
};

//view all roles function
const viewAllRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        menu();
    });
};

//view all employees function
const viewAllEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        menu();
    });
};

//add department function
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.department];
        db.query(sql, params, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Department added successfully!');
            menu();
        });
    });
};

// create menu with inquirer
const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit'
            ]
        }
    ])
    .then((answer) => {
        switch(answer.menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Quit':
                quit();
                break;
        }
    })
};

// start menu
menu();

//quit function
const quit = () => {
    console.log('Goodbye!');
    process.exit();
};