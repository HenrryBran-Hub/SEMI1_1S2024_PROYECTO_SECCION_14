import React from 'react';
import NavBar from './MyNavBar';
import '../styles/HomePage.css';
import imagen from '../img/fondo.jpeg'; // Importa la imagen

const HomePage = () => {
    return (
        <div >
            <NavBar />
            <div className='container-homepage'>
                <div>
                    <h1 className='titulo-homepage'>Wikipaper</h1>
                    <div className='container-horizontal-homepage'>
                        <div>
                            <p className='container-label-homepage'> "¡Bienvenido a Wikipaper!
                                Donde cada historia tiene su voz y cada opinión cuenta. Explora, comenta y
                                califica los artículos más fascinantes que nuestra comunidad tiene para ofrecer."
                            </p>
                        </div>
                        <div>
                            <img className='container-img-homepage' src={imagen} alt="persona escribiendo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;