const deptArr = [];
const roleArr = [];
const employeeArr = [];

// function to prompt the user with the main menu
const mainMenu = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
    ]
};

// function to add a department
const addDept = {
    type: 'input',
    name: 'deptName',
    message: 'What is the name of the department?'
};

// function to add a role
const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this role?'
    },
    {
        type: 'list',
        name: 'roleDept',
        message: 'What department does this role belong to?',
        choices: deptArr
    }
];

// function to add an employee
const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role?',
        choices: roleArr
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employee\'s manager?',
        choices: employeeArr
    }
];

// function to update an employee's role
const updateEmployeeRole = [
    {
        type: 'list',
        name: 'employeeName',
        message: 'Which employee\'s role would you like to update?',
        choices: employeeArr
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s new role?',
        choices: roleArr
    }
];

// export the prompts
module.exports = {
    mainMenu,
    addDept,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deptArr,
    roleArr,
    employeeArr
};
