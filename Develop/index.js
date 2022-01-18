const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "input",
            name: "title",
            message: "Enter the title of our project:"
        },
        {
            type: "input",
            name: "description",
            message: "Write a summary of your application:"
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT","APACHE 2.0","None"]
        },
        {
            type: "input",
            name: "installations",
            message: "How does a user install this application?"
        },
        {
            type: "input",
            name: "tests",
            message: "How does a user test this application?"
        },
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using this application?"
        },
        {
            type: "input",
            name: "contribute",
            message: "How can a user contribute to this project?",
        },
    ]);


function generateMD(data){    
return`# ${data.title}
${data.description}
## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
### Installation:
To install run the following from the command line:
"npm install"
### Usage:
${data.usage}
### License:
This project is licensed under:
${data.license}
### Contributing:
${data.contribute}
### Tests:
To test, type the following into the command line:
"node index.js"
### Questions:
If you have any questions contact me on [GitHub](https://github.com/${data.username}) or contact 
${data.name} at ${data.email}  
 `
}


questions()
.then((data) => writeFileAsync('generatedREADME.md', 
generateMD(data)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));