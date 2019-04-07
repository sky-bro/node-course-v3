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
    const duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0){
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

module.exports = {
    addNote,
    removeNote,
    getNotes,
    listNotes
};