// import inquirer
const inquirer = require('inquirer');

// import db connection
const db = require('./db/connection').mysql();

// import prompts
const prompts = require('./lib/prompts');

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
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
        JOIN departments
            ON roles.department_id = departments.id;`;
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
    const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS title, roles.salary AS salary, departments.name AS department,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
        JOIN roles 
            ON e.role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id
        LEFT OUTER JOIN employees m
            ON e.manager_id = m.id;`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        menu();
    });
};

// create menu with inquirer
const menu = () => {
    inquirer.prompt(prompts.mainMenu)
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