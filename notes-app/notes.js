const fs = require("fs");

const newNote = (noteContent) => {
    fs.appendFile("notes.txt", noteContent,(err)=>{
        if (err)
            console.error("appendFile notes.txt failed:", err);
    });
    
};

const getNotes = () => {
    return "Your notes...";
};

module.exports = {
    newNote,
    getNotes
};