"use client"
import Curriculum from '@/components/Curriculum/Curriculum';
import { useState } from 'react';

const Page = ({ isMobile = false }) => {
    const [globalState, setGlobalState] = useState({
        profileImage: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
        
    });

    return (
        <Curriculum isMobile={false} {...globalState} />
    )
}

export default Page