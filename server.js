//dependencies
const { json } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
var PORT = process.env.PORT || 3000;

//middleware
const app = express();
app.use(express.json());
app.use(express.static('Develop'))
app.use(express.urlencoded({ extended: true }));

//http routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//api routes below, get, post and delete
app.get('/api/notes', (req, res) => {

    //readinging json file
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) throw err;
        //console.log('get')
        const notes = JSON.parse(data);
        res.send(notes)
    })

})

//post request
app.post('/api/notes', (req, res) => {

    //reading our json file and returning as 'data' variable
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) console.log('readFile error');

        //parsing our 'data' array into a readable list of objects
        let objectArray = JSON.parse(data);
        //console.log(objectArray);

        //adds our new note req.body to our object array variable
        objectArray.push(req.body);

        //giving each object in our array an id
        objectArray.forEach((item, i) => {
            item.id = i + 1;
        });

        //adding our new note w/ id to our actual JSON file
        let newNoteObj = JSON.stringify(objectArray);
        fs.writeFileSync(path.join(__dirname, '/db/db.json'), newNoteObj, (err, result) => {
            if (err) console.log('writefile error')
        });
    })

    //sending our object array as response
    res.sendStatus(200)
    res.send(req.body)
})

app.delete('/api/notes/:id', (req, res) => {


    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {

        //parsing our 'data' array into a readable list of objects
        let objectArray = JSON.parse(data);

        //looping through to check which one is the req.params.id (the id for the request is found at perams)
        objectArray.forEach((item) => {
            //checking to see if the item and id match (need to set req.perams.id back 1 to match item.id of what we clicked on)
            if (item.id == req.params.id) {
                
                objectArray.splice(req.params.id - 1, 1)
            }

            //reassining the ids after deletion
            objectArray.forEach((item, i) => {
                item.id = i + 1;
            });

        });
        //adding our new note w/ id to our actual JSON file
        let newArray = JSON.stringify(objectArray);
        fs.writeFileSync(path.join(__dirname, '/db/db.json'), newArray, (err, result) => {
            if (err) console.log('writefile error')
        });

    })
    
    res.send(req.params.id)

})

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

//listening on port # specified above
app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`) })
