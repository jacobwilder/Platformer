var path = require('path');
var router = require('express').Router();

// defines /notes path to notes.html
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// defines every other path to index.html
router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/contact.html'))
});

module.exports = router;