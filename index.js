const fs = require('fs')
const inquirer = require('inquirer');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const generatePage = require('./src/page-template')
const managerArr = [];
const engineerArr = [];
const internArr = [];



const initializeEmployee = function() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What type of employee would you like to create?',
                choices: ['Manager', 'Engineer', 'Intern']
            },
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name? (Please respond)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the team employee's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the employee's ID. (must be answered)",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's Employee ID!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the employee's email address. (Must be answered)",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's email address!");
                    return false;
                }
            }
        },
    ])
    .then(data => {
        const profileQue = data;

        if (data.choices === 'Manager') {

            inquirer
                .prompt(
                    {
                        type: 'text',
                        name: 'office',
                        message: "What is the manager's office phone number?"
                    })
                .then(data => {
                    const manager = new Manager(profileQue.name, profileQue.id,
                        profileQue.email, data.office)
                    managerArr.push(manager)
                    console.log(manager)
                })
                .then(() => ask());

        } else if (data.choices === 'Engineer') {
            inquirer
                .prompt(
                    {
                        type: 'text',
                        name: 'github',
                        message: "What is the engineer's github username?"
                    })
                .then(data => {
                    const engineer = new Engineer(profileQue.name, profileQue.id,
                        profileQue.email, data.github)
                    engineerArr.push(engineer)
                })
                .then(() => ask());

        } else {
            inquirer
                .prompt(
                    {
                        type: 'text',
                        name: 'school',
                        message: "What is the intern's school?"
                    })
                .then(data => {
                    const intern = new Intern(profileQue.name, profileQue.id,
                        profileQue.email, data.school)
                    internArr.push(intern)
                })
                .then(() => ask())
        }
    })
}

const ask = function () {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'another',
            message: 'Would you like to add another employee?'
        })
        .then(data => {
            if (data.another === true) {
                initializeEmployee();
            } else {
                // console.log(team)
           var htmlcode = generatePage(managerArr, engineerArr, internArr)
           console.log(htmlcode)
           fs.writeFile('./dist/index.html', htmlcode, function(err) {
               if(err) throw err;
           })
            }
        }) 
}


initializeEmployee();