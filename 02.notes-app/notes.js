const fs = require('fs');
const chalk = require('chalk')

notes_path = "data.json";

const loadNotes = () => {
    try {
        notesBuffer = fs.readFileSync(notes_path);
        all_notes = notesBuffer.toString();
        return JSON.parse(all_notes);   
    } catch (e) {
        return [];
    }
}

const saveNotes = (all_notes) => {
    try {
        fs.writeFileSync(notes_path, JSON.stringify(all_notes, null, 4));
    } catch (e) {
        console.log('Save notes failed:', e);
    }
}

const listNotes = () => {
    const all_notes = loadNotes();

    all_notes.forEach((note) => {
        console.log(chalk.black.bgWhite(note.title));
        // console.log(note.body);
    })
}

const readNote = (title) => {
    const all_notes = loadNotes();
    note = all_notes.find((nt) => nt.title === title);
    if (note) {
        console.log(chalk.black.bgWhite(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red('Note not found!'));
    }
}

const addNote = (title, body) => {
    const all_notes = loadNotes();

    let duplicate = all_notes.find((note) => note.title === title);
    debugger;
    if (!duplicate) {
        all_notes.push({
            title,
            body,
        });
        saveNotes(all_notes);
        console.log(chalk`{green New notes added!}`);
    } else {
        console.log(chalk`{red Note title taken!}`);
    }
}

const removeNote = (title) => {
    const all_notes = loadNotes();

    remaining_notes = all_notes.filter((note) => note.title !== title);
    if (remaining_notes.length === all_notes.length) {
        console.log(chalk`{red Note not found, nothing changed!}`);
    } else {
        saveNotes(remaining_notes);
        console.log(chalk`{green Note removed!}`);
    }
}

module.exports = {
    loadNotes,
    addNote,
    removeNote,
    listNotes,
    readNote,
}