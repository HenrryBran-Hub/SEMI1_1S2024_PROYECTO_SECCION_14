CREATE DATABASE ArtHist;

USE ArtHist;

CREATE TABLE usuario (
    idusuario      INT AUTO_INCREMENT PRIMARY KEY,
    nombreusuario  VARCHAR(500) NOT NULL,
    nombrecompleto VARCHAR(500) NOT NULL,
    contrasena     VARCHAR(500) NOT NULL,
    fotoperfil     VARCHAR(500) NOT NULL
);


CREATE TABLE documento (
    iddocumento       INT AUTO_INCREMENT PRIMARY KEY,
    titulo            VARCHAR(500) NOT NULL,
    descripcion       VARCHAR(5000) NOT NULL,
    urlfoto           VARCHAR(500) NOT NULL,
    fecha             DATETIME NOT NULL,
    etiqueta1         VARCHAR(100) NOT NULL,
    etiqueta2         VARCHAR(100) NOT NULL,
    etiqueta3         VARCHAR(100) NOT NULL,
    estado            INT NOT NULL,
    idusuario 	      INT NOT NULL,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE comentario (
    idcomentario          INT AUTO_INCREMENT PRIMARY KEY,
    descripcion           VARCHAR(500) NOT NULL,
    calificacion          INT NOT NULL,
    iddocumento 	  INT NOT NULL,
    FOREIGN KEY (iddocumento) REFERENCES documento(iddocumento) ON DELETE CASCADE ON UPDATE CASCADE
);

select *from usuario;
select *from documento;

drop table documento;
drop table comentario;