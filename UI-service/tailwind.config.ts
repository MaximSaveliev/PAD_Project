/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import withMT from "@material-tailwind/react/utils/withMT";
const config: Config = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "rgb(var(--primary-orange))",
        "light-orange": "rgba(var(--light-orange))",
        "background": "rgba(var(--background))",
        "secondary-background": "rgba(var(--secondary-background))",
        "card-background": "rgba(var(--card-background))",
        "card-border": "rgba(var(--card-border))",
        "secondary-accent": "rgba(var(--secondary-accent))",
        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
        "placeholder-text": "rgba(var(--placeholder-text))",
        "border-dividers": "rgba(var(--border-dividers))",
        "bg-hover": "rgba(var(--bg-hover))",

        /* Topic Colors */
        "politics-color": "rgba(var(--politics-color))", /* Red-500 */
        "business-color": "rgba(var(--business-color))", /* Green-500 */
        "technology-color": "rgba(var(--technology-color))", /* Blue-500 */
        "health-color": "rgba(var(--health-color))", /* Teal-500 */
        "science-color": "rgba(var(--science-color))", /* Purple-500 */
        "entertainment-color": "rgba(var(--entertainment-color))", /* Pink-500 */
        "sports-color": "rgba(var(--sports-color))", /* Yellow-500 */
        "world-color": "rgba(var(--world-color))", /* Indigo-500 */
        "opinion-color": "rgba(var(--opinion-color))", /* Gray-500 */
      }
    },
  },
  plugins: [],
}) as Config;
export default config;
