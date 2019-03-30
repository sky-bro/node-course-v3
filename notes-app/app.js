const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
require("./utils");
const notes = require("./notes");
// import {newNote, getNotes} from "./notes";

const name = "Kaiyu";

notes.newNote(name);
console.log(notes.getNotes());
console.log(validator.isEmail("http://sky.com"));
console.log(chalk.inverse.green.bgRed.bold.underline('Hello', 'world'));


yargs.version("1.1");
yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            alias: "t",
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            alias: 'b',
            type: 'string'
        }
    },
    "handler": (argv) => {
        console.log("add a new note", argv.t, argv.b);
    }
});

console.log(yargs.argv);