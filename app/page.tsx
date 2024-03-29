import { Snippet } from "@nextui-org/react";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import AppContainer from "@/components/AppContainer";

export default function Home() {
	return (
		<AppContainer simpleNavbar={true}>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Make a &nbsp;</h1>
					<h1 className={title({ color: "violet" })}>&nbsp;Curriculum.</h1>
					<br />
					<h1 className={title()}>
						Do it in the easiest and fastest way
					</h1>
					<h2 className={subtitle({ class: "mt-4" })}>
						Simple, fast and modern Curriculum.
					</h2>
				</div>

				<div className="flex gap-3">
					<Link
						href={siteConfig.links.login}
						className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
					>
						Login
					</Link>
					<Link
						className={buttonStyles({ variant: "bordered", radius: "full" })}
						href={siteConfig.links.github}
					>
						<GithubIcon size={20} />
						GitHub
					</Link>
				</div>
			</section>
		</AppContainer>
	);
}
