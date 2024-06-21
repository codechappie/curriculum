"use client"
import { Logo } from "@/components/icons";
import Link from "next/link";
import Carousel from "../components/Carousel/Carousel";

export default function Home() {
	const DATA = [{ image: "https://i.imgur.com/cmBkiD7.png" },
	{ image: "https://i.imgur.com/9DnE33n.png" },
	{ image: "https://i.imgur.com/cmBkiD7.png" },
	{ image: "https://i.imgur.com/9DnE33n.png" },
	{ image: "https://i.imgur.com/cmBkiD7.png" },
	{ image: "https://i.imgur.com/9DnE33n.png" },
	{ image: "https://i.imgur.com/cmBkiD7.png" },
	{ image: "https://i.imgur.com/9DnE33n.png" },]
	return (
		<section className="landingContainer">
			<div className="navbarContainer">
				<div className="navbar">
					<div className="logo">
						<Logo /> <p className="font-bold text-inherit">Curriculum</p>
					</div>

					<Link className="signin" href="/login">
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
						<Link href="/login">Let&quot;s get started</Link>

						<Carousel data={DATA} />
					</div>
				</div>
			</div>

		</section>
	);
}
