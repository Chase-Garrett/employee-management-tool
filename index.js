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
        const sql = `INSERT INTO departments (name) VALUES (?)`;
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

// get departments function
const getDepartments = () => {
    const sql = `SELECT name FROM departments`;
    const departments = db.query(sql);
    // set up array to hold department names
    const departmentArray = [];
    
    return departmentArray;
};

// add role function
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this role belong to?',
            // list of departments from db
            choices: getDepartments()
        }
     ])
        .then((answer) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [answer.role, answer.salary, answer.department];
            db.query(sql, params, (err, result) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Role added successfully!');
                menu();
            });
        }
    );
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