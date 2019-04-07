const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
// require("./utils");
const notes = require("./notes");
// import {newNote, getNotes} from "./notes";

const name = "Kaiyu";

// console.log(notes.getNotes());
// console.log(validator.isEmail("http://sky.com"));
// console.log(chalk.inverse.green.bgRed.bold.underline('Hello', 'world'));


yargs.version("1.1.0");
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
    handler(argv){
        console.log("add a new note", argv.t, argv.b);
        notes.addNote(argv.title, argv.body);
    }
});
yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            alias: "t",
            type: "string"
        }
    },
    handler(argv){
        console.log("remove a note", argv.t);
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler(){
        // console.log('Listing out all notes');
        notes.listNotes();
    }
});
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            alias: "t",
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();