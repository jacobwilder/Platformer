var path = require('path');
var router = require('express').Router();

// defines /notes path to notes.html
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

// defines every other path to index.html
router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
