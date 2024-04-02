"use client";
import AppContainer from '@/components/AppContainer';
import Curriculum from '@/components/Curriculum/Curriculum';
import Icon from '@/components/Icon';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import { Accordion, AccordionItem, Button, Chip, Divider, Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from './dashboard.module.scss';
import Link from 'next/link';

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

const DisplaySectionsInitialValue = {
  certificates: false,
  projects: true,
}

const Dashboard = () => {
  const session = useSession();
  const [user, setUser] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["6"]));
  const [currentSocialNetwork, setCurrentSocialNetwork] = useState(SNSInitialValue);
  const [currentAcademicEducation, setCurrentAcademicEducation] = useState(AcademicEducationInitialValue);
  const [currentSkill, setCurrentSkill] = useState(SkillInitialValue);
  const [currentWorkExperiences, setCurrentWorkExperiences] = useState(WorkExperiencesInitialValue);
  const [currentCertificates, setCurrentCertificates] = useState(CertificatesInitialValue);
  const [currentProjects, setCurrentProjects] = useState(ProjectsInitialValue);
  const [currentDisplaySections, setCurrentDisplaySections] = useState(DisplaySectionsInitialValue);

  const [isLoading, setIsLoading] = useState(true);


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
    displaySections: {}
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
      console.log("USER", user)
      setCurrentDisplaySections(user.displaySections);
      setGlobalState(user);
    }
  }, [user]);


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

  // https://i.pravatar.cc/150?u=a04258114e29026702d

  const handleChange = (value, key) => {
    setGlobalState((state) => ({
      ...state,
      [key]: value
    }))

  }

  const saveGlobalChanges = () => {
    console.log("GLOBALSTATE", globalState);

    axios.put(`/api/user/${user.id}`, globalState)
      .catch((error) => console.log(error));
  }

  return (
    <AppContainer isFooter={false} isLoading={isLoading}>
      <div className={styles.dashboardPage}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <section className={styles.form}>
              <Accordion
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                variant="light">
                <AccordionItem key="1" aria-label="Basic Information" title="Basic Information">
                  <div className={styles.basicInformation}>
                    <div className={styles.userProfile}>
                      <img src={globalState.profileImage || "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"} alt="" />
                      <Input
                        type="text"
                        label="URL image"
                        value={globalState.profileImage}
                        onChange={(e) => handleChange(e.target.value, "profileImage")}
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
                      maxLength={42}
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
                    <div className={styles.skillInput}>
                      <Input
                        type="text"
                        label="Skill"
                        value={currentSkill.name}
                        onChange={(e) => setCurrentSkill((state) => ({
                          ...state,
                          name: e.target.value
                        }))}
                      />
                      <Button
                        color='secondary'
                        className="h-unit-14"
                        onClick={() => handleAddObject(
                          "skills",
                          currentSkill,
                          setCurrentSkill,
                          SkillInitialValue
                        )}>Add</Button>
                    </div>
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
                    <div className="mb-4">
                      <Switch defaultSelected={globalState.displaySections.certificates}
                      checked={globalState.displaySections.certificates}
                      // onChange={(e) => {
                      //   setCurrentDisplaySections((state) => ({
                      //     ...state,
                      //     certificates: e.target.checked
                      //   }));

                      //   handleChange(currentDisplaySections, "displaySections");
                      // }}
                      >
                        {globalState.displaySections.certificates ? "Show" : "Hide"} certificates
                      </Switch>
                    </div>
                    <CertificatesInput
                      handleAdd={handleAddObject}
                      setValue={setCurrentCertificates}
                      data={currentCertificates}
                      initialValue={CertificatesInitialValue}
                      showCertificates={currentDisplaySections.certificates}
                    />
                    <div className={styles.certificates}>
                      {globalState.certificates.map((item, index) => (
                        <Chip key={index}
                          className={`${currentDisplaySections.certificates ? "opacity-100" : "opacity-50"}`}
                          onClose={() => currentDisplaySections.certificates && handleCloseObject("certificates", item.id)}
                          onDoubleClick={() => currentDisplaySections.certificates && handleEditObject("certificates", setCurrentCertificates, item.id)}
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

                    <ProjectsInput
                      handleAdd={handleAddObject}
                      setValue={setCurrentProjects}
                      data={currentProjects}
                      initialValue={ProjectsInitialValue}
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
            <div className={styles.buttons}>
              <Link
                className='w-full button'
                size='lg'
                target='_blank'
                href={`/user/${user.username}`}
              ><Button
                size='lg'
                className='w-full button'
                color='success'
              >
                  See preview
                </Button></Link>

              <Button
                className='w-full'
                color='primary'
                size='lg'
                onClick={saveGlobalChanges}
              >Save changes</Button>
            </div>
          </div>
          <div className={styles.previewContainer}>
            <Curriculum isMobile={true} {...globalState} />
          </div>
        </div>
      </div>
    </AppContainer>
  )
}


const SnsSelectInput = ({ handleAdd, setValue, data, initialValue }) => {
  const snsData = [
    {

      iconid: "github",
      name: "Github",
      avatar: <GithubIcon />
    },
    {
      iconid: "discord",
      name: "Discord",
      avatar: <DiscordIcon />
    },
    {
      iconid: "twitter",
      name: "Twitter",
      avatar: <TwitterIcon />
    }
  ]
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
        }
        }
        classNames={{
          trigger: "h-14",
        }}
        renderValue={(items) => {
          return items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.data.avatar}

              <div className="flex flex-col">
                <span>{item.data.name}</span>
              </div>
            </div>
          ));
        }}
      >
        {(item) => (
          <SelectItem key={item.iconid} value={item.iconid} textValue={item.name}>
            <div className="flex gap-2 items-center">
              {item.avatar}

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
        className={`w-full ${styles.fullField}`}
        color='secondary'
        onClick={() => handleAdd("socialNetworks", data, setValue, initialValue)}
      >
        Save Social Network
      </Button>
    </div>
  )
}


