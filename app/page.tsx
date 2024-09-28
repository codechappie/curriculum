"use client"
import { Logo } from "@/components/icons";
import Link from "next/link";
import Carousel from "../components/Carousel/Carousel";
import { siteConfig } from "@/config/site";

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
			<title>{siteConfig.largeName}</title>
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
					<img className="bg__image" src="https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2460.jpg" alt="" />

					<img className="front__bg__image" src="https://assets-global.website-files.com/649d4a7f8fa7ad5b021ca3f3/649e5bd81cfd46906ef81c9e_Elements.svg" alt="" />

					<div className="detail">
						<h1>Craft a curriculum showcasing all that you do!</h1>
						<p>Say goodbye to outdated resumes. Craft one that matches your personality and highlights your skills and experiences.</p>
						<Link href="/login">Let&quot;s get started</Link>

						<Carousel data={DATA} />
					</div>
				</div>
			</div>

			<div className="steps">
				<h3>The Professional Resume Maker</h3>
				<p className="description">Curriculum is everything you need to create an online resume and make your next career move.</p>

				<div className="features">
					<div className="item">
						<img src="https://i.imgur.com/z4sHHcI.png" alt="" />
						<h4>Register with your Gmail or your GitHub account</h4>
						<p>
							Complete the registration process by signing up with your Gmail account.
						</p>
					</div>

					<div className="item">
						<img src="https://i.imgur.com/jYqgaNt.png" alt="" />
						<h4>Exceptional Ease and Intuitiveness</h4>
						<p>
							Enjoy an unparalleled level of ease of use and seamless navigation.
						</p>
					</div>

					<div className="item">
						<img src="https://i.imgur.com/dcMg98o.png" alt="" />
						<h4>Multi-theme resume options</h4>
						<p>
							Explore multiple themes options for your resume to suit your needs.
						</p>
					</div>


					<div className="item">
						<img src="https://i.imgur.com/mF94yQ7.png" alt="" />
						<h4>Access and manage your resume online</h4>
						<p>
							Manage and showcase your professional resume online with ease.
						</p>
					</div>

					<div className="item">
						<img src="https://i.imgur.com/83rQM8t.png" alt="" />
						<h4>Create your resume without payments</h4>
						<p>
							Create your professional resume without making any payments.
						</p>
					</div>

					<div className="item">
						<img src="https://i.imgur.com/9UH8puZ.png" alt="" />
						<h4>Create a professional resume in minutes</h4>
						<p>
							Create a polished and professional resume in just minutes.
						</p>
					</div>
				</div>

			</div>

			<div className="faq">
				<h3>Curriculum - Frequently asked questions</h3>

				<div className="item">
					<h5 className="question">
						1. How can I create my resume for free?
					</h5>
					<p className="answer">
						You can create your resume for free using our online options.
					</p>
				</div>


				<div className="item">
					<h5 className="question">
						2. What type of format can I get for my resume?
					</h5>
					<p className="answer">
						We offer an adaptive web format with a summary sheet appearance, perfect for a professional and modern presentation.
					</p>
				</div>

				<div className="item">
					<h5 className="question">
						3. How can I access and manage my resume online?
					</h5>
					<p className="answer">
						You can access your resume using your Gmail or GitHub account. We will soon add new login methods for added convenience.
					</p>
				</div>

				<div className="item">
					<h5 className="question">
						4. What does &quot;Your resume online&quot; mean?
					</h5>
					<p className="answer">
						It means your resume will be available and accessible online for easy sharing and updating.
					</p>
				</div>

				<div className="item">
					<h5 className="question">
						5. Is it safe to manage my resume online?
					</h5>
					<p className="answer">
						Yes, we take measures to ensure the security and privacy of your information while managing your resume online.
					</p>
				</div>
			</div>


			<div className="joinus-wrapper">
				<div className="joinus">
					<h3>Join over 3,000 users worldwide</h3>
					<p>
						Easy to use and done within minutes - try now for free!
					</p>
					<a href="/dashboard">Create my curriculum</a>
				</div>
			</div>

			<footer className="footer">
				More than a resume maker. Curriculum is part of <a href="https://codechappie.com" target="_blank">CodeChappie</a> product ecosystem.
			</footer>
		</section>
	);
}
