const fs = require("fs");
const chalk = require('chalk');

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try{
        notes = fs.readFileSync('notes.json', 'utf-8');
        console.log(notes);
        return JSON.parse(notes);
    } catch(e){
        return [];
    }
};

const addNote = (title, body) => {
    // const notes = getNotes();
    const notes = loadNotes();
    const duplicateNote = notes.find(note=>note.title===title);
    if (!duplicateNote){
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title taken!'));
    }
};

const removeNote = (title) => {
    // const notes = getNotes();
    console.log(1);
    const notes = loadNotes();
    const notes2Save = notes.filter((note) => note.title !== title);
    if (notes2Save.length !== notes.length){
        console.log(chalk.bgGreen.black('Note removed!'));
        saveNotes(notes2Save);
    } else {
        console.log(123);
        console.log(chalk.red.inverse('No note found!'));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
};

const getNotes = () => {
    return loadNotes();
}

const readNote = (title) => {
    noteFound = loadNotes().find(note=>note.title===title);
    if (noteFound) {
        console.log(chalk.green.inverse(noteFound.title));
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

module.exports = {
    addNote,
    removeNote,
    getNotes,
    listNotes,
    readNote
};