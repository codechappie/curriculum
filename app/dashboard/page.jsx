"use client";
import { Accordion, AccordionItem, Avatar, Button, Chip, Divider, Input, Select, SelectItem, Textarea, User } from '@nextui-org/react';
import { redirect } from "next/navigation";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppContainer from '@/components/AppContainer';
import styles from './dashboard.module.scss'
import Curriculum from '@/components/Curriculum/Curriculum';
import { DeleteIcon, GithubIcon } from '@/components/icons';

const Dashboard = () => {
  const session = useSession();
  const [user, setUser] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const [skills, setSkills] = useState(["HTML5"]);
  const [currentSkill, setCurrentSkill] = useState("");

  const [globalState, setGlobalState] = useState({
    profileImage: "",
    fullName: "",
    occupation: "",
    address: "",
    email: "",
    phoneNumber: "",
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
  // https://i.pravatar.cc/150?u=a04258114e29026702d

  const handleChange = (e, key) => {
    const value = e.target.value;

    setGlobalState((state) => ({
      ...state,
      [key]: value
    }))

  }

  return (
    <AppContainer>
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
                        onChange={(e) => handleChange(e, "profileImage")}
                      />
                    </div>
                    <Input
                      type="text"
                      label="Full name"
                      value={globalState.fullName}
                      onChange={(e) => handleChange(e, "fullName")}
                    />
                    <Input
                      type="text"
                      label="Occupation"
                      value={globalState.occupation}
                      onChange={(e) => handleChange(e, "occupation")}
                    />

                    <Divider className={styles.fullField} />
                    <Input
                      type="text"
                      label="Full address"
                      className={styles.fullField}
                      maxLength={42}
                      value={globalState.address}
                      onChange={(e) => handleChange(e, "address")}
                    />
                    <Input
                      type="email"
                      label="Email"
                      value={globalState.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                    <Input
                      type="text"
                      label="Phone number"
                      value={globalState.phoneNumber}
                      placeholder='5198567765'
                      onChange={(e) => handleChange(e, "phoneNumber")}
                    />
                    <Textarea
                      key="flat"
                      variant="flat"
                      label="Profile description"
                      labelPlacement="inside"
                      placeholder="Enter your description"
                      className={`${styles.fullField} col-span-12 md:col-span-6 mb-6 md:mb-0`}
                      value={globalState.profileDescription}
                      onChange={(e) => handleChange(e, "profileDescription")}
                    />
                  </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Social networks" title="Social networks">
                  <div className={styles.socialNetworks}>
                    <SnsSelectInput />
                    <SnsSelectInput />
                    <SnsSelectInput />
                  </div>
                </AccordionItem>
                <AccordionItem key="3"
                  aria-label="Education"
                  title="Education">
                  <div className={styles.educationContainer}>
                    <EducationInput />
                    <Divider />
                    <EducationInput />
                    <Divider />
                    <EducationInput />
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
            <Button className='w-full' color='primary' size='lg'>Save changes</Button>
          </div>
          <div className={styles.previewContainer}>
            <Curriculum isMobile={true} {...globalState} />
          </div>
        </div>
      </div>
    </AppContainer>
  )
}


const SnsSelectInput = () => {
  const snsData = [
    {
      key: 1,
      id: 1,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702e"
    },
    {
      key: 2,
      id: 2,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    },
    {
      key: 3,
      id: 3,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702w"
    },
    {
      key: 4,
      id: 4,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702f"
    },
    {
      key: 5,
      id: 5,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702a"
    },
    {
      key: 6,
      id: 6,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702h"
    },
    {
      key: 7,
      id: 7,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702k"
    },
    {
      key: 8,
      id: 8,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702l"
    },
    {
      key: 9,
      id: 9,
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
    }
  ]
  return (
    <div className={styles.snsInput}>

      <Select
        items={snsData}
        placeholder="Social Networking site"
        className={styles.snsSelect}
        classNames={{
          trigger: "h-12",
        }}
        renderValue={(items) => {
          return items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <Avatar
                alt={item.data.name}
                className="flex-shrink-0"
                size="md"
                src={item.data.avatar}
              />
            </div>
          ));
        }}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={user.name}
                className="flex-shrink-0" size="sm"
                src={user.avatar} />
            </div>
          </SelectItem>
        )}
      </Select>
      <Input type="text" label="Social network" />
    </div>
  )
}


const EducationInput = () => {
  return (
    <div className={styles.educationInput}>
      <Input type="text" className={styles.fullField} label="Title" />
      <Textarea type="text" className={styles.fullField} label="Short description" />
      <Input type="month" label="Start date" />
      <Input type="month" label="End date" />
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

