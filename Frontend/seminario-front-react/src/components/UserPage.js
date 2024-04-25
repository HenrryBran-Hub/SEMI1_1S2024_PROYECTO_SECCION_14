import React, { useState, useEffect } from 'react';
import NavBar from './MyNavBar2';
import '../styles/UserPage.css';

const UserPage = ({ userData }) => {
    // Verificar si userData está definido y obtener los valores correspondientes
    const usuario = userData ? userData.nombreusuario : '';
    const nombreCompleto = userData ? userData.nombrecompleto : '';
    const imagen = userData ? userData.fotoperfil : '';
    const [documents, setDocuments] = useState(null);

    const Actualizar = ()  => {
        fetch(`http://localhost:5000/documents/adocuments`)
            .then(response => response.json())
            .then(data => {
              setDocuments(data)
            }).catch(err => { console.log(err) })
    
      };

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
                        <button onClick={Actualizar}>ACTUALIZAR</button>
                        {
                            documents!== null && (
                                <div  >
                            {
                                <ul className='ul-vertical'>
                                {documents.map((doc) => (
                                    <li>{doc.titulo}</li>
                                ))}
                                </ul>
                            }
                        </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
