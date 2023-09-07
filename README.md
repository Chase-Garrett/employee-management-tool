# employee-management-tool
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Description
CLI tool for managing and employee database.
## Table of Contents
-[Installation](#installation)

  -[Usage](#usage)

  -[Credits](#credits)

  -[Tests](#tests)

  -[License](#license)

  -[Questions](#questions)
## Installation
Clone the repository, navigate to the directory and run "npm install" to ensure all dependencies are properly installed.

This application makes use of mysql, please ensure that you have mysql installed before continuing with the next steps.

Navigate to the "db" directory and launch mysql. Use the command "source schema.sql" to initialize the database. Then run "source seeds.sql" to populate the database with sample data.

The application is now ready to be used.

## Usage
You can follow the directions in the installation section to run the application with the sample data or you can populate the database with your own data using mysql.

To start the program use "npm start" from the application's directory. Once the application starts you will be presented with a list of options for viewing the departments, roles, or employees, adding a new department, role, or employee, updating an employee role, or quitting from the program.

Depending on what option you select you may be presented with further options such as entering in the name of a new department or employee. Once you have completed the steps asked of you the application will always display the relevant table that has been updated.

A walkthrough video can be found [here](https://drive.google.com/file/d/1xqB3XERURqHQLBut2vz-_yUaInwe5IPI/view).

## Credits
This application makes use of node.js, inquirer, and mysql.

## Tests
N/A

## License
This project is licensed under the MIT license.

## Questions
If you have any questions, please contact me at chasegarrett@tutanota.com. You can also visit my GitHub for more of my work.