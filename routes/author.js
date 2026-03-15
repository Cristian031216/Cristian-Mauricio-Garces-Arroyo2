var express = require('express');
var router = express.Router();

/*AUTOR*/
router.get('/', function(req, res, next) {
    res.render('author', {
        author: 'Cristian Mauricio',
        lastname: 'Garces Arroyo',

    });
});

module.exports = router;