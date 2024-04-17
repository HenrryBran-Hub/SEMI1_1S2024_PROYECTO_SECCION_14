import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../styles/MyNavBar2.css';

const MyNavbar2 = () => {

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.href = "/";
  };

  return (
      <div className="navbar2">
        <NavLink to="/userpage" className="nav-button2">Inicio</NavLink>
        <NavLink to="/editperfil" className="nav-button2">Editar Perfil</NavLink>
        <NavLink to="/createdocument" className="nav-button2">Creacion</NavLink>  
        <NavLink to="/editdocument" className="nav-button2">Edicion</NavLink>
        <NavLink to="/deldocument" className="nav-button2">Eliminacion</NavLink>        
        <NavLink to="/" className="nav-button2" onClick={handleLogout}>Cerrar sesión</NavLink>
      </div>
  );
};

export default MyNavbar2;
