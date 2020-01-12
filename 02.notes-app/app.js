const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

console.log(validator.isURL('skybro.org'))

console.log(chalk.red.bgYellow('hello, sky!'))
console.log(chalk.red.bgYellow.bold('hello, sky!'))
console.log(chalk`Hi, I'm Kyle, and this is my website: {yellow.bgRed.bold.underline https://3monks.org}`)

yargs.version('1.0.0')
yargs.command({
    command: "add",
    describe: chalk`{green Add a new note}`,
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: "remove",
    describe: chalk`{green Remove a new note}`,
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: "list",
    describe: chalk`{green List notes}`,
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: "read",
    describe: chalk`{green Red a new note}`,
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv)