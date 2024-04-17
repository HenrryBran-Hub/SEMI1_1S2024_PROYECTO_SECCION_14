import React, { useState } from 'react';
import NavBar from './MyNavBar2';
import '../styles/CreateDocument.css';

const CreateDocument = () => {

    const [imagen, setImagen] = useState(null);
    const [imagenObject, setImagenObject] = useState(null);
    const [showExtraer, setExtraer] = useState(false);
    const [imagenextrare, setImagenExtraer] = useState(null);

    const handleImagenChange = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagenExtraer(URL.createObjectURL(imagenSeleccionada));

        }
    };

    const handleImagenChangeupdate = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setImagenObject(event.target.files[0]);
        if (imagenSeleccionada) {
            setImagen(URL.createObjectURL(imagenSeleccionada));
        }
    };

    const startExtraer = () => {
        setExtraer(true);
    };

    const stopExtraer = () => {
        setExtraer(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!imagenObject) {
            alert('Por favor, seleccione una imagen');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; // Get base64 string
            sendDataToServer(base64String);
        };
        reader.readAsDataURL(imagenObject);
    };

    const sendDataToServer = async (base64String) => {

        const formData = new FormData();
        formData.append('base64Image', base64String);

        try {
            const response = await fetch('http://localhost:5000/signup/descriptiongeneral', {
                method: 'POST',
                body: formData,
            });
            if (response.status === 200) {
                // Redirigir a la página de inicio

                const data = await response.json();
                alert("Escaneado con exito");

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
                            <input type="text" name="title" className='inputsignupCreateDocument'></input>
                        </div>
                        <div>
                            <label className='labelCreateDocument'>Descripción</label>
                        </div>
                        <div>
                            <textarea type="text" name="description" rows="5" cols="80" className='inputsignupCreateDocument'></textarea>
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
                        <div className='contornoCreateDocument-Traductor'>
                            <div>
                                <label className='labelCreateDocument'>Traductor</label>
                            </div>
                            <div>
                                <select id="combo" name="combo" lassName='labelCreateDocument' margin-buttom="10px">
                                    <option value="Español">Español</option>
                                    <option value="Ingles">Ingles</option>
                                    <option value="Frances">Frances</option>
                                    <option value="Aleman">Aleman</option>
                                </select>
                            </div>
                            <div>
                                <textarea type="text" name="description" rows="5" cols="80" className='inputsignupCreateDocument'></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='contornoCreateDocument-Boton '>
                            <div className="form-group">
                                <button type="button" className="butonsignupCreateDocument" onClick={startExtraer}>Guardar(Privado)</button>
                            </div>
                            <div className="form-group">
                                <button type="button" className="butonsignupCreateDocument" onClick={startExtraer}>Publicar</button>
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
                    <form className="contornoCreateDocument" onSubmit={handleSubmit}>
                        <h1 className='tituloCreateDocument'>Escaneando información</h1>
                        <div className="container-imgl-CreateDocument">
                            <div className='labelsignup'>
                                <label htmlFor="imagen">Imagen</label>
                            </div>
                            <input
                                type="file"
                                id="imagenextraer"
                                accept="image/*"
                                onChange={handleImagenChange}
                                className='labelsignup'
                            />
                            {imagenextrare && (
                                <img src={imagenextrare} alt="Imagen seleccionada" className="container-imgS" />
                            )}
                        </div>
                        <div >
                            <label className="labelCreateDocument">Descripcion: </label>
                        </div>
                        <div className="form-group">
                            <button type="button" className="butonsignupCreateDocument" onClick={handleSubmit}>Escanear</button>
                        </div>
                        <div className="form-group">
                            <button type="button" className="butonsignupCreateDocument" onClick={stopExtraer}>Cancelar</button>
                        </div>
                    </form>
                    <div className='contornoCreateDocument'>
                        <div >
                            <label className="labelCreateDocument">Descripcion:</label>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateDocument;
