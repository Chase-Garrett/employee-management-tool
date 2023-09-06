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
const { get } = require('http');

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
    const newDepartment = await inquirer.prompt(prompts.addDept);

    await query(`INSERT INTO departments (name) VALUES (?)`, newDepartment.deptName.trim());

    await viewAllDepartments();
};

// get departments function
const getDepartments = async () => {
    const res = await query(`SELECT id, name FROM departments;`);

    for (const departments of res) {
        const dept = {};
        dept.id = departments.id;
        dept.name = departments.name;
        prompts.deptArr.push(dept);
    }
};

// add role function
const addRole = async () => {
    // get departments for choices
    await getDepartments();

    const newRole = await inquirer.prompt(prompts.addRole);

    // get department id
    const dept = await query(`SELECT id FROM departments WHERE name = ?`, newRole.roleDept);
    const deptId = dept[0].id;

    // insert new role
    await query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
    [newRole.roleName.trim(), parseInt(newRole.roleSalary), deptId]);

    await viewAllRoles();
};

// get roles function
const getRoles = async () => {
    const res = await query(`SELECT id, title FROM roles;`);

    for (const roles of res) {
        const role = {};
        role.id = roles.id;
        role.name = roles.title;
        prompts.roleArr.push(role);
    }
};

// get employees function
const getEmployees = async () => {
    const res = await query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees;`);

    for (const employees of res) {
        const employee = {};
        employee.id = employees.id;
        employee.name = employees.name;
        prompts.employeeArr.push(employee);
    }
};

// add employee function
const addEmployee = async () => {
    // get roles for choices
    await getRoles();
    // get employees for manager choices
    await getEmployees();

    const newEmployee = await inquirer.prompt(prompts.addEmployee);

    // get role id
    const role = await query(`SELECT id FROM roles WHERE title = ?`, newEmployee.employeeRole);
    const roleId = role[0].id;

    // get manager id
    const managerName = newEmployee.employeeManager.split(' ');
    const manager = await query(`SELECT id FROM employees WHERE first_name = (?) AND last_name = (?)`,
    [managerName[0], managerName[1]]);
    const managerId = manager[0].id;

    // insert new employee
    await query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [newEmployee.firstName.trim(), newEmployee.lastName.trim(), roleId, managerId]);

    await viewAllEmployees();
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
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
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