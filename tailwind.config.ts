import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				main: "#a388ee",
				mainAccent: "#9e66ff", // not needed for shadcn components
				overlay: "rgba(0,0,0,0.8)", // background color overlay for alert dialogs, modals, etc.
				secondaryAccent: "#4d80e6",
				redAccent: "#fcd7d7",
				RED: "#ff6b6b",

				// light mode
				bg: "#e3dff2",
				text: "#000",
				border: "#000",

				// dark mode
				darkBg: "#272733",
				darkText: "#eeefe9",
				darkBorder: "#000",
				secondaryBlack: "#212121", // opposite of plain white, not used pitch black because borders and box-shadows are that color
			},
			borderRadius: {
				base: "5px",
			},
			boxShadow: {
				light: "4px 4px 0px 0px #000",
				dark: "4px 4px 0px 0px #000",
			},
			translate: {
				boxShadowX: "4px",
				boxShadowY: "4px",
				reverseBoxShadowX: "-4px",
				reverseBoxShadowY: "-4px",
			},
			fontWeight: {
				base: "500",
				heading: "700",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
};
export default config;
