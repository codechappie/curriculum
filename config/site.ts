export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Preview",
			href: "/user/preview",
		},
		{
			label: "Settings",
			href: "/dashboard/settings",
		},
	],
	navMenuItems: [
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Preview",
			href: "/user/preview",
		},
		{
			label: "Settings",
			href: "/dashboard/settings",
		},
	],
	links: {
		github: "https://github.com/codechappie/nextui",
		twitter: "https://twitter.com/codechappie",
		docs: "https://codechappie.com",
		discord: "https://discord.com/invite/Mm8UvgR83P",
		sponsor: "https://patreon.com/codechappie"
	},
};
