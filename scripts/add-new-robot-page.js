import inquirer from "inquirer"
import { getRobotPageHTML } from "./helper.js"
import fs from "fs"

inquirer.prompt([
    {
        type: 'input',
        name: 'RobotName',
        message: 'What is the robot\'s name?',
        default: 'rd22'
    },
    {
        type: 'number',
        name: 'RobotPrice',
        message: 'What price is the robot?',
        default: '50'
    },
    {
        type: 'list',
        name: 'RobotCondition',
        message: 'What is the robot\'s condition?',
        choices: ['new', 'used'],
        default: 'new'
    },
    {
        type: 'number',
        name: 'RobotWeight',
        message: 'What is the robot\'s weight?',
        default: '50'
    },
    {
        type: 'checkbox',
        name: 'RobotFeatures',
        message: 'Which features does the robot have?',
        choices: ['can fly', 'can talk', 'can clean']
    },
    {
        type: 'number',
        name: 'RobotViolationsNum',
        message: 'How many violations have been reported about this robot?',
        default: 0
    },
    {
        type: 'input',
        name: 'RobotDescription',
        message: 'What is the robot\'s description?',
        default: 'this is my description'
    }
    //image
]).then(answers => {
    const html = getRobotPageHTML(answers)
    console.log(html)

    fs.writeFile(`./robots/${answers.RobotName}.html`, html, err => {
        if (err){
            throw err
        }
        
        console.log(`${answers.RobotName}.html saved!`)
    })

})
  .catch(error => console.log(error))
