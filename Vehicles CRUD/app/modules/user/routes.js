
var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {

    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {

        return render([]);
    }

    var db = require('../../lib/database')();

    db.query('SELECT * FROM vehiclestab', function (err, results, fields) {

        if (err) return res.send(err);

        render(results);
    });

    function render(vehiclestab) {
        res.render('user/views/index', { vehiclestab: vehiclestab });
    }
});

router.get('/new', (req, res) => {
    res.render('user/views/index');
});

router.post('/new', (req, res) => {
    var db = require('../../lib/database')();
    db.query("INSERT INTO vehiclestab (ID, Make, Model, Year, PlateNumber, `Condition`) VALUES ('"+req.body.id+"','"+req.body.make+"','"+req.body.model+"','"+req.body.year+"','"+req.body.platenumber+"','"+req.body.carcondition+"')", (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

exports.users = router;
