import path from "node:path"
import { fileURLToPath } from "node:url"
// Importando el motor de plantillas
import { create as createHbsEngine} from 'express-handlebars'

// Importando la configuracion de vite
import { registerViteHelper } from "./vite.js"

// Creando constantes de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Exportar la funcion de configuracion
export function configureHandlebars(app){
    //Configurando handlebars
    // Creo una instancia del view engine
    const exphbs = createHbsEngine({
        extname: '.hbs',
        defaultlayout: 'main'
    })
    // Registrando helper de vite
    registerViteHelper(exphbs.handlebars)

    // Integrando Hbs al 
    // 1. Registro el motor
    app.engine('hbs', exphbs.engine)
    // 2. Establece extension para las vistas
    app.set('view engine', 'hbs')
    // 3. Etablesco directorio de vistas
    app.set('views', path.join(__dirname,'..','views'))
}