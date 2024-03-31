"use client"
import React, { useState } from 'react';
import style from './curriculum.module.scss';
import { ThemeSwitch } from '@/components/theme-switch';
import AppContainer from '@/components/AppContainer';
import Icon from '@/components/Icon';
import moment from 'moment';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';

const Curriculum = ({
    isLoading = false,
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
    certificates,
    projects }) => {

    return (
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
                    <div className={style.name}>{
                        fullName ? fullName : <Skeleton className="rounded-lg w-48 h-6">
                        </Skeleton>
                    }</div>
                    <div className={style.profession}>
                        {occupation ? occupation : <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>}
                    </div>

                    {isLoading && <div className={style.contact}>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                    </div>}
                    {(address || email || phoneNumber) && <div className={style.contact}>
                        {address && <div className={style.item}>
                            <img src="/icons/ubication.svg" alt="" />
                            <small>{address}</small>
                        </div>}
                        {email && <a href={`mailto:${email}`} className={style.item}>
                            <img src="/icons/email.svg" alt="" />
                            <small>{email}</small>
                        </a>}
                        {phoneNumber && <a href={`tel:${phoneNumber}`} className={style.item}>
                            <img src="/icons/phone.svg" alt="" />
                            <small>{phoneNumber}</small>
                        </a>}
                    </div>}
                    {(socialNetworks && socialNetworks.length) > 0 && (<div className={style.social}>
                        <h2 className={style.subTitle}>Social Networking Sites</h2>

                        {isLoading && (<div className={style.items}>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                        </div>)}

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
                        {profileDescription ? <p>profileDescription </p> : (<div>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                            <Skeleton className="rounded-lg w-48 h-6 mt-1"></Skeleton>
                        </div>)}
                    </div>
                    {/* TODO: Order by year */}
                    {(academicEducation && academicEducation.length > 0) ? (<div className={style.education}>
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
                    </div>) : (<div className={style.education}>
                        <h2 className={style.subTitle}>Academic education</h2>
                        <div className={style.items}>
                            {[1, 2].map((educationItem) => (<div key={educationItem} className={style.item}>
                                <div className={style.dot}></div>
                                <div className={style.content}>
                                    <h2 className={style.title}>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </h2>
                                    <small className={style.university}>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </small>
                                    <small> <Skeleton className="rounded-lg w-48 h-6 mt-1"></Skeleton></small>
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
                            )) : [1, 2, 3, 4, 5, 6].map((index) => (
                                <div className={style.item} key={index}>
                                    <div className={style.dot}></div>
                                    <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                </div>
                            )))}
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
                            )) : [1, 2].map((item) => (
                                <div className={style.item} key={item}>
                                    <div className={style.dot}></div>
                                    <div className={style.content}>
                                        <h2 className={style.title}>
                                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                        </h2>
                                        <h3 className={style.company}>
                                            <Skeleton className="rounded-lg w-8/12 h-6 mt-1"></Skeleton>
                                        </h3>
                                        <div className={style.date}>
                                            <Skeleton className="rounded-lg w-1/3 h-6 mt-1"></Skeleton>
                                        </div>
                                        <div>
                                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                            <Skeleton className="rounded-lg w-10/12 h-6 mt-1"></Skeleton>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className={style.certificates}>
                        <h2 className={style.subTitle}>Certificados</h2>
                        <div className={style.items}>
                            {(certificates && certificates.length > 0) ? certificates.map((certificate) => (
                                <div className={style.item} key={certificate.id}>
                                    <h2 className={style.title}>
                                        {certificate.title} ({moment(certificate.date).format("DD MMM YYYY")})
                                    </h2>
                                    <p>{certificate.description}</p>
                                </div>
                            )) : [1].map((certificate) => (
                                <div className={style.item} key={certificate}>
                                    <h2 className={style.title}>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </h2>
                                    <div>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                        <Skeleton className="rounded-lg w-8/12 h-6 mt-1"></Skeleton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.projects}>
                        <h2 className={style.subTitle}>Projects</h2>
                        <div className={style.items}>
                            {(projects && projects.length > 0) ? projects.map((project) => (
                                <Link href={project.externalUrl} className={style.item}>
                                    <div className={style.image}>
                                        <img src={project.imageUrl} alt="" />
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>
                                        {project.shortDescription}
                                    </p>
                                </Link>)) : [1, 2].map((project) => (
                                    <div className={style.item} key={project}>
                                        <div className={style.image}>
                                            <Skeleton className="rounded-lg aspect-video mt-1"></Skeleton>
                                        </div>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Curriculum