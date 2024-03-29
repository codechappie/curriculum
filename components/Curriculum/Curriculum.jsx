"use client"
import React, { useState } from 'react';
import style from './curriculum.module.scss';
import { ThemeSwitch } from '@/components/theme-switch';
import AppContainer from '@/components/AppContainer';
import Icon from '@/components/Icon';
import moment from 'moment';

const Curriculum = ({
    isMobile = false,
    profileImage,
    fullName,
    occupation,
    address,
    email,
    phoneNumber,
    profileDescription,
    socialNetworks,
    academicEducation,
    skills,
    workExperiences,
    certificates }) => {

    return (
        // <AppContainer isNavbar={false} >
            <div className={`${style.curriculumPage} ${isMobile && style.isMobile}`}>
                <div className={style.curriculumPageContainer}>
                    <div className={style.personalInformation}>
                        <div className={style.mainProfile}>
                            <a href={""} download target="_blank" className={style.downloadButton} style={{ visibility: "hidden" }}>
                                <img src="/icons/download.svg" alt="" />
                            </a>
                            <div className={style.profileImage}>
                                <img src={profileImage || "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"} alt="" />
                            </div>
                            <div className={style.themeButton}>
                                <ThemeSwitch />
                            </div>
                        </div>
                        <div className={style.name}>{fullName || "Enter your name"}</div>
                        <div className={style.profession}>{occupation || "Enter your occupation"}</div>
                        <div className={style.contact}>
                            <div className={style.item}>
                                <img src="/icons/ubication.svg" alt="" />
                                <small>{address || "Enter your location"}</small>
                            </div>
                            <a href={`mailto:${email}`} className={style.item}>
                                <img src="/icons/email.svg" alt="" />
                                <small>{email || "Enter your email"}</small>
                            </a>
                            <a href={`tel:${phoneNumber}`} className={style.item}>
                                <img src="/icons/phone.svg" alt="" />
                                <small>{phoneNumber || "Enter your phone Number"}</small>
                            </a>
                        </div>
                        {(socialNetworks && socialNetworks.length) > 0 && (<div className={style.social}>
                            <h2 className={style.subTitle}>Social Networking Sites</h2>

                            <div className={style.items}>
                                {socialNetworks.map((snsItem) => (<a key={snsItem.id} href={snsItem.url}
                                    target="_blank" rel="noreferrer" className={style.item} alt={snsItem.name} >
                                    <Icon id={snsItem.iconid} />
                                    <small>{snsItem.name}</small>
                                </a>))}
                            </div>
                        </div>)}
                        <div className={style.profile}>
                            <h2 className={style.subTitle}>Profile</h2>
                            <p>
                                {profileDescription || "Enter a brief description of your profile"}
                            </p>
                        </div>
                        {/* TODO: Order by year */}
                        {(academicEducation && academicEducation.length > 0) && (<div className={style.education}>
                            <h2 className={style.subTitle}>Academic education</h2>
                            <div className={style.items}>
                                {academicEducation.map((educationItem) => (<div key={educationItem.id} className={style.item}>
                                    <div className={style.dot}></div>
                                    <div className={style.content}>
                                        <h2 className={style.title}>{educationItem.title}</h2>
                                        <small className={style.university}>
                                            {educationItem.shortDescription}
                                        </small>
                                        <small>From {moment(educationItem.startDate).format("DD MMM YYYY")} to {moment(educationItem.endDate).format("DD MMM YYYY")}</small>
                                    </div>
                                </div>))}
                            </div>
                        </div>)}
                        <div className={style.skills}>
                            <h2 className={style.subTitle}>Skills</h2>
                            <div className={style.items}>
                                {(skills && skills.length > 0 ? skills.map((skill) => (
                                    <div className={style.item} key={skill.id}>
                                        <div className={style.dot}></div>
                                        <small>{skill.name}</small>
                                    </div>
                                )) : (
                                    <div className={style.item}>
                                        <div className={style.dot}></div>
                                        <small>Enter your skills</small>
                                    </div>))}
                            </div>
                        </div>
                    </div>

                    <div className={style.moreDetails}>
                        <div className={style.experience}>
                            <h2 className={style.subTitle}>Work experiences</h2>

                            <div className={style.items}>
                                {(workExperiences && workExperiences.length > 0) ? workExperiences.map((item) => (
                                    <div className={style.item} key={item.id}>
                                        <div className={style.dot}></div>
                                        <div className={style.content}>
                                            <h2 className={style.title}>{item.title}</h2>
                                            <h3 className={style.company}>{item.company}</h3>
                                            <div className={style.date}>
                                                From {moment(item.startDate).format("DD MMM YYYY")} to {moment(item.endDate).format("DD MMM YYYY")}
                                            </div>
                                            <p className={style.description}>
                                                {item.shortDescription}
                                            </p>
                                        </div>
                                    </div>

                                )) : <h3>Enter work experiences</h3>}
                            </div>
                        </div>
                        <div className={style.certificates}>
                            <h2 className={style.subTitle}>Certificados</h2>
                            <div className={style.items}>
                                {(certificates && certificates.length > 0) && certificates.map((certificate) => (
                                    <div className={style.item} key={certificate.id}>
                                        <h2 className={style.title}>
                                            {certificate.title} ({moment(certificate.date).format("DD MMM YYYY")})
                                        </h2>
                                        <p>{certificate.description}</p>
                                    </div>
                                ))}
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
        // </AppContainer>
    )
}

export default Curriculum