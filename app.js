
const yargs = require('yargs')

const {name} = require('./utils.js')
const {add} = require('./utils')

const validator = require('validator')

const chalk = require('chalk')

const notes = require('./notes')

const sum = add(4,-3)
//const message = getNotes();
// const name = 'App Nikhil'
//console.log(name);
console.log(sum);
//console.log(message);
// console.log(validator.isEmail(message));
console.log(validator.isEmail('nikhil@example.com'));

console.log(chalk.green.bold.inverse('Success!!'));



// const fs = require('fs')

// fs.writeFileSync('notes.txt','My name is Nikhil')

// fs.appendFileSync('notes.txt','\n Appended text')



console.log("-------------------------------------------------------");

// console.log(process.argv);
// console.log(yargs.argv);
// const args = process.argv[2];
// console.log(args);

yargs.command({
    command:'add',
    describe:'Adding a note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note Body',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title,argv.body)

    }
})

yargs.command({
    command:'remove',
    describe:'removing a note',
    builder:{
        title:{
            describe:'Note Title to remove',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
      notes.removeNotes(argv.title)
    }
})
yargs.command({
    command:'list',
    describe:'listing notes',
    handler: function(){
        console.log("All the notes!!");
       const data =  notes.loadNotes()
       data.forEach(note => {
        console.log(note.title); 
       }); 
       
    }
})
yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            type:"string",
            demandOption:true,
            describe:"Title of note to be read"
        }
    },
    handler: function(argv){
        console.log("Reading a note!!");
        const noteData = notes.readNotes(argv.title)
        
        console.log(chalk.green.inverse(noteData.title) +'\n'+chalk.inverse(noteData.body))
    }
})

//console.log(yargs.argv);
yargs.parse()