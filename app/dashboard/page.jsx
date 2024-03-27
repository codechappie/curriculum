"use client";
import { Accordion, AccordionItem, Avatar, Button, Divider, Input, Select, SelectItem, Textarea, User } from '@nextui-org/react';
import { redirect } from "next/navigation";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppContainer from '@/components/AppContainer';
import styles from './dashboard.module.scss'
import Page from '../user/[username]/page';
import { DeleteIcon } from '@/components/icons';

const Dashboard = () => {
  const session = useSession();
  const [user, setUser] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));


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
                      <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
                      <Input type="text" label="URL image" />
                    </div>
                    <Input type="text" label="Full name" />
                    <Input type="text" label="Ocupation" />

                    <Divider className={styles.fullField} />
                    <Input type="text" label="Full address" className={styles.fullField} />
                    <Input type="email" label="Email" />
                    <Input type="text" label="Phone number" />
                    <Textarea
                      key="flat"
                      variant="flat"
                      label="Profile description"
                      labelPlacement="inside"
                      placeholder="Enter your description"
                      className={`${styles.fullField} col-span-12 md:col-span-6 mb-6 md:mb-0`}
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
                    <div className={styles.educationInput}>
                      <Input type="text" label="Title" />
                      <Input type="text" label="Short description" />
                      <Input type="month" label="Start date" />
                      <Input type="month" label="End date" />
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
          <div className={styles.previewContainer}>
            <Page isMobile={true} />
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



export default Dashboard;

