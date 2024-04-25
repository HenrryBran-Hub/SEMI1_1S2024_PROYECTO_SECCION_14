const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const multer = require('multer');
const path = require('path');

const disktorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-semi1-' + file.originalname);
    }
})

const upload = multer({
    storage: disktorage
}).single('foto_perfil')

const upload2 = multer();

router.post('/savedocument', upload, documentsController.savedocuments);
//router.post('/editdocument', upload, documentsController.editdocuments);
//router.post('/deldocument', upload2.none(), documentsController.deldocuments);
router.post('/extraer', upload2.none(), documentsController.extraer);
router.get('/adocuments', upload2.none(), documentsController.getDocumentosActivos);


module.exports = router;
