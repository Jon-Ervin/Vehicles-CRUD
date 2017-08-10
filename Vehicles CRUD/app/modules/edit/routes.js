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
        res.render('edit/views/index', { vehiclestab: vehiclestab });
    }
});

router.get('/', (req, res) => {
    res.render('edit/views/index');
});

router.post('/', (req, res) => {
    var db = require('../../lib/database')();
    db.query("UPDATE vehiclestab SET ID= '"+req.body.id+"', Make= '"+req.body.make+"', Model= '"+req.body.model+"', Year= '"+req.body.year+"', PlateNumber= '"+req.body.platenumber+"',`Condition`= '"+req.body.carcondition+"' WHERE ID = '"+req.body.id+"'", (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

exports.edit = router;
