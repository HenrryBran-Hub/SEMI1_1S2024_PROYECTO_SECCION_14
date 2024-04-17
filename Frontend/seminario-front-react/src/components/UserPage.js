import React, { useState } from 'react';
import NavBar from './MyNavBar2';
import '../styles/UserPage.css';

const UserPage = ({ userData }) => {
    // Verificar si userData está definido y obtener los valores correspondientes
    const usuario = userData ? userData.nombre_usuario : '';
    const nombreCompleto = userData ? userData.nombre_completo : '';
    const imagen = userData ? userData.foto_perfil : '';

    return (
        <div>
            <NavBar />
            <div>
                <div className="containerUserPage">
                    <div className="contornoUserPage">
                        <h1 className='tituloUserPage'>Bienvenido</h1>
                        <div className="container-imgl-userpage">
                            <img className='image-container-userpage' src={imagen} alt="Descripción de la imagen" />
                        </div>
                        <div >
                            <label className="labeluserpage">Usuario: </label>
                            <label className="labeluserpage">{usuario}</label>
                        </div>
                        <div >
                            <label className="labeluserpage">Nombre completo:</label>
                            <label className="labeluserpage">{nombreCompleto}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="containerUserPage">
                    <div >
                        <h1 className='tituloUserPage'>Articulos Publicados por los usuarios</h1>
                        <div >

                        </div>
                        <div >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
