
const fs = require('fs')
const getNotes = function () {
    return 'Your notes...'
}
//To add notes
const addNotes = function (title, body) {
const notesData = loadNotes()
const dublicateNotes = notesData.filter(function(note){
    return note.title === title
})

if(dublicateNotes.length == 0){
    notesData.push({
        title:title,
        body:body
    })
    saveNotes(notesData)
    console.log("Notes Added!!");
}else{
    console.log("Title already exists!!");
}
}
//to write to the file
const saveNotes = function(notes){
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}

//To load the existing notes
const loadNotes = function () {
    try {
        const notesData = fs.readFileSync('notes.json')
        const dataJSON = notesData.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const removeNotes = function(title){
    const notesData =loadNotes();
    const updatedNotes = notesData.filter(function(note){
        return note.title !== title
    })
    saveNotes(updatedNotes)

}

const readNotes = function(title){
    const notesData =loadNotes();
    const noteData = notesData.find(function(note){
        return note.title === title
            //return note;
        //}
    })
    return noteData;
}

module.exports = {
    getNotes: getNotes,
    loadNotes:loadNotes,
    addNotes: addNotes,
    removeNotes:removeNotes,
    readNotes:readNotes
}