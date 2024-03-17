"use client"
import React, { useState } from 'react';
import style from './page.module.scss';

const Page = () => {
    const [theme, setTheme] = useState('dark');

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
        <div className={style.curriculumPage}>
            <div className={style.curriculumPageContainer}>
                <div className={style.personalInformation}>
                    <div className={style.mainProfile}>
                        <a href={""} download target="_blank" className={style.downloadButton} style={{ visibility: "hidden" }}>
                            <img src="/icons/download.svg" alt="" />
                        </a>
                        <div className={style.profileImage}>
                            <img src="/images/user-image.jpg" alt="" />
                        </div>
                        <div className={style.themeButton}
                            onClick={() => changeTheme()}
                        >
                            <img src="/icons/moon.svg" alt="" />
                        </div>
                    </div>
                    <div className={style.name}>Michael Gary Scott</div>
                    <div className={style.profession}>Gerente regional</div>
                    <div className={style.contact}>
                        <div className={style.item}>
                            <img src="/icons/ubication.svg" alt="" />
                            <small>Scranton, Pensilvania</small>
                        </div>
                        <a href="mailto:michaelscarn@gmail.com" className={style.item}>
                            <img src="/icons/email.svg" alt="" />
                            <small>michaelscarn@gmail.com</small>
                        </a>
                        <a href="tel:6102970093" className={style.item}>
                            <img src="/icons/phone.svg" alt="" />
                            <small>610 2970 093</small>
                        </a>
                    </div>
                    <div className={style.social}>
                        <h2 className={style.subTitle}>Redes sociales</h2>
                        <a href="https://github.com/codechappie" target="_blank" rel="noreferrer" className={style.item}>
                            <img src="/icons/github.svg" alt="" />
                            <small>@codechappie</small>
                        </a>
                        <a href="https://www.linkedin.com/company/codechappie" target="_blank" rel="noreferrer" className={style.item}>
                            <img src="/icons/linkedin.svg" alt="" />
                            <small>@codechappie</small>
                        </a>
                        <div className={style.item}>
                            <img src="/icons/instagram.svg" alt="" />
                            <small>@codechappie</small>
                        </div>
                    </div>
                    <div className={style.profile}>
                        <h2 className={style.subTitle}>Perfil</h2>
                        <p>
                            Ingeniero de Sistemas, pero me denomino desarrollador web, me encuentro trabajando en el área de desarrollo web (frontend) por más de 4 años.
                            Me encanta resolver problemas, trabajar en equipo, investigar
                            y ofrecer productos que satisfagan las necesidades de los usuarios finales.
                        </p>
                    </div>
                    <div className={style.education}>
                        <h2 className={style.subTitle}>Educación</h2>
                        <div className={style.items}>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>Ingeniería de Sistemas</h2>
                                    <small className={style.university}>
                                        Universidad
                                    </small>
                                    <small>2015 - 2020</small>
                                </div>
                            </div>

                            <div className={style.item}>
                                <span className={style.dot}></span>
                                <div className={style.content}>
                                    <h2 className={style.title}>Ingles Avanzado</h2>
                                    <small className={style.university}>
                                        Asociación Cultural Británica
                                    </small>
                                    <small>2015 - 2020</small>
                                </div>
                            </div>
                            <div className={style.item}>
                                <span className={style.dot}></span>
                                <div className={style.content}>
                                    <h2 className={style.title}>
                                        Introducción al Desarrollo Web: HTML y CSS
                                    </h2>
                                    <small className={style.university}>
                                        Curso Online: Universidad de Alicante y Google Activate
                                    </small>
                                    <small>2015</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.skills}>
                        <h2 className={style.subTitle}>Habilidades</h2>
                        <div className={style.items}>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Next.js</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>HTML5</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Lit-HTML</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>CSS3</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>JavaScript</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>TypeScript</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>React</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Git y GitHub</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Bootstrap</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>MongoDB</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Diseño responsive</small>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <small>Backend básico</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.moreDetails}>
                    <div className={style.experience}>
                        <h2 className={style.subTitle}>Experiencia laboral</h2>
                        <div className={style.items}>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>Center Developer</h2>
                                    <h3 className={style.company}>NTT DATA Europe & LATAM</h3>
                                    <div className={style.date}>
                                        Desde Agosto del 2021 hasta la actualidad
                                    </div>
                                    <p className={style.description}>
                                        Junto a un equipo de tecnología conformado por personas de Perú y España,
                                        Nos encontramos finalizando un proyecto de migración del aplicativo
                                        web de la Red Eléctrica de España (REE).
                                    </p>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>Programador web</h2>
                                    <h3 className={style.company}>ARCA DE PAPEL E.I.R.L.</h3>
                                    <div className={style.date}>
                                        Desde Noviembre del 2019 hasta el Julio del 2021
                                    </div>
                                    <p className={style.description}>
                                        Encargado de diseñar y desarrollar interfaces responsivas.
                                        Junto al equipo de sistemas se diseñó e implementó una
                                        plataforma educativa con diferentes módulos que complementan
                                        el aprendizaje de inicial, primaria y secundaria.
                                    </p>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>Programador practicante</h2>
                                    <h3 className={style.company}>GRUPO CÓMPINA S.A.C.</h3>
                                    <div className={style.date}>
                                        Desde Septiembre hasta Noviembre del 2019
                                    </div>
                                    <p className={style.description}>
                                        En este cargo diseñé y desarrollé módulos para una
                                        herramienta web administrativa de la empresa, además de
                                        diseñar una página web para mostrar productos y hacer
                                        cotizaciones.
                                    </p>
                                </div>
                            </div>
                            <div className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>Desarrollador web</h2>
                                    <h3 className={style.company}>DESARROLLADOR FREELANCE</h3>
                                    <div className={style.date}>
                                        Desde Noviembre del 2018 hasta Noviembre del 2019
                                    </div>
                                    <p className={style.description}>
                                        Ofrecía soluciones web a empresas medianas y pequeñas. Desde
                                        páginas web informativas hasta asesoria de temas
                                        relacionados con páginas o plataformas web.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.certificates}>
                        <h2 className={style.subTitle}>Certificados</h2>
                        <div className={style.items}>
                            <div className={style.item}>
                                <h2 className={style.title}>
                                    III Congreso internacional de Arquitectura e Ingenierias:
                                    Automatización, seguridad y sostenibilidad (2018)
                                </h2>
                                <p>
                                    Nuestro país necesita actualizar información de un desarrollo
                                    eficiente en el ámbito de la Ingeniería y Arquitectura para un
                                    crecimiento sostenible.
                                </p>
                            </div>
                            <div className={style.item}>
                                <h2 className={style.title}>
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
                    <div className={style.interests}>
                        <h2 className={style.subTitle}>Intereses</h2>
                        <div className={style.items}>
                            <div className={style.item}>
                                <img src="/icons/tech.svg" alt="" />
                                <small>Tecnología</small>
                            </div>
                            <div className={style.item}>
                                <img src="/icons/music.svg" alt="" />
                                <small>Música</small>
                            </div>
                            <div className={style.item}>
                                <img src="/icons/read.svg" alt="" />
                                <small>Leer</small>
                            </div>
                            <div className={style.item}>
                                <img src="/icons/travel.svg" alt="" />
                                <small>Viajar</small>
                            </div>
                            <div className={style.item}>
                                <img src="/icons/movies.svg" alt="" />
                                <small>Ver películas</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page