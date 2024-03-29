"use client"
import Curriculum from '@/components/Curriculum/Curriculum';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { Spinner } from '@nextui-org/react';

const Page = () => {
    const params = useParams()

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
    });
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(params.username)
        getUserData(params.username);
    }, []);

    useEffect(() => {
        setGlobalState(user)

    }, [user]);

    const getUserData = (username) => {
        setIsLoading(true);
        axios.get(`/api/user/username?username=${username}`).then(({ data }) => {
            data && setUser(data.user)
        }).then(() => setIsLoading(false));
    }

    if (isLoading) {
        return <Spinner className='spinner' />
    }

    return (
        <Curriculum isMobile={false} {...globalState} />
    )
}

export default Page