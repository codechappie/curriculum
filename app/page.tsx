"use client"
import { Snippet } from "@nextui-org/react";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import AppContainer from "@/components/AppContainer";
import React, { useEffect, useRef, useState, FC } from 'react';
import Carousel from '../components/Carousel/Carousel'

export default function Home() {
	const DATA = [{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },
	{ image: "https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64c104cdd04805c75a1ea5a8_Mobile.png" },]
	return (
		<section className="landingContainer">
			<div className="navbarContainer">
				<div className="navbar">
					<div className="logo">Kurro</div>

					<Link href="/login">
						Sign in
					</Link>
				</div>
			</div>
			<div className="heroSectionContainer">
				<div className="heroSection">
					<img className="bg__image" src="https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/64bfcc48ed1b82f490a80362_Default.png" alt="" />

					<img className="front__bg__image" src="https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/649e5bd81cfd46906ef81c9e_Elements.svg" alt="" />

					<div className="detail">
						<h1>Craft a curriculum showcasing all that you do!</h1>
						<p>Say goodbye to outdated resumes. Craft one that matches your personality and highlights your skills and experiences.</p>
						<button>Let's get started</button>

						<Carousel data={DATA} />
					</div>
				</div>
			</div>

		</section>
	);
}
