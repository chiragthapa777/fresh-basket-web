import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					//  'primary' : '#570df8',
					//  'primary-focus' : '#4506cb',
					//  'primary-content' : '#ffffff',

					// primary: "#333", // Replace with your desired black shade
					// "primary-focus": "#222", // Adjust the focus shade if needed
					// "primary-content": "#ffffff", // Text color on the primary background

					secondary: "#f000b8",
					"secondary-focus": "#bd0091",
					"secondary-content": "#ffffff",

					accent: "#37cdbe",
					"accent-focus": "#2ba69a",
					"accent-content": "#ffffff",

					neutral: "#3b424e",
					"neutral-focus": "#2a2e37",
					"neutral-content": "#ffffff",

					"base-100": "#ffffff",
					"base-200": "#f9fafb",
					"base-250": "#F4f4f6",
					"base-300": "#ced3d9",
					"base-content": "#1e2734",

					info: "#1c92f2",
					success: "#009485",
					warning: "#ff9900",
					error: "#ff5724",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",

					primary: "#4CAF50", // Fresh Green
					"primary-focus": "#388E3C",
					"primary-content": "#ffffff",

					// secondary: "#FFC107", // Ripe Yellow
					// "secondary-focus": "#FFA000",
					// "secondary-content": "#ffffff",

					// accent: "#795548", // Organic Brown
					// "accent-focus": "#5D4037",
					// "accent-content": "#ffffff",

					// neutral: "#F44336", // Vibrant Red
					// "neutral-focus": "#D32F2F",
					// "neutral-content": "#ffffff",

					// "base-100": "#8D6E63", // Earth Brown
					// "base-200": "#6D4C41",
					// "base-250": "#ffffff",
					// "base-300": "#ced3d9",
					// "base-content": "#333333",

					// info: "#2196F3",
					// success: "#4CAF50",
					// warning: "#FF9800",
					// error: "#F44336",

					// "--rounded-box": "1rem",
					// "--rounded-btn": ".5rem",
					// "--rounded-badge": "1.9rem",

					// "--animation-btn": ".25s",
					// "--animation-input": ".2s",

					// "--btn-text-case": "uppercase",
					// "--navbar-padding": ".5rem",
					// "--border-btn": "1px",
				},
			},
			"dark",
		],
	},
};
export default config;
