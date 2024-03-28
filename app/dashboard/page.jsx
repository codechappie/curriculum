"use client";
import AppContainer from '@/components/AppContainer';
import Curriculum from '@/components/Curriculum/Curriculum';
import Icon from '@/components/Icon';
import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/icons';
import { Accordion, AccordionItem, Button, Chip, Divider, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styles from './dashboard.module.scss';

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

const Dashboard = () => {
  const session = useSession();
  const [user, setUser] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["3"]));
  const [skills, setSkills] = useState(["HTML5"]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentSocialNetwork, setCurrentSocialNetwork] = useState(SNSInitialValue);
  const [currentAcademicEducation, setCurrentAcademicEducation] = useState(AcademicEducationInitialValue);


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
  });


  useEffect(() => {
    console.log("sess", session)
    if (session.status === "authenticated") {
      getUserData(session.data.user.id)
    }
    if (session.status === "unauthenticated") return redirect("/login")
  }, [session.status]);

  const getUserData = (id) => {
    axios.get(`/api/user/${id}`).then(({ data }) => {
      setUser(data.user)
    });
  }

  const handleClose = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addSkill = () => {
    const skill = currentSkill.trim();
    const found = skills.find(element => skill === element);
    if (skill !== "" && !found) {
      const skillsUpdated = [...skills, skill];
      setSkills(skillsUpdated);
    }
    setCurrentSkill("")
  }

  const addSocialNetwork = () => {
    console.log("VAL", currentSocialNetwork)
    const unique_id = uuid();

    const found = globalState.socialNetworks.find(element => currentSocialNetwork.id === element.id);

    if (!found) {
      const socialNetwork = { ...currentSocialNetwork, id: unique_id };
      const socialNetworksUpdated = [...globalState.socialNetworks, socialNetwork];
      handleChange(socialNetworksUpdated, "socialNetworks")
    } else {
      const filtered = globalState.socialNetworks.filter(element => currentSocialNetwork.id !== element.id);
      const socialNetworksUpdated = [...filtered, currentSocialNetwork];

      handleChange(socialNetworksUpdated, "socialNetworks")
    }



    setCurrentSocialNetwork(SNSInitialValue);
  }

  const handleCloseSocialNetworks = (id) => {
    handleChange(globalState.socialNetworks.filter(snsItem => snsItem.id !== id), "socialNetworks");
  };

  const handleEditvalue = (id) => {
    const found = globalState.socialNetworks.find(snsItem => snsItem.id === id);
    setCurrentSocialNetwork(found)
  }


  const addAcademicEducation = () => {
    const unique_id = uuid();

    const found = globalState.academicEducation.find(element => currentAcademicEducation.id === element.id);

    if (!found) {
      const academicEducation = { ...currentAcademicEducation, id: unique_id };
      const academicEducationUpdated = [...globalState.academicEducation, academicEducation];
      handleChange(academicEducationUpdated, "academicEducation")
    } else {
      const filtered = globalState.academicEducation.filter(element => currentAcademicEducation.id !== element.id);
      const academicEducationUpdated = [...filtered, currentAcademicEducation];

      handleChange(academicEducationUpdated, "academicEducation")
    }



    setCurrentAcademicEducation(AcademicEducationInitialValue);
  }

  const handleCloseAcademicEducation = (id) => {
    handleChange(globalState.academicEducation.filter(educationItem => educationItem.id !== id), "academicEducation");
  };


  const handleEditAcademicEducation = (id) => {
    const found = globalState.academicEducation.find(academicItem => academicItem.id === id);
    setCurrentAcademicEducation(found)
  }



  // https://i.pravatar.cc/150?u=a04258114e29026702d

  const handleChange = (value, key) => {

    setGlobalState((state) => ({
      ...state,
      [key]: value
    }))

  }

  const saveGlobalChanges = () => {
    console.log("GLOBALSTATE", globalState)
  }

  return (
    <AppContainer isFooter={false}>
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
                      handleAdd={addSocialNetwork}
                      setValue={setCurrentSocialNetwork}
                      data={currentSocialNetwork}
                    />
                    <div className={styles.chips}>
                      {globalState.socialNetworks.map((snsItem, index) => (
                        <Chip
                          key={index}
                          startContent={<Icon className={styles.chipImg} id={snsItem.iconid} size={22} />}
                          onDoubleClick={() => handleEditvalue(snsItem.id)}
                          onClose={() => handleCloseSocialNetworks(snsItem.id)}
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
                      handleAdd={addAcademicEducation}
                      setValue={setCurrentAcademicEducation}
                      data={currentAcademicEducation}
                    />

                    {(globalState.academicEducation && globalState.academicEducation.length > 0) && <Divider />}
                    <div className={styles.items}>
                      {globalState.academicEducation.map((educationItem, index) => {
                        return (

                          <Chip
                            key={index}
                            onDoubleClick={() => handleEditAcademicEducation(educationItem.id)}
                            onClose={() => handleCloseAcademicEducation(educationItem.id)}
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
                    <div>
                      <Input
                        type="text"
                        label="Skill"
                        value={currentSkill}
                        onChange={e => setCurrentSkill(e.target.value)}
                      />
                      <Button onClick={() => addSkill()}>Add</Button>
                    </div>
                    {skills.map((skill, index) => (
                      <Chip key={index} onClose={() => handleClose(skill)} variant="flat">
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem key="5"
                  aria-label="Work experience"
                  title="Work experience">
                  <div className={styles.workExperience}>
                    <WorkExperienceInput />
                    <Divider />
                    <WorkExperienceInput />
                    <Divider />
                    <WorkExperienceInput />
                  </div>
                </AccordionItem>

                <AccordionItem key="6"
                  aria-label="Certificates"
                  title="Certificates">
                  <div className={styles.workExperience}>
                    <CertificatesInput />
                    <Divider />
                    <CertificatesInput />
                  </div>
                </AccordionItem>

                <AccordionItem key="7"
                  aria-label="Interests"
                  title="Interests">
                  <div className={styles.workExperience}>
                    <div>
                      <Input
                        type="text"
                        label="Skill"
                        value={currentSkill}
                        list='["text", "prueba"]'
                        onChange={e => setCurrentSkill(e.target.value)}
                      />
                      <Button onClick={() => addSkill()}>Add</Button>
                    </div>
                    {skills.map((skill, index) => (
                      <Chip
                        startContent={<GithubIcon size={18} />}
                        variant="faded"
                        key={index} onClose={() => handleClose(skill)}
                      >  {skill}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </section>
            <Button
              className='w-full'
              color='primary'
              size='lg'
              onClick={saveGlobalChanges}
            >Save changes</Button>
          </div>
          <div className={styles.previewContainer}>
            <Curriculum isMobile={true} {...globalState} />
          </div>
        </div>
      </div>
    </AppContainer>
  )
}


const SnsSelectInput = ({ handleAdd, setValue, data }) => {
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
        onClick={handleAdd}
      >
        Save Social Network
      </Button>
    </div>
  )
}


const EducationInput = ({ handleAdd, setValue, data }) => {
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
        onClick={handleAdd}
      >
        Save
      </Button>
    </div>)
}


const WorkExperienceInput = () => {
  return (
    <div className={styles.workExperienceInput}>
      <Input type="text" className={styles.fullField} label="Job title" />
      <Input type="text" className={styles.fullField} label="Company" />
      <Input type="month" label="Start date" />
      <Input type="month" label="End date" />
      <Textarea label="Description" className={styles.fullField} />
    </div>)
}

const CertificatesInput = () => {
  return (
    <div className={styles.certificatesInput}>
      <Input type="text" className={styles.fullField} label="Certificate title" />
      <Textarea label="Description" className={styles.fullField} />
    </div>)
}


export default Dashboard;

