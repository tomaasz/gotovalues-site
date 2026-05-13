import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteHeader } from "@/components/site-header";

const meta = {
  title: "gotovalues/SiteHeader",
  component: SiteHeader,
  parameters: {
    docs: {
      description: {
        component: "Główna nawigacja gotovalues.com z wariantami używanymi na stronach landingowych.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["home", "production", "support-ai"],
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { variant: "home" },
};

export const Production: Story = {
  args: { variant: "production" },
};

export const SupportAi: Story = {
  args: { variant: "support-ai" },
};