const EducationInput = ({ handleAdd, setValue, data, initialValue }) => {
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
        maxLength={100}
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
        className={`w-full ${styles.fullField}`}
        color='secondary'
        onClick={() => handleAdd("academicEducation", data, setValue, initialValue)}
      >
        Save
      </Button>
    </div>)
}


const WorkExperienceInput = ({ handleAdd, setValue, data, initialValue }) => {
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
        maxLength={200}
        onChange={(e) => setValue((state) => ({
          ...state,
          shortDescription: e.target.value
        }))}
      />

      <Button
        color='secondary'
        className={styles.fullField}
        onClick={() => handleAdd(
          "workExperiences",
          data,
          setValue,
          initialValue
        )}
      >Add work experience</Button>
    </div>)
}

const CertificatesInput = ({ handleAdd, data, setValue, initialValue, showCertificates }) => {
  return (
    <div className={styles.certificatesInput}>
      <div className={styles.titleAndDate}>
        <Input
          type="text"
          label="Certificate title"
          className={`${showCertificates ? "opacity-100" : "opacity-50"}`}
          value={data.title}
          maxLength={60}
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
        maxLength={120}
        onChange={(e) => setValue((state) => ({
          ...state,
          description: e.target.value
        }))}
        readOnly={!showCertificates}
      />

      <Button
        color='secondary'
        className={`${styles.fullField} ${showCertificates ? "opacity-100" : "opacity-50 data-[pressed=true]:scale-[1] data-[hover=true]:opacity-50"}`}
        onClick={() => handleAdd(
          "certificates",
          data,
          setValue,
          initialValue
        )}
        disabled={!showCertificates}
      >Add work experience</Button>
    </div>)
}

const ProjectsInput = ({ handleAdd, data, setValue, initialValue }) => {
  return (
    <div className={styles.projectsInput}>
      <Input
        type="text"
        label="External URL"
        value={data.externalUrl}
        onChange={(e) => setValue((state) => ({
          ...state,
          externalUrl: e.target.value
        }))}
      />
      <Input
        type="text"
        label="Image URL"
        value={data.imageUrl}
        onChange={(e) => setValue((state) => ({
          ...state,
          imageUrl: e.target.value
        }))}
      />
      <Input
        type="text"
        label="Title"
        value={data.title}
        maxLength={60}
        onChange={(e) => setValue((state) => ({
          ...state,
          title: e.target.value
        }))}
      />
      <Textarea
        label="Short description"
        className={styles.fullField}
        value={data.shortDescription}
        maxLength={120}
        onChange={(e) => setValue((state) => ({
          ...state,
          shortDescription: e.target.value
        }))}
      />

      <Button
        color='secondary'
        className={styles.fullField}
        onClick={() => handleAdd(
          "projects",
          data,
          setValue,
          initialValue
        )}
      >Add work experience</Button>
    </div>)
}


export default Dashboard;

