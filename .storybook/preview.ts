import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#f4f0e8" },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#1f2924" },
      ],
    },
  },
};

export default preview;
