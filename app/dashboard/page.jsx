"use client";
import AppContainer from '@/components/AppContainer';
import Curriculum from '@/components/Curriculum/Curriculum';
import Icon from '@/components/Icon';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import {
  Accordion, AccordionItem, Button, Chip,
  Divider, Input, Select, SelectItem, Switch, Textarea, Tabs, Tab, Card, CardBody
} from '@nextui-org/react';
import ThemesBox from '@/components/ThemeBox/ThemesBox'
import axios from 'axios';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from './dashboard.module.scss';
import JSConfetti from 'js-confetti';

const SNSInitialValue = {
  iconid: "",
  name: "",
  url: "",
}

// TODO: Make posible end date as currently
const AcademicEducationInitialValue = {
  title: "",
  shortDescription: "",
  startDate: "",
  endDate: "",
}

const SkillInitialValue = {
  name: "",
}

const WorkExperiencesInitialValue = {
  title: "",
  company: "",
  startDate: "",
  endDate: "",
  shortDescription: "",
}

const CertificatesInitialValue = {
  title: "",
  date: "",
  description: "",
}

const ProjectsInitialValue = {
  imageUrl: "",
  externalUrl: "",
  title: "",
  shortDescription: "",
}

const ThemeInitialValue = "";

const Dashboard = () => {
  const session = useSession();
  const [user, setUser] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["2"]));
  const [currentSocialNetwork, setCurrentSocialNetwork] = useState(SNSInitialValue);
  const [currentAcademicEducation, setCurrentAcademicEducation] = useState(AcademicEducationInitialValue);
  const [currentSkill, setCurrentSkill] = useState(SkillInitialValue);
  const [currentWorkExperiences, setCurrentWorkExperiences] = useState(WorkExperiencesInitialValue);
  const [currentCertificates, setCurrentCertificates] = useState(CertificatesInitialValue);
  const [currentProjects, setCurrentProjects] = useState(ProjectsInitialValue);
  // const [currentTheme, setCurrentTheme] = useState(ThemeInitialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [confetti, setConfetti] = useState();


  const [globalState, setGlobalState] = useState({
    profileImage: "",
    fullName: "",
    occupation: "",
    address: "",
    email: "",
    phoneNumber: "",
    profileDescription: "",
    socialNetworks: [],
    academicEducation: [],
    skills: [],
    workExperiences: [],
    certificates: [],
    projects: [],
    displaySections: {},
    theme: "",
  });


  useEffect(() => {
    if (session.status === "loading") {
      setIsLoading(true);
    }
    if (session.status === "authenticated") {
      getUserData(session.data.user.id);

    }
    if (session.status === "unauthenticated") return redirect("/login")
  }, [session.status]);


  useEffect(() => {

    if (user._id) {
      setGlobalState(user);
      console.log("USER: ", user)
    }
  }, [user]);

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    setConfetti(jsConfetti);
  }, []);

  const getUserData = (id) => {

    setIsLoading(true);
    axios.get(`/api/user/${id}`).then(({ data }) => {
      data.success && setUser(data.user)
    }).then(() => setIsLoading(false));
  }

  const handleAddObject = (globalArrayKey, currentObjValue, setCurrentValue, initialvalue) => {
    const unique_id = uuid();

    const found = globalState[globalArrayKey].find(element => currentObjValue.id === element.id);

    if (!found) {
      const object = { ...currentObjValue, id: unique_id };
      const arrayUpdated = [...globalState[globalArrayKey], object];
      handleChange(arrayUpdated, globalArrayKey)
    } else {
      const filtered = globalState[globalArrayKey].filter(element => currentObjValue.id !== element.id);
      const arrayUpdated = [...filtered, currentObjValue];

      handleChange(arrayUpdated, globalArrayKey)
    }

    setCurrentValue(initialvalue);
  }

  const handleEditObject = (globalArrayKey, setCurrentValue, id) => {
    const found = globalState[globalArrayKey].find(item => item.id === id);
    setCurrentValue(found)
  }

  const handleCloseObject = (globalArrayKey, id) => {
    handleChange(globalState[globalArrayKey].filter(item => item.id !== id), globalArrayKey);
  };

  const handleChange = (value, key) => {
    setGlobalState((state) => ({
      ...state,
      [key]: value
    }))

  }

  const saveGlobalChanges = () => {

    console.log("GLB", globalState)
    axios.put(`/api/user/${user.id}`, globalState)
      .catch((error) => console.log(error));

    confetti.addConfetti({
      emojis: ['🥳', '🎉', '🎊', '💥', '✨'],
      confettiNumber: 40,
    });
  }

  return (
    <AppContainer isFooter={false} isLoading={isLoading}>
      <div className={styles.dashboardPage}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <Tabs key="bordered" variant="bordered" aria-label="Tabs variants">
              <Tab key="information" title="Information">
                <section className={styles.form}>
                  <Accordion
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    variant="light">
                    <AccordionItem key="1" aria-label="Basic Information" title="Basic Information">
                      <div className={styles.basicInformation}>
                        <div className={styles.userProfile}>
                          {/* TODO: ADD IMAGE PUBLIC */}
                          <img src={globalState.profileImage || "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"} alt="" />
                          <Input
                            type="text"
                            label="URL image"
                            value={globalState.profileImage}
                            onChange={(e) => { handleChange(e.target.value, "profileImage") }}
                          />
                        </div>
                        <Input
                          type="text"
                          label="Full name"
                          value={globalState.fullName}
                          onChange={(e) => handleChange(e.target.value, "fullName")}
                        />
                        <Input
                          type="text"
                          label="Occupation"
                          value={globalState.occupation}
                          onChange={(e) => handleChange(e.target.value, "occupation")}
                        />

                        <Divider className={styles.fullField} />
                        <Input
                          type="text"
                          label="Full address"
                          className={styles.fullField}
                          maxLength={50}
                          value={globalState.address}
                          onChange={(e) => handleChange(e.target.value, "address")}
                        />
                        <Input
                          type="email"
                          label="Email"
                          value={globalState.email}
                          onChange={(e) => handleChange(e.target.value, "email")}
                        />
                        <Input
                          type="text"
                          label="Phone number"
                          value={globalState.phoneNumber}
                          placeholder='+5198567765'
                          onChange={(e) => handleChange(e.target.value, "phoneNumber")}
                        />
                        <Textarea
                          key="flat"
                          variant="flat"
                          label="Profile description"
                          labelPlacement="inside"
                          placeholder="Enter your description"
                          className={`${styles.fullField} col-span-12 md:col-span-6 mb-6 md:mb-0`}
                          value={globalState.profileDescription}
                          onChange={(e) => handleChange(e.target.value, "profileDescription")}
                        />
                      </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Social networks" title="Social networks">
                      <div className={styles.socialNetworks}>
                        <SnsSelectInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentSocialNetwork}
                          data={currentSocialNetwork}
                          initialValue={SNSInitialValue}
                        />
                        <div className={styles.chips}>
                          {globalState.socialNetworks.map((snsItem, index) => (
                            <Chip
                              key={index}
                              startContent={<Icon className={styles.chipImg} id={snsItem.iconid} size={22} />}
                              onDoubleClick={() => handleEditObject("socialNetworks", setCurrentSocialNetwork, snsItem.id)}
                              onClose={() => handleCloseObject("socialNetworks", snsItem.id)}
                              size='lg'
                              variant="flat">
                              {snsItem.name}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>
                    <AccordionItem key="3"
                      aria-label="Education"
                      title="Education">
                      <div className={styles.educationContainer}>
                        <EducationInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentAcademicEducation}
                          data={currentAcademicEducation}
                          initialValue={AcademicEducationInitialValue}
                        />

                        {(globalState.academicEducation && globalState.academicEducation.length > 0) && <Divider />}
                        <div className={styles.items}>
                          {globalState.academicEducation.map((educationItem, index) => {
                            return (

                              <Chip
                                key={index}
                                onDoubleClick={() => handleEditObject("academicEducation", setCurrentAcademicEducation, educationItem.id)}
                                onClose={() => handleCloseObject("academicEducation", educationItem.id)}
                                size='lg'
                                variant="flat">
                                {educationItem.title}
                              </Chip>
                            )
                          })}
                        </div>
                      </div>
                    </AccordionItem>
                    <AccordionItem key="4"
                      aria-label="Skills"
                      title="Skills">
                      <div className={styles.skillsContainer}>
                        <SkillInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentSkill}
                          data={currentSkill}
                          initialValue={SkillInitialValue}
                        />
                        <div className={styles.skills}>
                          {globalState.skills.map((skill, index) => (
                            <Chip key={index}
                              onClose={() => handleCloseObject("skills", skill.id)}
                              onDoubleClick={() => handleEditObject("skills", setCurrentSkill, skill.id)}
                              variant="flat">
                              {skill.name}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>
                    <AccordionItem key="5"
                      aria-label="Work experience"
                      title="Work experience">
                      <div className={styles.workExperience}>
                        <WorkExperienceInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentWorkExperiences}
                          data={currentWorkExperiences}
                          initialValue={WorkExperiencesInitialValue}
                        />
                        <div className={styles.skills}>
                          {globalState.workExperiences.map((item, index) => (
                            <Chip key={index}
                              onClose={() => handleCloseObject("workExperiences", item.id)}
                              onDoubleClick={() => handleEditObject("workExperiences", setCurrentWorkExperiences, item.id)}
                              variant="flat">
                              {item.title}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>
                    <AccordionItem key="6"
                      aria-label="Certificates"
                      title="Certificates">
                      <div className={styles.certificatesContainer}>
                        <div className="w-fit mb-4">

                          <Switch
                            isSelected={globalState.displaySections.certificates}
                            onChange={(e) => {
                              handleChange({
                                ...globalState.displaySections,
                                certificates: e.target.checked
                              }, "displaySections");
                            }}
                          >
                            {globalState.displaySections.certificates ? "Show" : "Hide"} certificates
                          </Switch>
                        </div>

                        <CertificatesInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentCertificates}
                          data={currentCertificates}
                          initialValue={CertificatesInitialValue}
                          showCertificates={globalState.displaySections.certificates}
                        />
                        <div className={styles.certificates}>
                          {globalState.certificates.map((item, index) => (
                            <Chip key={index}
                              className={`${globalState.displaySections.certificates ? "opacity-100" : "opacity-50"}`}
                              onClose={() => globalState.displaySections.certificates && handleCloseObject("certificates", item.id)}
                              onDoubleClick={() => globalState.displaySections.certificates && handleEditObject("certificates", setCurrentCertificates, item.id)}
                              variant="flat"
                            >
                              {item.title}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>


                    <AccordionItem key="7"
                      aria-label="Projects"
                      title="Projects">
                      <div className={styles.projectsContainer}>
                        <div className="w-fit mb-4">

                          <Switch
                            isSelected={globalState.displaySections.projects}
                            onChange={(e) => {
                              handleChange({
                                ...globalState.displaySections,
                                projects: e.target.checked
                              }, "displaySections");
                            }}
                          >
                            {globalState.displaySections.projects ? "Show" : "Hide"} projects
                          </Switch>
                        </div>
                        <ProjectsInput
                          handleAdd={handleAddObject}
                          setValue={setCurrentProjects}
                          data={currentProjects}
                          initialValue={ProjectsInitialValue}
                          showProjects={globalState.displaySections.projects}
                        />
                        <div className={styles.items}>
                          {globalState.projects.map((project, index) => (
                            <Chip
                              variant="faded"
                              key={index}
                              onClose={() => handleCloseObject("projects", project.id)}
                              onDoubleClick={() => handleEditObject("projects", setCurrentProjects, project.id)}
                            >  {project.title}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </section>
              </Tab>
              <Tab key="themes" title="Themes">
                <section className={styles.form}>
                  <ThemesBox
                    theme={globalState.theme}
                    handleChange={handleChange}
                  />
                </section>
              </Tab>
            </Tabs>

            <div className={styles.buttons}>
              <Link
                className='w-full button'
                target='_blank'
                href={`/user/${user.username}`}
              ><Button
                className='w-full button lg:text-medium md:text-small sm:text-xs'
                color='success'
              >
                  See preview
                </Button></Link>

              <Button

                className='w-full lg:text-medium md:text-small sm:text-xs'
                color='primary'
                onClick={saveGlobalChanges}
              >Save all changes</Button>
            </div>
          </div>
          <div className={styles.previewContainer}>
            <Curriculum isMobile={true} {...globalState} />
          </div>
        </div>
      </div>
    </AppContainer >
  )
}


const SnsSelectInput = ({ handleAdd, setValue, data, initialValue }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);
  const snsData = [
    {

      iconid: "github",
      name: "Github",
    },
    {

      iconid: "facebook",
      name: "Facebook",
    },
    {
      iconid: "discord",
      name: "Discord",
    },
    {
      iconid: "twitter",
      name: "Twitter",
    },
    {
      iconid: "instagram",
      name: "Instagram",
    },
    {
      iconid: "tiktok",
      name: "TikTok",
    },
    {
      iconid: "linkedin",
      name: "LinkedIn",
    },
    {
      iconid: "twitch",
      name: "Twitch",
    },
    {
      iconid: "youtube",
      name: "YouTube",
    },
    {
      iconid: "spotify",
      name: "Spotify",
    },
    {
      iconid: "dribbble",
      name: "Dribbble",
    },
    {
      iconid: "soundcloud",
      name: "SoundCloud"
    },
    {
      iconid: "other",
      name: "Other",
    },
  ];

  useEffect(() => {
    const { iconid, name, url } = data;
    if (iconid.trim() !== "" && name.trim() !== "" && url.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (
    <div className={styles.snsInput}>
      <Select
        aria-label="Social icon"
        items={snsData}
        placeholder="Social icon"
        className="flex items-center gap-2"
        selectedKeys={data.iconid ? [data.iconid] : []}
        onChange={(e) => {
          setValue((state) => ({
            ...state,
            iconid: e.target.value
          }))
        }}
        classNames={{
          trigger: "h-14",
        }}
        renderValue={(items) => {
          return items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon id={item.data.iconid} className="bwIcon" />

              <div className="flex flex-col">
                <span>{item.data.name}</span>
              </div>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem key={item.iconid} value={item.iconid} textValue={item.name} >
            <div className="flex gap-2 items-center bwIcon">
              <Icon id={item.iconid} />

              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Input
        type="text"
        label="Social network name"
        value={data.name}
        onChange={(e) => setValue((state) => ({
          ...state,
          name: e.target.value
        }))}
      />

      <Input
        type="text"
        label="URL"
        placeholder='https://example.com/username'
        className={styles.fullField}
        value={data.url}
        onChange={(e) => setValue((state) => ({
          ...state,
          url: e.target.value
        }))}
      />
      <Button
        className={`${styles.fullField} w-full ${buttonIsAvailable ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        color='secondary'
        onClick={() => handleAdd("socialNetworks", data, setValue, initialValue)}
        disabled={!buttonIsAvailable}
      >
        Save Social Network
      </Button>
    </div>
  )
}


const EducationInput = ({ handleAdd, setValue, data, initialValue }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);

  useEffect(() => {
    const { title, shortDescription, startDate, endDate } = data;
    if (title.trim() !== "" &&
      shortDescription.trim() !== ""
      && startDate.trim() !== ""
      && endDate.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (
    <div className={styles.educationInput}>
      <Input
        type="text"
        className={styles.fullField}
        label="Title"
        value={data.title}
        onChange={(e) => setValue((state) => ({
          ...state,
          title: e.target.value
        }))}
      />
      <Textarea
        type="text"
        maxLength={180}
        className={styles.fullField}
        label="Short description"
        value={data.shortDescription}
        onChange={(e) => setValue((state) => ({
          ...state,
          shortDescription: e.target.value
        }))}
      />
      <Input
        type="date"
        label="Start date"
        value={data.startDate}
        onChange={(e) => setValue((state) => ({
          ...state,
          startDate: e.target.value
        }))}
      />
      <Input
        type="date"
        label="End date"
        value={data.endDate}
        onChange={(e) => setValue((state) => ({
          ...state,
          endDate: e.target.value
        }))}
      />
      <Button
        className={`${styles.fullField} w-full ${buttonIsAvailable ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        color='secondary'
        onClick={() => handleAdd("academicEducation", data, setValue, initialValue)}
        disabled={!buttonIsAvailable}
      >
        Save
      </Button>
    </div>)
}

const SkillInput = ({ handleAdd, setValue, data, initialValue }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);

  useEffect(() => {
    const { name } = data;
    if (name.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (<div className={styles.skillInput}>
    <Input
      type="text"
      label="Skill"
      value={data.name}
      onChange={(e) => setValue((state) => ({
        ...state,
        name: e.target.value
      }))}
    />
    <Button
      color='secondary'
      className={`h-unit-14 ${buttonIsAvailable ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
      onClick={() => handleAdd(
        "skills",
        data,
        setValue,
        initialValue
      )}
      disabled={!buttonIsAvailable}
    >Add</Button>
  </div>)
}

const WorkExperienceInput = ({ handleAdd, setValue, data, initialValue }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);

  useEffect(() => {
    const { title, company, startDate, endDate, shortDescription } = data;
    if (title.trim() !== "" &&
      company.trim() !== ""
      && startDate.trim() !== ""
      && endDate.trim() !== ""
      && shortDescription.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (
    <div className={styles.workExperienceInput}>
      <Input
        type="text"
        className={styles.fullField}
        label="Job title"
        value={data.title}
        onChange={(e) => setValue((state) => ({
          ...state,
          title: e.target.value
        }))}
      />
      <Input
        type="text"
        className={styles.fullField}
        label="Company"
        value={data.company}
        onChange={(e) => setValue((state) => ({
          ...state,
          company: e.target.value
        }))}
      />
      <Input
        type="date"
        label="Start date"
        value={data.startDate}
        onChange={(e) => setValue((state) => ({
          ...state,
          startDate: e.target.value
        }))}
      />
      <Input
        type="date"
        label="End date"
        value={data.endDate}
        onChange={(e) => setValue((state) => ({
          ...state,
          endDate: e.target.value
        }))}
      />
      <Textarea
        label="Description"
        className={styles.fullField}
        value={data.shortDescription}
        maxLength={240}
        onChange={(e) => setValue((state) => ({
          ...state,
          shortDescription: e.target.value
        }))}
      />

      <Button
        color='secondary'
        className={`${styles.fullField} w-full ${buttonIsAvailable ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        onClick={() => handleAdd(
          "workExperiences",
          data,
          setValue,
          initialValue
        )}
        disabled={!buttonIsAvailable}
      >Add work experience</Button>
    </div>)
}

const CertificatesInput = ({ handleAdd, data, setValue, initialValue, showCertificates }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);

  useEffect(() => {
    const { title, date, description } = data;
    if (title.trim() !== "" &&
      date.trim() !== ""
      && description.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (
    <div className={styles.certificatesInput}>
      <div className={styles.titleAndDate}>
        <Input
          type="text"
          label="Certificate title"
          className={`${showCertificates ? "opacity-100" : "opacity-50"}`}
          value={data.title}
          maxLength={80}
          onChange={(e) => setValue((state) => ({
            ...state,
            title: e.target.value
          }))}
          readOnly={!showCertificates}
        />
        <Input
          type="date"
          label="Date"
          className={`${showCertificates ? "opacity-100" : "opacity-50"}`}
          value={data.date}
          onChange={(e) => setValue((state) => ({
            ...state,
            date: e.target.value
          }))}
          readOnly={!showCertificates}
        />
      </div>
      <Textarea
        label="Description"
        className={`${styles.fullField} ${showCertificates ? "opacity-100" : "opacity-50"}`}
        value={data.description}
        maxLength={150}
        onChange={(e) => setValue((state) => ({
          ...state,
          description: e.target.value
        }))}
        readOnly={!showCertificates}
      />

      <Button
        color='secondary'
        className={`${styles.fullField} ${(buttonIsAvailable && showCertificates) ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        onClick={() => {
          handleAdd(
            "certificates",
            data,
            setValue,
            initialValue
          )
        }}
        disabled={(!buttonIsAvailable || !showCertificates)}
      >Add certificates</Button>
    </div >)
}

const ProjectsInput = ({ handleAdd, data, setValue, initialValue, showProjects }) => {
  const [buttonIsAvailable, setButtonAvailable] = useState(false);

  useEffect(() => {
    const { externalUrl, imageUrl, title, shortDescription } = data;
    if (externalUrl.trim() !== "" &&
      imageUrl.trim() !== ""
      && title.trim() !== ""
      && shortDescription.trim() !== "") {
      setButtonAvailable(true)
    } else {
      setButtonAvailable(false)
    }

  }, [data]);

  return (
    <div className={styles.projectsInput}>
      <Input
        type="text"
        label="External URL"
        value={data.externalUrl}
        className={`${showProjects ? "opacity-100" : "opacity-50"}`}
        onChange={(e) => setValue((state) => ({
          ...state,
          externalUrl: e.target.value
        }))}
        readOnly={!showProjects}
      />
      <Input
        type="text"
        label="Image URL"
        className={`${showProjects ? "opacity-100" : "opacity-50"}`}
        value={data.imageUrl}
        onChange={(e) => setValue((state) => ({
          ...state,
          imageUrl: e.target.value
        }))}
        readOnly={!showProjects}
      />
      <Input
        type="text"
        label="Title"
        className={`${showProjects ? "opacity-100" : "opacity-50"}`}
        value={data.title}
        maxLength={120}
        onChange={(e) => setValue((state) => ({
          ...state,
          title: e.target.value
        }))}
        readOnly={!showProjects}
      />
      <Textarea
        label="Short description"
        className={`${showProjects ? "opacity-100" : "opacity-50"} ${styles.fullField}`}
        value={data.shortDescription}
        maxLength={150}
        onChange={(e) => setValue((state) => ({
          ...state,
          shortDescription: e.target.value
        }))}
        readOnly={!showProjects}
      />

      <Button
        color='secondary'
        className={`${styles.fullField} ${(buttonIsAvailable && showProjects) ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        onClick={() => handleAdd(
          "projects",
          data,
          setValue,
          initialValue
        )}
        disabled={(!buttonIsAvailable || !showProjects)}
      >Add projects</Button>
    </div>)
}


export default Dashboard;

