import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
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
      default: "gotovalues",
      values: [
        { name: "gotovalues", value: "#f4f0e8" },
        { name: "white", value: "#ffffff" },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <main className="page-shell" style={{ minHeight: "100vh" }}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
