import React, { createRef, useRef, useState } from "react";
import DownloadIcon from "./../../assets/icons/download.svg";
import MoonIcon from "./../../assets/icons/moon.svg";
import UbicationIcon from "./../../assets/icons/ubication.svg";
import EmailIcon from "./../../assets/icons/email.svg";
import PhoneIcon from "./../../assets/icons/phone.svg";

import InstagramIcon from "./../../assets/icons/instagram.svg";
import GithubIcon from "./../../assets/icons/github.svg";
import LinkedinIcon from "./../../assets/icons/linkedin.svg";

import TechIcon from "./../../assets/icons/tech.svg";
import ReadIcon from "./../../assets/icons/read.svg";
import MoviesIcon from "./../../assets/icons/movies.svg";
import TravelIcon from "./../../assets/icons/travel.svg";
import MusicIcon from "./../../assets/icons/music.svg";
import userImage from "../../assets/images/user-image.jpg";
import pdfAngel from '../../assets/pdfs/angel-canales-alcalde-cv.pdf'

import ReactToPdf from "react-to-pdf";

const CurriculumPage = () => {
  const [theme, setTheme] = useState('dark');
  // const ref = React.createRef();
  // const options = {
  //   orientation: "p",
  //   unit: "px",
  //   format: 'a4',
  //   floatPrecision: 800,
  //   putOnlyUsedFonts:true,
  //   compress: true,
  //   userUnit: 100.0
  // };

  const changeTheme = () => {
    const bodyElement = document.querySelector("#body");
    if (theme === 'dark') {
      bodyElement.classList.remove('dark')
      bodyElement.classList.add('light')
      setTheme('light');
    } else {
      bodyElement.classList.remove('light')
      bodyElement.classList.add('dark')
      setTheme('dark');
    }
    console.log();
  };

  return (
    <div className="curriculum-page">
      <div className="curriculum-page-container">
        <div className="personal-information">
          <div className="main-profile">
            {/* <ReactToPdf
              targetRef={ref}
              filename="div-blue.pdf"
              options={options}
              x={0}
              y={0}
              scale={1}
            >
              {({ toPdf }) => }
            </ReactToPdf> */}
            <a href={pdfAngel} download target="_blank" className="download-button">
              <img src={DownloadIcon} alt="" />
            </a>
            <div className="profile-image">
              <img src={userImage} alt="" />
            </div>
            <div className="theme-button" onClick={changeTheme}>
              <img src={MoonIcon} alt="" />
            </div>
          </div>
          <div className="name">Angel Canales Alcalde</div>
          <div className="profession">Desarrollador Web</div>
          <div className="contact">
            <div className="item">
              <img src={UbicationIcon} alt="" />
              <small>San Juan de Lurigancho, Lima, Perú</small>
            </div>
            <div className="item">
              <img src={EmailIcon} alt="" />
              <small>davidproyecto01@gmail.com</small>
            </div>
            <div className="item">
              <img src={PhoneIcon} alt="" />
              <small>+51 986 970 093</small>
            </div>
          </div>
          <div className="social">
            <h2 className="sub-title">Redes sociales</h2>
            <div className="item">
              <img src={GithubIcon} alt="" />
              <small>@codechappie</small>
            </div>
            <div className="item">
              <img src={LinkedinIcon} alt="" />
              <small>@codechappie</small>
            </div>
            <div className="item">
              <img src={InstagramIcon} alt="" />
              <small>@codechappie</small>
            </div>
          </div>
          <div className="profile">
            <h2 className="sub-title">Perfil</h2>
            <p>
              Soy un desarrollador web con más de 2 años de experiencia en
              front-end. Me encanta resolver problemas, trabajar en equipo,
              investigar y ofrecer productos que satisfagan las necesidades de
              los usuarios finales.
            </p>
          </div>
          <div className="education">
            <h2 className="sub-title">Educación</h2>
            <div className="items">
              <div className="item">
                <div className="dot"></div>
                <div className="content">
                  <h2 className="title">Ingeniería de Sistemas</h2>
                  <small className="university">
                    Universidad Cesar Vallejo
                  </small>
                  <small>2015 - 2020</small>
                </div>
              </div>

              <div className="item">
                <span className="dot"></span>
                <div className="content">
                  <h2 className="title">Ingles Avanzado</h2>
                  <small className="university">
                    Asociación Cultural Peruano Británica
                  </small>
                  <small>2015 - 2020</small>
                </div>
              </div>
              <div className="item">
                <span className="dot"></span>
                <div className="content">
                  <h2 className="title">
                    Introducción al Desarrollo Web: HTML y CSS
                  </h2>
                  <small className="university">
                    Curso Online: Universidad de Alicante y Google Activate
                  </small>
                  <small>2015</small>
                </div>
              </div>
            </div>
          </div>
          <div className="skills">
            <h2 className="sub-title">Habilidades</h2>
            <div className="items">
              <div className="item">
                <div className="dot"></div>
                <small>HTML5</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>CSS3</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>JavaScript</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>TypeScript</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>React</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>Git y GitHub</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>Bootstrap</small>
              </div>
              <div className="item">
                <div className="dot"></div>
                <small>SQL</small>
              </div>
            </div>
          </div>
        </div>

        <div className="more-details">
          <div className="experience">
            <h2 className="sub-title">Experiencia</h2>
            <div className="items">
              <div className="item">
                <div className="dot"></div>
                <div className="content">
                  <h2 className="title">Programador web</h2>
                  <h3 className="company">ARCA DE PAPEL E.I.R.L.</h3>
                  <div className="date">
                    Desde Noviembre del 2019 hasta la actualidad
                  </div>
                  <p className="description">
                    Encargado de diseñar y desarrollar interfaces responsivas.
                    Junto al equipo de sistemas se diseñó e implementó una
                    plataforma educativa con diferentes módulos que complementan
                    el aprendizaje de inicial, primaria y secundaria.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="dot"></div>
                <div className="content">
                  <h2 className="title">Programador practicante</h2>
                  <h3 className="company">GRUPO CÓMPINA S.A.C.</h3>
                  <div className="date">
                    Desde Septiembre hasta Noviembre del 2019
                  </div>
                  <p className="description">
                    En este cargo diseñé y desarrollé módulos para una
                    herramienta web administrativa de la empresa, además de
                    diseñar una página web para mostrar productos y hacer
                    cotizaciones.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="dot"></div>
                <div className="content">
                  <h2 className="title">Desarrollador web</h2>
                  <h3 className="company">DESARROLLADOR FREELANCE</h3>
                  <div className="date">
                    Desde Noviembre del 2018 hasta Noviembre del 2019
                  </div>
                  <p className="description">
                    Ofrecía soluciones web a empresas medianas y pequeñas. Desde
                    páginas web informativas hasta asesoria de temas
                    relacionados con páginas o plataformas web.
                  </p>
                </div>
              </div>
              <div className="item">
                <div className="dot"></div>
                <div className="content">
                  <h2 className="title">
                    Supervisor y soporte técnico de productos
                  </h2>
                  <h3 className="company">INBRANDING & INCHANNEL</h3>
                  <div className="date">
                    Desde Abril del 2018 hasta Mayo del 2019
                  </div>
                  <p className="description">
                    Era el encargado de supervisar el correcto funcionamiento,
                    cargar contenido multimedia, y darle mantenimiento a los
                    equipos publicitarios ubicados en el Jockey Plaza. Para que
                    se encuentren en un estado óptimo.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="certificates">
            <h2 className="sub-title">Certificados</h2>
            <div className="items">
              <div className="item">
                <h2 className="title">
                  III Congreso internacional de Arquitectura e Ingenierias:
                  Automatización, seguridad y sostenibilidad (2018)
                </h2>
                <p>
                  Nuestro país necesita actualizar información de un desarrollo
                  eficiente en el ámbito de la Ingeniería y Arquitectura para un
                  crecimiento sostenible.
                </p>
              </div>
              <div className="item">
                <h2 className="title">
                  Seminario de actualización profesional innovación (2015)
                </h2>
                <p>
                  Fomentar la investigación y difundir los conocimientos a
                  través de los avances de la ciencia y de la tecnología
                  relacionados con el desarrollo y la competitividad de la
                  Ingeniería en el Perú.
                </p>
              </div>
            </div>
          </div>
          <div className="interests">
            <h2 className="sub-title">Intereses</h2>
            <div className="items">
              <div className="item">
                <img src={TechIcon} alt="" />
                <small>Tecnología</small>
              </div>
              <div className="item">
                <img src={MusicIcon} alt="" />
                <small>Música</small>
              </div>
              <div className="item">
                <img src={ReadIcon} alt="" />
                <small>Leer</small>
              </div>
              <div className="item">
                <img src={TravelIcon} alt="" />
                <small>Viajar</small>
              </div>
              <div className="item">
                <img src={MoviesIcon} alt="" />
                <small>Ver películas</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
