var router = require('express').Router();
var connection = require('../db/connection');

router.get('/api/leaderboards', function (req, res) {
  connection.query("SELECT * FROM leaderboards", function (err, result) {
    if (err) throw err;

    res.json(result);
  });
});

// POST USER DATA
router.post('/api/leaderboards', function (req, res) {
  connection.query(
    'INSERT INTO leaderboards SET ?', req.body,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


router.put('/api/leaderboards/:id', function (req, res) {
  connection.query(
    'UPDATE leaderboards SET ? WHERE id = ?', [req.body, req.params.id], function (err, result) {
      if (err) {
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        return res.status(404).end();
      }
      console.log(result);
      res.status(200).end();
  });
});
module.exports = router;