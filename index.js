const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?"
  },{
    type: "input",
    name: "email",
    message: "What is your email address?"
  },
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?"
  },
  {
    type: "input",
    name: "description",
    message: "Please write a short description of your project."
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license should your project have?",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
  },
  {
    type: "input",
    name: "installation",
    message: "What is the command to install dependencies?",
    default: "npm i"
  },
  {
    type: "input",
    name: "test",
    message: "What is the command to run tests?",
    default: "npm test"
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?",
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing to the repo?",
  }
];

// function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          console.log (err);
          
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'README file created!'
        });
    })
})
};


function init() {
  inquirer.prompt(questions)
  .then((inquirerResponses) => {
    writeToFile("README.md", generateMarkdown({...inquirerResponses}));
  })
}

init();
