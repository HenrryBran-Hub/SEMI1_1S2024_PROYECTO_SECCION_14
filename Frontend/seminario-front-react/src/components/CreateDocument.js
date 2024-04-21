import React, { useState } from 'react';
import NavBar from './MyNavBar2';
import '../styles/CreateDocument.css';

const CreateDocument = () => {

    const [imagen, setImagen] = useState(null);
    const [imagenObject, setImagenObject] = useState(null);
    const [imagenObject2, setImagenObject2] = useState(null);
    const [showExtraer, setExtraer] = useState(false);
    const [imagenextrare, setImagenExtraer] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState(0); // 0 para privado, 1 para público
    const [extraccion, setExtraccion] = useState(""); 

    const handleImagenChange = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagen(URL.createObjectURL(imagenSeleccionada));
        }
    };

    const handleImagenChangeupdate = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject2(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagenExtraer(URL.createObjectURL(imagenSeleccionada));
        }
    };

    const startExtraer = () => {
        setExtraer(true);
    };

    const stopExtraer = () => {
        setExtraer(false);
    };

    const handleSubmit = async () => {
        if (!imagenObject) {
            alert('Por favor, seleccione una imagen');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Obtener cadena base64
            sendDataToServer(base64String);
        };
        reader.readAsDataURL(imagenObject);
    };

    const sendDataToServer = async (base64String) => {

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('estado', estado); // Enviar el estado seleccionado
        formData.append('foto_perfil', imagenObject);
        const Token = localStorage.getItem("token")
        formData.append('token', Token);
        formData.append('imagen_base64', base64String);

        try {
            const response = await fetch('http://localhost:5000/documents/savedocument', {
                method: 'POST',
                body: formData,
            });
            if (response.status === 200) {
                // Redirigir a la página de inicio
                const data = await response.json();
                alert("Documento Registrado con exito");
                window.location.reload();
            } else {
                // Recargar la página
                alert("Lo siento no se pudo registrar el documento.");
                window.location.reload();
            }
        } catch (error) {
            alert("Error en la solicitud");
            console.error('Error en la solicitud:', error);
            window.location.reload();
        }
    };

    const handleSubmitPrivado = async () => {
        setEstado(0); // Establecer el estado como privado
        await handleSubmit(); // Llamar a la función handleSubmit para enviar los datos al servidor
    };

    const handleSubmitPublico = async () => {
        setEstado(1); // Establecer el estado como público
        await handleSubmit(); // Llamar a la función handleSubmit para enviar los datos al servidor
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();

        if (!imagenObject2) {
            alert('Por favor, seleccione una imagen');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Get base64 string
            sendDataToServer2(base64String);
        };
        reader.readAsDataURL(imagenObject2);
    };

    const sendDataToServer2 = async (base64String) => {

        const formData = new FormData();
        formData.append('base64Image', base64String);
        console.log("SALIDA DE LA IMAGEN");
        console.log(base64String);

        try {
            const response = await fetch('http://localhost:5000/documents/extraer', {
                method: 'POST',
                body: formData,
            });
            if (response.status === 200) {
                // Redirigir a la página de inicio

                const data = await response.json();
                setExtraccion(data.message);
                alert("Se ha extraido la informacion correctamente");

            } else {
                // Recargar la página
                alert("Lo siento no se puedo escanear la imagen.");
                window.location.reload();
            }
        } catch (error) {
            alert("Error en la solicitud");
            console.error('Error en la solicitud:', error);
            window.location.reload();
        }

    };

    return (
        <div>
            <NavBar />

            <div>
                <h1 className='tituloCreateDocument'>Creación de Articulos e historias</h1>
            </div>
            {!showExtraer && (
                <div>
                    <div className='contornoCreateDocument-Principal'>
                        <div>
                            <label className='labelCreateDocument'>Titulo</label>
                        </div>
                        <div>
                            <input type="text" name="title" className='inputsignupCreateDocument' onChange={(e) => setTitulo(e.target.value)} />
                        </div>
                        <div>
                            <label className='labelCreateDocument'>Descripción</label>
                        </div>
                        <div>
                            <textarea type="text" name="description" rows="5" cols="80" className='inputsignupCreateDocument' onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div className='contornoCreateDocument-Imagen '>
                        <div className="contornoeditperfildataimage">
                            <div>
                                <label className="labelsignupedipperfil">Imagen</label>
                            </div>
                            <input
                                type="file"
                                className="labelsignupedipperfil"
                                id="imagen"
                                accept="image/*"
                                onChange={handleImagenChange}
                            />
                            {imagen && (
                                <img src={imagen} alt="Imagen seleccionada" className="container-imgeditperfil" />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='contornoCreateDocument-Boton '>
                            <div className="form-group">
                                <button type="button" className="butonsignupCreateDocument" onClick={handleSubmitPrivado}>Guardar(Privado)</button>
                            </div>
                            <div className="form-group">
                                <button type="button" className="butonsignupCreateDocument" onClick={handleSubmitPublico}>Publicar</button>
                            </div>
                            <div className="form-group">
                                <button type="button" className="butonsignupCreateDocument" onClick={startExtraer}>Extraer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showExtraer && (
                <div className="containerCreateDocument">
                    <form className="contornoCreateDocument" onSubmit={handleSubmit2}>
                        <h1 className='tituloCreateDocument'>Escaneando información</h1>
                        <div className="container-imgl-CreateDocument">
                            <div className='labelsignup'>
                                <label htmlFor="imagen">Imagen</label>
                            </div>
                            <input
                                type="file"
                                id="imagenextraer"
                                accept="image/*"
                                onChange={handleImagenChangeupdate}
                                className='labelsignup'
                            />
                            {imagenextrare && (
                                <img src={imagenextrare} alt="Imagen seleccionada" className="container-imgS" />
                            )}
                        </div>
                        <div className="form-group">
                            <button type="button" className="butonsignupCreateDocument" onClick={handleSubmit2}>Escanear</button>
                        </div>
                        <div className="form-group">
                            <button type="button" className="butonsignupCreateDocument" onClick={stopExtraer}>Cancelar</button>
                        </div>
                    </form>
                    <div className='contornoCreateDocument-Descripcion'>
                        <div >
                            <label className="labelCreateDocument">{extraccion}</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateDocument;
