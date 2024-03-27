"use client";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";


import { link as linkStyles, navbar } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import {
	DiscordIcon,
	GithubIcon,
	HeartFilledIcon,
	SignOutIcon,
	TwitterIcon
} from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
	const [menuIsOpen, setmenuIsOpen] = useState(false)
	const { status } = useSession();

	const redirectToLogin = () => {
		return redirect("/login");
	}

	return (
		<NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={menuIsOpen}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">ACME</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden md:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden md:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
						as={Link}
						className="text-sm font-normal text-default-600 bg-default-100"
						href={siteConfig.links.sponsor}
						startContent={<HeartFilledIcon className="text-danger" />}
						variant="flat"
					>
						Sponsor
					</Button>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="md:hidden basis-1 pl-4" justify="end">
				<Link href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle onClick={() => setmenuIsOpen(!menuIsOpen)} />
			</NavbarContent>

			<NavbarMenu>

				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								className="flex w-fit py-2"
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								onClick={() => setmenuIsOpen(false)}
								href={status === "authenticated" ? item.href : "/login"}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}

					<NavbarMenuItem key="logoout" className="my-4">
						<Button
							startContent={<SignOutIcon fill="white" />}
							color={status === "authenticated" ? "danger" : "primary"} onClick={() => {
								setmenuIsOpen(false)
								if (status === "authenticated") {
									signOut();
								} else {
									redirectToLogin()
								}
							}}>
							{status === "authenticated" ? "Sign Out" : "Login"}
						</Button>

					</NavbarMenuItem>
					<NavbarMenuItem className="flex">
						<Button
							as={Link}
							className="text-sm font-normal text-default-600 bg-default-100"
							href={siteConfig.links.sponsor}
							startContent={<HeartFilledIcon className="text-danger" />}
							variant="flat"
						>
							Sponsor
						</Button>
					</NavbarMenuItem>
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
