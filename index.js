// import inquirer
const inquirer = require('inquirer');

// import db connection
const db = require('./db/connection').mysql();

// import util
const util = require('util');

// promisify db query
const query = util.promisify(db.query).bind(db);

// import prompts
const prompts = require('./lib/prompts');

// display data
const displayData = (data) => {
    console.log('\n');
    console.table(data);
    console.log('\n');  
};

//view all departments function
const viewAllDepartments = async () => {
    const res = await query(`SELECT id, name AS department FROM departments;`)

    displayData(res);
    menu();
};

//view all roles function
const viewAllRoles =  async () => {
    const res = await query(`SELECT roles.id, roles.title, departments.name AS department, roles.salary
    FROM roles
        JOIN departments
            ON roles.department_id = departments.id;`)
    
    displayData(res);
    menu();
};

//view all employees function
const viewAllEmployees = async () => {
    const res = await query(`SELECT e.id, e.first_name, e.last_name, roles.title AS title, roles.salary AS salary, departments.name AS department,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
        JOIN roles 
            ON e.role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id
        LEFT OUTER JOIN employees m
            ON e.manager_id = m.id;`)
    
    displayData(res);
    menu();
};

// add department function
const addDepartment = async () => {
    const department = await inquirer.prompt(prompts.addDepartment);

    await db.query(`INSERT INTO departments (name) VALUES (?)`, department.name.trim());

    await viewAllDepartments();
};

// create menu with inquirer
const menu = () => {
    inquirer.prompt(prompts.mainMenu)
    .then((answer) => {
        switch(answer.choice) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add rmployee':
                addEmployee();
                break;
            case 'Update rmployee role':
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