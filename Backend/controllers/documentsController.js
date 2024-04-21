const documentModel = require('../models/documentsModel');
const { verify } = require('jsonwebtoken');
const path = require('path');
const { uploadFileToS3 } = require('../s3Upload/uploadFileToS3');
const axios = require('axios');

exports.savedocuments = async (req, res) => {
    try {

        const titulo = req.body.titulo;
        const descripcion = req.body.descripcion;
        const estado = req.body.estado;
        const foto_perfil = req.file && req.file.filename ? path.join(__dirname, '../images/' + req.file.filename) : null;
        const token = req.body.token;
        const decodedToken = verify(token, process.env.JWT_KEY_SECRET_TOKEN);
        const id = decodedToken.id;

        const imageBase64 = req.body.imagen_base64;

        // Obtener la fecha y hora actual
        const fechaHoraActual = new Date();

        // Formatear la fecha y hora según tus necesidades
        const formatoFechaHora = `${fechaHoraActual.getFullYear()}-${fechaHoraActual.getMonth() + 1
            }-${fechaHoraActual.getDate()} ${fechaHoraActual.getHours()}:${fechaHoraActual.getMinutes()}:${fechaHoraActual.getSeconds()}`;

        const fotoPerfilUrl = await uploadFileToS3(foto_perfil, 'Fotos_documentos/');
        if (!fotoPerfilUrl) {
            res.status(500).json({ message: "Error al cargar la foto de perfil a S3" });
            throw new Error('Error al cargar la foto de perfil a S3');
        }

        const response = await axios.post('https://3v0stofaj0.execute-api.us-east-1.amazonaws.com/ProyectoSemiG14API/etiquetas', {
            imagen: imageBase64
        });

        const { etiqueta1, etiqueta2, etiqueta3 } = JSON.parse(response.data.body);


        // Registrar el nuevo usuario
        const userId = await documentModel.createDocument(titulo, descripcion, fotoPerfilUrl.Location, formatoFechaHora, etiqueta1, etiqueta2, etiqueta3, estado, id);
        if (userId.status === 200) {
            console.log('estado del documento:', userId.message);
        } else {
            console.error('Hubo un problema al el documento con la foto:', userId.message);
            res.status(500).json({ message: "Error interno del servido en el registro" });
        }

        return res.status(200).json({ message: 'Exito al ingresar los datos de documento registrado' });


    } catch (error) {
        console.error("Error al registrar documento:", error);
        res.status(500).json({ message: "Error interno del servidor en el registro" });
    }
};


exports.extraer = async (req, res) => {
    try {

        const imageBase64 = req.body.base64Image;
        const response = await axios.post('https://3v0stofaj0.execute-api.us-east-1.amazonaws.com/ProyectoSemiG14API/extraer', {
            imagen: imageBase64
        });

        const { texto_detectado } = JSON.parse(response.data.body);
        return res.status(200).json({ message: texto_detectado });


    } catch (error) {
        console.error("Error al registrar documento:", error);
        res.status(500).json({ message: "Error interno del servidor en el registro" });
    }
};

/*
exports.editdocuments = async (req, res) => {

    try {
        const nombre_usuario = req.body.nombre_usuario;
        const nombre_completo = req.body.nombre_completo;
        const contrasena = req.body.contrasena;
        const foto_perfil = req.file && req.file.filename ? path.join(__dirname, '../images/' + req.file.filename) : null;
        const token = req.body.token;
        const decodedToken = verify(token, process.env.JWT_KEY_SECRET_TOKEN);
        const id = decodedToken.id;

        // Verificar la contraseña 
        // Obtener el usuario por nombre de usuario
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(500).json({ message: "Credenciales inválidas" });
        }

        // Compara las contraseñas
        if (compareMD5Values(contrasena, user.contrasena)) {
            // Verificamos si cambió la imagen 
            if (foto_perfil != null) {
                const fotoPerfilUrl = await uploadFileToS3(foto_perfil, 'Fotos_Perfil/');
                if (!fotoPerfilUrl) {
                    return res.status(500).json({ message: "Error al cargar la foto de perfil a S3" });
                }
                // Registrar el nuevo usuario
                const userId = await userModel.updateUserPhoto(id, fotoPerfilUrl.Location);
                if (userId.status === 200) {
                    console.log('estado del usuario:', userId.message);
                } else {
                    console.error('Hubo un problema al actualizar la foto:', userId.message);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }

            }
            // Verificamos si cambió el nombre completo
            if (nombre_completo != null && nombre_completo != '') {
                const nombrecompletoupdate = await userModel.updateUserNameComplete(id, nombre_completo);
                if (nombrecompletoupdate.status === 200) {
                    console.log('estado del usuario:', nombrecompletoupdate.message);
                } else {
                    console.error('Hubo un problema al actualizar el nombre:', nombrecompletoupdate.message);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }
            }
            // Verificamos si cambió el nombre de usuario
            if (nombre_usuario != null && nombre_usuario != '') {
                const usernameExists = await userModel.checkUsernameExists(nombre_usuario);
                if (usernameExists) {
                    return res.status(500).json({ message: "El nombre de usuario ya está en uso" });
                }
                const nombreusuario = await userModel.updateUserName(id, nombre_usuario);
                if (nombreusuario.status === 200) {
                    console.log('estado del usuario:', nombreusuario.message);
                } else {
                    console.error('Hubo un problema al actualizar el nombre de usuario:', nombreusuario.message);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }
            }
            // Autenticación exitosa
            return res.status(200).json({ status: 200, message: "Inicio de sesión exitoso" });
        } else {
            return res.status(500).json({ status: 500, message: "Contraseña no válida" });
        }
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


//Funcion para obtener los datos del perfil
exports.getdocuments = async (req, res) => {
    // Obtener el ID del parámetro de consulta
    const token = req.query.id;
    const decodedToken = verify(token, process.env.JWT_KEY_SECRET_TOKEN);
    const id = decodedToken.id;

    try {
        // Obtener el usuario por nombre de usuario
        const user = await userModel.getPerfilData(id);
        if (!user) {
            res.status(500).json({ status: 500, message: "Error en la petición" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error al tomar los datos de usuario:", error);
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }

};
*/