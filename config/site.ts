export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	authNav: [
		{
			label: "Browse",
			href: "/browse",
			target: "_self",
		},
		{
			label: "Dashboard",
			target: "_self",
			href: "/dashboard",
		},
		{
			label: "Preview",
			target: "_blank",
			href: "/user/preview",
		},
	],
	navMenuItems: [
		{
			label: "Browse",
			href: "/browse",
			target: "_self",
		},
		{
			label: "About us",
			href: "/aboutus",
			target: "_self",
		},
	],
	links: {
		github: "https://github.com/codechappie/curriculum",
		twitter: "https://twitter.com/codechappie",
		docs: "https://codechappie.com",
		login: "/login",
		discord: "https://discord.com/invite/Mm8UvgR83P",
		sponsor: "https://patreon.com/codechappie"
	},
};
