const db = require('../database/connection');

// Función para registrar un nuevo usuario
exports.createDocument = async (titulo, descripcion,  urlfoto, fecha, etiqueta1, etiqueta2, etiqueta3, estado, idusuario) => {
    try {
        const [results, fields] = await db.execute('INSERT INTO documento (titulo, descripcion, urlfoto, fecha, etiqueta1, etiqueta2, etiqueta3, estado, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [titulo, descripcion, urlfoto, fecha, etiqueta1, etiqueta2, etiqueta3, estado, idusuario]);
        if (results.affectedRows === 1) {
            // Si se insertó correctamente, retornar un estado 200
            return { status: 200, message: 'El documento se guardó correctamente.', id: results.insertId };
        } else {
            // Si no se insertó correctamente, retornar un estado 500 con un mensaje de error
            return { status: 500, message: 'Hubo un problema al guardar la informacion de documento.' };
        }
    } catch (error) {
        throw error;
    }
};

exports.getDocumentsActive = async (estado)=>{
    try {
        const [results, fields] = await db.execute('select id, titulo, descripcion, urlfoto, fecha, etiqueta1, etiqueta2, u.nombrecompleto from documento d ' 
        +'join usuario u ON d.idusuario=u.idusuario '
        +'where estado=?', [estado]);
        return results;
        
    } catch (error) {
        throw error
    }
}

/*
// Función para verificar si un nombre de usuario ya está registrado
exports.checkUsernameExists = async (nombre_usuario) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario WHERE nombreusuario = ?', [nombre_usuario]);
        return results.length > 0; // Retorna true si el nombre de usuario existe, false si no
    } catch (error) {
        throw error;
    }
};

// Función para obtener información de usuario por nombre de usuario y contraseña
exports.getUserById= async (id) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario WHERE idusuario = ?', [id]);
        return results[0]; // Retorna el primer usuario encontrado con el nombre de usuario y contraseña proporcionados
    } catch (error) {
        throw error;
    }
};

// Función para obtener información de usuario por nombre de usuario y contraseña
exports.getUserByUsername= async (name) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario WHERE nombreusuario = ?', [name]);
        return results[0]; // Retorna el primer usuario encontrado con el nombre de usuario y contraseña proporcionados
    } catch (error) {
        throw error;
    }
};

// Función para obtener información de usuario por nombre de usuario
exports.getPerfilData = async (id) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario WHERE idusuario = ?', [id]);
        return results[0]; // Retorna el primer usuario encontrado con el nombre de usuario y contraseña proporcionados
    } catch (error) {
        throw error;
    }
};

//Función para comparar nombre de usuario nombre de usuario y si es distinto actualizar
exports.getPerfilData = async (id) => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario WHERE idusuario = ?', [id]);
        return results[0]; // Retorna el primer usuario encontrado con el nombre de usuario y contraseña proporcionados
    } catch (error) {
        throw error;
    }
};

// Función para registrar un nuevo usuario
exports.updateUserPhoto = async (id, foto_perfil) => {
    try {
        const [results, fields] = await db.execute('UPDATE usuario SET fotoperfil = ? WHERE idusuario = ?', [foto_perfil, id]);
        if (results.affectedRows === 1) {
            // Si se actualizó correctamente, retornar un estado 200
            return { status: 200, message: 'La foto de perfil del usuario se actualizó correctamente.' };
        } else {
            // Si no se actualizó correctamente (por ejemplo, si el usuario con el ID proporcionado no existe), retornar un estado 404 con un mensaje de error
            return { status: 404, message: 'El usuario con el ID proporcionado no fue encontrado.' };
        }
    } catch (error) {
        // Si se produce un error durante la ejecución de la consulta, lanzar el error para que pueda ser manejado por el código que llama a esta función
        throw error;
    }
};


// Función para registrar un nuevo usuario
exports.updateUserNameComplete = async (id, nombre_completo) => {
    try {
        const [results, fields] = await db.execute('UPDATE usuario SET nombrecompleto = ? WHERE idusuario = ?', [nombre_completo, id]);
        if (results.affectedRows === 1) {
            // Si se actualizó correctamente, retornar un estado 200
            return { status: 200, message: 'La foto de perfil del usuario se actualizó correctamente.' };
        } else {
            // Si no se actualizó correctamente (por ejemplo, si el usuario con el ID proporcionado no existe), retornar un estado 404 con un mensaje de error
            return { status: 404, message: 'El usuario con el ID proporcionado no fue encontrado.' };
        }
    } catch (error) {
        // Si se produce un error durante la ejecución de la consulta, lanzar el error para que pueda ser manejado por el código que llama a esta función
        throw error;
    }
};

// Función para registrar un nuevo usuario
exports.updateUserName = async (id, nombre_usuario) => {
    try {
        const [results, fields] = await db.execute('UPDATE usuario SET nombreusuario = ? WHERE idusuario = ?', [nombre_usuario, id]);
        if (results.affectedRows === 1) {
            // Si se actualizó correctamente, retornar un estado 200
            return { status: 200, message: 'El nombre de usuario fue correctamente  actualizado y ahora es público.' };
        } else {
            // Si no se actualizó correctamente (por ejemplo, si el usuario con el ID proporcionado no existe), retornar un estado 404 con un mensaje de error
            return { status: 404, message: 'El usuario con el ID proporcionado no fue encontrado.' };
        }
    } catch (error) {
        // Si se produce un error durante la ejecución de la consulta, lanzar el error para que pueda ser manejado por el código que llama a esta función
        throw error;
    }
};

// Función para obtner todos los datos de usuario
exports.getUserGeneral = async() => {
    try {
        const [results, fields] = await db.execute('SELECT * FROM usuario');
        return results;
    } catch (error) {
        throw error;
    }
}

*/