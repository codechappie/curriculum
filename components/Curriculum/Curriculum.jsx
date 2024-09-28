"use client"
import React, { useState } from 'react';
import style from './curriculum.module.scss';
import sunnyTheme from './sunny.module.scss';
import { ThemeSwitch } from '@/components/theme-switch';
import AppContainer from '@/components/AppContainer';
import Icon from '@/components/Icon';
import moment from 'moment';
import { Skeleton, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import Head from 'next/head';
import { siteConfig } from '@/config/site';

const Curriculum = (state) => {
    switch (state.theme) {
        case "basic":
            return <CurriculumBasicTheme {...state} />
        case "sunny":
            return <CurriculumSunnyTheme {...state} />
        default:
            return <Spinner className='spinner' />
    }

}

export default Curriculum;

const CurriculumSunnyTheme = ({
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
    projects,
    displaySections, theme }) => {


    return (
        <div className={`${sunnyTheme.curriculumPage} ${sunnyTheme[theme]} ${isMobile && sunnyTheme.isMobile}`}>
            <div className={sunnyTheme.curriculumPageContainer}>
                <div className={sunnyTheme.mainPhoto}>
                    <>
                        {(skills && skills.length >= 3) && skills.map((skill, index) => index <= 2 && (<span key={index}>{skill.name}</span>))}
                    </>

                    {profileImage !== "" ? <img src={profileImage} alt="" /> : ""}
                </div>

                <div className={sunnyTheme.simpleDetails}>
                    <div className={sunnyTheme.circles}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={sunnyTheme.details}>
                        <span className={sunnyTheme.hand}>👋</span>
                        {occupation ? <h3>{occupation}</h3> : <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>}
                        <div className={sunnyTheme.name}>{
                            fullName ? fullName : <Skeleton className="rounded-lg w-48 h-6">
                            </Skeleton>
                        }</div>
                    </div>
                </div>


                <div className={sunnyTheme.moreDetails}>
                    <div className={sunnyTheme.list}>
                        <h2 className={sunnyTheme.subTitle}>Skills</h2>
                        <ul className={sunnyTheme.items}>
                            {(skills && skills.length > 0 ? skills.map((skill) => (
                                <li className={sunnyTheme.item} key={skill.id}>
                                    <div className={sunnyTheme.dot}></div>
                                    <small>{skill.name}</small>
                                </li>
                            )) : [1, 2, 3, 4, 5, 6].map((index) => (
                                <li className={sunnyTheme.item} key={index}>
                                    <div className={sunnyTheme.dot}></div>
                                    <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                </li>
                            )))}
                        </ul>
                    </div>


                    <div className={sunnyTheme.socialNetworks}>
                        <h2 className={sunnyTheme.subTitle}>Social Networking Sites</h2>
                        <ul className={sunnyTheme.items}>
                            {(socialNetworks && socialNetworks.length > 0 ? socialNetworks.map((snsItem) => (
                                <li className={sunnyTheme.items} key={snsItem.id}>
                                    <a key={snsItem.id} href={snsItem.url}
                                        target="_blank" rel="noreferrer" alt={snsItem.name} >
                                        <Icon id={snsItem.iconid} />
                                        <small>{snsItem.name}</small>
                                    </a>
                                </li>


                            )) : [1, 2, 3, 4, 5, 6].map((index) => (
                                <li className={sunnyTheme.item} key={index}>
                                    <div className={sunnyTheme.dot}></div>
                                    <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                </li>
                            )))}
                        </ul>
                    </div>

                    {(academicEducation && academicEducation.length > 0) ? (<div className={sunnyTheme.education}>
                        <h2 className={sunnyTheme.subTitle}>Academic education</h2>
                        <div className={sunnyTheme.items}>
                            {academicEducation.map((educationItem) => (
                                <div key={educationItem.id} className={sunnyTheme.item}>
                                    <div className={sunnyTheme.dot}></div>
                                    <div className={sunnyTheme.content}>
                                        <h3 className={sunnyTheme.title}>
                                            <span>{educationItem.title}</span> <small>({moment(educationItem.startDate).format("MMM, YYYY")} - {moment(educationItem.endDate).format("MMM, YYYY")})</small>
                                        </h3>
                                        <small className={sunnyTheme.university}>
                                            {educationItem.shortDescription}
                                        </small>
                                    </div>
                                </div>))}
                        </div>
                    </div>) : (<div className={sunnyTheme.education}>
                        <h2 className={sunnyTheme.subTitle}>Academic education</h2>
                        <div className={sunnyTheme.items}>
                            {[1, 2].map((educationItem) => (<div key={educationItem} className={sunnyTheme.item}>
                                <div className={sunnyTheme.dot}></div>
                                <div className={sunnyTheme.content}>
                                    <h2 className={sunnyTheme.title}>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </h2>
                                    <small className={sunnyTheme.university}>
                                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                    </small>
                                    <small> <Skeleton className="rounded-lg w-48 h-6 mt-1"></Skeleton></small>
                                </div>
                            </div>))}
                        </div>
                    </div>)}


                    {isLoading && <div className={sunnyTheme.contact}>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-56 h-6 mt-1"></Skeleton>
                    </div>}
                    {(address || email || phoneNumber) && <div className={sunnyTheme.contact}>
                        {address && <div className={sunnyTheme.item}>
                            <div className={sunnyTheme.box}><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={72}
                                height={72}
                                viewBox="0 0 24 24"
                            >
                                <path d="M12,14c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,14,12,14z M12,8c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S10.897,8,12,8z" />
                                <path d="M11.42,21.814C11.594,21.938,11.797,22,12,22s0.406-0.062,0.58-0.186C12.884,21.599,20.029,16.44,20,10 c0-4.411-3.589-8-8-8S4,5.589,4,9.995C3.971,16.44,11.116,21.599,11.42,21.814z M12,4c3.309,0,6,2.691,6,6.005 c0.021,4.438-4.388,8.423-6,9.73C10.389,18.427,5.979,14.441,6,10C6,6.691,8.691,4,12,4z" />
                            </svg>
                            </div>

                            <small>{address}</small>
                        </div>}
                        {email && <a href={`mailto:${email}`} className={sunnyTheme.item}>
                            <div className={sunnyTheme.box}><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={72}
                                height={72}
                                viewBox="0 0 24 24"
                            >
                                <path d="M20,4H6C4.897,4,4,4.897,4,6v5h2V8l6.4,4.8c0.178,0.133,0.389,0.2,0.6,0.2s0.422-0.067,0.6-0.2L20,8v9h-8v2h8 c1.103,0,2-0.897,2-2V6C22,4.897,21.103,4,20,4z M13,10.75L6.666,6h12.668L13,10.75z" />
                                <path d="M2 12H9V14H2zM4 15H10V17H4zM7 18H11V20H7z" />
                            </svg>
                            </div>

                            <small>{email}</small>
                        </a>}
                        {phoneNumber && <a href={`tel:${phoneNumber}`} className={sunnyTheme.item}>
                            <div className={sunnyTheme.box}><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={72}
                                height={72}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    d="M16.585,19.999l2.006-2.005l-2.586-2.586l-1.293,1.293c-0.238,0.239-0.579,0.342-0.912,0.271 c-0.115-0.024-2.842-0.611-4.502-2.271s-2.247-4.387-2.271-4.502c-0.069-0.33,0.032-0.674,0.271-0.912l1.293-1.293L6.005,5.408 L4,7.413c0.02,1.223,0.346,5.508,3.712,8.874C11.067,19.643,15.337,19.978,16.585,19.999z"
                                />
                                <path d="M16.566 21.999c.005 0 .023 0 .028 0 .528 0 1.027-.208 1.405-.586l2.712-2.712c.391-.391.391-1.023 0-1.414l-4-4c-.391-.391-1.023-.391-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594c.391-.391.391-1.023 0-1.414l-4-4c-.375-.375-1.039-.375-1.414 0L2.586 5.999C2.206 6.379 1.992 6.901 2 7.434c.023 1.424.4 6.37 4.298 10.268S15.142 21.976 16.566 21.999zM6.005 5.408l2.586 2.586L7.298 9.287c-.239.238-.341.582-.271.912.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271c.333.07.674-.032.912-.271l1.293-1.293 2.586 2.586-2.006 2.005c-1.248-.021-5.518-.356-8.873-3.712C4.346 12.921 4.02 8.636 4 7.413L6.005 5.408zM19.999 10.999h2c0-5.13-3.873-8.999-9.01-8.999v2C17.051 4 19.999 6.943 19.999 10.999z" />
                                <path d="M12.999,8c2.103,0,3,0.897,3,3h2c0-3.225-1.775-5-5-5V8z" />
                            </svg></div>

                            <small>{phoneNumber}</small>
                        </a>}
                    </div>}
                </div>


                <div className={sunnyTheme.descriptionAndExperience}>
                    {profileDescription ? <p className={sunnyTheme.description}>{profileDescription}</p> : (<div>
                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                        <Skeleton className="rounded-lg w-48 h-6 mt-1"></Skeleton>
                    </div>)}

                    <div className={sunnyTheme.experience}>
                        <h2 className={sunnyTheme.subTitle}>Work experiences</h2>

                        <div className={sunnyTheme.items}>
                            {(workExperiences && workExperiences.length > 0) ? workExperiences.map((item) => (
                                <div className={sunnyTheme.item} key={item.id}>
                                    <div className={sunnyTheme.dot}></div>
                                    <div className={sunnyTheme.content}>
                                        <h2 className={sunnyTheme.title}>
                                            <span>
                                                {item.title}
                                            </span>
                                            <small className={sunnyTheme.date}>
                                                ({moment(item.startDate).format("MMM, YYYY")} - {moment(item.endDate).format("MMM, YYYY")})
                                            </small>
                                        </h2>
                                        <h3 className={sunnyTheme.company}>{item.company}</h3>

                                        <p className={sunnyTheme.description}>
                                            {item.shortDescription}
                                        </p>
                                    </div>
                                </div>
                            )) : [1, 2].map((item) => (
                                <div className={sunnyTheme.item} key={item}>
                                    <div className={sunnyTheme.dot}></div>
                                    <div className={sunnyTheme.content}>
                                        <h2 className={sunnyTheme.title}>
                                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                                        </h2>
                                        <h3 className={sunnyTheme.company}>
                                            <Skeleton className="rounded-lg w-8/12 h-6 mt-1"></Skeleton>
                                        </h3>
                                        <div className={sunnyTheme.date}>
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


                    {((displaySections && displaySections.certificates)) && <div className={sunnyTheme.certificates}>
                        <h2 className={sunnyTheme.subTitle}>Certificates</h2>
                        <div className={sunnyTheme.items}>
                            {(certificates && certificates.length > 0) ? certificates.map((certificate) => (
                                <div className={sunnyTheme.item} key={certificate.id}>
                                    <h2 className={sunnyTheme.title}>
                                        <span> {certificate.title}</span> <small>({moment(certificate.date).format("DD MMM YYYY")})</small>
                                    </h2>
                                    <p>{certificate.description}</p>
                                </div>
                            )) : <CertificateSkeleton />}
                        </div>
                    </div>}
                    {isLoading && <CertificateSkeleton />}



                    {(displaySections && displaySections.projects) && <div className={sunnyTheme.projects}>
                        <h2 className={sunnyTheme.subTitle}>Projects</h2>
                        <div className={sunnyTheme.items}>
                            {(projects && projects.length > 0) ? projects.map((project) => (
                                <Link
                                    href={project.externalUrl}
                                    target='_blank'
                                    className={sunnyTheme.item}
                                    key={project.id}
                                >
                                    <div className={sunnyTheme.image}>
                                        <img src={project.imageUrl} alt={project.name} />
                                    </div>
                                    <div className={sunnyTheme.detail}>
                                        <h3>{project.title}</h3>
                                        <p>
                                            {project.shortDescription}
                                        </p>
                                    </div>
                                </Link>)) : <ProjectSkeleton type="simple" />}
                        </div>
                    </div>}
                    {isLoading && <ProjectSkeleton type='filled' />}
                </div>
            </div>
        </div >
    )
}


const CurriculumBasicTheme = ({
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
    projects,
    displaySections,
    theme }) => {
    return (
        <div className={`${style.curriculumPage} ${style[theme]} ${isMobile && style.isMobile}`}>
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
                        <h2 className={style.subTitle}>Professional Summary</h2>
                        {profileDescription ? <p>{profileDescription}</p> : (<div>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
                            <Skeleton className="rounded-lg w-48 h-6 mt-1"></Skeleton>
                        </div>)}
                    </div>
                    {/* TODO: Order by year */}
                    {(academicEducation && academicEducation.length > 0) ? (<div className={style.education}>
                        <h2 className={style.subTitle}>Academic education</h2>
                        <div className={style.items}>
                            {academicEducation.map((educationItem) => (
                                <div key={educationItem.id} className={style.item}>
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
                    {((displaySections && displaySections.certificates)) && <div className={style.certificates}>
                        <h2 className={style.subTitle}>Certificates</h2>
                        <div className={style.items}>
                            {(certificates && certificates.length > 0) ? certificates.map((certificate) => (
                                <div className={style.item} key={certificate.id}>
                                    <h2 className={style.title}>
                                        {certificate.title} ({moment(certificate.date).format("DD MMM YYYY")})
                                    </h2>
                                    <p>{certificate.description}</p>
                                </div>
                            )) : <CertificateSkeleton />}
                        </div>
                    </div>}
                    {isLoading && <CertificateSkeleton />}


                    {(displaySections && displaySections.projects) && <div className={style.projects}>
                        <h2 className={style.subTitle}>Projects</h2>
                        <div className={style.items}>
                            {(projects && projects.length > 0) ? projects.map((project) => (
                                <Link href={project.externalUrl} className={style.item} key={project.id}>
                                    <div className={style.image}>
                                        <img src={project.imageUrl} alt={project.name} />
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>
                                        {project.shortDescription}
                                    </p>
                                </Link>)) : <ProjectSkeleton type="simple" />}
                        </div>
                    </div>}
                    {isLoading && <ProjectSkeleton type='filled' />}
                </div>
            </div>
        </div >
    )
}


const CertificateSkeleton = () => {
    return <div className={style.certificates}>
        <div className={style.items}>
            {[1].map((certificate) => (
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
}


const ProjectSkeleton = ({ type = "simple" }) => {

    const projects = [1, 2].map((project) => (
        <div className={style.item} key={project}>
            <div className={style.image}>
                <Skeleton className="rounded-lg aspect-video mt-1"></Skeleton>
            </div>
            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
            <Skeleton className="rounded-lg w-full h-6 mt-1"></Skeleton>
        </div>))


    if (type === "simple") return projects;

    if (type === "filled") return <div className={style.projects}>
        <h2 className={style.subTitle}>Projects</h2>
        <div className={style.items}>
            {projects}
        </div>
    </div>
}