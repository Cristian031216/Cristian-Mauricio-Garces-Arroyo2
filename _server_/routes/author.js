import express from 'express';
const router = express.Router();

/*AUTOR*/
router.get('/', (req, res) => {
    res.render('author', {
        nombre: 'Cristian Mauricio Garces Arroyo',
        rol: 'Desarrollador',
        descripcion: 'Estudiante de noveno semestre de la carrera TICs en el ITGAM'
    });
});

export default router;