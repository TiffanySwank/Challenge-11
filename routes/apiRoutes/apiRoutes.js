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