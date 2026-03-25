import express from 'express';
const router = express.Router();

/*AUTOR*/
router.get('/', function(req, res, next) {
    res.render('author', {
        name: 'Cristian Mauricio',
        lastname: 'Garces Arroyo',
        mail: 'lb251130179@gamadero.tecnm.mx'

    });
});

module.exports = router;