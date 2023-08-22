const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
 
  app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    newNote.id = Date.now().toString();

    notes.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
  });
};

const path = require('path');

module.exports = (app) => {

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};